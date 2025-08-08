package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.RicercheService;
import it.citel.postel.bancarizzazioneGUI.util.CreatePdf;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.objects.pallette.PalletDistintaObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAddScatolaToPallet;
import it.citel.postel.commonLib.rest.model.RequestRicercaPallet;
import it.citel.postel.commonLib.rest.model.RequestRicercaScatolaDettaglio;
import it.citel.postel.commonLib.rest.model.RequestRimuoviScatolaPallet;
import it.citel.postel.commonLib.rest.model.RequestScatolaSearchCustom;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseCreazionePallet;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;


@Controller
@RequestMapping("/ricerche")

public class RicercheController {
	static final Logger log = LogManager.getLogger(RicercheController.class);
	@Autowired
	RicercheService ricercaService;

	@RequestMapping(value = "", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicerche() {
		log.debug("showRicerche");
		return "ricerche";
	}

	@RequestMapping(value = "/scatole", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicercheScatole() {
		log.debug("showRicercheScatole");
		return "ricercheScatole";
	}

	@RequestMapping(value = "/pallet", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicerchePallet() {
		log.debug("showRicerchePallet");
		return "ricerchePallet";
	}

	@RequestMapping(value = "/predvising", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicerchePreadvising() {
		log.debug("showRicerchePreadvising");
		return "ricerchePreadvising";
	}

	@RequestMapping(value = "/noPredvising", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicercheNoPreadvising() {
		log.debug("showRicercheNoPreadvising");
		return "ricercheNoPreadvising";
	}


	/**
	 * @param sort
	 * @param order
	 * @param offset
	 * @param limit
	 * @param id_tipo_MaterialitaConforme
	 * @param id_tipo_MaterialitaNonConforme
	 * @param id_tipo_AnomalieNonSanabili
	 * @param id_tipo_AnomalieSanabili
	 * @param id_tipo_AnomaliaNonConforme
	 * @param id_tipo_PostaIndescritta
	// * @param id_stato_Scansionata
	// * @param id_stato_InAttesaDiDE
	// * @param id_stato_DECompletato
	// * @param id_stato_CompletaDaRestituire
	// * @param id_stato_AssociataAdUnSpedizione
	// * @param id_stato_Restituita
	 * @param identificativoCliente
	 * @param identificativoCentroDemat
	 * @param codiceScatola
	 * @param letteraDiVettura
	 * @return
	 * @author G
	 */
	@RequestMapping(value = "/scatola/dataTableRicercaScatole.json", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public String dataTableRicercaScatole(
			@RequestParam("sort") String sort,//codice_scatola
			@RequestParam("order") String order,//desc
			@RequestParam("offset") String offset,
			@RequestParam("limit") String limit,
			@RequestParam(value = "id_tipo_MaterialitaConforme", defaultValue = "") String id_tipo_MaterialitaConforme,
			@RequestParam(value = "id_tipo_MaterialitaNonConforme", defaultValue = "") String id_tipo_MaterialitaNonConforme,
			@RequestParam(value = "id_tipo_AnomalieNonSanabili", defaultValue = "") String id_tipo_AnomalieNonSanabili,
			@RequestParam(value = "id_tipo_AnomalieSanabili", defaultValue = "") String id_tipo_AnomalieSanabili,
			@RequestParam(value = "id_tipo_AnomaliaNonConforme", defaultValue = "") String id_tipo_AnomaliaNonConforme,
			@RequestParam(value = "id_tipo_PostaIndescritta", defaultValue = "") String id_tipo_PostaIndescritta,
			@RequestParam(value = "list_id_stati_select", defaultValue = "") String list_id_stati_select,
			@RequestParam(value = "identificativoCliente", defaultValue = "") String identificativoCliente,
			@RequestParam(value = "centroDemat", defaultValue = "") String identificativoCentroDemat,
			@RequestParam(value = "codiceScatola", defaultValue = "") String codiceScatola,
			@RequestParam(value = "codiceDDT", defaultValue = "") String codiceDDT,
			@RequestParam(value = "codicePallet", defaultValue = "") String codicePallet,
			@RequestParam(value = "dataInizio", defaultValue = "") String dataInizio,
			@RequestParam(value = "dataFine", defaultValue = "") String dataFine) {
		log.debug("dataTableGestAnomalie start  ");

		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		try {

			RequestScatolaSearchCustom r = new RequestScatolaSearchCustom();

			if (!StringUtils.isEmpty(id_tipo_MaterialitaConforme))
				r.setId_tipo_MaterialitaConforme(new BigDecimal(id_tipo_MaterialitaConforme));
			if (!StringUtils.isEmpty(id_tipo_MaterialitaNonConforme))
				r.setId_tipo_MaterialitaNonConforme(new BigDecimal(id_tipo_MaterialitaNonConforme));
			if (!StringUtils.isEmpty(id_tipo_AnomalieNonSanabili))
				r.setId_tipo_AnomalieNonSanabili(new BigDecimal(id_tipo_AnomalieNonSanabili));
			if (!StringUtils.isEmpty(id_tipo_AnomalieSanabili))
				r.setId_tipo_AnomalieSanabili(new BigDecimal(id_tipo_AnomalieSanabili));
			if (!StringUtils.isEmpty(id_tipo_AnomaliaNonConforme))
				r.setId_tipo_AnomaliaNonConforme(new BigDecimal(id_tipo_AnomaliaNonConforme));
			if (!StringUtils.isEmpty(id_tipo_PostaIndescritta))
				r.setId_tipo_PostaIndescritta(new BigDecimal(id_tipo_PostaIndescritta));
			if (!StringUtils.isEmpty(identificativoCliente)) r.setIdentificativoCliente(identificativoCliente);
			if (!StringUtils.isEmpty(codiceScatola)) r.setCodiceScatola(codiceScatola);
			if (!StringUtils.isEmpty(codiceDDT)) r.setCodiceDDT(codiceDDT);
			if (!StringUtils.isEmpty(codicePallet)) r.setCodicePallet(codicePallet);
			if (!StringUtils.isEmpty(identificativoCentroDemat))
				r.setIdentificativoCentroDemat(new BigDecimal(identificativoCentroDemat));
			if (!StringUtils.isEmpty(dataInizio)) r.setDataInizio(dataInizio);
			if (!StringUtils.isEmpty(dataFine)) r.setDataFine(dataFine);

			List<BigDecimal> listIdStati = new ArrayList<BigDecimal>();
			if (!StringUtils.isEmpty(list_id_stati_select)) {
				String[] listIdStatiSelectStr = list_id_stati_select.split("-");
				for (String idStato : listIdStatiSelectStr) {
					if (idStato != null && idStato.length() > 0) {
						listIdStati.add(new BigDecimal(idStato));
					}
				}
				r.setListIdStati(listIdStati);
			}

			@SuppressWarnings("unchecked")
			Request<RequestScatolaSearchCustom> request = (Request<RequestScatolaSearchCustom>) ricercaService.buildRequestScatola(sort, order, offset, limit, r);
			log.debug("dataTableRicercaScatole request: sort=" + request.getData().getSort() + " order=" + request.getData().getOrder() + " start=" + request.getData().getStart() + " end=" + request.getData().getEnd());
			strReturn = ricercaService.dataTableRicercaScatole(request);
		} catch (Exception e) {
			log.error(e.getMessage(), e);

		}
		return strReturn.toString();
	}


	/**
	 * @param idScatola
	 * @return
	 * @author G
	 */
	@RequestMapping(value = "/scatola/dettaglioScatola", method = {RequestMethod.POST})
	@ResponseBody
	public ResponseDynamicTable dettaglioScatola(
			@RequestParam(value = "idScatola", required = true) BigDecimal idScatola,
			@RequestParam(value = "tipoScatolaTypeID", required = true) BigDecimal tipoScatolaTypeID) {
		log.info("dettaglioScatola.. start ");

		ResponseDynamicTable response = new ResponseDynamicTable();
		RequestRicercaScatolaDettaglio reqObjData = new RequestRicercaScatolaDettaglio();
		reqObjData.setScatolaID(idScatola);
		reqObjData.setTipoScatolaTypeID(tipoScatolaTypeID);
		Request<RequestRicercaScatolaDettaglio> request = new Request<>();
		try {
			request.setData(reqObjData);
			response = ricercaService.dettaglioScatola(request);
			response.setStatus(true);
			response.setMessage("OK");

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
		log.info("dettaglioScatola.. end");
		return response;
	}

	@RequestMapping(value = "/scatola/trackingScatola", method = {RequestMethod.POST})
	@ResponseBody
	public ResponseDynamicTable trackingScatola(
			@RequestParam(value = "idScatola", required = true) BigDecimal idScatola,
			@RequestParam(value = "tipoScatolaTypeID", required = true) BigDecimal tipoScatolaTypeID) {
		log.info("trackingScatola.. start ");

		ResponseDynamicTable response = new ResponseDynamicTable();
		RequestRicercaScatolaDettaglio reqObjData = new RequestRicercaScatolaDettaglio();
		reqObjData.setScatolaID(idScatola);
		reqObjData.setTipoScatolaTypeID(tipoScatolaTypeID);
		Request<RequestRicercaScatolaDettaglio> request = new Request<>();
		try {
			request.setData(reqObjData);
			response = ricercaService.trackingScatola(request);
			response.setStatus(true);
			response.setMessage("OK");

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
		log.info("trackingScatola.. end");
		return response;
	}

	/**
	 //* @param idScatola
	 * @return
	 * @throws Exception
	 * @throws IOException
	 * @throws MalformedURLException //@RequestMapping(value = "/scatola/stampa", method = { RequestMethod.GET})
	 *                               //@ResponseBody
	 *                               public String stampaPdf() {
	 *                               log.info("stampaScatola.. start ");
	 *                               <p>
	 *                               CreatePdf.main(null);
	 *                               <p>
	 *                               System.out.println("ok");
	 *                               return "OK";
	 *                               }
	 * @author HD
	 */

	@GetMapping("/scatola/stampa")
	public @ResponseBody Response<byte[]> stampa(BigDecimal scatolaID, BigDecimal tipoScatolaTypeID, long tipoLavorazione) throws Exception {
		ResponseDynamicTable response = new ResponseDynamicTable();
		Response<byte[]> fileResponse = new Response<byte[]>() ;
		RequestRicercaScatolaDettaglio reqObjData = new RequestRicercaScatolaDettaglio();
		reqObjData.setScatolaID(scatolaID);
		reqObjData.setTipoScatolaTypeID(tipoScatolaTypeID);
		reqObjData.setTipoLavorazione(tipoLavorazione);
		Request<RequestRicercaScatolaDettaglio> request = new Request<>();
		request.setData(reqObjData);
		response = ricercaService.dettaglioScatola(request);
		if (response.getData() == null) {
			fileResponse.setData( null ) ;
			fileResponse.setMessage( "Nessun dettaglo trovato" ) ;
			fileResponse.setStatus( false ) ;
			return null;
		}
		CreatePdf pdf = new CreatePdf();
		ByteArrayInputStream stampaPdf = pdf.creaPdfDettagliOScatole(response.getData(), tipoScatolaTypeID.toString(), tipoLavorazione);
//		log.info("prima dell http ");
//		HttpHeaders headers = new HttpHeaders();
//		log.info("dopo dell http ");
		List<Map<String, Object>> content = response.getData().getRowContent();
		String codGME = (String) content.get(0).get("CODICE_SCATOLA_GME");
//		String headerContentDisposition = "attachment; filename=ID_Scatola_" + codGME + ".pdf";
		


//		headers.add(HttpHeaders.CONTENT_DISPOSITION, headerContentDisposition);
//		headers.setContentType(MediaType.parseMediaType("application/octet-stream"));

		InputStreamResource resource = new InputStreamResource(stampaPdf);
		
		
		fileResponse.setData( IOUtils.toByteArray( resource.getInputStream() ) ) ;
		fileResponse.setMessage( codGME ) ;
		fileResponse.setStatus( true );
		
		return fileResponse ;

	}

	/**
	 * Ritorna una lista di filtri per stato scatola
	 *
	 * @return
	 */
	@RequestMapping(value = "/scatola/getListStatiFiltroRicercaScatola", method = {RequestMethod.GET})
	@ResponseBody
	public Response<?> getListStatiFiltroRicercaScatola() {
		log.info("Inizio getListStatiFiltroRicercaScatola");

		Response<List<Combo>> response = new Response<>();
		try {
			response = ricercaService.getListStatiFiltroRicercaScatola();
			log.debug("Indirizzi di rest. by cliente trovati: " + response.getData().size());
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false);
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false);
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false);
			return response;
		}
		log.debug("getListStatiFiltroRicercaScatola terminata");
		return response;
	}

	///scatola/sblocca
	@RequestMapping(value = "/scatola/sblocca", method = { RequestMethod.GET })
	@ResponseBody
	public Response<String> sbloccaScatola( @RequestParam( "scatolaID" ) String scatolaId ) {
		Response<String> response = new Response<>() ;
		
		try {
			response.setData( ricercaService.sbloccaScatola( scatolaId ) ) ;
			response.setMessage("OK");
			response.setStatus(true);
		}
		catch( Exception e ) {
			log.error(e.getMessage(), e);
			response.setData( e.toString() ) ;
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false);
			return response;
		}
		return response ;
	}


	@RequestMapping(value = "/pallet/getListStatiFiltroRicercaElencoStatoPallet", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListStatiFiltroRicercaElencoStatoPallet() {
		log.info("Inizio getListStatiFiltroRicercaPallette");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response =   ricercaService.getListStatiFiltroRicercaElencoStatoPallet();
			log.debug("Indirizzi di rest. by cliente trovati: RESPONSE: " + response);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO Pallet - " + e.getMessage());
			response.setStatus(false);
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO Pallet- " + e.getMessage());
			response.setStatus(false);
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false);
			return response;
		}
		log.debug("getListStatiFiltroRicercaElencoStatoPallet terminata");
		return response;
	}
	
	@RequestMapping(value = "/pallet/getListStatiFiltroRicercaElencoClientiPallet", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListStatiFiltroRicercaElencoClientiPallet() {
		log.info("Inizio getListStatiFiltroRicercaElencoClientiPallet");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response =   ricercaService.getListStatiFiltroRicercaElencoClientiPallet();
			log.debug("Indirizzi di rest. by cliente trovati: RESPONSE: " + response);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO Pallet - " + e.getMessage());
			response.setStatus(false);
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO Pallet- " + e.getMessage());
			response.setStatus(false);
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false);
			return response;
		}
		log.debug("getListStatiFiltroRicercaElencoClientiPallet terminata");
		return response;
	}
	
	@RequestMapping(value = "/pallet/getListStatiFiltroRicercaElencoTipiPallet", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListStatiFiltroRicercaElencoTipiPallet() {
		log.info("Inizio getListStatiFiltroRicercaElencoTipiPallet");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response =   ricercaService.getListStatiFiltroRicercaElencoTipiPallet();
			log.debug("Indirizzi di rest. by cliente trovati: RESPONSE: " + response);
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO Pallet - " + e.getMessage());
			response.setStatus(false);
			return response;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO Pallet- " + e.getMessage());
			response.setStatus(false);
			return response;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false);
			return response;
		}
		log.debug("getListStatiFiltroRicercaElencoTipiPallet terminata");
		return response;
	}
	
	@RequestMapping( value = "/pallet/dataTableRicercaPallet.json" , method = { RequestMethod.GET } )
	@ResponseBody
	public String dataTableRicercaPallet( 
			@RequestParam( value = "list_id_stati_select"		, defaultValue = "" )	String listaStatiRequest , 
			@RequestParam( value = "list_id_tipologia_select"	, defaultValue = "" )	String listaTipologiaRequest , 
			@RequestParam( value = "list_id_clienti_select"		, defaultValue = "" )	String listaClientiRequest , 
			@RequestParam( value = "codicePallet"				, defaultValue = "" )	String codicePallet ,
			@RequestParam( value = "codiceDDT"					, defaultValue = "" )	String codiceDDT ,
			@RequestParam( value = "centroDemat"				, defaultValue = "" )	String centroDemat ,
			@RequestParam( value = "sort" )												String sort ,
			@RequestParam( value = "order" )											String order ,
			@RequestParam( value = "offset" )											String offset ,
			@RequestParam( value = "limit" )											String limit ) {
		
		log.info( "Inizio getDataTablePallet" ) ;
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		
		int pageNumber	= Integer.parseInt( offset ) / Integer.parseInt( limit ) ;
		int startRow	= ( pageNumber * Integer.parseInt( limit ) ) ;
		int endRow		= ( ( pageNumber * Integer.parseInt( limit ) ) + Integer.parseInt( limit ) ) ;
		
		RequestRicercaPallet request = new RequestRicercaPallet() ;
		
		List<String> listStati		= listaStatiRequest		.equals( "" ) ? new ArrayList<>() : Arrays.asList( listaStatiRequest		.split( "-" )	) ;
		List<String> listTipologie	= listaTipologiaRequest	.equals( "" ) ? new ArrayList<>() : Arrays.asList( listaTipologiaRequest	.split( "-" )	) ;
		List<String> listClienti	= listaClientiRequest	.equals( "" ) ? new ArrayList<>() : Arrays.asList( listaClientiRequest		.split( "-" )	) ;
		
		request.setStati(			listStati		) ;
		request.setTipologie(		listTipologie	) ;
		request.setClienti(			listClienti		) ;
		request.setCodicePallet(	codicePallet	) ;
		request.setCodiceDDT(		codiceDDT		) ;
		request.setCentroDemat(		centroDemat		) ;
		request.setSort(			sort			) ;
		request.setStartRow(		startRow		) ;
		request.setEndRow(			endRow			) ;
		request.setOrder(			order			) ;
		
		
		try {
			log.debug("dataTableRicercaPallet request: sort=" + request.getSort() + " order=" + request.getOrder() + " start=" + request.getStartRow() + " end=" + request.getEndRow());
			strReturn = ricercaService.dataTableRicercaPallet( request ) ;
		}
		catch( Exception e ) {
			log.error( e.getMessage() , e ) ;
		}
		
		log.info( "Fine getDataTablePallet" ) ;
		return strReturn ;
	}
	
	
	@RequestMapping( value = "/pallet/dataTableDettagliPallet.json" , method = { RequestMethod.GET } )
	@ResponseBody
	public String dataTableDettagliPallet ( 
			@RequestParam( value = "codPacchetto" ) String codPacchetto , 
			@RequestParam(value  = "sort") String sort, 
			@RequestParam(value  = "order") String order,  //aggiunta per paginazione 20220420
			@RequestParam(value  = "offset") String offset, 
			@RequestParam(value  = "limit") String limit) { //aggiunta per paginazione 20220420
	
		log.info( "Inizio dataTableDettagliPallet" ) ;
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;

		//aggiunta per paginazione 20220420

		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit));
		
