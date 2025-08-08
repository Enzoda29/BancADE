
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java per datiGenerali complex type.
 * 
 * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
 * 
 * <pre>
 * &lt;complexType name="datiGenerali"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="codContenuto" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="codValutaOneri" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="contenuto" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="dataSpedizione" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="importoOneri" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/&gt;
 *         &lt;element name="mancataConsegna" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="A"/&gt;
 *               &lt;enumeration value="R"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="note" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="numRifInterno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="numeroFattura" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="tipoPagamentoOneri" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "datiGenerali", propOrder = {
    "codContenuto",
    "codValutaOneri",
    "contenuto",
    "dataSpedizione",
    "importoOneri",
    "mancataConsegna",
    "note",
    "numRifInterno",
    "numeroFattura",
    "tipoPagamentoOneri"
})
public class DatiGenerali {

    protected String codContenuto;
    protected String codValutaOneri;
    protected String contenuto;
    protected String dataSpedizione;
    protected BigDecimal importoOneri;
    protected String mancataConsegna;
    protected String note;
    protected String numRifInterno;
    protected String numeroFattura;
    protected String tipoPagamentoOneri;

    /**
     * Recupera il valore della proprietà codContenuto.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodContenuto() {
        return codContenuto;
    }

    /**
     * Imposta il valore della proprietà codContenuto.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodContenuto(String value) {
        this.codContenuto = value;
    }

    /**
     * Recupera il valore della proprietà codValutaOneri.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodValutaOneri() {
        return codValutaOneri;
    }

    /**
     * Imposta il valore della proprietà codValutaOneri.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodValutaOneri(String value) {
        this.codValutaOneri = value;
    }

    /**
     * Recupera il valore della proprietà contenuto.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getContenuto() {
        return contenuto;
    }

    /**
     * Imposta il valore della proprietà contenuto.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setContenuto(String value) {
        this.contenuto = value;
    }

    /**
     * Recupera il valore della proprietà dataSpedizione.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDataSpedizione() {
        return dataSpedizione;
    }

    /**
     * Imposta il valore della proprietà dataSpedizione.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDataSpedizione(String value) {
        this.dataSpedizione = value;
    }

    /**
     * Recupera il valore della proprietà importoOneri.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getImportoOneri() {
        return importoOneri;
    }

    /**
     * Imposta il valore della proprietà importoOneri.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setImportoOneri(BigDecimal value) {
        this.importoOneri = value;
    }

    /**
     * Recupera il valore della proprietà mancataConsegna.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMancataConsegna() {
        return mancataConsegna;
    }

    /**
     * Imposta il valore della proprietà mancataConsegna.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMancataConsegna(String value) {
        this.mancataConsegna = value;
    }

    /**
     * Recupera il valore della proprietà note.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNote() {
        return note;
    }

    /**
     * Imposta il valore della proprietà note.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNote(String value) {
        this.note = value;
    }

    /**
     * Recupera il valore della proprietà numRifInterno.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumRifInterno() {
        return numRifInterno;
    }

    /**
     * Imposta il valore della proprietà numRifInterno.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumRifInterno(String value) {
        this.numRifInterno = value;
    }

    /**
     * Recupera il valore della proprietà numeroFattura.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroFattura() {
        return numeroFattura;
    }

    /**
     * Imposta il valore della proprietà numeroFattura.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroFattura(String value) {
        this.numeroFattura = value;
    }

    /**
     * Recupera il valore della proprietà tipoPagamentoOneri.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoPagamentoOneri() {
        return tipoPagamentoOneri;
    }

    /**
     * Imposta il valore della proprietà tipoPagamentoOneri.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoPagamentoOneri(String value) {
        this.tipoPagamentoOneri = value;
    }

}
