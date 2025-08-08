package it.citel.postel.bancarizzazioneGUI.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {

	public static Object getObjectFromSession(String name) {
		Object obj = null;
                
                HttpServletRequest request = RequestUtil.getRequest();
                if(request!=null){
                    HttpSession session = request.getSession();
                    if (session != null) {
                            obj = session.getAttribute(name);
                    }
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
	
	public static HttpSession getSession() {
		return RequestUtil.getRequest().getSession();
	}
}
