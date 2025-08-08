package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.MonitorService;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.objects.monitor.MonitorCaricoObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestMonitor;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;

@Controller
@RequestMapping("/monitoraggio")
public class MonitoraggioController {
	static final Logger log = LogManager.getLogger(MonitoraggioController.class);
	@Autowired
	MonitorService monitorService;

	@RequestMapping(value = "/monitorDiCarico", method = { RequestMethod.GET, RequestMethod.POST })
	public String showMonitoraggio(@RequestParam("tipoMonitor") String tipoMonitor, Model model) {
		log.debug("showMonitorDiCarico");
		model.addAttribute("tipoMonitor", tipoMonitor);
		return "monitorDiCarico";
	}
	
	@RequestMapping(value = "/monitorSLA", method = { RequestMethod.GET, RequestMethod.POST })
	public String showMonitorSLA(@RequestParam("tipoMonitor") String tipoMonitor, Model model) {
		log.debug("show MonitorSLA");
		model.addAttribute("tipoMonitor", tipoMonitor);
		return "monitorSLA";
	}
	
	@RequestMapping(value = "/monitorScatole", method = { RequestMethod.GET, RequestMethod.POST })
	public String monitorScatole() {
		log.debug("show monitorScatole");
		return "monitorScatole";
	}
	

