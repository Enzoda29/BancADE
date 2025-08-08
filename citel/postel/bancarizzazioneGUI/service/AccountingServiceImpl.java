package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import javax.naming.ServiceUnavailableException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.exception.CustomException;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.AccountingReqDataTableObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAccountingGMIDA;
import it.citel.postel.commonLib.rest.model.RequestAccountingJob;
import it.citel.postel.commonLib.rest.model.RequestDataTableAccounting;
import it.citel.postel.commonLib.rest.model.RequestRicercaCliente;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAccounting;
import it.citel.postel.commonLib.rest.model.ResponseAccountingJob;
import it.citel.postel.commonLib.rest.model.ResponseDataTableAccounting;
import it.citel.postel.commonLib.rest.model.ResponseDataTableAccountingReq;
import it.citel.postel.commonLib.rest.model.ResponseAttachment;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
@SuppressWarnings("unchecked")
public class AccountingServiceImpl implements AccountingService {
	static final Logger log = LogManager.getLogger(AccountingServiceImpl.class);
    
	@Autowired
    private DevRestConstants devRestConstants;
	
	/**
	 * ritorna la url completa dell'end point di bancarizzazione service + ricerca + metodo
	 * @param urlMapping - Request Mapping value
	 * @return full mapping endpoint Bancarizzazione Service
	 */
	private String urlBancServiceAccounting(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.ACCOUNTING + "/"+ urlMapping;
		return ret;
	}

	@Override
	public List<Combo> getListLotti() throws MalformedURLException, IOException, Exception {
		Response<List<Combo>> response = (Response<List<Combo>>) RESTfulClient.sendGet(urlBancServiceAccounting( "getListLotti" ), Response.class ) ;
		
		if( !response.getStatus() || response.getData() == null ) {
			log.error( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
			throw new Exception( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
		}
		
		return response.getData() ;
	}

	@Override
	public String getTableRicercaAccounting(RequestDataTableAccounting request)
			throws MalformedURLException, IOException, Exception {
		
		ResponseDataTableAccounting response = (ResponseDataTableAccounting) RESTfulClient.sendPost(urlBancServiceAccounting( "getTableRicercaAccounting" ), request, ResponseDataTableAccounting.class) ;
		
		if( response == null || !response.isStatus() ) {
			log.error( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
			throw new Exception( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
		}
		
		if( response.getData() != null && !response.getData().isEmpty() ) {
			return JSONBuilderDataTable.buildTable(response.getData().size() , response.getData());
		}
		
		return Constants.NO_ROW_FOUND_TABLE ;
	}
	
	@Override
	public String getListAccountingRequest() throws MalformedURLException, IOException, Exception {

		ResponseDataTableAccountingReq response = (ResponseDataTableAccountingReq) RESTfulClient.sendGet(urlBancServiceAccounting( "getListAccountingRequest" ), ResponseDataTableAccountingReq.class) ;

		if( response == null || !response.isStatus() ) {
			log.error( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
			throw new Exception( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
		}
		
		if( response.getData() != null && !response.getData().isEmpty() ) {
			return JSONBuilderDataTable.buildTable(response.getData().size() , response.getData());
		}

		return Constants.NO_ROW_FOUND_TABLE ;
	}
	
	@Override
	public AccountingReqDataTableObj getLastAccountingRequest() throws MalformedURLException, IOException, Exception {

		ResponseDataTableAccountingReq response = (ResponseDataTableAccountingReq) RESTfulClient.sendGet(urlBancServiceAccounting( "getLastAccountingRequest" ), ResponseDataTableAccountingReq.class) ;

		if( response == null || !response.isStatus() ) {
			log.error( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
			throw new Exception( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
		}

		return response.getData().get(0);
	}

	@Override
	public ResponseAttachment getExportFile(String eventId) throws MalformedURLException, IOException, CustomException, Exception {
		ResponseAttachment response = (ResponseAttachment) RESTfulClient.sendGet( urlBancServiceAccounting( "getExportFile?eventId=" + eventId ) , ResponseAttachment.class ) ;
		if( response == null ) {
			throw new Exception( "Response null!" ) ;
		}
		return response ;
	}
	
	@Override
	public ResponseAccountingJob executeAccountingJob(RequestAccountingJob request) throws MalformedURLException, IOException, Exception {
		
		ResponseAccountingJob response = (ResponseAccountingJob) RESTfulClient.sendPost(urlBancServiceAccounting( "executeAccountingJob" ), request, ResponseAccountingJob.class) ;
		
		if( response == null || !response.isStatus() ) {
			log.error( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
			throw new Exception( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
		}
		
		return response;
		
	}
	
//	@Override
//	public Response<ResponseAccounting> AccountingInsert(RequestAccountingGMIDA request) throws MalformedURLException, IOException, Exception {
//		
//		Response<ResponseAccounting> response = (Response<ResponseAccounting>) RESTfulClient.sendPost(urlBancServiceAccounting( "AccountingInsert" ), request, ResponseAccounting.class) ;
//	
//		if( response == null || !response.getStatus() ) {
//			log.error( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
//			throw new Exception( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
//		}
//		
//		return response;
//		
//	};
	
	@Override
	public Response<?> AccountingInsert(Request<RequestAccountingGMIDA> request) throws MalformedURLException, IOException, Exception {
		Response<Boolean> response = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceAccounting("AccountingInsert"), request, Response.class);
		
		if( response == null || !response.getStatus() ) {
		log.error( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
		throw new Exception( "Errore interno: " + ( response == null ? "response null" : response.getMessage() ) ) ;
	}
		return response;
	};
	
	
	@Override
	public RequestAccountingGMIDA getListDateGmida() throws MalformedURLException, IOException, Exception {

		ResponseAccounting response = (ResponseAccounting) RESTfulClient.sendGet(urlBancServiceAccounting( "getListDateGmida" ), ResponseAccounting.class ) ;
 
		if (!response.isStatus() || response.getDate() == null) {
		    log.error("Errore interno: " + (response == null ? "response null" : response.getMessage()));
		    throw new ServiceUnavailableException("Errore interno: " + (response == null ? "response null" : response.getMessage()));
		}
 		
		return response.getDate();
	}

}
