package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.AccountingService;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.model.RequestAccountingGMIDA;
import it.citel.postel.commonLib.rest.model.AccountingReqDataTableObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAccountingJob;
import it.citel.postel.commonLib.rest.model.RequestDataTableAccounting;
import it.citel.postel.commonLib.rest.model.RequestRicercaCliente;
import it.citel.postel.commonLib.rest.model.RequestAccountingGMIDA;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAccountingJob;
import it.citel.postel.commonLib.rest.model.ResponseAttachment;
import it.citel.postel.commonLib.rest.model.ResponseAccounting;

@Controller
@RequestMapping("/accounting")
public class AccountingController {
	static final Logger log = LogManager.getLogger(AccountingController.class);
	
	@Autowired
	private AccountingService accountingService ;
	
	@RequestMapping( value = "showAccounting", method = {RequestMethod.GET} )
	public String showAccounting() {
		log.debug("showAccounting");
		return "ricercaAccounting";
	}
	
	@RequestMapping( value="getListLotti" , method=RequestMethod.GET )
	public @ResponseBody Response<?> getListLotti() {
		Response<List<Combo>> results = new Response<>() ;
		
		log.info( "getListLotti - start" ) ;
		
		try {
			results.setData( accountingService.getListLotti() ) ;
			results.setMessage( "OK" ) ;
			results.setStatus( true ) ;
		}
		catch( Exception e ) {
			log.error( "Exception: " + e.getMessage() , e ) ;
			results.setData( null ) ;
			results.setMessage( e.getMessage() ) ;
			results.setStatus( false ) ;
		}
		
		log.info( "getListLotti - stop" ) ;
		
		return results ;
	}
	
	@RequestMapping( value="getTableRicercaAccounting" , method= RequestMethod.GET )
	public @ResponseBody String getTableRicercaAccounting( 
			@RequestParam(value = "sort", defaultValue = "1") String sort,//codice_scatola
			@RequestParam(value = "order", defaultValue = "1") String order,//desc
			@RequestParam(value = "offset", defaultValue = "1") String offset,
			@RequestParam(value = "limit", defaultValue = "1") String limit,
			@RequestParam(value = "dataDa", defaultValue = "") String dataDa,
			@RequestParam(value = "dataA", defaultValue = "") String dataA,
			@RequestParam(value = "cig", defaultValue = "") String cig,
			@RequestParam(value = "centroDemat", defaultValue = "") String centroDemat ) {
		
		log.info( "getTableRicercaAccounting - start" ) ;
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		
		int pageNumber	= Integer.parseInt( offset ) / Integer.parseInt( limit ) ;
		int startRow	= ( pageNumber * Integer.parseInt( limit ) ) ;
		int endRow		= ( ( pageNumber * Integer.parseInt( limit ) ) + Integer.parseInt( limit ) ) ;
		
		try {
			RequestDataTableAccounting request = new RequestDataTableAccounting() ;
			request.setPageNumber(pageNumber);
			request.setStartRow(startRow);
			request.setEndRow(endRow);
			request.setDataDa(dataDa);
			request.setDataA(dataA);
			request.setCig(cig);
			request.setCentroDemat(centroDemat);
			
			strReturn = accountingService.getTableRicercaAccounting( request ) ;
		}
		catch( Exception e ) {
			log.error( "Exception: " + e.getMessage() , e ) ;
			return Constants.NO_ROW_FOUND_TABLE;
		}
		
		log.info( "getTableRicercaAccounting - stop" ) ;
		
		return strReturn ;
	}
	
	@RequestMapping( value="getListAccountingRequest" , method=RequestMethod.GET )
	public @ResponseBody String getListAccountingRequest() {
		
		log.info( "getListAccountingRequest - start" ) ;

		String strReturn = Constants.NO_ROW_FOUND_TABLE;

		try {
			strReturn = accountingService.getListAccountingRequest();
		} catch( Exception e ) {
			log.error( "Exception: " + e.getMessage() , e ) ;
		}
				
		log.info( "getListAccountingRequest - stop" ) ;

		return strReturn ;
	}
	
	@RequestMapping( value="getLastAccountingRequest" , method=RequestMethod.GET )
	public @ResponseBody Response<?> getLastAccountingRequest() {
		Response<AccountingReqDataTableObj> results = new Response<>() ;
		
		log.info( "getLastAccountingRequest - start" ) ;

		try {
			results.setData( accountingService.getLastAccountingRequest() ) ;
			results.setMessage( "OK" ) ;
			results.setStatus( true ) ;
		}
		catch( Exception e ) {
			log.error( "Exception: " + e.getMessage() , e ) ;
			results.setData( null ) ;
			results.setMessage( e.getMessage() ) ;
			results.setStatus( false ) ;
		}
		
		log.info( "getLastAccountingRequest - stop" ) ;

		return results ;
	}
	
	//getModuloDDT
	@RequestMapping( value="getExportFile" , method = {RequestMethod.GET} )
	public @ResponseBody Response<byte[]> getExportFile( @RequestParam(value="eventId", defaultValue="") String eventId ) {
		log.info("getExportFile.. start ");
		Response<byte[]> response = new Response<>() ;
		
		try {
			ResponseAttachment result = accountingService.getExportFile( eventId ) ;
			
			if( result == null || result.getFileName() == null || result.getFileName().isEmpty()) {
				response.setData( null ) ;
				response.setStatus( false );
				response.setMessage( "Impossibile recuperare il file" );
			} else {
				byte[] contents = result.getFile().getBytes() ;
				response.setData( contents ) ;
				response.setStatus( true );
				response.setMessage( result.getFileName() );
			}			
			
		}
		catch( Exception e ) {
			log.error( "Error: " + e ) ;
			response.setData( null ) ;
			response.setStatus( false );
			response.setMessage( e.getMessage() );
		}
		
		log.info("getExportFile.. stop ");
		return response ;
	}

