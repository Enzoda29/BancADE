package it.postel.bancarizzazioneGUI.model.form;

public class CreaClienteForm {

	private String zCliente;
	private String codiceAccounting;
	private String codiceAccountingGestione;
	private String invioMail;
	private String centriCompetenza;
	
	public CreaClienteForm() {
		super();
	}

	public CreaClienteForm(String zCliente, String codiceAccounting, String codiceAccountingGestione, String invioMail,
			String centriCompetenza) {
		super();
		this.zCliente = zCliente;
		this.codiceAccounting = codiceAccounting;
		this.codiceAccountingGestione = codiceAccountingGestione;
		this.invioMail = invioMail;
		this.centriCompetenza = centriCompetenza;
	}

	public String getzCliente() {
		return zCliente;
	}

	public void setzCliente(String zCliente) {
		this.zCliente = zCliente;
	}

	public String getCodiceAccounting() {
		return codiceAccounting;
	}

	public void setCodiceAccounting(String codiceAccounting) {
		this.codiceAccounting = codiceAccounting;
	}

	public String getCodiceAccountingGestione() {
		return codiceAccountingGestione;
	}

	public void setCodiceAccountingGestione(String codiceAccountingGestione) {
		this.codiceAccountingGestione = codiceAccountingGestione;
	}

	public String getInvioMail() {
		return invioMail;
	}

	public void setInvioMail(String invioMail) {
		this.invioMail = invioMail;
	}

	public String getCentriCompetenza() {
		return centriCompetenza;
	}

	public void setCentriCompetenza(String centriCompetenza) {
		this.centriCompetenza = centriCompetenza;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("CreaClienteForm [zCliente=");
		builder.append(zCliente);
		builder.append(", codiceAccounting=");
		builder.append(codiceAccounting);
		builder.append(", codiceAccountingGestione=");
		builder.append(codiceAccountingGestione);
		builder.append(", invioMail=");
		builder.append(invioMail);
		builder.append(", centriCompetenza=");
		builder.append(centriCompetenza);
		builder.append("]");
		return builder.toString();
	}

}
