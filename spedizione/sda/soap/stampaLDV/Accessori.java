
package it.postel.bancarizzazioneGUI.spedizione.sda.soap.stampaLDV;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java per accessori complex type.
 * 
 * <p>Il seguente frammento di schema specifica il contenuto previsto contenuto in questa classe.
 * 
 * <pre>
 * &lt;complexType name="accessori"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="adr" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="alPiano" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="conAscensore" minOccurs="0"&gt;
 *                     &lt;simpleType&gt;
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *                         &lt;enumeration value="SI"/&gt;
 *                         &lt;enumeration value="NO"/&gt;
 *                       &lt;/restriction&gt;
 *                     &lt;/simpleType&gt;
 *                   &lt;/element&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="appuntamento" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="assicurata" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="assicurataCodice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="assicurataExportBox" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="assicurataCodice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="assicurataPercentuale" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="assicurataValore" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="assicurataRoadEurope" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="assicurataValore" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="assicurataCronoInternazionale" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="assicurataCodice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="casellaPostale" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="codCasellaPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                   &lt;element name="codUfficioPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="consegnaProgrammata" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="giorniAM" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                   &lt;element name="finestraAM" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                   &lt;element name="giorniPM" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                   &lt;element name="finestraPM" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="consegnaStabilita" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="dataConsegna" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                   &lt;element name="fasciaOraria"&gt;
 *                     &lt;complexType&gt;
 *                       &lt;complexContent&gt;
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                           &lt;sequence&gt;
 *                             &lt;element name="codice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                           &lt;/sequence&gt;
 *                         &lt;/restriction&gt;
 *                       &lt;/complexContent&gt;
 *                     &lt;/complexType&gt;
 *                   &lt;/element&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="contrassegno" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="codTipoPagamento" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                   &lt;element name="contrassegnoValore" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="fermoPosta" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="codUfficioPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="apt" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="altezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *                   &lt;element name="codUfficioPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                   &lt;element name="larghezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *                   &lt;element name="lunghezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="rtz" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="altezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *                   &lt;element name="codUfficioPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                   &lt;element name="larghezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *                   &lt;element name="lunghezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="consegnaVicino" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="nominativo" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="sabato" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="sera" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="timeDefinite" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="timeDefCodice"&gt;
 *                     &lt;simpleType&gt;
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *                         &lt;enumeration value="T09"/&gt;
 *                         &lt;enumeration value="T10"/&gt;
 *                         &lt;enumeration value="T12"/&gt;
 *                       &lt;/restriction&gt;
 *                     &lt;/simpleType&gt;
 *                   &lt;/element&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="apo" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="pkp" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="consegnaDesignata" minOccurs="0"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="sms" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                   &lt;element name="email" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="accettazioneUfficioPostale" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="accettazionePuntoPoste" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="accettazionePuntoPosteLocker" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="ritiroADomicilio" minOccurs="0"&gt;
 *           &lt;simpleType&gt;
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *               &lt;enumeration value="SI"/&gt;
 *               &lt;enumeration value="NO"/&gt;
 *             &lt;/restriction&gt;
 *           &lt;/simpleType&gt;
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
@XmlType(name = "accessori", propOrder = {
    "adr",
    "alPiano",
    "appuntamento",
    "assicurata",
    "assicurataExportBox",
    "assicurataPercentuale",
    "assicurataRoadEurope",
    "assicurataCronoInternazionale",
    "casellaPostale",
    "consegnaProgrammata",
    "consegnaStabilita",
    "contrassegno",
    "fermoPosta",
    "apt",
    "rtz",
    "consegnaVicino",
    "sabato",
    "sera",
    "timeDefinite",
    "apo",
    "pkp",
    "consegnaDesignata",
    "accettazioneUfficioPostale",
    "accettazionePuntoPoste",
    "accettazionePuntoPosteLocker",
    "ritiroADomicilio"
})
public class Accessori {

