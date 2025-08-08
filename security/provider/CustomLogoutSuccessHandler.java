package it.citel.postel.bancarizzazioneGUI.security.provider;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import it.citel.postel.bancarizzazioneGUI.service.LoginService;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestLogin;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.security.model.User;

@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {
	static final Logger log = LogManager.getLogger(CustomLogoutSuccessHandler.class);
	@Autowired
	LoginService loginService;

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		log.debug("onLogoutSuccess start");
//		User user = (User) authentication.getPrincipal();
//		Request<RequestLogin> requestUser = new Request<>();
//		RequestLogin data = new RequestLogin();
//		data.setUsername(user.getUsername());
//		data.setIdPostazione(user.getIdPostazione());
//		data.setIdAccessi(user.getIdAccessi());
		
//		Response<?> responseLogOut = loginService.setLogoutAccesso(requestUser.setData(data));
		
		String URL = request.getContextPath() + "/logout";
		response.setStatus(HttpStatus.OK.value());
		response.sendRedirect(URL);
	}

}
