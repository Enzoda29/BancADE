package it.citel.postel.bancarizzazioneGUI.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import it.citel.postel.bancarizzazioneGUI.servlet.CreaBarcodeServlet;
import it.citel.postel.commonLib.constants.ScatolaCostants;
import it.citel.postel.commonLib.rest.model.ResponseDynamicTableObj;

public class CreatePdf {

	    private static final Logger log = LogManager.getLogger(CreaBarcodeServlet.class);
	   
	    public static final Chunk NEWLINE = new Chunk("\n");
	    
	    public ByteArrayInputStream creaPdfDettagliOScatole(ResponseDynamicTableObj  dettaglioScatola, String tipoScatolaTypeID, long tipoLavorazione) throws  Exception {

			ByteArrayOutputStream out = new ByteArrayOutputStream();
	    	String codiceScatolaGme= "";
	    	String codiceScatola= "";
	    	String statoScatola="";
	    	String numero= "";
	    	String tipoScatola="";
	 
			List<Map<String, Object>> content= dettaglioScatola.getRowContent();

			if (content != null && content.size() >0) {
				Map<String, Object> row  = content.get(0);
				codiceScatolaGme = (String)row.get("CODICE_SCATOLA_GME");
				codiceScatola = (String)row.get("CODICE_SCATOLA");
				statoScatola=(String)row.get("STATO_SCATOLA");
				tipoScatola=(String) row.get("TIPO_SCATOLA");
				if ((String) row.get("NUMERO_SCATOLA") != null) {
					numero= (String) row.get("NUMERO_SCATOLA");
				}
			}
			
			try {
				Document document = new Document();
				PdfWriter.getInstance(document, out);
				document.open();
				document.add( Chunk.NEWLINE );
			
				addBarCode(document, codiceScatolaGme);
				document.add( Chunk.NEWLINE );
				
				Paragraph par = new Paragraph();
				par.setFont(FontFactory.getFont(null,7, Font.NORMAL, BaseColor.BLACK));
				par.setAlignment(Element.ALIGN_CENTER);
				Chunk space = new Chunk("  ");
				String identificativo=("Identificativo: "+codiceScatolaGme);
				par.add(identificativo);
				par.add(space);
				String codice=("Codice: "+codiceScatola);
				par.add(codice);
				par.add(space);
				if (numero!=null && numero.length()>0) {
					String numberId = ("Numero: "+numero);
					par.add(numberId);
				}
				document.add(par);
				
				Paragraph par2 = new Paragraph();
				par2.setFont(FontFactory.getFont(null,7,Font.NORMAL, BaseColor.BLACK));
				par2.setAlignment(Element.ALIGN_CENTER);
				String tipoDoc=("Tipo scatola : "+tipoScatola);
				par2.add(tipoDoc);
				par2.add(space);
				String stato=("Stato: "+statoScatola);
				par2.add(stato);
//				document.add(par2);
				par2.add(space);
				String totDocumenti=("Totale documenti: "+dettaglioScatola.getTotalRow());
				par2.add(totDocumenti);
				document.add(par2);
				document.add( Chunk.NEWLINE );
			
				PdfPTable table = new PdfPTable(4);
				table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
				table.setWidthPercentage(100);
				
				if(tipoLavorazione == 2 && ScatolaCostants.ID_TIPO_MATERIALITA_CONFORME.equals(tipoScatolaTypeID) ) {
					table = createPdfTableConfromeMesso(content);
				}else if (ScatolaCostants.ID_TIPO_MATERIALITA_CONFORME.equals(tipoScatolaTypeID) 
						|| ScatolaCostants.ID_TIPO_MATERIALITA_NON_CONFORME.equals(tipoScatolaTypeID) 
						||  ScatolaCostants.ID_TIPO_ANOMALIA_NON_CONFORME.equals(tipoScatolaTypeID)) {
					table = createPdfTableANC(content);
				} else if (ScatolaCostants.ID_TIPO_ANOMALIE_SANABILI.equals(tipoScatolaTypeID)) {
					table = createPdfTableAS(content);
				} else if (ScatolaCostants.ID_TIPO_ANOMALIE_NON_SANABILI.equals(tipoScatolaTypeID)) {
					table = createPdfTableANS(content);
				} else {
					table = createPdfTablePI(content);
				}
				
				document.add(table);
				document.close();
				
			} catch (Exception e) {
				e.printStackTrace();
			}
	    	return new ByteArrayInputStream(out.toByteArray());
	    }
	    
