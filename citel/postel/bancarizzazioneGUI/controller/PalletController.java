package it.citel.postel.bancarizzazioneGUI.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import it.citel.postel.bancarizzazioneGUI.service.PalletService;

@Controller
@RequestMapping("/pallet")

public class PalletController {
    static final Logger log = LogManager.getLogger(RicercheController.class);

    @Autowired
	PalletService palletService;


	@RequestMapping(value = "", method = {RequestMethod.GET, RequestMethod.POST})
	public String showPallet(){
		log.debug("show Pallet");
		return "Pallet";
	}


}