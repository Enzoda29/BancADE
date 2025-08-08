package it.postel.bancarizzazioneGUI.model.form;

public class ResetPasswordForm {

	private String email;
	
	public ResetPasswordForm() {
	}
	
	public ResetPasswordForm(String email) {
		super();
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ResetPasswordForm [email=");
		builder.append(email);
		builder.append("]");
		return builder.toString();
	}
	
}
