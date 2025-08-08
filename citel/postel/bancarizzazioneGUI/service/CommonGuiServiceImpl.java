package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestGetMacroservizioByCliServ;
import it.citel.postel.commonLib.rest.model.Response;

@SuppressWarnings("unchecked")
@Service
public class CommonGuiServiceImpl implements CommonGuiService {

	static final Logger log = LogManager.getLogger(CommonGuiServiceImpl.class);
    @Autowired
    private DevRestConstants devRestConstants;
    
	/**
	 * ritorna la url completa dell'end point di bancarizzazione service + common + metodo
	 * @param urlMapping - Request Mapping value
	 * @return full mapping endpoint Bancarizzazione Service
	 */
	private String urlBancServiceCommon(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.COMMON + "/"+ urlMapping;
		return ret;
	}
    
	/**
	 *Ritorna una lista di combo di clienti per tag select
	 */
	public Response<List<Combo>> getClientiAutocomplete(Request<String> request) throws MalformedURLException, IOException, Exception {
		log.info("getComboClienti start ");
		Response<List<Combo>> response = new Response<>();
		response =  (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServiceCommon("getClientiAutocomplete"), request,
				Response.class);		
		return response;
		
	}
	
	/**
	 * Ritorna una lista di combo di tutti i centri di dematerializzazione
	 */
	public Response<List<Combo>> getAllCentroDemat() throws MalformedURLException, IOException, Exception {
		log.info("getComboClienti start ");
		Response<List<Combo>> response = new Response<>();
		response =  (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceCommon("getAllCentroDemat"),
				Response.class);		
		return response;
		
	}
	
	
	/**
	 * 
	 *Ritorna una lista di combo di clienti per tag select
	 */
	public Response<?> getComboClienti() throws MalformedURLException, IOException, Exception {
		log.info("getComboClienti start ");
		Response<List<Combo>> response = new Response<>();
		response =  (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceCommon("getComboClienti"),
				Response.class);		
		return response;
		
	}
	
	/**
	 *Ritorna una lista di combo di servizi filtrata per clienti per tag select
	 */
	public Response<List<Combo>> getComboServiziByCliente(Request<BigDecimal> request) throws MalformedURLException, IOException, Exception {
		log.info("getComboServiziByCliente start ");
		Response<List<Combo>> response = new Response<>();
		response =  (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServiceCommon("getComboServiziByCliente"),request,
				Response.class);	
		log.info("getComboServiziByCliente fine.");
		return response;
		
	}

	/**
	 *Ritorna una lista di combo di clienti per tag select con descrizione = descrizione + (code)
	 */
	public Response<?> getComboClientiWhitCode() throws MalformedURLException, IOException, Exception {
		log.info("getComboClientiWhitCode start ");
		Response<List<Combo>> response = new Response<>();
		response =  (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceCommon("getComboClientiWhitCode"),
				Response.class);		
		return response;
		
	}
	
	/**
	 * 
	 *Ritorna una lista di combo di clienti per tag select
	 */
	public Response<List<Combo>> getAllUserProfiles() throws MalformedURLException, IOException, Exception {
		log.info("getAllUserProfiles start ");
		Response<List<Combo>> response = new Response<>();
		response =  (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceCommon("getAllUserProfiles"),
				Response.class);	
		log.info("getAllUserProfiles fine ");
		return response;
		
	}
	
	
	/**
	 *Ritorna una lista di macroservizi filtrata per cliente e servizio
	 */
	public Response<List<Combo>> getMacroservByCliAndServ(Request<RequestGetMacroservizioByCliServ> request) throws MalformedURLException, IOException, Exception {
		log.info("getMacroservByCliAndServ start ");
		Response<List<Combo>> response = new Response<>();
		response =  (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServiceCommon("getMacroservByCliAndServ"), request, Response.class);	
		log.info("getMacroservByCliAndServ fine ");
		return response;
		
	}
	
	/**
	 *Ritorna una lista di Indirizzi di rest filtrata per cliente
	 */
	public Response<List<Combo>> getIndirizzoRestituzioneByCli(Request<RequestGetMacroservizioByCliServ> request) throws MalformedURLException, IOException, Exception {
		log.info("getIndirizzoRestituzioneByCli start ");
		Response<List<Combo>> response = new Response<>();
		response =  (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServiceCommon("getIndirizzoRestituzioneByCli"), request, Response.class);	
		log.info("getIndirizzoRestituzioneByCli fine ");
		return response;
		
	}
	
	
}
