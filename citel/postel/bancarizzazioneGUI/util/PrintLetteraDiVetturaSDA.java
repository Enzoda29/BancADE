package it.citel.postel.bancarizzazioneGUI.util;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.InetSocketAddress;
import java.net.MalformedURLException;
import java.net.Proxy;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;
import javax.xml.bind.DatatypeConverter;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.namespace.QName;
import javax.xml.soap.MessageFactory;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPHeader;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;

import org.apache.axis.soap.SOAPConnectionImpl;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import it.citel.postel.commonLib.objects.spedizione.sda.AnagraficaSpedizioneObj;
import it.citel.postel.commonLib.objects.spedizione.sda.Ldv;
import it.citel.postel.commonLib.objects.spedizione.sda.ReturnRestStampaLdvSDA;
import it.citel.postel.commonLib.objects.spedizione.sda.StampaLdvSDAObj;
import it.citel.postel.commonLib.rest.model.RequestPersistGetLDVFromWSStampaSDA;
import it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DoIt;
import it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DoItResponse;
import it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.ObjectFactory;
import it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.SpedizioneActionService;

@Service
public class PrintLetteraDiVetturaSDA {

	static final Logger log = LogManager.getLogger(PrintLetteraDiVetturaSDA.class);

	@Autowired private DevRestConstants devRestConstants;
	@Autowired private PropertiesUtil prop ;


	private final static String XML_RESPONSE_STAMPA_ESITO = "Body/doItResponse/return/outcome";
	private final static String XML_RESPONSE_STAMPA_BASE64 = "Body/doItResponse/return/documentoDiStampa";
	private final static String XML_RESPONSE_STAMPA_LDV = "Body/doItResponse/return/spedizioni/datiSpedizione/sezioneColli/colli/numero";
	private final static String XML_RESPONSE_STAMPA_RIF_INTERNO = "Body/doItResponse/return/spedizioni/datiSpedizione/datiGenerali/numRifInterno";
	private final static String XML_RESPONSE_STAMPA_ERRORE = "Body/doItResponse/return/messages/messages/message";

