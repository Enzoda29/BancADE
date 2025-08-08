package it.postel.bancarizzazioneGUI.security.handler;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	static final Logger log = LogManager.getLogger(CustomAuthenticationFailureHandler.class);
	
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
	  
	  if (exception instanceof DisabledException) {
		  getRedirectStrategy().sendRedirect(request, response, "/login?error=disabled");
		 
      } else if (exception instanceof AccountExpiredException) {
    	  getRedirectStrategy().sendRedirect(request, response, "/login?error=account-expired");
    	  
      } else if (exception instanceof LockedException) {
    	  getRedirectStrategy().sendRedirect(request, response, "/login?error=locked");
    	 
      } else if (exception instanceof CredentialsExpiredException) {
    	  getRedirectStrategy().sendRedirect(request, response, "/login?error=credentials-expired&type=Modifica%20Password");
    	 
      } else if (exception instanceof BadCredentialsException) {
    	  response.setStatus(403);
    	  getRedirectStrategy().sendRedirect(request, response, "/login?error=bad-credentials");
		  
      } else if (exception instanceof InternalAuthenticationServiceException) {
    	  getRedirectStrategy().sendRedirect(request, response, "/login?error=internal-server-error");
		  
      } else if (exception instanceof AuthenticationCredentialsNotFoundException) {
    	  getRedirectStrategy().sendRedirect(request, response, "/login?error=unauthorized");
		  
      } else if (exception instanceof AuthenticationServiceException) {
    	  getRedirectStrategy().sendRedirect(request, response, "/login?error=connect-exception");
		  
      } else {
    	  getRedirectStrategy().sendRedirect(request, response, "/login?error=credentials-no-found");
      }
	  
	}

}