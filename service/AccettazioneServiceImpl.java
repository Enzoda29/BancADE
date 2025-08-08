package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.objects.normalizzazione.CasellariResponse;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestPreadv;
import it.citel.postel.commonLib.rest.model.Response;

@Service
public class AccettazioneServiceImpl implements AccettazioneService {
	
	static final Logger log = LogManager.getLogger(AccettazioneServiceImpl.class);
    
	@Autowired private DevRestConstants devRestConstants;
    
	@Override
	public Response<?> accettazioneMaterialita(Request<RequestPreadv> request) throws MalformedURLException, IOException, Exception {
		log.info("accettazioneMaterialita start ");
		Response responsePreADV = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/checkRaccomandata", request,
				Response.class);
		log.info("accettazioneMaterialita response status: "+responsePreADV.getStatus());
		return responsePreADV;

	}

	@Override
	public Response<?> noPreadvsing(Request<RequestPreadv> request)
			throws MalformedURLException, IOException, Exception {
		log.info("noPreadvsing start ");
		Response responsePreADV = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/insertNoPreadvising", request,
				Response.class);
		log.info("noPreadvsing response status: "+responsePreADV.getStatus());
		return responsePreADV;
	}
	
	@Override
	public Response<?> checkCentroDemat_Operatore(Request<RequestPreadv> request)
			throws MalformedURLException, IOException, Exception {
		log.info("checkCentroDemat_Operatore start ");
		Response responsePreADV = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/checkCentroDemat", request,
				Response.class);
		log.info("checkCentroDemat_Operatore response status: "+responsePreADV.getStatus());
		return responsePreADV;
	}

	@Override
	public Response<?> checkPraticaAlreadyExist(Request<RequestPreadv> request)
			throws MalformedURLException, IOException, Exception {
		log.info("checkPraticaAlreadyExist start ");
		Response responsePreADV = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/checkPraticaAlreadyExist", request,
				Response.class);
		return responsePreADV;
	}

	@Override
	public Response<?> insertPratica(Request<RequestPreadv> request)
			throws MalformedURLException, IOException, Exception {
		log.info("insertPratica start ");
		Response responsePreADV = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/insertPraticaInPraticaIdsrv", request,
				Response.class);
		return responsePreADV;
	}

	@Override
	public Response<?> insertCasellario(Request<RequestPreadv> request)
			throws MalformedURLException, IOException, Exception {
		log.info("insertCasellario start ");
		Response responsePreADV = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/updatePraticaToIdCasellario", request,
				Response.class);
		return responsePreADV;
	}

	@Override
	public Response<?> selectCasellari(Request<RequestPreadv> request)
			throws MalformedURLException, IOException, Exception {
		
                  //  request.getData().setStato("0");
		 Response<CasellariResponse> responseNorm = (Response<CasellariResponse>) RESTfulClient.sendPost(
					devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/getLstCasellari", request,
					Response.class);
			log.info("selectCasellari response status: "+responseNorm.getStatus());
			return responseNorm;
	}

	@Override
	public Response<?> checkRangeRaccomandata(Request<RequestPreadv> requestPreadv)
			throws MalformedURLException, IOException, Exception {
		log.info("checkRangeRaccomandata start ");
		Response responsePreADV = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/checkRangeRaccomandata", requestPreadv,
				Response.class);
		log.info("checkRangeRaccomandata response status: "+responsePreADV.getStatus());
		return responsePreADV;
	}

	@Override
	public Response<?> checkNOPreadvising(Request<RequestPreadv> requestPreadv)
			throws MalformedURLException, IOException, Exception {
		log.info("checkNOPreadvising start ");
		Response responsePreADV = (Response) RESTfulClient.sendPost(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE+"/checkNOPreadvising", requestPreadv,
				Response.class);
		log.info("checkNOPreadvising response status: "+responsePreADV.getStatus());
		return responsePreADV;
	}

}
