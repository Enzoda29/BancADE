package it.citel.postel.bancarizzazioneGUI.controller;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.AccettazioneService;
import it.citel.postel.bancarizzazioneGUI.service.ArchiviazioneService;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestPreadv;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.utils.SanitizerCustom;

@Controller
@RequestMapping("/archiviazione")
public class ArchiviazioneController {
	static final Logger log = LogManager.getLogger(ArchiviazioneController.class);
	@Autowired
	ArchiviazioneService archiviazioneService;

	@RequestMapping(value = "", method = { RequestMethod.GET, RequestMethod.POST })
	public String archiviazione(@RequestParam(value = "idCliente", defaultValue = "") String idCliente,
			@RequestParam(value = "codiceScatola", defaultValue = "") String codiceScatola, Model model) {
		log.info("archiviazione show page");
		model.addAttribute("idCliente", idCliente);
		model.addAttribute("codiceScatola", codiceScatola);
		return "archiviazione/archiviazioneScatole";

	}

	@RequestMapping(value = "/dettaglio/{macroservizio_client_id}", method = { RequestMethod.GET })
	public String dettaglio(@PathVariable("macroservizio_client_id") String macroservizio_client_id,
			@RequestParam(value = "id_cliente", defaultValue = "") String idCliente,
			@RequestParam(value = "codice_scatola", defaultValue = "") String codiceScatola, Model model)
			throws MalformedURLException, IOException, Exception {
		log.info("dettaglio scatole archiviabili -> macroservizio_client_id " + macroservizio_client_id);
		model.addAttribute("macroservizio_client_id", macroservizio_client_id);
		model.addAttribute("idCliente", idCliente);
		model.addAttribute("codiceScatola", codiceScatola);
		return "archiviazione/archiviazioneScatole_dettaglio";

	}
	
	
	@RequestMapping(value = "/dataTable", method = { RequestMethod.GET})
	@ResponseBody
	public String dataTableScatoleConformi(@RequestParam(value = "identificativoCliente", required=false) String identificativoCliente, @RequestParam(value = "codiceScatola", required=false) String codiceScatola) throws MalformedURLException, IOException, Exception {
		log.info("dataTable preview");
		Response<?> response = null;
		try {
			
			response = archiviazioneService.elencoScatole(identificativoCliente,codiceScatola);

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
		log.info("dataTable preview.. end");
		return (String) response.getData();

	}
	
	@RequestMapping(value = "/dataTable/details", method = { RequestMethod.GET})
	@ResponseBody
	public String dataTableScatoleArchivio(@RequestParam("aggregato") String aggregato,
			@RequestParam("tipo_doc_id") String tipo_doc_id,
			@RequestParam("macroservizio_client_id") BigDecimal macroservizio_client_id)
			throws MalformedURLException, IOException, Exception {
		log.info("dataTableScatoleArchivio");
		Response<?> response = null;
		try {

			response = archiviazioneService.elencoScatoleArchiviabili(macroservizio_client_id, tipo_doc_id, aggregato);

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
		log.info("dataTableScatoleArchivio.. end");
		return (String) response.getData();

	}
	
	@RequestMapping(value = "/elencoClienti", method = { RequestMethod.GET })
	@ResponseBody
	public Map<String, List<String>> elencoClienti(@RequestParam("identificativoCliente") String identificativoCliente) {
		
		log.info("elencoClienti.. start ");
		Map<String, List<String>> response = null;
		try {
			
			response = archiviazioneService.elencoClienti(identificativoCliente);
			
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);				
		} catch (IOException e) {
			log.error(e.getMessage(), e);				
		} catch (Exception e) {
			log.error(e.getMessage(), e);				
		}
		log.info("elencoClienti.. end");
		return response;
	}
	
	@RequestMapping(value = "/elencoTipiDoc", method = { RequestMethod.GET})
	@ResponseBody
	public Response<?> elencoTipiDoc(@RequestParam(value = "microservizioClientId", required=true) BigDecimal microservizioClientId) {	
		log.info("elencoTipiDoc.. start ");
		Response<?> response = null;
		
		try {
			
			response = archiviazioneService.elencoTipiDoc(microservizioClientId);
					
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
		log.info("elencoTipiDoc.. end");
		return response;
	}
	
	@RequestMapping(value = "/elencoAggregati", method = { RequestMethod.GET})
	@ResponseBody
	public Response<?> elencoAggregati() {	
		log.info("elencoAggregati.. start ");
		Response<?> response = null;
		
		try {
			
			response = archiviazioneService.elencoAggregati();
					
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
		log.info("elencoAggregati.. end");
		return response;
	}

}
