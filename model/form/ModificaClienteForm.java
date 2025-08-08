package it.postel.bancarizzazioneGUI.model.form;

public class ModificaClienteForm {

	private String zCliente;
	private String codiceAccounting;
	private String codiceAccountingGestione;
	private String invioMail;
	private String centriCompetenza;
	private String centroCompetenzaRimosso;
	
	public ModificaClienteForm() {
		super();
	}

	public ModificaClienteForm(String zCliente, String codiceAccounting, String codiceAccountingGestione,
			String invioMail, String centriCompetenza, String centroCompetenzaRimosso) {
		super();
		this.zCliente = zCliente;
		this.codiceAccounting = codiceAccounting;
		this.codiceAccountingGestione = codiceAccountingGestione;
		this.invioMail = invioMail;
		this.centriCompetenza = centriCompetenza;
		this.centroCompetenzaRimosso = centroCompetenzaRimosso;
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

	public String getCentroCompetenzaRimosso() {
		return centroCompetenzaRimosso;
	}

	public void setCentroCompetenzaRimosso(String centroCompetenzaRimosso) {
		this.centroCompetenzaRimosso = centroCompetenzaRimosso;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ModificaClienteForm [zCliente=");
		builder.append(zCliente);
		builder.append(", codiceAccounting=");
		builder.append(codiceAccounting);
		builder.append(", codiceAccountingGestione=");
		builder.append(codiceAccountingGestione);
		builder.append(", invioMail=");
		builder.append(invioMail);
		builder.append(", centriCompetenza=");
		builder.append(centriCompetenza);
		builder.append(", centroCompetenzaRimosso=");
		builder.append(centroCompetenzaRimosso);
		builder.append("]");
		return builder.toString();
	}

}
