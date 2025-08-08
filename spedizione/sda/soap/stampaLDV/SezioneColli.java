
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java per sezioneColli complex type.
 * 
 * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
 * 
 * <pre>
 * &lt;complexType name="sezioneColli"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="colli" type="{http://soap.service.spedizionews.sda.it/}colli" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element name="numeroColli" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/&gt;
 *         &lt;element name="pesoLdv" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "sezioneColli", propOrder = {
    "colli",
    "numeroColli",
    "pesoLdv"
})
public class SezioneColli {

    protected List<Colli> colli;
    protected BigInteger numeroColli;
    protected BigDecimal pesoLdv;

    /**
     * Gets the value of the colli property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the colli property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getColli().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Colli }
     * 
     * 
     */
    public List<Colli> getColli() {
        if (colli == null) {
            colli = new ArrayList<Colli>();
        }
        return this.colli;
    }

    /**
     * Recupera il valore della proprietà numeroColli.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getNumeroColli() {
        return numeroColli;
    }

    /**
     * Imposta il valore della proprietà numeroColli.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setNumeroColli(BigInteger value) {
        this.numeroColli = value;
    }

    /**
     * Recupera il valore della proprietà pesoLdv.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getPesoLdv() {
        return pesoLdv;
    }

    /**
     * Imposta il valore della proprietà pesoLdv.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setPesoLdv(BigDecimal value) {
        this.pesoLdv = value;
    }

	public void setColli(List<Colli> colli) {
		this.colli = colli;
	}
    
    

}
