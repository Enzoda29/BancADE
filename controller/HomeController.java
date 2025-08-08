package it.citel.postel.bancarizzazioneGUI.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import it.citel.postel.bancarizzazioneGUI.service.HomeService;

@Controller
public class HomeController {
	static final Logger log = LogManager.getLogger(HomeController.class);
	@Autowired
	HomeService homeService;	

	

	@RequestMapping(value = {"","/home"}, method = {RequestMethod.GET, RequestMethod.POST})
	public String home(){
		log.debug("home");
		return "home";
	}
	

	
}
