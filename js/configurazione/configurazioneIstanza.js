var table=null;
$(document).ready(function() {
	table = $('#tableConfigServ').DataTable({
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : false,
			"searchable" : false
		} ],
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
	
	$("#cercaIstanza").click(function() {
		findConfigIstanza();
	});

	$("#aggiungiIstanza").click(function() {
		openModalAggiungi();
	});
//	$("#confermaBtn").click(function() {
//		var cs=$("#codServizio").val();
//		deleteServizio(cs);
//	});
	
});


function findConfigIstanza(){
	console.log('findConfigIstanza start');
	var url = contextPath + '/' + 'configurazione/configurazioneIstanza' + '/listaIstanza';
	console.log('configurazioneIstanza '+url);
	
	var idIstanza = $('#idIstanza').val();
	var codiceIstanza = $('#codiceIstanza').val();
	var codiceTipoIstanza = $('#codiceTipoIstanza').val();
	var descrizione = $('#descrizione').val();
	
	console.log('idIstanza:',idIstanza);
	console.log('codiceIstanza:',codiceIstanza);
	console.log('codiceTipoIstanza:',codiceTipoIstanza);
	console.log('descrizione:',descrizione);
	
	table.clear().draw(false);
	var requestConfigServ = { "data":{"idIstanza": idIstanza,"codiceIstanza": codiceIstanza,"codiceTipoIstanza": codiceTipoIstanza,"descrizione": descrizione}};
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestConfigServ),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					var lstIstanze =result.data;
					for(var i=0; i<lstIstanze.length; i++){
						addIstanzaObj(lstIstanze[i]);
					}
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
				}
				
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

function addIstanzaObj(objIstanza){
	var button=null;
	buttons = "<button class='glyphicon glyphicon-edit' title='Modifica Istanza' onclick= \"openModalModifica('"+objIstanza.idIstanza+"','" + objIstanza.codiceIstanza+"','" + objIstanza.codiceTipoIstanza+"','" + objIstanza.descrizione +"')\"></button>";

	table.row.add( [
		  objIstanza.idIstanza,
		  objIstanza.codiceIstanza,
		  objIstanza.codiceTipoIstanza,
		  objIstanza.descrizione,
	      buttons
	 ] ).draw(false);
}

function openModalAggiungi(){
	$("#tipo").val("ADD");
    $("#codiceIstanza").val("");
    $("#codiceTipoIstanza").val("");
    $("#descrizione").val("");
	$("#configurazioneIstanzaModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneIstanzaModal").modal('show');
}

function openModalModifica(idIstanza,codiceIstanza,codiceTipoIstanza,descrizione){	
	$("#tipo").val("MOD");
	$("#idIstanza").val(idIstanza);
	$("#idIstanza").attr('readonly', 'readonly');
	$("#codiceIstanzaModal").val(codiceIstanza);
	$("#codiceTipoIstanzaModal").val(codiceTipoIstanza);
	$("#descrizioneModal").val(descrizione);
	$("#configurazioneIstanzaModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneIstanzaModal").modal('show');
}
