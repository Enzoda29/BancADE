var tableScatolaChange = null;
var newIdScatolaSelected = null;
var newCodiceScatolaSelected = null;
var SUFFIX = "_CHANGE_SCA";

$(document).ready(function() {
	
	tableScatolaChange = $('#tableScatolaChange').DataTable({
		/*"paging":   false,*/
        "ordering": true,
        "info":     false,
        "searching":  	false,
		select: {
            style: 'single'
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
	

	$('#changeScatolaModal').on('show.bs.modal', function() {
		showLblOKScatolaChange("",false);
		showErrorMessage(false,'',SUFFIX)

		tableScatolaChange.clear();
		tableScatolaChange.draw();
		
		newIdScatolaSelected = null;
		newCodiceScatolaSelected = null;
		loadScatoleChange();
		
		 $("#lblScatolaAttuale").text(codiceScatolaSelected);
		 $("#lblPacchettiSelected").text(lstPacchettiSelected);
	});
	
	tableScatolaChange.on( 'select', function ( e, dt, type, indexes ) {
        var rowData = tableScatolaChange.rows( indexes ).data();
        console.log(rowData);
        newIdScatolaSelected = rowData[0][0];
        newCodiceScatolaSelected = rowData[0][1];       
        $("#lblScatolaNuova").text(newCodiceScatolaSelected);
        
	}).on( 'deselect', function ( e, dt, type, indexes ) {
		newIdScatolaSelected = null;
		newCodiceScatolaSelected = null;
		$("#lblScatolaNuova").text('');
    });

	
	$("#btnSelScatolaChange").click(function(){
		checkCodScatolaAperta();
	});
	

	$("#codScatolaChange").keyup(function(e){
		if (e.keyCode === 13) {
			checkCodScatolaAperta();
		}		
	});
	
	$("#btnSubmitChangeScatola").click(function(){
		//cambio scatola
		if(newIdScatolaSelected == null){
			showErrorMessage(true,"Nuova scatola non selezionata!",SUFFIX);
		}else{
			showLoaderLstAddScatolaChange(true);
			var requestScatole = { "data":{"oldIdScatola":idScatolaSelected,"newIdScatola":newIdScatolaSelected,
				"oldCodScatola":codiceScatolaSelected,"newCodScatola":newCodiceScatolaSelected,
				"lstPacchetti":lstPacchettiSelected }};
			var url = contextPath + '/' + 'scatola' + '/changeScatolaPacchetti';
			console.log('findScatole '+url);
			$.ajax({
				type : 'POST',
				url : url,
				contentType : 'application/json',
				dataType : 'json',
				data : JSON.stringify(requestScatole),
				success : function(result) {
					waitingDialog.hide();
					console.log('success! ', result);	
					if(result.status){
						alert("Riallocazione scatola completata correttamente!");
						lstPacchettiSelected = new Array();
						$("#btnChangeScatola").attr("disabled",true);
						$('#changeScatolaModal').modal('hide');
						loadDettScatola();
					}else{
						showErrorMessage(true,result.message,SUFFIX);
					}

					
				},
				error : function(xhr, status, error, result) {
					waitingDialog.hide();
					console.log('errore!');
					console.log('xhr ', xhr);
					console.log('status ', status);
					console.log('error ', error);
					console.log('result ', result);
					showErrorMessage(true,result.message,SUFFIX);
				}
			});
		}
	});


});

function showLoaderLstAddScatolaChange(show){
	$("#loadScatolaChange").text("Attendere! Caricamento dati in corso...");
	$("#loadScatolaChange").attr("style",((show)?"display:''":"display:none"));
}

function showLblOKScatolaChange(message, show){
	$('#lblOKScatolaChange').attr("style",((show)?"display:''":"display:none"));
	$('#lblOKScatolaChange').text(message);
}




function loadScatoleChange() {
	showLoaderLstAddScatolaChange(true);
	tableScatolaChange.clear();
	tableScatolaChange.draw();
	
	var requestScatole = { "data":{"statoScatola":STATO_SCATOLA_APERTA,"idTipoScatola":idTipoScatola }};
	var url = contextPath + '/' + 'scatola' + '/findScatole';
	console.log('findScatole '+url);
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestScatole),
		success : function(result) {
			waitingDialog.hide();
			console.log('success! ', result);				
			if(result.status){
				console.log('success! ', result.data.listScatole);
				var listScatole =result.data.listScatole;
				tableScatolaChange.clear();
				tableScatolaChange.draw();
				for(var i=0; i<listScatole.length; i++){
					addScatoleObjChange(listScatole[i]);
				}
				tableScatolaChange.columns([0]).visible( false );
				showLoaderLstAddScatolaChange(false);                   
			}else{
				showErrorMessage(true,result.message,SUFFIX);
			}
			
		},
		error : function(xhr, status, error, result) {
			waitingDialog.hide();
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,result.message,SUFFIX);
		}
	});
}

function addScatoleObjChange(objPratica){
	var dataCreazioneStr = new Date(objPratica.dataCreazione).toLocaleString();	
	
	tableScatolaChange.row.add( [
			objPratica.idScatola,
			objPratica.codiceScatola,
			dataCreazioneStr,
			objPratica.identificativoPA,
			objPratica.codiceTipoIstanza,
			objPratica.numMaxPratiche,
			objPratica.numPraticheInserite			
			] ).draw(false);
}


function checkCodScatolaAperta(){
	showLoaderLstAddScatolaChange(false);
	showErrorMessage(false,"",SUFFIX);
	
	var codScatola = $("#codScatolaChange").val();
	if(codScatola.trim().length == 0){
		showErrorMessage(true,"Codice Scatola non inserito!",SUFFIX);
		return;
	}
	if(!((codScatola.length == 10) && (codScatola.substring(0,3) == prefix_sca))) {
		showErrorMessage(true,"Attenzione! Formato codice scatola non valido! E' atteso "+prefix_sca+"XXXXXXX",SUFFIX);
		return;
	}
	var url = contextPath + '/' + 'scatola' + '/getScatolaApertaByCodice';
	var request = {	"data" : {	"codiceScatola" : codScatola	}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			if(!result.status){
				showErrorMessage(true,result.message);
			}else{
				if(result.data != null){
					newIdScatolaSelected = result.data.idScatola;
					newCodiceScatolaSelected = result.data.codiceScatola;
					$("#lblScatolaNuova").text(newCodiceScatolaSelected);
				}else{
					showErrorMessage(true,result.message,SUFFIX);
				}
				
				
			}

			showLoaderLstAddScatolaChange(false);			
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,error);
		}
	});
}