		RequestRicercaPallet request = new RequestRicercaPallet();
		
		request.setCodicePallet(codPacchetto) ;
		request.setSort(sort) ;
		request.setStartRow(startRow) ;
		request.setEndRow(endRow) ;
		request.setOrder(order) ;
		

		try {
			strReturn = ricercaService.dataTableDettagliPallet( request ) ;
		}
		catch( Exception e ) {
			log.error( e.getMessage() , e ) ;
		}
		
		//aggiunta per paginazione 20220420
				
		/*try {
			strReturn = ricercaService.dataTableDettagliPallet(codPacchetto) ;
		}
		catch( Exception e ) {
			log.error( e.getMessage() , e ) ;
		}*/
		
		log.info( "Fine dataTableDettagliPallet , strreturn = " + strReturn ) ;
		return strReturn ;
	}

	
	@RequestMapping( value = "/pallet/addScatolaToPallet" , method = { RequestMethod.GET } )
	@ResponseBody
	public Response<?> addScatolaToPallet ( @RequestParam( value = "codScatola" ) String codScatola ,  @RequestParam( value = "numPallet" ) String numPallet ) {
		log.info( "Inizio addScatolaToPallet" ) ;
		
		Response<String> response = new Response<>() ;
		RequestAddScatolaToPallet request = new RequestAddScatolaToPallet() ;
		request.setCodScatola(	codScatola	) ;
		request.setNumPallet(	numPallet	) ;
		
		try {
			response = ricercaService.addScatolaToPallet( request ) ;
		}
		catch( Exception e ) {
			log.error( e.getMessage() , e ) ;
			response.setData( "Eccezione inaspettata : " + e ) ;
			response.setStatus( false ) ;
			response.setMessage( "Eccezione inaspettata : " + e ) ;
		}
		
		log.info( "Fine addScatolaToPallet" ) ;
		return response ;
	}
	
	@RequestMapping( value = "/pallet/checkScatola" , method = { RequestMethod.GET } )
	@ResponseBody
	public Response<?> checkScatola ( @RequestParam( value = "codScatola" ) String codScatola , @RequestParam( value = "centroDemat" ) String centroDemat , 
			@RequestParam( value = "operatore" ) String operatore , @RequestParam( value = "postazione" ) String postazione ) {
		log.info( "Inizio addScatolaToPallet" ) ;
		
		Response<ResponseCreazionePallet> response = new Response<>() ;
		RequestAddScatolaToPallet request = new RequestAddScatolaToPallet() ;
		request.setCodScatola(codScatola);
		request.setCentroDemat(centroDemat);
		request.setOperatore(operatore);
		request.setPostazione(postazione);		
		
		try {
			response = ricercaService.checkScatola( request ) ;
		}
		catch( Exception e ) {
			log.error( e.getMessage() , e ) ;
			response.setData( null ) ;
			response.setStatus( false ) ;
			response.setMessage( "Eccezione inaspettata : " + e ) ;
		}
		
		log.info( "Fine addScatolaToPallet" ) ;
		return response ;
	}
	
	@RequestMapping( value = "/pallet/removeScatola", method= {RequestMethod.POST} )
	@ResponseBody
	public Response<String> removeScatola( @RequestBody Request<RequestRimuoviScatolaPallet> request ) {
		Response<String> response = new Response<>() ;
		
		try {
			String responseData = ricercaService.removeScatolaFromPallet( request.getData() ) ;
			if( responseData != null ) {
				response.setStatus( true ) ;
			}
			else {
				response.setStatus( false ) ;
			}
			response.setData( responseData ) ;
			response.setMessage( "Scatola rimossa con successo" ) ;
		}
		catch( Exception e ) {
			log.error( e.getMessage() , e ) ;
			response.setData( null ) ;
			response.setStatus( false ) ;
			response.setMessage( "Eccezione inaspettata : " + e ) ;
		}
		
		return response ;
	}
	
	@RequestMapping( value = "/pallet/chiudiPallet", method= {RequestMethod.POST} )
	@ResponseBody
	public Response<String> chiudiPallet( @RequestBody Request<String> request ) {
		Response<String> response = new Response<>() ;
		
		try {
			String responseData = ricercaService.chiudiPallet( request.getData() ) ;
			if( responseData != null ) {
				response.setStatus( true ) ;
			}
			else {
				response.setStatus( false ) ;
			}
			response.setData( responseData ) ;
			response.setMessage( "Pallet chiuso con successo" ) ;
		}
		catch( Exception e ) {
			log.error( e.getMessage() , e ) ;
			response.setData( null ) ;
			response.setStatus( false ) ;
			response.setMessage( "Eccezione inaspettata : " + e ) ;
		}
		
		return response ;
	}
	
	@RequestMapping( value = "/pallet/stampaDistintaPallet", method= {RequestMethod.POST} )
	@ResponseBody
	public Response<PalletDistintaObj> stampaDistintaPallet( @RequestBody Request<String> request ) {
		Response<PalletDistintaObj> response = new Response<>() ;
		
		try {
			PalletDistintaObj responseData = ricercaService.getDistintaPallet( request.getData() ) ;
			response.setData( responseData ) ;
			response.setMessage( "Pallet chiuso con successo" ) ;
			response.setStatus( true );
		}
		catch( Exception e ) {
			log.error( e.getMessage() , e ) ;
			response.setData( null ) ;
			response.setStatus( false ) ;
			response.setMessage( "Eccezione inaspettata : " + e ) ;
		}
		
		return response ;
	}
}
