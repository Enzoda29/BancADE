var tableDettScatole = null;
var tableDettRaccomandate = null;
var lstPacchettiSelected = null;

$(document).ready(function() {
	tableDettScatole = $('#tableDettScatole').DataTable({
//		"paging":   false,
//        "scrollY":  "300px",
//        "scrollCollapse": true,
//        "ordering": true,
//        "info":     false,
        "searching":  	false,
		"columnDefs" : [ {
			"targets" : 0,			
			"sortable" : false
		} ],
		select: {
            style: 'single',
            selector: 'td:not(:last-child)'
        },
		"language": {
            "lengthMenu": "Mostra _MENU_ record per pagina",
            "zeroRecords": "Non sono stati trovati record",
            "info": "Mostra pagina _PAGE_ di _PAGES_",
            "infoEmpty": "Non ci sono record",
            "infoFiltered": "(Filtrati da _MAX_ record totali)",
            "search": "Ricerca:",
            "paginate": {
                "first":      "Primo",
                "last":       "Ultimo",
                "next":       "Prossimo",
                "previous":   "Precedente"
            }
        }
		
	});
	
	tableDettRaccomandate = $('#tableDettRaccomandate').DataTable({
//		"paging":   false,
//        "scrollY":  "300px",
//        "scrollCollapse": true,
//        "ordering": true,
//        "info":     false,
//        "searching":  	true,
		select: {
            style: 'single',
            selector: 'td:not(:last-child)'
        },
		"language": {
            "lengthMenu": "Mostra _MENU_ record per pagina",
            "zeroRecords": "Non sono stati trovati record",
            "info": "Mostra pagina _PAGE_ di _PAGES_",
            "infoEmpty": "Non ci sono record",
            "infoFiltered": "(Filtrati da _MAX_ record totali)",
            "search": "Ricerca:",
            "paginate": {
                "first":      "Primo",
                "last":       "Ultimo",
                "next":       "Prossimo",
                "previous":   "Precedente"
            }
        }
		
	});
	
	$('#dettaglioScatolaModal').on('show.bs.modal', function() {

		if(isScatolaANP()){
			$('#rowTableDettScatole').attr("style","display:none");	
			$('#rowTableDettRaccomandate').attr("style","display:");
		}else{
			$('#rowTableDettScatole').attr("style","display:");
			$('#rowTableDettRaccomandate').attr("style","display:none");
		}

		tableDettScatole.clear().draw();
		tableDettRaccomandate.clear().draw();

		loadDettScatola();
		lstPacchettiSelected = new Array();
		if(idTipoScatola == ID_TIPO_SCATOLA){
			if(statoScatolaSelected == SCATOLA_APERTA){
				$("#btnChangeScatola").show();
				$("#btnChangeScatola").attr("disabled",true);
				tableDettScatole.column(0).visible(true);
				$("#tableDettScatole").attr("style",'');
			}else{
				$("#btnChangeScatola").hide();
				$("#tableDettScatole").attr("style",'');		
				tableDettScatole.column(0).visible(false);				
			}
		}
		


		
	});
	
	$("#btnChangeScatola").click(function(){
		$("#changeScatolaModal").modal('show');
	});
	
	

});

function isScatolaANP(){
	return (codiceScatolaSelected.indexOf('ANP') != -1);
}


function clickAddPacchetto(){
	$("#dettaglioScatolaModal").modal('hide');
	$("#addPacchettoModal").modal();
}

function clickCambioStatoScatola(stato){
	$("#dettaglioScatolaModal").modal('hide');
	cambiaStatoScatola(idScatolaSelected,stato);
}

function clickApriDistinta(){
	$("#dettaglioScatolaModal").modal('hide');
	$("#distintaScatolaModal").modal();
}

function showLoaderLstDettScatola(show){
	$("#loadLstDettScatola").text("Attendere! Caricamento dati in corso...");
	$("#loadLstDettScatola").attr("style",((show)?"display:''":"display:none"));
}

