package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestPreadv;
import it.citel.postel.commonLib.rest.model.Response;

public interface AccettazioneService {
	public Response<?> accettazioneMaterialita(Request<RequestPreadv> request) throws MalformedURLException, IOException, Exception ;
	public Response<?> noPreadvsing(Request<RequestPreadv> request) throws MalformedURLException, IOException, Exception ;
	public Response<?> checkCentroDemat_Operatore(Request<RequestPreadv> request) throws MalformedURLException, IOException, Exception ;
	public Response<?> checkPraticaAlreadyExist(Request<RequestPreadv> request) throws MalformedURLException, IOException, Exception ;
	public Response<?> insertPratica(Request<RequestPreadv> request) throws MalformedURLException, IOException, Exception ;
	public Response<?> insertCasellario(Request<RequestPreadv> request) throws MalformedURLException, IOException, Exception ;
	public Response<?> selectCasellari(Request<RequestPreadv>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?> checkRangeRaccomandata(Request<RequestPreadv> requestPreadv)throws MalformedURLException, IOException, Exception ;
	public Response<?> checkNOPreadvising(Request<RequestPreadv> requestPreadv)throws MalformedURLException, IOException, Exception ;
	
}
