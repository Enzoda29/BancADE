
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java per ldv complex type.
 * 
 * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
 * 
 * <pre>
 * &lt;complexType name="ldv"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="datiSpedizione" type="{http://soap.service.spedizionews.sda.it/}datiSpedizione"/&gt;
 *         &lt;element name="destinatario" type="{http://soap.service.spedizionews.sda.it/}destinatario"/&gt;
 *         &lt;element name="destinatarioRitorno" type="{http://soap.service.spedizionews.sda.it/}destinatarioRitorno" minOccurs="0"/&gt;
 *         &lt;element name="mittente" type="{http://soap.service.spedizionews.sda.it/}mittente"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ldv", propOrder = {
    "datiSpedizione",
    "destinatario",
    "destinatarioRitorno",
    "mittente"
})
public class Ldv {

    @XmlElement(required = true)
    protected DatiSpedizione datiSpedizione;
    @XmlElement(required = true)
    protected Destinatario destinatario;
    protected DestinatarioRitorno destinatarioRitorno;
    @XmlElement(required = true)
    protected Mittente mittente;

    /**
     * Recupera il valore della proprietà datiSpedizione.
     * 
     * @return
     *     possible object is
     *     {@link DatiSpedizione }
     *     
     */
    public DatiSpedizione getDatiSpedizione() {
        return datiSpedizione;
    }

    /**
     * Imposta il valore della proprietà datiSpedizione.
     * 
     * @param value
     *     allowed object is
     *     {@link DatiSpedizione }
     *     
     */
    public void setDatiSpedizione(DatiSpedizione value) {
        this.datiSpedizione = value;
    }

    /**
     * Recupera il valore della proprietà destinatario.
     * 
     * @return
     *     possible object is
     *     {@link Destinatario }
     *     
     */
    public Destinatario getDestinatario() {
        return destinatario;
    }

    /**
     * Imposta il valore della proprietà destinatario.
     * 
     * @param value
     *     allowed object is
     *     {@link Destinatario }
     *     
     */
    public void setDestinatario(Destinatario value) {
        this.destinatario = value;
    }

    /**
     * Recupera il valore della proprietà destinatarioRitorno.
     * 
     * @return
     *     possible object is
     *     {@link DestinatarioRitorno }
     *     
     */
    public DestinatarioRitorno getDestinatarioRitorno() {
        return destinatarioRitorno;
    }

    /**
     * Imposta il valore della proprietà destinatarioRitorno.
     * 
     * @param value
     *     allowed object is
     *     {@link DestinatarioRitorno }
     *     
     */
    public void setDestinatarioRitorno(DestinatarioRitorno value) {
        this.destinatarioRitorno = value;
    }

    /**
     * Recupera il valore della proprietà mittente.
     * 
     * @return
     *     possible object is
     *     {@link Mittente }
     *     
     */
    public Mittente getMittente() {
        return mittente;
    }

    /**
     * Imposta il valore della proprietà mittente.
     * 
     * @param value
     *     allowed object is
     *     {@link Mittente }
     *     
     */
    public void setMittente(Mittente value) {
        this.mittente = value;
    }

}
