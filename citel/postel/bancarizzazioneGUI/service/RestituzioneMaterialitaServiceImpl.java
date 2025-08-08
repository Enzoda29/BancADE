package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.bancarizzazioneGUI.util.PrintLetteraDiVetturaSDA;
import it.citel.postel.bancarizzazioneGUI.util.PropertiesUtil;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.exception.CustomException;
import it.citel.postel.commonLib.objects.spedizione.sda.AnagraficaSpedizioneObj;
import it.citel.postel.commonLib.objects.spedizione.sda.Ldv;
import it.citel.postel.commonLib.objects.spedizione.sda.ReturnRestStampaLdvSDA;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAggiornaSpedizione;
import it.citel.postel.commonLib.rest.model.RequestAssociaDDT;
import it.citel.postel.commonLib.rest.model.RequestAssociaSpedizioneScatole;
import it.citel.postel.commonLib.rest.model.RequestGetDettagliSpedizione;
import it.citel.postel.commonLib.rest.model.RequestPersistGetLDVFromWSStampaSDA;
import it.citel.postel.commonLib.rest.model.RequestRicercaSpedizioni;
import it.citel.postel.commonLib.rest.model.RequestSpedisciScatolaDiAnomalie;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseConfSDAStampa;
import it.citel.postel.commonLib.rest.model.ResponseDatatableMaterialita;
import it.citel.postel.commonLib.rest.model.ResponseDettagliLDV;
import it.citel.postel.commonLib.rest.model.ResponseDynamicObj;
import it.citel.postel.commonLib.rest.model.ResponseIndirizzoRestituzione;
import it.citel.postel.commonLib.rest.model.ResponseModuloDDT;
import it.citel.postel.commonLib.rest.model.ResponseRicercaSpedizione;
import it.citel.postel.commonLib.rest.model.ResponseSpedizioniDDT;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
@SuppressWarnings({"unchecked" , "rawtypes" , "unused"})
public class RestituzioneMaterialitaServiceImpl implements RestituzioneMaterialitaService{
static final Logger log = LogManager.getLogger(RestituzioneMaterialitaServiceImpl.class);
	
	@Autowired private DevRestConstants devRestConstants;
	@Autowired private PrintLetteraDiVetturaSDA utilSDA;
	@Autowired private PropertiesUtil prop ;
	
	/**
	 * ritorna la url completa dell'end point di bancarizzazione service + *** + metodo
	 * @param urlMapping - Request Mapping value
	 * @return full mapping endpoint Bancarizzazione Service
	 */
	private String urlBancServiceRestMaterialita(String urlMapping) {
		String ret = devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.RESTITUZIONE_MATERIALITA + "/"+ urlMapping;
		return ret;
	}


	@Override
	public Response<?> getScatoleDiAnomalie(BigDecimal idCentroDemat)throws MalformedURLException, IOException, Exception {
		
		Response responseDis = (Response) RESTfulClient.sendGet(urlBancServiceRestMaterialita("scatoleAnomalie?idCentroDemat="+idCentroDemat),
				Response.class);
				log.info("getScatoleDiAnomalie response status: "+responseDis.getStatus());
				return responseDis;
	}
	
	@Override
	public Response<?> getIndRestPosteIta() throws MalformedURLException, IOException, Exception {
	
		Response responseDis = (Response<ResponseIndirizzoRestituzione>) RESTfulClient.sendGet(urlBancServiceRestMaterialita("getIndRestPosteIta"),
				Response.class);
				log.info("getIndRestPosteIta response status: "+responseDis.getStatus());
				return responseDis;
	}

