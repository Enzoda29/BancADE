package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

import it.citel.postel.commonLib.exception.CustomException;
import it.citel.postel.commonLib.objects.spedizione.sda.ReturnRestStampaLdvSDA;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAggiornaSpedizione;
import it.citel.postel.commonLib.rest.model.RequestAssociaDDT;
import it.citel.postel.commonLib.rest.model.RequestAssociaSpedizioneScatole;
import it.citel.postel.commonLib.rest.model.RequestGetDettagliSpedizione;
import it.citel.postel.commonLib.rest.model.RequestRicercaSpedizioni;
import it.citel.postel.commonLib.rest.model.RequestSpedisciScatolaDiAnomalie;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseConfSDAStampa;
import it.citel.postel.commonLib.rest.model.ResponseDettagliLDV;
import it.citel.postel.commonLib.rest.model.ResponseModuloDDT;

public interface RestituzioneMaterialitaService {
	Response<?> getScatoleDiAnomalie(BigDecimal idCentroDemat) throws MalformedURLException, IOException, Exception ;
	Response<?> getIndRestPosteIta() throws MalformedURLException, IOException, Exception;
	Response<?> spedisciScatolaDiAnom(Request<RequestSpedisciScatolaDiAnomalie> request) throws MalformedURLException, IOException, Exception;
	Response<?> getAllScatoleConformiByMicro(String aggregato, String tipo_doc_id, Long microservizioClientId) throws MalformedURLException, IOException, Exception;
	Response<?> sendAssociaSpedScatoleConformi(Request<RequestAssociaSpedizioneScatole> request) throws MalformedURLException, IOException, Exception;
	Response<?> getAllSpedisciScatoleConformi() throws MalformedURLException, IOException, Exception;
	Response<?> getDettaglioSpedizione(BigDecimal spedizioneID) throws MalformedURLException, IOException, Exception;
	ResponseDettagliLDV getDettaglioRichiestaStampaLdvSDA(Request<RequestGetDettagliSpedizione> request) throws MalformedURLException, IOException, Exception ;
    Response<?> sendRichiestaStampaLdvSDA(Request<ReturnRestStampaLdvSDA> request) throws MalformedURLException, IOException, Exception ;
	Response<?> getRicercaSpedizione(Request<RequestRicercaSpedizioni> request) throws MalformedURLException, IOException, Exception;
	Response<?> getDettSpedizione(Request<String> request) throws MalformedURLException, IOException, Exception;
	Response<?> aggiornaSpedizione(Request<RequestAggiornaSpedizione> request) throws MalformedURLException, IOException, Exception;
	ResponseConfSDAStampa getConfigurationSDA_StampaExtraLarge() throws MalformedURLException, IOException, Exception;
	Response<?> getDistintaSpedizione(Request<String> request) throws MalformedURLException, IOException, Exception;
	Response<?> barcodeCheck(String barcode, Long macroserivizioClientId) throws MalformedURLException, IOException, CustomException, Exception;
	Response<?> elencoScatole(String idCliente, String codiceScatola) throws MalformedURLException, IOException, CustomException, Exception;
	Response<?> elencoTipiDoc(BigDecimal microservizioClientID) throws MalformedURLException, IOException, CustomException, Exception;
	Map<String, List<String>> elencoClienti(String idCliente) throws MalformedURLException, IOException, CustomException, Exception;
	Response<?> elencoAggregati() throws MalformedURLException, IOException, CustomException, Exception;
	String getDataTableRestituzioneDDT(String centroDemat)throws MalformedURLException, IOException, CustomException, Exception;
	String associaDDT(RequestAssociaDDT request)throws MalformedURLException, IOException, CustomException, Exception;
	ResponseModuloDDT getModuloDDT(String ddtId)throws MalformedURLException, IOException, CustomException, Exception;
	String getDataTableSpedizioneDDT()throws MalformedURLException, IOException, CustomException, Exception;
	ResponseModuloDDT getLDV(String selectedId)throws MalformedURLException, IOException, CustomException, Exception;
	Response<String> spedisciDDT(String selectedId)throws MalformedURLException, IOException, CustomException, Exception;
	String getCountEtichetta(String ddtId)throws MalformedURLException, IOException, CustomException, Exception;
	String stampatichette(String ddtId)throws MalformedURLException, IOException, CustomException, Exception;
	ResponseModuloDDT stampaLDV(String spedizioneId)throws MalformedURLException, IOException, CustomException, Exception;
	
}
