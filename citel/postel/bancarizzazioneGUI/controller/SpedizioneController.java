package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.net.MalformedURLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.SpedizioneService;
import it.citel.postel.commonLib.objects.spedizione.sda.ReturnRestStampaLdvSDA;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestGetDettagliSpedizione;
import it.citel.postel.commonLib.rest.model.RequestSpedizione;
import it.citel.postel.commonLib.rest.model.Response;

@Controller
@RequestMapping("/spedizione")
public class SpedizioneController {
	static final Logger log = LogManager.getLogger(SpedizioneController.class);
	
	@Autowired SpedizioneService spedizioneService;

	@RequestMapping(value = "spedizione", method = { RequestMethod.GET, RequestMethod.POST })
	public String showSpedizione() {
		log.debug("showSpedizione");
		return "spedizione";
	}
	
	@RequestMapping(value = "spedizioneRichiediStampaSDA", method = { RequestMethod.GET, RequestMethod.POST })
	public String showSpedizioneRichiediStampaSDA() {
		log.debug("showSpedizione");
		return "spedizioneRichiediStampaSDA";
	}
	
//	@RequestMapping(value = "/stampaLdvSDA", method = { RequestMethod.GET, RequestMethod.POST })
//	@ResponseBody
//	public Response<?> stampaLdvSDA(@RequestBody Request<RequestSpedizione> request) {
//		log.debug("spedizione: cerca");
//		Response<?> response = null;
//		try {
//			response = spedizioneService.stampaLdvSDA(request);
//		} catch (MalformedURLException e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		} catch (IOException e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		} catch (Exception e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		}
//		return response;
//	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//send request for SDA WS
//	s
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	@RequestMapping(value = "/ricercaSpedizione", method = { RequestMethod.GET, RequestMethod.POST })
//	@ResponseBody
//	public Response<?> ricercaSpedizione(@RequestBody Request<RequestSpedizioneCustom> request) {
//		log.debug("spedizione: cerca");
//		Response<?> response = null;
//		try {
//			log.debug("spedizione: cerca->request: "+request);
//			response = spedizioneService.ricercaSpedizione(request);
//		} catch (MalformedURLException e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		} catch (IOException e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		} catch (Exception e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		}
//		return response;
//	}
//	
	

	

	
}
