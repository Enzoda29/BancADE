package it.citel.postel.bancarizzazioneGUI.controller;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.DispacciService;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestDispacciRicerca;
import it.citel.postel.commonLib.rest.model.RequestDispaccio;
import it.citel.postel.commonLib.rest.model.RequestPreadv;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;
import it.citel.postel.commonLib.rest.model.ResponsePaginationAndValueObj;

/**
 * @author Tania / GF
 */

@Controller
@RequestMapping("/dispacci")
public class DispacciController {
	static final Logger log = LogManager.getLogger(DispacciController.class);
	
	@Autowired
	DispacciService accettazioneService;

	@RequestMapping(value = "/preaccettazione", method = { RequestMethod.GET, RequestMethod.POST })
	public String showAccettazione() {
		log.info("preaccettazione show page");
		return "preaccettazione";
	}
	
	@RequestMapping(value = "/dispacciDaPreaccettare", method = {RequestMethod.GET, RequestMethod.POST})
	public String dispacciDaPreaccettare(){
		log.debug(" show dispacciDaPreaccettare.jsp");
		return "dispacciDaPreaccettare";
	}
	
	@RequestMapping(value = "/dispacciSospesiInAttesaDiTRK", method = {RequestMethod.GET, RequestMethod.POST})
	public String dispacciSospesiInAttesaDiTRK(){
		log.debug(" show dispacciSospesiInAttesaDiTRK.jsp");
		return "dispacciSospesiInAttesaDiTRK";
	}
	
	@RequestMapping(value = "/dispacciSospesiProntiDaElaborare", method = {RequestMethod.GET, RequestMethod.POST})
	public String dispacciSospesiProntiDaElaborare(){
		log.debug(" show dispacciSospesiProntiDaElaborare.jsp");
		return "dispacciSospesiProntiDaElaborare";
	}
	
	@RequestMapping(value = "/preaccettazione_dispaccio", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> accettazioneMaterialita(@RequestBody Request<RequestDispaccio> request) {
		log.info("preaccettazione Dispaccio.. start ");
		Response<?> response = null;
		try {
		    response = accettazioneService.preAccettazioneDispaccio(request);
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
	
	
	
	public void setAccettazioneService(DispacciService accettazioneService) {
		this.accettazioneService = accettazioneService;
	}

	
	
	
	
	@RequestMapping(value = "/checkCodiceDispaccio", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> checkCodiceDispaccio(@RequestBody Request<RequestDispaccio> request) {
		log.info("checkCodiceDispaccio.. start ");
		Response<?> response = null;

		try {
			response = accettazioneService.checkCodiceDispaccio(request);
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
		log.info("checkCodiceDispaccio.. end");
		return response;
	}
	@RequestMapping(value = "/sospensioneDispaccio", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> sospensioneDispaccio(@RequestBody Request<RequestDispaccio> request) {
		log.info("sospensioneDispaccio.. start ");
		Response<?> response = null;

		try {
			response = accettazioneService.insertDispaccioSospeso(request);
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
		log.info("sospensioneDispaccio.. end");
		return response;
	}
	
	
	/** TODO: da completare paginazione
	 * @author GF
	 * Ritorna una lista di dispacci filtrata
	 * @param request
	 * @return Ritorna una lista di dispacci filtrata
	 */
	@RequestMapping(value = "/getLstDispacci", method = { RequestMethod.POST })
	@ResponseBody
	public ResponseDynamicTable  getLstDispacci(@RequestBody Request<RequestDispacciRicerca>  request) {
		log.debug("getLstDispacci: cerca");
		ResponseDynamicTable  response = new ResponseDynamicTable();
		try {
			response = accettazioneService.selectDispacciByFilter(request); 
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
	
	/**
	 * @author GF
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getLstDispSospInAttDiTRK", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?>  getLstDispSospInAttDiTRK(@RequestBody Request<RequestDispacciRicerca>  request) {
		log.debug("Inizio getLstDispSospInAttDiTRK..");
		Response<ResponsePaginationAndValueObj>  response = new Response<ResponsePaginationAndValueObj>();
		try {
			response = accettazioneService.getLstDispSospInAttDiTRK(request); 
//			response.setStatus(true);
//			response.setData(null);
//			response.setMessage("KO - "+e.getMessage());
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
		log.debug("Fine getLstDispSospInAttDiTRK.");
		return response;
	}
	
	/**
	 * @author GF
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getLstDispacciSospProntiDaElabo", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?>  getLstDispacciSospProntiDaElabo(@RequestBody Request<RequestDispacciRicerca>  request) {
		log.debug("Inizio getLstDispSospInAttDiTRK..");
		Response<ResponsePaginationAndValueObj>  response = new Response<ResponsePaginationAndValueObj>();
		try {
			response = accettazioneService.getDispacciSospProntiDaElab(request); 
//			response.setStatus(true);
//			response.setData(null);
//			response.setMessage("KO - "+e.getMessage());
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
		log.debug("Fine getLstDispSospInAttDiTRK.");
		return response;
	}
	
	
	
	/**
	 * @author GF
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/eliminaDispaccioSospeso", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?>  eliminaDispaccioSospeso(@RequestBody Request<RequestDispaccio>  request) {
		log.debug("Inizio eliminaDispaccioSospeso..");
		Response<?>  response = new Response<ResponsePaginationAndValueObj>();
		try {
			response = accettazioneService.eliminaDispaccioSospeso(request); 
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
		log.debug("Fine eliminaDispaccioSospeso.");
		return response;
	}
	
	
	
	
	
	
	/**
	 * @author GF
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/test", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?>  test() {
		log.debug("Inizio test..");
		Response<String>  response = new Response<String>();
		
		return response;
	}
}
