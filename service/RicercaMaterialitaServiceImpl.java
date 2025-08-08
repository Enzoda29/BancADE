package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestPreadv;
import it.citel.postel.commonLib.rest.model.Response;

@Service
public class RicercaMaterialitaServiceImpl implements RicercaMaterialitaService{
static final Logger log = LogManager.getLogger(RicercaMaterialitaServiceImpl.class);
	
	@Autowired
	private DevRestConstants devRestConstants;

	@Override
	public Response<?> getInfoCodOggetto(String codeOggetto) throws MalformedURLException, IOException, Exception {
		Response responseDis = (Response) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.MATERIALITA +"/datiMaterialita?codiceOggetto="+codeOggetto,
				Response.class);
				log.info("getInfoCodOggetto response status: "+responseDis.getStatus());
				return responseDis;
	}

	@Override
	public Response<?> getFlussoCodOggetto(String codeOggetto) throws MalformedURLException, IOException, Exception {
		Response responseDis = (Response) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.MATERIALITA +"/flussoMaterialita?codiceOggetto="+codeOggetto,
				Response.class);
				log.info("getFlussoCodOggetto response status: "+responseDis.getStatus());
				return responseDis;
	}

	@Override
	public Response<?> getInfoCodOggettoIndescr(String codiceOggetto)
			throws MalformedURLException, IOException, Exception {
		Response responseDis = (Response) RESTfulClient.sendGet(
				devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.MATERIALITA +"/datiMaterialitaIndescr?codiceOggetto="+codiceOggetto,
				Response.class);
				log.info("getInfoCodOggettoIndescr response status: "+responseDis.getStatus());
				return responseDis;
	}
	
}
