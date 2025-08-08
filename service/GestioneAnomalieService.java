package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestConfRecDocAn;
import it.citel.postel.commonLib.rest.model.RequestDocumentiAnomali;
import it.citel.postel.commonLib.rest.model.RequestEsitLavContent;
import it.citel.postel.commonLib.rest.model.RequestPlichi;
import it.citel.postel.commonLib.rest.model.RequestRecuperoDocumenti;
import it.citel.postel.commonLib.rest.model.RequestStampaDistinta;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDocumentiAnomali;

public interface GestioneAnomalieService {

    public Response<?>  getDocumentiAnomali(Request<RequestDocumentiAnomali> request) throws MalformedURLException, IOException, Exception ;
    public Response<String>  recuperaDocumentiScatole(Request<RequestRecuperoDocumenti> request) throws MalformedURLException, IOException, Exception ;
    
    public Response<?>  getConfermaDocumentiAnomali(Request<RequestDocumentiAnomali> request) throws MalformedURLException, IOException, Exception ;
    public Response<?>  confermaRecuperoDocumentiAnomali(Request<RequestEsitLavContent> request) throws MalformedURLException, IOException, Exception ;
    public Response<?>  chiudiECreaNuovaScatolaAnomalieSanabili(Request<RequestConfRecDocAn> request) throws MalformedURLException, IOException, Exception ;
    public Response<?>  chiudiECreaNuovaScatolaAnomalieNonSanabili(Request<RequestConfRecDocAn> request) throws MalformedURLException, IOException, Exception ;
    public Response<?>  getStampaDistintaPerIlRecupero(Request<RequestStampaDistinta> request)  throws MalformedURLException, IOException, Exception ;
    public Response<?>  getListaDistintaPerIlRecupero()  throws MalformedURLException, IOException, Exception ;
	public String getTableScarti(RequestPlichi request) throws MalformedURLException, IOException, Exception;
}
