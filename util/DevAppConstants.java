package it.postel.bancarizzazioneGUI.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@PropertySource("classpath:/dev-app.properties")
public class DevAppConstants {
	
	@Value("${app.repository}")
	public String REPOSITORY;
	
	@Value("${app.cabinet}")
	public String CABINET;
	
	@Value("${app.documents.path}")
	public String DOCUMENTS_PATH;
	
	@Value("${app.date.format}")
	public String DATE_FORMAT;

	//To resolve ${} in @Value
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DevAppConstants [REPOSITORY=");
		builder.append(REPOSITORY);
		builder.append(", CABINET=");
		builder.append(CABINET);
		builder.append(", DOCUMENTS_PATH=");
		builder.append(DOCUMENTS_PATH);
		builder.append(", DATE_FORMAT=");
		builder.append(DATE_FORMAT);
		builder.append("]");
		return builder.toString();
	}

}
