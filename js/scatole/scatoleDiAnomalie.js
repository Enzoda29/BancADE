var table=null;
$(document).ready(function () {

	

		table = $('#tableScatoleAnomalie').DataTable({
		    "searching":  	false,
			"columnDefs" : [ {
				"targets" : 0 ,	
				"sortable" : true
			} ],
			select: {
	          style: 'single',
	          selector: 'td:not(:last-child)'
	      },
			"language": {
	          "lengthMenu": "Mostra _MENU_ record per pagina",
	          "zeroRecords": "Non sono stati trovati record",
	          "info": "Mostra pagina _PAGE_ di _PAGES_",
	          "infoEmpty": "",
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
		
		caricaTabScatoleDiAnomalie();
		
		
	

	$('#scatoleDiAnomalieModal').on('shown.bs.modal', function () {
   	 	
	    $(this).find('.modal-dialog').css({width:'60%',
	                               height:'auto', 
	                              'max-height':'40%'});
	});
	
	$("#RestituisciScatola").click(function() {
		console.log("sono nella funzione per aprire il modal")
		$("#scatoleDiAnomalieModal").modal({backdrop: 'static', keyboard: false});
//		$("#configurazioneIndirizzoRestituzione_AddModal").modal('show');
	});

});

	
function caricaTabScatoleDiAnomalie() {
	var centroDemat  = $('input[name="centrodemat"]').val();
	console.log(centroDemat)
	var url = contextPath + '/' + 'restMaterialita/getScatoleAnomalie?idCentroDemat='+centroDemat;
	//table.clear().draw(true);
	$.ajax({
		type : 'GET',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		success : function(result) {
			console.log('success! ', result.data.rowContent);
			if(result.status){

			 var lstDelivery = result.data.rowContent;
			 
				if (lstDelivery.length == 0) {
					table.clear().draw();
				} else {
					for (var i = 0; i < lstDelivery.length; i++) {
						addInTab(lstDelivery[i]);
					}
				}
			}else{
				$('#danger_msg').text(result.message);
				$('#div_error_alert').show();
			}
			waitingDialog.hide();				
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			$('#danger_msg').text(error);
			$('#div_error_alert').show();
			waitingDialog.hide();
		}
	});
	
	}



function addInTab(obj){

	var listValue = 
		'\'' + obj.ID + '\',' +
		'\'' + obj.CODICE_SCATOLA+ '\'' ;
	
	var buttonScatola = "<button class='fa fa-archive' title='Restituisci la Scatola Selezionata' onclick= \"spedizioneScatolaModal("+ listValue + ")\" ></button>";

	/*NUMERO_ANOMALIE
	DATA_CHIUSURA_SCATOLA
	CODICE_SCATOLA
	TIPOLOGIA_SCATOLA
	Anomalie Non Sanabili
	*/

	table.row.add( [
		obj.CODICE_SCATOLA,
		obj.TIPOLOGIA_SCATOLA,
		obj.NUMERO_ANOMALIE,
		obj.DATA_CHIUSURA_SCATOLA,
		buttonScatola
		
	 ] ).draw(false);
	
}

function spedizioneScatolaModal(ID, IdScatola){

	loadIndRestPI();
	
	$("input[id*=UpdModal]").attr("readonly", true);
	
	$("#confermaAggiorna").hide();
	$("#confermaCancella").show();
	
	$( "#aliasIndModal" ).prop( "readonly", true );
	$( "#indRestModal" ).prop( "readonly", true );
	
    $("#id").val(ID);
	$("#codScatola").val(IdScatola);
	var textDesc = "Inserisci un codice raccomandata e delle note (optionale) per confermare la spedizione.";
	var textTitle = "Spedizione della scatola <b>" + IdScatola +  "</B>";
	
	$("#subTitleModal").html(textDesc);
	$("#titleModal").html(textTitle);
	
	$("#scatoleDiAnomalieModal").modal({backdrop: 'static', keyboard: false});
	$("#scatoleDiAnomalieModal").modal('show');
}


function loadIndRestPI() {
	
	var url = contextPath + '/' + 'restMaterialita/getIndRestPosteIta';
	$.ajax({
		type : 'GET',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		success : function(result) {
			console.log('success! ', result.data);
			if(result.status){
				
				var objIndRest = result.data;
				
				$('#intestatarioUpdModal').val(objIndRest.intestatario);
				$('#referenteUpdModal').val(objIndRest.referente);
				$('#aliasIndUpdModal').val(objIndRest.aliasIndirizzo);
				$('#indirizzoUpdModal').val(objIndRest.indirizzo);
				$('#capUpdModal').val(objIndRest.cap);
				$('#cittaUpdModal').val(objIndRest.citta);
				$('#provinciaUpdModal').val(objIndRest.provincia);
				$('#codNazUpdModal').val(objIndRest.cod_nazione);
				$('#emailUpdModal').val(objIndRest.mail);
				$('#codRaccUpdModal').val(objIndRest.codiceraccomandata);
				$('#noteModal').val(objIndRest.note);
				
			}else{
				$('#danger_msg').text(result.message);
				$('#div_error_alert').show();
			}
			waitingDialog.hide();				
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			$('#danger_msg').text(error);
			$('#div_error_alert').show();
			waitingDialog.hide();
		}
	});
	
	}



