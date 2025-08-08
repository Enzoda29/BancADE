package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import it.citel.postel.commonLib.objects.monitor.MonitorCaricoObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestMonitor;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;

public interface MonitorService {
	
	public String monitorSla(Request<RequestMonitor> request) throws MalformedURLException, IOException, Exception ;
	public String getAlerting(Request<RequestMonitor> request) throws Exception ;
	public Request<?> buildRequest(String sort, String order, String offset, String limit, String username, String centroDematID, String clienteID) throws Exception ;
	public Response<?> detailsMonitor(String username, String centroDemat, String idPaTipoIstanzaCarico, String idPaTipoIstanzaSla) throws Exception ;
	public Response<?> idPACaricoAutocomplete(String username, String centroDemat, String idPaTipoIstanzaCarico) throws Exception ;
	public Response<?> idPASlaAutocomplete(String username, String centroDemat, String idPaTipoIstanzaSla) throws Exception ;
	public Response<?> getAlertingExport(Request<?> request) throws MalformedURLException, IOException, Exception ;
	
	
	//bancarizzazione
	String monitorCarico(Request<RequestMonitor> request) throws Exception ;
	Response<List<MonitorCaricoObj>> getMonitorByTypeID(Request<RequestMonitor> request) throws MalformedURLException, IOException, Exception ; ;
	public ResponseDynamicTable getDettaglioMonitorDiCarico(RequestMonitor request) throws Exception;
	public Response<Boolean> escludereOggettoDallElenco(String idSLA) throws Exception;
}
