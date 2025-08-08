package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazione.common.model.CdMon;
import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.model.Alerting;
import it.citel.postel.commonLib.objects.monitor.MonitorCaricoObj;
import it.citel.postel.commonLib.objects.monitor.MonitorObj;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestMonitor;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAlerting;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;
import it.citel.postel.commonLib.rest.model.ResponseMonitor;
import it.citel.postel.commonLib.rest.model.ResponseMonitorCarico;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
public class MonitorServiceImpl implements MonitorService {
	
	static final Logger log = LogManager.getLogger(MonitorServiceImpl.class);
    @Autowired private DevRestConstants devRestConstants;
	

	@Override
	public String monitorCarico(Request<RequestMonitor> request)
			throws MalformedURLException, IOException, Exception {
		log.info("monitorCarico start ");
	
		@SuppressWarnings("unchecked")
		ResponseMonitorCarico responseMonitorCarico = (ResponseMonitorCarico) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.MONITOR + "/getListaMonitorCarico", request,
				ResponseMonitorCarico.class);	
		
		ResponseMonitorCarico responseMonitorCarico1 = new ResponseMonitorCarico();
		
		List<MonitorCaricoObj> listMonitorCarico = new ArrayList<MonitorCaricoObj>();
		MonitorCaricoObj m = new MonitorCaricoObj();
		
		List<CdMon> listCdMon = new ArrayList<CdMon>();
		CdMon mon = new CdMon();
		mon.setVal01("ENI");
		mon.setVal02("Raccomandate");
		mon.setVal03("ENL-R-ENL1");
		mon.setVal04("1200");
		mon.setVal05("800");
		mon.setVal06("100");
		mon.setVal07("0");
		mon.setVal08("500");
		mon.setVal09("200");
		mon.setVal10("50");
		mon.setVal11("20");
		mon.setVal12("32");
		listCdMon.add(mon);
		
//		Cliente
//		Servizio
//		Macroservizio
//		Documenti<br>da scansionare
//		Documenti<br>scansionati
//		Documenti<br>non conformi
//		Documenti in <br>Data Entry
//		Documenti<br>DE OK
//		Doc da riscans<br>altra tipologia
//		Doc da riscans<br>illeggibile
//		Doc anomali<br>Non Sanabili
//		Doc anomali<br>Non Conformi
		
		
		
		
		
//		m.setCodiceCentroDemat("codiceCentro");
//		m.setCodiceTipoIstanza("istanza");
//		m.setDescrizione("descrizione");
//		m.setIdentificativoPa("id");
//		m.setIdentificativoPa("id");
//		m.setIdentificativoPa("id");
//		m.setIdentificativoPa("id");
//		m.setIdentificativoPa("id");
//		m.setIdentificativoPa("id");
//		m.setIdentificativoPa("id");
//		m.setIdentificativoPa("id");
//		m.setnDocInLavorazione(new BigDecimal(2));
		listMonitorCarico.add(m);
		listMonitorCarico.add(m);
		responseMonitorCarico.setTotalRow(1);
		responseMonitorCarico.setStatus(true);
//		responseMonitorCarico.setData(listMonitorCarico);
		responseMonitorCarico.setMessage("OK");
		
		
		
//		List<MonitorCaricoObj> listMonitorCarico =  responseMonitorCarico.getData();
		if(listMonitorCarico != null && !listMonitorCarico.isEmpty()){		
//			return JSONBuilderDataTable.buildTable(responseMonitorCarico.getTotalRow(), listMonitorCarico);
//			return JSONBuilderDataTable.buildTable(responseMonitorCarico.getTotalRow(), responseMonitorCarico.getData());
			}	
	
