package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.bancarizzazioneGUI.util.SessionUtil;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.constants.SessionConstants;
import it.citel.postel.commonLib.model.NoPreadvising;
import it.citel.postel.commonLib.objects.normalizzazione.DettaglioPratica;
import it.citel.postel.commonLib.objects.scatole.GestScartiAnomalieObj;
import it.citel.postel.commonLib.objects.scatole.PacchettoObj;
import it.citel.postel.commonLib.objects.scatole.ScatolaObj;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAccettazioneScarto;
import it.citel.postel.commonLib.rest.model.RequestAddPratiche;
import it.citel.postel.commonLib.rest.model.RequestChangePacchetti;
import it.citel.postel.commonLib.rest.model.RequestGestioneScartiAnomalie;
import it.citel.postel.commonLib.rest.model.RequestNoPreadvising;
import it.citel.postel.commonLib.rest.model.RequestPacchetto;
import it.citel.postel.commonLib.rest.model.RequestPratica;
import it.citel.postel.commonLib.rest.model.RequestRecuperoScarto;
import it.citel.postel.commonLib.rest.model.RequestScatolaAnomalieScarti;
import it.citel.postel.commonLib.rest.model.RequestScatolaCustom;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDettPratica;
import it.citel.postel.commonLib.rest.model.ResponseGestioneScartiAnomalie;
import it.citel.postel.commonLib.rest.model.ResponsePacchetto;
import it.citel.postel.commonLib.rest.model.ResponsePacchettoCustom;
import it.citel.postel.commonLib.rest.model.ResponseScatolaCustom;
import it.citel.postel.commonLib.security.model.User;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
public class ScatolaServiceImpl implements ScatolaService {
	static final Logger log = LogManager.getLogger(ScatolaServiceImpl.class);
    @Autowired
    private DevRestConstants devRestConstants;


