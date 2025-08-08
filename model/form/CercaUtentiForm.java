package it.postel.bancarizzazioneGUI.model.form;

public class CercaUtentiForm {

	private String zCliente;
	private String username;
	private String ruolo;
	private String sottoMenu;
	private String zClienteModifica;
	private String usernameModifica;
	private String ruoloModifica;
	
	public CercaUtentiForm() {
		super();
	}

	public CercaUtentiForm(String zCliente, String username, String ruolo, String sottoMenu, String zClienteModifica,
			String usernameModifica, String ruoloModifica) {
		super();
		this.zCliente = zCliente;
		this.username = username;
		this.ruolo = ruolo;
		this.sottoMenu = sottoMenu;
		this.zClienteModifica = zClienteModifica;
		this.usernameModifica = usernameModifica;
		this.ruoloModifica = ruoloModifica;
	}

	public String getzCliente() {
		return zCliente;
	}

	public void setzCliente(String zCliente) {
		this.zCliente = zCliente;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRuolo() {
		return ruolo;
	}

	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}

	public String getSottoMenu() {
		return sottoMenu;
	}

	public void setSottoMenu(String sottoMenu) {
		this.sottoMenu = sottoMenu;
	}

	public String getzClienteModifica() {
		return zClienteModifica;
	}

	public void setzClienteModifica(String zClienteModifica) {
		this.zClienteModifica = zClienteModifica;
	}

	public String getUsernameModifica() {
		return usernameModifica;
	}

	public void setUsernameModifica(String usernameModifica) {
		this.usernameModifica = usernameModifica;
	}

	public String getRuoloModifica() {
		return ruoloModifica;
	}

	public void setRuoloModifica(String ruoloModifica) {
		this.ruoloModifica = ruoloModifica;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("CercaUtentiForm [zCliente=");
		builder.append(zCliente);
		builder.append(", username=");
		builder.append(username);
		builder.append(", ruolo=");
		builder.append(ruolo);
		builder.append(", sottoMenu=");
		builder.append(sottoMenu);
		builder.append(", zClienteModifica=");
		builder.append(zClienteModifica);
		builder.append(", usernameModifica=");
		builder.append(usernameModifica);
		builder.append(", ruoloModifica=");
		builder.append(ruoloModifica);
		builder.append("]");
		return builder.toString();
	}

}
