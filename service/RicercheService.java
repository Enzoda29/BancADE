package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.objects.pallette.PalletDistintaObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAddScatolaToPallet;
import it.citel.postel.commonLib.rest.model.RequestRicercaPallet;
import it.citel.postel.commonLib.rest.model.RequestRicercaScatolaDettaglio;
import it.citel.postel.commonLib.rest.model.RequestRimuoviScatolaPallet;
import it.citel.postel.commonLib.rest.model.RequestScatolaSearchCustom;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseCreazionePallet;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;

public interface RicercheService {
	
	//bancarizzazione
	Request<?> buildRequestScatola(String sort, String order, String offset, String limit, RequestScatolaSearchCustom request);
	String 	dataTableRicercaScatole(Request<RequestScatolaSearchCustom> request) throws MalformedURLException, IOException, Exception ;
	ResponseDynamicTable  dettaglioScatola(Request<?> request) throws MalformedURLException, IOException, Exception ;
	ResponseDynamicTable trackingScatola(Request<RequestRicercaScatolaDettaglio> request) throws MalformedURLException, IOException, Exception;
	
	Response<List<Combo>> getListStatiFiltroRicercaScatola() throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getListStatiFiltroRicercaElencoStatoPallet() throws MalformedURLException, IOException, Exception;
	String dataTableRicercaPallet(RequestRicercaPallet request) throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getListStatiFiltroRicercaElencoClientiPallet() throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getListStatiFiltroRicercaElencoTipiPallet() throws MalformedURLException, IOException, Exception;
	String dataTableDettagliPallet(RequestRicercaPallet request) throws MalformedURLException, IOException, Exception;
	Response<String> addScatolaToPallet(RequestAddScatolaToPallet request) throws MalformedURLException, IOException, Exception;
	Response<ResponseCreazionePallet> checkScatola(RequestAddScatolaToPallet request) throws MalformedURLException, IOException, Exception;
	String removeScatolaFromPallet(RequestRimuoviScatolaPallet request) throws MalformedURLException, IOException, Exception;
	String chiudiPallet(String string) throws MalformedURLException, IOException, Exception;
	PalletDistintaObj getDistintaPallet(String data) throws MalformedURLException, IOException, Exception;
	String sbloccaScatola(String scatolaId) throws MalformedURLException, IOException, Exception;
}