	/**
	 * tabella monitor
	 * 
	 * TODO: non piu usato - sostituito da creazione dinamica della pagina
	 */
	@RequestMapping(value = "/dataTableMonitorCarico.json", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public String monitorCarico(
			@RequestParam("sort") String sort, 
			@RequestParam("order") String order,
			@RequestParam("offset") String offset, 
			@RequestParam("limit") String limit,
			@RequestParam(value = "username", defaultValue = "") String username,
			@RequestParam(value = "centroDematID", defaultValue = "") String centroDematID,
			@RequestParam(value = "clienteID", defaultValue = "") String clienteID, Model model) {
		log.debug("monitor: carico");

		String result = Constants.NO_ROW_FOUND_TABLE;
		
		try {
			@SuppressWarnings("unchecked")
			Request<RequestMonitor> request = (Request<RequestMonitor>) monitorService.buildRequest(sort, order, offset,
					limit, username, centroDematID, clienteID);
			result = monitorService.monitorCarico(request);
			log.debug("monitor: carico");
			List<MonitorCaricoObj> listMonitorCarico = new ArrayList<MonitorCaricoObj>();
			MonitorCaricoObj mco = new MonitorCaricoObj();
			listMonitorCarico.add(mco);
			
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		}
		return result;
	}
	
	/**
	 * return  monitor di carico 
	 */
	@RequestMapping(value = "/getMonitorCarico", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<List<MonitorCaricoObj>> getMonitorCarico(
			@RequestParam(value = "tipoMonTypeId", defaultValue = "") String tipoMonTypeId,
			@RequestParam(value = "username", defaultValue = "") String username,
			@RequestParam(value = "centroDematID", defaultValue = "") String centroDematID,
			@RequestParam(value = "clienteID", defaultValue = "") String clienteID, Model model) {
		log.debug("monitor: getMonitorCarico");

		Response<List<MonitorCaricoObj>> response = new Response<List<MonitorCaricoObj>>();
		try {
//			@SuppressWarnings("unchecked")
			Request<RequestMonitor> request = new Request<RequestMonitor>();
			RequestMonitor reqMon = new RequestMonitor();
			reqMon.setUsername(username);
			reqMon.setTipoMonTypeId(new BigDecimal(tipoMonTypeId));
			if(StringUtils.isNotEmpty(centroDematID)) {
				reqMon.setIdCentroDemat(new BigDecimal(centroDematID));
			}
			if(StringUtils.isNotEmpty(clienteID)) {
				reqMon.setClienteID(new BigDecimal(clienteID));
			}
			
			request.setData(reqMon);
			response = monitorService.getMonitorByTypeID(request);
			
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
		log.debug("getMonitorCarico terminata");
		return response;
	}
	
	
	/**
	 * return  monitor di carico 
	 */
	@RequestMapping(value = "/getMonitorSLA", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<List<MonitorCaricoObj>> getMonitorSLA(
			@RequestParam(value = "tipoMonTypeId", defaultValue = "") String tipoMonTypeId,
			@RequestParam(value = "username", defaultValue = "") String username,
			@RequestParam(value = "centroDematID", defaultValue = "") String centroDematID,
			@RequestParam(value = "clienteID", defaultValue = "") String clienteID, Model model) {
		log.debug("monitor: getMonitorSLA");

		Response<List<MonitorCaricoObj>> response = new Response<List<MonitorCaricoObj>>();
		try {
//			@SuppressWarnings("unchecked")
			Request<RequestMonitor> request = new Request<RequestMonitor>();
			RequestMonitor reqMon = new RequestMonitor();
			reqMon.setUsername(username);
			reqMon.setTipoMonTypeId(new BigDecimal(tipoMonTypeId));
			if(StringUtils.isNotEmpty(centroDematID)) {
				reqMon.setIdCentroDemat(new BigDecimal(centroDematID));
			}
			if(StringUtils.isNotEmpty(clienteID)) {
				reqMon.setClienteID(new BigDecimal(clienteID));
			}
			
			request.setData(reqMon);
			response = monitorService.getMonitorByTypeID(request);
			
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
		log.debug("getMonitorSLA terminata");
		return response;
	}
	
	//non usato
	@RequestMapping(value = "/dataTableMonitorSla.json", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public String monitorSla(@RequestParam("sort") String sort, 
			@RequestParam("order") String order,
			@RequestParam("offset") String offset, 
			@RequestParam("limit") String limit,
			@RequestParam(value = "username", defaultValue = "") String username,
			@RequestParam(value = "centroDemat", defaultValue = "") String centroDemat,
			@RequestParam(value = "idPaTipoIstanza", defaultValue = "") String idPaTipoIstanza, 
			Model model) {
		log.debug("monitor: sla");

		String result = Constants.NO_ROW_FOUND_TABLE;
		try {
			@SuppressWarnings("unchecked")
			Request<RequestMonitor> request = (Request<RequestMonitor>) monitorService.buildRequest(sort, order, offset,
					limit, username, centroDemat, idPaTipoIstanza);
			result = monitorService.monitorSla(request);
	
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		}
		return result;
	}
	//non usato
	@RequestMapping(value = "/dataTableAlerting.json", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public String getAlerting(@RequestParam("sort") String sort, @RequestParam("order") String order,
			@RequestParam("offset") String offset, @RequestParam("limit") String limit, @RequestParam("centroDemat") String centroDemat, Model model) {
		log.debug("getAlerting: sla");

		String result = Constants.NO_ROW_FOUND_TABLE;
		try {
			@SuppressWarnings("unchecked")
			Request<RequestMonitor> request = (Request<RequestMonitor>) monitorService.buildRequest(sort, order, offset,
					limit, null, centroDemat, null);
			result = monitorService.getAlerting(request);
	
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return Constants.NO_ROW_FOUND_TABLE;
		}
		return result;
	}
	
	@RequestMapping(value = "/detailsMonitor", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<?> detailsMonitor(
			@RequestParam(value = "username", defaultValue = "") String username,
			@RequestParam(value = "centroDemat", defaultValue = "") String centroDemat,
			@RequestParam(value = "idPaTipoIstanzaCarico", defaultValue = "") String idPaTipoIstanzaCarico,
			@RequestParam(value = "idPaTipoIstanzaSla", defaultValue = "") String idPaTipoIstanzaSla, Model model) {
		log.debug("detailsMonitor");

		Response<?> response = null;
		try {
			response = monitorService.detailsMonitor(username,centroDemat,idPaTipoIstanzaCarico,idPaTipoIstanzaSla);		
	
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return response;
		}
		return response;
	}
		
	@RequestMapping(value = "/getDettaglioMonitorDiCarico", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResponseDynamicTable getDettaglioMonitorDiCarico(@RequestParam(value = "clienteID", defaultValue = "") String clienteID,@RequestParam(value="tipoLavorazioneTypeId")long tipoLavorazioneTypeId) {
		log.debug("monitor: getDettaglioMonitorDiCarico");
		ResponseDynamicTable  response = new  ResponseDynamicTable();
		RequestMonitor reqMon = new RequestMonitor();
		if(StringUtils.isNotEmpty(clienteID)) {
			reqMon.setClienteID(new BigDecimal(clienteID));
		}
		reqMon.setTipoLavorazioneTypeId(tipoLavorazioneTypeId);
		try {
			response = monitorService.getDettaglioMonitorDiCarico(reqMon);
		} catch (Exception e) {
			response.setMessage("KO - " + e.getMessage());
        	response.setStatus(false);
        	response.setData(null);
            log.error("Exception: " + e.getMessage(), e);
		}
		return response;
	}
	
	@RequestMapping(value = "/escludereOggettoDallElenco", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<Boolean> escludereOggettoDallElenco(@RequestParam(value = "idSLA") String idSLA) {
		log.debug("monitor: getDettaglioMonitorDiCarico");
		Response<Boolean>  response = null;
		try {
			response = monitorService.escludereOggettoDallElenco(idSLA);
		} catch (Exception e) {
			response.setMessage("KO - " + e.getMessage());
        	response.setStatus(false);
        	response.setData(null);
            log.error("Exception: " + e.getMessage(), e);
		}
		return response;
	}

}
