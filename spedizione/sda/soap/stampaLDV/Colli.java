
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java per colli complex type.
 * 
 * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
 * 
 * <pre>
 * &lt;complexType name="colli"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="accessoriCollo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="altezza" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/&gt;
 *         &lt;element name="articoli" maxOccurs="unbounded" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="codNazioneProvenienza" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                   &lt;element name="codiceTariffaDoganale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                   &lt;element name="descrizione" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                   &lt;element name="peso" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                   &lt;element name="quantita" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                   &lt;element name="valore" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="codTipoImballo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="contenuto" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="descImballo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="elettrico" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="formato" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="larghezza" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/&gt;
 *         &lt;element name="nazFabbricaz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="numero" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="parete" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="peso" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="profondita" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/&gt;
 *         &lt;element name="raee" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="raeeNC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="tipoContenuto" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="tv" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="valoreDichiarato" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="valoreTotale" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "colli", propOrder = {
    "accessoriCollo",
    "altezza",
    "articoli",
    "codTipoImballo",
    "contenuto",
    "descImballo",
    "elettrico",
    "formato",
    "larghezza",
    "nazFabbricaz",
    "numero",
    "parete",
    "peso",
    "profondita",
    "raee",
    "raeeNC",
    "tipoContenuto",
    "tv",
    "valoreDichiarato",
    "valoreTotale"
})
public class Colli {

    protected String accessoriCollo;
    protected BigDecimal altezza;
    protected List<Colli.Articoli> articoli;
    protected String codTipoImballo;
    protected String contenuto;
    protected String descImballo;
    protected String elettrico;
    protected String formato;
    protected BigDecimal larghezza;
    protected String nazFabbricaz;
    protected String numero;
    protected String parete;
    protected String peso;
    protected BigDecimal profondita;
    protected String raee;
    protected String raeeNC;
    protected String tipoContenuto;
    protected String tv;
    protected String valoreDichiarato;
    protected BigDecimal valoreTotale;

    /**
     * Recupera il valore della proprietà accessoriCollo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccessoriCollo() {
        return accessoriCollo;
    }

    /**
     * Imposta il valore della proprietà accessoriCollo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccessoriCollo(String value) {
        this.accessoriCollo = value;
    }

    /**
     * Recupera il valore della proprietà altezza.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getAltezza() {
        return altezza;
    }

    /**
     * Imposta il valore della proprietà altezza.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setAltezza(BigDecimal value) {
        this.altezza = value;
    }

    /**
     * Gets the value of the articoli property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the articoli property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getArticoli().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Colli.Articoli }
     * 
     * 
     */
    public List<Colli.Articoli> getArticoli() {
        if (articoli == null) {
            articoli = new ArrayList<Colli.Articoli>();
        }
        return this.articoli;
    }

