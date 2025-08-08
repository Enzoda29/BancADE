package it.citel.postel.bancarizzazioneGUI.security.provider;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
@Component
public class BancarGUIAuthenticationEntryPoint implements AuthenticationEntryPoint {
	static final Logger log = LogManager.getLogger(BancarGUIAuthenticationEntryPoint.class);

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		try {
			log.debug("commence entry point..");
			String redirectUrl = request.getSession().getServletContext().getContextPath() + "/login";
			log.debug("commence redirectUrl=" + redirectUrl);
			String headerName = request.getHeader("x-requested-with");
			if(StringUtils.isNotBlank(headerName)) {
				log.info("headerName=" + headerName);
				response.getWriter().append("Utente non loggato");
				response.setStatus(403);
			}else {
				log.info("redirectUrl=" + redirectUrl);
				response.setStatus(403);
				response.sendRedirect(redirectUrl);
			}
			
		
		} catch (IOException ioex) {
			log.error("BancarGUIAuthenticationEntryPoint.commence IOException:" + ioex.getMessage(), ioex);
			throw ioex;
		} catch (Exception ex) {
			log.error("BancarGUIAuthenticationEntryPoint.commence Exception:" + ex.getMessage(), ex);
			throw new ServletException(ex);
		}

	}

}