	/*@Override
	public Response<?> findScatole(Request<RequestScatolaCustom> request) throws MalformedURLException, IOException, Exception {
		log.info("findScatola start ");
		Response<ResponseScatola> responseScat = (Response<ResponseScatola>) RESTfulClient.sendPost(
				devRestConstants.RICERCHE_BASE_URL+"/selectScatole", request,
				Response.class);
		log.info("findScatola response status: "+responseScat.getStatus());
		return responseScat;
	}*/

/*
	@Override
	public Response<?> creaCodScatola() throws MalformedURLException, IOException, Exception {
		log.info("creaCodScatola start ");
		Response<ScatolaObj> responseCodScat = (Response<ScatolaObj>) RESTfulClient.sendGet(devRestConstants.SCATOLE_BASE_URL+"/getCodiceScatola", Response.class);
		log.info("creaCodScatola response status: "+responseCodScat.getStatus());
		return responseCodScat;
	}


	@Override
	public Response<?> loadListPacchetto(Request<PacchettoObj> request) throws MalformedURLException, IOException, Exception {
		log.info("getListPacchetto start "); 
		Response<ResponsePacchetto> response = (Response<ResponsePacchetto>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getListPacchetto",request, Response.class);
		
		log.info("getListPacchetto response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> apriScatola(Request<ScatolaObj> request) throws MalformedURLException, IOException, Exception {
		log.info("apriScatola start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/apriScatola",request, Response.class);
		
		log.info("apriScatola response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> dettScatola(Request<ScatolaObj> request) throws MalformedURLException, IOException, Exception {
		log.info("dettScatola start "); 
		Response<DettaglioPratica> response = (Response<DettaglioPratica>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getDettScatola",request, Response.class);
		
		log.info("dettScatola response status: "+response.getStatus());
		return response;
	} 
	
	@Override
	public Response<?> getNumMaxPratiche(Request<ScatolaObj> request) throws MalformedURLException, IOException, Exception {
		log.info("getNumMaxPratiche start "); 
		Response<ScatolaObj> response = (Response<ScatolaObj>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getNumMaxPratiche",request, Response.class);
		
		log.info("getNumMaxPratiche response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<?> getNumNonAccettato(Request<ScatolaObj> request) throws MalformedURLException, IOException, Exception {
		log.info("getNumNonAccettato start "); 
		Response<ScatolaObj> response = (Response<ScatolaObj>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getNumNonAccettato",request, Response.class);
		
		log.info("getNumMaxPratiche response status: "+response.getStatus());
		return response;
	} 

	
	@Override
	public Response<?> addPacchetto(Request<RequestPacchetto> request)	throws MalformedURLException, IOException, Exception {
		log.info("addPacchetto start "); 
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/addPacchetto",request, Response.class);
		
		log.info("addPacchetto response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> cambioStatoScatola(Request<ScatolaObj> request) throws MalformedURLException, IOException, Exception {
		log.info("cambioStatoScatola start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/cambioStatoScatola",request, Response.class);
		
		log.info("cambioStatoScatola response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> creaCodScatolaSospesi() throws MalformedURLException, IOException, Exception {
		log.info("creaCodScatolaSospesi start ");
		ResponseScatolaCustom responseCodScat = (ResponseScatolaCustom) RESTfulClient.sendGet(devRestConstants.SCATOLE_BASE_URL+"/getCodScatolaSosp", ResponseScatolaCustom.class);
		Response<ScatolaObj> response = new Response<ScatolaObj>();
		response.setMessage(responseCodScat.getMessage());
		response.setStatus(responseCodScat.getStatus());
		response.setData((responseCodScat.getData().size()>0)? responseCodScat.getData().get(0):null);
		log.info("creaCodScatolaSospesi response status: "+responseCodScat.getStatus());
		return response;
	}


	@Override
	public Response<?> apriScatolaSospesa(Request<ScatolaObj> request)
			throws MalformedURLException, IOException, Exception {
		log.info("apriScatolaSospesa start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/apriScatolaSospesa",request, Response.class);
		
		log.info("apriScatolaSospesa response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<?> apriScatolaAnomalie(Request<ScatolaObj> request)
			throws MalformedURLException, IOException, Exception {
		log.info("apriScatolaAnomalie start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/apriScatolaAnomalie",request, Response.class);
		
		log.info("apriScatolaAnomalie response status: "+response.getStatus());
		return response;
	}
	
	


	@Override
	public Response<?> creaCodScatolaAnomalie() throws MalformedURLException, IOException, Exception {
		log.info("creaCodScatolaAnomalie start ");
		Response<ScatolaObj> response = (Response<ScatolaObj>) RESTfulClient.sendGet(devRestConstants.SCATOLE_BASE_URL+"/getCodScatolaAnomalie", Response.class);
		
		return response;
	}


	@Override
	public Response<?> addPraticheAnomalie(Request<RequestScatolaAnomalieScarti> request)
			throws MalformedURLException, IOException, Exception {
		log.info("addPraticheAnomalie start "); 
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/addPraticheAnomalie",request, Response.class);
		
		log.info("addPraticheAnomalie response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> dettScatolaAnomaliePratica(Request<ScatolaObj> request)
			throws MalformedURLException, IOException, Exception {
		log.info("dettScatolaAnomaliePratica start "); 
		Response<DettaglioPratica> response = (Response<DettaglioPratica>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getDettScatolaAnomaliePratica",request, Response.class);
		
		log.info("dettScatolaAnomaliePratica response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> creaCodScatolaScarti() throws MalformedURLException, IOException, Exception {
		log.info("creaCodScatolaScarti start ");
		Response<ScatolaObj> response = (Response<ScatolaObj>) RESTfulClient.sendGet(devRestConstants.SCATOLE_BASE_URL+"/getCodScatolaScarti", Response.class);
		
		return response;
	}


	@Override
	public Response<?> apriScatolaScarti(Request<ScatolaObj> request)
			throws MalformedURLException, IOException, Exception {
		log.info("apriScatolaScarti start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/apriScatolaScarti",request, Response.class);
		
		log.info("apriScatolaScarti response status: "+response.getStatus());
		return response;
	}



	@Override
	public Response<?> addPraticheScarti(Request<RequestScatolaAnomalieScarti> request)
			throws MalformedURLException, IOException, Exception {
		log.info("addPraticheScarti start "); 
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/addPraticheScarti",request, Response.class);
		
		log.info("addPraticheScarti response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> dettScatolaScartiPratica(Request<ScatolaObj> request)
			throws MalformedURLException, IOException, Exception {
		log.info("dettScatolaScartiPratica start "); 
		Response<DettaglioPratica> response = (Response<DettaglioPratica>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getDettScatolaScartiPratica",request, Response.class);
		
		log.info("dettScatolaScartiPratica response status: "+response.getStatus());
		return response;
	}


	@Override
	public ResponsePacchettoCustom getPacchettoByCodice(Request<PacchettoObj> request)
			throws MalformedURLException, IOException, Exception {
		log.info("getPacchettoByCodice start "); 
		ResponsePacchettoCustom response = (ResponsePacchettoCustom) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getPacchettoByCodice",request, ResponsePacchettoCustom.class);
		
		log.info("getPacchettoByCodice response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> checkScatolaExist(Request<ScatolaObj> request)	throws MalformedURLException, IOException, Exception {
		log.info("checkScatolaExist start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/checkScatolaSospesaExist",request, Response.class);
		
		log.info("checkScatolaExist response status: "+response.getStatus());
		return response;
	}
	
	@Override
	public Response<?> checkRaccomandataInScatolaExist(Request<NoPreadvising> request)	throws MalformedURLException, IOException, Exception {
		log.info("checkRaccomandataInScatolaExist start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/checkRaccomandataInScatolaExist",request, Response.class);
		
		log.info("checkRaccomandataInScatolaExist response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> accettaSospesi(Request<ScatolaObj> request) throws MalformedURLException, IOException, Exception {
		log.info("accettaSospesi start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/accettaSospesi",request, Response.class);
		
		log.info("accettaSospesi response status: "+response.getStatus());
		return response;
	}

	@Override
	public Response<?> checkRaccomandataScatolaRicevutoPreadv(Request<NoPreadvising> request)	throws MalformedURLException, IOException, Exception {
		log.info("checkRaccomandataScatolaRicevutoPreadv start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/checkRaccomandataScatolaRicevutoPreadv",request, Response.class);
		
		log.info("checkRaccomandataScatolaRicevutoPreadv response status: "+response.getStatus());  
		return response;
	}


	@Override
	public Response<?> updateAccettatoNOPREADVISING(Request<NoPreadvising> request)	throws MalformedURLException, IOException, Exception {
		log.info("updateAccettatoNOPREADVISING start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/updateAccettatoNOPREADVISING",request, Response.class);
		
		log.info("updateAccettatoNOPREADVISING response status: "+response.getStatus());
		return response;
	}
	
	
	@Override
	public Response<?> updateNonAccettatoNOPREADVISING(Request<NoPreadvising> request)	throws MalformedURLException, IOException, Exception {
		log.info("updateNonAccettatoNOPREADVISING start "); 
		User user = (User) SessionUtil.getObjectFromSession(SessionConstants.USER);
		
		Request<RequestNoPreadvising> requestNoPreadv = new Request<RequestNoPreadvising>();
		RequestNoPreadvising requestNoPreadvObj = new RequestNoPreadvising();
		requestNoPreadvObj.setIdScatola(request.getData().getIdScatola());
		requestNoPreadvObj.setCodiceRaccomandata(request.getData().getCodiceRaccomandata());
		requestNoPreadvObj.setAccettato(request.getData().getAccettato());
		requestNoPreadvObj.setIdCentroDemat(user.getIdCentroDemat());
		requestNoPreadvObj.setUsername(user.getUsername());
		requestNoPreadvObj.setIdPostazione(user.getIdPostazione());	

		requestNoPreadv.setData(requestNoPreadvObj);
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/updateNonAccettatoNOPREADVISING",requestNoPreadv, Response.class);
		
		log.info("updateNonAccettatoNOPREADVISING response status: "+response.getStatus());
		return response;
	}
	
	
	@Override
	public Response<?> getLstScatoleANP(Request<ScatolaObj> request)	throws MalformedURLException, IOException, Exception {
		log.info("loadLstScatoleANP start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getLstScatoleANP",request, Response.class);
		
		log.info("getLstScatoleANP response status: "+response.getStatus());
		return response;
	}


	@Override
	public Request<?> buildRequest(String sort, String order, String offset, String limit,
			String centroDemat, String idPostazione,
			String idAnagrPASearch, String idIstanzaSearch, String codiceRaccomandataSearch,String codiceScatolaSearch,String codicePacchettoSearch,
			String dataAccettazioneDaSearch, String dataAccettazioneASearch) throws Exception {
		
		Request<RequestGestioneScartiAnomalie> request = new Request<>();
		RequestGestioneScartiAnomalie requestGestScarti = new RequestGestioneScartiAnomalie();
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit)) ;
		requestGestScarti.setCentroDemat(centroDemat);
		requestGestScarti.setIdPostazione(Long.valueOf(idPostazione));
		requestGestScarti.setId_istanza((!idIstanzaSearch.isEmpty())?Long.valueOf(idIstanzaSearch):0);
		requestGestScarti.setId_anagr((!idAnagrPASearch.isEmpty())?Long.valueOf(idAnagrPASearch):0);
		requestGestScarti.setCodiceRaccomandata(codiceRaccomandataSearch);
		requestGestScarti.setCodiceScatola(codiceScatolaSearch);
		requestGestScarti.setCodicePacchetto(codicePacchettoSearch);
		requestGestScarti.setDataAccettazioneA(dataAccettazioneASearch);
		requestGestScarti.setDataAccettazioneDa(dataAccettazioneDaSearch);
		requestGestScarti.setStart(startRow);
		requestGestScarti.setEnd(endRow);
		requestGestScarti.setOrder(order);
		requestGestScarti.setSort(sort);
		request.setData(requestGestScarti);
		return request;
	}


	@Override
	public String dataTableGestScarti(Request<RequestGestioneScartiAnomalie> request)
			throws MalformedURLException, IOException, Exception {
		log.info("dataTableGestScarti start ");
		ResponseGestioneScartiAnomalie responseGestScarti = (ResponseGestioneScartiAnomalie) RESTfulClient.sendPost(
				devRestConstants.SCATOLE_BASE_URL+"/getGestioneScarti", request,
				ResponseGestioneScartiAnomalie.class);	
		
		List<GestScartiAnomalieObj> listPratiche = responseGestScarti.getData();
		
		log.debug("listPratiche size: "+listPratiche.size());
		if(listPratiche != null && !listPratiche.isEmpty()){			
			return JSONBuilderDataTable.buildTable(listPratiche.get(0).getTotalRow(), listPratiche);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}
	
	@Override
	public String dataTableGestAnomalie(Request<RequestGestioneScartiAnomalie> request)
			throws MalformedURLException, IOException, Exception {
		log.info("dataTableGestAnomalie start ");
		ResponseGestioneScartiAnomalie responseGestScarti = (ResponseGestioneScartiAnomalie) RESTfulClient.sendPost(
				devRestConstants.SCATOLE_BASE_URL+"/getGestioneAnomalie", request,
				ResponseGestioneScartiAnomalie.class);	
		
		List<GestScartiAnomalieObj> listPratiche = responseGestScarti.getData();
		
		log.debug("listPratiche size: "+listPratiche.size());
		if(listPratiche != null && !listPratiche.isEmpty()){			
			return JSONBuilderDataTable.buildTable(listPratiche.get(0).getTotalRow(), listPratiche);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}


	@Override
	public Response<?> checkRaccomandataScarto(Request<RequestPratica> request)
			throws MalformedURLException, IOException, Exception {
		log.info("checkRaccomandataScarto start "); 
		Response response = (Response) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/checkRaccomandataScarto",request, Response.class);
		
		log.info("checkRaccomandataScarto response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> accettazioneScarto(Request<RequestAccettazioneScarto> request)
			throws MalformedURLException, IOException, Exception {
		log.info("accettazioneScarto start "); 
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/accettazioneScarto",request, Response.class);
		
		log.info("accettazioneScarto response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> getDettPacchettoPratiche(Request<PacchettoObj> request)
			throws MalformedURLException, IOException, Exception {
		log.info("getDettPacchettoPratiche start "); 
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getDettPacchettoPratiche",request, Response.class);
		
		log.info("getDettPacchettoPratiche response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> getScatolaApertaByCodice(Request<ScatolaObj> request)
			throws MalformedURLException, IOException, Exception {
		log.info("getScatolaApertaByCodice start "); 
		Response<ScatolaObj> response = (Response<ScatolaObj>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getScatolaApertaByCodice",request, Response.class);
		
		log.info("getScatolaApertaByCodice response status: "+response.getStatus());
		return response;
	}
		
	

	@Override
	public ResponseDettPratica getPraticaAnomalie(Request<RequestPratica> request) throws MalformedURLException, IOException, Exception {
		log.info("getPraticaAnomalie start "); 
		ResponseDettPratica response = (ResponseDettPratica) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getPraticaAnomalie",request, ResponseDettPratica.class);
		DettaglioPratica dettPra = response.getData();
    	
    	if(dettPra == null) {
    		response.setStatus(false);
    		response.setMessage("ATTENZIONE! Raccomandata inesistente o non anomala!"); 	
    		response.setData(null);
    	}else {
    		if(dettPra.getScatolaObj().getIdTipoScatola() == Constants.ID_TIPO_SCATOLA_ANOMALIE) {    			
    			response.setStatus(false);
    			response.setMessage("ATTENZIONE! Raccomandata già presente nella scatola anomala: "+dettPra.getScatolaObj().getCodiceScatola());
    			response.setData(null);
    		}else {
    			response.setStatus(true);
    			response.setMessage("OK");
    			response.setData(dettPra);
    		}
    	}
		
		log.info("getPraticaAnomalie response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> getScatolaApertaAnomalaByCodice(Request<ScatolaObj> request)	throws MalformedURLException, IOException, Exception {
		log.info("getScatolaApertaAnomalaByCodice start "); 
		Response<ScatolaObj> response = (Response<ScatolaObj>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getScatolaApertaAnomalaByCodice",request, Response.class);
		
		log.info("getScatolaApertaAnomalaByCodice response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> addPraticheScatolaAnomalie(Request<RequestAddPratiche> request)
			throws MalformedURLException, IOException, Exception {
		log.info("addPraticheScatolaAnomalie start ");  
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/addPraticheScatolaAnomalie",request, Response.class);
		
		log.info("addPraticheScatolaAnomalie response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> checkRecuperoScarti(RequestRecuperoScarto request)
			throws MalformedURLException, IOException, Exception {
		
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/checkRecuperoScarti",request, Response.class);
		
		log.info("checkRecuperoScarti response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> getFirstScatolaAperta(Request<ScatolaObj> request) throws MalformedURLException, IOException, Exception {
		log.info("getFirstScatolaAperta start "); 
		Response<ScatolaObj> response = (Response<ScatolaObj>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/getFirstScatolaAperta",request, Response.class);
		
		log.info("getFirstScatolaAperta response status: "+response.getStatus());
		return response;
	}


	@Override
	public Response<?> changeScatolaPacchetti(Request<RequestChangePacchetti> request)
			throws MalformedURLException, IOException, Exception {
		log.info("changeScatolaPacchetti start "); 
		Response<String> response = (Response<String>) RESTfulClient.sendPost(devRestConstants.SCATOLE_BASE_URL+"/changeScatolaPacchetti",request, Response.class);
		
		log.info("changeScatolaPacchetti response status: "+response.getStatus());
		return response;
	}


	@Override
	public Request<?> buildRequest(String sort, String order, String offset, String limit, String idTipoScatola,
			String statoScatola, String dataCaricamentoDa, String dataCaricamentoA, String dataAccettazioneDa,
			String dataAccettazioneA, String codicePacchetto, String codiceScatola, String idIstanza,
			String identificativoPA, String codiceRaccomandata) {


		Request<RequestScatolaCustom> request = new Request<>();
		RequestScatolaCustom requestScatola = new RequestScatolaCustom();
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit)) ;
		
		requestScatola.setStart(startRow);
		requestScatola.setEnd(endRow);
		requestScatola.setOrder(order);
		requestScatola.setSort(sort);
		requestScatola.setIdTipoScatola((idTipoScatola.isEmpty())?0:Integer.valueOf(idTipoScatola));
		requestScatola.setStatoScatola(statoScatola);
		requestScatola.setDataCaricamentoDa(dataCaricamentoDa);
		requestScatola.setDataCaricamentoA(dataCaricamentoA);
		requestScatola.setDataAccettazioneDa(dataAccettazioneDa);
		requestScatola.setDataAccettazioneA(dataAccettazioneA);
		requestScatola.setCodicePacchetto(codicePacchetto);
		requestScatola.setCodiceScatola(codiceScatola);
		requestScatola.setIdIstanza(idIstanza.isEmpty()?0:Long.valueOf(idIstanza));
		requestScatola.setIdAnagrPA(identificativoPA.isEmpty()?0:Long.valueOf(identificativoPA));
		requestScatola.setCodiceRaccomandata(codiceRaccomandata);

		request.setData(requestScatola);
		return request;
	}


	@Override
	public String dataTableGestioneScatole(Request<RequestScatolaCustom> request)
			throws MalformedURLException, IOException, Exception {
		log.info("dataTableGestScarti start ");
		ResponseScatolaCustom responseScat = (ResponseScatolaCustom) RESTfulClient.sendPost(
				devRestConstants.RICERCHE_BASE_URL+"/selectScatole", request,
				ResponseScatolaCustom.class);
		
		List<ScatolaObj> listScatole = responseScat.getData();
		
		log.debug("listScatole size: "+listScatole.size());
		if(listScatole != null && !listScatole.isEmpty()){			
			return JSONBuilderDataTable.buildTable(listScatole.get(0).getTotalRow(), listScatole);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}*/
}
