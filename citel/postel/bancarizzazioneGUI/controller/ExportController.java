package it.citel.postel.bancarizzazioneGUI.controller;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.supercsv.cellprocessor.Optional;
import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.io.CsvMapWriter;
import org.supercsv.io.ICsvMapWriter;
import org.supercsv.prefs.CsvPreference;

import it.citel.postel.bancarizzazioneGUI.service.MonitorService;
import it.citel.postel.bancarizzazioneGUI.service.RicercheService;
import it.citel.postel.commonLib.constants.Constants;
import it.citel.postel.commonLib.model.Form;
import it.citel.postel.commonLib.rest.model.Request;
import it.citel.postel.commonLib.rest.model.Response;
import it.citel.postel.commonLib.rest.model.ResponseAlerting;
import it.citel.postel.commonLib.rest.model.ResponseLavPacchettoCustom;
import it.citel.postel.commonLib.rest.model.ResponseLavScatoleCustom;
import it.citel.postel.commonLib.rest.model.ResponseRicercaLavorazioni;
import it.citel.postel.commonLib.rest.model.ResponseRicercaPacchetto;
import it.citel.postel.commonLib.rest.model.ResponseRicercaPraticaSLA;
import it.citel.postel.commonLib.rest.model.ResponseRicercaPratiche;
import it.citel.postel.commonLib.rest.model.ResponseRicerchePreadvisingExport;
import it.citel.postel.commonLib.rest.model.ResponseScatola;
import it.citel.postel.commonLib.rest.model.ResponseScatolaExport;
import it.citel.postel.commonLib.rest.model.ResponseSospesiExport;
import it.citel.postel.validator.ExportColumn;

@Controller
@RequestMapping("/download")
public class ExportController<K> {
	static final Logger log = LogManager.getLogger(ExportController.class);
	@Autowired
	RicercheService ricercheService;
	@Autowired
	MonitorService monitorService;

