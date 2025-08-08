package it.citel.postel.bancarizzazioneGUI.service;

import java.io.IOException;
import java.net.MalformedURLException;

import javax.servlet.ServletException;

import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.RequestLogin;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAccessi;
import it.citel.postel.commonLib.rest.model.ResponseUser;

public interface LoginService {
	
    public Response<?>  autenticazione(Request<RequestLogin>  request) throws MalformedURLException, IOException, Exception ;
    public Response<?>  loadPostazioni() throws MalformedURLException, IOException, Exception ;
    public Response<?> 	createLoginAccesso(Request<RequestLogin> request) throws MalformedURLException, IOException, Exception ;
    public ResponseUser getUserAccessFields(Request<RequestLogin> request)	throws MalformedURLException, IOException, Exception;
    public ResponseAccessi getLastAccessUser(Request<RequestLogin> request)	throws MalformedURLException, IOException, Exception;
    public Response<?>  setLogoutAccesso(Request<RequestLogin>  request) throws IOException, ServletException;
    
    public Response<?> checkProfiloSharedPresent(Request<RequestLogin> request) throws MalformedURLException, IOException, Exception ;
	
	
	
	
}
