package it.citel.postel.bancarizzazioneGUI.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.citel.postel.bancarizzazioneGUI.service.PlichiService;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.rest.model.RequestPlichi;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponsePlichiDettObj;

@Controller
@RequestMapping("/plichi")
public class PlichiController {
	static final Logger log = LogManager.getLogger(PlichiController.class);
	
	@Autowired
	PlichiService plichiService ;
	
	@RequestMapping(value = "", method = { RequestMethod.GET, RequestMethod.POST })
	public String checkAcesso() {
		log.info("accesso plichi");
		return "plichi/ricercaPlichi";
	}
	
	@RequestMapping( value ="tableStatiPlico.json" , method = RequestMethod.GET  )
	public @ResponseBody String tableStatiPlico( @RequestParam("sort") String sort,
            @RequestParam("order") String order,
            @RequestParam("offset") String offset,
            @RequestParam("limit") String limit,
            @RequestParam("idPlico") String idPlico ) {
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit)) ;
		
		RequestPlichi request = new RequestPlichi() ;
				request.setStart( 	startRow	) ;
				request.setEnd( 	endRow		) ;
				request.setSort(	sort		) ;
				request.setOrder(	order		) ;
				request.setIdPlico(	idPlico		) ;
		
		log.info( request.toString() ) ;
				
		try {
			strReturn = plichiService.getTableStatiPlico( request ) ;
		}
		catch( Exception e ) {
			log.error( e ) ;
		}
		
		return strReturn ;
	}
	
	@RequestMapping( value = "/getTablePlichi.json" , method = RequestMethod.GET )
	public @ResponseBody String getTablePlichi( 
			@RequestParam("sort") String sort,
            @RequestParam("order") String order,
            @RequestParam("offset") String offset,
            @RequestParam("limit") String limit,
			@RequestParam(value = "idCliente", defaultValue = "") String idCliente ,
			@RequestParam(value = "codPlico", defaultValue = "") String codPlico , 
			@RequestParam(value = "codScatola", defaultValue = "") String codScatola , 
			@RequestParam(value = "statiSelected", defaultValue = "") String statiSelected ) {
		log.info("start tabella plichi");
		
		String strReturn = Constants.NO_ROW_FOUND_TABLE;
		
		int pageNumber = Integer.parseInt(offset) / Integer.parseInt(limit);
		int startRow = (pageNumber * Integer.parseInt(limit));
		int endRow = ((pageNumber * Integer.parseInt(limit)) + Integer.parseInt(limit)) ;
		
		RequestPlichi request = new RequestPlichi() ;
				request.setStart(			startRow		) ;
				request.setEnd(				endRow			) ;
				request.setSort(			sort			) ;
				request.setOrder(			order			) ;
				request.setIdCliente(		idCliente		) ;
				request.setCodPlico(		codPlico		) ;
				request.setCodScatola(		codScatola		) ;
				request.setStatiSelected(	statiSelected	) ;
		
		log.info( request.toString() ) ;
		
		try {
			strReturn = plichiService.getTablePlichi( request ) ;
		}
		catch( Exception e ) {
			log.error( e ) ;
		}
		
		return strReturn ;
	}
	
	@RequestMapping(value = "/dettagliPlico", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody Response<ResponsePlichiDettObj> dettagliPlico( @RequestParam( "idPlico" ) String idPlico ) {
		
		Response<ResponsePlichiDettObj> response = new Response<>() ;
		
		try {
			response.setData( plichiService.getDettagliPlico( idPlico ) ) ;
			response.setMessage( "OK" ) ;
			response.setStatus( true ) ;
		}
		catch( Exception e ) {
			log.error( e );
			response.setData( null ) ;
			response.setMessage( "KO" ) ;
			response.setStatus( false ) ;
		}
		
		return response ;
	}
}