	/**
	 *  metodo usato per la richiesta REST
	 */
	public String parseInJsonRequestSDA(Ldv ldv) {

		StampaLdvSDAObj stampa = new StampaLdvSDAObj();
		stampa.setFormatoStampa("A4");
		ldv.getDatiSpedizione().setCodiceServizio("S09");
		ldv.getMittente().setTipoAnagrafica("S");
		ldv.getDestinatario().setTipoAnagrafica("S");




		//datiSpedizione.datiGenerali.dataSpedizione
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		String dateString = format.format(new Date());
		ldv.getDatiSpedizione().getDatiGenerali().setDataSpedizione(dateString);

		stampa.setLdv(ldv);
		Gson gson = new Gson();
		log.debug("json return -->" +gson.toJson(stampa));


		ObjectMapper mapper = new ObjectMapper();

		//Object to JSON in String
		String jsonInString = "";
		try {
			jsonInString = mapper.writeValueAsString(stampa);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonInString;
		//		return jsonInString.replaceAll("null", "\"\"");
		//		return gson.toJson(stampa);
	}

	/**
	 *  metodo usato per la richiesta REST
	 */
	public RequestPersistGetLDVFromWSStampaSDA connectAndSendRequestREST (String jsonRequest) {
		RequestPersistGetLDVFromWSStampaSDA responseCall = new RequestPersistGetLDVFromWSStampaSDA();

		String username = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_USER;
		String password = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_PWD;
		//		String storeKey =  "classpath:C:\\Users\\Utente\\Desktop\\collaudo-ws.sda.it.cer";
		String pathKeyStore = devRestConstants.SDA_SPEDIZIONE_CERT_PATH_KEYSTORE;
		final String pwdKeyStore = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_PWD;


		try 
		{ 
			//			String pathKeyStore = "C:\\Program Files\\Java\\jdk1.8.0_211\\jre\\lib\\security\\jssecacerts";

			System.setProperty("javax.net.ssl.keyStore", pathKeyStore);
			System.setProperty("javax.net.ssl.keyStorePassword", "sdacoll");
			System.setProperty("javax.net.ssl.trustStore", pathKeyStore);
			System.setProperty("javax.net.ssl.trustStorePassword","sdacoll");

			URL uc = new URL(devRestConstants.SDA_SPEDIZIONE_CERT_PATH_KEYSTORE_PASSWORD);;

			URLConnection connection = uc.openConnection(); 
			connection.setDoOutput(true);
			//			 connection.setRequestMethod("POST");
			@SuppressWarnings("restriction")
			String authorization = new sun.misc.BASE64Encoder().encode((username + ":" + password).getBytes());
			//			connection.setRequestProperty("Authorization", "Basic " + PasswordUtil.base64Encode(username+":"+password));
			connection.setRequestProperty("Authorization", "Basic " + authorization);
			connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			connection.setRequestProperty("Accept", "application/json");

			try {
				OutputStream os = connection.getOutputStream();
				byte[] input = jsonRequest.getBytes("utf-8");
				os.write(input, 0, input.length);
				log.debug("URL: " + devRestConstants.SDA_SPEDIZIONE_STAMPA_REST_ENDPOINT);
				log.debug("JSON request: " + os.toString());

				//			    responseCall.setRequest(input);

				try(BufferedReader br = new BufferedReader(
						new InputStreamReader(connection.getInputStream(), "utf-8"))) {
					StringBuilder response = new StringBuilder();
					String responseLine = null;
					while ((responseLine = br.readLine()) != null) {
						response.append(responseLine.trim());
					}
					log.debug(response.toString());
					byte[] jsonData = response.toString().getBytes();
					//					    responseCall.setResponse(jsonData);
					ObjectMapper mapper = new ObjectMapper();
					try {
						ReturnRestStampaLdvSDA re = mapper.readValue(jsonData, ReturnRestStampaLdvSDA.class);
						//					    	responseCall.setResponseObj(re);
						//					    	Gson gson = new GsonBuilder().create();
						//					    	ReturnRestStampaLdvSDA address= gson.fromJson(response.toString(), ReturnRestStampaLdvSDA.class);
						//					    	System.out.print(address);
					}catch (Exception e) {
						responseCall.setErrorMessage(e.getMessage());
						log.error(e.getMessage());
					}


				}



			} catch (MalformedURLException e1) {
				responseCall.setErrorMessage(e1.getMessage());
				log.error("Error: " + e1.getMessage());
				e1.printStackTrace();
			}catch (Exception e) {
				responseCall.setErrorMessage(e.getMessage());
				log.error("Error: " + e.getMessage());
				e.printStackTrace();
			}
		} 
		catch (Exception e) 
		{ 
			responseCall.setErrorMessage(e.getMessage());
			log.debug("Error: " + e.getMessage());

		} 
		return responseCall;
	}


	/**
	 * 
	 * @param ldvForm - input from front end
	 * @return - response ws stampa sda
	 * @throws Exception
	 */
	public RequestPersistGetLDVFromWSStampaSDA getLetteraDivetturaSDAByWsSoap(Ldv ldvForm, String url_wsdl_location) {

		RequestPersistGetLDVFromWSStampaSDA ret = new RequestPersistGetLDVFromWSStampaSDA();
		ret.setNumRifInterno(ldvForm.getDatiSpedizione().getDatiGenerali().getNumRifInterno()); //id spedizione
		try {

			log.debug("START WS SERVIZIO STAMPA SDA...");


			//set object form in Object for Request Soap
			DoIt  doItRequest = setRequestWSStampaLDV(ldvForm);
			//build soapRequest
			SOAPMessage SoapMessageRequest = createSoapMessageRequestWS(doItRequest, url_wsdl_location);
			ret.setRequestXml(UtilWS.getSoapMessageAsByte(SoapMessageRequest));

			//connect to services and return soapMessage response
			ret = sendRequestStampaSDA(SoapMessageRequest);
			//		log.info( "SoapMessageResponse: " + UtilWS.getSoapMessageAsString(SoapMessageResponse) ) ;
			//		ret.setResponseXml(UtilWS.getSoapMessageAsByte(SoapMessageResponse));
			//		ret.setResponseXml(UtilWS.getSoapMessageAsString(SoapMessageRequest).getBytes());
			//convert SoapMessage response in object response
			//		DoItResponse doItResponse = parseSoapMessageIntoDoItResponse(SoapMessageResponse);

			//TODO: settare esito sia true che false


			//set pdf in byte
			//		if (doItResponse.getReturn().getDocumentoDiStampa() != null) {
			//			ret.setDocumentoDiStampa(doItResponse.getReturn().getDocumentoDiStampa());
			//		}
			//		
			//		
			//		if(doItResponse.getReturn().getOutcome().toUpperCase().compareTo("OK") == 0) {
			//			if (doItResponse.getReturn().getSpedizioni().get(0).getDatiSpedizione().getSezioneColli().getColli().get(0).getNumero() != null) {
			//				//set colli.numero (identificativo ldv from response )
			//				ret.setIdentificativoLetteraDiVettura(doItResponse.getReturn().getSpedizioni().get(0).getDatiSpedizione().getSezioneColli().getColli().get(0).getNumero());
			//			}
			//			ret.setEsitoCallWsSoap(true);
			//		}else {
			//			ret.setErrorMessage(doItResponse.getReturn().getMessages().get(0).getMessages().get(0).getMessage());
			//			ret.setEsitoCallWsSoap(false);
			//		}

		} catch (Exception e) {
			log.error("Expetion: " +  e.getMessage());
			ret.setEsitoCallWsSoap(false);
			ret.setErrorMessage(e.getMessage());
		}

		log.debug("END WS SERVIZIO STAMPA SDA...");

		return ret;
	}

	/**
	 * 1 - set object form in Object for Request Soap
	 */
	public it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DoIt setRequestWSStampaLDV(Ldv ldvForm) {

		//		log.debug("Convert request into object for request soap message");
		// Crea JAXB request object
		ObjectFactory objFactory = new ObjectFactory();

		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DoIt doItWS = objFactory.createDoIt();
		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Ldv ldvWS = objFactory.createLdv();
		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DatiSpedizione datiSpedizioneWS = objFactory.createDatiSpedizione();
		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Accessori accessoriWS = objFactory.createAccessori();
		/* 08/06/2022 : deleted (FIX_STAMPA_LDV_COLLI) */
		/*
		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Colli colliWS = objFactory.createColli();
		 */
		/* 08/06/2022 : deleted (FIX_STAMPA_LDV_COLLI) */
		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DoIt.Arg0 arg0WS = objFactory.createDoItArg0();
		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.SezioneColli sezioneColliWS = objFactory.createSezioneColli();
		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Mittente mittenteWS = objFactory.createMittente();
		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Destinatario destinatarioWS = objFactory.createDestinatario();

		it.citel.postel.commonLib.objects.spedizione.sda.DatiSpedizioneObj datiSpedizioneForm = ldvForm.getDatiSpedizione();
		datiSpedizioneWS.setAccessori(accessoriWS);//
		datiSpedizioneWS.setCodiceServizio(datiSpedizioneForm.getCodiceServizio());

		it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DatiGenerali datiGeneraliWS = objFactory.createDatiGenerali();

		datiGeneraliWS.setCodContenuto(datiSpedizioneForm.getDatiGenerali().getContenuto());
		datiGeneraliWS.setDataSpedizione(datiSpedizioneForm.getDatiGenerali().getDataSpedizione());
		datiGeneraliWS.setNote(datiSpedizioneForm.getDatiGenerali().getNote());
		datiGeneraliWS.setNumRifInterno(datiSpedizioneForm.getDatiGenerali().getNumRifInterno());
		datiSpedizioneWS.setDatiGenerali(datiGeneraliWS);

		/* 08/06/2022 : modified (FIX_STAMPA_LDV_COLLI) */
		List<it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Colli> colliList = new ArrayList<it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Colli>();
		for(int ct = 0; ct < datiSpedizioneForm.getSezioneColli().getColli().size(); ct++) {
			it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Colli colliWS = objFactory.createColli();
			colliWS.setAltezza(datiSpedizioneForm.getSezioneColli().getColli().get(ct).getAltezza());
			colliWS.setLarghezza(datiSpedizioneForm.getSezioneColli().getColli().get(ct).getLarghezza());
			colliWS.setPeso(datiSpedizioneForm.getSezioneColli().getColli().get(ct).getPeso().toString());
			colliWS.setProfondita(datiSpedizioneForm.getSezioneColli().getColli().get(ct).getProfondita());			
			colliList.add(colliWS);
		}
		/*
		colliWS.setAltezza(datiSpedizioneForm.getSezioneColli().getColli().get(0).getAltezza());
		colliWS.setLarghezza(datiSpedizioneForm.getSezioneColli().getColli().get(0).getLarghezza());
		colliWS.setPeso(datiSpedizioneForm.getSezioneColli().getColli().get(0).getPeso().toString());
		colliWS.setProfondita(datiSpedizioneForm.getSezioneColli().getColli().get(0).getProfondita());

		List<it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Colli> colliList = new ArrayList<it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.Colli>();
		colliList.add(colliWS);
		 */
		/* 08/06/2022 : modified (FIX_STAMPA_LDV_COLLI) */
		sezioneColliWS.setColli(colliList);;
		datiSpedizioneWS.setSezioneColli(sezioneColliWS);

		ldvWS.setDatiSpedizione(datiSpedizioneWS);

		AnagraficaSpedizioneObj mittente = ldvForm.getMittente();

		mittenteWS.setCap(mittente.getCap());
		mittenteWS.setCodNazione(mittente.getCodNazione());
		//		mittenteWS.setCodStato(mittente.);
		mittenteWS.setEmail(mittente.getEmail());
		mittenteWS.setIdentificativoFiscale(mittente.getIdentificativoFiscale());
		mittenteWS.setIndirizzo(mittente.getIndirizzo());
		mittenteWS.setIntestatario(mittente.getIntestatario());
		mittenteWS.setLocalita(mittente.getLocalita());
		mittenteWS.setProvincia(mittente.getProvincia());
		mittenteWS.setReferente(mittente.getReferente());
		mittenteWS.setTelefono(mittente.getTelefono());
		mittenteWS.setTipoAnagrafica(mittente.getTipoAnagrafica());

		ldvWS.setMittente(mittenteWS);

		AnagraficaSpedizioneObj destinatario = ldvForm.getDestinatario();

		destinatarioWS.setCap(destinatario.getCap());
		destinatarioWS.setCodNazione(destinatario.getCodNazione());
		//		destinatarioWS.setCodStato(destinatario.);
		destinatarioWS.setEmail(destinatario.getEmail());
		destinatarioWS.setIdentificativoFiscale(destinatario.getIdentificativoFiscale());
		destinatarioWS.setIndirizzo(destinatario.getIndirizzo());
		destinatarioWS.setIntestatario(destinatario.getIntestatario());
		destinatarioWS.setLocalita(destinatario.getLocalita());
		destinatarioWS.setProvincia(destinatario.getProvincia());
		destinatarioWS.setReferente(destinatario.getReferente());
		destinatarioWS.setTelefono(destinatario.getTelefono());
		destinatarioWS.setTipoAnagrafica(destinatario.getTipoAnagrafica());

		ldvWS.setDestinatario(destinatarioWS);
		arg0WS.setFormatoStampa("A4");
		arg0WS.setLdv(ldvWS);;
		doItWS.setArg0(arg0WS);


		//		datiSpedizioneWS.set
		//		datiSpedizioneWS.set
		//		datiSpedizioneWS.set
		//		datiSpedizioneWS.set
		return doItWS;

	}

	//no
	public void connectAndSendRequestSOAP(String endpoint, String wsBindingId,  it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DoIt doItRequest) throws JAXBException, SOAPException {
		log.debug("INIZIO - Web Service Stampa per servizio Extralarge SDA...");
		SOAPConnection soapConn = null;
		String username = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_USER;
		String password = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_PWD;
		try{
			SpedizioneActionService spedizioneActionService = new SpedizioneActionService();
			DoItResponse doItResponse = null;
			QName serviceName = spedizioneActionService.getServiceName();
			QName SERVICE = spedizioneActionService.SERVICE;
			QName portName = spedizioneActionService.SpedizioneActionPort;

			javax.xml.ws.Service service = javax.xml.ws.Service.create(SERVICE);

			service.addPort(portName, wsBindingId, endpoint);//http://schemas.xmlsoap.org/wsdl/soap/http
			JAXBContext context = JAXBContext.newInstance(DoIt.class);

			MessageFactory mf = MessageFactory.newInstance();
			SOAPMessage requestMsg = mf.createMessage();
			SOAPBody body = requestMsg.getSOAPBody();

			Marshaller marshaller = context.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			marshaller.marshal(doItRequest, body);
			requestMsg.saveChanges();
			MimeHeaders headers = requestMsg.getMimeHeaders();

			String soapAction="";// nel WSDL Ã¨ vuoto -- fare test!
			headers.addHeader("SOAPAction", "\""+soapAction+"\"");

			String authorization = new sun.misc.BASE64Encoder().encode((username + ":" + password).getBytes());
			headers.addHeader("Authorization", "Basic " + authorization);

			//        wsDetail.setXmlWsRequest(getSoapMessageAsByte(requestMsg));
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			try {
				requestMsg.writeTo(out);
				//			log.debug("Creato il messaggio di richiesta : " + requestMsg.writeTo(out));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			log.debug("Creato il messaggio di richiesta : " + requestMsg);

			log.debug("Inizio richiesta di connessione");
			soapConn = SOAPConnectionFactory.newInstance().createConnection();
			SOAPMessage responseMsg = soapConn.call(requestMsg, endpoint);	

			JAXBContext contextResp = JAXBContext.newInstance(DoItResponse.class);
			Unmarshaller  unmarshaller = contextResp.createUnmarshaller();
			DoItResponse response = null;
			response =  (DoItResponse) unmarshaller.unmarshal(responseMsg.getSOAPBody().extractContentAsDocument());


			log.debug("Fine richiesta di connessione");
		}finally {
			if (soapConn != null) {
				try {
					soapConn.close();
				} catch (SOAPException e) {
					e.printStackTrace();
				}
			}
		}
		log.debug("FINE -  Web Service Stampa per servizio Extralarge SDA...");

	}

	//1 - build soapRequest
	SOAPMessage createSoapMessageRequestWS(it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV.DoIt doItRequest, String url_wsdl_location) throws Exception {

		log.debug("INIZIO - Web Service Stampa per servizio Extralarge SDA...");
		SpedizioneActionService spedizioneActionService = new SpedizioneActionService();

		SOAPConnection soapConn = null;
		String usernameWS = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_USER;
		String passwordWS = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_PWD;
		String endpoint = "https://collaudo-ws.sda.it:443/STAMPA-LDV" ;//devRestConstants.SDA_SPEDIZIONE_STAMPA_SOAP_ENDPOINT;
		String wsBindingId ="http://schemas.xmlsoap.org/wsdl/soap/http";


		//		spedizioneActionService.setUrl_wsdl_location(url_wsdl_location);

		DoItResponse doItResponse = null;
		QName serviceName = spedizioneActionService.getServiceName();
		QName SERVICE = spedizioneActionService.SERVICE;
		QName portName = spedizioneActionService.SpedizioneActionPort;

		javax.xml.ws.Service service = javax.xml.ws.Service.create(SERVICE);

		service.addPort(portName, wsBindingId, endpoint);
		JAXBContext context = JAXBContext.newInstance(DoIt.class);

		MessageFactory messageFactory = MessageFactory.newInstance();
		SOAPMessage soapMessage = messageFactory.createMessage();

		SOAPPart soapPart = soapMessage.getSOAPPart();

		SOAPEnvelope envelope = soapPart.getEnvelope();
		SOAPHeader soapHeader = soapMessage.getSOAPHeader();

		envelope.setPrefix("soapenv");
		envelope.removeNamespaceDeclaration("SOAP-ENV");
		//	    envelope.addNamespaceDeclaration("soap", serverURI);
		//	    envelope.addNamespaceDeclaration("soapenv", "http://schemas.xmlsoap.org/soap/envelope/");

		soapHeader.setPrefix("soapenv");

		String authorization = new sun.misc.BASE64Encoder().encode((usernameWS + ":" + passwordWS).getBytes());
		//		String authorization = "" ;
		String soapAction = "";
		MimeHeaders headers = soapMessage.getMimeHeaders();
		headers.setHeader("Content-Type", "text/xml; charset=utf-8");
		headers.addHeader("Authorization", "Basic " + authorization);
		//		headers.addHeader("SOAPAction", soapAction);

		SOAPBody body = soapMessage.getSOAPBody();
		body.removeNamespaceDeclaration("SOAP-ENV");
		body.setPrefix("soapenv");

		Marshaller marshaller = context.createMarshaller();
		//		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
		marshaller.marshal(doItRequest, body);

		soapMessage.saveChanges();

		//		soapMessage.writeTo(System.out);
		log.info("Request: " + UtilWS.getSoapMessageAsString(soapMessage));
		log.info("Fine Creazione soap message request.");
		return soapMessage;
	}

	private RequestPersistGetLDVFromWSStampaSDA sendRequestStampaSDA(SOAPMessage requestMsg) {
		String endpoint = devRestConstants.SDA_SPEDIZIONE_STAMPA_SOAP_ENDPOINT ;
		log.info("soapUrl: " + endpoint);
		RequestPersistGetLDVFromWSStampaSDA response = new RequestPersistGetLDVFromWSStampaSDA() ;
		SOAPConnection connection = null ;
		Socket socket = null ;
		
		//String recovered = "" ;

		String proxyHost = prop.PROXY_HOST ;
		int proxyPort = Integer.parseInt(prop.PROXY_PORT) ;

		//		String proxyHost = System.getProperty("http.proxyHost") ;
		//		String proxyPort = System.getProperty("http.proxyPort") ;
		//	
		//		System.setProperty("http.proxyHost"				, "rm-mswg-vip.postel.it"	); 
		//		System.setProperty("http.proxyPort"				, "9090"					); 
		//		System.setProperty("java.net.useSystemProxies"	, "true"					);

		long start = 0L ;
		
		try {
			log.info( "request soap : " + UtilWS.getSoapMessageAsString(requestMsg) ) ;
			//			SOAPConnectionFactory soapFactory = SOAPConnectionFactory.newInstance() ;
			//			connection = soapFactory.createConnection() ;

			connection = new SOAPConnectionImpl() ;

			log.info( "Open socket on host: " + proxyHost + " and port: " + proxyPort );

			socket = new Socket() ;
			SocketAddress address = new InetSocketAddress( proxyHost , proxyPort ) ;

			log.info( "Opening socket" ) ;
			socket.connect( address , 600000 ) ;
			log.info( "Socket open at: " + socket.getInetAddress() ) ;

			Proxy proxy = new Proxy( Proxy.Type.HTTP , new InetSocketAddress( socket.getInetAddress() , proxyPort ) ) ;
			URL url = new URL( null , endpoint , new sun.net.www.protocol.https.Handler() ) ;

			log.info( "Proxy created on address:" + proxy.address() ) ;

			HttpsURLConnection uc = (HttpsURLConnection) url.openConnection(proxy);
			uc.setDoInput(true);
			uc.setDoOutput(true);
			uc.setRequestMethod( "POST" );

			String username = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_USER;
			String password = devRestConstants.SDA_SPEDIZIONE_STAMPA_AUTH_PWD;

			String userCredentials = username + ":" + password;
			String encoded = DatatypeConverter.printBase64Binary(userCredentials.getBytes());		    
			String basicAuth = "Basic " + encoded;
			uc.setRequestProperty ("Authorization", basicAuth);

			log.debug( "START" ) ;
			start = System.currentTimeMillis() ;
			
			uc.connect();
			log.info( "Connessione aperta: " + uc.toString() ) ;
			
			//			response = connection.call(requestMsg, uc) ;

			OutputStream out = uc.getOutputStream();

			Writer wout = new OutputStreamWriter(out);

			wout.write(UtilWS.getSoapMessageAsString(requestMsg));  

			wout.flush();
			wout.close();

			String pathResponse = prop.TEMP_FILE_PATH ;

			OutputStream os = new FileOutputStream( pathResponse ) ;

			//log.info("Receiving SOAP response, uc:" + uc.toString() );

			InputStream in = uc.getInputStream();
			
			//log.info( "in length:" + in.toString() ) ;
			
			log.info( "elapsed (before write): " + ( System.currentTimeMillis() - start ) );
			
			int c;
			while ((c = in.read()) != -1) {
			//	recovered += (char)c ;
				os.write(c);
			}

			//		    response = MessageFactory.newInstance().createMessage( null , in ) ;

			in.close();

			log.info("Received SOAP response");

			uc.disconnect();

			//			os.flush();
			//		    os.close();

			String esito = DOMUtility.getElementValue(pathResponse, XML_RESPONSE_STAMPA_ESITO);
			String ldv = DOMUtility.getElementValue(pathResponse, XML_RESPONSE_STAMPA_LDV);
			String rifInterno = DOMUtility.getElementValue(pathResponse, XML_RESPONSE_STAMPA_RIF_INTERNO);
			byte[] pdfContent = DOMUtility.getElementDecode64Bytes(pathResponse, XML_RESPONSE_STAMPA_BASE64);
			byte[] responseStampa = IOUtility.getBytes(pathResponse);
			String errore = DOMUtility.getElementValue(pathResponse, XML_RESPONSE_STAMPA_ERRORE);

			log.info("esito : " + esito);
			//log.info("ldv : " + ldv);
			if(pdfContent != null)
				log.info("pdf : " + pdfContent.length);

			if(esito.equalsIgnoreCase("OK") == false)
				throw new Exception("Esito " + esito + " : " + errore);		    

			if(ldv.length() == 0)
				throw new Exception("Lettera di vettura non caricata dal web service");		    

			if(pdfContent == null)
				throw new Exception("Contenuto dati lettera di vettura nullo");		    

//			response = new RequestPersistGetLDVFromWSStampaSDA() ;

			response.setDocumentoDiStampa( pdfContent );
			if( errore != null && !errore.equals( "" ) ) {
				response.setErrorMessage( errore ) ;
				response.setEsitoCallWsSoap( false );
			}
			else {
				response.setEsitoCallWsSoap( true );
			}
			
			response.setIdentificativoLetteraDiVettura( ldv ) ;
			response.setNumRifInterno( rifInterno ) ;

			response.setResponseXml(responseStampa);
			response.setRequestXml( UtilWS.getSoapMessageAsString(requestMsg).getBytes() ) ;

			//log.info( "Fine chiamata, response: " + response ) ;
			log.info( "Fine chiamata" ) ;
		}
		catch( Exception e ) {
			response.setEsitoCallWsSoap( false );
			response.setErrorMessage( e.getMessage() );
			log.error( "Exception : " + e , e ) ;
			log.info( "elapsed (error): " + ( System.currentTimeMillis() - start ) );
			//log.error( "recovered:" + recovered ) ;
		}
		finally {
			//			System.setProperty("http.proxyHost"	, proxyHost	!= null ? proxyHost	: ""); 
			//			System.setProperty("http.proxyPort"	, proxyPort	!= null ? proxyPort	: "");
			log.info( "elapsed: " + ( System.currentTimeMillis() - start ) );
			try {
				connection.close() ;
				socket.close();
			}
			catch( Exception e ) {
				log.error( "Problems closing connection" , e );
			}
		}

		return response ;
	}

	//3  - conversione soapMessage from serivice stampa extralarge in DoItResponse
	public DoItResponse parseSoapMessageIntoDoItResponse(SOAPMessage soapMessageResponse) {

		DoItResponse response = null;
		try {

			//conversione soapMessage in DoItResponse
			JAXBContext contextResp = JAXBContext.newInstance(DoItResponse.class);
			Unmarshaller  unmarshaller = contextResp.createUnmarshaller();


			SOAPBody vvv = soapMessageResponse.getSOAPBody();
			vvv.removeAttribute("xmlns:dlwmin");
			vvv.removeAttribute("xmlns:xsi");
			vvv.setPrefix("doItResponse");

			//			soapMessageResponse.writeTo(System.out);

			response = (DoItResponse) unmarshaller.unmarshal(soapMessageResponse.getSOAPBody().extractContentAsDocument());

		} catch (Exception e) {

			log.error("Errore: " + e.getMessage());

			log.debug("Error parse SoapMessageResponse in DoItResponse object. " + e.getMessage());
		}
		return response;
	}
}