	@Override
	public Response<?> spedisciScatolaDiAnom(Request<RequestSpedisciScatolaDiAnomalie> request) throws MalformedURLException, IOException, Exception {
		
		Response<?> responseDis = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceRestMaterialita("spedisciScatolaDiAnom"),request, Response.class);
				log.info("checkCodRacc response status: "+responseDis.getStatus());
				return responseDis;
	}
	
	@Override
	public Response<?> getAllScatoleConformiByMicro(String aggregato, String idTipoDoc, Long microservizioIdClient) throws MalformedURLException, IOException, Exception {
		
		Response<?> responseDis = (Response<ResponseDynamicObj>) RESTfulClient.sendGet(urlBancServiceRestMaterialita("getAllScatoleConformiByMicro")+"?aggregato="+aggregato+"&idTipoDoc="+idTipoDoc+"&microservizioIdClient="+microservizioIdClient, Response.class);
				log.info("getAllScatoleConformi response status: "+responseDis.getStatus());
				return responseDis;
	}
	
	
	@Override
	public Response<?> sendAssociaSpedScatoleConformi(Request<RequestAssociaSpedizioneScatole> request) throws MalformedURLException, IOException, Exception {
		
		Response<?> responseDis = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceRestMaterialita("sendAssociaSpedScatoleConformi"),request, Response.class);
				log.info("sendAssociaSpedScatoleConformi response status: "+responseDis.getStatus());
				return responseDis;
	}
	
	@Override
	public Response<?> getAllSpedisciScatoleConformi() throws MalformedURLException, IOException, Exception {
		
		Response<?> responseDis = (Response<ResponseDynamicObj>) RESTfulClient.sendGet(urlBancServiceRestMaterialita("getAllSpedisciScatoleConformi"), Response.class);
				log.info("getAllSpedisciScatoleConformi response status: "+responseDis.getStatus());
				return responseDis;
	}
	
	@Override
	public Response<?> getDettaglioSpedizione(BigDecimal spedizioneID)throws MalformedURLException, IOException, Exception {
		Response<?> responseDis = (Response<ResponseDynamicObj>) RESTfulClient.sendGet(urlBancServiceRestMaterialita("getDettaglioSpedizione?spedizioneID="+spedizioneID),
				Response.class);
				log.info("getDettaglioSpedizione response status: "+responseDis.getStatus());
				return responseDis;
	}
	
	//RequestPersistLdvSDA
	@Override
	public ResponseDettagliLDV getDettaglioRichiestaStampaLdvSDA(Request<RequestGetDettagliSpedizione> request)
			throws MalformedURLException, IOException, Exception {
		ResponseDettagliLDV response = (ResponseDettagliLDV) RESTfulClient
				.sendPost(urlBancServiceRestMaterialita("getDettaglioRichiestaStampaLdvSDA"), request, ResponseDettagliLDV.class);
		log.info(" response status: " + response.isStatus());
		return response;
	}
	
	@Override
	public Response<?> sendRichiestaStampaLdvSDA(Request<ReturnRestStampaLdvSDA> request) throws MalformedURLException, IOException, Exception {
		
		Response<byte[]> response = new Response<byte[]>();
		RequestPersistGetLDVFromWSStampaSDA getLdvResponse = null;
		try {
			
			//get url location wsdl sda extralarge
			ResponseConfSDAStampa responseConfig = getConfigurationSDA_StampaExtraLarge();
			
//			String wsdlLocation = (String) responseConfig.getData().getUrlWsdlLocation();
//			String wsdlLocation = context.getRealPath("/WEB-INF/classes/wsdl/sda/SpedizioneActionService.wsdl") ;
//			Web Service Stampa per servizio Extralarge SDA
//			String wsdlLocation = "classpath:wsdl/sda/SpedizioneActionService.wsdl";
			Ldv ldv = request.getData().getSpedizioni();

			if( ldv.getMittente() == null ) {
				ldv.setMittente(new AnagraficaSpedizioneObj());
			}
			ldv.getMittente().setTipoAnagrafica("S");
			if( ldv.getDestinatario() == null ) {
				ldv.setDestinatario(new AnagraficaSpedizioneObj());
			}
			ldv.getDestinatario().setTipoAnagrafica("S");
			
			
			//datiSpedizione.datiGenerali.dataSpedizione
			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
			String today = format.format(new Date());
			
			ldv.getDatiSpedizione().getDatiGenerali().setDataSpedizione(today);
			ldv.getDatiSpedizione().setCodiceServizio("S09");
			
			getLdvResponse = utilSDA.getLetteraDivetturaSDAByWsSoap(ldv, prop.WSDL_SDA_SPEDIZIONE_ACTION_SERVICE);
			
			log.info( "ldvResponse: " + getLdvResponse );
			
			if (getLdvResponse != null && getLdvResponse.getEsitoCallWsSoap() ) {
				//Persist su BancarizzazioneService
				log.debug("INIZIO metodo BancarizzazioneService.persistRichiestaStampaSDA");
				//log.debug("Request: " + getLdvResponse.toString() );

				Request<RequestPersistGetLDVFromWSStampaSDA> requestBS = new Request<RequestPersistGetLDVFromWSStampaSDA>();
				requestBS.setData(getLdvResponse);
				Response<Boolean> responseBS = (Response<Boolean>) RESTfulClient.sendPost(urlBancServiceRestMaterialita("persistRichiestaStampaSDA"), requestBS, Response.class);
				
				log.debug("Response status: " + responseBS.getStatus());
				log.debug("FINE metod BancarizzazioneService.persistRichiestaStampaSDA");
//				response.setMessage(responseBS.getMessage());
				response.setData(getLdvResponse.getDocumentoDiStampa());
				response.setStatus(true);
				response.setMessage( "LDV_" + getLdvResponse.getIdentificativoLetteraDiVettura() ) ;
				
			} else {
				
				String err = getLdvResponse.getErrorMessage() != null? getLdvResponse.getErrorMessage():"Errore richiesta stampa LDV.";
				response.setMessage(err);
				response.setData(null);
				response.setStatus(false);
				
				log.error( "err: " + err ) ;
				
				return response;
			}
		} catch (Exception e) {
			response.setMessage(e.getMessage());
			response.setData(null);
			response.setStatus(false);
		}
		log.info("STAMPALDVSDA END. ");
		return response;
	}
	
	@Override
	public ResponseConfSDAStampa getConfigurationSDA_StampaExtraLarge()
			throws MalformedURLException, IOException, Exception {
		ResponseConfSDAStampa response = (ResponseConfSDAStampa) RESTfulClient
				.sendGet(urlBancServiceRestMaterialita("getConfigurationSDA_StampaExtraLarge"), ResponseConfSDAStampa.class);
		log.info(" response status: " + response.getStatus());
		return response;
	}

	@Override
	public Response<List<ResponseRicercaSpedizione>> getRicercaSpedizione(Request<RequestRicercaSpedizioni> request) throws MalformedURLException, IOException, Exception {
		Response<List<ResponseRicercaSpedizione>> response = (Response<List<ResponseRicercaSpedizione>>) RESTfulClient
				.sendPost(urlBancServiceRestMaterialita("getRicercaSpedizione"), request, Response.class);
		log.info(" response status: " + response.getStatus());
		return response;
	}

	@Override
	public Response<?> getDettSpedizione(Request<String> idSpedizione) throws MalformedURLException, IOException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendPost(urlBancServiceRestMaterialita("getDettSpedizione"), idSpedizione, Response.class);
		log.info(" response status: " + response.getStatus());
		return response;
	}

	@Override
	public Response<?> aggiornaSpedizione(Request<RequestAggiornaSpedizione> request) throws MalformedURLException, IOException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendPost(urlBancServiceRestMaterialita("aggiornaSpedizione"), request, Response.class);
		log.info(" response status: " + response.getStatus());
		return response;
	}

	@Override
	public Response<byte[]> getDistintaSpedizione(Request<String> request)
			throws MalformedURLException, IOException, Exception {
		Response<byte[]> response = (Response<byte[]>) RESTfulClient
				.sendPost(urlBancServiceRestMaterialita("getDistintaSpedizione"), request, Response.class);
		log.info(" response status: " + response.getStatus());
		return response;
	}

	@Override
	public Response<?> barcodeCheck(String barcode, Long macroservizioClientId) throws MalformedURLException, IOException, CustomException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestMaterialita("barcode?barcode="+barcode+"&macroservizioClientId="+macroservizioClientId), Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}

	@Override
	public Response<?> elencoScatole(String idCliente, String codiceScatola) throws MalformedURLException, IOException, CustomException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestMaterialita("elencoScatole")+"?identificativoCliente="+idCliente+"&codiceScatola="+codiceScatola, Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}

	@Override
	public Map<String, List<String>> elencoClienti(String idCliente)
			throws MalformedURLException, IOException, CustomException, Exception {
		List<String> idClients = new ArrayList<>();
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestMaterialita("elencoClienti")+"?identificativoCliente="+idCliente, Response.class);
		log.info(" response status: " + response.getStatus());			
		List<Map<String, Object>> data = (List<Map<String, Object>>) response.getData(); 
		for (Map<String, Object> map : data) {
			map.forEach((k, v) -> {
				if ("NAME".equals(k)) {
					idClients.add((String) v);
				}			
			});
		}		
		Map<String, List<String>> resp = new HashMap<String, List<String>>();
		resp.put("options", idClients);
		return resp;
	}
	
	@Override
	public Response<?> elencoTipiDoc(BigDecimal microservizioClientID) throws MalformedURLException, IOException, CustomException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestMaterialita("elencoTipiDoc")+"?microservizioClientID="+microservizioClientID, Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}
	
	@Override
	public Response<?> elencoAggregati() throws MalformedURLException, IOException, CustomException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestMaterialita("elencoAggregati"), Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}

	@Override
	public String getDataTableRestituzioneDDT(String centroDemat)
			throws MalformedURLException, IOException, CustomException, Exception {
		Request<String> request = new Request<>() ;
		request.setData(centroDemat) ;
		
		ResponseDatatableMaterialita response = (ResponseDatatableMaterialita) RESTfulClient.sendPost(urlBancServiceRestMaterialita("getDataTableRestituzioneDDT"), request, ResponseDatatableMaterialita.class) ;
		
		if( response != null && response.getData() != null && !response.getData().isEmpty() ) {
			return JSONBuilderDataTable.buildTable(response.getData().size(), response.getData());
		}
		
		return Constants.NO_ROW_FOUND_TABLE;
	}

	@Override
	public String associaDDT(RequestAssociaDDT request)
			throws MalformedURLException, IOException, CustomException, Exception {
		
		Response<String> response = (Response<String>) RESTfulClient.sendPost( urlBancServiceRestMaterialita("associaDDT") , request , Response.class ) ;
		
		if( !response.getStatus() ) {
			throw new Exception( "Internal Error! " + response.getData() ) ;
		}
		
		return response.getData() ;
	}

	@Override
	public ResponseModuloDDT getModuloDDT(String ddtId)
			throws MalformedURLException, IOException, CustomException, Exception {
		ResponseModuloDDT response = (ResponseModuloDDT) RESTfulClient.sendGet( urlBancServiceRestMaterialita( "getModuloDDT?ddtId=" + ddtId ) , ResponseModuloDDT.class ) ;
		if( response == null ) {
			throw new Exception( "Response null!" ) ;
		}
		return response ;
	}

	@Override
	public String getDataTableSpedizioneDDT() throws MalformedURLException, IOException, CustomException, Exception {
		
		ResponseSpedizioniDDT response = (ResponseSpedizioniDDT) RESTfulClient.sendGet(urlBancServiceRestMaterialita("getDataTableSpedizioneDDT"), ResponseSpedizioniDDT.class) ;
		
		if( response != null && response.getData() != null && !response.getData().isEmpty() ) {
			return JSONBuilderDataTable.buildTable(response.getData().size(), response.getData());
		}
		
		return Constants.NO_ROW_FOUND_TABLE;
	}


	@Override
	public ResponseModuloDDT getLDV(String selectedId)
			throws MalformedURLException, IOException, CustomException, Exception {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Response<String> spedisciDDT(String selectedId)
			throws MalformedURLException, IOException, CustomException, Exception {
		Response<String> response = (Response<String>) RESTfulClient.sendGet(urlBancServiceRestMaterialita("spedisciDDT") + "?spedizioneId=" + selectedId , Response.class) ;
		
		if( response == null || !response.getStatus() ) {
			throw new Exception( response.getMessage() ) ;
		}
		
		return null;
	}


	@Override
	public String getCountEtichetta(String ddtId)
			throws MalformedURLException, IOException, CustomException, Exception {
		Response<String> response = (Response<String>) RESTfulClient.sendGet(urlBancServiceRestMaterialita("getCountEtichetta") + "?ddtId=" + ddtId , Response.class) ;
		
		if( response == null ) {
			throw new NullPointerException( "Internal Error" ) ;
		}
		
		if( !response.getStatus() ) {
			throw new Exception( response.getMessage() ) ;
		}
		
		return response.getData() ;
	}


	@Override
	public String stampatichette(String ddtId)throws MalformedURLException, IOException, CustomException, Exception {
		Response<String> response = (Response<String>) RESTfulClient.sendGet(urlBancServiceRestMaterialita("stampatichette") + "?ddtId=" + ddtId , Response.class) ;
		
		if( response == null ) {
			throw new NullPointerException( "Internal Error" ) ;
		}
		
		if( !response.getStatus() ) {
			throw new Exception( response.getMessage() ) ;
		}
		
		return response.getData() ;
	}


	@Override
	public ResponseModuloDDT stampaLDV(String spedizioneId) throws MalformedURLException, IOException, CustomException, Exception {
		ResponseModuloDDT response = (ResponseModuloDDT) RESTfulClient.sendGet( urlBancServiceRestMaterialita( "stampaLDV?spedizioneId=" + spedizioneId ) , ResponseModuloDDT.class ) ;
		if( response == null ) {
			throw new Exception( "Response null!" ) ;
		}
		return response ;
	}
	
}
