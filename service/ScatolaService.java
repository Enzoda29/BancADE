package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import it.citel.postel.commonLib.model.NoPreadvising;
import it.citel.postel.commonLib.objects.scatole.PacchettoObj;
import it.citel.postel.commonLib.objects.scatole.ScatolaObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAccettazioneScarto;
import it.citel.postel.commonLib.rest.model.RequestAddPratiche;
import it.citel.postel.commonLib.rest.model.RequestChangePacchetti;
import it.citel.postel.commonLib.rest.model.RequestGestioneScartiAnomalie;
import it.citel.postel.commonLib.rest.model.RequestPacchetto;
import it.citel.postel.commonLib.rest.model.RequestPratica;
import it.citel.postel.commonLib.rest.model.RequestRecuperoScarto;
import it.citel.postel.commonLib.rest.model.RequestScatolaAnomalieScarti;
import it.citel.postel.commonLib.rest.model.RequestScatolaCustom;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDettPratica;
import it.citel.postel.commonLib.rest.model.ResponsePacchettoCustom;

public interface ScatolaService {
	/*
	//public Response<?>  findScatole(Request<RequestScatolaCustom>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  creaCodScatola() throws MalformedURLException, IOException, Exception ;
	public Response<?>  creaCodScatolaSospesi() throws MalformedURLException, IOException, Exception ;
	public Response<?>  creaCodScatolaAnomalie() throws MalformedURLException, IOException, Exception ;
	public Response<?>  creaCodScatolaScarti() throws MalformedURLException, IOException, Exception ;
    public Response<?>  loadListPacchetto(Request<PacchettoObj> request) throws MalformedURLException, IOException, Exception ;	
	public Response<?>  apriScatola(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  apriScatolaSospesa(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  apriScatolaAnomalie(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  apriScatolaScarti(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;	
//	public Response<?>  chiudiScatola(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  cambioStatoScatola(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?> dettScatola(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception;
	public Response<?> getNumMaxPratiche(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception;
	public Response<?> getNumNonAccettato(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception;
	public Response<?>  addPacchetto(Request<RequestPacchetto>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  addPraticheAnomalie(Request<RequestScatolaAnomalieScarti>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  addPraticheScarti(Request<RequestScatolaAnomalieScarti>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  dettScatolaAnomaliePratica(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception;
	public Response<?>  dettScatolaScartiPratica(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception;
	public ResponsePacchettoCustom getPacchettoByCodice(Request<PacchettoObj> request)throws MalformedURLException, IOException, Exception;
	
	public Response<?>  checkScatolaExist(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  checkRaccomandataInScatolaExist(Request<NoPreadvising>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?>  checkRaccomandataScatolaRicevutoPreadv(Request<NoPreadvising>  request) throws MalformedURLException, IOException, Exception ;
	
	public Response<?>  accettaSospesi(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;
	
	public Response<?>  updateAccettatoNOPREADVISING(Request<NoPreadvising>  request) throws MalformedURLException, IOException, Exception ;
	public Response<?> updateNonAccettatoNOPREADVISING(Request<NoPreadvising> request)	throws MalformedURLException, IOException, Exception;
	
	public Response<?> getLstScatoleANP(Request<ScatolaObj> request)	throws MalformedURLException, IOException, Exception;
	
    public Request<?> buildRequest(String sort, String order, String offset, String limit,String centroDemat, String idPostazione, String identificativoPASearch, String codiceTipoIstanzaSearch, String codiceRaccomandataSearch, String codiceScatolaSearch, String codicePacchettoSearch,String dataAccettazioneDaSearch, String dataAccettazioneASearch) throws Exception ;
    public String dataTableGestScarti(Request<RequestGestioneScartiAnomalie> request) throws MalformedURLException, IOException, Exception ;
    public String dataTableGestAnomalie(Request<RequestGestioneScartiAnomalie> request) throws MalformedURLException, IOException, Exception ;
    
    public Response<?>  checkRaccomandataScarto(Request<RequestPratica>  request) throws MalformedURLException, IOException, Exception ;
    public Response<?> accettazioneScarto(Request<RequestAccettazioneScarto> request)	throws MalformedURLException, IOException, Exception;
    
    public Response<?> getDettPacchettoPratiche(Request<PacchettoObj> request)	throws MalformedURLException, IOException, Exception;
    
    public Response<?>  getScatolaApertaByCodice(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception;
    
    public ResponseDettPratica getPraticaAnomalie(Request<RequestPratica> request) throws MalformedURLException, IOException, Exception;

    public Response<?>  getScatolaApertaAnomalaByCodice(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception;
    
    public Response<?> addPraticheScatolaAnomalie(Request<RequestAddPratiche>  request) throws MalformedURLException, IOException, Exception ;
    
    public Response<?> checkRecuperoScarti(RequestRecuperoScarto request)throws MalformedURLException, IOException, Exception ;
    
    public Response<?>  getFirstScatolaAperta(Request<ScatolaObj>  request) throws MalformedURLException, IOException, Exception ;
    
    public Response<?> changeScatolaPacchetti(Request<RequestChangePacchetti> request)  throws MalformedURLException, IOException, Exception ;
    
    public Request<?> buildRequest(String sort, String order, String offset, String limit,String idTipoScatola, String statoScatola,String dataCaricamentoDa,String dataCaricamentoA, String dataAccettazioneDa, String dataAccettazioneA,String codicePacchetto,String codiceScatola,String idIstanza, String identificativoPA, String codiceRaccomandata);
 
    public String dataTableGestioneScatole(Request<RequestScatolaCustom> request) throws MalformedURLException, IOException, Exception ;
*/
}