		return Constants.NO_ROW_FOUND_TABLE;
	}

	@Override
	public String monitorSla(Request<RequestMonitor> request)
			throws MalformedURLException, IOException, Exception {
		log.info("monitorSla start: ");

		ResponseMonitor response = (ResponseMonitor) RESTfulClient.sendPost(
				devRestConstants.MONITOR+"/getListaMonitorSla", request,
				ResponseMonitor.class);
		List<MonitorObj> responseMonitorSLA = response.getData();
		
		if(responseMonitorSLA != null && !responseMonitorSLA.isEmpty()){			
			return JSONBuilderDataTable.buildTable(response.getTotalRow(), responseMonitorSLA);
			}		
		return Constants.NO_ROW_FOUND_TABLE;
	}

	@Override
	public Request<?> buildRequest(String sort, String order, String offset, String limit, String username, String centroDematID, String clienteID) throws Exception {
		Request<RequestMonitor> request = new Request<>();
		RequestMonitor requestMonitor = new RequestMonitor();
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit));
		
		requestMonitor.setIdCentroDemat(new BigDecimal(centroDematID));
		
		if(StringUtils.isNotEmpty(clienteID)){
			requestMonitor.setClienteID(new BigDecimal(clienteID));
		}
		
		requestMonitor.setStart(startRow);
		requestMonitor.setEnd(endRow);
		requestMonitor.setOrder(order);
		requestMonitor.setSort(sort);
		request.setData(requestMonitor);
		return request;
	}


	@Override
	public Response<?> detailsMonitor(String username, String centroDemat, String idPaTipoIstanzaCarico,
			String idPaTipoIstanzaSla) throws Exception {
		log.info("detailsMonitor start ");
		Map<String,Object> mapRequest = new HashMap<>();
		mapRequest.put("username", username); mapRequest.put("centroDemat", centroDemat); mapRequest.put("idPaTipoIstanzaCarico", idPaTipoIstanzaCarico);
		mapRequest.put("idPaTipoIstanzaSla", idPaTipoIstanzaSla);
		Response<?> response = (Response<Map<String,Object>>) RESTfulClient.sendPost(
				devRestConstants.MONITOR+"/detailsMonitor", mapRequest,
				Response.class);
		return response;
	}

	@Override
	public String getAlerting(Request<RequestMonitor> request) throws Exception {
		log.info("getAlerting start ");
		ResponseAlerting response = (ResponseAlerting) RESTfulClient.sendPost(
				devRestConstants.MONITOR+"/getAlerting", request,
				ResponseAlerting.class);
		List<Alerting> responseAlerting = response.getData();
		
		if(responseAlerting != null && !responseAlerting.isEmpty()){			
			return JSONBuilderDataTable.buildTable(response.getTotalRow(), responseAlerting);
			}		
		return Constants.NO_ROW_FOUND_TABLE;
	}
	
	@Override
	public Response<?> idPACaricoAutocomplete(String username, String centroDemat, String idPaTipoIstanzaCarico) throws Exception {
		log.info("idPACaricoAutocomplete start ");
		Map<String,Object> mapRequest = new HashMap<>();
		mapRequest.put("username", username); mapRequest.put("centroDemat", centroDemat); mapRequest.put("idPaTipoIstanzaCarico", idPaTipoIstanzaCarico);
		Response<?> response = (Response<Map<String,Object>>) RESTfulClient.sendPost(
				devRestConstants.MONITOR+"/idPACaricoAutocomplete", mapRequest,
				Response.class);
		return response;
	}
	@Override
	public Response<?> idPASlaAutocomplete(String username, String centroDemat, String idPaTipoIstanzaSla) throws Exception {
		log.info("idPASlaAutocomplete start ");
		Map<String,Object> mapRequest = new HashMap<>();
		mapRequest.put("username", username); mapRequest.put("centroDemat", centroDemat); mapRequest.put("idPaTipoIstanzaSla", idPaTipoIstanzaSla);
		Response<?> response = (Response<Map<String,Object>>) RESTfulClient.sendPost(
				devRestConstants.MONITOR+"/idPASlaAutocomplete", mapRequest,
				Response.class);
		return response;
	}
	
	@Override
	public Response <?> getAlertingExport (Request<?>request) throws MalformedURLException, IOException, Exception {
		log.info("getAlertingExport start ");
		Response<ResponseAlerting> response = new Response<>();
		ResponseAlerting responseAlerting = (ResponseAlerting) RESTfulClient.sendPost(
				devRestConstants.MONITOR+"/getAlertingExport", request,
				ResponseAlerting.class);		
		return response.setData(responseAlerting);
	}
	
	
	/**
	 * ritorna tutto l'oggetto response monitor filtrato per type id 
	 */
	public Response<List<MonitorCaricoObj>> getMonitorByTypeID(Request<RequestMonitor> request) throws MalformedURLException, IOException, Exception {
		log.info("getComboClienti start ");
		@SuppressWarnings("unchecked")
		Response<List<MonitorCaricoObj>> responseMonitorCarico = (Response<List<MonitorCaricoObj>>) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.MONITOR + "/getMonitorCarico", request,
				Response.class);	
		
		return responseMonitorCarico;
	}
	
	@Override
	public ResponseDynamicTable getDettaglioMonitorDiCarico(RequestMonitor request) throws Exception {
		log.info("getDettaglioMonitorDiCarico");
		ResponseDynamicTable responseDettaglioMonitorDiCarico = (ResponseDynamicTable) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.MONITOR + "/getDettaglioMonitorDiCarico", request,
				ResponseDynamicTable.class);
		
		return responseDettaglioMonitorDiCarico;
	}
	
	@Override
	public Response<Boolean> escludereOggettoDallElenco(String idSLA) throws Exception {
		log.info("escludereOggettoDallElenco");
		Request<String> req = new Request<String>();
		req.setData(idSLA);
		@SuppressWarnings("unchecked")
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.MONITOR + "/escludereOggettoDallElenco", req,
				Response.class);
		log.info(response.getStatus());
		return response;
	}
}
