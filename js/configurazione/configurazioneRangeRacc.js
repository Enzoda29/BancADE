var table=null;
var idRangeRacc = null;
var lstRange = null;
var target = null;
var spinner;
var spinning = false;

$(document).ready(function() {	
	target = document.getElementById('spinnerContainer');
	table = $('#tableRangeRacc').DataTable({
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : true,
			"searchable" : true
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

	
	findConfigRange();
//	$("#cercaServizio").click(function() {
//		findConfigServizio();
//	});
	
	

	$("#aggiungiServizio").click(function() {
		openModalAggiungi();
	});
	$("#confermaBtn").click(function() {
		deleteRange();
	});
	
});


function toggleSpin(){
    spinning ? spinner.stop() : spinner = new Spinner(opts).spin(target);  
    spinning = !spinning;
}



function findConfigRange(){
	lstRange = new Array();
	console.log('findConfigRange start');
	var url = contextPath + '/' + 'configurazione/configurazioneRangeRacc' + '/listaRange';
	console.log('configurazioneRange '+url);

	toggleSpin();	
	var requestConfigServ = { "data":{}};
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestConfigServ),
			success : function(result) {
				table.clear().draw(false);
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					lstRange = result.data;
					for(var i=0; i<lstRange.length; i++){
						addRangeObj(lstRange[i]);
					}
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
				}
				toggleSpin();
				
			},
			error : function(xhr, status, error, result) {
				toggleSpin();
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

function addRangeObj(objRange){
	var button=null;
	buttons = "<button class='glyphicon glyphicon-edit' title='Modifica Range' onclick= \"openModalModifica('"+objRange.idRangeRacc+"','"+objRange.codiceRaccDA+"','"+objRange.codiceRaccA+"')\"></button>"+
			  "<button class='glyphicon glyphicon-remove' title='Delete Range' onclick=\"confirmDialogBoot('"+objRange.idRangeRacc+"')\"></button>";

	table.row.add( [
		objRange.codiceRaccDA,
	      objRange.codiceRaccA,
	      buttons
	 ] ).draw(false);
}

function openModalAggiungi(){
	$("#tipo").val("ADD");
    $("#codiceRaccDA").val("");
    $("#codiceRaccA").val("");
	$("#configurazioneRangeRaccModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneRangeRaccModal").modal('show');
}

function openModalModifica(idRangeRacc,codiceRaccDA,codiceRaccA){
	$("#tipo").val("MOD");
	this.idRangeRacc = idRangeRacc;
	$("#codiceRaccDA").val(codiceRaccDA);
	$("#codiceRaccA").val(codiceRaccA);
	$("#configurazioneRangeRaccModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneRangeRaccModal").modal('show');
}

function deleteRange(){ 
	var url = contextPath + '/' + 'configurazione/configurazioneRangeRacc' + '/deleteRangeRacc';
	
//	var codiceServizio = $("#codice_servizio").val();

	console.log('idRangeRacc:',idRangeRacc);

	var requestDeleteService = { "data":{"idRangeRacc": idRangeRacc}};
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDeleteService),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					$("#confirmDialogRangeModal").modal('hide');
					findConfigRange();
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

function confirmDialogBoot(idRangeRacc){
	
	$('#confirmDialogRangeModal').modal({backdrop: 'static', keyboard: false});
	$("#confirmDialogRangeModal").modal('show');
	
	this.idRangeRacc = idRangeRacc;
	
//    if (isIE()) {
//        hideElement('document');
//    }
//
//    BootstrapDialog
//            .show({
//                type: BootstrapDialog.TYPE_PRIMARY,
//                title: 'Cancellazione servizio',
//                message: $('<div><p>Sei sicuro di voler cancellare il servizio?</div>'),
//                onhidden: function () {
//                    if (isIE()) {
//                        showElement('document');
//                    }
//                },
//                buttons: [
//                    {
//                        label: 'No',
//                        cssClass: 'btn-primary',
//                        action: function (dialogItself) {
//                            if (isIE()) {
//                                showElement('document');
//                            }
//                            dialogItself.close();
//                        }
//                    },
//                    {
//                        label: 'Si',
//                        cssClass: 'btn-primary',
//                        action: function (dialogItself) {
//                        	deleteServizio(codiceServizio);
//                        	dialogItself.close();
//                        }
//                    }]
//            });
};
