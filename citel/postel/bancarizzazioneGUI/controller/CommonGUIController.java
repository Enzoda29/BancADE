package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.citel.postel.bancarizzazioneGUI.service.CommonGuiService;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestGetMacroservizioByCliServ;
import it.citel.postel.commonLib.rest.model.Response;

@RestController
@RequestMapping("/common")
public class CommonGUIController {

	static final Logger log = LogManager.getLogger(CommonGUIController.class);
	
	@Autowired
	CommonGuiService commonGuiService;
	
	/**
	 * Ritona una lista di clienti filtrata per likeDescription del campo identificazione_cliente
	 */
	@RequestMapping(value = "/getClientiAutocomplete", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<?> getClientiAutocomplete(@RequestParam("query") String query) {
		log.info("Inizio getComboClienti");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			Request<String> request = new Request<String>();
			request.setData(query);
			response =   commonGuiService.getClientiAutocomplete(request);

			log.debug("Clienti trovati: " + response.getData().size());
//			response.setMessage("OK");
//			response.setStatus(true);          
//			response.setData(listStr);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		}
		log.debug("getComboClienti terminata");
		return response;
	}
	
	@RequestMapping(value = "/getAllCentroDemat", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<?> getAllCentroDemat() {
		log.info("Inizio getAllCentroDemat");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response =   commonGuiService.getAllCentroDemat();

			log.debug("Centro Dematerializzati trovati: " + response.getData().size());
//			response.setMessage("OK");
//			response.setStatus(true);          
//			response.setData(listStr);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		}
		log.debug("getAllCentroDemat terminata");
		return response;
	}
	
	@RequestMapping(value = "/getComboClienti", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<?> getComboClienti(Model model) {
		log.info("Inizio getComboClienti");

		Response<?> response = new Response<List<Combo>>();
		try {
			response =   commonGuiService.getComboClienti();
			log.debug("Clienti trovati: " + ((List<?>) response.getData()).size());
			response.setMessage("OK");
			response.setStatus(true);          
	
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		}
		log.debug("getComboClienti terminata");
		return response;
	}
	
	
	
	
	/**
	 * @param request
	 * @return lista (input select) di servizi by cliente
	 */
	@RequestMapping(value = "/lstServiziByCliente", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<List<Combo>>  lstServiziByCliente(@RequestParam("idCliente") BigDecimal idCliente) {
		
		Request<BigDecimal> request = new Request<BigDecimal>();
		request.setData(idCliente);
		log.debug("Inizio get lista servizi filtrata per cliente");
		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = commonGuiService.getComboServiziByCliente(request); 
			log.debug("elementi trovati: " + response.toString());			
		} catch (MalformedURLException e) {
			log.error(e.getMessage(),e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - "+e.getMessage());		
		} catch (IOException e) {
			log.error(e.getMessage(),e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - "+e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - "+e.getMessage());
		}
		
		log.debug("Fine get lista servizi filtrata per cliente");
		return response;
	}
	
	/**
	 * ritorna una lista di cliente per tag select nella forma value=id cliente , descrizione=nomecliente + code (es: ENL (2))
	 */
	@RequestMapping(value = "/getComboClientiWhitCode", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<?> getComboClientiWhitCode(Model model) {
		log.info("Inizio getComboClientiWhitCode");

		Response<?> response = new Response<List<Combo>>();
		try {
			response =   commonGuiService.getComboClientiWhitCode();
			log.debug("Clienti trovati: " + ((List<?>) response.getData()).size());
			response.setMessage("OK");
			response.setStatus(true);          
	
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		}
		log.debug("getComboClientiWhitCode terminata");
		return response;
	}
	
	@RequestMapping(value = "/getAllUserProfiles", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<?> getAllUserProfiles() {
		log.info("Inizio getAllCentroDemat");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response =   commonGuiService.getAllUserProfiles();

			log.debug("Centro Dematerializzati trovati: " + response.getData().size());
//			response.setMessage("OK");
//			response.setStatus(true);          
//			response.setData(listStr);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		}
		log.debug("getAllCentroDemat terminata");
		return response;
	}
	
	/**
	 * Ritorna una lista di macroservizi filtrata per cliente e servizio 
	 * @return
	 */
	@RequestMapping(value = "/getMacroservByCliAndServ", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> getMacroservByCliAndServ(@RequestBody Request<RequestGetMacroservizioByCliServ> request) {
		log.info("Inizio getMacroservByCliAndServ");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response =   commonGuiService.getMacroservByCliAndServ(request);

			log.debug("macroserivizi trovati: " + response.getData().size());
//			response.setMessage("OK");
//			response.setStatus(true);          
//			response.setData(listStr);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		}
		log.debug("getMacroservByCliAndServ terminata");
		return response;
	}
	
	/**
	 * Ritorna una lista di Indirizzi di restituzione associati ad un cliente
	 * @return
	 */
	@RequestMapping(value = "/getIndirizzoRestituzioneByCli", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> getIndirizzoRestituzioneByCli(@RequestBody Request<RequestGetMacroservizioByCliServ> request) {
		log.info("Inizio getIndirizzoRestituzioneByCli");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response =   commonGuiService.getIndirizzoRestituzioneByCli(request);

			log.debug("Indirizzi di rest. by cliente trovati: " + response.getData().size());
//			response.setMessage("OK");
//			response.setStatus(true);          
//			response.setData(listStr);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
			return response;
		}
		log.debug("getIndirizzoRestituzioneByCli terminata");
		return response;
	}
}
