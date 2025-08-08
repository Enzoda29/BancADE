package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;

import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestGetMacroservizioByCliServ;
import it.citel.postel.commonLib.rest.model.Response;

public interface CommonGuiService {
	
	Response<List<Combo>> getClientiAutocomplete(Request<String> request) throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getAllCentroDemat() throws MalformedURLException, IOException, Exception;
	Response<?> getComboClienti() throws MalformedURLException, IOException, Exception ;
	Response<List<Combo>> getComboServiziByCliente(Request<BigDecimal> request) throws MalformedURLException, IOException, Exception ;
	Response<?> getComboClientiWhitCode() throws MalformedURLException, IOException, Exception ;
	Response<List<Combo>> getAllUserProfiles() throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getMacroservByCliAndServ(Request<RequestGetMacroservizioByCliServ> request) throws MalformedURLException, IOException, Exception;
	Response<List<Combo>> getIndirizzoRestituzioneByCli(Request<RequestGetMacroservizioByCliServ> request) throws MalformedURLException, IOException, Exception;
	
	
	
	
}
