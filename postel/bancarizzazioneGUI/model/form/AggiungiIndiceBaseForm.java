package it.postel.bancarizzazioneGUI.model.form;

public class AggiungiIndiceBaseForm {

	private String nomeClasse;
	private String nomeIndice;
	private String tipoIndice;
	private String valoriIndice;
	private String numeroChiave;
	private String etichettaIndice;
	private String regole;
	private String minValore;
	private String minDataValore;
	private String maxValore;
	private String maxDataValore;
	private String ltValore;
	private String ltDataValore;
	private String leValore;
	private String leDataValore;
	private String gtValore;
	private String gtDataValore;
	private String geValore;
	private String geDataValore;
	
	public AggiungiIndiceBaseForm() {
		super();
	}

	public AggiungiIndiceBaseForm(String nomeClasse, String nomeIndice, String tipoIndice, String valoriIndice,
			String numeroChiave, String etichettaIndice, String regole, String minValore, String minDataValore,
			String maxValore, String maxDataValore, String ltValore, String ltDataValore, String leValore,
			String leDataValore, String gtValore, String gtDataValore, String geValore, String geDataValore) {
		super();
		this.nomeClasse = nomeClasse;
		this.nomeIndice = nomeIndice;
		this.tipoIndice = tipoIndice;
		this.valoriIndice = valoriIndice;
		this.numeroChiave = numeroChiave;
		this.etichettaIndice = etichettaIndice;
		this.regole = regole;
		this.minValore = minValore;
		this.minDataValore = minDataValore;
		this.maxValore = maxValore;
		this.maxDataValore = maxDataValore;
		this.ltValore = ltValore;
		this.ltDataValore = ltDataValore;
		this.leValore = leValore;
		this.leDataValore = leDataValore;
		this.gtValore = gtValore;
		this.gtDataValore = gtDataValore;
		this.geValore = geValore;
		this.geDataValore = geDataValore;
	}

	public String getNomeClasse() {
		return nomeClasse;
	}

	public void setNomeClasse(String nomeClasse) {
		this.nomeClasse = nomeClasse;
	}

	public String getNomeIndice() {
		return nomeIndice;
	}

	public void setNomeIndice(String nomeIndice) {
		this.nomeIndice = nomeIndice;
	}

	public String getTipoIndice() {
		return tipoIndice;
	}

	public void setTipoIndice(String tipoIndice) {
		this.tipoIndice = tipoIndice;
	}

	public String getValoriIndice() {
		return valoriIndice;
	}

	public void setValoriIndice(String valoriIndice) {
		this.valoriIndice = valoriIndice;
	}

	public String getNumeroChiave() {
		return numeroChiave;
	}

	public void setNumeroChiave(String numeroChiave) {
		this.numeroChiave = numeroChiave;
	}

	public String getEtichettaIndice() {
		return etichettaIndice;
	}

	public void setEtichettaIndice(String etichettaIndice) {
		this.etichettaIndice = etichettaIndice;
	}

	public String getRegole() {
		return regole;
	}

	public void setRegole(String regole) {
		this.regole = regole;
	}

	public String getMinValore() {
		return minValore;
	}

	public void setMinValore(String minValore) {
		this.minValore = minValore;
	}

	public String getMinDataValore() {
		return minDataValore;
	}

	public void setMinDataValore(String minDataValore) {
		this.minDataValore = minDataValore;
	}

	public String getMaxValore() {
		return maxValore;
	}

	public void setMaxValore(String maxValore) {
		this.maxValore = maxValore;
	}

	public String getMaxDataValore() {
		return maxDataValore;
	}

	public void setMaxDataValore(String maxDataValore) {
		this.maxDataValore = maxDataValore;
	}

	public String getLtValore() {
		return ltValore;
	}

	public void setLtValore(String ltValore) {
		this.ltValore = ltValore;
	}

	public String getLtDataValore() {
		return ltDataValore;
	}

	public void setLtDataValore(String ltDataValore) {
		this.ltDataValore = ltDataValore;
	}

	public String getLeValore() {
		return leValore;
	}

	public void setLeValore(String leValore) {
		this.leValore = leValore;
	}

	public String getLeDataValore() {
		return leDataValore;
	}

	public void setLeDataValore(String leDataValore) {
		this.leDataValore = leDataValore;
	}

	public String getGtValore() {
		return gtValore;
	}

	public void setGtValore(String gtValore) {
		this.gtValore = gtValore;
	}

	public String getGtDataValore() {
		return gtDataValore;
	}

	public void setGtDataValore(String gtDataValore) {
		this.gtDataValore = gtDataValore;
	}

	public String getGeValore() {
		return geValore;
	}

	public void setGeValore(String geValore) {
		this.geValore = geValore;
	}

	public String getGeDataValore() {
		return geDataValore;
	}

	public void setGeDataValore(String geDataValore) {
		this.geDataValore = geDataValore;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("AggiungiIndiceBaseForm [nomeClasse=");
		builder.append(nomeClasse);
		builder.append(", nomeIndice=");
		builder.append(nomeIndice);
		builder.append(", tipoIndice=");
		builder.append(tipoIndice);
		builder.append(", valoriIndice=");
		builder.append(valoriIndice);
		builder.append(", numeroChiave=");
		builder.append(numeroChiave);
		builder.append(", etichettaIndice=");
		builder.append(etichettaIndice);
		builder.append(", regole=");
		builder.append(regole);
		builder.append(", minValore=");
		builder.append(minValore);
		builder.append(", minDataValore=");
		builder.append(minDataValore);
		builder.append(", maxValore=");
		builder.append(maxValore);
		builder.append(", maxDataValore=");
		builder.append(maxDataValore);
		builder.append(", ltValore=");
		builder.append(ltValore);
		builder.append(", ltDataValore=");
		builder.append(ltDataValore);
		builder.append(", leValore=");
		builder.append(leValore);
		builder.append(", leDataValore=");
		builder.append(leDataValore);
		builder.append(", gtValore=");
		builder.append(gtValore);
		builder.append(", gtDataValore=");
		builder.append(gtDataValore);
		builder.append(", geValore=");
		builder.append(geValore);
		builder.append(", geDataValore=");
		builder.append(geDataValore);
		builder.append("]");
		return builder.toString();
	}

}
