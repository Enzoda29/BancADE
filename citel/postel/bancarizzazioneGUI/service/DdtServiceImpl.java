package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.objects.dtt.DdtObj;
import it.citel.postel.commonLib.objects.dtt.PalletDDTObj;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestDisassociazioneDDT;
import it.citel.postel.commonLib.rest.model.RequestRicercaDdt;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDistintaDDT;
import it.citel.postel.commonLib.rest.model.ResponseRicercaDdt;
import it.citel.postel.commonLib.rest.model.ResponseRicercaPalletDdt;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
@SuppressWarnings("unchecked")
public class DdtServiceImpl implements DdtService {
	
	static final Logger log = LogManager.getLogger(DdtServiceImpl.class);
    
	@Autowired
    private DevRestConstants devRestConstants;
	
	/**
	 * ritorna la url completa dell'end point di bancarizzazione service + ricerca + metodo
	 * @param urlMapping - Request Mapping value
	 * @return full mapping endpoint Bancarizzazione Service
	 */
	private String urlBancServiceDDT(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.DDT + "/"+ urlMapping;
		return ret;
	}
	
	@Override
	public Response<List<Combo>> getListStatiFiltroRicercaDDT() throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceDDT("getListStatiFiltroRicercaDDT"), Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
//	@SuppressWarnings("unchecked")
//	@Override
//	public Response<List<Combo>> getListClientiFiltroRicercaDDT() throws MalformedURLException, IOException, Exception {
//		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServiceDDT("getListClientiFiltroRicercaDDT"), null, Response.class);
//		log.info(" response status: "+response.getStatus());
//		return response;
//	}
	
	@Override
	public Response<List<Combo>> getListTipiFiltroRicercaDDT() throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceDDT("getListTipiFiltroRicercaDDT"), Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}

//	@Override
//	public Response<?> getDdtByFilter(Request<RequestRicercaDdt> request) throws MalformedURLException, IOException, Exception {
//		log.info("getDdtByFilter start ");
//		Response<?> responseDDT = (Response<>) RESTfulClient.sendPost(urlBancServiceDDT("getDdtByFilter"), request,Response.class);
//		log.info(" response status: "+responseDDT.getStatus());
//		return responseDDT;
//	}
	
	@Override
	public String getDdtByFilter(RequestRicercaDdt request) throws MalformedURLException, IOException, Exception {
		Request<RequestRicercaDdt> requestRicerca = new Request<>() ;
		requestRicerca.setData(request) ;
		ResponseRicercaDdt response = (ResponseRicercaDdt) RESTfulClient.sendPost(urlBancServiceDDT("getDdtByFilter"), requestRicerca, ResponseRicercaDdt.class);
		log.info(" response status: " + response.getStatus());
		List<DdtObj> listaDdt = response.getData();
		if(listaDdt != null && !listaDdt.isEmpty()){			
			return JSONBuilderDataTable.buildTable(listaDdt.get(0).getTotRecords(), listaDdt);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}

	@Override
	public Response<List<Combo>> getListLottiFiltroRicercaDDT() throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceDDT("getListLottiFiltroRicercaDDT"), Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<List<Combo>> getListTipiSpedizioneFiltroRicercaDDT()
			throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceDDT("getListTipiSpedizioneFiltroRicercaDDT"), Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<List<Combo>> getListTipiProdottoFiltroRicercaDDT()
			throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceDDT("getListTipiProdottoFiltroRicercaDDT"), Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<List<Combo>> getListModelliFiltroRicercaDDT() throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceDDT("getListModelliFiltroRicercaDDT"), Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}

	@Override
	public String dataTabledettaglioDDT(RequestRicercaDdt request)
			throws MalformedURLException, IOException, Exception {
		Request<RequestRicercaDdt> requestRicerca = new Request<>() ;
		requestRicerca.setData(request) ;
		ResponseRicercaPalletDdt response = (ResponseRicercaPalletDdt) RESTfulClient.sendPost(urlBancServiceDDT("dataTabledettaglioDDT"), requestRicerca, ResponseRicercaPalletDdt.class);
		log.info(" response status: " + response.getStatus());
		List<PalletDDTObj> listaDdt = response.getData();
		if(listaDdt != null && !listaDdt.isEmpty()){
			return JSONBuilderDataTable.buildTable(listaDdt.get(0).getTotRecords(), listaDdt);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}

	@Override
	public Response<String> dissassociaDaDDT(RequestDisassociazioneDDT data)
			throws MalformedURLException, IOException, Exception {
		Response<String> response = new Response<>() ;
		Request<RequestDisassociazioneDDT> request = new Request<>() ;
		request.setData(data) ;
		
		response = (Response<String>) RESTfulClient.sendPost(urlBancServiceDDT("dissassociaDaDDT"), request, Response.class) ;
		
		return response;
	}

	@Override
	public String chiudiDDT(String id) throws MalformedURLException, IOException, Exception {
		Request<String> request = new Request<>() ;
		request.setData(id) ;
		Response<String> response = (Response<String>) RESTfulClient.sendPost(urlBancServiceDDT("chiudiDDT"), request, Response.class) ;
		
		return response.getStatus() ? response.getData() : null ;
	}

	@Override
	public ResponseDistintaDDT getDatiDistinta( String ddtId ) throws MalformedURLException, IOException, Exception {
		Request<String> request = new Request<>() ;
		request.setData(ddtId) ;
		ResponseDistintaDDT response = (ResponseDistintaDDT) RESTfulClient.sendPost(urlBancServiceDDT("getDatiDistinta"), request, ResponseDistintaDDT.class) ;
		
		return response;
	}

	@Override
	public String dataTableAssociaPallet(RequestRicercaDdt request)
			throws MalformedURLException, IOException, Exception {
		Request<RequestRicercaDdt> requestRicerca = new Request<>() ;
		requestRicerca.setData(request) ;
		ResponseRicercaPalletDdt response = (ResponseRicercaPalletDdt) RESTfulClient.sendPost(urlBancServiceDDT("dataTableAssociaPallet"), requestRicerca, ResponseRicercaPalletDdt.class);
		log.info(" response status: " + response.getStatus());
		List<PalletDDTObj> listaDdt = response.getData();
		if(listaDdt != null && !listaDdt.isEmpty()){			
			return JSONBuilderDataTable.buildTable(listaDdt.get(0).getTotRecords(), listaDdt);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}

	@Override
	public Response<String> associaADDT(RequestDisassociazioneDDT data)
			throws MalformedURLException, IOException, Exception {
		Response<String> response = new Response<>() ;
		Request<RequestDisassociazioneDDT> request = new Request<>() ;
		request.setData(data) ;
		
		response = (Response<String>) RESTfulClient.sendPost(urlBancServiceDDT("associaADDT"), request, Response.class) ;
		
		return response;
	}
}