    protected String adr;
    protected Accessori.AlPiano alPiano;
    protected String appuntamento;
    protected Accessori.Assicurata assicurata;
    protected Accessori.AssicurataExportBox assicurataExportBox;
    protected Accessori.AssicurataPercentuale assicurataPercentuale;
    protected Accessori.AssicurataRoadEurope assicurataRoadEurope;
    protected Accessori.AssicurataCronoInternazionale assicurataCronoInternazionale;
    protected Accessori.CasellaPostale casellaPostale;
    protected Accessori.ConsegnaProgrammata consegnaProgrammata;
    protected Accessori.ConsegnaStabilita consegnaStabilita;
    protected Accessori.Contrassegno contrassegno;
    protected Accessori.FermoPosta fermoPosta;
    protected Accessori.Apt apt;
    protected Accessori.Rtz rtz;
    protected Accessori.ConsegnaVicino consegnaVicino;
    protected String sabato;
    protected String sera;
    protected Accessori.TimeDefinite timeDefinite;
    protected String apo;
    protected String pkp;
    protected Accessori.ConsegnaDesignata consegnaDesignata;
    protected String accettazioneUfficioPostale;
    protected String accettazionePuntoPoste;
    protected String accettazionePuntoPosteLocker;
    protected String ritiroADomicilio;

    /**
     * Recupera il valore della proprietà adr.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAdr() {
        return adr;
    }

    /**
     * Imposta il valore della proprietà adr.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAdr(String value) {
        this.adr = value;
    }

    /**
     * Recupera il valore della proprietà alPiano.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.AlPiano }
     *     
     */
    public Accessori.AlPiano getAlPiano() {
        return alPiano;
    }

    /**
     * Imposta il valore della proprietà alPiano.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.AlPiano }
     *     
     */
    public void setAlPiano(Accessori.AlPiano value) {
        this.alPiano = value;
    }

    /**
     * Recupera il valore della proprietà appuntamento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAppuntamento() {
        return appuntamento;
    }

    /**
     * Imposta il valore della proprietà appuntamento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAppuntamento(String value) {
        this.appuntamento = value;
    }

    /**
     * Recupera il valore della proprietà assicurata.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.Assicurata }
     *     
     */
    public Accessori.Assicurata getAssicurata() {
        return assicurata;
    }

    /**
     * Imposta il valore della proprietà assicurata.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.Assicurata }
     *     
     */
    public void setAssicurata(Accessori.Assicurata value) {
        this.assicurata = value;
    }

    /**
     * Recupera il valore della proprietà assicurataExportBox.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.AssicurataExportBox }
     *     
     */
    public Accessori.AssicurataExportBox getAssicurataExportBox() {
        return assicurataExportBox;
    }

    /**
     * Imposta il valore della proprietà assicurataExportBox.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.AssicurataExportBox }
     *     
     */
    public void setAssicurataExportBox(Accessori.AssicurataExportBox value) {
        this.assicurataExportBox = value;
    }

    /**
     * Recupera il valore della proprietà assicurataPercentuale.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.AssicurataPercentuale }
     *     
     */
    public Accessori.AssicurataPercentuale getAssicurataPercentuale() {
        return assicurataPercentuale;
    }

    /**
     * Imposta il valore della proprietà assicurataPercentuale.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.AssicurataPercentuale }
     *     
     */
    public void setAssicurataPercentuale(Accessori.AssicurataPercentuale value) {
        this.assicurataPercentuale = value;
    }

    /**
     * Recupera il valore della proprietà assicurataRoadEurope.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.AssicurataRoadEurope }
     *     
     */
    public Accessori.AssicurataRoadEurope getAssicurataRoadEurope() {
        return assicurataRoadEurope;
    }

    /**
     * Imposta il valore della proprietà assicurataRoadEurope.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.AssicurataRoadEurope }
     *     
     */
    public void setAssicurataRoadEurope(Accessori.AssicurataRoadEurope value) {
        this.assicurataRoadEurope = value;
    }

    /**
     * Recupera il valore della proprietà assicurataCronoInternazionale.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.AssicurataCronoInternazionale }
     *     
     */
    public Accessori.AssicurataCronoInternazionale getAssicurataCronoInternazionale() {
        return assicurataCronoInternazionale;
    }

