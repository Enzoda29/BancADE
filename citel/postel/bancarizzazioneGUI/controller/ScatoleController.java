package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.text.Normalizer;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.Barcode39;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import it.citel.postel.bancarizzazioneGUI.service.ScatoleService;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestConfermaScatolaNConfRiscan;
import it.citel.postel.commonLib.rest.model.RequestScatoleNConfDaRiscan;
import it.citel.postel.commonLib.rest.model.Response;

@Controller
@RequestMapping("/scatole")
public class ScatoleController {
	
	static final Logger log = LogManager.getLogger(RicercheController.class);
	@Autowired
	ScatoleService scatoleService;
	
	@RequestMapping(value = "", method = {RequestMethod.GET, RequestMethod.POST})
	public String showScatole(){
		log.debug("show Scatole");
		return "Scatole";
	}
	
	
	//page scatole non conformi da riscansionare 
	@RequestMapping(value = "/scatoleNonConfDaRiscansionare", method = {RequestMethod.GET, RequestMethod.POST})
	public String showRicerchePratiche(){
		log.debug("show scatoleNonConfDaRiscansionare.jsp");
		return "scatoleNonConfDaRiscansionare";
	}
	
	@RequestMapping(value = "/scatoleAnomalieSanabiliDaRiscansionare", method = {RequestMethod.GET, RequestMethod.POST})
	public String scatoleAnomalieSanabiliDaRiscansionare(){
		log.debug("show scatoleAnomalieSanabiliDaRiscansionare.jsp");
		return "scatoleAnomalieSanabiliDaRiscansionare";
	}
	
	
	
