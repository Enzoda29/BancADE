package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.util.DevRestConstants;
import it.citel.postel.commonLib.objects.plichi.PlicoObject;
import it.citel.postel.commonLib.rest.RESTfulClient;
import it.citel.postel.commonLib.rest.ResponseStatiPlico;
import it.citel.postel.commonLib.rest.model.RequestPlichi;
import it.citel.postel.commonLib.rest.model.ResponsePlichiDettObj;
import it.citel.postel.commonLib.rest.model.ResponsePlichiObj;
import it.citel.postel.commonLib.rest.model.StatiPlicoObj;
import it.citel.postel.commonLib.utils.JSONBuilderDataTable;

@Service
public class PlichiServiceImpl implements PlichiService {
	@Autowired
	private DevRestConstants devRestConstants;
	
	static final Logger log = LogManager.getLogger(PlichiService.class);

	@Override
	public String getTablePlichi(RequestPlichi request) throws MalformedURLException, IOException, Exception {
		log.info("getTablePlichi start ");
		 ResponsePlichiObj responseScatola = (ResponsePlichiObj) RESTfulClient.sendPost(
				 devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PLICHI + "/getTablePlichi" , request,ResponsePlichiObj.class);
		 	
		List<PlicoObject> listPlicoObj = responseScatola.getData();
		log.debug("listScatolaObj size: "+listPlicoObj.size());
		
		if(listPlicoObj != null && !listPlicoObj.isEmpty()){			
			return JSONBuilderDataTable.buildTable(Long.parseLong( listPlicoObj.get(0).getTotalRows() ), listPlicoObj);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}

	@Override
	public ResponsePlichiDettObj getDettagliPlico(String idPlico) throws MalformedURLException, IOException, Exception {
		log.info("getTablePlichi start ");
		ResponsePlichiDettObj response = (ResponsePlichiDettObj) RESTfulClient.sendPost(
				 devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PLICHI + "/getDettagliPlico" , idPlico,ResponsePlichiDettObj.class);
		
		if( response == null ) {
			throw new Exception() ;
		}
		
		return response ;
	}

	@Override
	public String getTableStatiPlico(RequestPlichi request) throws MalformedURLException, IOException, Exception {
		log.info("getTableStatiPlico start ");
		ResponseStatiPlico response = (ResponseStatiPlico) RESTfulClient.sendPost(
				 devRestConstants.ROOT_BANCARIZZAZIONE_SERVICE +"/" + devRestConstants.PLICHI + "/getTableStatiPlico" , request,ResponseStatiPlico.class);
		 	
		List<StatiPlicoObj> listPlicoObj = response.getData();
		log.debug("listScatolaObj size: "+listPlicoObj.size());
		
		if(listPlicoObj != null && !listPlicoObj.isEmpty()){			
			return JSONBuilderDataTable.buildTable( listPlicoObj.get(0).getTotalRows() , listPlicoObj);
		}		
		return "{ \"total\": 0, \"rows\": [] }";
	}
	
}
