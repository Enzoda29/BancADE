package it.citel.postel.bancarizzazioneGUI.util;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.session.HttpSessionCreatedEvent;
import org.springframework.security.web.session.HttpSessionDestroyedEvent;
import org.springframework.stereotype.Component;

import it.citel.postel.bancarizzazioneGUI.service.LoginService;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestLogin;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.security.model.User;



@Component
public class LogoutListenerSession implements ApplicationListener<ApplicationEvent> {

 private static final Logger logger = LogManager.getLogger(LogoutListenerSession.class);



@Autowired
LoginService loginService;

@Autowired
HttpSession session;

@Override
public void onApplicationEvent(ApplicationEvent applicationEvent) {
    if(applicationEvent instanceof HttpSessionCreatedEvent){ //If event is a session created event

    	logger.debug("If event is a session created event");

     }else if(applicationEvent instanceof HttpSessionDestroyedEvent){ //If event is a session destroy event
        // handler.expireCart();
         logger.debug(" Session is destory  :" ); //log data
 		List<SecurityContext> lstSecurityContext = ((HttpSessionDestroyedEvent) applicationEvent).getSecurityContexts();
 		User user;
 		for (SecurityContext securityContext : lstSecurityContext) {
 			try {
 				user = (User) securityContext.getAuthentication().getPrincipal();
 				Request<RequestLogin> requestUser = new Request<>();
 				RequestLogin data = new RequestLogin();
 				data.setUsername(user.getUsername());
 				data.setIdPostazione(user.getIdPostazione());
 				data.setIdAccessi(user.getIdAccessi());
 				Response<?> responseLogOut = loginService.setLogoutAccesso(requestUser.setData(data));
 				
 			} catch (IOException e) {
 				// TODO Auto-generated catch block
 				e.printStackTrace();
 			} catch (ServletException e) {
 				// TODO Auto-generated catch block
 				e.printStackTrace();
 			}
 			// ...
 		}      

     }else if(applicationEvent instanceof AuthenticationSuccessEvent){ //If event is a session destroy event
         logger.debug("  athentication is success  :" ); //log data
         
         
     }else{
         /*logger.debug(" unknown event occur  : " Source: " + ); //log data*/
     }  
	}   
}
