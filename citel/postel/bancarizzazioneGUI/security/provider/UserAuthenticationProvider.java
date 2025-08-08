package it.citel.postel.bancarizzazioneGUI.security.provider;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.directory.InitialDirContext;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import it.citel.postel.commonLib.security.model.User;
import it.postel.bancarizzazioneGUI.services.UserService;
import it.postel.bancarizzazioneGUI.util.LdapConfig;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {

	static final Logger log = LogManager.getLogger(UserAuthenticationProvider.class);

//	private UserDetailsService userDetailsService;
	@Autowired
	UserService userService;
	@Autowired
	LdapConfig ldapConfig;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		log.debug("class UserAuthenticationProvider .. inizio...");
		//recupero di properties dinamicamente dal pom generale per profilo
		Properties props = new Properties();

		String pwd = null;
		try {
			pwd = URLDecoder.decode( StringEscapeUtils.escapeHtml(authentication.getCredentials().toString()) , StandardCharsets.UTF_8.toString() ).trim();
		} catch (UnsupportedEncodingException e1) {
			log.error("Problemi di autenticazione. " + e1.getMessage(), e1);
			e1.printStackTrace();
		}
		props.put(Context.INITIAL_CONTEXT_FACTORY, ldapConfig.getContextFactory());
		props.put(Context.PROVIDER_URL, ldapConfig.getLdapUrl());
		props.put(Context.SECURITY_AUTHENTICATION, ldapConfig.getSecurityAuthentication());
		props.put(Context.SECURITY_PRINCIPAL, ldapConfig.getDomain() + authentication.getName());
		props.put(Context.SECURITY_CREDENTIALS, pwd);// dn user password
		
//		props.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
//		props.put(Context.PROVIDER_URL, "ldap://10.103.8.8:389");
//		props.put(Context.SECURITY_AUTHENTICATION, "simple");
//		props.put(Context.SECURITY_PRINCIPAL, "POSTEL\\" + authentication.getName());
//	no    props.put(Context.SECURITY_PRINCIPAL, "uid="+authentication.getName()+",cn=wpsbind,ou=Users_Servizio,ou=OU_POSTEL_USER,dc=postel,dc=it");
//		props.put(Context.SECURITY_CREDENTIALS, authentication.getCredentials().toString());// dn user password

		
		InitialDirContext context = null;
		try {
			
			
			if( StringUtils.isEmpty(pwd) ) {
				throw new NamingException("Problemi di autenticazione");
			}

			context = new InitialDirContext(props);

			log.debug("utente trovato su LDAP");
			log.debug("authenticate:" + authentication.getName());
			String username = authentication.getName();
			User user = (User) userService.loadUserByUsername(username);
			if (user == null) {
				throw new NamingException("Problemi di autenticazione");
			}
			log.debug("User: (userService.loadUser): " + user.toString());
			authentication = new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
		} catch (NamingException e) {
			log.error("Problemi di autenticazione con LDAP. " + e.getMessage(), e);
			throw new BadCredentialsException("Username o password errate");
		}
		catch(Exception e){
			log.error("Problemi di autenticazione. " + e.getMessage(), e);
			throw new BadCredentialsException("Username o password errate");
		}
		finally {
			try {
				if(context != null)
					context.close();
			} catch (NamingException e) {
				// TODO Auto-generated catch block
				log.error("Problemi di autenticazione. " + e.getMessage(), e);
				throw new BadCredentialsException("Errore Interno");
			} catch(Exception e){
				log.error("Problemi di autenticazione. " + e.getMessage(), e);
				throw new BadCredentialsException("Errore interno");
			}
		}

		return authentication;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}


}
