package it.postel.bancarizzazioneGUI.util;

import java.io.IOException;
import java.util.Random;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import Decoder.BASE64Decoder;
import Decoder.BASE64Encoder;

public class PasswordUtil {
	
	static final Logger log = LogManager.getLogger(PasswordUtil.class);

	public PasswordUtil() {
		super();
	}
	
	public static String base64Encode(String str) {
	    BASE64Encoder encoder = new BASE64Encoder();
	    str = new String(encoder.encodeBuffer(str.getBytes()));
	    return str;
	}

	public static String base64Decode(String str) {
	    BASE64Decoder decoder = new BASE64Decoder();
	    try {
	        str = new String(decoder.decodeBuffer(str));
	    } catch (IOException e) {
	        e.printStackTrace();
	    }       
	    return str;
	}
	
	public static String encryptPassword(String password){
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(password);
		log.info(hashedPassword);
		return hashedPassword;
	}
	
	public static String generatePassword(int length){
		StringBuffer sb = new StringBuffer();
		String specialCharacters[] = {"?", "=", ".", "*", "[", "]", "(", ")", "{", "}", "!", "@", "#", "$", "%", "^", "&", "~", "_", "|", "\\", "/", ":", ";", "+", ",", "`", "<", ">"};
		Random random = new Random();
		for (int i = length - 1; i > 0; i -= 12) {
	      int n = Math.min(12, Math.abs(i));
	      sb.append(StringUtils.leftPad(Long.toString(Math.round(Math.random() * Math.pow(36, n)), 36), n, '0'));
	    }
	    sb.append(specialCharacters[random.nextInt(specialCharacters.length)]);
	    for(int j = 0 ; j < sb.length(); j++) {
	    	if( (sb.charAt(j) != '0') 
	    			&& (sb.charAt(j) != '1') && (sb.charAt(j) != '2') && (sb.charAt(j) != '3') 
	    			&& (sb.charAt(j) != '4') && (sb.charAt(j) != '5') && (sb.charAt(j) != '6') 
	    			&& (sb.charAt(j) != '7') && (sb.charAt(j) != '8') && (sb.charAt(j) != '9')){
	    		
	    		sb.setCharAt(j, Character.toUpperCase(sb.charAt(j)));
	    		break;
	    	}
	    }
	    return sb.toString();
	}
	
	public static void main(String[] args) {
		log.info(base64Decode("QTBzYWRtMW4h"));
	}

}
