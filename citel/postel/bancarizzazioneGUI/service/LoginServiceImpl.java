package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import javax.servlet.ServletException;

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
public class LoginServiceImpl implements LoginService{
	static final Logger log = LogManager.getLogger(LoginServiceImpl.class);
	
    @Autowired
    private DevRestConstants devRestConstants;
	
	@Override
	public Response<?> autenticazione(Request<RequestLogin> request)
			throws MalformedURLException, IOException, Exception {
		log.info("autenticazione start ");
		log.info("URI: " + devRestConstants.AUTORIZZAZIONE_BASE_URL+"/autenticazione");
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
		log.info("URI: " + devRestConstants.AUTORIZZAZIONE_BASE_URL+"/getListaPostazioni");
		Response<ResponsePostazioni> responsePostazioni = (Response<ResponsePostazioni>) RESTfulClient.sendGet(
					devRestConstants.AUTORIZZAZIONE_BASE_URL+"/getListaPostazione", 
					Response.class);
		
		log.info(" response status: "+responsePostazioni.getStatus());
		return responsePostazioni;
	}

	@Override
	public Response<?> createLoginAccesso(Request<RequestLogin> request)
			throws MalformedURLException, IOException, Exception {
		
		log.info("loadPostazioni start ");
		Response<Long> respAccesso = (Response<Long>) RESTfulClient.sendPost(devRestConstants.AUTORIZZAZIONE_BASE_URL+"/createLoginAccesso", request,	Response.class);
		
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
			throws IOException, ServletException {
		
		log.info("removeAccesso start ");
		Response<String> respAccesso;
		try {
			respAccesso = (Response<String>) RESTfulClient.sendPost(devRestConstants.AUTORIZZAZIONE_BASE_URL+"/setLogoutAccesso", request,	Response.class);
		} catch (Exception e) {
			log.error("ERROR: "+e.getMessage()+" ",e);
			throw new ServletException("Si è verificato un problema durante il logout");
		}
		
		log.info(" response status: "+respAccesso.getStatus());
		return respAccesso;
	}

	@Override
	public Response<?> checkProfiloSharedPresent(Request<RequestLogin> request) throws MalformedURLException, IOException, Exception {
		log.info("getLastAccessUser start ");
		Response<Boolean> resp = (Response<Boolean>) RESTfulClient.sendPost(devRestConstants.AUTORIZZAZIONE_BASE_URL+"/checkProfiloSharedPresent", request,	Response.class);
		
		log.info(" response status: "+resp.getStatus());
		return resp;
	}
	
}
