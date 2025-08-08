package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

import it.citel.postel.commonLib.exception.CustomException;
import it.citel.postel.commonLib.rest.model.Response;

public interface ArchiviazioneService {
	Response<?> elencoScatole(String idCliente,String codiceScatola) throws MalformedURLException, IOException, CustomException, Exception;
	Response<?> elencoScatoleArchiviabili(BigDecimal microservizioClientID,  String tipoDoc, String aggregato) throws MalformedURLException, IOException, CustomException, Exception;
	
	Map<String, List<String>> elencoClienti(String idCliente) throws MalformedURLException, IOException, CustomException, Exception;
	Response<?> elencoScatoleByMacroservizio(String idTipoDoc, BigDecimal macroservizioClientId)
			throws MalformedURLException, IOException, CustomException, Exception;
	Response<?> elencoTipiDoc(BigDecimal microservizioClientID) throws MalformedURLException, IOException, CustomException, Exception;
	Response<?> elencoAggregati() throws MalformedURLException, IOException, CustomException, Exception;

}
