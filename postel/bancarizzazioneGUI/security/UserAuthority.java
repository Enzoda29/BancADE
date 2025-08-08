package it.postel.bancarizzazioneGUI.security;
import org.springframework.security.core.GrantedAuthority;

/**
 * Maps groups defined in LDAP to roles for a specific user.
 */
public enum UserAuthority implements GrantedAuthority {

	ROLE_ADMIN, ROLE_SUB_ADMIN, ROLE_USER;

    public String getAuthority() {
        return name();
    }
    
}