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
import it.citel.postel.commonLib.objects.configurazione.ServizioObj;
import it.citel.postel.commonLib.objects.gestione.AnagraficaClienteObj;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestClientiRestProfile;
import it.citel.postel.commonLib.rest.model.RequestConfOperatori;
import it.citel.postel.commonLib.rest.model.RequestGetCliRestProfByServMacros;
import it.citel.postel.commonLib.rest.model.RequestIndirizzoRestituzione;
import it.citel.postel.commonLib.rest.model.RequestNewMacroservizio;
import it.citel.postel.commonLib.rest.model.RequestOperatore;
import it.citel.postel.commonLib.rest.model.RequestRicercaCliente;
import it.citel.postel.commonLib.rest.model.RequestRicercaServizi;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseConfigurazioneServizio;
import it.citel.postel.commonLib.rest.model.ResponseDynamicObj;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTableObj;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
public class ConfigurazioneServiceImpl implements ConfigurazioneService {
	
	static final Logger log = LogManager.getLogger(ConfigurazioneServiceImpl.class);
  
	@Autowired private DevRestConstants devRestConstants;
	
	// Bancarizzazione
	
	/**
	 * ritorna la url completa dell'end point di bancarizzazione service + common + metodo
	 * @param urlMapping - Request Mapping value
	 * @return full mapping endpoint Bancarizzazione Service
	 */
	private String urlBancServiceConfigurazione(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.CONFIGURAZIONE + "/"+ urlMapping;
		return ret;
	}
	
