package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;

import it.citel.postel.commonLib.model.UserForm;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.objects.configurazione.ServizioIstanzaPaObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestCentriDemat;
import it.citel.postel.commonLib.rest.model.RequestClientiRestProfile;
import it.citel.postel.commonLib.rest.model.RequestConfOperatori;
import it.citel.postel.commonLib.rest.model.RequestConfigurazione;
import it.citel.postel.commonLib.rest.model.RequestConfigurazioneRangeRacc;
import it.citel.postel.commonLib.rest.model.RequestConfigurazioneServizio;
import it.citel.postel.commonLib.rest.model.RequestDeliveryPa;
import it.citel.postel.commonLib.rest.model.RequestDeliveryPaSearch;
import it.citel.postel.commonLib.rest.model.RequestGetCliRestProfByServMacros;
import it.citel.postel.commonLib.rest.model.RequestIndirizzoRestituzione;
import it.citel.postel.commonLib.rest.model.RequestIstanza;
import it.citel.postel.commonLib.rest.model.RequestNewMacroservizio;
import it.citel.postel.commonLib.rest.model.RequestOperatore;
import it.citel.postel.commonLib.rest.model.RequestRicercaCliente;
import it.citel.postel.commonLib.rest.model.RequestRicercaServizi;
import it.citel.postel.commonLib.rest.model.RequestServizioIstanzaPa;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponsePraticaIstanzaPACustom;

public interface ConfigurazioneService {
    
    //bancarizzazione
	Response<?>  getAnagrafica(Request<RequestRicercaCliente> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  insertAnagraficaCliente(Request<RequestRicercaCliente> request) throws MalformedURLException, IOException, Exception ;	
	Response<?>  updateAnagraficaCliente(Request<RequestRicercaCliente> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  addMacroServizioToClient(Request<RequestNewMacroservizio> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  getMacroserviziByCliente(Request<RequestNewMacroservizio> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  getIndRestitByCliente(Request<BigDecimal> request) throws MalformedURLException, IOException, Exception ;	
	Response<?>  updateIndirizzoRestituzione(Request<RequestIndirizzoRestituzione> request) throws MalformedURLException, IOException, Exception ;	
	Response<?>  deleteIndirizzoRestituzione(Request<RequestIndirizzoRestituzione> request) throws MalformedURLException, IOException, Exception ;	
	Response<?>  insertIndirizzoRestituzione(Request<RequestIndirizzoRestituzione> request) throws MalformedURLException, IOException, Exception ;	
	Response<?>  getServizi(Request<RequestRicercaServizi> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  insertServiziToCliente(Request<RequestRicercaServizi> request) throws MalformedURLException, IOException, Exception ;
	Request<?> buildRequest(String sort, String order, String offset, String limit, String usernameSearch) throws Exception ;
	String 	dataTableConfOperatori(Request<RequestConfOperatori> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  addOperatore(Request<RequestOperatore> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  updateOperatore(Request<RequestOperatore> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  deleteOperatore(Request<RequestOperatore> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  getCliRestProfileByMacroSid(Request<RequestGetCliRestProfByServMacros> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  saveCliRestProfile(Request<RequestClientiRestProfile> request) throws MalformedURLException, IOException, Exception ;
	Response<?>  getListaServizi() throws MalformedURLException, IOException, Exception;
	
}
