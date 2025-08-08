package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestConfRecDocAn;
import it.citel.postel.commonLib.rest.model.RequestDocumentiAnomali;
import it.citel.postel.commonLib.rest.model.RequestEsitLavContent;
import it.citel.postel.commonLib.rest.model.RequestPlichi;
import it.citel.postel.commonLib.rest.model.RequestRecuperoDocumenti;
import it.citel.postel.commonLib.rest.model.RequestStampaDistinta;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDistinta;
import it.citel.postel.commonLib.rest.model.ResponseDocumentiAnomali;
import it.citel.postel.commonLib.rest.model.ResponseScartiCaptiva;
import it.citel.postel.commonLib.rest.model.ResponseStampaDistinta;
import it.citel.postel.commonLib.rest.model.ScartiCaptivaObj;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
@SuppressWarnings("unchecked")
public class
GestioneAnomalieServiceImpl implements GestioneAnomalieService {
	
	static final Logger log = LogManager.getLogger(GestioneAnomalieServiceImpl.class);
    @Autowired
    private DevRestConstants devRestConstants;
	

	@Override
	public Response<ResponseDocumentiAnomali> getDocumentiAnomali(Request<RequestDocumentiAnomali> request)
			throws MalformedURLException, IOException, Exception {
		Response<ResponseDocumentiAnomali> responseRecuperoDocumentiAnomali = (Response<ResponseDocumentiAnomali>) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/getDocumentiAnomali",request,
				Response.class);
		log.info(" response status: "+responseRecuperoDocumentiAnomali.getStatus());
		return responseRecuperoDocumentiAnomali;
	}
	
	@Override
	public Response<ResponseStampaDistinta> getStampaDistintaPerIlRecupero(Request<RequestStampaDistinta> request)
			throws MalformedURLException, IOException, Exception {
		System.out.println("sono sopra getStampa");
		Response<ResponseStampaDistinta> responseStampaDistinta = (Response<ResponseStampaDistinta>) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/getStampaDistintaPerIlRecupero",request,
				Response.class);
		System.out.println("sono sotto getStampa");
		log.info(" response status: "+responseStampaDistinta.getStatus());
		return responseStampaDistinta;
	}
	
	@Override
	public Response<ResponseDistinta> getListaDistintaPerIlRecupero()
			throws MalformedURLException, IOException, Exception {
		Response<ResponseDistinta> responseDistinta = (Response<ResponseDistinta>) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/getListaDistintaPerIlRecupero",null,
				Response.class);
		log.info(" response status: "+responseDistinta.getStatus());
		return responseDistinta;
	}
	@Override
	public Response<String> recuperaDocumentiScatole(Request<RequestRecuperoDocumenti> request)
			throws MalformedURLException, IOException, Exception {
		Response<String> ret=(Response<String>) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/recuperaDocumentiScatole",request,
				Response.class);
//		log.info(" response status: "+response.getStatus());
	//	SessionUtil.setObjectInSession(SessionConstants.CODICEPICKING, ret.getData());
		return ret;
	}
	
	@Override
	public Response<ResponseDocumentiAnomali> getConfermaDocumentiAnomali(Request<RequestDocumentiAnomali> request)
			throws MalformedURLException, IOException, Exception {
		Response<ResponseDocumentiAnomali> responseRecuperoDocumentiAnomali = (Response<ResponseDocumentiAnomali>) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/getConfermaDocumentiAnomali",request,
				Response.class);
		log.info(" response status: "+responseRecuperoDocumentiAnomali.getStatus());
		return responseRecuperoDocumentiAnomali;
	}
	@Override
	public Response<Integer> confermaRecuperoDocumentiAnomali(Request<RequestEsitLavContent> request)
			throws MalformedURLException, IOException, Exception {
		Response<Integer> responseConfermaRecuperoDocumentiAnomali = (Response<Integer>) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/confermaRecuperoDocumentiAnomali",request,
				Response.class);
		log.info(" response status: "+responseConfermaRecuperoDocumentiAnomali.getStatus());
		return responseConfermaRecuperoDocumentiAnomali;
	}
	
	@Override
	public Response<Integer> chiudiECreaNuovaScatolaAnomalieSanabili(Request<RequestConfRecDocAn> request)
			throws MalformedURLException, IOException, Exception {
		Response<Integer> responseConfermaRecuperoDocumentiAnomali = (Response<Integer>) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/chiudiECreaNuovaScatolaAnomalieSanabili",request,
				Response.class);
		log.info(" response status: "+responseConfermaRecuperoDocumentiAnomali.getStatus());
		return responseConfermaRecuperoDocumentiAnomali;
	}
	
	@Override
	public Response<Integer> chiudiECreaNuovaScatolaAnomalieNonSanabili(Request<RequestConfRecDocAn> request)
			throws MalformedURLException, IOException, Exception {
		Response<Integer> responseConfermaRecuperoDocumentiAnomali = (Response<Integer>) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/chiudiECreaNuovaScatolaAnomalieNonSanabili",request,
				Response.class);
		log.info(" response status: "+responseConfermaRecuperoDocumentiAnomali.getStatus());
		return responseConfermaRecuperoDocumentiAnomali;
	}

	@Override
	public String getTableScarti(RequestPlichi request) throws MalformedURLException, IOException, Exception {
		log.info("getTableScarti start ");
		ResponseScartiCaptiva responseScatola = (ResponseScartiCaptiva) RESTfulClient.sendPost(
				devRestConstants.CONFIGURAZIONE_GESTIONE_AN_URL+"/getTableScarti" , request,ResponseScartiCaptiva.class);
		 	
		List<ScartiCaptivaObj> listPlicoObj = responseScatola.getData();
		log.debug("listScatolaObj size: "+listPlicoObj.size());
		
		if(listPlicoObj != null && !listPlicoObj.isEmpty()){			
			return JSONBuilderDataTable.buildTable(listPlicoObj.get(0).getTotalRows(), listPlicoObj);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}


	
}