function loadDettScatola() {
	showLoaderLstDettScatola(true);
	var idTipoScatolaVAR = isScatolaANP()?ID_TIPO_SCATOLA_ANP:idTipoScatola;
	var url = contextPath + '/' + 'scatola' + '/dettScatola';
	var request = {	"data" : {	"idScatola" : idScatolaSelected, "idTipoScatola" : idTipoScatolaVAR, "statoScatola":statoScatolaSelected, "codiceScatola":codiceScatolaSelected}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			codiceScatolaSelected = result.data.codiceScatola;
			$("#codiceScatola").text(result.data.codiceScatola);
			var dataCreazioneStr = new Date(result.data.dataCreazione).toLocaleString();	
			$("#dataCreazioneScatola").text(dataCreazioneStr);
			
			var stato = null;
			if(result.data.statoScatola == SCATOLA_APERTA){
				$("#btnCambioScatola").html("<i class='glyphicon glyphicon-folder-close'></i> Chiudi Scatola");
				$("#btnCambioScatola").attr("style","display:''");
				$("#btnCambioScatola").unbind();
				$("#btnCambioScatola").bind("click", function(){clickCambioStatoScatola(STATO_SCATOLA_CHIUSA);});
				$("#addPacchetto").attr("style","display:''");
				$("#openDistinta").attr("style","display:none");
				$("#openDistinta").unbind();
				$("#addPacchetto").unbind();
				$("#addPacchetto").bind("click",clickAddPacchetto);				
			}else
			if(result.data.statoScatola == SCATOLA_CHIUSA){
				$("#btnCambioScatola").html("<i class='glyphicon glyphicon-folder-open'></i> Apri Scatola");
				$("#btnCambioScatola").attr("style","display:''");
				$("#btnCambioScatola").unbind();
				$("#btnCambioScatola").bind("click", function(){clickCambioStatoScatola(STATO_SCATOLA_APERTA);});
				
				$("#addPacchetto").attr("style","display:none");
				$("#btnCambioScatola").attr("style","display:''");
				if(idTipoScatola != ID_TIPO_SCATOLA_ANP){
					$("#openDistinta").attr("style","display:''");
					$("#openDistinta").unbind();
					$("#openDistinta").bind("click",clickApriDistinta);
				}
				$("#addPacchetto").unbind();
			}else
			if((result.data.statoScatola == STATO_SCATOLA_IN_ARCHIVIAZIONE) || (result.data.statoScatola == STATO_SCATOLA_PRONTA_PER_ARCHIVIAZIONE) 
					|| (result.data.statoScatola == STATO_SCATOLA_PRONTA_PER_SPEDIZIONE) || (result.data.statoScatola == STATO_SCATOLA_ARCHIVIATA) 
					|| (result.data.statoScatola == STATO_SCATOLA_ARCHIVIATA)  || (result.data.statoScatola == STATO_SCATOLA_SPEDITA)
					|| (result.data.statoScatola == STATO_SCATOLA_ACCETTATA) || (result.data.statoScatola == STATO_SCATOLA_SOSPESA_DA_ACCETTARE)
					|| (result.data.statoScatola == STATO_SCATOLA_IN_ACCETTAZIONE)){
				$("#btnCambioScatola").attr("style","display:none");
				$("#addPacchetto").attr("style","display:none");				
				$("#openDistinta").attr("style","display:''");
				$("#openDistinta").unbind();
				$("#openDistinta").bind("click",clickApriDistinta);
			}
			$("#statoScatola").text(result.data.statoScatolaDesc);
			
			$("#idPAScatola").text(result.data.identificativoPA);
			$("#tipIstScatola").text(result.data.codiceTipoIstanza);
			$("#numPraticheScatola").text(result.data.numPraticheInserite);
			$("#percComplScatola").text(result.data.percCompletamento);
		
			var dataChiusuraStr = "";
			if(result.data.dataChiusura != null){
				dataChiusuraStr = new Date(result.data.dataChiusura).toLocaleString();	
			}				
			$("#dataChiusuraScatola").text(dataChiusuraStr);
			$("#centroDematScatola").text(result.data.localitaCentroDemat);
			$("#noteScartoScatola").text(result.data.note);
			
            tableDettScatole.clear();
            tableDettScatole.draw();
			var lstPratiche = result.data.lstPratiche;
                        console.log('lstPratiche ', lstPratiche);
                        console.log('lenght ', lstPratiche.length);
			for(var i=0; i<lstPratiche.length; i++){
                            console.log('row ', lstPratiche[i]);
				addPraticheObjDett(lstPratiche[i]);
			}			
			showLoaderLstDettScatola(false);			
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			$('#danger_msg').text(error);
			$('#div_error_alert').show();
		}
	});
}


function clickCheckPacchetto(item,codicePacchetto){
	if(item.checked) {
		var pos = lstPacchettiSelected.indexOf(codicePacchetto);
		if(pos == -1){
			lstPacchettiSelected.push(codicePacchetto);
		}
	}else{
		var pos = lstPacchettiSelected.indexOf(codicePacchetto);
		if(pos != -1){
			lstPacchettiSelected.splice(pos,1);
		}
	}
	$("#btnChangeScatola").attr("disabled",(lstPacchettiSelected.length == 0));
}

function checkAllPacchetto(){
	var lstCheck = $("input[name='checkItemPacchetto']");
	for(var i=0; i<lstCheck.length; i++){
		lstCheck[i].click();
	}
	
}

function addPraticheObjDett(objPratica){
	console.log('objPratica ', objPratica);
	var dataInsPraticaFormatStr = null;
	if(objPratica.dataInserimento != null){
		var dataInsPraticaFormat = new Date(objPratica.dataInserimento);
		dataInsPraticaFormatStr = dataInsPraticaFormat.toLocaleString();
	}
	
	var dataAccettazioneRaccomandataStr = null;
	if(objPratica.dataAccettazioneRacc != null){
		var dataAccettazioneRaccomandata = new Date(objPratica.dataAccettazioneRacc);
		dataAccettazioneRaccomandataStr = dataAccettazioneRaccomandata.toLocaleString()
	}
	
	if(isScatolaANP()){
		tableDettRaccomandate.row.add([objPratica.codiceRaccomandata]).draw(false);;
	}else
	if(idTipoScatola == ID_TIPO_SCATOLA_SOSPESI){
//		tableDettScatole.column(0).visible(true);
		tableDettScatole.row.add( [	
//		      objPratica.codiceRaccomandata,
		      dataAccettazioneRaccomandataStr,
		      objPratica.codiceRaccomandata
		 ] ).draw(false);
	}else
	{
		if(idTipoScatola == ID_TIPO_SCATOLA){
			tableDettScatole.row.add( [	
				  "<input type='checkbox' name='checkItemPacchetto' onclick=clickCheckPacchetto(this,'"+objPratica.codicePacchetto+"')>",
				  objPratica.codicePacchetto,
				  objPratica.progrScatola,
			      objPratica.codiceRaccomandata,
			      dataInsPraticaFormatStr,
			      dataAccettazioneRaccomandataStr,
			      objPratica.codiceIdentificativo
			 ] ).draw(false);
			
		}else{
			tableDettScatole.row.add( [	
				  objPratica.codicePacchetto,
				  objPratica.progrScatola,
			      objPratica.codiceRaccomandata,
			      dataInsPraticaFormatStr,
			      dataAccettazioneRaccomandataStr,
			      objPratica.codiceIdentificativo
			 ] ).draw(false);
			
		}
	}
	

}

