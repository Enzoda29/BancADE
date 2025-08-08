package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import it.citel.postel.commonLib.rest.model.RequestPlichi;
import it.citel.postel.commonLib.rest.model.ResponsePlichiDettObj;

public interface PlichiService {

	String getTablePlichi(RequestPlichi request) throws MalformedURLException, IOException, Exception;

	ResponsePlichiDettObj getDettagliPlico(String idPlico) throws MalformedURLException, IOException, Exception;

	String getTableStatiPlico(RequestPlichi request)throws MalformedURLException, IOException, Exception;
}