	    public PdfPTable createPdfTableANC(List<Map<String, Object>> content) {
			PdfPTable table = new PdfPTable(4);
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
			table.setWidthPercentage(100);		
			table.addCell(new Paragraph(" POSIZIONE IN SCATOLA ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("COD.OGGETTO ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("STATO DOCUMENTO ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
		    table.addCell(new Paragraph("DATA SCANSIONE ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.setHeaderRows(1);
			PdfPCell[] cells = table.getRow(0).getCells(); 
			for (int j=0;j<cells.length;j++){
			   cells[j].setBackgroundColor(BaseColor.LIGHT_GRAY);
			}
			for (Map<String, Object> row : content ) {
				Double posizioneScatola=(Double)row.get("POSIZIONE_IN_SCATOLA");
				Integer posSca=Double.valueOf(posizioneScatola).intValue();
				String codOggetto=(String)row.get("COD_OGGETTO");
				String statoDoc=(String)row.get("STATO_DOCUMENTO");
				String dataScansione=(String)row.get("DATA_SCANSIONE");
				if (dataScansione==null) {
					dataScansione = "";
				}
				table.addCell(new Paragraph( posSca.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( codOggetto.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( statoDoc.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( dataScansione.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			}
			return table;
	    }
	    
	    public PdfPTable createPdfTableAS(List<Map<String, Object>> content) {
			PdfPTable table = new PdfPTable(4);
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
			table.setWidthPercentage(100);		
			table.addCell(new Paragraph("CODICE SCATOLA ORIGINE", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("CODICE OGGETTO ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("TIPO ANOMALIA", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
		    table.addCell(new Paragraph("CODICE PICKING", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.setHeaderRows(1);
			PdfPCell[] cells = table.getRow(0).getCells(); 
			for (int j=0;j<cells.length;j++){
			   cells[j].setBackgroundColor(BaseColor.LIGHT_GRAY);
			}
			for (Map<String, Object> row : content ) {
				String codiceScatolaOrigine=(String)row.get("CODICE_SCATOLA_ORIGINE");
				String codOggetto=(String)row.get("CODICE_OGGETTO");
				String tipoAnomalia=(String)row.get("TIPO_ANOMALIA");
				String codicePicking=(String)row.get("CODICE_PICKING");
				table.addCell(new Paragraph( codiceScatolaOrigine, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( codOggetto, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( tipoAnomalia, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( codicePicking, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));			
			}
			return table;
	    }
	    
	    public PdfPTable createPdfTableANS(List<Map<String, Object>> content) {
	    	PdfPTable table = new PdfPTable(3);
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
			table.setWidthPercentage(100);		
			table.addCell(new Paragraph("CODICE SCATOLA ORIGINE", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("CODICE OGGETTO ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
		    table.addCell(new Paragraph("CODICE PICKING", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.setHeaderRows(1);
			PdfPCell[] cells = table.getRow(0).getCells(); 
			for (int j=0;j<cells.length;j++){
			   cells[j].setBackgroundColor(BaseColor.LIGHT_GRAY);
			}
			for (Map<String, Object> row : content ) {
				String codiceScatolaOrigine=(String)row.get("CODICE_SCATOLA_ORIGINE");
				String codOggetto=(String)row.get("CODICE_OGGETTO");
				String codicePicking=(String)row.get("CODICE_PICKING");
				table.addCell(new Paragraph( codiceScatolaOrigine, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( codOggetto, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( codicePicking, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));			
			}
			return table;
	    }
	    
	    public PdfPTable createPdfTablePI(List<Map<String, Object>> content) {
	    	
//	    	PdfPTable table = new PdfPTable(5);
	    	
	    	float[] columnWidths = {2, 5, 2, 2, 2};
	        PdfPTable table = new PdfPTable(columnWidths);
	        
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
			table.setWidthPercentage(100);		
			table.addCell(new Paragraph(" POSIZIONE IN SCATOLA ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("DATAMATRIX/COD. OGGETTO ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("STATO DOCUMENTO ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
		    table.addCell(new Paragraph("DATA SCANSIONE ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
		    table.addCell(new Paragraph("ID PRENOTAZIONE ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.setHeaderRows(1);
			PdfPCell[] cells = table.getRow(0).getCells(); 
			for (int j=0;j<cells.length;j++){
			   cells[j].setBackgroundColor(BaseColor.LIGHT_GRAY);
			}
			for (Map<String, Object> row : content ) {
				Double posizioneScatola=(Double)row.get("POSIZIONE_IN_SCATOLA_SCAN");
				Integer posSca=Double.valueOf(posizioneScatola).intValue();
				String datamatrix=(String)row.get("DATAMATRIX");
				String statoDoc=(String)row.get("STATO_DOCUMENTO");
				String dataScansione=(String)row.get("DATA_SCANSIONE");
				String idPrenotazione=(String)row.get("ID_PRENOTAZIONE");
				if (dataScansione==null) {
					dataScansione = "";
				}
				table.addCell(new Paragraph( posSca.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( datamatrix.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( statoDoc.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( dataScansione.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( idPrenotazione.toString(), FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			}
			return table;
	    }
	    
	    
	    public PdfPTable createPdfTableConfromeMesso(List<Map<String, Object>> content) {
	    	PdfPTable table = new PdfPTable(6);
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
			table.setWidthPercentage(100);		
			table.addCell(new Paragraph("CODICE PLICO", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("CODICE OGGETTO ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
		    table.addCell(new Paragraph("TIPO DOCUMENTO", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
		    table.addCell(new Paragraph("STATO DOCUMENTO", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.addCell(new Paragraph("DATA SCANSIONE ", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
		    table.addCell(new Paragraph("POSIZIONE SCATOLA", FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
			table.setHeaderRows(1);
			PdfPCell[] cells = table.getRow(0).getCells(); 
			for (int j=0;j<cells.length;j++){
			   cells[j].setBackgroundColor(BaseColor.LIGHT_GRAY);
			}
			for (Map<String, Object> row : content ) {
				String codicePlico=(String)row.get("CODICE_PLICO");
				String codOggetto=(String)row.get("COD_OGGETTO");
				String tipoDocumento=(String)row.get("TIPO_DOCUMENTO");
				String statoDocumento=(String)row.get("STATO_DOCUMENTO");
				String dataScansione=(String)row.get("DATA_SCANSIONE");
				String posizioneInScatola= row.get("POSIZIONE_IN_SCATOLA").toString();
				table.addCell(new Paragraph( codicePlico, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( codOggetto, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( tipoDocumento, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));	
				table.addCell(new Paragraph( statoDocumento, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( dataScansione, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));
				table.addCell(new Paragraph( posizioneInScatola, FontFactory.getFont(null, 7, Font.NORMAL, BaseColor.BLACK)));	
			}
			return table;
	    }
	    
	    private void addBarCode(Document document, String codiceScatolaGme)
	            throws Exception {
	    
	    	   BarcodeUtility util = new BarcodeUtility(Costanti.BARCODE_CONFIGURATION_FILE); 
	    	   ByteArrayOutputStream baos = util.getBarcodeStream(codiceScatolaGme);
	    	   Image maimg = Image.getInstance(baos.toByteArray());	
	           maimg.setAlignment(Image.MIDDLE);
	           maimg.scalePercent(70);
	         
	           document.add(maimg);
			   document.add( Chunk.NEWLINE );
	    	   
	    }
	    
}
	    
	