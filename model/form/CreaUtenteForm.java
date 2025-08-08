package it.postel.bancarizzazioneGUI.model.form;

import java.util.List;

public class CreaUtenteForm {

	private String zCliente;
	private String username;
	private List<String> classiDocumentali;
	private List<String> centriCompetenza;
	
	public CreaUtenteForm() {
		super();
	}

	public CreaUtenteForm(String zCliente, String username, List<String> classiDocumentali,
			List<String> centriCompetenza) {
		super();
		this.zCliente = zCliente;
		this.username = username;
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
		builder.append("CreaUtenteForm [zCliente=");
		builder.append(zCliente);
		builder.append(", username=");
		builder.append(username);
		builder.append(", classiDocumentali=");
		builder.append(classiDocumentali);
		builder.append(", centriCompetenza=");
		builder.append(centriCompetenza);
		builder.append("]");
		return builder.toString();
	}

}
