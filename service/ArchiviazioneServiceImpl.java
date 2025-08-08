package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.exception.CustomException;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Response;
@Service
public class ArchiviazioneServiceImpl implements ArchiviazioneService {
	static final Logger log = LogManager.getLogger(ArchiviazioneServiceImpl.class);
	@Autowired private DevRestConstants devRestConstants;
	
	private String urlBancServiceRestArchiviazione(String urlMapping) {
		String ret = devRestConstants.ARCHIVIAZIONE_BASE_URL +"/"+ urlMapping;
		return ret;
	}
	
	@Override
	public Response<?> elencoScatole(String idCliente, String codiceScatola) throws MalformedURLException, IOException, CustomException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestArchiviazione("elencoScatole")+"?identificativoCliente="+idCliente+"&codiceScatola="+codiceScatola, Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}
	
	
	@Override
	public Response<?> elencoScatoleArchiviabili(BigDecimal microServizioIdClient, String idTipoDoc, String aggregato) throws MalformedURLException, IOException, CustomException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestArchiviazione("elencoScatoleArchiviabili")+"?microservizioIdClient="+microServizioIdClient+"&idTipoDoc="+idTipoDoc+"&aggregato="+aggregato, Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}
	
	
	@Override
	public Response<?> elencoScatoleByMacroservizio(String idTipoDoc, BigDecimal macroservizioClientId) throws MalformedURLException, IOException, CustomException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestArchiviazione("elencoScatoleByMacroservizio")+"?idTipoDoc="+idTipoDoc+"&macroservizioClientId="+macroservizioClientId, Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}



	@Override
	public Map<String, List<String>> elencoClienti(String idCliente)
			throws MalformedURLException, IOException, CustomException, Exception {
		List<String> idClients = new ArrayList<>();
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestArchiviazione("elencoClienti")+"?identificativoCliente="+idCliente, Response.class);
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
				.sendGet(urlBancServiceRestArchiviazione("elencoTipiDoc")+"?microservizioClientID="+microservizioClientID, Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}
	
	
	@Override
	public Response<?> elencoAggregati() throws MalformedURLException, IOException, CustomException, Exception {
		Response<?> response = (Response<?>) RESTfulClient
				.sendGet(urlBancServiceRestArchiviazione("elencoAggregati"), Response.class);
		log.info(" response status: " + response.getStatus());	
		return response;
	}

	

}