    /**
     * Imposta il valore della proprietà assicurataCronoInternazionale.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.AssicurataCronoInternazionale }
     *     
     */
    public void setAssicurataCronoInternazionale(Accessori.AssicurataCronoInternazionale value) {
        this.assicurataCronoInternazionale = value;
    }

    /**
     * Recupera il valore della proprietà casellaPostale.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.CasellaPostale }
     *     
     */
    public Accessori.CasellaPostale getCasellaPostale() {
        return casellaPostale;
    }

    /**
     * Imposta il valore della proprietà casellaPostale.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.CasellaPostale }
     *     
     */
    public void setCasellaPostale(Accessori.CasellaPostale value) {
        this.casellaPostale = value;
    }

    /**
     * Recupera il valore della proprietà consegnaProgrammata.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.ConsegnaProgrammata }
     *     
     */
    public Accessori.ConsegnaProgrammata getConsegnaProgrammata() {
        return consegnaProgrammata;
    }

    /**
     * Imposta il valore della proprietà consegnaProgrammata.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.ConsegnaProgrammata }
     *     
     */
    public void setConsegnaProgrammata(Accessori.ConsegnaProgrammata value) {
        this.consegnaProgrammata = value;
    }

    /**
     * Recupera il valore della proprietà consegnaStabilita.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.ConsegnaStabilita }
     *     
     */
    public Accessori.ConsegnaStabilita getConsegnaStabilita() {
        return consegnaStabilita;
    }

    /**
     * Imposta il valore della proprietà consegnaStabilita.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.ConsegnaStabilita }
     *     
     */
    public void setConsegnaStabilita(Accessori.ConsegnaStabilita value) {
        this.consegnaStabilita = value;
    }

    /**
     * Recupera il valore della proprietà contrassegno.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.Contrassegno }
     *     
     */
    public Accessori.Contrassegno getContrassegno() {
        return contrassegno;
    }

    /**
     * Imposta il valore della proprietà contrassegno.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.Contrassegno }
     *     
     */
    public void setContrassegno(Accessori.Contrassegno value) {
        this.contrassegno = value;
    }

    /**
     * Recupera il valore della proprietà fermoPosta.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.FermoPosta }
     *     
     */
    public Accessori.FermoPosta getFermoPosta() {
        return fermoPosta;
    }

    /**
     * Imposta il valore della proprietà fermoPosta.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.FermoPosta }
     *     
     */
    public void setFermoPosta(Accessori.FermoPosta value) {
        this.fermoPosta = value;
    }

    /**
     * Recupera il valore della proprietà apt.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.Apt }
     *     
     */
    public Accessori.Apt getApt() {
        return apt;
    }

    /**
     * Imposta il valore della proprietà apt.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.Apt }
     *     
     */
    public void setApt(Accessori.Apt value) {
        this.apt = value;
    }

    /**
     * Recupera il valore della proprietà rtz.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.Rtz }
     *     
     */
    public Accessori.Rtz getRtz() {
        return rtz;
    }

    /**
     * Imposta il valore della proprietà rtz.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.Rtz }
     *     
     */
    public void setRtz(Accessori.Rtz value) {
        this.rtz = value;
    }

    /**
     * Recupera il valore della proprietà consegnaVicino.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.ConsegnaVicino }
     *     
     */
    public Accessori.ConsegnaVicino getConsegnaVicino() {
        return consegnaVicino;
    }

    /**
     * Imposta il valore della proprietà consegnaVicino.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.ConsegnaVicino }
     *     
     */
    public void setConsegnaVicino(Accessori.ConsegnaVicino value) {
        this.consegnaVicino = value;
    }

