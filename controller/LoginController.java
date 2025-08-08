package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.net.MalformedURLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.security.provider.UserAuthenticationProvider;
import it.citel.postel.bancarizzazioneGUI.service.LoginService;
import it.postel.bancarizzazioneGUI.services.UserService;
import it.citel.postel.bancarizzazioneGUI.util.SessionUtil;
import it.citel.postel.commonLib.constants.SessionConstants;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestLogin;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponsePostazioni;
import it.citel.postel.commonLib.security.model.User;

@Controller

public class LoginController {
	static final Logger log = LogManager.getLogger(LoginController.class);
	@Autowired
	LoginService loginService;

	@Autowired
	UserService userService;

	@Autowired
	UserAuthenticationProvider userAuthenticationProvider;

	@RequestMapping(value = "/login", method = { RequestMethod.GET, RequestMethod.POST })
	public String login() {
		log.debug("login.. start");
		return "login";
	}

	@RequestMapping(value = "/login/autenticazione", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> autenticazione(@RequestBody Request<RequestLogin> reqLogin) {
		log.info("autenticazione.. start");
		Response<ResponsePostazioni> response = new Response<>();
//		try {
//			response = loginService.autenticazione(reqLogin);
//			if (response.getStatus()) {
//				response = loginService.loadPostazioni();
//			}
//		} catch (MalformedURLException e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		} catch (IOException e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		} catch (Exception e) {
//			log.error(e.getMessage(), e);
//			response.setStatus(false);
//			response.setData(null);
//			response.setMessage("KO - " + e.getMessage());
//		}
		log.info("autenticazione.. end");
		response.setStatus(true);
		
		return response;

	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
		User user = (User) SessionUtil.getObjectFromSession(SessionConstants.USER);

		return "login";
	}
	
	//TODO: da completare
	@RequestMapping(value = "/login/postazione", method = { RequestMethod.GET, RequestMethod.POST },produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Response<?> postazione(@RequestParam("idPostazione") String idPostazione, @RequestParam("descrizionePostazione") String descrizionePostazione, @RequestParam("username") String username  ) {
		Response<Boolean> response = null;
		log.info("postazione.. start");
		
		try {
			Request<RequestLogin> request = new Request<>();
			RequestLogin reqLogin = new RequestLogin();
			reqLogin.setIdPostazione(Long.valueOf(idPostazione));
			reqLogin.setUsername(username);
			request.setData(reqLogin);
			
			response = (Response<Boolean>) loginService.checkProfiloSharedPresent(request);
			log.debug("postazione: response ->"+response);
			response.setData(false);
			if(response.getData()) {
				response.setStatus(false);
				response.setMessage("Postazione già in uso da utente con lo stesso profilo!");
				
				log.info("postazione già in uso da utente con lo stesso profilo");				
			}else {
				response = new Response<>();
				response.setStatus(true);
				response.setData(null);
				response.setMessage("OK");
				User user = null;
				if(SessionUtil.getObjectFromSession(SessionConstants.USER) == null) {
					user = new User();
				}else{
					user = (User) SessionUtil.getObjectFromSession(SessionConstants.USER);
				}
				user.setIdPostazione(Long.valueOf(idPostazione));
				user.setDescrizionePostazione(descrizionePostazione);
				SessionUtil.setObjectInSession(SessionConstants.USER, user);
			}
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
		
	
		log.info("postazione.. end");
		return response;
	}

	@RequestMapping("/error")
	public String error(ModelMap model) {
		model.addAttribute("errorLogin", true);
		return "login";
	}

}