	@RequestMapping( value="executeAccountingJob" , method = RequestMethod.GET )
	public @ResponseBody ResponseAccountingJob executeAccountingJob( 
			@RequestParam(value = "inizioPeriodo", defaultValue = "") String inizioPeriodo,
			@RequestParam(value = "finePeriodo", defaultValue = "") String finePeriodo,
			@RequestParam(value = "percentCartolineNonMecc", defaultValue = "") String percentCartolineNonMecc,
			@RequestParam(value = "percentBusteNonMecc", defaultValue = "") String percentBusteNonMecc,
			@RequestParam(value = "percentNcNonMecc", defaultValue = "") String percentNcNonMecc,
			@RequestParam(value = "numAnomalieAde", defaultValue = "") String numAnomalieAde,
			@RequestParam(value = "numAnomalieAder", defaultValue = "") String numAnomalieAder,
			@RequestParam(value = "indPercentBusteNonMecc", defaultValue = "") String indPercentBusteNonMecc,
			@RequestParam(value = "indNumAnomalieAde", defaultValue = "") String indNumAnomalieAde,
			@RequestParam(value = "indNumAnomalieAder", defaultValue = "") String indNumAnomalieAder,
			@RequestParam(value = "codiceLottoTerritorialeBit", defaultValue = "") String codiceLottoTerritorialeBit,
			@RequestParam(value = "separatoreCampo", defaultValue = "") String separatoreCampo,
			@RequestParam(value = "insIntestazioneColonne", defaultValue = "") String insIntestazioneColonne,
			@RequestParam(value = "operatoreId", defaultValue = "") String operatoreId, 
			@RequestParam(value = "postazioneId", defaultValue = "") String postazioneId, 
			@RequestParam(value = "centroDematId", defaultValue = "") String centroDematId ) {
		
		log.info( "executeAccountingJob - start" ) ;
		
		ResponseAccountingJob response = new ResponseAccountingJob();;
		
		try {
			RequestAccountingJob request = new RequestAccountingJob() ;
			request.setInizioPeriodo(inizioPeriodo);
			request.setFinePeriodo(finePeriodo);
			request.setPercentCartolineNonMecc(Integer.parseInt(percentCartolineNonMecc));
			request.setPercentBusteNonMecc(Integer.parseInt(percentBusteNonMecc));
			request.setPercentNcNonMecc(Integer.parseInt(percentNcNonMecc));
			request.setNumAnomalieAde(Long.parseLong(numAnomalieAde));
			request.setNumAnomalieAder(Long.parseLong(numAnomalieAder));
			request.setIndPercentBusteNonMecc(Integer.parseInt(indPercentBusteNonMecc));
			request.setIndNumAnomalieAde(Long.parseLong(indNumAnomalieAde));
			request.setIndNumAnomalieAder(Long.parseLong(indNumAnomalieAder));
			request.setCodiceLottoTerritorialeBit(Integer.parseInt(codiceLottoTerritorialeBit));
			request.setSeparatoreCampo(separatoreCampo);
			request.setInsIntestazioneColonne(Integer.parseInt(insIntestazioneColonne));
			request.setOperatoreId(Integer.parseInt(operatoreId));
			request.setPostazioneId(Integer.parseInt(postazioneId));
			request.setCentroDematId(Integer.parseInt(centroDematId));
			response = accountingService.executeAccountingJob( request ) ;
		}
		catch( Exception e ) {
			log.error( "Exception: " + e.getMessage() , e ) ;
			response.setAccRequestId(0);
			response.setStatus( false );
			response.setMessage( e.getMessage() );
		}
		
		log.info( "executeAccountingJob - stop" ) ;
		
		return response ;
	}
	
//	@RequestMapping( value = "AccountingInsert", method = RequestMethod.POST )
//	@ResponseBody
//	public Response<ResponseAccounting> AccountingInsert(@RequestBody RequestAccountingGMIDA request){
//		
//		log.info("insert start");
//		
//		Response<ResponseAccounting> response = new Response<>();
//		try {
//			accountingService.AccountingInsert(request);		
//			response.setStatus(true);
//			response.setMessage("insert riuscita");
//			
//		} catch (Exception ex) {
//			response.setStatus(false);
//	        response.setMessage("Errore durante l'inserimento: " + ex.getMessage());
//	        log.error("Errore: " + ex.getMessage(), ex);
//		}
//		log.info("insert finish");
//		return response; 
//	}
//	
	@RequestMapping(value = "/AccountingInsert", method =  RequestMethod.POST)
	@ResponseBody
	public Response<?>  AccountingInsert(@RequestBody Request<RequestAccountingGMIDA>  request) {
		log.debug("configurazione: Accounting Insert");
		Response<?>  response = null;
		
		try {
			response = accountingService.AccountingInsert(request); 
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
	
	
	
	
	
	@RequestMapping( value="/getListDateGmida" , method=RequestMethod.GET )
	public @ResponseBody ResponseAccounting getListDateGmida() {
		ResponseAccounting results = new ResponseAccounting() ;
		
		log.info( "getListDateGmida - start" ) ;
		
		try {
			results.setDate(accountingService.getListDateGmida());
			results.setMessage( "OK" ) ;
			results.setStatus( true ) ;
		}
		catch( Exception e ) {
			log.error( "Exception: " + e.getMessage() , e ) ;
			results.setDate( null ) ;
			results.setMessage( e.getMessage() ) ;
			results.setStatus( false ) ;
		}
		
		log.info( "getListDateGmida - stop" ) ;
		
		return results ;
	}

}
