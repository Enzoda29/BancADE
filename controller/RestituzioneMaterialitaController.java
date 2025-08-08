package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.RestituzioneMaterialitaService;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.objects.spedizione.sda.ReturnRestStampaLdvSDA;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestAggiornaSpedizione;
import it.citel.postel.commonLib.rest.model.RequestAssociaDDT;
import it.citel.postel.commonLib.rest.model.RequestAssociaSpedizioneScatole;
import it.citel.postel.commonLib.rest.model.RequestGetDettagliSpedizione;
import it.citel.postel.commonLib.rest.model.RequestRicercaSpedizioni;
import it.citel.postel.commonLib.rest.model.RequestSpedisciScatolaDiAnomalie;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDettagliLDV;
import it.citel.postel.commonLib.rest.model.ResponseDynamicObj;
import it.citel.postel.commonLib.rest.model.ResponseIndirizzoRestituzione;
import it.citel.postel.commonLib.rest.model.ResponseModuloDDT;
import it.citel.postel.commonLib.rest.model.ResponseRicercaSpedizione;

@Controller
@RequestMapping("/restMaterialita")
public class RestituzioneMaterialitaController {
	static final Logger log = LogManager.getLogger(RestituzioneMaterialitaController.class);
	
	@Autowired RestituzioneMaterialitaService restituzioneMaterialitaService;
	
	@RequestMapping(value = "/scatoleDiAnomalie", method = { RequestMethod.GET})
	public String ricercaMaterialita() throws MalformedURLException, IOException, Exception {
		log.info("scatole Anomalie  show page");
		return "scatoleDiAnomalie";
		
	}
	
	@RequestMapping(value = "/spedizioneScatoleConformi", method = { RequestMethod.GET})
	public String spedizioneScatoleConformi() throws MalformedURLException, IOException, Exception {
		log.info("Spedizione Scatole Conformi  show page");
		return "spedizioneScatoleConformi";
		
	}
	
	@RequestMapping(value = "/ricercaSpedizioni", method = { RequestMethod.GET})
	public String ricercaSpedizioni() throws MalformedURLException, IOException, Exception {
		log.info("Ricerca Spedizioni show page");
		return "ricercaSpedizioni";
		
	}
	
	//spedizioneDDT
	@RequestMapping( value="/spedizioneDDT" , method = { RequestMethod.GET } )
	public String spedizioneDDT()  throws MalformedURLException, IOException, Exception {
		log.info("spedizioneDDT show page");
		return "spedizioniDDT";
	}
	
	@RequestMapping( value="/ddtSpedizioni" , method = { RequestMethod.GET } )
	public String ddtSpedizioni()  throws MalformedURLException, IOException, Exception {
		log.info("ddtSpedizioni show page");
		return "restituzioneSpedizioniDDT";
	}
	
	@RequestMapping(value = "/scatoleConformi", method = { RequestMethod.GET})
	public String scatoleConformi(@RequestParam(value = "idCliente", defaultValue = "") String idCliente,
			@RequestParam(value = "codiceScatola", defaultValue = "") String codiceScatola, Model model) throws MalformedURLException, IOException, Exception {
		log.info("scatole conformi  show page");
		model.addAttribute("idCliente", idCliente);
		model.addAttribute("codiceScatola", codiceScatola);
		return "scatoleConformiPreview";
		
	}
	
	@RequestMapping(value = "/scatoleConformi/{macroservizio_client_id}", method = { RequestMethod.GET})
	public String scatoleConformi(@PathVariable("macroservizio_client_id")String macroservizio_client_id,
			@RequestParam(value = "id_cliente", defaultValue = "") String idCliente,
			@RequestParam(value = "codice_scatola", defaultValue = "") String codiceScatola, Model model) throws MalformedURLException, IOException, Exception {
		log.info("scatole conformi  group by macroservizio_client_id "+macroservizio_client_id);
		model.addAttribute("macroservizio_client_id",macroservizio_client_id);
		model.addAttribute("idCliente", idCliente);
		model.addAttribute("codiceScatola", codiceScatola);
		return "scatoleConformi";
		
	}
	
