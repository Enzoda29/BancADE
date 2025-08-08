package it.citel.postel.bancarizzazioneGUI.dao;


import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.ldap.AuthenticationException;
import org.springframework.stereotype.Repository;

import it.citel.postel.bancarizzazioneGUI.service.HomeService;
import it.citel.postel.bancarizzazioneGUI.service.LoginService;
import it.citel.postel.bancarizzazioneGUI.util.SessionUtil;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.constants.SessionConstants;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestLogin;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseUser;
import it.citel.postel.commonLib.security.model.Role;
import it.citel.postel.commonLib.security.model.User;

@Repository
public class UserDao {

    static final Logger log = LogManager.getLogger(UserDao.class);

    @Autowired
    private HomeService homeService;
    @Autowired
    LoginService loginService;

    /**
     * Cerca i ruoli sul DB.
     *
     * @param username
     * @return
     * @throws Exception 
     * @throws IOException 
     * @throws MalformedURLException 
     */
	public User loadUserByUsername(final String username) throws UsernameNotFoundException {
		User user = new User();
    	Request<RequestLogin> userRequest = new Request<>();
		Role role = new Role();
		try {
		// prende i ruoli ele classi doc da db e crea il bean
		RequestLogin reqLogin = new RequestLogin();
		reqLogin.setUsername(username);	
		Request<RequestLogin> request = new Request<RequestLogin>();
		request.setData(reqLogin);
		ResponseUser respUser = (ResponseUser) homeService.getUserAccessFields(request);
		if (!respUser.getStatus()) {
			throw new UsernameNotFoundException(respUser.getMessage());
		}
//		ResponseAccessi respAccessi = (ResponseAccessi) homeService.getLastAccessUser(request);
//		if (!respAccessi.getStatus()) {
//			throw new UsernameNotFoundException(respAccessi.getMessage());
//		}
//		user = (User) SessionUtil.getObjectFromSession(SessionConstants.USER);
		user.setUsername(respUser.getData().getUsername());
		user.setIdProfilo(respUser.getData().getIdProfilo());
		user.setDescrizione(respUser.getData().getDescrizione());
		user.setDescrProfilo(respUser.getData().getDescrProfilo());
		user.setIdCentroDemat(respUser.getData().getIdCentroDemat());
		user.setCodiceCentro(respUser.getData().getCodiceCentro());		


		String nameProfilo = null;
		switch (user.getIdProfilo()) {
		case Constants.SUPERVISORE_ID:
			nameProfilo = Constants.SUPERVISORE;
			break;
		case Constants.SUPERVISORE_CENTRO_ID:
			nameProfilo = Constants.SUPERVISORE_CENTRO;
			break;
		case Constants.OPERATORE_CONFIGURAZIONE_ID:
			nameProfilo = Constants.OPERATORE_CONFIGURAZIONE;
			break;
		case Constants.OPERATORE_ACCETTAZIONE_ID:
			nameProfilo = Constants.OPERATORE_ACCETTAZIONE;
                        break;
		case Constants.OPERATORE_NORMALIZZAZIONE_ID:
			nameProfilo = Constants.OPERATORE_NORMALIZZAZIONE;
			break;
		case Constants.OPERATORE_GESTORE_SCATOLE_ID:
			nameProfilo = Constants.OPERATORE_GESTORE_SCATOLE;
			break;
		case Constants.OPERATORE_GENERICO_ID:
			nameProfilo = Constants.OPERATORE_GENERICO;
			break;
		}

		role.setName(nameProfilo);
		List<Role> roles = new ArrayList<Role>();
		roles.add(role);
		user.setAuthorities(roles);
		SessionUtil.removeObjectFromSession(SessionConstants.USER);
		SessionUtil.setObjectInSession(SessionConstants.USER, user);
		reqLogin.setIdPostazione(1);
		Response<?> response = loginService.createLoginAccesso(userRequest.setData(reqLogin));
		//TODO:idAccesso = stringa o BigDecimal??? --- dal service restituisce bigdecimal
//		try{
//			String idAccesso = (String) response.getData();
//			user.setIdAccessi(Long.valueOf(idAccesso));
//			
//		}catch (Exception e) {
		Double d = (Double)response.getData();
		long l = (new Double(d)).longValue();
			user.setIdAccessi(l );
//		}
		
		
		}catch(Exception e) {
			log.error("Error "+e.getMessage()+"  ",e);
			throw new UsernameNotFoundException(e.getMessage());
		}

		return user;
	}

}
