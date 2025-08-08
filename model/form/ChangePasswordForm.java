package it.postel.bancarizzazioneGUI.model.form;

public class ChangePasswordForm {

	private String username;
	private String oldPassword;
	private String newPassword;
	
	public ChangePasswordForm() {
	}
	
	public ChangePasswordForm(String username, String oldPassword, String newPassword) {
		super();
		this.username = username;
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ChangePasswordForm [username=");
		builder.append(username);
		builder.append(", oldPassword=");
		builder.append(oldPassword);
		builder.append(", newPassword=");
		builder.append(newPassword);
		builder.append("]");
		return builder.toString();
	}
}