    /**
     * Recupera il valore della proprietà sabato.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSabato() {
        return sabato;
    }

    /**
     * Imposta il valore della proprietà sabato.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSabato(String value) {
        this.sabato = value;
    }

    /**
     * Recupera il valore della proprietà sera.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSera() {
        return sera;
    }

    /**
     * Imposta il valore della proprietà sera.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSera(String value) {
        this.sera = value;
    }

    /**
     * Recupera il valore della proprietà timeDefinite.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.TimeDefinite }
     *     
     */
    public Accessori.TimeDefinite getTimeDefinite() {
        return timeDefinite;
    }

    /**
     * Imposta il valore della proprietà timeDefinite.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.TimeDefinite }
     *     
     */
    public void setTimeDefinite(Accessori.TimeDefinite value) {
        this.timeDefinite = value;
    }

    /**
     * Recupera il valore della proprietà apo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getApo() {
        return apo;
    }

    /**
     * Imposta il valore della proprietà apo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setApo(String value) {
        this.apo = value;
    }

    /**
     * Recupera il valore della proprietà pkp.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPkp() {
        return pkp;
    }

    /**
     * Imposta il valore della proprietà pkp.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPkp(String value) {
        this.pkp = value;
    }

    /**
     * Recupera il valore della proprietà consegnaDesignata.
     * 
     * @return
     *     possible object is
     *     {@link Accessori.ConsegnaDesignata }
     *     
     */
    public Accessori.ConsegnaDesignata getConsegnaDesignata() {
        return consegnaDesignata;
    }

    /**
     * Imposta il valore della proprietà consegnaDesignata.
     * 
     * @param value
     *     allowed object is
     *     {@link Accessori.ConsegnaDesignata }
     *     
     */
    public void setConsegnaDesignata(Accessori.ConsegnaDesignata value) {
        this.consegnaDesignata = value;
    }

    /**
     * Recupera il valore della proprietà accettazioneUfficioPostale.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccettazioneUfficioPostale() {
        return accettazioneUfficioPostale;
    }

    /**
     * Imposta il valore della proprietà accettazioneUfficioPostale.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccettazioneUfficioPostale(String value) {
        this.accettazioneUfficioPostale = value;
    }

    /**
     * Recupera il valore della proprietà accettazionePuntoPoste.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccettazionePuntoPoste() {
        return accettazionePuntoPoste;
    }

    /**
     * Imposta il valore della proprietà accettazionePuntoPoste.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccettazionePuntoPoste(String value) {
        this.accettazionePuntoPoste = value;
    }

    /**
     * Recupera il valore della proprietà accettazionePuntoPosteLocker.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccettazionePuntoPosteLocker() {
        return accettazionePuntoPosteLocker;
    }

    /**
     * Imposta il valore della proprietà accettazionePuntoPosteLocker.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccettazionePuntoPosteLocker(String value) {
        this.accettazionePuntoPosteLocker = value;
    }

    /**
     * Recupera il valore della proprietà ritiroADomicilio.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRitiroADomicilio() {
        return ritiroADomicilio;
    }

    /**
     * Imposta il valore della proprietà ritiroADomicilio.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRitiroADomicilio(String value) {
        this.ritiroADomicilio = value;
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
     *         &lt;element name="conAscensore" minOccurs="0"&gt;
     *           &lt;simpleType&gt;
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
     *               &lt;enumeration value="SI"/&gt;
     *               &lt;enumeration value="NO"/&gt;
     *             &lt;/restriction&gt;
     *           &lt;/simpleType&gt;
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
        "conAscensore"
    })
    public static class AlPiano {

        protected String conAscensore;

        /**
         * Recupera il valore della proprietà conAscensore.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConAscensore() {
            return conAscensore;
        }

        /**
         * Imposta il valore della proprietà conAscensore.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConAscensore(String value) {
            this.conAscensore = value;
        }

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
     *         &lt;element name="altezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
     *         &lt;element name="codUfficioPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
     *         &lt;element name="larghezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
     *         &lt;element name="lunghezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
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
        "altezza",
        "codUfficioPostale",
        "larghezza",
        "lunghezza"
    })
    public static class Apt {

        @XmlElement(required = true)
        protected BigDecimal altezza;
        @XmlElement(required = true)
        protected String codUfficioPostale;
        @XmlElement(required = true)
        protected BigDecimal larghezza;
        @XmlElement(required = true)
        protected BigDecimal lunghezza;

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
         * Recupera il valore della proprietà codUfficioPostale.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodUfficioPostale() {
            return codUfficioPostale;
        }

        /**
         * Imposta il valore della proprietà codUfficioPostale.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodUfficioPostale(String value) {
            this.codUfficioPostale = value;
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
         * Recupera il valore della proprietà lunghezza.
         * 
         * @return
         *     possible object is
         *     {@link BigDecimal }
         *     
         */
        public BigDecimal getLunghezza() {
            return lunghezza;
        }

