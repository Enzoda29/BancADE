package it.citel.postel.bancarizzazioneGUI.controller;

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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.ConfigurazioneService;
import it.citel.postel.commonLib.model.UserForm;
import it.citel.postel.commonLib.object.ricerche.Combo;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestClientiRestProfile;
import it.citel.postel.commonLib.rest.model.RequestClientiRestProfileJson;
import it.citel.postel.commonLib.rest.model.RequestConfOperatori;
import it.citel.postel.commonLib.rest.model.RequestGetCliRestProfByServMacros;
import it.citel.postel.commonLib.rest.model.RequestIndirizzoRestituzione;
import it.citel.postel.commonLib.rest.model.RequestNewMacroservizio;
import it.citel.postel.commonLib.rest.model.RequestOperatore;
import it.citel.postel.commonLib.rest.model.RequestRicercaCliente;
import it.citel.postel.commonLib.rest.model.RequestRicercaServizi;
import it.citel.postel.commonLib.rest.model.Response;


@Controller
@RequestMapping("/configurazione")

public class ConfigurazioneController {
	static final Logger log = LogManager.getLogger(ConfigurazioneController.class);
	@Autowired
	ConfigurazioneService configurazioneService;
	
	
	@RequestMapping(value = "", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicerche(){
		log.debug("showConfigurazione");
		return "configurazione";
	}

	@RequestMapping(value = "/configurazioneServizio", method = {RequestMethod.GET, RequestMethod.POST})
	public String showConfigurazioneServizio(){
		log.debug("showConfigurazioneServizio");
		return "configurazioneServizio";
	}
	
	@RequestMapping(value = "/configurazioneAnagraficaClienti", method = {RequestMethod.GET, RequestMethod.POST})
	public String showConfigurazioneAnagraficaClienti(){
		log.debug(" show configurazioneAnagraficaClienti.jsp");
		return "configurazioneAnagraficaClienti";
	}
	
	
	@RequestMapping(value = "/configurazioneMacroservizio", method = {RequestMethod.GET, RequestMethod.POST})
	public String configurazioneMacroservizio(){
		log.debug("configurazioneMacroservizio");
		return "configurazioneMacroservizio";
	}

	@RequestMapping(value = "/configurazioneIndirizziRestituzione", method = {RequestMethod.GET, RequestMethod.POST})
	public String configurazioneIndirizziRestituzione(){
		log.debug("show configurazioneIndirizziRestituzione");
		return "configurazioneIndirizziRestituzione";
	}

	
	@RequestMapping(value = "/configurazioneRestituzione", method = {RequestMethod.GET, RequestMethod.POST})
	public String configurazioneRestituzione(){
		log.debug("show configurazioneRestituzione");
		return "configurazioneRestituzione";
	}
	
	@RequestMapping(value = "/configurazioneOperatori", method = {RequestMethod.GET, RequestMethod.POST})
	public String configurazioneOperatori(){
		log.debug("show configurazioneOperatori");
		return "configurazioneOperatori";
	}
	
	
	@RequestMapping(value = "/updatePassword/operatore", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updatePasswordOperatoreAjax(@Valid @RequestBody UserForm userForm, BindingResult bindingResult,
			Model model) {
		Request<UserForm> request = new Request<>();
		Response<?> responseAddOperatore = null;
		Map<String,Object> mapResult = new HashMap<>();
		try {
			if (bindingResult.hasErrors()) {
				log.warn("updateOperatore: i campi non sono validi");
				mapResult.put("errors",bindingResult.getAllErrors());
				return mapResult;
			}
//			responseAddOperatore = configurazioneService.updateOperatore(request.setData(userForm));
			if(!responseAddOperatore.getStatus())throw new Exception(responseAddOperatore.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage()+" ",e);			
			return mapResult;
		}
		mapResult.put("success",true);
		return mapResult;
	}
	
	
	//Bancarizzazione
	
	/**
	 * 
	 * @param codiceCliente
	 * @param identificativo
	 * @param descrizione
	 * @return
	 */
	@RequestMapping(value = "/AnagraficaClienti/listaAnagraficaClienti", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  listaAnagraficaPA(
			@RequestParam(value = "codiceCliente", defaultValue = "") String codiceCliente,
			@RequestParam(value = "identificativo", defaultValue = "") String identificativo,
			@RequestParam(value = "descrizione", defaultValue = "") String descrizione) {
		log.debug("configurazione: lista anagrafica clienti");
		Request<RequestRicercaCliente> request = new  Request<RequestRicercaCliente>();
		request.setData(new RequestRicercaCliente());
		Response<?>  response = null;
		try {
			request.getData().setCodice(codiceCliente);
			request.getData().setIdentificativo(identificativo);
			request.getData().setDescrizione(descrizione);
			response = configurazioneService.getAnagrafica(request);
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
	@RequestMapping(value = "/configurazioneAnagraficaPA/insertAnagraficaPA", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  insertAnagraficaPA(@RequestBody Request<RequestRicercaCliente>  request) {
		log.debug("configurazione: insert anagrafica PA");
		System.out.println("configurazione: insert anagrafica PA - requestJson {}" + request.toString());
		Response<?>  response = null;
		try {
			response = configurazioneService.insertAnagraficaCliente(request); 
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
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/configurazioneAnagraficaPA/updateAnagraficaPA", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  updateAnagraficaPA(@RequestBody Request<RequestRicercaCliente>  request) {
		log.debug("configurazione: update anagrafica PA");
		System.out.println("configurazione: update anagrafica PA - requestJson {}" + request.toString());
		Response<?>  response = null;
		try {
			response = configurazioneService.updateAnagraficaCliente(request); 
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
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/configurazioneMacroservizi/getMacroserviziByCliente", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  getMacroserviziByCliente(@RequestBody Request<RequestNewMacroservizio> request) {
		log.debug("Inizio - configurazione: cerca macroservizio associato al cliente");
		Response<?>  response = null;
		try {
			response = configurazioneService.getMacroserviziByCliente(request); 
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
		log.debug("Fine - configurazione: verifica nuovo codice  Macroservizio");
		return response;
	}
	
	/**
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/configurazioneMacroservizi/addMacroServizioToClient", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  addMacroServizioToClient(@RequestBody Request<RequestNewMacroservizio> request) {
		log.debug("Inizio - configurazione: verifica nuovo codice  Macroservizio");
		Response<?>  response = null;
		try {
			response = configurazioneService.addMacroServizioToClient(request); 
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
		log.debug("Fine - configurazione: verifica nuovo codice  Macroservizio");
		return response;
	}
	
	//indirizzi di restituzione
	/**
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/indirizziRestituzione/getIndRestitByCliente", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  getIndRestitByCliente(@RequestParam("idCliente") String idCliente) {
		log.debug("Inizio - configurazione: get Lista indirizzi di restituzione associata al cliente");
		Response<?>  response = null;
		try {
			Request<BigDecimal> request = new Request<BigDecimal>();
			request.setData(new BigDecimal(idCliente));
			response = configurazioneService.getIndRestitByCliente(request); 
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
		log.debug("Fine - configurazione: get Lista indirizzi di restituzione associata al cliente");
		return response;
	}
	
	/**
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/indirizziRestituzione/updateIndirizzoRestituzione", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  updateIndirizzoRestituzione(@RequestBody Request<RequestIndirizzoRestituzione> request ) {
		log.debug("Inizio - configurazione: update indirizzi di restituzione associata al cliente");
		Response<?>  response = null;
		try {
			response = configurazioneService.updateIndirizzoRestituzione(request); 
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
		log.debug("Fine - configurazione: update indirizzi di restituzione associata al cliente");
		return response;
	}
	
	@RequestMapping(value = "/indirizziRestituzione/deleteIndirizzoRestituzione", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  deleteIndirizzoRestituzione(@RequestBody Request<RequestIndirizzoRestituzione> request ) {
		log.debug("Inizio - configurazione: delete indirizzi di restituzione associata al cliente");
		Response<?>  response = null;
		try {
			response = configurazioneService.deleteIndirizzoRestituzione(request); 
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
		log.debug("Fine - configurazione: delete indirizzi di restituzione associata al cliente");
		return response;
	}
	
	
	@RequestMapping(value = "/indirizziRestituzione/insertIndirizzoRestituzione", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  insertIndirizzoRestituzione(@RequestBody Request<RequestIndirizzoRestituzione> request ) {
		log.debug("Inizio - configurazione: insert indirizzi di restituzione associata al cliente");
		Response<?>  response = null;
		try {
			response = configurazioneService.insertIndirizzoRestituzione(request); 
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
		log.debug("Fine - configurazione: insert indirizzi di restituzione associata al cliente");
		return response;
	}
	
	
	//Servizi
	@RequestMapping(value = "/configurazioneServizio/listaServizi", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  listaServizi(@RequestBody Request<RequestRicercaServizi>  request) {
		log.debug("configurazione: lista servizi");
		System.out.println("configurazione: lista servizi - requestJson {}" + request.toString());
		Response<?>  response = null;
		try {
			response = configurazioneService.getServizi(request); 
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
	
	
	@RequestMapping(value = "/configurazioneServizio/getListaServizi", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Response<?>  getListaServizi() {
		log.info("Inizio getListaServizi");
		log.debug("configurazione: lista servizi per popolamento checkbox");
		Response<List<Combo>> response = new Response<List<Combo>>();
		try {
			response = (Response<List<Combo>>) configurazioneService.getListaServizi(); 
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
	
	@RequestMapping(value = "/configurazioneServizio/insertServiziToCliente", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Response<?>  insertServiziToCliente(@RequestBody Request<RequestRicercaServizi>  request) {
		log.debug("configurazione: lista servizi");
		System.out.println("configurazione: insermento servizi associati al cliente- requestJson {}" + request.toString());
		Response<?>  response = null;
		try {
			response = configurazioneService.insertServiziToCliente(request); 
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
	
	
	//operatori
	
	@RequestMapping(value = "/dataTableConfOperatori.json", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public String dataTableConfOperatori(@RequestParam("sort") String sort,
            @RequestParam("order") String order,
            @RequestParam("offset") String offset,
            @RequestParam("limit") String limit,            
            @RequestParam(value = "usernameSearch", defaultValue = "") String usernameSearch) {
		log.debug("dataTableConfOperatori start  ");
		
		String strReturn = null;		
		try {
			Request<RequestConfOperatori> request = (Request<RequestConfOperatori>) configurazioneService.buildRequest(sort, order, offset, limit,
					usernameSearch);
			 strReturn = configurazioneService.dataTableConfOperatori(request);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		
		}
		return strReturn.toString();
	}
	//TODO GF
//	@RequestMapping(value = "/add/operatore", method = RequestMethod.POST)
//	public String addOperatore(@Valid @ModelAttribute(name ="userForm") UserForm userForm, BindingResult bindingResult,
//			Model model) {
//		log.info("addOperatore");				
//		Response<?> responseProfileAndCentriDemat = null;
//		Response<?> responseAddOperatore = null;
//		Request<UserForm> request = new Request<>();
//		try {
//			responseProfileAndCentriDemat = configurazioneService.loadProfileAndCentriDemat();
//			if (bindingResult.hasErrors()) {
//				log.warn("addOperatore: i campi non sono validi");	
//				model.addAttribute("showModalAdd", true);
//				return "configurazioneOperatori";
//			}			
//			responseAddOperatore = configurazioneService.addOperatore(request.setData(userForm));
//			if(!responseAddOperatore.getStatus())throw new Exception(responseAddOperatore.getMessage());
//		} catch (Exception e) {
//			log.error(e.getMessage()+" ",e);
//			model.addAttribute("operatore_error", e.getMessage());
//			return "configurazioneOperatori";
//		}finally {
//			List<Map<String, Object>> responseList = (List<Map<String, Object>>) responseProfileAndCentriDemat.getData();
//			model.addAttribute("listaProfili", responseList.get(1));
//			model.addAttribute("listaCentriDemat", responseList.get(0));
//		}
//
//		return "redirect:/configurazione/configurazioneOperatori?success=Inserimento avvenuto con successo";
//	}
	
	@RequestMapping(value = "/operatore/add", method = RequestMethod.POST)
	@ResponseBody
	public Response<?>  addOperatore(@RequestBody Request<RequestOperatore>  request) {
		log.debug("configurazione: add operatore");
		System.out.println("configurazione: request operatore - requestJson {}" + request.toString());
		Response<?>  response = new Response<Object>();
		try {
			response = configurazioneService.addOperatore(request); 
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
	
	@RequestMapping(value = "/operatore/upd", method = RequestMethod.POST)
	@ResponseBody
	public Response<?>  updOperatore(@RequestBody Request<RequestOperatore>  request) {
		log.debug("configurazione: update operatore");
		System.out.println("configurazione: request operatore - requestJson {}" + request.toString());
		Response<?>  response = new Response<Object>();
		try {
			response = configurazioneService.updateOperatore(request); 
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
	
	@RequestMapping(value = "/operatore/delete", method = RequestMethod.POST)
	@ResponseBody
	public Response<?>  dltOperatore(@RequestBody Request<RequestOperatore>  request) {
		log.debug("configurazione: delete operatore");
		System.out.println("configurazione: request operatore - requestJson {}" + request.toString());
		Response<?>  response = new Response<Object>();
		try {
			response = configurazioneService.deleteOperatore(request); 
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
	
	//Restituzione
	@RequestMapping(value = "/restituzione/getCliRestProfileByMacroSid", method = RequestMethod.GET)
	@ResponseBody
	public Response<?>  getCliRestProfileByMacroSid(
			@RequestParam("idMacroservizio") BigDecimal  idMacroservizio,
			@RequestParam("idServizio") BigDecimal  idServizio) {
		log.debug("configurazione: get Cliente Rest Profile by MacroServizio_id");
		Response<?>  response = new Response<Object>();
		RequestGetCliRestProfByServMacros data = new RequestGetCliRestProfByServMacros();
		
		try {
			Request<RequestGetCliRestProfByServMacros> request = new Request<RequestGetCliRestProfByServMacros>();
			data.setIdMacroServizio(idMacroservizio);
			data.setIdServizio(idServizio);
			request.setData(data);
			response = configurazioneService.getCliRestProfileByMacroSid(request); 
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
	
	@RequestMapping(value = "/restituzione/saveCliRestProfile", method = RequestMethod.POST)
	@ResponseBody
	public Response<?>  saveCliRestProfile(@RequestBody Request<RequestClientiRestProfileJson>  request) {
		log.debug("configurazione: save Cliente Rest Profile by MacroServizio_id");
		Response<?>  response = new Response<Object>();
		Request<RequestClientiRestProfile> newRequest = new Request<RequestClientiRestProfile>();
		RequestClientiRestProfile newRequestDataSend = new RequestClientiRestProfile();
		try {

			newRequest.setData(newRequestDataSend.parseRequestClienteRestProfileObj(request.getData()));
			
			log.info("configurazione: aggiungi restituzione - requestJson {}" + request.toString());
			log.info("configurazione: parse request aggiungi servizio - requestJson {}" + newRequest.toString());

//			newRequestSend.setListProfile(parseRequest.parseRequestClienteRestProfileObj(request.getData().getListProfile()));
//			newRequestSend.setData(parseRequest);
			response = configurazioneService.saveCliRestProfile(newRequest); 
//			response.setStatus(true);
//			response.setData(null);
//			response.setMessage("OK");
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
