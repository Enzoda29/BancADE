package it.postel.bancarizzazioneGUI.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class User implements UserDetails {

	private static final long serialVersionUID = -4908451411413566313L;
	
	private String username;
	private String password;
	private String nome;
	private String email;

//	private List<Role> authorities;
	private Collection<? extends GrantedAuthority> authorities;
	private boolean	accountNonExpired;
	private boolean	accountNonLocked;
	private boolean	credentialsNonExpired;
	private boolean	enabled;
	
	private boolean serverError;
	private boolean connectionException;
	private boolean unauthorizedException;
	
	public User() {
		this.accountNonExpired = true;
		this.accountNonLocked = true;
		this.credentialsNonExpired = true;
		this.enabled = true;
		this.serverError = false;
		this.connectionException = false;
		this.unauthorizedException = false;
	}

	@Override
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

//	public void setAuthorities(List<Role> authorities) {
//		this.authorities = authorities;
//	}
	
	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}
	
	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}
	
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	public boolean isServerError() {
		return serverError;
	}

	public void setServerError(boolean serverError) {
		this.serverError = serverError;
	}

	public boolean isConnectionException() {
		return connectionException;
	}

	public void setConnectionException(boolean connectionException) {
		this.connectionException = connectionException;
	}

	public boolean isUnauthorizedException() {
		return unauthorizedException;
	}

	public void setUnauthorizedException(boolean unauthorizedException) {
		this.unauthorizedException = unauthorizedException;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("User [username=");
		builder.append(username);
		builder.append(", nome=");
		builder.append(nome);
		builder.append(", email=");
		builder.append(email);
		builder.append(", authorities=");
		builder.append(authorities);
		builder.append(", accountNonExpired=");
		builder.append(accountNonExpired);
		builder.append(", accountNonLocked=");
		builder.append(accountNonLocked);
		builder.append(", credentialsNonExpired=");
		builder.append(credentialsNonExpired);
		builder.append(", enabled=");
		builder.append(enabled);
		builder.append(", serverError=");
		builder.append(serverError);
		builder.append(", connectionException=");
		builder.append(connectionException);
		builder.append(", unauthorizedException=");
		builder.append(unauthorizedException);
		builder.append("]");
		return builder.toString();
	}
	
}
