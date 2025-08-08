package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.model.RequestDisassociazioneDDT;
import it.citel.postel.commonLib.rest.model.RequestRicercaDdt;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDistintaDDT;

public interface DdtService {
	
	Response<List<Combo>> getListStatiFiltroRicercaDDT() throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getListTipiFiltroRicercaDDT() throws MalformedURLException, IOException, Exception;
//	Response<?> getDdtByFilter(Request<RequestRicercaDdt> request) throws MalformedURLException, IOException, Exception;
	String getDdtByFilter(RequestRicercaDdt request) throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getListLottiFiltroRicercaDDT() throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getListTipiSpedizioneFiltroRicercaDDT() throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getListTipiProdottoFiltroRicercaDDT() throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getListModelliFiltroRicercaDDT() throws MalformedURLException, IOException, Exception;
	String dataTabledettaglioDDT(RequestRicercaDdt request) throws MalformedURLException, IOException, Exception;
	Response<String> dissassociaDaDDT(RequestDisassociazioneDDT request) throws MalformedURLException, IOException, Exception;
	String chiudiDDT(String id) throws MalformedURLException, IOException, Exception;
	ResponseDistintaDDT getDatiDistinta(String ddtId) throws MalformedURLException, IOException, Exception;
	String dataTableAssociaPallet(RequestRicercaDdt request)throws MalformedURLException, IOException, Exception;
	Response<String> associaADDT(RequestDisassociazioneDDT request)throws MalformedURLException, IOException, Exception;
	
}
