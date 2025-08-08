package it.postel.bancarizzazioneGUI.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Configuration
@PropertySource("classpath:ldap.properties")
@Component
public class LdapConfig {
	
	@Value("${spring.ldap.url}")
	private String ldapUrl;
	@Value("${spring.ldap.security.authentication}")
	private String securityAuthentication;
	@Value("${spring.ldap.contextfactory}")
	private String contextFactory;
	@Value("${spring.ldap.domain}")
	private String domain;
	
	public String getLdapUrl() {
		return ldapUrl;
	}
	public void setLdapUrl(String ldapUrl) {
		this.ldapUrl = ldapUrl;
	}
	public String getSecurityAuthentication() {
		return securityAuthentication;
	}
	public void setSecurityAuthentication(String securityAuthentication) {
		this.securityAuthentication = securityAuthentication;
	}
	public String getContextFactory() {
		return contextFactory;
	}
	public void setContextFactory(String contextFactory) {
		this.contextFactory = contextFactory;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	
	
}
