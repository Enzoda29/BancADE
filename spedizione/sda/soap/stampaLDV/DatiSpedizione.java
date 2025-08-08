
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java per datiSpedizione complex type.
 * 
 * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
 * 
 * <pre>
 * &lt;complexType name="datiSpedizione"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="accessori" type="{http://soap.service.spedizionews.sda.it/}accessori" minOccurs="0"/&gt;
 *         &lt;element name="codiceServizio" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="datiGenerali" type="{http://soap.service.spedizionews.sda.it/}datiGenerali"/&gt;
 *         &lt;element name="sezioneColli" type="{http://soap.service.spedizionews.sda.it/}sezioneColli"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "datiSpedizione", propOrder = {
    "accessori",
    "codiceServizio",
    "datiGenerali",
    "sezioneColli"
})
public class DatiSpedizione {

    protected Accessori accessori;
    protected String codiceServizio;
    @XmlElement(required = true)
    protected DatiGenerali datiGenerali;
    @XmlElement(required = true)
    protected SezioneColli sezioneColli;

    /**
     * Recupera il valore della proprietà accessori.
     * 
     * @return
     *     possible object is
     *     {@link Accessori }
     *     
     */
    public Accessori getAccessori() {
        return accessori;
    }

    /**
     * Imposta il valore della proprietà accessori.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori }
     *     
     */
    public void setAccessori(Accessori value) {
        this.accessori = value;
    }

    /**
     * Recupera il valore della proprietà codiceServizio.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodiceServizio() {
        return codiceServizio;
    }

    /**
     * Imposta il valore della proprietà codiceServizio.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodiceServizio(String value) {
        this.codiceServizio = value;
    }

    /**
     * Recupera il valore della proprietà datiGenerali.
     * 
     * @return
     *     possible object is
     *     {@link DatiGenerali }
     *     
     */
    public DatiGenerali getDatiGenerali() {
        return datiGenerali;
    }

    /**
     * Imposta il valore della proprietà datiGenerali.
     * 
     * @param value
     *     allowed object is
     *     {@link DatiGenerali }
     *     
     */
    public void setDatiGenerali(DatiGenerali value) {
        this.datiGenerali = value;
    }

    /**
     * Recupera il valore della proprietà sezioneColli.
     * 
     * @return
     *     possible object is
     *     {@link SezioneColli }
     *     
     */
    public SezioneColli getSezioneColli() {
        return sezioneColli;
    }

    /**
     * Imposta il valore della proprietà sezioneColli.
     * 
     * @param value
     *     allowed object is
     *     {@link SezioneColli }
     *     
     */
    public void setSezioneColli(SezioneColli value) {
        this.sezioneColli = value;
    }

}
