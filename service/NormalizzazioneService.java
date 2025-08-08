package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestNormalizzazione;
import it.citel.postel.commonLib.rest.model.RequestNormalizzazionePratiche;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAccessi;
import it.citel.postel.commonLib.rest.model.ResponseNormalizzazioneAccBarcode;

public interface NormalizzazioneService {
	ResponseAccessi checkAccesso(String userName) throws Exception;
	Response<List<Map<String,Object>>> getNonConformi(long centroDemat) throws Exception;
	Response<List<Map<String,Object>>> getCaselle(String operatore) throws Exception;
	Response<String> getNumeroBoxPerRiga() throws Exception;
	ResponseNormalizzazioneAccBarcode accettazioneBarcode(Request<RequestNormalizzazione> request) throws Exception;
	Response<List<Map<String, Object>>> getDetailsCasellario(long casellarioId) throws Exception;	
	Response<String> insertPlico(long casellarioId, String operatore, long centroDemat, long postazione,RequestNormalizzazionePratiche opId)throws Exception;
	Response<String> closeAndCreateScatola(long idScatola, String operatore, long postazione, long tipoScatolaTypeId, long centroDemat)throws Exception;
	Response<List<Map<String, Object>>> getDetailsNonConformi(long scatolaId, long tipoScatolaTypeId) throws Exception;
	Response<Map<String, String>> getPlicoInfo(long idPlico) throws MalformedURLException, IOException, Exception;
	Response<String> removeFromCasellario(long casellarioId, RequestNormalizzazionePratiche request) throws MalformedURLException, IOException, Exception;
	
}
