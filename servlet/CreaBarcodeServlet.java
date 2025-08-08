package it.citel.postel.bancarizzazioneGUI.servlet;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.krysalis.barcode4j.impl.code128.Code128Bean;
//import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import it.citel.postel.bancarizzazioneGUI.util.BarcodeUtility;
import it.citel.postel.bancarizzazioneGUI.util.Costanti;

@Controller
@RequestMapping("/CreaBarcodeServlet")
public class CreaBarcodeServlet {
    private static final Logger log = LogManager.getLogger(CreaBarcodeServlet.class);



    @RequestMapping(value = "", method = {RequestMethod.GET, RequestMethod.POST})
	public void getBarcode( @RequestParam("TEXT") String TEXT, HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.setProperty("java.awt.headless", "true");
		//String text = TEXT; //request.getParameter("TEXT");
		String code = request.getParameter("CODE");
		
		log.info("BARCODE_CONFIG: /barcode.xml");
		System.out.println("BARCODE_CONFIG: /barcode.xml");
		try {
			BarcodeUtility util = new BarcodeUtility(Costanti.BARCODE_CONFIGURATION_FILE);
			if (code != null) {
				util.setCode(Short.parseShort(code));
			}
			
			ByteArrayOutputStream baos = util.getBarcodeStream(TEXT);			
			response.setContentType("image/jpeg");
			ServletOutputStream responseOutputStream = response.getOutputStream();
			responseOutputStream.write(baos.toByteArray());
			responseOutputStream.flush();
			responseOutputStream.close();
		} catch (Exception e) {
			log.error("Exception: " + e);
		}

	}


}