    @RequestMapping(value = "/getLstScatoleNConfDaRiscan.json", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
	public String getLstScatoleNConfDaRiscan(
			@RequestParam("sort") String sort,
            @RequestParam("order") String order,
            @RequestParam("offset") String offset,
            @RequestParam("limit") String limit,
            @RequestParam(value = "idCentroDemat", defaultValue = "") String idCentroDemat
           ) {
		log.debug("dataTable getScatoleNConfDaRiscan start  ");

		String strReturn = Constants.NO_ROW_FOUND_TABLE;		
		try {
			Request<RequestScatoleNConfDaRiscan> request = (Request<RequestScatoleNConfDaRiscan>) scatoleService.buildRequestScatolaNConfDaRiscan(sort, order, offset, limit, idCentroDemat);
			
			 strReturn = scatoleService.getLstScatoleNConfDaRiscan(request);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		
		}
		log.debug("dataTable getScatoleNConfDaRiscan end.  ");
		return strReturn.toString();
	}
	
    
    @RequestMapping(value = "/updateNconfDaRisc", method = { RequestMethod.POST })
	@ResponseBody
	public Response<?> updateNconfDaRisc(@RequestBody Request<RequestConfermaScatolaNConfRiscan> request) {
		log.info("updateNconfDaRisc.. start ");
		Response<?> response = new Response<>();
		try {
			response = scatoleService.updateNconfDaRisc(request);
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
		log.info("updateNconfDaRisc.. end");
		return response;
	}
	
    //3.3.1.4.1	Elenco scatole Anomalie sanabili da riscansionare
    @RequestMapping(value = "/getLstScatoleAnomSanDaRiscan.json", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
	public String getLstScatoleAnomSanDaRiscan(
			@RequestParam("sort") String sort,
            @RequestParam("order") String order,
            @RequestParam("offset") String offset,
            @RequestParam("limit") String limit,
            @RequestParam(value = "idCentroDemat", defaultValue = "") String idCentroDemat
           ) {
		log.debug("dataTable getLstScatoleAnomSanDaRiscan start  ");

		String strReturn = Constants.NO_ROW_FOUND_TABLE;		
		try {
			Request<RequestScatoleNConfDaRiscan> request = (Request<RequestScatoleNConfDaRiscan>) scatoleService.buildRequestScatolaNConfDaRiscan(sort, order, offset, limit, idCentroDemat);
			
			 strReturn = scatoleService.getLstScatoleAnomSanDaRiscan(request);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		
		}
		log.debug("dataTable getLstScatoleAnomSanDaRiscan end.  ");
		return strReturn.toString();
	}
    
    
    @RequestMapping(value = "/updateScatoleAnomSanDaRiscan", method = { RequestMethod.POST })
   	@ResponseBody
   	public Response<?> updateScatoleAnomSanDaRiscan(@RequestBody Request<RequestConfermaScatolaNConfRiscan> request) {
   		log.info("updateScatoleAnomSanDaRiscan.. start ");
   		Response<?> response = new Response<>();
   		try {
   			response = scatoleService.updateScatoleAnomSanDaRiscan(request);
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
   		log.info("updateScatoleAnomSanDaRiscan.. end");
   		return response;
   	}
	
    
    @RequestMapping(value = "/{idScatola}/{operatore:.+}/{postazione}", method = { RequestMethod.PATCH })
   	@ResponseBody
   	public Response<?> close(@PathVariable long idScatola, @PathVariable String operatore, @PathVariable long postazione) {
   		log.info("chiudi scatola.. start ");
   		Response<?> response = new Response<>();
   		try {
   			response = scatoleService.close(idScatola,operatore,postazione);
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
   		log.info("chiudi scatola.. end");
   		return response;
   	}
    
    
    @RequestMapping(value = "/etichetta/{idScatola}", method = { RequestMethod.GET })
	public ResponseEntity<InputStreamResource> printNonConformi(
			@PathVariable("idScatola") long idScatola) {	

		ResponseEntity<InputStreamResource> response = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR) ;
		try {
			
			Response<List<Map<String,Object>>> resp = scatoleService.etichettaScatola(idScatola);			
			List<Map<String,Object>> scatola = resp.getData() ;
			
			if (scatola != null && !scatola.isEmpty()) {
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				
				Document document = new Document();
//				PdfWriter.getInstance(document, out);
				PdfWriter writer = PdfWriter.getInstance(document, out);
				document.open();
				PdfContentByte cb = writer.getDirectContent();
				Barcode39 code39 = new Barcode39();

				code39.setCode( (String) scatola.get(0).get( "CODICE_SCATOLA_GME" ) );
				code39.setStartStopText(false);
				Image image = code39.createImageWithBarcode(cb, null, null);

				//SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//dd/MM/yyyy
			    //Date now = new Date();
			    //String strDate = sdfDate.format(now);
				Paragraph paragraph = new Paragraph();
				paragraph.add( image ) ;
				paragraph.setAlignment(Element.ALIGN_CENTER);
				document.add(paragraph);
				Paragraph paragraph2 = new Paragraph();
				
				
				Phrase p = new Phrase( "Tipologia: "+ scatola.get(0).get( "TIPO_SCATOLA" ) + 
						"\nStato: " + Normalizer.normalize((String) scatola.get(0).get( "STATO_SCATOLA_ESTESO" ), Normalizer.Form.NFD) + 						
						"\n") ;
				
				paragraph2.add( p ) ;
				paragraph2.setAlignment(Element.ALIGN_CENTER);
				document.add(paragraph2);
				
				Paragraph paragraph_br = new Paragraph();
				Phrase p_br = new Phrase("\n");
				paragraph_br.add(p_br);
				document.add(paragraph_br);
				
				Paragraph paragraph3 = new Paragraph();
				Font boldFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
				PdfPTable table = new PdfPTable(2); //NUMERO COLONNE
				PdfPCell cell1 = new PdfPCell(new Phrase("CODICE PLICO",boldFont)); //INTESTAZIONE
				PdfPCell cell2 = new PdfPCell(new Phrase("N. DOCUMENTI",boldFont));//INTESTAZIONE				
				cell1.setBorder(Rectangle.NO_BORDER); cell2.setBorder(Rectangle.NO_BORDER); 
				table.addCell(cell1); table.addCell(cell2); 
				for (Map<String, Object> plico : scatola) {
					
					Map<String, Object> CODICE_PLICO = plico.entrySet().stream()
							.filter(x -> x.getKey().equals("CODICE_PLICO"))
							.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
					PdfPCell value = new PdfPCell(new Phrase( CODICE_PLICO.get("CODICE_PLICO").toString()));							
					value.setBorder(Rectangle.NO_BORDER);
					
					Map<String, Object> TOT_DOC_PER_PLICO = plico.entrySet().stream()
							.filter(x -> x.getKey().equals("TOT_DOC_PER_PLICO"))
							.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
					String pis = TOT_DOC_PER_PLICO.get("TOT_DOC_PER_PLICO").toString();
					int indexOf = pis.indexOf(".");					
					PdfPCell value2 = new PdfPCell(new Phrase(pis.substring(0, indexOf) ));							
					value2.setBorder(Rectangle.NO_BORDER);
					
					table.addCell(value); table.addCell(value2); 

				}
				paragraph3.add(table);
				document.add(paragraph3);
				document.close() ;
				
				HttpHeaders headers = new HttpHeaders();
				
				String headerContentDisposition = "attachment; filename= Etichetta_" + scatola.get(0).get( "CODICE_SCATOLA_GME" ) + ".pdf";
				headers.add(HttpHeaders.CONTENT_DISPOSITION, headerContentDisposition);
				//headers.setContentType(MediaType.parseMediaType("application/octet-stream"));

				InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

				response = ResponseEntity.ok().headers(headers).contentLength( out.toByteArray().length ).contentType(MediaType.APPLICATION_OCTET_STREAM).body( resource ) ;
			}
		}
		catch( Exception e ) {
			log.error( e ) ;
		}
		
		return response ;
	}
	

}
