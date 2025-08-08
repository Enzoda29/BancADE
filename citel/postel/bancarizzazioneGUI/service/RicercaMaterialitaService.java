package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import it.citel.postel.commonLib.rest.model.ListDatiMaterialita;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestDispaccio;
import it.citel.postel.commonLib.rest.model.RequestPreadv;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;

public interface RicercaMaterialitaService {
//	public String ricercaMaterialita (/*Request<RequestPreadv> request*/String codiceOggetto) throws MalformedURLException, IOException, Exception ;
	Response<?> getInfoCodOggetto(String codeOggetto)throws MalformedURLException, IOException, Exception ;
	//ResponseDynamicTable getFlussoCodOggetto(Request<ListDatiMaterialita> request)throws MalformedURLException, IOException, Exception ;
	Response<?> getFlussoCodOggetto(String codeOggetto) throws MalformedURLException, IOException, Exception;
	Response<?> getInfoCodOggettoIndescr(String codiceOggetto)throws MalformedURLException, IOException, Exception;
}
