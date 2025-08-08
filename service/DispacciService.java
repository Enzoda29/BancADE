package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestDispacciRicerca;
import it.citel.postel.commonLib.rest.model.RequestDispaccio;
import it.citel.postel.commonLib.rest.model.RequestPreadv;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;
import it.citel.postel.commonLib.rest.model.ResponsePaginationAndValueObj;
/**
 * @author Tania
 */

public interface DispacciService {
	
//	public Response<?> selectDispacci(Request<RequestDispacciRicerca>  request) throws MalformedURLException, IOException, Exception ;
	Response<?> checkCodiceDispaccio(Request<RequestDispaccio> request)throws MalformedURLException, IOException, Exception ;
	Response<?> preAccettazioneDispaccio(Request<RequestDispaccio> request)throws MalformedURLException, IOException, Exception ;
	Response <?> insertDispaccioSospeso(Request<RequestDispaccio>request)throws MalformedURLException, IOException, Exception ;
	
	ResponseDynamicTable selectDispacciByFilter(Request<RequestDispacciRicerca>  request) throws MalformedURLException, IOException, Exception ;
	Response<ResponsePaginationAndValueObj> getLstDispSospInAttDiTRK(Request<RequestDispacciRicerca> request) throws MalformedURLException, IOException, Exception ;
	Response<ResponsePaginationAndValueObj> getDispacciSospProntiDaElab(Request<RequestDispacciRicerca> request) throws MalformedURLException, IOException, Exception ;
	Response<?> eliminaDispaccioSospeso(Request<RequestDispaccio> request) throws MalformedURLException, IOException, Exception ;
	
	
	
	
	
}
