package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.constants.ScatolaCostants;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.objects.pallette.PalletDistintaObj;
import it.citel.postel.commonLib.objects.pallette.RicercaPalletObj;
import it.citel.postel.commonLib.objects.scatole.ScatolaSearchObj;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAddScatolaToPallet;
import it.citel.postel.commonLib.rest.model.RequestRicercaPallet;
import it.citel.postel.commonLib.rest.model.RequestRicercaScatolaDettaglio;
import it.citel.postel.commonLib.rest.model.RequestRimuoviScatolaPallet;
import it.citel.postel.commonLib.rest.model.RequestScatolaSearchCustom;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseCreazionePallet;
import it.citel.postel.commonLib.rest.model.ResponseDistintaPallet;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;
import it.citel.postel.commonLib.rest.model.ResponseRicercaDettaglioPallet;
import it.citel.postel.commonLib.rest.model.ResponseRicercaPallet;
import it.citel.postel.commonLib.rest.model.ResponseScatolaSearch;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
@SuppressWarnings("unchecked")
public class RicercheServiceImpl implements RicercheService {
	static final Logger log = LogManager.getLogger(RicercheServiceImpl.class);
    @Autowired
    private DevRestConstants devRestConstants;
    
	
	//banc
	
	@Override
	public String dataTableRicercaScatole(Request<RequestScatolaSearchCustom> request)	throws MalformedURLException, IOException, Exception {
		log.info("dataTableRicercaScatole start ");
		 ResponseScatolaSearch responseScatola = (ResponseScatolaSearch) RESTfulClient.sendPost(
				 urlBancServiceRicerca("getScatole"), request,ResponseScatolaSearch.class);
		 	
		List<ScatolaSearchObj> listScatolaObj = responseScatola.getData();
		log.debug("listScatolaObj size:"+listScatolaObj.size());
		
		if(listScatolaObj != null && !listScatolaObj.isEmpty()){			
			log.debug("listScatolaObj count(*):"+listScatolaObj.get(0).getTotalRow());
			return JSONBuilderDataTable.buildTable(listScatolaObj.get(0).getTotalRow(), listScatolaObj);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}
	
	@Override
	public Request<?> buildRequestScatola(String sort, String order, String offset, String limit, RequestScatolaSearchCustom requestScatola) {
		
		String sortDB = ScatolaCostants.DataTableRicercaScatoleEnum.getFieldSortDB(sort);
		Request<RequestScatolaSearchCustom> request = new Request<RequestScatolaSearchCustom>();
		
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit)) ;
		
		requestScatola.setStart(startRow);
		requestScatola.setEnd(endRow);
		requestScatola.setOrder(order);
		requestScatola.setSort(sortDB);
		
