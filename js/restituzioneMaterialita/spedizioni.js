var table=null;

$(document).ready( function(){

	table = $('#tableRicercaSpedizioni').DataTable({
		"columnDefs" : [ {
			"targets" : [ 5 ],
			"visible" : false,
			"searchable" : false,


		} ],
		"scrollX": true,
		"bFilter": false,

		"language": {
			"lengthMenu": "Mostra _MENU_ record per pagina",
			"zeroRecords": "Non sono stati trovati record",
			"info": "Mostra pagina _PAGE_ di _PAGES_",
			"infoEmpty": "",
			"infoFiltered": "(Filtrati da _MAX_ record totali)",
			"paginate": {
				"first":      "Primo",
				"last":       "Ultimo",
				"next":       "Prossimo",
				"previous":   "Precedente"
			}
		}
	});

	$("#btnRicercaSpedizioni").click( function(){
		findSpedizioni() ;
	} ) ;

	$("#dettagliSpedizione").click(function(){
		var row = table.row('.selected') ;
		if( row.length == 0 ) {
			alert( "Nessuna riga selezionata!\nSelezionare una riga." );
		}
		else{
			$('#dettaglioSpedizioneModal').attr("data-function" , "dummy") ;
			$("#dettaglioSpedizioneModal").modal();
		}
	});

	$('#stampaDistinta').click(function(){
		var row = table.row('.selected') ;
		if( row.length == 0 ) {
			alert( "Nessuna riga selezionata!\nSelezionare una riga." );
		}
		else{
//			codice per stampare la modale dei dettagli. potrebbe servire di nuovo. non rimuovere.
//			$('#dettaglioSpedizioneModal').attr("data-function" , "stampaDistintaSpedizione" ) ;
//			$("#dettaglioSpedizioneModal").modal();

			var idSpedizione = table.cell('.selected', 0).data() ;
			var ldv = table.cell('.selected', 1).data() ;

			var url = contextPath + '/'+'restMaterialita'  + '/getDistintaSpedizione';
			var data = idSpedizione;

			waitingDialog.show('Download in corso...', {dialogSize: 'sm', progressType: 'default'});

			$.ajax({
				type : 'GET',
				url : url,
				contentType : 'application/json',
				dataType : 'json',
				data : {
					'data' : data
				},
				success : function(result) {
					console.log('success! ', result);
//					console.log('success! ', result.data);

					if(result.status){
						var sampleArr = base64ToArrayBuffer(result.data);
						saveByteArray("LDV_"+ldv, sampleArr);
					}else{
						alert( "Errore! " + result.message ) ;
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
	});

	findSpedizioni() ;
} );

$(document).on( 'click', 'tr', function () {
	if ( $(this).hasClass('selected') ) {
		$(this).removeClass('selected');
	}
	else {
		table.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
	}
} );

function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], {type: "application/pdf"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};

function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }

function dummy() {
	console.log("ok") ;
}

function stampaDistintaSpedizione() {
	$('#aggiorna').hide();
	$('#chiudi').hide();
	$('#modalHeader').hide();
	$('#tableEsitoRicercaSpedizioni_paginate').hide();
	$('#tableEsitoRicercaSpedizioni_length').hide();
	$('#tableEsitoRicercaSpedizioni_info').hide();
	spanify( $('#spedizioneId') ) ;
	spanify( $('#aggregatoId') ) ;
	spanify( $('#letteraDiVettura') ) ;
	spanify( $('#nomeVettore') ) ;
	spanify( $('#dataRitiro') ) ;
	spanify( $('#statoSpedizione') ) ;
	spanify( $('#note') ) ;
	$('#tableEsitoRicercaSpedizioni').DataTable().columns.adjust();

	printElement(document.getElementById('modalBody'));
	waitingDialog.hide();
	window.print();

	$('#aggiorna').show();
	$('#chiudi').show();
	$('#modalHeader').show();
	$('#tableEsitoRicercaSpedizioni_paginate').show();
	$('#tableEsitoRicercaSpedizioni_length').show();
	$('#tableEsitoRicercaSpedizioni_info').show();
	deSpanify( $('#spedizioneId') ) ;
	deSpanify( $('#aggregatoId') ) ;
	deSpanify( $('#letteraDiVettura') ) ;
	deSpanify( $('#nomeVettore') ) ;
	deSpanify( $('#dataRitiro') ) ;
	deSpanify( $('#statoSpedizione') ) ;
	deSpanify( $('#note') ) ;
}

function spanify( elem ) {
	elem.attr("readolnly" , "readonly").css("borderWidth" , "0");
}
function deSpanify( elem ) {
	elem.removeAttr("readolnly");
	if( elem.is( "input" ) ) {
		elem.css("borderWidth" , "2px");
	}
	else{
		elem.css("borderWidth" , "1px");
	}
}

function printElement(elem, append, delimiter) {
	var domClone = elem.cloneNode(true);

	var $printSection = document.getElementById("printSection");

	if (!$printSection) {
		$printSection = document.createElement("div");
		$printSection.id = "printSection";
		document.body.appendChild($printSection);
	}

	if (append !== true) {
		$printSection.innerHTML = "";
	}

	else if (append === true) {
		if (typeof (delimiter) === "string") {
			$printSection.innerHTML += delimiter;
		}
		else if (typeof (delimiter) === "object") {
			$printSection.appendChild(delimiter);
		}
	}

	$printSection.appendChild(domClone);
}

function checkVar(variabile){
	if (typeof(variabile) === 'undefined' || variabile === null || variabile === 'null')
	{
		return "";
	}
	else
		return variabile;
}

function findSpedizioni() {
	var url = contextPath + '/'+'restMaterialita'  + '/getRicercaSpedizione';

	var letteraVettura = $("#letteraVettura").val() ;
	var codSelezionati = [0] ;
	var	idCentroDemat = $('[name="centrodemat"]').val();

	if( $("#creata").is(":checked") ){
		codSelezionati.push( $("#creata").val() ) ;
	}
	if( $("#prelevata").is(":checked") ){
		codSelezionati.push( $("#prelevata").val() ) ;
	}
	if( $("#consegnata").is(":checked") ){
		codSelezionati.push( $("#consegnata").val() ) ;
	}

	if( codSelezionati.length > 1 ) {
		codSelezionati.splice( 0 , 1 ) ;
	}

	table.clear().draw(false);

	var requestDocumentiAnomali = { "data":{"centroDemat":idCentroDemat,"letteraVettura":letteraVettura,"codSelezionati":codSelezionati}};

	waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'default'});

	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestDocumentiAnomali),
		success : function(result) {
			console.log('success! ', result);
			console.log('success! ', result.data);

			if(result.status){
				if( result.data ){
					var list = result.data ;
					for( var i = 0 ; i < list.length ; i++ ) {
						var element = list[i] ;
						table.row.add( [ 
							checkVar(element.spedizioneId),
//							checkVar(element.aggregatoId),
							checkVar(element.codiceLDV),
							checkVar(element.statoSpedizione),
							checkVar(element.dataCreazione),
							checkVar(element.dataUltimaModifica),
							checkVar(element.statoSpedizioneId)
							] ).draw(false);
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