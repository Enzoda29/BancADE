package it.citel.postel.bancarizzazioneGUI.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@PropertySource("classpath:/application.properties")
public class PropertiesUtil {
	@Value("${wsdl.sda.spedizioneActionService}")
	public String WSDL_SDA_SPEDIZIONE_ACTION_SERVICE ;
	
	@Value("${postel.sda.proxy.host}")
	public String PROXY_HOST ;
	@Value("${postel.sda.proxy.port}")
	public String PROXY_PORT ;
	
	@Value("${postel.sda.temp.filepath}")
	public String TEMP_FILE_PATH ;
	
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	@Override
	public String toString() {
		return "PropertiesUtil [WSDL_SDA_SPEDIZIONE_ACTION_SERVICE=" + WSDL_SDA_SPEDIZIONE_ACTION_SERVICE
				+ ", PROXY_HOST=" + PROXY_HOST + ", PROXY_PORT=" + PROXY_PORT + "]";
	}

	
}
