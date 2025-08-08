var printTableDettScatole = null;
var print_tableDettRaccomandate = null;

$(document).ready(function() {
	printTableDettScatole = $('#print_tableDettScatole').DataTable({
		"paging":   false,
        "scrollCollapse": true,
        "ordering": false,
        "info":     false,
        "searching":  	false,
		/*select: {
            style: 'single'
        },*/
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
	
	print_tableDettRaccomandate = $('#print_tableDettRaccomandate').DataTable({
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
	
	$('#distintaScatolaModal').on('show.bs.modal', function() {
		if(isScatolaANP()){
			$('#print_rowTableDettScatole').attr("style","display:none");	
			$('#print_rowTableDettRaccomandate').attr("style","display:");
		}else{
			$('#print_rowTableDettScatole').attr("style","display:");
			$('#print_rowTableDettRaccomandate').attr("style","display:none");
		}

		printTableDettScatole.clear().draw();
		print_tableDettRaccomandate.clear().draw();
		loadDistintaScatola();
	});
	
	$("#printDistinta").click(function(){
		printWindow("printableAreaDettScatola",1000,1000);		
	});

});


function showLoaderLstDistintaScatola(show){
	$("#print_loadLstDettScatola").text("Attendere! Caricamento dati in corso...");
	$("#print_loadLstDettScatola").attr("style",((show)?"display:''":"display:none"));
}

function loadDistintaScatola() {
	showLoaderLstDistintaScatola(true);
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
			$("#imgBcDistintaScatola").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+result.data.codiceScatola);
			$("#print_codiceScatola").text(result.data.codiceScatola);
			var dataCreazioneStr = new Date(result.data.dataCreazione).toLocaleString();	
			$("#print_dataCreazioneScatola").text(dataCreazioneStr);
			
			var stato = null;
			/*if(result.data.statoScatola == SCATOLA_APERTA){
				stato = "APERTA";				
			}else
			if(result.data.statoScatola == SCATOLA_CHIUSA){
				stato = "CHIUSA";
			}*/
			$("#print_statoScatola").text(result.data.statoScatolaDesc);
			
			$("#print_idPAScatola").text(result.data.identificativoPA);
			$("#print_tipIstScatola").text(result.data.codiceTipoIstanza);
			$("#print_numPraticheScatola").text(result.data.numPraticheInserite);
			$("#print_percComplScatola").text(result.data.percCompletamento);
		
			var dataChiusuraStr = "";
			if(result.data.dataChiusura != null){
				dataChiusuraStr = new Date(result.data.dataChiusura).toLocaleString();	
			}				
			$("#print_dataChiusuraScatola").text(dataChiusuraStr);
			$("#print_centroDematScatola").text(result.data.localitaCentroDemat);
			
			printTableDettScatole.clear().draw();
			var lstPratiche = result.data.lstPratiche;
			for(var i=0; i<lstPratiche.length; i++){
				addDistintaPraticheObj(lstPratiche[i]);
			}			
			showLoaderLstDistintaScatola(false);			
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

function addDistintaPraticheObj(objPratica){
	
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
		print_tableDettRaccomandate.row.add([objPratica.codiceRaccomandata]).draw(false);;
	}else
	if(idTipoScatola == ID_TIPO_SCATOLA_SOSPESI){
		printTableDettScatole.row.add( [	
		      objPratica.codiceRaccomandata,
		      dataAccettazioneRaccomandataStr
		 ] ).draw(false);
	}else
	{
		printTableDettScatole.row.add( [	
			  objPratica.codicePacchetto,
			  objPratica.progrScatola,
		      objPratica.codiceRaccomandata,
		      dataInsPraticaFormatStr,
		      dataAccettazioneRaccomandataStr,
		      objPratica.codiceIdentificativo
		 ] ).draw(false);
	}
		
	
}

