package it.postel.bancarizzazioneGUI.security;

//import it.postel.spring.ldap.model.Group;

import java.util.Collection;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

/**
 * Maps groups defined in LDAP to roles for a specific user.
 */
public class LdapGrantedAuthoritiesMapper {

	private static String ROLE_ADMIN = "LibriAdmins";
	private static String ROLE_SUB_ADMIN = "LibriSubadmins";
	private static String ROLE_USER = "CodUser";

//	public static Collection<? extends GrantedAuthority> mapAuthorities(List<Group> groups) {
//		Set<UserAuthority> roles = EnumSet.noneOf(UserAuthority.class);
//		if (!groups.isEmpty()) {
//			for (Group group : groups) {
//				if (group != null) {
//					if (ROLE_ADMIN.equals(group.getName())) {
//						roles.add(UserAuthority.ROLE_ADMIN);
//					} else if(ROLE_SUB_ADMIN.equals(group.getName())){
//						roles.add(UserAuthority.ROLE_SUB_ADMIN);
//					} else {
//						roles.add(UserAuthority.ROLE_USER);
//					}
//				}
//			}
//		}
//		roles.add(UserAuthority.ROLE_USER);
//		return roles;
//	}
}