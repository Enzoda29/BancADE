
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

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
 *         &lt;element name="arg0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="formatoStampa"&gt;
 *                     &lt;simpleType&gt;
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *                         &lt;enumeration value="A4"/&gt;
 *                         &lt;enumeration value="A6"/&gt;
 *                         &lt;enumeration value="ZPL"/&gt;
 *                       &lt;/restriction&gt;
 *                     &lt;/simpleType&gt;
 *                   &lt;/element&gt;
 *                   &lt;element name="ldv" type="{http://soap.service.spedizionews.sda.it/}ldv"/&gt;
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
    "arg0"
})
@XmlRootElement(name = "doIt")
public class DoIt {

    @XmlElement(required = true)
    protected DoIt.Arg0 arg0;

    /**
     * Recupera il valore della proprietà arg0.
     * 
     * @return
     *     possible object is
     *     {@link DoIt.Arg0 }
     *     
     */
    public DoIt.Arg0 getArg0() {
        return arg0;
    }

    /**
     * Imposta il valore della proprietà arg0.
     * 
     * @param value
     *     allowed object is
     *     {@link DoIt.Arg0 }
     *     
     */
    public void setArg0(DoIt.Arg0 value) {
        this.arg0 = value;
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
     *         &lt;element name="formatoStampa"&gt;
     *           &lt;simpleType&gt;
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
     *               &lt;enumeration value="A4"/&gt;
     *               &lt;enumeration value="A6"/&gt;
     *               &lt;enumeration value="ZPL"/&gt;
     *             &lt;/restriction&gt;
     *           &lt;/simpleType&gt;
     *         &lt;/element&gt;
     *         &lt;element name="ldv" type="{http://soap.service.spedizionews.sda.it/}ldv"/&gt;
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
        "formatoStampa",
        "ldv"
    })
    public static class Arg0 {

        @XmlElement(required = true)
        protected String formatoStampa;
        @XmlElement(required = true)
        protected Ldv ldv;

        /**
         * Recupera il valore della proprietà formatoStampa.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getFormatoStampa() {
            return formatoStampa;
        }

        /**
         * Imposta il valore della proprietà formatoStampa.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setFormatoStampa(String value) {
            this.formatoStampa = value;
        }

        /**
         * Recupera il valore della proprietà ldv.
         * 
         * @return
         *     possible object is
         *     {@link Ldv }
         *     
         */
        public Ldv getLdv() {
            return ldv;
        }

        /**
         * Imposta il valore della proprietà ldv.
         * 
         * @param value
         *     allowed object is
         *     {@link Ldv }
         *     
         */
        public void setLdv(Ldv value) {
            this.ldv = value;
        }

    }

}
