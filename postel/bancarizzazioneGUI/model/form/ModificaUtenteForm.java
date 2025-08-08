package it.postel.bancarizzazioneGUI.model.form;

import java.util.List;

public class ModificaUtenteForm {

	private String zCliente;
	private String username;
	private String nuovoUsername;
	private String ruolo;
	private List<String> classiDocumentali;
	private List<String> centriCompetenza;
	
	public ModificaUtenteForm() {
		super();
	}

	public ModificaUtenteForm(String zCliente, String username, String nuovoUsername, String ruolo,
			List<String> classiDocumentali, List<String> centriCompetenza) {
		super();
		this.zCliente = zCliente;
		this.username = username;
		this.nuovoUsername = nuovoUsername;
		this.ruolo = ruolo;
		this.classiDocumentali = classiDocumentali;
		this.centriCompetenza = centriCompetenza;
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

	public String getNuovoUsername() {
		return nuovoUsername;
	}

	public void setNuovoUsername(String nuovoUsername) {
		this.nuovoUsername = nuovoUsername;
	}

	public String getRuolo() {
		return ruolo;
	}

	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}

	public List<String> getClassiDocumentali() {
		return classiDocumentali;
	}

	public void setClassiDocumentali(List<String> classiDocumentali) {
		this.classiDocumentali = classiDocumentali;
	}

	public List<String> getCentriCompetenza() {
		return centriCompetenza;
	}

	public void setCentriCompetenza(List<String> centriCompetenza) {
		this.centriCompetenza = centriCompetenza;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ModificaUtenteForm [zCliente=");
		builder.append(zCliente);
		builder.append(", username=");
		builder.append(username);
		builder.append(", nuovoUsername=");
		builder.append(nuovoUsername);
		builder.append(", ruolo=");
		builder.append(ruolo);
		builder.append(", classiDocumentali=");
		builder.append(classiDocumentali);
		builder.append(", centriCompetenza=");
		builder.append(centriCompetenza);
		builder.append("]");
		return builder.toString();
	}

}
