package it.citel.postel.bancarizzazioneGUI.util;

import java.util.List;

import javax.xml.bind.DatatypeConverter;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.Namespace;
import org.jdom2.input.SAXBuilder;

public class DOMUtility {

	public static boolean isWellFormed(String filePathXml) {
		boolean res = false;
		SAXBuilder builder;
		Document document;
		Element element;
		try {
			builder = new SAXBuilder();
			document = builder.build(filePathXml);
			element = document.getRootElement();
			element.detach();
			res = true;
		} catch(Exception e) {		
			//System.err.println(e);
		}
		document = null;
		builder = null;
		return res;
	}

	public static byte[] getElementDecode64Bytes(String filePathXml, String path) {
		byte[] res = null;
		Element element = getElement(filePathXml, path);
		if(element != null) {
			String base64 = element.getTextNormalize();
			try {
				res = DatatypeConverter.parseBase64Binary(base64);
			} catch(Exception e) {
				//System.err.println(e);
			}
		}
		return res;
	}		
	
	public static String getElementValue(String filePathXml, String path) {
		String res = "";
		Element element = getElement(filePathXml, path);
		if(element != null)
			res = element.getText();
		return res;
	}

	private static Element getElement(String filePathXml, String path) {
		SAXBuilder builder;
		Document document;
		Element element = null;
		try {
			builder = new SAXBuilder();
			document = builder.build(filePathXml);
			element = document.getRootElement();
			String paths[] = path.split("/");
			int i = 0;
			while(element != null && i < paths.length) {
				//System.out.println(element.getName() + " : " + element.getAttributeValue(paths[i]));
				removeNamespace(element);
				element = element.getChild(paths[i]);
				i++;
			}
		} catch(Exception e) {			
			//System.err.println(e);
		}
		document = null;
		builder = null;
		return element;
	}
	
	public static String getAttributeValue(String filePathXml, String path) {
		String res = "";
		return res;
	}

	private static void removeNamespace(Element element) {
		if(element != null) {
			List<?> elementi = element.getContent();
			for(int ct = 0; ct < elementi.size(); ct++) {
				if(elementi.get(ct) instanceof Element) {
					((Element)elementi.get(ct)).setNamespace(Namespace.NO_NAMESPACE);
				}
			}
		}
	}
	
	public static void main(String[] args) {
		String pathXml = "F:/dev/dematerializzazione/eqtmn3/doc/Corriere SDA/stampa_out.xml";
		boolean bres = DOMUtility.isWellFormed(pathXml);
		System.out.println(bres);
		String res = DOMUtility.getElementValue(pathXml, "Body/doItResponse/return/spedizioni/datiSpedizione/sezioneColli/colli/numero");
		System.out.println(res);
		byte[] bytes = DOMUtility.getElementDecode64Bytes(pathXml, "Body/doItResponse/return/documentoDiStampa");
		if(bytes != null)
			System.out.println(bytes.length);
		System.exit(0);
	}

	
}
