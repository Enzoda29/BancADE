package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestLogin;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAccessi;
import it.citel.postel.commonLib.rest.model.ResponsePostazioni;
import it.citel.postel.commonLib.rest.model.ResponseUser;

@Service
public class HomeServiceImpl implements HomeService{
	static final Logger log = LogManager.getLogger(HomeServiceImpl.class);
	
    @Autowired
    private DevRestConstants devRestConstants;
	
	@Override
	public Response<?> autenticazione(Request<RequestLogin> request)
			throws MalformedURLException, IOException, Exception {
		log.info("autenticazione start ");
		Response<String> respAccesso = (Response<String>) RESTfulClient.sendPost(
				devRestConstants.AUTORIZZAZIONE_BASE_URL+"/autenticazione", request,
				Response.class);
		
		log.info(" response status: "+respAccesso.getStatus());
		return respAccesso;
	}

	@Override
	public Response<?> loadPostazioni()
			throws MalformedURLException, IOException, Exception {
		
		log.info("loadPostazioni start ");
		Response<ResponsePostazioni> responsePostazioni = (Response<ResponsePostazioni>) RESTfulClient.sendGet(
					devRestConstants.AUTORIZZAZIONE_BASE_URL+"/getListPostazioni", 
					Response.class);
		
		log.info(" response status: "+responsePostazioni.getStatus());
		return responsePostazioni;
	}

	@Override
	public Response<?> createLoginAccesso(Request<RequestLogin> request)
			throws MalformedURLException, IOException, Exception {
		
		log.info("loadPostazioni start ");
		Response<String> respAccesso = (Response<String>) RESTfulClient.sendPost(devRestConstants.AUTORIZZAZIONE_BASE_URL+"/createLoginAccesso", request,	Response.class);
		
		log.info(" response status: "+respAccesso.getStatus());
		return respAccesso;
	}
	
	@Override
	public ResponseUser getUserAccessFields(Request<RequestLogin> request)	throws MalformedURLException, IOException, Exception {
		
		log.info("getUserFields start ");
		ResponseUser respUser = (ResponseUser) RESTfulClient.sendPost(devRestConstants.AUTORIZZAZIONE_BASE_URL+"/getUserAccessFields", request,	ResponseUser.class);
		
		log.info(" response status: "+respUser.getStatus());
		return respUser;
	}

	@Override
	public ResponseAccessi getLastAccessUser(Request<RequestLogin> request)
			throws MalformedURLException, IOException, Exception {
		
		log.info("getLastAccessUser start ");
		ResponseAccessi respAccess = (ResponseAccessi) RESTfulClient.sendPost(devRestConstants.AUTORIZZAZIONE_BASE_URL+"/getLastAccessUser", request,	ResponseAccessi.class);
		
		log.info(" response status: "+respAccess.getStatus());
		return respAccess;
	}
	
	@Override
	public Response<?> setLogoutAccesso(Request<RequestLogin> request)
			throws MalformedURLException, IOException, Exception {
		
		log.info("removeAccesso start ");
		Response<String> respAccesso = (Response<String>) RESTfulClient.sendPost(devRestConstants.AUTORIZZAZIONE_BASE_URL+"/setLogoutAccesso", request,	Response.class);
		
		log.info(" response status: "+respAccesso.getStatus());
		return respAccesso;
	}
	
}
