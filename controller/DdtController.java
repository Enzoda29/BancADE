package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Arrays;
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

import it.citel.postel.bancarizzazioneGUI.service.CommonGuiService;
import it.citel.postel.bancarizzazioneGUI.service.DdtService;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.model.RequestDisassociazioneDDT;
import it.citel.postel.commonLib.rest.model.RequestRicercaDdt;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDistintaDDT;

@Controller
@RequestMapping("/ddt")

public class DdtController {
	
	static final Logger log = LogManager.getLogger(DdtController.class);
	
	@Autowired
	DdtService ddtService;
	
	@Autowired
	CommonGuiService commonGuiService;

	@RequestMapping(value = "/ricerca", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicerche() {
		log.debug("showRicercheDDT");
		return "ricercheDDT";
	}


	@RequestMapping(value = "/getListStatiFiltroRicercaDDT", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListStatiFiltroRicercaDDT() {
		log.info("Inizio getListStatiFiltroRicercaDDT");
		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = ddtService.getListStatiFiltroRicercaDDT();
			log.debug("getListStatiFiltroRicercaDDT response: " + response.getData().size());
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
		log.debug("getListStatiFiltroRicercaDDT terminata");
		return response;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getListClientiFiltroRicercaDDT", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListClientiFiltroRicercaDDT() {
		log.info("Inizio getListClientiFiltroRicercaDDT");
		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = (Response<List<Combo>>) commonGuiService.getComboClienti();
			log.debug("getListClientiFiltroRicercaDDT response: " + response.getData().size());
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
		log.debug("getListClientiFiltroRicercaDDT terminata");
		return response;
	}
	
	@RequestMapping(value = "/getListTipiFiltroRicercaDDT", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListTipiFiltroRicercaDDT() {
		log.info("Inizio getListTipiFiltroRicercaDDT");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = ddtService.getListTipiFiltroRicercaDDT();
			log.debug("getListTipiFiltroRicercaDDT response: " + response.getData().size());
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
		log.debug("getListTipiFiltroRicercaDDT terminata");
		return response;
	}
	
	
	
	@RequestMapping(value = "/getListLottiFiltroRicercaDDT", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListLottiFiltroRicercaDDT() {
		log.info("Inizio getListLottiFiltroRicercaDDT");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = ddtService.getListLottiFiltroRicercaDDT();
			log.debug("getListLottiFiltroRicercaDDT response: " + response.getData().size());
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
		log.debug("getListLottiFiltroRicercaDDT terminata");
		return response;
	}
	@RequestMapping(value = "/getListTipiSpedizioneFiltroRicercaDDT", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListTipiSpedizioneFiltroRicercaDDT() {
		log.info("Inizio getListTipiSpedizioneFiltroRicercaDDT");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = ddtService.getListTipiSpedizioneFiltroRicercaDDT();
			log.debug("getListTipiSpedizioneFiltroRicercaDDT response: " + response.getData().size());
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
		log.debug("getListTipiSpedizioneFiltroRicercaDDT terminata");
		return response;
	}
	@RequestMapping(value = "/getListTipiProdottoFiltroRicercaDDT", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListTipiProdottoFiltroRicercaDDT() {
		log.info("Inizio getListTipiFiltroRicercaDDT");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = ddtService.getListTipiProdottoFiltroRicercaDDT();
			log.debug("getListTipiProdottoFiltroRicercaDDT response: " + response.getData().size());
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
		log.debug("getListTipiProdottoFiltroRicercaDDT terminata");
		return response;
	}
	@RequestMapping(value = "/getListModelliFiltroRicercaDDT", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getListModelliFiltroRicercaDDT() {
		log.info("Inizio getListModelliFiltroRicercaDDT");

		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = ddtService.getListModelliFiltroRicercaDDT();
			log.debug("getListModelliFiltroRicercaDDT response: " + response.getData().size());
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
		log.debug("getListModelliFiltroRicercaDDT terminata");
		return response;
	}


	@RequestMapping( value = "/ricerca/dataTableRicercaDDT" , method = { RequestMethod.GET } )
	@ResponseBody
	public String dataTableRicercaDDT( 
			@RequestParam(value="list_id_stati_select", defaultValue="") String listaStatiRequest , 
			@RequestParam(value="list_id_tipologia_select", defaultValue="") String listaTipologiaRequest, 
			@RequestParam(value="list_id_clienti_select", defaultValue="") String listaClientiRequest, 
			@RequestParam(value="list_id_lotto_select", defaultValue="") String listaLottoRequest, 
			@RequestParam(value="list_id_spedizione_select", defaultValue="") String listaSpedizioneRequest, 
			@RequestParam(value="list_id_prodotto_select", defaultValue="") String listaProdottoRequest, 
			@RequestParam(value="list_id_modello_select", defaultValue="") String listaModelloRequest, 
			@RequestParam(value="codiceDDT", defaultValue="") String codiceDDT,
			@RequestParam(value="centroDemat", defaultValue="") String centroDemat,
			@RequestParam(value="sort") String sort, @RequestParam(value="order") String order,
			@RequestParam(value="offset") String offset, @RequestParam(value="limit") String limit) {
			
		log.info("Inizio dataTableRicercaDDT");
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit));
		
		RequestRicercaDdt request = new RequestRicercaDdt() ;
		
		List<String> listStati		= listaStatiRequest			.equals("") ? new ArrayList<>() : Arrays.asList( listaStatiRequest		.split("-") );
		List<String> listTipologie	= listaTipologiaRequest		.equals("") ? new ArrayList<>() : Arrays.asList( listaTipologiaRequest	.split("-") );
		List<String> listClienti	= listaClientiRequest		.equals("") ? new ArrayList<>() : Arrays.asList( listaClientiRequest	.split("-") );
		List<String> listLotti		= listaLottoRequest			.equals("") ? new ArrayList<>() : Arrays.asList( listaLottoRequest		.split("-") );
		List<String> listSpedizioni	= listaSpedizioneRequest	.equals("") ? new ArrayList<>() : Arrays.asList( listaSpedizioneRequest	.split("-") );
		List<String> listProdotti	= listaProdottoRequest		.equals("") ? new ArrayList<>() : Arrays.asList( listaProdottoRequest	.split("-") );
		List<String> listModelli	= listaModelloRequest		.equals("") ? new ArrayList<>() : Arrays.asList( listaModelloRequest	.split("-") );
		
		request.setListaStati(listStati);
		request.setListaTipologie(listTipologie);
		request.setListaClienti(listClienti);
		request.setCodiceDDT(codiceDDT);
		request.setListaLotti(listLotti);
		request.setListaSpedizioni(listSpedizioni);
		request.setListaProdotti(listProdotti);
		request.setListaModelli(listModelli);
		request.setIdCentroDemat(new BigDecimal(centroDemat));
		request.setSort(sort);
		request.setStart(startRow);
		request.setEnd(endRow);
		request.setOrder(order);
		
		
		try {
			strReturn = ddtService.getDdtByFilter(request);
		}
		catch( Exception e ) {
			log.error(e.getMessage(), e);
		}
		
		log.info("Fine dataTableRicercaDDT");
		return strReturn;
	}
	
	//dataTabledettaglioDDT
	@RequestMapping( value = "/ricerca/dataTabledettaglioDDT" , method = { RequestMethod.GET } )
	@ResponseBody
	public String dataTabledettaglioDDT( 
			@RequestParam(value="id_ddt", defaultValue="") String id_ddt , 
			@RequestParam(value="sort") String sort, @RequestParam(value="order") String order,
			@RequestParam(value="offset") String offset, @RequestParam(value="limit") String limit) {
			
		log.info("Inizio dataTableRicercaDDT");
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit));
		
		RequestRicercaDdt request = new RequestRicercaDdt() ;
		
		request.setCodiceDDT(id_ddt);
		request.setSort(sort);
		request.setStart(startRow);
		request.setEnd(endRow);
		request.setOrder(order);
		
		
		try {
			strReturn = ddtService.dataTabledettaglioDDT(request);
		}
		catch( Exception e ) {
			log.error(e.getMessage(), e);
		}
		
		log.info("Fine dataTableRicercaDDT");
		return strReturn;
	}
	
	@RequestMapping( value="/dissassociaDaDDT" , method = { RequestMethod.GET } )
	@ResponseBody
	public Response<String> dissassociaDaDDT(
			@RequestParam(value="selectedIds", defaultValue="") String selectedIds, 
			@RequestParam(value="DDTID", defaultValue="") String DDTID ) {
		log.info("Inizio dissassociaDaDDT");
		Response<String> response = new Response<>() ;
		RequestDisassociazioneDDT request = new RequestDisassociazioneDDT() ;
		
		List<String> listPallet = selectedIds.equals("") ? new ArrayList<>() : Arrays.asList( selectedIds.split("-") );
		
		request.setDdtId( DDTID ) ;
		request.setPalletIds( listPallet ) ;
		
		try {
			response = ddtService.dissassociaDaDDT(request);
		}catch(Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData( e.getMessage() ) ;
			response.setMessage( "Exception!" );
		}
		log.info("Fine dissassociaDaDDT");
		return response ;
	}
	
	@RequestMapping( value = "/chiudiDDT" , method = {RequestMethod.POST} )
	public @ResponseBody Response<String> chiudiDDT ( @RequestBody String id ) {
		log.info("Inizio chiudiDDT");
		
		Response<String> response = new Response<>() ;
		
		try {
			String result = ddtService.chiudiDDT( id.replace( "=" , "" ) ) ;
			if( result == null ) {
				response.setStatus(false);
				response.setData( "Internal error!" ) ;
				response.setMessage( "Internal error!" );
			}
			else {
				response.setStatus(true);
				response.setData( "OK" ) ;
				response.setMessage( "DDT chiuso correttamente!" );
			}
		}
		catch( Exception e ) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData( e.getMessage() ) ;
			response.setMessage( "Exception!" );
		}
		
		log.info("Fine chiudiDDT");
		
		return response ;
	}
	
	@RequestMapping( value="/getDatiDistinta" , method = { RequestMethod.GET } )
	public @ResponseBody Response<ResponseDistintaDDT> getDatiDistinta( @RequestParam( "ddtId" ) String ddtId ) {
		log.info("Inizio getDatiDistinta");
		
		Response<ResponseDistintaDDT> response = new Response<>() ;
		
		try {
			ResponseDistintaDDT result = ddtService.getDatiDistinta( ddtId ) ;
			if( result == null ) {
				response.setStatus(false);
				response.setData( null ) ;
				response.setMessage( "Internal error!" );
			}
			else {
				response.setStatus(true);
				response.setData( result ) ;
				response.setMessage( "DDT chiuso correttamente!" );
			}
		}
		catch( Exception e ) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData( null ) ;
			response.setMessage( "Exception! " + e.getMessage() );
		}
		
		log.info("Fine getDatiDistinta");
		
		return response ;
	}
	
	@RequestMapping( value = "/ricerca/dataTableAssociaPallet" , method = { RequestMethod.GET } )
	@ResponseBody
	public String dataTableAssociaPallet( 
			@RequestParam(value="list_id_stati_select", defaultValue="") String listaStatiRequest , 
			@RequestParam(value="list_id_tipologia_select", defaultValue="") String listaTipologiaRequest, 
			@RequestParam(value="list_id_clienti_select", defaultValue="") String listaClientiRequest, 
			@RequestParam(value="list_id_lotto_select", defaultValue="") String listaLottoRequest, 
			@RequestParam(value="list_id_spedizione_select", defaultValue="") String listaSpedizioneRequest, 
			@RequestParam(value="list_id_prodotto_select", defaultValue="") String listaProdottoRequest, 
			@RequestParam(value="list_id_modello_select", defaultValue="") String listaModelloRequest, 
			@RequestParam(value="codiceDDT", defaultValue="") String codiceDDT,
			@RequestParam(value="centroDemat", defaultValue="") String centroDemat,
			@RequestParam(value="sort") String sort, @RequestParam(value="order") String order,
			@RequestParam(value="offset") String offset, @RequestParam(value="limit") String limit) {
			
		log.info("Inizio dataTableAssociaPallet");
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit));
		