	@RequestMapping(value = "/dataTable", method = { RequestMethod.GET})
	@ResponseBody
	public String dataTableScatoleConformi(@RequestParam(value = "identificativoCliente", required=false) String identificativoCliente, @RequestParam(value = "codiceScatola", required=false) String codiceScatola) throws MalformedURLException, IOException, Exception {
		log.info("dataTableScatoleConformi");
		Response<?> response = new Response<>();
		try {
			
			response = restituzioneMaterialitaService.elencoScatole(identificativoCliente, codiceScatola);

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
		log.info("getDettSpedizione.. end");
		return (String) response.getData();

	}
	
	
	
	@RequestMapping(value = "/elencoTipiDoc", method = { RequestMethod.GET})
	@ResponseBody
	public Response<?> elencoTipiDoc(@RequestParam(value = "microservizioClientId", required=true) BigDecimal microservizioClientId) {	
		log.info("elencoTipiDoc.. start ");
		Response<?> response = new Response<>();
		
		try {
			
			response = restituzioneMaterialitaService.elencoTipiDoc(microservizioClientId);
					
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
		log.info("elencoTipiDoc.. end");
		return response;
	}
	
	@RequestMapping(value = "/aggiornaSpedizione", method = { RequestMethod.GET , RequestMethod.POST })
	@ResponseBody
	public Response<?> aggiornaSpedizione(@RequestBody Request<RequestAggiornaSpedizione> request) {
	
		log.info("getDettSpedizione.. start ");
		Response<?> response = new Response<>();
		
		try {
			
			response = restituzioneMaterialitaService.aggiornaSpedizione( request );
					
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
		log.info("getDettSpedizione.. end");
		return response;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getDistintaSpedizione", method = { RequestMethod.GET , RequestMethod.POST })
	@ResponseBody
	public Response<byte[]> getDistintaSpedizione(HttpServletRequest request , HttpServletResponse httpResponse) {
	
		log.info("getDistintaSpedizione.. start ");
		Response<byte[]> response = new Response<>();
		
		try {
			Request<String> r = new Request<>() ;
			r.setData( request.getParameter("data").toString() ) ;
			
			response = (Response<byte[]>) restituzioneMaterialitaService.getDistintaSpedizione( r );
			
//			httpResponse.setContentType("application/pdf");
//			httpResponse.setHeader("Content-disposition", "attachment; filename=LDV.pdf");
//			 
//			OutputStream os = httpResponse.getOutputStream() ;
//			os.write(response.getData().getBytes());
//			os.flush();
//			os.close();
			
//			response.setStatus(true);
//			response.setMessage("OK");
					
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
		log.info("getDistintaSpedizione.. end");
		return response;
	}
	
	@RequestMapping(value = "/getDettSpedizione", method = { RequestMethod.GET , RequestMethod.POST })
	@ResponseBody
	public Response<?> getDettSpedizione(@RequestBody Request<String> request) {
	
		log.info("getDettSpedizione.. start ");
		Response<?> response = new Response<>();
		
		try {
			
			response = restituzioneMaterialitaService.getDettSpedizione( request );
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
		log.info("getDettSpedizione.. end");
		return response;
	}
	
	@RequestMapping(value = "/getScatoleAnomalie", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> recuperaScatoleAnomalie(@RequestParam BigDecimal idCentroDemat) {
	
		log.info("scatoleAnomalie.. start ");
		Response<?> response = new Response<>();
		
		try {
			
			response = restituzioneMaterialitaService.getScatoleDiAnomalie(idCentroDemat);
					
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
		log.info("scatoleAnomalie.. end");
		return response;
	}
	
	@RequestMapping(value = "/getIndRestPosteIta", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getIndRestPosteIta() {
	
		log.info("scatoleAnomalie.. start ");
		Response<?> response = new Response<ResponseIndirizzoRestituzione>();
		
		try {
			
			response = restituzioneMaterialitaService.getIndRestPosteIta();
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
		log.info("scatoleAnomalie.. end");
		return response;
	}
    
	@RequestMapping(value = "/spedisciScatolaDiAnomalie", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> spedisciScatolaDiAnomalie(@RequestBody Request<RequestSpedisciScatolaDiAnomalie> request) {
	
		log.info("spedisciScatolaDiAnomalie.. start ");
		Response<?> response = new Response<Boolean>();
		
		try {
			
			response = restituzioneMaterialitaService.spedisciScatolaDiAnom(request);
//			response.setStatus(true);
//			response.setMessage("OK");
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
		log.info("spedisciScatolaDiAnomalie.. end");
		return response;
	}
	
	//Scatole conformi
	@RequestMapping(value = "/getScatoleConformi", method = { RequestMethod.GET })
	@ResponseBody
	public Response<?> getScatoleConformi(@RequestParam("aggregato")String aggregato, @RequestParam("tipo_doc_id")String tipo_doc_id, @RequestParam("macroservizio_client_id")Long macroservizio_client_id) {
	
		log.info("get ScatoleConformi.. start ");
		Response<?> response = new Response<ResponseDynamicObj>();
		
		try {
			
			response = restituzioneMaterialitaService.getAllScatoleConformiByMicro(aggregato, tipo_doc_id, macroservizio_client_id);
//			response.setStatus(true);
//			response.setMessage("OK");
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
		log.info("get ScatoleConformi.. end");
		return response;
	}
	
	
    
	@RequestMapping(value = "/sendAssociaSpedScatoleConformi", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> sendAssociaSpedScatoleConformi(@RequestBody Request<RequestAssociaSpedizioneScatole> request) {
	
		log.info("sendAssociaSpedScatoleConformi.. start ");
		Response<?> response = new Response<Boolean>();
		
		try {
			
			response = restituzioneMaterialitaService.sendAssociaSpedScatoleConformi(request);
//			response.setStatus(true);
//			response.setMessage("OK");
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
		log.info("sendAssociaSpedScatoleConformi.. end");
		return response;
	}
	
	//Spedisci Scatole conformi
	
		@RequestMapping(value = "/getAllSpedisciScatoleConformi", method = { RequestMethod.GET })
		@ResponseBody
		public Response<?> getSpedisciScatoleConformi() {
		
			log.info("getAllSpedisciScatoleConformi.. start ");
			Response<?> response = new Response<ResponseDynamicObj>();
			
			try {
				
				response = restituzioneMaterialitaService.getAllSpedisciScatoleConformi();
//				response.setStatus(true);
//				response.setMessage("OK");
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
			log.info("getAllSpedisciScatoleConformi.. end");
			return response;
		}
		
		
	
		@RequestMapping(value = "/getDettaglioSpedizione", method = { RequestMethod.GET })
		@ResponseBody
		public Response<?> getDettaglioSpedizione(@RequestParam BigDecimal spedizioneID) {
		
			log.info("getDettaglioSpedizione.. start ");
			Response<?> response = new Response<>();
			
			try {
				
				response = restituzioneMaterialitaService.getDettaglioSpedizione(spedizioneID);
						
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
			log.info("getDettaglioSpedizione.. end");
			return response;
		}
		
		@SuppressWarnings("unchecked")
		@RequestMapping(value = "/getRicercaSpedizione", method = { RequestMethod.GET , RequestMethod.POST })
		@ResponseBody
		public Response<List<ResponseRicercaSpedizione>> getRicercaSpedizione(@RequestBody Request<RequestRicercaSpedizioni> request) {
		
			log.info("getRicercaSpedizione.. start ");
			Response<List<ResponseRicercaSpedizione>> response = new Response<>();
			
			try {
				
				response = (Response<List<ResponseRicercaSpedizione>>) restituzioneMaterialitaService.getRicercaSpedizione(request);
						
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
			log.info("getRicercaSpedizione.. end");
			return response;
		}
	
		@RequestMapping(value = "/getDettaglioRichiestaStampaLdvSDA", method = { RequestMethod.GET, RequestMethod.POST })
		@ResponseBody
		public Response<?> getDettaglioRichiestaStampaLdvSDA(@RequestBody Request<RequestGetDettagliSpedizione> request) {
			log.debug("getDettaglioRicheistaLdvSDA - request: " + request.getData());
			Response<ReturnRestStampaLdvSDA> response = new Response<ReturnRestStampaLdvSDA>();
			try {
				ResponseDettagliLDV r = restituzioneMaterialitaService.getDettaglioRichiestaStampaLdvSDA(request);
				response = new Response<>() ;
				response.setData(r.getData()) ;
				response.setMessage(r.getMessage());
				response.setStatus( r.isStatus() );
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
		
		
		@RequestMapping(value = "/stampaLdvSDA", method = { RequestMethod.GET, RequestMethod.POST })
		@ResponseBody
		public Response<?> stampaLdvSDA(@RequestBody Request<ReturnRestStampaLdvSDA> request , HttpServletRequest r) {
			log.debug("spedizione: cerca");
			Response<?> response = new Response<>();
			try {
				response = restituzioneMaterialitaService.sendRichiestaStampaLdvSDA(request );
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
		
		@RequestMapping(value = "/barcode", method = { RequestMethod.GET })
		@ResponseBody
		public Response<?> barcodeCheck(@RequestParam("barcode") String barcode, @RequestParam("macroservizio_client_id")Long microservizioClientId) {
			
			log.info("barcodeCheck.. start ");
			Response<?> response = new Response<Map<String,Object>>();
			try {				
				response = restituzioneMaterialitaService.barcodeCheck(barcode, microservizioClientId);
				
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
			log.info("barcodeCheck.. end");
			return response;
		}
		
		
		
		@RequestMapping(value = "/elencoClienti", method = { RequestMethod.GET })
		@ResponseBody
		public Map<String, List<String>> elencoClienti(@RequestParam("identificativoCliente") String identificativoCliente) {
			
			log.info("elencoClienti.. start ");
			Map<String, List<String>> response = null;
			try {
				
				response = restituzioneMaterialitaService.elencoClienti(identificativoCliente);
				
			} catch (MalformedURLException e) {
				log.error(e.getMessage(), e);				
			} catch (IOException e) {
				log.error(e.getMessage(), e);				
			} catch (Exception e) {
				log.error(e.getMessage(), e);				
			}
			log.info("elencoClienti.. end");
			return response;
		}
		
		
		
		@RequestMapping(value = "/elencoAggregati", method = { RequestMethod.GET})
		@ResponseBody
		public Response<?> elencoAggregati() {	
			log.info("elencoAggregati.. start ");
			Response<?> response = new Response<>();
			
			try {
				
				response = restituzioneMaterialitaService.elencoAggregati();
						
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
			log.info("elencoAggregati.. end");
			return response;
		}
		
		
		@RequestMapping( value="/dataTableRestituzioneDDT" , method = {RequestMethod.GET} )
		@ResponseBody
		public String dataTableRestituzioneDDT( @RequestParam(value="centroDemat", defaultValue="") String centroDemat ) {
			log.info("dataTableRestituzioneDDT.. start ");
			
			String strReturn = Constants.NO_ROW_FOUND_TABLE;
			
			try {
				strReturn = restituzioneMaterialitaService.getDataTableRestituzioneDDT(centroDemat);
			}
			catch( Exception e ) {
				log.error(e.getMessage(), e);
			}
			
			log.info("dataTableRestituzioneDDT.. stop ");
			return strReturn ;
		}
	
		
		@RequestMapping( value="/associaDDT" , method= { RequestMethod.POST } )
		@ResponseBody
		public Response<String> associaDDT( @RequestBody RequestAssociaDDT request ) {
			log.info("associaDDT.. start , request: " + request);
			Response<String> response = new Response<>() ;
			
			try {
				response.setData( restituzioneMaterialitaService.associaDDT( request ) ) ;
				response.setMessage( "OK" ) ;
				response.setStatus( true ) ;
			}
			catch( Exception e ) {
				response.setData( e.getMessage() ) ;
				response.setMessage( "KO" ) ;
				response.setStatus( false ) ;
			}
			
			log.info("associaDDT.. stop ");
			return response ;
		}
		
		//getModuloDDT
		@RequestMapping( value="/getModuloDDT" , method = {RequestMethod.GET} )
		public @ResponseBody Response<byte[]> getModuloDDT( @RequestParam(value="ddtId", defaultValue="") String ddtId ) {
			log.info("getModuloDDT.. start ");
			Response<byte[]> response = new Response<>() ;
			
			try {
				ResponseModuloDDT result = restituzioneMaterialitaService.getModuloDDT( ddtId ) ;
				
				if( result == null ) {
					response.setData( null ) ;
					response.setStatus( false );
					response.setMessage( "Impossibile recuperare il modulo" );
				}
				
				byte[] contents = result.getFile().getBytes() ;
				
				response.setData( contents ) ;
				response.setStatus( true );
				response.setMessage( result.getFileName() );
				
//				response.setContentType("application/pdf");
//		        response.setHeader("Content-disposition", "attachment; filename=" + "Modulo.pdf");
//		        response.setContentLength(contents.length);
//
//		        response.getOutputStream().write(contents);
//		        response.getOutputStream().flush();
			}
			catch( Exception e ) {
				log.error( "Error: " + e ) ;
				response.setData( null ) ;
				response.setStatus( false );
				response.setMessage( e.getMessage() );
			}
			
			log.info("getModuloDDT.. stop ");
			return response ;
		}
		
		@RequestMapping( value="/dataTableSpedizioneDDT" , method = {RequestMethod.GET} )
		@ResponseBody
		public String dataTableSpedizioneDDT() {
			log.info("dataTableSpedizioneDDT.. start ");
			
			String strReturn = Constants.NO_ROW_FOUND_TABLE;
			
			try {
				strReturn = restituzioneMaterialitaService.getDataTableSpedizioneDDT();
			}
			catch( Exception e ) {
				log.error(e.getMessage(), e);
			}
			
			log.info("dataTableSpedizioneDDT.. stop ");
			return strReturn ;
		}
		
		@SuppressWarnings("unchecked")
		@RequestMapping( value="/getLDV" , method = {RequestMethod.GET} )
		public @ResponseBody Response<byte[]> getLDV( 
				@RequestParam(value="selectedId"	, defaultValue="") String selectedId	, 
				@RequestParam(value="clienteId"		, defaultValue="") String clienteId		,
				@RequestParam(value="centroDemat"	, defaultValue="") String centroDemat	) {
			Response<byte[]> response = new Response<>() ;
			
			try {
				Request<RequestGetDettagliSpedizione> request = new Request<>() ;
				RequestGetDettagliSpedizione requestData = new RequestGetDettagliSpedizione() ;
				
				requestData.setAggregatoID(		new BigDecimal( clienteId )		) ;
				requestData.setSpedizioneID(	new BigDecimal( selectedId )	) ;
				requestData.setCentroDematID(	new BigDecimal( centroDemat )	) ;
				
				request.setData( requestData ) ;
				
				ResponseDettagliLDV responseDettagli = restituzioneMaterialitaService.getDettaglioRichiestaStampaLdvSDA(request); ;
				if( !responseDettagli.isStatus() ) {
					throw new Exception( responseDettagli.getMessage() ) ;
				}
				
				Request<ReturnRestStampaLdvSDA> requestLdv = new Request<>() ;
				
				requestLdv.setData( (ReturnRestStampaLdvSDA) responseDettagli.getData() ) ;
				
				response = (Response<byte[]>) restituzioneMaterialitaService.sendRichiestaStampaLdvSDA( requestLdv ) ;
				if( !response.getStatus() ) {
					throw new Exception( response.getMessage() ) ;
				}
				
				Response<String> responseSpedizioneDDT = restituzioneMaterialitaService.spedisciDDT( selectedId ) ;
			}
			catch( Exception e ) {
				log.error( "Error: " + e ) ;
				response.setData( null ) ;
				response.setStatus( false );
				response.setMessage( e.getMessage() );
			}
			
			log.info("getLDV.. stop ");
			return response ;
		}
		
		//getCountEtichetta
		@RequestMapping( value="/getCountEtichetta" , method = {RequestMethod.GET} )
		public @ResponseBody Response<String> getCountEtichetta( @RequestParam( value ="ddtId" , defaultValue = "" ) String ddtId ) {
			Response<String> response = new Response<>() ;
			
			try {
				if( ddtId == null || ddtId.equals( "" ) ) {
					throw new NullPointerException( "Nessun DDT selezionato" ) ;
				}
				
				response.setData( restituzioneMaterialitaService.getCountEtichetta( ddtId ) ) ;
				response.setStatus( true );
				response.setMessage( "OK" ) ;
			}
			catch( Exception e ) {
				log.error( "Error: " + e ) ;
				response.setData( "KO" ) ;
				response.setStatus( false );
				response.setMessage( e.getMessage() );
			}
			
			return response ;
		}
		
		//stampatichette
		@RequestMapping( value="/stampatichette" , method = {RequestMethod.GET} )
		public @ResponseBody Response<String> stampatichette( @RequestParam( value ="ddtId" , defaultValue = "" ) String ddtId ) {
			Response<String> response = new Response<>() ;
			
			try {
				if( ddtId == null || ddtId.equals( "" ) ) {
					throw new NullPointerException( "Nessun DDT selezionato" ) ;
				}
				
				response.setData( restituzioneMaterialitaService.stampatichette( ddtId ) ) ;
				response.setStatus( true );
				response.setMessage( "OK" ) ;
			}
			catch( Exception e ) {
				log.error( "Error: " + e ) ;
				response.setData( "KO" ) ;
				response.setStatus( false );
				response.setMessage( e.getMessage() );
			}
			
			return response ;
		}
		
		@RequestMapping( value="/stampaLDV" , method = {RequestMethod.GET} )
		public @ResponseBody Response<byte[]> stampaLDV( @RequestParam( value ="spedizioneId" , defaultValue = "" ) String spedizioneId ) {
			Response<byte[]> response = new Response<>() ;
			
			try {
				ResponseModuloDDT result = restituzioneMaterialitaService.stampaLDV( spedizioneId ) ;
				
				if( result == null ) {
					response.setData( null ) ;
					response.setStatus( false );
					response.setMessage( "Impossibile recuperare la LDV" );
				}
				
				byte[] contents = result.getFile().getBytes() ;
				
				response.setData( contents ) ;
				response.setStatus( true );
				response.setMessage( result.getFileName() );
			}
			catch( Exception e ) {
				log.error( "Error: " + e ) ;
				response.setData( null ) ;
				response.setStatus( false );
				response.setMessage( e.getMessage() );
			}
			
			return response ;
		}
}
