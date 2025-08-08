
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java per anonymous complex type.
 * 
 * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="return" form="unqualified"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="messages" type="{http://soap.service.spedizionews.sda.it/}sdaValidationMessages" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                   &lt;element name="outcome" type="{http://www.w3.org/2001/XMLSchema}string" form="unqualified"/&gt;
 *                   &lt;element name="documentoDiStampa" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0" form="unqualified"/&gt;
 *                   &lt;element name="spedizioni" type="{http://soap.service.spedizionews.sda.it/}ldv" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "_return"
})
@XmlRootElement(name = "doItResponse")
public class DoItResponse {

    @XmlElement(name = "return", required = true)
    protected DoItResponse.Return _return;

    /**
     * Recupera il valore della proprietà return.
     * 
     * @return
     *     possible object is
     *     {@link DoItResponse.Return }
     *     
     */
    public DoItResponse.Return getReturn() {
        return _return;
    }

    /**
     * Imposta il valore della proprietà return.
     * 
     * @param value
     *     allowed object is
     *     {@link DoItResponse.Return }
     *     
     */
    public void setReturn(DoItResponse.Return value) {
        this._return = value;
    }


    /**
     * <p>Classe Java per anonymous complex type.
     * 
     * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
     * 
     * <pre>
     * &lt;complexType&gt;
     *   &lt;complexContent&gt;
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
     *       &lt;sequence&gt;
     *         &lt;element name="messages" type="{http://soap.service.spedizionews.sda.it/}sdaValidationMessages" maxOccurs="unbounded" minOccurs="0"/&gt;
     *         &lt;element name="outcome" type="{http://www.w3.org/2001/XMLSchema}string" form="unqualified"/&gt;
     *         &lt;element name="documentoDiStampa" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0" form="unqualified"/&gt;
     *         &lt;element name="spedizioni" type="{http://soap.service.spedizionews.sda.it/}ldv" maxOccurs="unbounded" minOccurs="0"/&gt;
     *       &lt;/sequence&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "messages",
        "outcome",
        "documentoDiStampa",
        "spedizioni"
    })
    public static class Return {

        @XmlElement(nillable = true)
        protected List<SdaValidationMessages> messages;
        @XmlElement(required = true)
        protected String outcome;
        protected byte[] documentoDiStampa;
        protected List<Ldv> spedizioni;

        /**
         * Gets the value of the messages property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the messages property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getMessages().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link SdaValidationMessages }
         * 
         * 
         */
        public List<SdaValidationMessages> getMessages() {
            if (messages == null) {
                messages = new ArrayList<SdaValidationMessages>();
            }
            return this.messages;
        }

        /**
         * Recupera il valore della proprietà outcome.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getOutcome() {
            return outcome;
        }

        /**
         * Imposta il valore della proprietà outcome.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setOutcome(String value) {
            this.outcome = value;
        }

        /**
         * Recupera il valore della proprietà documentoDiStampa.
         * 
         * @return
         *     possible object is
         *     byte[]
         */
        public byte[] getDocumentoDiStampa() {
            return documentoDiStampa;
        }

        /**
         * Imposta il valore della proprietà documentoDiStampa.
         * 
         * @param value
         *     allowed object is
         *     byte[]
         */
        public void setDocumentoDiStampa(byte[] value) {
            this.documentoDiStampa = value;
        }

        /**
         * Gets the value of the spedizioni property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the spedizioni property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getSpedizioni().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link Ldv }
         * 
         * 
         */
        public List<Ldv> getSpedizioni() {
            if (spedizioni == null) {
                spedizioni = new ArrayList<Ldv>();
            }
            return this.spedizioni;
        }

    }

}
