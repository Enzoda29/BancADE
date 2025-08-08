package it.postel.bancarizzazioneGUI.model.form;

public class CercaClassiForm {

	private String zCliente;
	private String sottoMenu;
	private String idClasseModifica;
	
	public CercaClassiForm() {
		super();
	}

	public CercaClassiForm(String zCliente, String sottoMenu, String idClasseModifica) {
		super();
		this.zCliente = zCliente;
		this.sottoMenu = sottoMenu;
		this.idClasseModifica = idClasseModifica;
	}

	public String getzCliente() {
		return zCliente;
	}

	public void setzCliente(String zCliente) {
		this.zCliente = zCliente;
	}

	public String getSottoMenu() {
		return sottoMenu;
	}

	public void setSottoMenu(String sottoMenu) {
		this.sottoMenu = sottoMenu;
	}

	public String getIdClasseModifica() {
		return idClasseModifica;
	}

	public void setIdClasseModifica(String idClasseModifica) {
		this.idClasseModifica = idClasseModifica;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("CercaClassiForm [zCliente=");
		builder.append(zCliente);
		builder.append(", sottoMenu=");
		builder.append(sottoMenu);
		builder.append(", idClasseModifica=");
		builder.append(idClasseModifica);
		builder.append("]");
		return builder.toString();
	}

}
