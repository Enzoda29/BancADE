package it.postel.bancarizzazioneGUI.model.form;

public class CercaClienteForm {

	private String zCliente;
	private String sottoMenu;
	
	public CercaClienteForm() {
		super();
	}

	public CercaClienteForm(String zCliente, String sottoMenu) {
		super();
		this.zCliente = zCliente;
		this.sottoMenu = sottoMenu;
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

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("CercaClienteForm [zCliente=");
		builder.append(zCliente);
		builder.append(", sottoMenu=");
		builder.append(sottoMenu);
		builder.append("]");
		return builder.toString();
	}

}
