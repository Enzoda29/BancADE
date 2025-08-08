package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestConfermaScatolaNConfRiscan;
import it.citel.postel.commonLib.rest.model.RequestScatolaSearchCustom;
import it.citel.postel.commonLib.rest.model.RequestScatoleNConfDaRiscan;
import it.citel.postel.commonLib.rest.model.Response;

public interface ScatoleService {
	
	Request<RequestScatoleNConfDaRiscan> buildRequestScatolaNConfDaRiscan(String sort, String order, String offset, String limit, String idCentroDemat);
	String getLstScatoleNConfDaRiscan(Request<RequestScatoleNConfDaRiscan> request) throws MalformedURLException, IOException, Exception;
	Response<?> updateNconfDaRisc(Request<RequestConfermaScatolaNConfRiscan> request)throws MalformedURLException, IOException, Exception;
	 
	String getLstScatoleAnomSanDaRiscan(Request<RequestScatoleNConfDaRiscan> request) throws MalformedURLException, IOException, Exception;
	Response<?> updateScatoleAnomSanDaRiscan(Request<RequestConfermaScatolaNConfRiscan> request)throws MalformedURLException, IOException, Exception;
	Response<?> close(long idScatola, String operatore, long postazione)throws MalformedURLException, IOException, Exception;
	Response<List<Map<String, Object>>> etichettaScatola(long idScatola)throws MalformedURLException, IOException, Exception;
	
	
	
}
