package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestNormalizzazione;
import it.citel.postel.commonLib.rest.model.RequestNormalizzazionePratiche;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAccessi;
import it.citel.postel.commonLib.rest.model.ResponseNormalizzazioneAccBarcode;

@Service
public class NormalizzazioneServiceImpl implements NormalizzazioneService {

	@Autowired
	private DevRestConstants devRestConstants;
	
	static final Logger log = LogManager.getLogger(NormalizzazioneService.class);
	
	@Override
	public ResponseAccessi checkAccesso(String userName) throws Exception {
		ResponseAccessi response = (ResponseAccessi) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE +"/checkAccesso?username="+userName,
				ResponseAccessi.class);
				log.info("checkAccesso normalizzazione response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<List<Map<String,Object>>> getNonConformi(long centroDemat) throws Exception {
		@SuppressWarnings("unchecked")
		Response<List<Map<String,Object>>> response = (Response<List<Map<String,Object>>>) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE +"/getNonConformi/"+centroDemat,
				Response.class);
				log.info("getNonConformi normalizzazione response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<List<Map<String,Object>>> getCaselle(String operatore) throws Exception {
		@SuppressWarnings("unchecked")
		Response<List<Map<String,Object>>> response = (Response<List<Map<String,Object>>>) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE +"/getCaselle/"+operatore,
				Response.class);
				log.info("getCasellari normalizzazione response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<String> getNumeroBoxPerRiga() throws Exception {
		@SuppressWarnings("unchecked")
		Response<String> response = (Response<String>) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE +"/getNumeroBoxPerRiga",
				Response.class);
				log.info("getNumeroBoxPerRiga normalizzazione response status: "+response.getStatus());
		return response;
	}

	@Override
	public ResponseNormalizzazioneAccBarcode accettazioneBarcode(Request<RequestNormalizzazione> request) throws Exception {
		ResponseNormalizzazioneAccBarcode response = (ResponseNormalizzazioneAccBarcode) RESTfulClient.sendPost(devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE +"/accettazioneBarcode", request,
				ResponseNormalizzazioneAccBarcode.class);
		log.info(" response status: "+response.getStatus());
		return response;
	}
	
	
	@Override
	public Response<List<Map<String,Object>>> getDetailsCasellario(long casellarioId) throws Exception {
		@SuppressWarnings("unchecked")
		Response<List<Map<String,Object>>> response = (Response<List<Map<String,Object>>>) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE +"/getDetailsCasellario?casellarioId="+casellarioId,
				Response.class);
				log.info("getDetailsCasellario normalizzazione response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<String> insertPlico(long casellarioId, String operatore, long centroDemat, long postazione,
			RequestNormalizzazionePratiche opId) throws Exception {
		@SuppressWarnings("unchecked")
		Response<String> response = (Response<String>) RESTfulClient
				.sendPut(
						devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE + "/" + devRestConstants.NORMALIZZAZIONE
								+ "/plico/" + casellarioId + "/" + operatore + "/" + centroDemat + "/" + postazione,
						opId, Response.class);
		return response;
	}

	@Override
	public Response<Map<String, String>> getPlicoInfo(long idPlico) throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<Map<String, String>> response = (Response<Map<String, String>>) RESTfulClient.sendGet(devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE + "/getPlicoInfo/" + idPlico , Response.class);
		return response;
	}

	@Override
	public Response<String> removeFromCasellario(long casellarioId, RequestNormalizzazionePratiche request) throws MalformedURLException, IOException, Exception {
		@SuppressWarnings("unchecked")
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE + "/removeFromCasellario/" + casellarioId , request , Response.class);
		return response;
	}
	
	@Override
	public Response<List<Map<String,Object>>> getDetailsNonConformi(long scatolaId, long tipoScatolaTypeId) throws Exception {
		@SuppressWarnings("unchecked")
		Response<List<Map<String,Object>>> response = (Response<List<Map<String,Object>>>) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE +"/getDetailsNonConformi/"+scatolaId+"/"+tipoScatolaTypeId,
				Response.class);
				log.info("getDetailsNonConformi normalizzazione response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<String> closeAndCreateScatola(long idScatola, String operatore, long postazione, long tipoScatolaTypeId, long centroDemat) throws Exception {
		@SuppressWarnings("unchecked")
		Response<String> response = (Response<String>) RESTfulClient.sendPut(devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.NORMALIZZAZIONE +"/nonConformi/"+idScatola+"/"+operatore+"/"+postazione+"/"+tipoScatolaTypeId+"/"+centroDemat,
				null, Response.class);
		return response;
	}

}
