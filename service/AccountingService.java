package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.model.AccountingReqDataTableObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAccountingGMIDA;
import it.citel.postel.commonLib.rest.model.RequestAccountingJob;
import it.citel.postel.commonLib.rest.model.RequestDataTableAccounting;
import it.citel.postel.commonLib.rest.model.RequestRicercaCliente;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAccountingJob;
import it.citel.postel.commonLib.rest.model.ResponseAccounting;
import it.citel.postel.commonLib.rest.model.ResponseAttachment;
import it.citel.postel.commonLib.rest.model.RequestAccountingGMIDA;

public interface AccountingService {

	List<Combo> getListLotti() throws MalformedURLException, IOException, Exception;

	String getTableRicercaAccounting(RequestDataTableAccounting request) throws MalformedURLException, IOException, Exception;

	String getListAccountingRequest() throws MalformedURLException, IOException, Exception;

	AccountingReqDataTableObj getLastAccountingRequest() throws MalformedURLException, IOException, Exception;

	ResponseAttachment getExportFile(String eventId) throws MalformedURLException, IOException, Exception;
	
	ResponseAccountingJob executeAccountingJob(RequestAccountingJob request) throws MalformedURLException, IOException, Exception;
	
	Response<?>  AccountingInsert(Request<RequestAccountingGMIDA> request) throws MalformedURLException, IOException, Exception ;	
	
	RequestAccountingGMIDA getListDateGmida() throws MalformedURLException, IOException, Exception ;
}