		RequestRicercaDdt request = new RequestRicercaDdt() ;
		
		List<String> listStati		= listaStatiRequest			.equals("") ? new ArrayList<>() : Arrays.asList( listaStatiRequest		.split("-") );
		List<String> listTipologie	= listaTipologiaRequest		.equals("") ? new ArrayList<>() : Arrays.asList( listaTipologiaRequest	.split("-") );
		List<String> listClienti	= listaClientiRequest		.equals("") ? new ArrayList<>() : Arrays.asList( listaClientiRequest	.split("-") );
		List<String> listLotti		= listaLottoRequest			.equals("") ? new ArrayList<>() : Arrays.asList( listaLottoRequest		.split("-") );
		List<String> listSpedizioni	= listaSpedizioneRequest	.equals("") ? new ArrayList<>() : Arrays.asList( listaSpedizioneRequest	.split("-") );
		List<String> listProdotti	= listaProdottoRequest		.equals("") ? new ArrayList<>() : Arrays.asList( listaProdottoRequest	.split("-") );
		List<String> listModelli	= listaModelloRequest		.equals("") ? new ArrayList<>() : Arrays.asList( listaModelloRequest	.split("-") );
		
		request.setListaStati(listStati);
		request.setListaTipologie(listTipologie);
		request.setListaClienti(listClienti);
		request.setCodiceDDT(codiceDDT);
		request.setListaLotti(listLotti);
		request.setListaSpedizioni(listSpedizioni);
		request.setListaProdotti(listProdotti);
		request.setListaModelli(listModelli);
		request.setIdCentroDemat(new BigDecimal(centroDemat));
		request.setSort(sort);
		request.setStart(startRow);
		request.setEnd(endRow);
		request.setOrder(order);
		
		
		try {
			strReturn = ddtService.dataTableAssociaPallet(request);
		}
		catch( Exception e ) {
			log.error(e.getMessage(), e);
		}
		
