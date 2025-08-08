
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java per destinatario complex type.
 * 
 * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
 * 
 * <pre>
 * &lt;complexType name="destinatario"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="cap" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="codNazione" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="codStato" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="email" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;pattern value="[_\-a-zA-Z0-9\.\+]+@[a-zA-Z0-9](\.?[\-a-zA-Z0-9]*[a-zA-Z0-9])*"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="identificativoFiscale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="indirizzo" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="intestatario" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="localita" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="provincia" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="referente" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="telefono" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;pattern value="\+{0,1}[0-9]*"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="tipoAnagrafica"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="S"/&gt;
 *               &lt;enumeration value="N"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="zipCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "destinatario", propOrder = {
    "cap",
    "codNazione",
    "codStato",
    "email",
    "identificativoFiscale",
    "indirizzo",
    "intestatario",
    "localita",
    "provincia",
    "referente",
    "telefono",
    "tipoAnagrafica",
    "zipCode"
})
public class Destinatario {

    @XmlElement(required = true)
    protected String cap;
    @XmlElement(required = true)
    protected String codNazione;
    protected String codStato;
    protected String email;
    protected String identificativoFiscale;
    @XmlElement(required = true)
    protected String indirizzo;
    @XmlElement(required = true)
    protected String intestatario;
    @XmlElement(required = true)
    protected String localita;
    protected String provincia;
    protected String referente;
    protected String telefono;
    @XmlElement(required = true)
    protected String tipoAnagrafica;
    protected String zipCode;

    /**
     * Recupera il valore della proprietà cap.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCap() {
        return cap;
    }

    /**
     * Imposta il valore della proprietà cap.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCap(String value) {
        this.cap = value;
    }

    /**
     * Recupera il valore della proprietà codNazione.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodNazione() {
        return codNazione;
    }

    /**
     * Imposta il valore della proprietà codNazione.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodNazione(String value) {
        this.codNazione = value;
    }

    /**
     * Recupera il valore della proprietà codStato.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodStato() {
        return codStato;
    }

    /**
     * Imposta il valore della proprietà codStato.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodStato(String value) {
        this.codStato = value;
    }

    /**
     * Recupera il valore della proprietà email.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEmail() {
        return email;
    }

    /**
     * Imposta il valore della proprietà email.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEmail(String value) {
        this.email = value;
    }

    /**
     * Recupera il valore della proprietà identificativoFiscale.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdentificativoFiscale() {
        return identificativoFiscale;
    }

    /**
     * Imposta il valore della proprietà identificativoFiscale.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdentificativoFiscale(String value) {
        this.identificativoFiscale = value;
    }

    /**
     * Recupera il valore della proprietà indirizzo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIndirizzo() {
        return indirizzo;
    }

    /**
     * Imposta il valore della proprietà indirizzo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIndirizzo(String value) {
        this.indirizzo = value;
    }

    /**
     * Recupera il valore della proprietà intestatario.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIntestatario() {
        return intestatario;
    }

    /**
     * Imposta il valore della proprietà intestatario.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIntestatario(String value) {
        this.intestatario = value;
    }

    /**
     * Recupera il valore della proprietà localita.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLocalita() {
        return localita;
    }

    /**
     * Imposta il valore della proprietà localita.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLocalita(String value) {
        this.localita = value;
    }

    /**
     * Recupera il valore della proprietà provincia.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProvincia() {
        return provincia;
    }

    /**
     * Imposta il valore della proprietà provincia.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProvincia(String value) {
        this.provincia = value;
    }

    /**
     * Recupera il valore della proprietà referente.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getReferente() {
        return referente;
    }

    /**
     * Imposta il valore della proprietà referente.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setReferente(String value) {
        this.referente = value;
    }

    /**
     * Recupera il valore della proprietà telefono.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTelefono() {
        return telefono;
    }

    /**
     * Imposta il valore della proprietà telefono.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTelefono(String value) {
        this.telefono = value;
    }

    /**
     * Recupera il valore della proprietà tipoAnagrafica.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoAnagrafica() {
        return tipoAnagrafica;
    }

    /**
     * Imposta il valore della proprietà tipoAnagrafica.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoAnagrafica(String value) {
        this.tipoAnagrafica = value;
    }

    /**
     * Recupera il valore della proprietà zipCode.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getZipCode() {
        return zipCode;
    }

    /**
     * Imposta il valore della proprietà zipCode.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setZipCode(String value) {
        this.zipCode = value;
    }

}
