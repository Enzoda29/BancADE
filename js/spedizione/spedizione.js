var tableSpedizione = null;
var idSpedizioneSelected = null;
var idCentroDematUser = $('input[name="centrodemat"]').val(); //TODO estrarre il centro dall'utente loggato
var codiceScatolaSelected = null;
var numMaxPraticheSelected = null;
var numPraticheInsSelected = null;
$(document).ready(function() {
     console.log('ricercaSpedizione ready');
 	loadLstIdentificativoPA("identificativoPASearch",0);
	loadLstTipIstanza("codiceTipoIstanzaSearch",0);
	
	tableSpedizione = $('#tableSpedizione').DataTable({
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : false,
			"searchable" : false
		} ],
		"columnDefs" : [ {
			"targets" : -1,			
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
	
	tableSpedizione.on( 'select', function ( e, dt, type, indexes ) {
        var rowData = tableSpedizione.rows( indexes ).data();
        console.log(rowData);
        idSpedizioneSelected = rowData[0][0];
        $("#distintaSpedizioneModal").modal();
        
    }).on( 'deselect', function ( e, dt, type, indexes ) {
        idScatolaSelected = null;
    });
	
	$('#divDataCreazDA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCreazA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataConsDA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataConsA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	
	$("#ricercaSpedizione").click(function() {
            console.log('ricercaSpedizione click');
		ricercaSpedizione();
	});	
	
	$("#creaSpedizione").click(function() {
        $("#creaSpedizioneModal").modal({backdrop: 'static', keyboard: false});
	});	
});

String.prototype.replaceAll = function(target, replacement) {
	  return this.split(target).join(replacement);
	};

function ricercaSpedizione(){
	waitingDialog.show();
	
	console.log('ricercaSpedizione start');
	var url = contextPath + '/' + 'spedizione' + '/ricercaSpedizione';
	console.log('ricercaSpedizione '+url);
	
	var identificativoPASearch = $('#identificativoPASearch').val();
	var codiceTipoIstanzaSearch = $('#codiceTipoIstanzaSearch').val();
	var codiceLdvSearch = $('#codiceLdvSearch').val();
	var dataCreazioneDaSearch = $('#dataCreazioneDaSearch').val();
	dataCreazioneDaSearch = dataCreazioneDaSearch.replaceAll("/","-");
	var dataCreazioneASearch = $('#dataCreazioneASearch').val();
	dataCreazioneASearch = dataCreazioneASearch.replaceAll("/","-");
	var dataConsegnaDaSearch = $('#dataConsegnaDaSearch').val();
	dataConsegnaDaSearch = dataConsegnaDaSearch.replaceAll("/","-"); 
	var dataConsegnaASearch = $('#dataConsegnaASearch').val();
	dataConsegnaASearch = dataConsegnaASearch.replaceAll("/","-");
	var idCentroDemat = idCentroDematUser;

	var statoSearch = $('#statoSearch').val();
	
	
	console.log('idAnagPA:',identificativoPASearch, 'idIstanza:',codiceTipoIstanzaSearch,
			'codiceLdvSearch:',codiceLdvSearch,'dataCreazioneDaSearch:',dataCreazioneDaSearch,
			'dataCreazioneASearch:',dataCreazioneASearch,'dataConsegnaDaSearch:',dataConsegnaDaSearch,
			'dataConsegnaASearch:',dataConsegnaASearch,'statoSearch:',statoSearch);
	
		var requestSpedizione = { "data":{"idAnagPA": identificativoPASearch,"idIstanza":codiceTipoIstanzaSearch,"codice_ldv":codiceLdvSearch,
									 "dataCreazioneDa":dataCreazioneDaSearch,"dataCreazioneA":dataCreazioneASearch,"dataConsegnaDa":dataConsegnaDaSearch,
									 "dataConsegnaA":dataConsegnaASearch, "stato":statoSearch, "centroDemat":idCentroDemat}};
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestSpedizione),
			success : function(result) {
				waitingDialog.hide();
				console.log('success! ', result);				
				if(result.status){
					console.log('success! ', result.data.listSpedizione);
					var listSpedizione =result.data.listSpedizione;
					tableSpedizione.clear();
					tableSpedizione.draw();
					for(var i=0; i<listSpedizione.length; i++){
						addSpedizioneObj(listSpedizione[i]);
					}
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
				}
				
			},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
			}
		});
	

};

function addSpedizioneObj(spedizioneObj){
	
	var dataCreazioneStr = new Date(spedizioneObj.dataCreazione).toLocaleString();	
	var dataCreazioneConsegnaStr = "";	
	if(spedizioneObj.dataConsegna != null){
		var dataCreazioneConsegna = new Date(spedizioneObj.dataConsegna);
		dataCreazioneConsegnaStr = dataCreazioneConsegna.toLocaleString();
	}
	
	tableSpedizione.row.add( [
		  spedizioneObj.idSpedizione,
	      spedizioneObj.codice_ldv,
	      dataCreazioneStr,
	      spedizioneObj.descrizioneStato,
	      spedizioneObj.identificativoPA,
	      spedizioneObj.codiceTipoIstanza,
	      dataCreazioneConsegnaStr
	 ] ).draw(false);
}