	@RequestMapping(value = "/csv", method = { RequestMethod.POST, RequestMethod.GET })
	public void downloadCSV(Form form, HttpServletResponse response, ModelMap model) throws IOException {
		Request<Form> request = new Request<>();
		ICsvMapWriter mapWriter = null;
		Response<?> responseGeneric = null;
		List<?> list = null;
		String[] header = null;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
			Date now = new Date();
			String strDate = sdf.format(now);
//			if(form.getTypeExport().equals(Constants.PACCHETTO)) {
//				prepareResponse(response, "Report_"+Constants.PACCHETTO+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaPacchettiExport(request.setData(form));				
//			}else if(form.getTypeExport().equals(Constants.PRATICHE)) {
//				prepareResponse(response, "Report_"+Constants.PRATICHE+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaPraticheExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.LAVORAZIONI_PRATICHE)) {
//				prepareResponse(response, "Report_"+Constants.LAVORAZIONI_PRATICHE+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaLavorazioniPraticheExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.LAVORAZIONI_PACCHETTO)) {
//				prepareResponse(response, "Report_"+Constants.LAVORAZIONI_PACCHETTO+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaLavorazioniPacchettoExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.LAVORAZIONI_SCATOLE)) {
//				prepareResponse(response, "Report_"+Constants.LAVORAZIONI_SCATOLE+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaLavorazioniScatoleExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.PREADVISING)) {
//				prepareResponse(response, "Report_"+Constants.PREADVISING+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaPreadvisingExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.ALERTING)) {
//				prepareResponse(response, "Report_"+Constants.ALERTING+"_"+strDate+".csv");
//				responseGeneric = monitorService.getAlertingExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.SCATOLE)) {
//				prepareResponse(response, "Report_"+Constants.SCATOLE+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaScatoleExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.SOSPESI)) {
//				prepareResponse(response, "Report_"+Constants.SOSPESI+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaSospesiExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.SLA)) {
//				prepareResponse(response, "Report_"+Constants.SLA+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaSlaExport(request.setData(form));
//			}else if(form.getTypeExport().equals(Constants.GESTIONE_SCATOLE)) {
//				prepareResponse(response, "Report_"+Constants.GESTIONE_SCATOLE+"_"+strDate+".csv");
//				responseGeneric = ricercheService.ricercaGestScatoleExport(request.setData(form));
//			}						
			
			if(responseGeneric.getData() != null ) {			
				if(responseGeneric.getData() instanceof ResponseRicercaPacchetto) {
					ResponseRicercaPacchetto responsePacchetto = (ResponseRicercaPacchetto) responseGeneric.getData();
					list = responsePacchetto.getListPacchetto();					
				}else if(responseGeneric.getData() instanceof ResponseRicercaPratiche) {
					ResponseRicercaPratiche responsePratiche = (ResponseRicercaPratiche) responseGeneric.getData();
					list = responsePratiche.getListPratiche();
				}else if(responseGeneric.getData() instanceof ResponseRicercaLavorazioni) {
					ResponseRicercaLavorazioni responsePratiche = (ResponseRicercaLavorazioni) responseGeneric.getData();
					list = responsePratiche.getLstLavorazioni();
				}else if(responseGeneric.getData() instanceof ResponseLavPacchettoCustom) {
					ResponseLavPacchettoCustom responsePratiche = (ResponseLavPacchettoCustom) responseGeneric.getData();
					list = responsePratiche.getData();
				}else if(responseGeneric.getData() instanceof ResponseLavScatoleCustom) {
					ResponseLavScatoleCustom responsePratiche = (ResponseLavScatoleCustom) responseGeneric.getData();
					list = responsePratiche.getData();
				}else if(responseGeneric.getData() instanceof ResponseRicerchePreadvisingExport) {
					ResponseRicerchePreadvisingExport responsePratiche = (ResponseRicerchePreadvisingExport) responseGeneric.getData();
					list = responsePratiche.getData();
				}else if(responseGeneric.getData() instanceof ResponseAlerting) {
					ResponseAlerting responsePratiche = (ResponseAlerting) responseGeneric.getData();
					list = responsePratiche.getData();
				}else if(responseGeneric.getData() instanceof ResponseScatolaExport) {
					ResponseScatolaExport responseScatole = (ResponseScatolaExport) responseGeneric.getData();
					list = responseScatole.getListScatole();
				}else if(responseGeneric.getData() instanceof ResponseSospesiExport) {
					ResponseSospesiExport responseSospesi = (ResponseSospesiExport) responseGeneric.getData();
					list = responseSospesi.getListSospesi();
				}else if(responseGeneric.getData() instanceof ResponseRicercaPraticaSLA) {
					ResponseRicercaPraticaSLA responseSla = (ResponseRicercaPraticaSLA) responseGeneric.getData();
					list = responseSla.getListPraticaSLA();
				}else if(responseGeneric.getData() instanceof ResponseScatola) {
					ResponseScatola responseScatole = (ResponseScatola) responseGeneric.getData();
					list = responseScatole.getListScatole();
				}	
				
				
				if(!list.isEmpty()){
					mapWriter = new CsvMapWriter(response.getWriter(), CsvPreference.EXCEL_NORTH_EUROPE_PREFERENCE);
					header = makeHeader(list.get(0).getClass());
					final CellProcessor[] processors = getProcessors(header.length);
				
					mapWriter.writeHeader(header);
					List<Map<String,Object>> mapList = makeMap(list.get(0).getClass(),list);
					for (Map<String,Object> row : mapList) {				
						mapWriter.write(row, header, processors);
					}	
				}
						
			}		

		}catch(Exception ex) {
			log.error(ex.getMessage(), ex);
		}finally {
			if (mapWriter != null) {
				mapWriter.close();
			}
		}

	}

	private <T> String[] makeHeader(Class<T> klazz) {
		List<String> headerList = new ArrayList<>();
		Field[] fields = klazz.getDeclaredFields();
		log.debug("fields: ", fields.length);	
		for (Field field : fields) {
			if (field.isAnnotationPresent(ExportColumn.class)) {
				Annotation annotation = field.getAnnotation(ExportColumn.class);				
				ExportColumn name = (ExportColumn) annotation;
				headerList.add(name.column());
			}
		}
		
		String[] header = new String[headerList.size()];
		header = headerList.toArray(header);
		return header;
	}

	private <T> List<Map<String, Object>> makeMap(Class<T> klazz, List<?> listObj) throws Exception {

		Field[] fields = klazz.getDeclaredFields();
		List<Map<String, Object>> mapResult = new ArrayList<>();

		for (Object object : listObj) {
			Map<String, Object> map = new HashMap<>();
			for (Field field : fields) {
				if (field.isAnnotationPresent(ExportColumn.class)) {
					field.setAccessible(true);
					Annotation annotation = field.getAnnotation(ExportColumn.class);				
					ExportColumn name = (ExportColumn) annotation;
					map.put(name.column(), field.get(object));

				}
			}
			mapResult.add(map);
		}
		return mapResult;
	}
	

	private static CellProcessor[] getProcessors(int size) {

		CellProcessor[] processors = new CellProcessor[size];
		for (int i = 0; i < processors.length; i++) {
			processors[i] = new Optional();
		}
		return processors;

	}
	
	
	protected void prepareResponse(HttpServletResponse response, String csvFileName) {
		String headerKey = "Content-Disposition";
		String headerValue = String.format("attachment; filename=\"%s\"", csvFileName);
		response.setContentType(Constants.MIME_CSV);
		response.setHeader(headerKey, headerValue);
	}
}
