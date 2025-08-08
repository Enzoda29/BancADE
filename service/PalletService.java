package it.citel.postel.bancarizzazioneGUI.service;

import it.citel.postel.commonLib.rest.model.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

public interface PalletService {

	String getListStatiFiltroRicercaElencoStatoPallet(Request<RequestStatiFiltroRicercaElencoPallet> request) throws MalformedURLException, IOException, Exception;

	//String getLstScatoleAnomSanDaRiscan(Request<RequestScatoleNConfDaRiscan> request) throws MalformedURLException, IOException, Exception;
	//Response<?> updateScatoleAnomSanDaRiscan(Request<RequestConfermaScatolaNConfRiscan> request)throws MalformedURLException, IOException, Exception;
	//Response<?> close(long idScatola, String operatore, long postazione)throws MalformedURLException, IOException, Exception;
	//Response<List<Map<String, Object>>> etichettaScatola(long idScatola)throws MalformedURLException, IOException, Exception;
	
	
	
}
