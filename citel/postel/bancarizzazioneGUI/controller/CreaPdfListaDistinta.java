package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.util.Properties;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.validator.internal.util.logging.Log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import com.itextpdf.text.Anchor;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chapter;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.ListItem;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Section;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import it.citel.postel.bancarizzazioneGUI.service.GestioneAnomalieService;
import it.citel.postel.bancarizzazioneGUI.service.GestioneAnomalieServiceImpl;
import it.citel.postel.bancarizzazioneGUI.service.RicercheService;
import it.citel.postel.bancarizzazioneGUI.servlet.CreaBarcodeServlet;
import it.citel.postel.bancarizzazioneGUI.util.BarcodeUtility;
import it.citel.postel.bancarizzazioneGUI.util.Costanti;
import it.citel.postel.commonLib.objects.gestione.StampaDistintaObj;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestRicercaScatolaDettaglio;
import it.citel.postel.commonLib.rest.model.RequestStampaDistinta;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTable;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTableObj;
import it.citel.postel.commonLib.rest.model.ResponseStampaDistinta;

@Component
public class CreaPdfListaDistinta{
 
	    private static Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 18,
	            Font.BOLD);
	    private static Font redFont = new Font(Font.FontFamily.TIMES_ROMAN, 12,
	            Font.NORMAL, BaseColor.RED);
	    private static Font subFont = new Font(Font.FontFamily.TIMES_ROMAN, 16,
	            Font.BOLD);
	    private static Font smallBold = new Font(Font.FontFamily.TIMES_ROMAN, 12,
	            Font.BOLD);
	    private static final Logger log = LogManager.getLogger(CreaBarcodeServlet.class);
	   
	    public static final Chunk NEWLINE = new Chunk("\n");
	    

	    public ByteArrayInputStream creaPdf(GestioneAnomalieService gestioneAnomalieService, String codicePicking) throws  Exception {
	    	
	    	RequestStampaDistinta requestStampaDistinta = new RequestStampaDistinta();
	    	requestStampaDistinta.setCodicePicking(codicePicking);
	    	Request<RequestStampaDistinta> request = new Request<> (); //crea oggetto
	    	request.setData(requestStampaDistinta);
	    	Response<?>  response = gestioneAnomalieService.getStampaDistintaPerIlRecupero(request); 
	    	ResponseDynamicTableObj  tabHeader= new ResponseDynamicTableObj();
	    	
	    	LinkedTreeMap<String, Object> responseStampaDistinta = (LinkedTreeMap<String, Object>)response.getData() ;
	    	List<LinkedTreeMap<String, Object>> listDistinta = (List<LinkedTreeMap<String, Object>>) responseStampaDistinta.get("listDistinta");
	    
	    	/*	for (LinkedTreeMap<String, Object> dist : listDistinta) {
	    		String codPicking =(String) dist.get("codicePicking");
	    		String idScatola= (String) dist.get("codiceScatolaGme");
	    		String codScatola= (String)dist.get("codiceScatola");
	    		String codiceOggetto = (String) dist.get("codiceOggetto");
	    		Double posizione= (Double)dist.get("posizioneInScatola");
	    		String tipoAnomalie=(String)dist.get("tipoAnomalia");
	    		System.out.println("codice piking :"+ codicePicking);
	    		System.out.println("codice GME :"+ idScatola);
	    		System.out.println("codice Scatola :"+ codScatola);
	    		System.out.println("codice oggetto :"+ codiceOggetto);
	    		System.out.println("POSIZIONE :"+ posizione);
	    		System.out.println("TIPO :"+ tipoAnomalie);
	    	}
	    */
	    	String idScatola= (String) listDistinta.get(0).get("codiceScatola");
	    	System.out.println("codice GME :"+ idScatola);
	    	
	    	String codiceScatola= (String) listDistinta.get(0).get("codiceScatolaGme");
	    	System.out.println("codice scatola :"+ codiceScatola);
	    	
	    	
	    	ByteArrayOutputStream out = new ByteArrayOutputStream();
	
	    	try {
	    		
				Document document = new Document();
				PdfWriter.getInstance(document, out);
				document.open();
			//	document.add( Chunk.NEWLINE );
		
				addBarCode(document, codicePicking);
			//	document.add( Chunk.NEWLINE );
				
				Map<String, PdfPTable> mapTables = new HashMap<>();
			
				int counter=0;
				
		        for (LinkedTreeMap<String, Object> dist : listDistinta) {
		            String codScatola= (String)dist.get("codiceScatolaGme");
		            String idSca=(String)dist.get("codiceScatola");
		           		          
		            PdfPTable table = mapTables.get(codScatola);
		        
		            if (table == null) {
						
						if (counter > 0 ) {
							 	document.add(mapTables.get(codiceScatola));
								mapTables.put(codScatola, table);
								codiceScatola = codScatola;
								Paragraph par = new Paragraph();
								par.setFont(FontFactory.getFont(null,8, Font.NORMAL, BaseColor.BLACK));
								par.setAlignment(Element.ALIGN_CENTER);
							//	Chunk space = new Chunk("  ");
								String identificativo=("Id Scatola: "+codScatola);
								
						}
						counter++;
						//document.add( Chunk.NEWLINE );
		            	Paragraph par = new Paragraph();
		               
		            	//document.add( Chunk.NEWLINE );
						par.setFont(FontFactory.getFont(null,8, Font.NORMAL, BaseColor.BLACK));
						par.setAlignment(Element.ALIGN_CENTER);
						Chunk space = new Chunk("  ");
						
						String identificativo=("Id Scatola: "+codScatola);
						par.add(identificativo);
						par.add(space);
						par.setSpacingBefore(35);
			            par.setSpacingAfter(25);
						
						String codice=("Codice Scatola: "+idSca);
						par.add(codice);
						par.add(space);
						document.add(par);
						//par.setSpacingAfter(100);
						;
					//	document.add( Chunk.NEWLINE );
						table = new PdfPTable(3);
						
						mapTables.put(codScatola, table);
						table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
						table.setWidthPercentage(100);
				
						
					    table.addCell(new Paragraph(" CODICE OGGETTO ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
					    table.addCell(new Paragraph("POSIZIONE IN SCATOLA ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
					    table.addCell(new Paragraph("TIPO ANOMALIA ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
					    table.setHeaderRows(0);
					    PdfPCell[] cells = table.getRow(0).getCells(); 
						for (int j=0;j<cells.length;j++){
						 cells[j].setBackgroundColor(BaseColor.LIGHT_GRAY);
					    }
				
		            } 
		            
				  
				
						String codOggetto=(String)dist.get("codiceOggetto");;
						Double posizioneScatola=(Double)dist.get("posizioneInScatola");
						Integer posSca=Double.valueOf(posizioneScatola).intValue();
						
						String tipoAnomalia=(String)dist.get("tipoAnomalia");
						
						table.addCell(new Paragraph( codOggetto.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
						table.addCell(new Paragraph( posSca.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
						table.addCell(new Paragraph( tipoAnomalia.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
					
		        }
		       /*
		       */
				if (counter > 0) {
					document.add(mapTables.get(codiceScatola));
				}
				/*Paragraph par2 = new Paragraph();
				par2.setFont(FontFactory.getFont(null,7, Font.NORMAL, BaseColor.BLACK));
				par2.setAlignment(Element.ALIGN_CENTER);
				Chunk space = new Chunk("  ");
				String identificativo=("Sono sotto sta cavola di tabella");
		
				document.add(par2);*/
				document.close();

			} catch (Exception e) {

				e.printStackTrace();
			}
	    	return new ByteArrayInputStream(out.toByteArray());
	    	
	    }
	    
	    private void addBarCode(Document document, String codicePicking)
	            throws Exception {

	    	   BarcodeUtility util = new BarcodeUtility(Costanti.BARCODE_CONFIGURATION_FILE); 
	    	   ByteArrayOutputStream baos = util.getBarcodeStream(codicePicking);
	    	   Image maimg = Image.getInstance(baos.toByteArray());	
	           maimg.setAlignment(Image.MIDDLE);
	           maimg.scalePercent(70);
	           
	      
	           document.add(maimg);
	           
			  // document.add( Chunk.NEWLINE );

	    }
	    
}
	    
	