		request.setData(requestScatola);
		return request;
	}


	@Override
	public ResponseDynamicTable dettaglioScatola(Request<?> request)
			throws MalformedURLException, IOException, Exception {
		log.info("dettaglioScatola start ");
		ResponseDynamicTable response = (ResponseDynamicTable) RESTfulClient
				.sendPost(urlBancServiceRicerca("dettaglioScatola"), request, ResponseDynamicTable.class);
		return response;
	}
	
	/**
	 * ritorna la url completa dell'end point di bancarizzazione service + ricerca + metodo
	 * @param urlMapping - Request Mapping value
	 * @return full mapping endpoint Bancarizzazione Service
	 */
	private String urlBancServiceRicerca(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.RICERCA + "/"+ urlMapping;
		return ret;
	}

	private String urlBancServicePallet(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PALLET + "/"+ urlMapping;
		return ret;
	}

	@Override
	public ResponseDynamicTable trackingScatola(Request<RequestRicercaScatolaDettaglio> request) throws MalformedURLException, IOException, Exception {
		log.info("dettaglioScatola start ");
		ResponseDynamicTable response = (ResponseDynamicTable) RESTfulClient
				.sendPost(urlBancServiceRicerca("trkScatola"), request, ResponseDynamicTable.class);
		return response;
	}
	
	@Override
	public Response<List<Combo>> getListStatiFiltroRicercaScatola() throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServiceRicerca("getListStatiFiltroRicercaScatola"), null,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	@Override
	public Response<List<Combo>> getListStatiFiltroRicercaElencoStatoPallet() throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServicePallet("getListStatiFiltroRicercaElencoStatoPallet"), null,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<List<Combo>> getListStatiFiltroRicercaElencoClientiPallet()
			throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServicePallet("getListStatiFiltroRicercaElencoClientiPallet"), null,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<List<Combo>> getListStatiFiltroRicercaElencoTipiPallet()
			throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendPost(urlBancServicePallet("getListStatiFiltroRicercaElencoTipiPallet"), null,
				Response.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}

	@Override
	public String dataTableRicercaPallet(RequestRicercaPallet request) throws MalformedURLException, IOException, Exception {
		Request<RequestRicercaPallet> requestRicerca = new Request<>() ;
		requestRicerca.setData(request) ;
		ResponseRicercaPallet response = (ResponseRicercaPallet) RESTfulClient.sendPost( urlBancServicePallet("dataTableRicercaPallet") , requestRicerca , ResponseRicercaPallet.class ) ;
		
		List<RicercaPalletObj> listPallet = response.getListPallet() ;
		
		if(listPallet != null && !listPallet.isEmpty()){			
			log.debug("listPallet count(*):"+listPallet.get(0).getTotalRow());
			return JSONBuilderDataTable.buildTable(listPallet.get(0).getTotalRow(), listPallet);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}

	@Override
	public String dataTableDettagliPallet(RequestRicercaPallet request) throws MalformedURLException, IOException, Exception {
		Request<RequestRicercaPallet> requestRicerca = new Request<>() ;
		requestRicerca.setData(request) ;
		
		ResponseRicercaDettaglioPallet response = (ResponseRicercaDettaglioPallet) RESTfulClient.sendPost( urlBancServicePallet("dataTableDettagliPallet") , requestRicerca , ResponseRicercaDettaglioPallet.class ) ;
		
		List<ScatolaSearchObj> listScatole= response.getData();
		
		if(listScatole != null && !listScatole.isEmpty()){			
			return JSONBuilderDataTable.buildTable(listScatole.get(0).getTotRecords(), listScatole);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}

	@Override
	public Response<String> addScatolaToPallet(RequestAddScatolaToPallet request) throws MalformedURLException, IOException, Exception {
		Response<String> response = new Response<>() ;
		
		response = (Response<String>) RESTfulClient.sendPost( urlBancServicePallet("addScatolaToPallet") , request , Response.class ) ;
		
		return response;
	}

	@Override
	public Response<ResponseCreazionePallet> checkScatola(RequestAddScatolaToPallet request) throws MalformedURLException, IOException, Exception {
		Response<ResponseCreazionePallet> response = new Response<>() ;
		
		response = (Response<ResponseCreazionePallet>) RESTfulClient.sendPost( urlBancServicePallet("checkScatola") , request , Response.class ) ;
		
		return response;
	}

	@Override
	public String removeScatolaFromPallet(RequestRimuoviScatolaPallet request)
			throws MalformedURLException, IOException, Exception {
		Response<String> response = (Response<String>) RESTfulClient.sendPost( urlBancServicePallet("removeScatolaFromPallet") , request , Response.class ) ;
		
		if( response.getStatus() ) {
			return response.getData() ;
		}
		return null;
	}

	@Override
	public String chiudiPallet(String data) throws MalformedURLException, IOException, Exception {
		
		Request<String> request = new Request<>() ;
		request.setData(data) ;
		Response<String> response = (Response<String>) RESTfulClient.sendPost( urlBancServicePallet("chiudiPallet") , request , Response.class ) ;
		
		if( response.getStatus() ) {
			return response.getData() ;
		}
		return response.getMessage() ;
	}

	@Override
	public PalletDistintaObj getDistintaPallet(String data) throws MalformedURLException, IOException, Exception {
		Request<String> request = new Request<>() ;
		request.setData(data) ;
		ResponseDistintaPallet response = (ResponseDistintaPallet) RESTfulClient.sendPost( urlBancServicePallet("getDistintaPallet") , request , ResponseDistintaPallet.class ) ;
		
		if( response == null || !response.isStatus() ) {
			throw new Exception( response.getMessage() ) ;
		}
		
		return response.getData();
	}

	@Override
	public String sbloccaScatola(String scatolaId) throws MalformedURLException, IOException, Exception {
		Response<String> response = ( Response<String> ) RESTfulClient.sendGet( urlBancServiceRicerca( "sbloccaScatola?scatolaId=" + scatolaId ) , Response.class ) ;
		
		if( response == null || !response.getStatus() ) {
			throw new Exception( response.getMessage() ) ;
		}
		
		return "OK" ;
	}
}