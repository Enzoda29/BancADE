var ACTION = null;
var TYPE_INSERT = "INS";
var TYPE_UPDATE = "MOD";
var idServizioPaSelected=null;

var spinner;
var spinning = false;
var target = null;

function toggleSpin(){
    spinning ? spinner.stop() : spinner = new Spinner(opts).spin(target);  
    spinning = !spinning;
}



$(document).ready(function() {
	
	table = $('#tableConfigMS').DataTable({
		"searching":  	false,
		"columnDefs" : [ {
			"targets" : [0,1,2]	,		
			"sortable" : true
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
	
	findMacroserviziByCliente();
	
	$("#findMacroservizi").click(function(e) {
		findMacroserviziByCliente();	
	});	
	
	function findMacroserviziByCliente(){
		waitingDialog.show('Ricerca in corso...');
		
		var idCliente = $( "#ricercaClienti" ).val(); 
		var idServizio = $( "#ricercaServizi" ).val();
		var codeMacroservizio = $( "#ricercaCodiceMacServ" ).val();

		var url = contextPath + '/' + 'configurazione/configurazioneMacroservizi/getMacroserviziByCliente';
		var request = {"data":{ "idCliente": idCliente, "idServizio": idServizio , "codeMacroservizio": codeMacroservizio}}
		
		table.clear().draw(false);
		
		$.ajax({
			type : 'POST',
    		url: url,
    		contentType : 'application/json',
            dataType: 'json',
            data: JSON.stringify(request),
				success : function(result) {
					console.log('success! ');				
					if(result.status){
						var lst = result.data.dataTable;
						console.log('lengt:  ' + lst.length);	
						for(var i=0; i<lst.length; i++){
							addMacServObj(lst[i]);
							
						}
					}else{
//						$('#azione').hide();
						$('#div_error_alert').show();
						$('#danger_msg').text(result.message);
					}
					
					waitingDialog.hide();
					
				},
				error : function(xhr, status, error, result) {
					alert("nessun cliente trovato");
					console.log('errore!');
					console.log('xhr ', xhr);
					console.log('status ', status);
					console.log('error ', error);
					console.log('result ', result);
					$('#danger_msg').text(error);
					$('#div_error_alert').show();
//					$('#azione').hide();
					waitingDialog.hide();
				}
			});
		
	}
	
	function addMacServObj(obj){

		var x = JSON.stringify(obj);
//		console.log(x);
		table.row.add( [
			  obj.IDENTIFICATIVO_CLIENTE,
			  obj.NOME_SERVIZIO,
			  obj.CODIFICA_MACROSERVIZIO,
		 ] ).draw(true);
	}
	
	
	loadListaClienti();
	$( "#ricercaServizi" ).prop( "disabled", true );
	
	function loadListaClienti() {
    	
//		$( "#ricercaServizi" ).prop( "disabled", true );
    	$("#ricercaClienti").empty();
    	showLoaderLst(true,"Attendere! Caricamento lista clienti in corso...");
    	//var url = contextPath + '/' + 'spedizione' + '/getComboClienti';
    	var url = contextPath + '/common/getComboClienti';
    	$.ajax({
    		type : 'GET',
    		url : url,
    		success : function(data) {
    			var lst = data.data;
    			console.log("lengt: " +lst.length);
    			if(lst.length < 1){
//    				disableInputPartial();
    				alert("Nessun servizio associato all'utente selezionato.");
    			}else{
//    				$("#ricercaClienti").append("<option value=''> -- Seleziona un cliente -- </option>");
	    			$("#ricercaClienti").append("<option value=''>Tutti</option>");
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#ricercaClienti").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
//	    			$( "#ricercaServizi" ).prop( "disabled", false );
    			}
    			showLoaderLst(false,'');
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
	
    $( "#ricercaClienti" ).change(function() {
    	loadLstServiziRicerca();
    });
	
function loadLstServiziRicerca(){
    	
    	$("#ricercaServizi").empty();
    	var idCliente = $( "#ricercaClienti" ).val();
    	if(idCliente == '' || idCliente == -1 ){
    		$( "#ricercaServizi" ).prop( "disabled", true );
    		return;
    	}
    	
    	showLoaderLst(true,"Attendere! Caricamento lista Servizi in corso...");
    	var url = contextPath + '/' + 'common/lstServiziByCliente';
    	$.ajax({
    		type : 'POST',
    		url: url,	
            dataType: 'json',
            data: { "idCliente": idCliente},
    		success : function(result) {
    			
    			var lst = result.data;
//    			$("#clienti").append("<option value=''> Tutti </option>");
    			if(lst.length < 1){
    				alert("Nessun servizio associato all'utente selezionato.");
    			}else{
    			
    				$("#ricercaServizi").append(
    						"<option value=''>Tutti</option>");
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#ricercaServizi").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
	    			$( "#ricercaServizi" ).prop( "disabled", false );
    			}
    			showLoaderLst(false,'');
    			
    			
    		},
    		error : function(xhr, status, error, result) {
    			console.log('errore!');
    			console.log('xhr ', xhr);
    			console.log('status ', status);
    			console.log('error ', error);
    			console.log('result ', result);
    			$('#danger_msg').text(error);
    			$('#div_error_alert').show();
    			
    			showLoaderLst(false,'');
    		}
    	});
    }
	
	function showLoaderLst(show,message){
		$("#loadFields").text(message);
		$("#loadFields").attr("style",((show)?"display:''":"display:none"));
	}
	
	
	$("#addMacroservizio").click(function(e){
			$("#configurazioneMacroservizio_AddMod_Modal").modal({backdrop: 'static', keyboard: false});
	});


});


