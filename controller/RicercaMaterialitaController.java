package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.net.MalformedURLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.RicercaMaterialitaService;
import it.citel.postel.commonLib.rest.model.Response;

@Controller
@RequestMapping("/materialita")
public class RicercaMaterialitaController {
	
	static final Logger log = LogManager.getLogger(RicercaMaterialitaController.class);
	
	@Autowired private RicercaMaterialitaService materialitaService;
	
	@RequestMapping(value = "/ricercaMaterialita", method = { RequestMethod.GET})
	public String ricercaMaterialita() throws MalformedURLException, IOException, Exception {
		log.info("ricercaMaterialita show page");
		return "ricercaMaterialita";
		
	}
	
	@RequestMapping(value = "/ricercaMaterialitaIndescr", method = { RequestMethod.GET})
	public String ricercaMaterialitaIndescr() throws MalformedURLException, IOException, Exception {
		log.info("ricercaMaterialitaIndescr show page");
		return "ricercaMaterialitaIndescritta";
		
	}
	
	@RequestMapping(value = "/datiMaterialita", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> recuperaDatiMaterialita(@RequestParam String codiceOggetto) {
		log.info("recuperaDatiMaterialita.. start ");
		Response<?> response = null;
		System.out.println(codiceOggetto);
		
		try {
			
			response = materialitaService.getInfoCodOggetto(codiceOggetto); 
					
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		log.info("recuperaDatiMaterialita.. end");
		return response;
	}
	
	//Indescr
	@RequestMapping(value = "/datiMaterialitaIndescr", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> recuperaDatiMaterialitaIndescr(@RequestParam String codiceOggetto) {
		log.info("recuperaDatiMaterialitaIndescr.. start ");
		Response<?> response = null;
		System.out.println(codiceOggetto);
		
		try {
			
			response = materialitaService.getInfoCodOggettoIndescr(codiceOggetto); 
					
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		log.info("recuperaDatiMaterialitaIndescr.. end");
		return response;
	}
	
	@RequestMapping(value = "/flussoMaterialita", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> recuperaFlussoMaterialita(@RequestParam String codiceOggetto) {
		log.info("recuperaFlussiMaterialita.. start ");
		Response<?> response = null;

		try {
			response = materialitaService.getFlussoCodOggetto(codiceOggetto); 
					
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		log.info("recuperaFlussiMaterialita.. end");
		return response;
	}

}
