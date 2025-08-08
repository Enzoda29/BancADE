package it.citel.postel.bancarizzazioneGUI.util;

import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.Charset;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.soap.SOAPMessage;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.io.output.ByteArrayOutputStream;

public class UtilWS {

	public static String getSoapMessageAsString(SOAPMessage message) {
		ByteArrayOutputStream os = null;
		try {
			os = new ByteArrayOutputStream();
			message.writeTo(os);
			os.close();
			return new String(os.toByteArray(), Charset.forName("UTF-8"));
		} catch (Exception e) {
			return null;
		}
		finally {
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static byte[] getSoapMessageAsByte(SOAPMessage message) {
		ByteArrayOutputStream os = null;
		try {
			os = new ByteArrayOutputStream();
			message.writeTo(os);
			os.close();
			return os.toByteArray();
		} catch (Exception e) {
			return null;
		}
		finally {
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}


	public void indentXml (Source source) throws TransformerFactoryConfigurationError, TransformerException {
		Transformer transformer = TransformerFactory.newInstance().newTransformer();

		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");

		transformer.transform(source, new StreamResult(System.out));
	}

	public String xmlFromObject(Object obj) throws JAXBException {
		if(obj == null) return null;

		JAXBContext ctx = JAXBContext.newInstance(obj.getClass());

		Marshaller marsh = ctx.createMarshaller();
		marsh.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

		StringWriter sw = new StringWriter();
		marsh.marshal(obj, sw);

		return sw.toString();
	}
}
