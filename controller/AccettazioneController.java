package it.citel.postel.bancarizzazioneGUI.controller;
import java.io.IOException;
import java.net.MalformedURLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.AccettazioneService;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestPreadv;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.utils.SanitizerCustom;

@Controller
@RequestMapping("/accettazione")
public class AccettazioneController {
	static final Logger log = LogManager.getLogger(AccettazioneController.class);
	@Autowired
	AccettazioneService accettazioneService;

	@RequestMapping(value = "", method = { RequestMethod.GET, RequestMethod.POST })
	public String showAccettazione() {
		log.info("accettazione show page");
		return "accettazione";

	}

	@RequestMapping(value = "/accettazione_materialita", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> accettazioneMaterialita(@RequestBody Request<RequestPreadv> requestPreadv) {
		log.info("accettazioneMaterialita.. start ");
		Response<?> response = null;
		try {
//		    for (Field f : requestPreadv.getData().getClass().getDeclaredFields()) {
//		    	log.info("field type = " + f.getType().toString() + "field =  " + f.getName() );
//		    	if(f.getType()
//		    			.toString()
//		    			.equals("class java.lang.String")) {
//		    		f.setAccessible(true);
//		    		Object value = f.get(requestPreadv.getData());
//		    		log.info("value =  " + value);
//		    		log.info(HtmlUtils.htmlEscape((String) value));
//		    		f.set(requestPreadv.getData(), HtmlUtils.htmlEscape((String) value));
//		    		value = f.get(requestPreadv.getData());
//		    		log.info(" new value =  " + value);
//		    	}    
//		}
		    Request sanatizedRequest = SanitizerCustom.SanitizeRequest(requestPreadv);
		    response = accettazioneService.accettazioneMaterialita(sanatizedRequest);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		log.info("accettazioneMaterialita.. end");
		return response;
	}
	
	@RequestMapping(value = "/checkRangeRaccomandata", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> checkRangeRaccomandata(@RequestBody Request<RequestPreadv> requestPreadv) {
		log.info("checkRangeRaccomandata.. start ");
		Response<?> response = null;

		try {
			response = accettazioneService.checkRangeRaccomandata(requestPreadv);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		log.info("checkRangeRaccomandata.. end");
		return response;
	}
	
	@RequestMapping(value = "/checkNOPreadvising", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> checkNOPreadvising(@RequestBody Request<RequestPreadv> requestPreadv) {
		log.info("checkNOPreadvising.. start ");
		Response<?> response = null;

		try {
			response = accettazioneService.checkNOPreadvising(requestPreadv);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		log.info("checkNOPreadvising.. end");
		return response;
	}

	@RequestMapping(value = "/noPreAdvising", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> noPreAdvising(@RequestBody Request<RequestPreadv> requestPreadv) {
		log.info("accettazioneMaterialità.. start ");
		log.info("codice raccomandata: " + requestPreadv.getData().getCodiceRaccomandata());
		log.info("id_postazione: " + requestPreadv.getData().getIdPostazione());

		Response<?> response = null;
		try {
			response = accettazioneService.noPreadvsing(requestPreadv);
                        log.info("response " + response);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		return response;
	}

	@RequestMapping(value = "/checkCentroDemat_Operatore", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> checkCentroDemat_Operatore(@RequestBody Request<RequestPreadv> requestPreadv) {
		log.info("checkCentroDemat_Operatore.. start ");
		log.info("codice raccomandata: " + requestPreadv.getData().getCodiceRaccomandata());
		log.info("username: " + requestPreadv.getData().getUsername());
		log.info("codice id preadvising: " + requestPreadv.getData().getCodiceIdPreadv());

		Response<?> response = null;
		try {
			response = accettazioneService.checkCentroDemat_Operatore(requestPreadv);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		return response;
	}
	
	@RequestMapping(value = "/checkPraticaAlreadyExist", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> checkPraticaAlreadyExist(@RequestBody Request<RequestPreadv> requestPreadv) {
		log.info("checkPraticaAlreadyExist.. start ");
		log.info("codice raccomandata: " + requestPreadv.getData().getCodiceRaccomandata());
		log.info("username: " + requestPreadv.getData().getUsername());

		Response<?> response = null;
		try {
			response = accettazioneService.checkPraticaAlreadyExist(requestPreadv);
                        log.info("response: " + response);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		return response;
	}
	
	
	
	@RequestMapping(value = "/insertPratica", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> insertPratica(@RequestBody Request<RequestPreadv> requestPreadv) {
		log.info("insertPratica.. start ");
		log.info("requestPreadv: " + requestPreadv.toString());

		Response<?> response = null;
		try {
			response = accettazioneService.insertPratica(requestPreadv);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		return response;
	}
	
	
	@RequestMapping(value = "/insertCasellario", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> insertCasellario(@RequestBody Request<RequestPreadv> requestPreadv) {
		log.info("insertCasellario.. start ");
		log.info("requestPreadv: " + requestPreadv.toString());

		Response<?> response = null;
		try {
			response = accettazioneService.insertCasellario(requestPreadv);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - " + e.getMessage());
		}
		return response;
	}
	
	
	public void setAccettazioneService(AccettazioneService accettazioneService) {
		this.accettazioneService = accettazioneService;
	}

	/**
	 * @author Tania
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getLstCasellari", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<?>  getLstCasellari(@RequestBody Request<RequestPreadv>  request) {
		log.debug("normalizzazione: cerca");
		Response<?>  response = null;
		try {
			response = accettazioneService.selectCasellari(request); 
		} catch (MalformedURLException e) {
			log.error(e.getMessage(),e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - "+e.getMessage());		
		} catch (IOException e) {
			log.error(e.getMessage(),e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - "+e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			response.setStatus(false);
			response.setData(null);
			response.setMessage("KO - "+e.getMessage());
		}
		return response;
	}

}
