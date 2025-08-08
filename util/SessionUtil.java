package it.postel.bancarizzazioneGUI.util;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class SessionUtil {

	public static Object getObjectFromSession(String name) {
		Object obj = null;
		HttpSession session = RequestUtil.getRequest().getSession();
		if (session != null) {
			obj = session.getAttribute(name);
		}
		return obj;
	}
	
	public static void setObjectInSession(String name, Object obj){
		HttpSession session = RequestUtil.getRequest().getSession();
		if (session != null) {
			session.setAttribute(name, obj);
		}
	}
	
	public static void removeObjectFromSession(String name){
		HttpSession session = RequestUtil.getRequest().getSession();
		if (session != null) {
			session.removeAttribute(name);
		}
	}
	
	public static String getRequestParameter(String parameterName){
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		return request.getParameter(parameterName);
	}
	
	public static void printSession(){
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		Enumeration objectSession= session.getAttributeNames();
		String name = null;
		
		if (session != null) {
			while(objectSession.hasMoreElements()){
				name = (String) objectSession.nextElement();
				System.out.println("Oggetto in Sessione name=" + name + " value=" + session.getAttribute(name));
			}
		}
	}
}