    /**
     * Recupera il valore della proprietà codTipoImballo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodTipoImballo() {
        return codTipoImballo;
    }

    /**
     * Imposta il valore della proprietà codTipoImballo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodTipoImballo(String value) {
        this.codTipoImballo = value;
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
     * Recupera il valore della proprietà descImballo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescImballo() {
        return descImballo;
    }

    /**
     * Imposta il valore della proprietà descImballo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescImballo(String value) {
        this.descImballo = value;
    }

    /**
     * Recupera il valore della proprietà elettrico.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElettrico() {
        return elettrico;
    }

    /**
     * Imposta il valore della proprietà elettrico.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElettrico(String value) {
        this.elettrico = value;
    }

    /**
     * Recupera il valore della proprietà formato.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFormato() {
        return formato;
    }

    /**
     * Imposta il valore della proprietà formato.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFormato(String value) {
        this.formato = value;
    }

    /**
     * Recupera il valore della proprietà larghezza.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getLarghezza() {
        return larghezza;
    }

    /**
     * Imposta il valore della proprietà larghezza.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setLarghezza(BigDecimal value) {
        this.larghezza = value;
    }

    /**
     * Recupera il valore della proprietà nazFabbricaz.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNazFabbricaz() {
        return nazFabbricaz;
    }

    /**
     * Imposta il valore della proprietà nazFabbricaz.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNazFabbricaz(String value) {
        this.nazFabbricaz = value;
    }

    /**
     * Recupera il valore della proprietà numero.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumero() {
        return numero;
    }

    /**
     * Imposta il valore della proprietà numero.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumero(String value) {
        this.numero = value;
    }

    /**
     * Recupera il valore della proprietà parete.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getParete() {
        return parete;
    }

    /**
     * Imposta il valore della proprietà parete.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setParete(String value) {
        this.parete = value;
    }

    /**
     * Recupera il valore della proprietà peso.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPeso() {
        return peso;
    }

    /**
     * Imposta il valore della proprietà peso.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPeso(String value) {
        this.peso = value;
    }

    /**
     * Recupera il valore della proprietà profondita.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getProfondita() {
        return profondita;
    }

    /**
     * Imposta il valore della proprietà profondita.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setProfondita(BigDecimal value) {
        this.profondita = value;
    }

    /**
     * Recupera il valore della proprietà raee.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRaee() {
        return raee;
    }

    /**
     * Imposta il valore della proprietà raee.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRaee(String value) {
        this.raee = value;
    }

    /**
     * Recupera il valore della proprietà raeeNC.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRaeeNC() {
        return raeeNC;
    }

    /**
     * Imposta il valore della proprietà raeeNC.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRaeeNC(String value) {
        this.raeeNC = value;
    }

    /**
     * Recupera il valore della proprietà tipoContenuto.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoContenuto() {
        return tipoContenuto;
    }

    /**
     * Imposta il valore della proprietà tipoContenuto.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoContenuto(String value) {
        this.tipoContenuto = value;
    }

    /**
     * Recupera il valore della proprietà tv.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTv() {
        return tv;
    }

    /**
     * Imposta il valore della proprietà tv.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTv(String value) {
        this.tv = value;
    }

    /**
     * Recupera il valore della proprietà valoreDichiarato.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValoreDichiarato() {
        return valoreDichiarato;
    }

    /**
     * Imposta il valore della proprietà valoreDichiarato.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValoreDichiarato(String value) {
        this.valoreDichiarato = value;
    }

    /**
     * Recupera il valore della proprietà valoreTotale.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getValoreTotale() {
        return valoreTotale;
    }

    /**
     * Imposta il valore della proprietà valoreTotale.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setValoreTotale(BigDecimal value) {
        this.valoreTotale = value;
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
     *         &lt;element name="codNazioneProvenienza" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
     *         &lt;element name="codiceTariffaDoganale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
     *         &lt;element name="descrizione" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
     *         &lt;element name="peso" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
     *         &lt;element name="quantita" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
     *         &lt;element name="valore" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
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
        "codNazioneProvenienza",
        "codiceTariffaDoganale",
        "descrizione",
        "peso",
        "quantita",
        "valore"
    })
    public static class Articoli {

        protected String codNazioneProvenienza;
        protected String codiceTariffaDoganale;
        protected String descrizione;
        protected String peso;
        protected String quantita;
        protected String valore;

        /**
         * Recupera il valore della proprietà codNazioneProvenienza.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodNazioneProvenienza() {
            return codNazioneProvenienza;
        }

        /**
         * Imposta il valore della proprietà codNazioneProvenienza.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodNazioneProvenienza(String value) {
            this.codNazioneProvenienza = value;
        }

        /**
         * Recupera il valore della proprietà codiceTariffaDoganale.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodiceTariffaDoganale() {
            return codiceTariffaDoganale;
        }

        /**
         * Imposta il valore della proprietà codiceTariffaDoganale.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodiceTariffaDoganale(String value) {
            this.codiceTariffaDoganale = value;
        }

        /**
         * Recupera il valore della proprietà descrizione.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getDescrizione() {
            return descrizione;
        }

        /**
         * Imposta il valore della proprietà descrizione.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setDescrizione(String value) {
            this.descrizione = value;
        }

        /**
         * Recupera il valore della proprietà peso.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getPeso() {
            return peso;
        }

        /**
         * Imposta il valore della proprietà peso.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setPeso(String value) {
            this.peso = value;
        }

        /**
         * Recupera il valore della proprietà quantita.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getQuantita() {
            return quantita;
        }

        /**
         * Imposta il valore della proprietà quantita.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setQuantita(String value) {
            this.quantita = value;
        }

        /**
         * Recupera il valore della proprietà valore.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValore() {
            return valore;
        }

        /**
         * Imposta il valore della proprietà valore.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValore(String value) {
            this.valore = value;
        }

    }

}
