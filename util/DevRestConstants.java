package it.citel.postel.bancarizzazioneGUI.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@PropertySource("classpath:/restUrl.properties")
public class DevRestConstants {
	
	//end point login
	@Value("${endpoint.autorizzazione}") //BancarizzazioneSerrice/AutorizzazioneService 
	public String AUTORIZZAZIONE_BASE_URL;
	
	@Value("${endpoint.archiviazione}")
	public String ARCHIVIAZIONE_BASE_URL;
	
	//Gestione Anomalie service
	@Value("${endpoint.gestione}") 
	public String CONFIGURAZIONE_GESTIONE_AN_URL;

	
	//Bancarizzazione service
	@Value("${endpoint.bancarizzazioneService}")
	public String ROOT_BANCARIZZAZIONE_SERVICE;
	
	@Value("${bs.request.mapping.service.ricerca}")
	public String RICERCA;

	 @Value("Pallet")
	 public  String PALLET;

	@Value("${bs.request.mapping.service.common}")
	public String COMMON;
	
	@Value("${bs.request.mapping.service.monitor}")
	public String MONITOR;
	
	@Value("${bs.request.mapping.service.configurazione}")
	public String CONFIGURAZIONE;
	
	@Value("${bs.request.mapping.service.preaccettazione}")
	public String PREACCETTAZIONE;
	
	@Value("${bs.request.mapping.service.scatole}")
	public String SCATOLE;
	
	@Value("${bs.request.mapping.service.spedizioni}")
	public String SPEDIZIONI;
	
	@Value("${bs.request.mapping.service.materialita}")
	public String MATERIALITA;

	@Value("${bs.request.mapping.service.restituzioneScatoleAnomalie}")
	public String RESTITUZIONESCATOLEANOMALIE;
	
	@Value("${bs.request.mapping.service.restituzioneMaterialita}")
	public String RESTITUZIONE_MATERIALITA;
	
	@Value("${bs.request.mapping.service.normalizzazione}")
	public String NORMALIZZAZIONE;
	
	@Value("${bs.request.mapping.service.plichi}")
	public String PLICHI ;

	@Value("${bs.request.mapping.service.ddt}")
	public String DDT ;
	
	@Value("${bs.request.mapping.service.accounting}")
	public String ACCOUNTING ;
	


	//SDA - servizio Stampa Extra Large lettera di vettura
	@Value("${sda.ws.rest.spedizione.stampa.endpoint}")
	public String SDA_SPEDIZIONE_STAMPA_REST_ENDPOINT;
	
	@Value("${sda.ws.soap.spedizione.stampa.endpoint}")
	public String SDA_SPEDIZIONE_STAMPA_SOAP_ENDPOINT;
	
	@Value("${sda.ws.soap.stampa.auth.user}")
	public String SDA_SPEDIZIONE_STAMPA_AUTH_USER;
	
	@Value("${sda.ws.soap.spedizione.stampa.auth.pwd}")
	public String SDA_SPEDIZIONE_STAMPA_AUTH_PWD;
	
	@Value("${sda.ws.spedizione.stampa.cert.path.keystore}")
	public String SDA_SPEDIZIONE_CERT_PATH_KEYSTORE;
	
	@Value("${sda.ws.spedizione.stampa.cert.path.keystore.pwd}")
	public String SDA_SPEDIZIONE_CERT_PATH_KEYSTORE_PASSWORD;
	
    // To resolve ${} in @Value
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	@Override
	public String toString() {
		return "DevRestConstants [AUTORIZZAZIONE_BASE_URL=" + AUTORIZZAZIONE_BASE_URL + ", ARCHIVIAZIONE_BASE_URL="
				+ ARCHIVIAZIONE_BASE_URL + ", CONFIGURAZIONE_GESTIONE_AN_URL=" + CONFIGURAZIONE_GESTIONE_AN_URL
				+ ", ROOT_BANCARIZZAZIONE_SERVICE=" + ROOT_BANCARIZZAZIONE_SERVICE + ", RICERCA=" + RICERCA
				+ ", COMMON=" + COMMON + ", MONITOR=" + MONITOR + ", CONFIGURAZIONE=" + CONFIGURAZIONE
				+ ", PREACCETTAZIONE=" + PREACCETTAZIONE + ", SCATOLE=" + SCATOLE + ", SPEDIZIONI=" + SPEDIZIONI
				+ ", MATERIALITA=" + MATERIALITA + ", RESTITUZIONESCATOLEANOMALIE=" + RESTITUZIONESCATOLEANOMALIE
				+ ", RESTITUZIONE_MATERIALITA=" + RESTITUZIONE_MATERIALITA + ",NORMALIZZAZIONE="+ NORMALIZZAZIONE 
				+", SDA_SPEDIZIONE_STAMPA_REST_ENDPOINT=" + SDA_SPEDIZIONE_STAMPA_REST_ENDPOINT + ", SDA_SPEDIZIONE_STAMPA_SOAP_ENDPOINT="
				+ SDA_SPEDIZIONE_STAMPA_SOAP_ENDPOINT + ", SDA_SPEDIZIONE_STAMPA_AUTH_USER="
				+ SDA_SPEDIZIONE_STAMPA_AUTH_USER + ", SDA_SPEDIZIONE_STAMPA_AUTH_PWD=" + SDA_SPEDIZIONE_STAMPA_AUTH_PWD
				+ ", SDA_SPEDIZIONE_CERT_PATH_KEYSTORE=" + SDA_SPEDIZIONE_CERT_PATH_KEYSTORE
				+ ", SDA_SPEDIZIONE_CERT_PATH_KEYSTORE_PASSWORD=" + SDA_SPEDIZIONE_CERT_PATH_KEYSTORE_PASSWORD + "]";
	}

}