	@Override
	public Response<?> getAnagrafica(Request<RequestRicercaCliente> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<List<AnagraficaClienteObj>> response = (Response<List<AnagraficaClienteObj>>) RESTfulClient.sendPost(urlBancServiceConfigurazione("getLstAnagrClientiByFilter"), request,
				Response.class);
//		devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE + "/" + devRestConstants.COMMON +
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<?> updateAnagraficaCliente(Request<RequestRicercaCliente> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceConfigurazione("updateAnagraficaCliente"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<?> insertAnagraficaCliente(Request<RequestRicercaCliente> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceConfigurazione("insertAnagraficaCliente"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}	
	
	@Override
	public Response<?> addMacroServizioToClient(Request<RequestNewMacroservizio> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceConfigurazione("addMacroServizioToClient"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}	
	
	@Override
	public Response<?> getMacroserviziByCliente(Request<RequestNewMacroservizio> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<ResponseDynamicObj> response = (Response<ResponseDynamicObj>) RESTfulClient.sendPost(urlBancServiceConfigurazione("getMacroserviziByCliente"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}	
	
	
	
	@Override
	public Response<?> getIndRestitByCliente(Request<BigDecimal> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<ResponseDynamicTableObj> response = (Response<ResponseDynamicTableObj>) RESTfulClient.sendPost(urlBancServiceConfigurazione("getIndRestitByCliente"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}	

	@Override
	public Response<?> updateIndirizzoRestituzione(Request<RequestIndirizzoRestituzione> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceConfigurazione("updateIndirizzoRestituzione"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<?> deleteIndirizzoRestituzione(Request<RequestIndirizzoRestituzione> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceConfigurazione("deleteIndirizzoRestituzione"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<?> insertIndirizzoRestituzione(Request<RequestIndirizzoRestituzione> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceConfigurazione("insertIndirizzoRestituzione"), request,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
	//Servizi
	@Override
	public Response<?> getServizi(Request<RequestRicercaServizi> request)
			throws MalformedURLException, IOException, Exception {
		log.info("getServizi start ");
		@SuppressWarnings("unchecked")
		Response<ResponseConfigurazioneServizio> responseConfigurazioneServizio = (Response<ResponseConfigurazioneServizio>) RESTfulClient.sendPost(
				urlBancServiceConfigurazione("getServiziByFilter"), request,
				Response.class);
		log.info(" response status: "+responseConfigurazioneServizio.getStatus());
		return responseConfigurazioneServizio;
	}
	
	@Override
	public Response<?> getListaServizi() throws MalformedURLException, IOException, Exception {
		log.info("getListaServizi start ");
		@SuppressWarnings("unchecked")
		Response<List<ServizioObj>> responseConfigurazioneServizio = (Response<List<ServizioObj>>) RESTfulClient.sendGet(
				urlBancServiceConfigurazione("getListaServizi"), Response.class);
		log.info(" response status: "+responseConfigurazioneServizio.getStatus());
		return responseConfigurazioneServizio;
	}
	
	@Override
	public Response<?> insertServiziToCliente(Request<RequestRicercaServizi> request)
			throws MalformedURLException, IOException, Exception {
		log.info("insertServiziToCliente start ");
		@SuppressWarnings("unchecked")
		Response<Boolean> responseConfigurazioneServizio = (Response<Boolean>) RESTfulClient.sendPost(
				urlBancServiceConfigurazione("insertServiziToCliente"), request,
				Response.class);
		log.info(" response status: "+responseConfigurazioneServizio.getStatus());
		return responseConfigurazioneServizio;
	}
	
	//operatori
	
	@Override
	public Request<?> buildRequest(String sort, String order, String offset, String limit, String usernameSearch)
			throws Exception {
		Request<RequestConfOperatori> request = new Request<>();
		RequestConfOperatori requestConfOperatori = new RequestConfOperatori();
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit)) ;
		requestConfOperatori.setStart(startRow);
		requestConfOperatori.setEnd(endRow);
		requestConfOperatori.setOrder(order);
		requestConfOperatori.setSort(sort);
		requestConfOperatori.setUsername(usernameSearch);
//		requestConfOperatori.setCodiceCentro(codiceCentro);
		request.setData(requestConfOperatori);
		return request;
	}

	@Override
	public String dataTableConfOperatori(Request<RequestConfOperatori> request)
			throws MalformedURLException, IOException, Exception {
		log.info("dataTableConfOperatori start ");
		
		ResponseDynamicTable respByService = (ResponseDynamicTable) RESTfulClient.sendPost(

				urlBancServiceConfigurazione("dataTableConfOperatori"), request,
				ResponseDynamicTable.class);	
		
		ResponseDynamicTableObj data = respByService.getData();
		 
		log.debug("righe trovate:  "+ data.getRowContent().size());
		
		
		//costruisco il button per l'update
		List<Map<String, Object>> newData = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> dataRowCon = data.getRowContent();
		
		for (Map<String, Object> map : dataRowCon) {
			
			Map<String, Object> mapTemp = map;
			String ID = map.get("ID")!= null?(String) map.get("ID"):"";
			String USERNAME = map.get("USERNAME")!= null?(String) map.get("USERNAME"):"";
			String DESC_OPERATORE = map.get("DESC_OPERATORE")!= null?(String) map.get("DESC_OPERATORE"):"";
			String PROFILO_ID = (String) map.get("PROFILO_ID")!= null?(String) map.get("PROFILO_ID"):"";
			String CENTRO_DEMAT_ID = map.get("ID_CENTRO_DEMAT")!= null?(String) map.get("ID_CENTRO_DEMAT"):"";
			String email = map.get("EMAIL")!= null?(String) map.get("EMAIL"):"";
			String tel_fisso = map.get("TEL_FISSO")!= null?(String) map.get("TEL_FISSO"):"";
			String tel_mobile = map.get("TEL_MOBILE")!= null?(String) map.get("TEL_MOBILE"):"";
			
			
			
			
			String valueList = ID + ", '" + USERNAME + "' , '" +DESC_OPERATORE+ "' , " + PROFILO_ID + " , " + CENTRO_DEMAT_ID + " , '" + email + "' , '" + tel_fisso + "' , '" + tel_mobile + "'";
			String buttonUPD = "<button class='glyphicon glyphicon-edit' onclick=\"updOperatore(" + valueList + ");\" title='clicca per aggiorna l\'operatore' />";
			String buttonDLT = "<button class='glyphicon glyphicon-minus delete' onclick=\"dltOpertore(" + valueList + ");\" title='clicca per elimina l\'operatore' />";
			
			String key_upd = "BUTTON_UPD";
			String key_dlt = "BUTTON_DLT";
			mapTemp.put(key_upd, buttonUPD);
			mapTemp.put(key_dlt, buttonDLT);
//			mapTemp.remove(DispacciCostants.SOSP_TRK_BUTTON.dataField());
			newData.add(mapTemp);
		}
		
		String jsonRow = "{ \"total\": 0, \"rows\": [] }";
		if(data.getRowContent() != null && !data.getRowContent().isEmpty() && data.getRowContent().size() > 0){			
			log.debug("righe trovate:  "+ data.getRowContent().size());
			jsonRow = JSONBuilderDataTable.buildTableDynamic(data.getTotalRow(), newData);
		}
		
		
//		if(data.getRowContent().size() > 0 && !data.getRowContent().isEmpty()){			
//			jsonRow = JSONBuilderDataTable.buildTableDynamic(data.getTotalRow(), data.getRowContent());
//		}
		
//		Map<String, Object> value = new HashMap<String, Object>();
//		value.put("intestazioneColonne", data.getColumnHeader());
//		responseGUIData.setValue(value);
//		responseGUIData.setJsonDataTable(jsonRow);
//		
//		responseGUI.setData(responseGUIData);
//		responseGUI.setMessage(respByService.getMessage());
//		responseGUI.setStatus(respByService.getStatus());
		
		return jsonRow;		
		
	}
	
	@Override
	public Response<?> addOperatore(Request<RequestOperatore> request)
			throws MalformedURLException, IOException, Exception {
		log.info("addOperatore start ");
		@SuppressWarnings("unchecked")
		Response<Boolean> responseConfigurazioneServizio = (Response<Boolean>) RESTfulClient.sendPost(
				urlBancServiceConfigurazione("addOperatore"), request,
				Response.class);
		log.info(" response status: "+responseConfigurazioneServizio.getStatus());
		return responseConfigurazioneServizio;
	}
	
	@Override
	public Response<?> updateOperatore(Request<RequestOperatore> request)
			throws MalformedURLException, IOException, Exception {
		log.info("addOperatore start ");
		@SuppressWarnings("unchecked")
		Response<Boolean> responseConfigurazioneServizio = (Response<Boolean>) RESTfulClient.sendPost(
				urlBancServiceConfigurazione("updateOperatore"), request,
				Response.class);
		log.info(" response status: "+responseConfigurazioneServizio.getStatus());
		return responseConfigurazioneServizio;
	}
	
	@Override
	public Response<?> deleteOperatore(Request<RequestOperatore> request)
			throws MalformedURLException, IOException, Exception {
		log.info("addOperatore start ");
		@SuppressWarnings("unchecked")
		Response<Boolean> responseConfigurazioneServizio = (Response<Boolean>) RESTfulClient.sendPost(
				urlBancServiceConfigurazione("deleteOperatore"), request,
				Response.class);
		log.info(" response status: "+responseConfigurazioneServizio.getStatus());
		return responseConfigurazioneServizio;
	}
	
	
	//Restituzione
	
	@Override
	public Response<?> getCliRestProfileByMacroSid(Request<RequestGetCliRestProfByServMacros> request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<ResponseDynamicObj> response = (Response<ResponseDynamicObj>) RESTfulClient.sendPost(urlBancServiceConfigurazione("getCliRestProfileByMacroSid"), request ,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}	
	
	@Override
	public Response<?> saveCliRestProfile(Request<RequestClientiRestProfile>  request)
			throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceConfigurazione("saveCliRestProfile"), request ,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}	
		
	
	
}
