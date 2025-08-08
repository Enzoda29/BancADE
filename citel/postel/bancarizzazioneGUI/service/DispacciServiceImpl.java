package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.constants.DispacciCostants;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestDispacciRicerca;
import it.citel.postel.commonLib.rest.model.RequestDispaccio;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTableObj;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;
import it.citel.postel.commonLib.rest.model.ResponsePaginationAndValueObj;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
public class DispacciServiceImpl implements DispacciService {
	
	static final Logger log = LogManager.getLogger(DispacciServiceImpl.class);
	
	@Autowired
	private DevRestConstants devRestConstants;

//	@Override
//	public Response<?> selectDispacci(Request<RequestDispacciRicerca> request)
//			throws MalformedURLException, IOException, Exception {
//
//		Response<DispacciResponse> responseNorm = (Response<DispacciResponse>) RESTfulClient.sendPost(
//				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PREACCETTAZIONE +"/getLstDispacci", request,
//				Response.class);
//		log.info("selectDispacci response status: "+responseNorm.getStatus());
//		return responseNorm;
//	}
	
	
	@Override
	public Response<?> preAccettazioneDispaccio(Request<RequestDispaccio> request)
			throws MalformedURLException, IOException, Exception {

		Response responseDis = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PREACCETTAZIONE +"/preAccettazioneDispaccio", request,
				Response.class);
		log.info("preAccettazioneDispaccio response status: "+responseDis.getStatus());
		return responseDis;
	}
	
	@Override
	public Response<?> checkCodiceDispaccio(Request<RequestDispaccio> request)
			throws MalformedURLException, IOException, Exception {
		log.info("checkNOPreadvising start ");
		Response responseDis = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PREACCETTAZIONE +"/checkCodiceDispaccio", request,
				Response.class);
		log.info("checkCodiceDispaccio response status: "+responseDis.getStatus());
		return responseDis;
	}

	@Override
	public Response<?> insertDispaccioSospeso(Request<RequestDispaccio> request)
			throws MalformedURLException, IOException, Exception {
		log.info("preaccettazioneInserimentoSospesi: start ");
		Response responseDis = (Response) RESTfulClient.sendPost(devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PREACCETTAZIONE +"/preAccettazioneInserimentoSospesi", request, Response.class);
		log.info("preaccettazioneInserimentoSospesi: "+responseDis.getStatus());
		return responseDis;
	}
	
	
	@Override
	public ResponseDynamicTable selectDispacciByFilter(Request<RequestDispacciRicerca> request)
			throws MalformedURLException, IOException, Exception {

		ResponseDynamicTable response = (ResponseDynamicTable) RESTfulClient.sendPost(urlBancServiceDispacci("getLstDispacci"), request,
				ResponseDynamicTable.class);
		log.info("selectDispacciByFilter response status: "+response.getStatus());
		return response;
	}
	
	/**
	 * @author GF
	 */
	@Override
	public Response<ResponsePaginationAndValueObj> getLstDispSospInAttDiTRK(Request<RequestDispacciRicerca> request)	throws MalformedURLException, IOException, Exception {
		log.info("dataTableRicercaScatole start ");
		
		ResponsePaginationAndValueObj responseGUIData = new ResponsePaginationAndValueObj();
		Response<ResponsePaginationAndValueObj> responseGUI = new Response<ResponsePaginationAndValueObj>();
		 
		ResponseDynamicTable respByService = (ResponseDynamicTable) RESTfulClient.sendPost(urlBancServiceDispacci("getLstDispSospInAttDiTRK"), request,
				ResponseDynamicTable.class);
		 
		ResponseDynamicTableObj data = respByService.getData();
		 
		log.debug("righe trovate:  "+ data.getRowContent().size());
		
		String jsonRow = "{ \"total\": 0, \"rows\": [] }";
		if(data.getRowContent().size() > 0 && !data.getRowContent().isEmpty()){			
			jsonRow = JSONBuilderDataTable.buildTableDynamic(data.getTotalRow(), data.getRowContent());
		}
		
		
				//costruisco il button per l'update
				List<Map<String, Object>> newData = new ArrayList<Map<String, Object>>();
				List<Map<String, Object>> dataRowCon = data.getRowContent();
				
				for (Map<String, Object> map : dataRowCon) {
					
					Map<String, Object> mapTemp = map;
					Double idScatola = (Double) map.get(DispacciCostants.SOSP_TRK_ID.dataField());
					String codiceDisp = (String) map.get(DispacciCostants.SOSP_TRK_CODICE.dataField());
					String button = "<button class='fa fa-times' onclick='rimuoviRow(this , " + idScatola + " , " + codiceDisp + ");' title='" + DispacciCostants.SOSP_TRK_BUTTON.titleHTML() + "' />";
					String key = DispacciCostants.SOSP_TRK_BUTTON.dataField();
					mapTemp.put(key, button);
//					mapTemp.remove(DispacciCostants.SOSP_TRK_BUTTON.dataField());
					newData.add(mapTemp);
				}
		
				if(data.getRowContent() != null && !data.getRowContent().isEmpty() && data.getRowContent().size() > 0){			
					log.debug("righe trovate:  "+ data.getRowContent().size());
					jsonRow = JSONBuilderDataTable.buildTableDynamic(data.getTotalRow(), newData);
				}
				
				
		//MODIFICARE LA PARTE SOTTO PER IMPLEMETNARE LA PAGINAZIONE	 - PRENDERE COME ESEMPIO SCATOLE RICERCA
		Map<String, Object> value = new HashMap<String, Object>();
		value.put("intestazioneColonne", data.getColumnHeader());
		responseGUIData.setValue(value);
		responseGUIData.setJsonDataTable(jsonRow);
		
		responseGUI.setData(responseGUIData);
		responseGUI.setMessage(respByService.getMessage());
		responseGUI.setStatus(respByService.getStatus());
		
		return responseGUI;		
		
		
	}
	
	
	/**
	 * @author GF
	 */
	@Override
	public Response<ResponsePaginationAndValueObj> getDispacciSospProntiDaElab(Request<RequestDispacciRicerca> request)	throws MalformedURLException, IOException, Exception {
		log.info("dataTableRicercaScatole start ");
		
		ResponsePaginationAndValueObj responseGUIData = new ResponsePaginationAndValueObj();
		Response<ResponsePaginationAndValueObj> responseGUI = new Response<ResponsePaginationAndValueObj>();
		 
		ResponseDynamicTable respByService = (ResponseDynamicTable) RESTfulClient.sendPost(urlBancServiceDispacci("getDispacciSospProntiDaElab"), request,
				ResponseDynamicTable.class);
		 
		ResponseDynamicTableObj data = respByService.getData();
		 
		log.debug("righe trovate:  "+ data.getRowContent().size());
		
		String jsonRow = "{ \"total\": 0, \"rows\": [] }";
		if(data.getRowContent().size() > 0 && !data.getRowContent().isEmpty()){			
			jsonRow = JSONBuilderDataTable.buildTableDynamic(data.getTotalRow(), data.getRowContent());
		}
		
		Map<String, Object> value = new HashMap<String, Object>();
		value.put("intestazioneColonne", data.getColumnHeader());
		responseGUIData.setValue(value);
		responseGUIData.setJsonDataTable(jsonRow);
		
		responseGUI.setData(responseGUIData);
		responseGUI.setMessage(respByService.getMessage());
		responseGUI.setStatus(respByService.getStatus());
		
		return responseGUI;		
		
		
	}
	
	
	@Override
	public Response<Boolean> eliminaDispaccioSospeso(Request<RequestDispaccio> request)
			throws MalformedURLException, IOException, Exception {
		log.info("cancellazioneDispacciSospesi: start ");
		Response responseDis = (Response) RESTfulClient.sendPost(urlBancServiceDispacci("eliminaDispaccioSospeso"), request, Response.class);
		log.info("cancellazioneDispacciSospesi: "+responseDis.getStatus());
		return responseDis;
	}
	
	
	
	/**
	 * ritorna la url completa dell'end point di bancarizzazione service + dispacci + metodo
	 * @param urlMapping - Request Mapping value
	 * @return full mapping endpoint Bancarizzazione Service
	 */
	private String urlBancServiceDispacci(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PREACCETTAZIONE + "/"+ urlMapping;
		return ret;
	}

}
