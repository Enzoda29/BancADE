package it.citel.postel.bancarizzazioneGUI.controller;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
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

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.Barcode39;
import com.itextpdf.text.pdf.BarcodeEAN;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import it.citel.postel.bancarizzazioneGUI.service.NormalizzazioneService;
import it.citel.postel.bancarizzazioneGUI.util.BarcodeUtility;
import it.citel.postel.bancarizzazioneGUI.util.Costanti;
import it.citel.postel.bancarizzazioneGUI.util.SessionUtil;
import it.citel.postel.commonLib.constants.SessionConstants;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestNormalizzazione;
import it.citel.postel.commonLib.rest.model.RequestNormalizzazionePratiche;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAccessi;
import it.citel.postel.commonLib.rest.model.ResponseNormalizzazioneAccBarcode;
import it.citel.postel.commonLib.security.model.User;


@Controller
@RequestMapping("/normalizzazione")

public class NormalizzazioneController {
	static final Logger log = LogManager.getLogger(NormalizzazioneController.class);
	
	@Autowired
	NormalizzazioneService normalizzazioneService;

	@RequestMapping(value = "", method = { RequestMethod.GET, RequestMethod.POST })
	public String checkAcesso() {
		log.info("accesso normalizzazione");
		User user = (User) SessionUtil.getObjectFromSession(SessionConstants.USER);
		try {
			ResponseAccessi resp = normalizzazioneService.checkAccesso(user.getUsername());
			if (!resp.getStatus()) {
				return "normalizzazione/nonAbbilitata";
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return "normalizzazione/nonAbbilitata";
		}
		return "normalizzazione/normalizzazione";
	}
	
	@RequestMapping(value = "/getNonConformi/{centroDemat}", method = { RequestMethod.GET })
	@ResponseBody
	public Response<List<Map<String,Object>>> getNonConformi(@PathVariable long centroDemat) {
		log.info("getNonConformi");
		Response<List<Map<String,Object>>> response=new Response<List<Map<String,Object>>>();
		try {
			response = normalizzazioneService.getNonConformi(centroDemat);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
		}
		return response;
	}
	
	@RequestMapping(value = "/getCaselle/{operatore:.+}", method = { RequestMethod.GET })
	@ResponseBody
	public Response<List<Map<String,Object>>> getCasellari(@PathVariable String operatore) {
		log.info("getCasellari");
		Response<List<Map<String,Object>>> response=new Response<List<Map<String,Object>>>();
		try {
			response = normalizzazioneService.getCaselle(operatore);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
		}
		return response;
	}
	
	@RequestMapping(value = "/getNumeroBoxPerRiga", method = { RequestMethod.GET })
	@ResponseBody
	public Response<String> getNumeroBoxPerRiga() {
		log.info("getNumeroBoxPerRiga");
		Response<String> response=new Response<String>();
		try {
			response = normalizzazioneService.getNumeroBoxPerRiga();
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
		}
		return response;
	}
	
	@RequestMapping(value = "/accettazioneBarcode", method = { RequestMethod.POST })
	@ResponseBody
	public ResponseNormalizzazioneAccBarcode accettazioneBarcode(@RequestBody Request<RequestNormalizzazione>  request) {
		log.info("accettazioneBarcode");
		ResponseNormalizzazioneAccBarcode response = new ResponseNormalizzazioneAccBarcode();
		User user = (User) SessionUtil.getObjectFromSession(SessionConstants.USER);
		request.getData().setUsername(user.getUsername());
		request.getData().setPostazioneId(user.getIdPostazione());
		try {
			response = normalizzazioneService.accettazioneBarcode(request);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
		}
		return response;
	}
	
	
	@RequestMapping(value = "/getDetailsCasellario", method = { RequestMethod.GET })
	@ResponseBody
	public Response<List<Map<String,Object>>> getDetailsCasellario(@RequestParam long casellarioId) {
		log.info("getDetailsCasellario");
		Response<List<Map<String,Object>>> response=new Response<List<Map<String,Object>>>();
		try {
			response = normalizzazioneService.getDetailsCasellario(casellarioId);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
		}
		return response;
	}
	
	@RequestMapping(value = "/plico/{casellarioId}/{centroDemat}/{operatore:.+}/{postazione}", method = { RequestMethod.PUT }, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Response<String> insertPlico(@RequestBody RequestNormalizzazionePratiche request,
			@PathVariable("casellarioId") long casellarioId, @PathVariable("operatore") String operatore,
			@PathVariable("centroDemat") long centroDemat, @PathVariable("postazione") long postazione) {
		Response<String> response = new Response<String>();
		try {
			response = normalizzazioneService.insertPlico(casellarioId, operatore, centroDemat, postazione, request);
			response.setStatus(true);
			response.setMessage("OK");
		} catch (Exception e) {
			response.setStatus(false);
			response.setMessage("KO");
		}
		return response;
	}
	
	@RequestMapping(value = "/getDetailsNonConformi/{scatolaId}/{tipoScatolaTypeId}", method = { RequestMethod.GET },produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Response<List<Map<String,Object>>> getDetailsNonConformi(@PathVariable long scatolaId, @PathVariable long tipoScatolaTypeId) {
		log.info("getDetailsCasellario");
		Response<List<Map<String,Object>>> response=new Response<List<Map<String,Object>>>();
		try {
			response = normalizzazioneService.getDetailsNonConformi(scatolaId, tipoScatolaTypeId);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			response.setMessage("KO - " + e.getMessage());
			response.setStatus(false); 
		}
		return response;
	}
	
	
//	
	@RequestMapping(value = "/nonConformi/{idScatola}/{operatore:.+}/{postazione}/{tipoScatolaTypeId}/{centroDemat}", method = { RequestMethod.PUT }, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Response<String> nonConformi(
			@PathVariable("idScatola") long idScatola, @PathVariable("operatore") String operatore, @PathVariable("postazione") long postazione,
			@PathVariable("tipoScatolaTypeId") long tipoScatolaTypeId, @PathVariable("centroDemat") long centroDemat ) {
		Response<String> response = new Response<String>();
		try {		
			response = normalizzazioneService.closeAndCreateScatola(idScatola, operatore, postazione, tipoScatolaTypeId, centroDemat);
			response.setStatus(true);
			response.setMessage("OK");
		} catch (Exception e) {
			response.setStatus(false);
			response.setMessage("KO");
		}
		return response;
	}
	
	
	
	@RequestMapping(value = "/removeFromCasellario/{casellarioId}", method = { RequestMethod.POST }, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Response<String> removeFromCasellario(@RequestBody RequestNormalizzazionePratiche request,
			@PathVariable("casellarioId") long casellarioId) {
		Response<String> response = new Response<String>();
		try {
			response = normalizzazioneService.removeFromCasellario( casellarioId , request );
		} catch (Exception e) {
			response.setStatus(false);
			response.setMessage("KO");
		}
		return response;
	}
	
	@RequestMapping( value="/printPlico/{idPlico}" ,  method = { RequestMethod.GET })
	public ResponseEntity<InputStreamResource> printPlico(@PathVariable("idPlico") long idPlico) {
		ResponseEntity<InputStreamResource> response = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR) ;
		try {
			Response<Map<String,String>> resp = normalizzazioneService.getPlicoInfo( idPlico ) ;
			Map<String,String> plicoInfo = resp.getData() ;
			
			if (plicoInfo != null && !plicoInfo.isEmpty()) {
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				
				Document document = new Document();
				PdfWriter writer = PdfWriter.getInstance(document, out);
				document.open();
				PdfContentByte cb = writer.getDirectContent();
				
				Barcode39 code39 = new Barcode39();

				code39.setCode( plicoInfo.get( "CODICE_PLICO" ) );
				code39.setStartStopText(false);
				Image image = code39.createImageWithBarcode(cb, null, null);
				image.setAlignment(Image.MIDDLE);
				image.scalePercent(150);		
			    document.add(image);
				document.add( Chunk.NEWLINE );
				
				Paragraph paragraph = new Paragraph();				
				Phrase p = new Phrase( //plicoInfo.get( "CODICE_PLICO" ) + 
						"Nome Casellario : " + plicoInfo.get( "NOME_CASELLARIO" ) + 
						"\nCliente : " + plicoInfo.get( "CLIENTE" ) + 
						"\nMacroservizio : " + plicoInfo.get( "CODIFICA_MACROSERVIZIO" ) + 
						"\nProdotto : " + plicoInfo.get( "PRODOTTO" ) ) ;
				paragraph.add( p ) ;
				paragraph.setAlignment(Element.ALIGN_CENTER);
				document.add(paragraph);
				document.add( Chunk.NEWLINE );
				document.close() ;
				
				HttpHeaders headers = new HttpHeaders();
				
				String headerContentDisposition = "attachment; filename=" + plicoInfo.get( "CODICE_PLICO" ) + ".pdf";

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
	
	
	@RequestMapping(value = "/printNonConformi/{idScatola}/{tipoScatolaTypeId}", method = { RequestMethod.GET })
	public ResponseEntity<InputStreamResource> printNonConformi(
			@PathVariable("idScatola") long idScatola, 	@PathVariable("tipoScatolaTypeId") long tipoScatolaTypeId) {	

		ResponseEntity<InputStreamResource> response = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR) ;
		try {
			
			Response<List<Map<String,Object>>> resp = normalizzazioneService.getDetailsNonConformi(idScatola, tipoScatolaTypeId);			
			List<Map<String,Object>> scatolaNonConfInfo = resp.getData() ;
			
			if (scatolaNonConfInfo != null && !scatolaNonConfInfo.isEmpty()) {
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				
				Document document = new Document();
				PdfWriter writer = PdfWriter.getInstance(document, out);
				document.open();
				PdfContentByte cb = writer.getDirectContent();
				
				Barcode39 code39 = new Barcode39();

				code39.setCode((String) scatolaNonConfInfo.get(0).get( "CODICE_SCATOLA" ) );
				code39.setStartStopText(false);
				Image image = code39.createImageWithBarcode(cb, null, null);
				image.setAlignment(Image.MIDDLE);
				image.scalePercent(150);		
			    document.add(image);
				document.add( Chunk.NEWLINE );

				SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//dd/MM/yyyy
			    Date now = new Date();
			    String strDate = sdfDate.format(now);
	
				Paragraph paragraph2 = new Paragraph();
				Phrase p = new Phrase( "Id Scatola: "+ scatolaNonConfInfo.get(0).get( "SCATOLA_ID" ).toString() + 
						"\nCodice Scatola: " + scatolaNonConfInfo.get(0).get( "CODICE_SCATOLA" ) + 
						"\nN. documenti: " + scatolaNonConfInfo.size() + 
						"\nData Creazione: " + scatolaNonConfInfo.get(0).get( "DATA_CREAZIONE" ) + 
						"\nData Chiusura: " + strDate + "\n") ;
				paragraph2.add( p ) ;
				paragraph2.setAlignment(Element.ALIGN_CENTER);
				document.add(paragraph2);
				
				Paragraph paragraph_br = new Paragraph();
				Phrase p_br = new Phrase("\n");
				paragraph_br.add(p_br);
				document.add(paragraph_br);
				
				Paragraph paragraph3 = new Paragraph();
				Font boldFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
				PdfPTable table = new PdfPTable(3); //NUMERO COLONNE
				PdfPCell cell1 = new PdfPCell(new Phrase("CODICE OGGETTO",boldFont)); //INTESTAZIONE
				PdfPCell cell2 = new PdfPCell(new Phrase("POSIZIONE IN SCATOLA",boldFont));//INTESTAZIONE
				PdfPCell cell3 = new PdfPCell(new Phrase("DATA INSERIMENTO",boldFont));//INTESTAZIONE
				cell1.setBorder(Rectangle.NO_BORDER); cell2.setBorder(Rectangle.NO_BORDER); cell3.setBorder(Rectangle.NO_BORDER);
				table.addCell(cell1); table.addCell(cell2); table.addCell(cell3);
				for (Map<String, Object> scatola : scatolaNonConfInfo) {
					
					Map<String, Object> COD_OGGETTO = scatola.entrySet().stream()
							.filter(x -> x.getKey().equals("COD_OGGETTO"))
							.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
					PdfPCell value = new PdfPCell(new Phrase( COD_OGGETTO.get("COD_OGGETTO").toString()));							
					value.setBorder(Rectangle.NO_BORDER);
					
					Map<String, Object> POSIZIONE_IN_SCATOLA_SCAN = scatola.entrySet().stream()
							.filter(x -> x.getKey().equals("POSIZIONE_IN_SCATOLA_SCAN"))
							.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
					String pis = POSIZIONE_IN_SCATOLA_SCAN.get("POSIZIONE_IN_SCATOLA_SCAN").toString();
					int indexOf = pis.indexOf(".");					
					PdfPCell value2 = new PdfPCell(new Phrase(pis.substring(0, indexOf) ));							
					value2.setBorder(Rectangle.NO_BORDER);
					
					Map<String, Object> DATA_INS_IN_SCATOLA = scatola.entrySet().stream()
							.filter(x -> x.getKey().equals("DATA_INS_IN_SCATOLA"))
							.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
					PdfPCell value3 = new PdfPCell(new Phrase( DATA_INS_IN_SCATOLA.get("DATA_INS_IN_SCATOLA").toString()));							
					value3.setBorder(Rectangle.NO_BORDER);
					
					table.addCell(value); table.addCell(value2); table.addCell(value3); 

				}
				paragraph3.add(table);
				document.add(paragraph3);
				document.close() ;
				
				HttpHeaders headers = new HttpHeaders();
				
				String headerContentDisposition = "attachment; filename=" + scatolaNonConfInfo.get(0).get( "CODICE_SCATOLA" ).toString() + ".pdf";
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