        /**
         * Imposta il valore della proprietà lunghezza.
         * 
         * @param value
         *     allowed object is
         *     {@link BigDecimal }
         *     
         */
        public void setLunghezza(BigDecimal value) {
            this.lunghezza = value;
        }

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
     *         &lt;element name="assicurataCodice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "assicurataCodice"
    })
    public static class Assicurata {

        @XmlElement(required = true)
        protected String assicurataCodice;

        /**
         * Recupera il valore della proprietà assicurataCodice.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getAssicurataCodice() {
            return assicurataCodice;
        }

        /**
         * Imposta il valore della proprietà assicurataCodice.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setAssicurataCodice(String value) {
            this.assicurataCodice = value;
        }

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
     *         &lt;element name="assicurataCodice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "assicurataCodice"
    })
    public static class AssicurataCronoInternazionale {

        @XmlElement(required = true)
        protected String assicurataCodice;

        /**
         * Recupera il valore della proprietà assicurataCodice.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getAssicurataCodice() {
            return assicurataCodice;
        }

        /**
         * Imposta il valore della proprietà assicurataCodice.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setAssicurataCodice(String value) {
            this.assicurataCodice = value;
        }

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
     *         &lt;element name="assicurataCodice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "assicurataCodice"
    })
    public static class AssicurataExportBox {

        @XmlElement(required = true)
        protected String assicurataCodice;

        /**
         * Recupera il valore della proprietà assicurataCodice.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getAssicurataCodice() {
            return assicurataCodice;
        }

        /**
         * Imposta il valore della proprietà assicurataCodice.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setAssicurataCodice(String value) {
            this.assicurataCodice = value;
        }

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
     *         &lt;element name="assicurataValore" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "assicurataValore"
    })
    public static class AssicurataPercentuale {

        @XmlElement(required = true)
        protected String assicurataValore;

        /**
         * Recupera il valore della proprietà assicurataValore.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getAssicurataValore() {
            return assicurataValore;
        }

        /**
         * Imposta il valore della proprietà assicurataValore.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setAssicurataValore(String value) {
            this.assicurataValore = value;
        }

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
     *         &lt;element name="assicurataValore" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "assicurataValore"
    })
    public static class AssicurataRoadEurope {

        @XmlElement(required = true)
        protected String assicurataValore;

        /**
         * Recupera il valore della proprietà assicurataValore.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getAssicurataValore() {
            return assicurataValore;
        }

        /**
         * Imposta il valore della proprietà assicurataValore.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setAssicurataValore(String value) {
            this.assicurataValore = value;
        }

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
     *         &lt;element name="codCasellaPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
     *         &lt;element name="codUfficioPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "codCasellaPostale",
        "codUfficioPostale"
    })
    public static class CasellaPostale {

        @XmlElement(required = true)
        protected String codCasellaPostale;
        @XmlElement(required = true)
        protected String codUfficioPostale;

        /**
         * Recupera il valore della proprietà codCasellaPostale.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodCasellaPostale() {
            return codCasellaPostale;
        }

        /**
         * Imposta il valore della proprietà codCasellaPostale.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodCasellaPostale(String value) {
            this.codCasellaPostale = value;
        }

        /**
         * Recupera il valore della proprietà codUfficioPostale.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodUfficioPostale() {
            return codUfficioPostale;
        }

        /**
         * Imposta il valore della proprietà codUfficioPostale.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodUfficioPostale(String value) {
            this.codUfficioPostale = value;
        }

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
     *         &lt;element name="sms" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
     *         &lt;element name="email" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
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
        "sms",
        "email"
    })
    public static class ConsegnaDesignata {

        protected String sms;
        protected String email;

        /**
         * Recupera il valore della proprietà sms.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getSms() {
            return sms;
        }

        /**
         * Imposta il valore della proprietà sms.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setSms(String value) {
            this.sms = value;
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
     *         &lt;element name="giorniAM" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/&gt;
     *         &lt;element name="finestraAM" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
     *         &lt;element name="giorniPM" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/&gt;
     *         &lt;element name="finestraPM" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
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
        "giorniAM",
        "finestraAM",
        "giorniPM",
        "finestraPM"
    })
    public static class ConsegnaProgrammata {

        protected List<String> giorniAM;
        protected String finestraAM;
        protected List<String> giorniPM;
        protected String finestraPM;

        /**
         * Gets the value of the giorniAM property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the giorniAM property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getGiorniAM().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         * 
         * 
         */
        public List<String> getGiorniAM() {
            if (giorniAM == null) {
                giorniAM = new ArrayList<String>();
            }
            return this.giorniAM;
        }

        /**
         * Recupera il valore della proprietà finestraAM.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getFinestraAM() {
            return finestraAM;
        }

        /**
         * Imposta il valore della proprietà finestraAM.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setFinestraAM(String value) {
            this.finestraAM = value;
        }

        /**
         * Gets the value of the giorniPM property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the giorniPM property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getGiorniPM().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         * 
         * 
         */
        public List<String> getGiorniPM() {
            if (giorniPM == null) {
                giorniPM = new ArrayList<String>();
            }
            return this.giorniPM;
        }

        /**
         * Recupera il valore della proprietà finestraPM.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getFinestraPM() {
            return finestraPM;
        }

        /**
         * Imposta il valore della proprietà finestraPM.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setFinestraPM(String value) {
            this.finestraPM = value;
        }

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
     *         &lt;element name="dataConsegna" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
     *         &lt;element name="fasciaOraria"&gt;
     *           &lt;complexType&gt;
     *             &lt;complexContent&gt;
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
     *                 &lt;sequence&gt;
     *                   &lt;element name="codice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "dataConsegna",
        "fasciaOraria"
    })
    public static class ConsegnaStabilita {

        @XmlElement(required = true)
        protected String dataConsegna;
        @XmlElement(required = true)
        protected Accessori.ConsegnaStabilita.FasciaOraria fasciaOraria;

        /**
         * Recupera il valore della proprietà dataConsegna.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getDataConsegna() {
            return dataConsegna;
        }

        /**
         * Imposta il valore della proprietà dataConsegna.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setDataConsegna(String value) {
            this.dataConsegna = value;
        }

        /**
         * Recupera il valore della proprietà fasciaOraria.
         * 
         * @return
         *     possible object is
         *     {@link Accessori.ConsegnaStabilita.FasciaOraria }
         *     
         */
        public Accessori.ConsegnaStabilita.FasciaOraria getFasciaOraria() {
            return fasciaOraria;
        }

        /**
         * Imposta il valore della proprietà fasciaOraria.
         * 
         * @param value
         *     allowed object is
         *     {@link Accessori.ConsegnaStabilita.FasciaOraria }
         *     
         */
        public void setFasciaOraria(Accessori.ConsegnaStabilita.FasciaOraria value) {
            this.fasciaOraria = value;
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
         *         &lt;element name="codice" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
            "codice"
        })
        public static class FasciaOraria {

            @XmlElement(required = true)
            protected String codice;

            /**
             * Recupera il valore della proprietà codice.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCodice() {
                return codice;
            }

            /**
             * Imposta il valore della proprietà codice.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCodice(String value) {
                this.codice = value;
            }

        }

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
     *         &lt;element name="nominativo" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "nominativo"
    })
    public static class ConsegnaVicino {

        @XmlElement(required = true)
        protected String nominativo;

        /**
         * Recupera il valore della proprietà nominativo.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getNominativo() {
            return nominativo;
        }

        /**
         * Imposta il valore della proprietà nominativo.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setNominativo(String value) {
            this.nominativo = value;
        }

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
     *         &lt;element name="codTipoPagamento" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
     *         &lt;element name="contrassegnoValore" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
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
        "codTipoPagamento",
        "contrassegnoValore"
    })
    public static class Contrassegno {

        @XmlElement(required = true)
        protected String codTipoPagamento;
        @XmlElement(required = true)
        protected BigDecimal contrassegnoValore;

        /**
         * Recupera il valore della proprietà codTipoPagamento.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodTipoPagamento() {
            return codTipoPagamento;
        }

        /**
         * Imposta il valore della proprietà codTipoPagamento.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodTipoPagamento(String value) {
            this.codTipoPagamento = value;
        }

        /**
         * Recupera il valore della proprietà contrassegnoValore.
         * 
         * @return
         *     possible object is
         *     {@link BigDecimal }
         *     
         */
        public BigDecimal getContrassegnoValore() {
            return contrassegnoValore;
        }

        /**
         * Imposta il valore della proprietà contrassegnoValore.
         * 
         * @param value
         *     allowed object is
         *     {@link BigDecimal }
         *     
         */
        public void setContrassegnoValore(BigDecimal value) {
            this.contrassegnoValore = value;
        }

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
     *         &lt;element name="codUfficioPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
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
        "codUfficioPostale"
    })
    public static class FermoPosta {

        @XmlElement(required = true)
        protected String codUfficioPostale;

        /**
         * Recupera il valore della proprietà codUfficioPostale.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodUfficioPostale() {
            return codUfficioPostale;
        }

        /**
         * Imposta il valore della proprietà codUfficioPostale.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodUfficioPostale(String value) {
            this.codUfficioPostale = value;
        }

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
     *         &lt;element name="altezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
     *         &lt;element name="codUfficioPostale" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
     *         &lt;element name="larghezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
     *         &lt;element name="lunghezza" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
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
        "altezza",
        "codUfficioPostale",
        "larghezza",
        "lunghezza"
    })
    public static class Rtz {

        @XmlElement(required = true)
        protected BigDecimal altezza;
        @XmlElement(required = true)
        protected String codUfficioPostale;
        @XmlElement(required = true)
        protected BigDecimal larghezza;
        @XmlElement(required = true)
        protected BigDecimal lunghezza;

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
         * Recupera il valore della proprietà codUfficioPostale.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodUfficioPostale() {
            return codUfficioPostale;
        }

        /**
         * Imposta il valore della proprietà codUfficioPostale.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodUfficioPostale(String value) {
            this.codUfficioPostale = value;
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
         * Recupera il valore della proprietà lunghezza.
         * 
         * @return
         *     possible object is
         *     {@link BigDecimal }
         *     
         */
        public BigDecimal getLunghezza() {
            return lunghezza;
        }

        /**
         * Imposta il valore della proprietà lunghezza.
         * 
         * @param value
         *     allowed object is
         *     {@link BigDecimal }
         *     
         */
        public void setLunghezza(BigDecimal value) {
            this.lunghezza = value;
        }

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
     *         &lt;element name="timeDefCodice"&gt;
     *           &lt;simpleType&gt;
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
     *               &lt;enumeration value="T09"/&gt;
     *               &lt;enumeration value="T10"/&gt;
     *               &lt;enumeration value="T12"/&gt;
     *             &lt;/restriction&gt;
     *           &lt;/simpleType&gt;
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
        "timeDefCodice"
    })
    public static class TimeDefinite {

        @XmlElement(required = true)
        protected String timeDefCodice;

        /**
         * Recupera il valore della proprietà timeDefCodice.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTimeDefCodice() {
            return timeDefCodice;
        }

        /**
         * Imposta il valore della proprietà timeDefCodice.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTimeDefCodice(String value) {
            this.timeDefCodice = value;
        }

    }

}
