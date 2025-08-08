package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.GestioneAnomalieService;
import it.citel.postel.bancarizzazioneGUI.service.RicercheService;
import it.citel.postel.bancarizzazioneGUI.util.CreatePdf;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.objects.gestione.DocumentiAnomaliObj;
import it.citel.postel.commonLib.objects.gestione.EsitiLavContentObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestConfRecDocAn;
import it.citel.postel.commonLib.rest.model.RequestDocumentiAnomali;
import it.citel.postel.commonLib.rest.model.RequestEsitLavContent;
import it.citel.postel.commonLib.rest.model.RequestPlichi;
import it.citel.postel.commonLib.rest.model.RequestRecDocAn;
import it.citel.postel.commonLib.rest.model.RequestRecuperoDocumenti;
import it.citel.postel.commonLib.rest.model.RequestRicercaScatolaDettaglio;
import it.citel.postel.commonLib.rest.model.RequestStampaDistinta;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;

@Controller
@RequestMapping("/gestione")

public class GestioneAnomalieController {
	static final Logger log = LogManager.getLogger(GestioneAnomalieController.class);
	@Autowired
	GestioneAnomalieService gestioneAnomalieService;
	@Autowired
	RicercheService ricercaService;
	
	
	@RequestMapping(value = "", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicerche(){
		log.debug("showGestioneAnomalie");
		return "gestioneAnomalie";
	}


	@RequestMapping(value = "/recuperoDocumentiAnomali", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRecuperoDocumentiAnomali(){
		log.debug("showRecuperoDocumentiAnomali");
		return "recuperoDocumentiAnomali";
	}
	@RequestMapping(value = "/confermaRecuperoDocumentiAnomali", method = {RequestMethod.GET, RequestMethod.POST})
	public String showConfermaRecuperoDocumentiAnomali(){
		log.debug("showConfermaRecuperoDocumentiAnomali");
		return "confermaRecuperoDocumentiAnomali";
	}
	@RequestMapping(value = "/listaDistintaPerIlRecupero", method = {RequestMethod.GET, RequestMethod.POST})
	public String showStampaDistintaPerIlRecupero(){
		log.debug("showConfermaRecuperoDocumentiAnomali");
		return "listaDistintaPerIlRecupero";
	}
	@RequestMapping( value="/scartiCaptiva" , method =  {RequestMethod.GET, RequestMethod.POST} )
	public String scartiCaptiva() {
		log.debug( "show scartiCaptiva" );
		return "scartiCaptiva" ;
	}

	@RequestMapping(value = "/getStampaDistintaPerIlRecupero", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  getStampaDistintaPerIlRecupero(@RequestBody Request<RequestStampaDistinta> request){
		log.debug("gestione Documenti Anomali: lista DocumentiAnomali");
		Response<?>  response = null;
		try {
			response = gestioneAnomalieService.getStampaDistintaPerIlRecupero(request); 
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
	
	
	@GetMapping("/listaDistintaPerIlRecuperoPdf")
	 public ResponseEntity<Resource> stampa(String codicePicking) throws Exception {
		System.out.println("sono nel controller");
		System.out.println("sono il codice "+codicePicking);

			CreaPdfListaDistinta  pdf = new   CreaPdfListaDistinta();
	        ByteArrayInputStream stampaPdf = pdf.creaPdf(gestioneAnomalieService, codicePicking);
	        log.info("prima dell http ");
	        HttpHeaders headers = new HttpHeaders();
	        log.info("dopo dell http ");
	     
	        String headerContentDisposition = "attachment; filename=codicePicking" + codicePicking + ".pdf";
	        
	  
	        headers.add(HttpHeaders.CONTENT_DISPOSITION, headerContentDisposition);
	        headers.setContentType(MediaType.parseMediaType("application/octet-stream"));

	        InputStreamResource resource = new InputStreamResource(stampaPdf);

	        return new ResponseEntity<>(resource, headers, HttpStatus.OK);

	    }
	

	@RequestMapping(value = "/getListaDistintaPerIlRecupero", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  getListaDistintaPerIlRecupero(){
		log.debug("gestione Documenti Anomali: lista DocumentiAnomali");
//		System.out.println("configurazione: lista anagrafica PA - requestJson {}" );
		Response<?>  response = null;
		try {
			response = gestioneAnomalieService.getListaDistintaPerIlRecupero(); 
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

//	recuperaDocumentiScatole
//    Response<?> recuperaDocumentiScatole(@RequestBody Request<List<RequestRecDocAn>> request) {
		@RequestMapping(value = "/recuperaDocumentiScatole", method = {RequestMethod.GET, RequestMethod.POST})
		@ResponseBody
		public Response<?>  recuperaDocumentiScatole(@RequestBody Request<RequestRecuperoDocumenti> request){
			log.debug("gestione Documenti Anomali: recuperaDocumentiScatole");
//			System.out.println("gestione: recuperaDocumentiScatole - requestJson {}" );
			Response<?>  response = null;
			try {
				response=gestioneAnomalieService.recuperaDocumentiScatole(request);
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

		@RequestMapping(value = "/confermazioneRecuperoDocumentiAnomali", method = {RequestMethod.POST})
		@ResponseBody
		public Response<?>  confermaRecuperoDocumentiAnomali(@RequestBody Request<RequestEsitLavContent> request){
			log.debug("gestione Documenti Anomali: recuperaDocumentiScatole");
//			System.out.println("gestione: recuperaDocumentiScatole - requestJson {}" );
			Response<?>  response = null;
			try {
				response=gestioneAnomalieService.confermaRecuperoDocumentiAnomali(request);
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

	@RequestMapping(value = "/getDocumentiAnomali", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  getDocumentiAnomali(@RequestBody Request<RequestDocumentiAnomali> request){
		log.debug("gestione Documenti Anomali: lista DocumentiAnomali");
//		System.out.println("configurazione: lista anagrafica PA - requestJson {}" );
		Response<?>  response = null;
		try {
			response = gestioneAnomalieService.getDocumentiAnomali(request); 
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
	
	@RequestMapping(value = "/getConfermaDocumentiAnomali", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  getConfermaDocumentiAnomali(@RequestBody Request<RequestDocumentiAnomali> request){
		log.debug("gestione Documenti Anomali: aggiorna Dati conferma DocumentiAnomali");
//		System.out.println("configurazione: lista anagrafica PA - requestJson {}" );
		Response<?>  response = null;
		try {
			response = gestioneAnomalieService.getConfermaDocumentiAnomali(request); 
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
	
	@RequestMapping(value = "/chiudiECreaNuovaScatolaAnomalieSanabili", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  chiudiECreaNuovaScatolaAnomalieSanabili(@RequestBody Request<RequestConfRecDocAn> request){
		log.debug("gestione Documenti Anomali: aggiorna Dati conferma DocumentiAnomali");
//		System.out.println("configurazione: lista anagrafica PA - requestJson {}" );
		Response<?>  response = null;
		try {
			response = gestioneAnomalieService.chiudiECreaNuovaScatolaAnomalieSanabili(request); 
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
	
	@RequestMapping(value = "/chiudiECreaNuovaScatolaAnomalieNonSanabili", method = {RequestMethod.POST})
	@ResponseBody
	public Response<?>  chiudiECreaNuovaScatolaAnomalieNonSanabili(@RequestBody Request<RequestConfRecDocAn> request){
		log.debug("gestione Documenti Anomali: aggiorna Dati conferma DocumentiAnomali");
//		System.out.println("configurazione: lista anagrafica PA - requestJson {}" );
		Response<?>  response = null;
		try {
			response = gestioneAnomalieService.chiudiECreaNuovaScatolaAnomalieNonSanabili(request); 
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
	
	@RequestMapping( value ="getTableScarti.json" , method = RequestMethod.GET  )
	public @ResponseBody String getTableScarti( @RequestParam("sort") String sort,
            @RequestParam("order") String order,
            @RequestParam("offset") String offset,
            @RequestParam("limit") String limit ) {
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit)) ;
		
		RequestPlichi request = new RequestPlichi() ;
				request.setStart( 	startRow	) ;
				request.setEnd( 	endRow		) ;
				request.setSort(	sort		) ;
				request.setOrder(	order		) ;
		
		log.info( request.toString() ) ;
				
		try {
			strReturn = gestioneAnomalieService.getTableScarti( request ) ;
		}
		catch( Exception e ) {
			log.error( e ) ;
		}
		
		return strReturn ;
	}

//	@RequestMapping(value = "/confermaRecuperoDocumentiAnomali", method = {RequestMethod.GET, RequestMethod.POST})
//	@ResponseBody
//	public Response<?>  updateAllDeliveryPA(@RequestBody Request<RequestDeliveryPa>  request) {
//		log.debug("gestione Documenti Anomali: confermaRecuperoDocumentiAnomali");
//		System.out.println("configurazione: update all delivery PA - requestJson {}" + request.toString());
//		Response<?>  response = null;
//		try {
//			response = configurazioneService.updateAllDeliveryPa(request); 
//		} catch (MalformedURLException e) {
//			log.error(e.getMessage(),e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - "+e.getMessage());		
//		} catch (IOException e) {
//			log.error(e.getMessage(),e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - "+e.getMessage());
//		} catch (Exception e) {
//			log.error(e.getMessage(),e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - "+e.getMessage());
//		}
//		return response;
//	}
//	

	
//	@RequestMapping(value = "/configurazioneDeliveryPA/updateAllDeliveryPA", method = {RequestMethod.GET, RequestMethod.POST})
//	@ResponseBody
//	public Response<?>  updateAllDeliveryPA(@RequestBody Request<RequestDeliveryPa>  request) {
//		log.debug("configurazione: update all delivery PA");
//		System.out.println("configurazione: update all delivery PA - requestJson {}" + request.toString());
//		Response<?>  response = null;
//		try {
//			response = configurazioneService.updateAllDeliveryPa(request); 
//		} catch (MalformedURLException e) {
//			log.error(e.getMessage(),e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - "+e.getMessage());		
//		} catch (IOException e) {
//			log.error(e.getMessage(),e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - "+e.getMessage());
//		} catch (Exception e) {
//			log.error(e.getMessage(),e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - "+e.getMessage());
//		}
//		return response;
//	}
//	
}