		log.info("Fine dataTableAssociaPallet");
		return strReturn;
	}
	
	//associaADDT
	@RequestMapping( value="/associaADDT" , method = { RequestMethod.GET } )
	@ResponseBody
	public Response<String> associaADDT(
			@RequestParam(value="selectedIds", defaultValue="") String selectedIds ,
			@RequestParam(value="operatoreId", defaultValue="") String operatoreId ,
			@RequestParam(value="postazione", defaultValue="") String postazione ,
			@RequestParam(value="centroDemat", defaultValue="") String centroDemat ) {
		log.info("Inizio associaADDT");
		Response<String> response = new Response<>() ;
		RequestDisassociazioneDDT request = new RequestDisassociazioneDDT() ;
		
		List<String> listPallet = selectedIds.equals("") ? new ArrayList<>() : Arrays.asList( selectedIds.split("-") );
		request.setOperatoreId(operatoreId);
		request.setPostazioneId(postazione);
		request.setCentroDemat(centroDemat);
		
		request.setPalletIds( listPallet ) ;
		
		try {
			response = ddtService.associaADDT(request);
		}catch(Exception e) {
			log.error(e.getMessage(), e);
			response.setStatus(false);
			response.setData( e.getMessage() ) ;
			response.setMessage( "Exception!" );
		}
		log.info("Fine associaADDT");
		return response ;
	}
	
//	@RequestMapping(value = "/configurazioneServizio/listaServizi", method = {RequestMethod.GET, RequestMethod.POST})
//	@ResponseBody
//	public Response<?>  dataTableRicercaDDT(@RequestBody Request<RequestRicercaDdt>  request) {
//		log.debug("configurazione: lista servizi");
//		System.out.println("configurazione: lista servizi - requestJson {}" + request.toString());
//		Response<?>  response = null;
//		try {
//			response = ddtService.getDdtByFilter(request); 
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
	

}
