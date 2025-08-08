package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.constants.ScatolaCostants;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestConfermaScatolaNConfRiscan;
import it.citel.postel.commonLib.rest.model.RequestScatoleNConfDaRiscan;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTableObj;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

/**
 * TODO: spostare qui tutto cio che riguarda scatole 
 * @author GF
 *
 */
@Service
public class ScatoleServiceImpl implements ScatoleService{
	
static final Logger log = LogManager.getLogger(DispacciServiceImpl.class);
	
	@Autowired
	private DevRestConstants devRestConstants;
	
	/**
	 * ritorna la url completa dell'end point di bancarizzazione service + scatole + metodo
	 * @param urlMapping - Request Mapping value
	 * @return full mapping endpoint Bancarizzazione Service
	 */
	private String urlBancServiceScatole(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.SCATOLE + "/"+ urlMapping;
		return ret;
	}
	
	
	/**
	 * @author GF
	 */
	@Override
	public Request<RequestScatoleNConfDaRiscan> buildRequestScatolaNConfDaRiscan(String sort, String order, String offset, String limit, String idCentroDemat) {
		
		Request<RequestScatoleNConfDaRiscan> request = new Request<RequestScatoleNConfDaRiscan>();
		RequestScatoleNConfDaRiscan requestData = new RequestScatoleNConfDaRiscan();
		
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit)) ;
		
		
		requestData.setIdCentroDemat(new BigDecimal(idCentroDemat));
		requestData.setStart(startRow);
		requestData.setEnd(endRow);
		requestData.setOrder(order);
		requestData.setSort(sort);
		
		request.setData(requestData);
		return request;
	}
	
	/**
	 * @author GF
	 */
	@Override
	public String getLstScatoleNConfDaRiscan(Request<RequestScatoleNConfDaRiscan> request)	throws MalformedURLException, IOException, Exception {
		log.info("dataTableRicercaScatole start ");
		
//		ResponsePaginationAndValueObj responseGUIData = new ResponsePaginationAndValueObj();
//		Response<ResponsePaginationAndValueObj> responseGUI = new Response<ResponsePaginationAndValueObj>();
		 
		ResponseDynamicTable respByService = (ResponseDynamicTable) RESTfulClient.sendPost(urlBancServiceScatole("getLstScatoleNConfDaRiscan"), request,
				ResponseDynamicTable.class);
		 
		ResponseDynamicTableObj data = respByService.getData();
		
		String jsonRow = "{ \"total\": 0, \"rows\": [] }";
		if(data.getRowContent() == null) {
			return jsonRow;
		}
		
		//costruisco il button per l'update
		List<Map<String, Object>> newData = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> dataRowCon = data.getRowContent();
		
		for (Map<String, Object> map : dataRowCon) {
			
			Map<String, Object> mapTemp = map;
			Double idScatola = (Double) map.get(ScatolaCostants.NConf_SCATOLA_ID.fieldDB());
			String identifScatola = (String ) map.get(ScatolaCostants.NConf_IDENTIFICATIVO.fieldDB());
			String button = "<button class='glyphicon glyphicon-barcode' onclick='riscansionaScatola(" + idScatola + ", \"" + identifScatola +"\");' title='" + ScatolaCostants.NConf_BUTTON.titleHTML() + "' />";
			String key = ScatolaCostants.NConf_BUTTON.dataField();
			mapTemp.put(key, button);
			mapTemp.remove(ScatolaCostants.NConf_SCATOLA_ID.fieldDB());
			newData.add(mapTemp);
		}
		
		if(data.getRowContent() != null && !data.getRowContent().isEmpty() && data.getRowContent().size() > 0){			
			log.debug("righe trovate:  "+ data.getRowContent().size());
			jsonRow = JSONBuilderDataTable.buildTableDynamic(data.getTotalRow(), newData);
		}
		
		return jsonRow;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Response<?> updateNconfDaRisc(Request<RequestConfermaScatolaNConfRiscan> request)
			throws MalformedURLException, IOException, Exception {
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceScatole("updateNconfDaRisc"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
	public String getLstScatoleAnomSanDaRiscan(Request<RequestScatoleNConfDaRiscan> request)	throws MalformedURLException, IOException, Exception {
		log.info("dataTableRicercaScatole start ");
		
		ResponseDynamicTable respByService = (ResponseDynamicTable) RESTfulClient.sendPost(urlBancServiceScatole("getLstScatoleAnomSanDaRiscan"), request,
				ResponseDynamicTable.class);
		 
		ResponseDynamicTableObj data = respByService.getData();
		
		String jsonRow = "{ \"total\": 0, \"rows\": [] }";
		if(data.getRowContent() == null) {
			return jsonRow;
		}
		
		//costruisco il button per l'update
		List<Map<String, Object>> newData = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> dataRowCon = data.getRowContent();
		
		for (Map<String, Object> map : dataRowCon) {
			
			Map<String, Object> mapTemp = map;
			Double idScatola = (Double) map.get(ScatolaCostants.NConf_SCATOLA_ID.fieldDB());
			String identifScatola = (String ) map.get(ScatolaCostants.NConf_IDENTIFICATIVO.fieldDB());
			String button = "<button class='glyphicon glyphicon-barcode' onclick='riscansionaScatola(" + idScatola + ", \"" + identifScatola +"\");' title='" + ScatolaCostants.NConf_BUTTON.titleHTML() + "' />";
			String key = ScatolaCostants.NConf_BUTTON.dataField();
			mapTemp.put(key, button);
			mapTemp.remove(ScatolaCostants.NConf_SCATOLA_ID.fieldDB());
			newData.add(mapTemp);
		}
		
		//build json
		if(data.getRowContent() != null && !data.getRowContent().isEmpty() && data.getRowContent().size() > 0){			
			log.debug("righe trovate:  "+ data.getRowContent().size());
			jsonRow = JSONBuilderDataTable.buildTableDynamic(data.getTotalRow(), newData);
		}
		
		return jsonRow;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Response<?> updateScatoleAnomSanDaRiscan(Request<RequestConfermaScatolaNConfRiscan> request)
			throws MalformedURLException, IOException, Exception {
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceScatole("updateScatoleAnomSanDaRiscan"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> close(long idScatola, String operatore, long postazione)
			throws MalformedURLException, IOException, Exception {
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPatch(urlBancServiceScatole("close")+"/"+idScatola+"/"+operatore+"/"+postazione, null,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}

	
	@Override
	public Response<List<Map<String,Object>>> etichettaScatola(long idScatola) throws Exception {
		@SuppressWarnings("unchecked")
		Response<List<Map<String,Object>>> response = (Response<List<Map<String,Object>>>) RESTfulClient.sendGet(
				urlBancServiceScatole("etichetta")+"/"+idScatola,
				Response.class);
				log.info("etichettaScatola scatole response status: "+response.getStatus());
		return response;
	}


}
