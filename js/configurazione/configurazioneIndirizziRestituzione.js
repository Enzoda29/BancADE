var table=null;
var tableMetadati = null;
$(document).ready(function() {
	
	table = $('#tableDelivery').DataTable({
		"searching":  	false,
		"columnDefs" : [ {
			"targets" : [6,7]	,		
			"sortable" : false
		} ],
//		select: {
//          style: 'single',
//          selector: 'td:not(:last-child)'
//      },
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
	
//	table.column( 0 ).visible( false );
	
	$("#findDelivery").click(function() {
//		waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'warning'});
		var idCliente = $('#ricercaClienti').val();
		findConfigDelivery(idCliente);
	});

	$( "#findDelivery" ).prop( "disabled", true );
	
	$("#aggiungiDelivery").click(function() {
		$("#configurazioneIndirizzoRestituzione_AddModal").modal({backdrop: 'static', keyboard: false});
//		$("#configurazioneIndirizzoRestituzione_AddModal").modal('show');
	});
	
	 $( "#ricercaClienti" ).change(function() {
		var check =  $( "#ricercaClienti" ).val();
		if(check == '') {
			 $( "#findDelivery" ).prop( "disabled", true );	
		}else{
			$( "#findDelivery" ).prop( "disabled", false );	
		}
	    });	
	 
	loadListaClienti();
	
	function loadListaClienti() {
    	
    	$("#ricercaClienti").empty();
    	showLoaderLst(true,"Attendere! Caricamento lista clienti in corso...");
    	var url = contextPath + '/common/getComboClientiWhitCode';
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
    				$("#ricercaClienti").append("<option value=''> -- Seleziona un cliente -- </option>");
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
	
	$("#esportaCSV").click(function() {
		console.log('esportaCSV'); 
		var idCliente = $('#ricercaClienti').val();
		if(idCliente ==''){alert("Nessun cliente selezionato");return;}
		var url = contextPath + '/' + 'configurazione/indirizziRestituzione/getIndRestitByCliente?idCliente='+idCliente;
			
	//	table.clear().draw(false);
//		var requestConfigDeliveryPA = { "data":{"identificativoPa": identificativoPAOpt,"codiceTipoIstanza": codiceTipoIstanzaOpt, "centroDemat":idCentroDemat}};
		waitingDialog.show('Ricerca in corso...');
		$.ajax({
				type : 'POST',
				url : url,
				contentType : 'application/json',
				dataType : 'json',
//				data : JSON.stringify(requestConfigDelivery),
				success : function(result) {
					console.log('success! ', result.data.rowContent);
					if(result.status){
						var lstDelivery =result.data.rowContent;
						csv= '"'+'Alias Indirizzo'+'"'+';'+'"'+'Indirizzo di restituzione'+'"';
						for(var i=0; i<lstDelivery.length; i++){
							addDeliveryObj(lstDelivery[i]);
							row= lstDelivery[i];
							csvrow ='"' + row["ALIAS_INDIRIZZO"] + '"' + ' ;' +
			    		    '"' + row["INDIRIZZO_DI_REST"]+ '"';
							csv = csv + '\n' + csvrow;
				    		
				    		console.log(csv)
						}
						var downloadLink = document.createElement("a");
				        downloadLink.href = "data:text/csv," + encodeURIComponent(csv);
				        downloadLink.download = "data.csv";

				        document.body.appendChild(downloadLink);
				        downloadLink.click();
				        document.body.removeChild(downloadLink)
				        
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
	
		});
});




function showLoaderLst(show,message){
	$("#loadFields").text(message);
	$("#loadFields").attr("style",((show)?"display:''":"display:none"));
}




function findConfigDelivery(idCliente){
	
	if(idCliente ==''){alert("Nessun cliente selezionato");return;}
	var url = contextPath + '/' + 'configurazione/indirizziRestituzione/getIndRestitByCliente?idCliente='+idCliente;
		
	table.clear().draw(false);
	waitingDialog.show('Ricerca in corso...');
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
//			data : JSON.stringify(requestConfigDelivery),
			success : function(result) {
				console.log('success! ', result.data.rowContent);
				if(result.status){
					var lstDelivery =result.data.rowContent;
					for(var i=0; i<lstDelivery.length; i++){
						addDeliveryObj(lstDelivery[i]);
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

function addDeliveryObj(obj){
//	var button=null;
//	var buttonModifica = "<button class='glyphicon glyphicon-edit' title='Modifica Indirizzo di Restituizione' onclick= \"loadingModalModifica('"+objDelivery.CLIENTE_IND_REST_ID + "' , '"+ objDelivery.ALIAS_INDIRIZZO  + "' , '"+  objDelivery.INDIRIZZO_DI_REST + "')\"></button>";
//	var buttonElimina = "<button class='glyphicon glyphicon-minus delete' title='Elimina Indirizzo di Restituizione' onclick= \"loadingModalElimina('"+objDelivery.CLIENTE_IND_REST_ID + "' , '"+ objDelivery.ALIAS_INDIRIZZO  + "' , '"+  objDelivery.INDIRIZZO_DI_REST + "')\" style=\"margin-left:15px;\"></button>";

	
	var listValue = 
	'\'' + obj.ID + '\',' +
	'\'' + obj.INTESTATARIO+ '\',' +
	'\'' + obj.REFERENTE+ '\',' +
	'\'' + obj.INDIRIZZO+ '\',' +
	'\'' + obj.CAP+ '\',' +
	'\'' + obj.CITTA+ '\',' +
	'\'' + obj.PROVINCIA+ '\',' +
	'\'' + obj.COD_NAZIONE+ '\',' +
	'\'' + obj.ALIAS_INDIRIZZO + '\',' +
	'\'' + obj.TELEFONO+ '\',' +
	'\'' + obj.EMAIL + '\'';
	
	var buttonModifica = "<div name='"+ obj.ID +"'><button class='glyphicon glyphicon-edit' title='Modifica Indirizzo di Restituizione' onclick= \"loadingModalModifica("+ listValue + ")\"></button></div>";
	var buttonElimina = "<div name='"+ obj.ID +"'><button class='glyphicon glyphicon-minus delete' title='Elimina Indirizzo di Restituizione' onclick= \"loadingModalElimina("+ listValue + ")\" style=\"margin-left:15px;\"></button></div>";
	
	var indirizzoFull = ('' + obj.INDIRIZZO + " - " + obj.CAP + " " + obj.CITTA + "(" + obj.PROVINCIA + ")").toString();
	
	console.log(indirizzoFull);
	table.row.add( [
//		checkVar(objDelivery.CLIENTE_IND_REST_ID.toString()),
//		obj.ID,
		obj.INTESTATARIO,
		obj.REFERENTE,
		indirizzoFull,
		obj.ALIAS_INDIRIZZO,
		obj.TELEFONO,
		obj.EMAIL,
	    buttonModifica,
	    buttonElimina
	 ] ).draw(false);
}

function checkVar(variabile){
	if (typeof(variabile) === 'undefined' || variabile === null || variabile === 'null')
	{
	    return "";
	}
	else
		return variabile;
}

function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}
//function loadingModalModifica(id, aliasIndir, indirRestituzione){	
//	$("#titleModal").text("Modifica indirizzi di restituzione");
//	$("#subTitleModal").text("Valorizza correttamente i campi sotto e conferma l'operazione");
//	
//	$("#confermaAggiorna").show();
//	$("#confermaCancella").hide();
//	
//	$( "#aliasIndModal" ).prop( "readonly", false );
//	$( "#indRestModal" ).prop( "readonly", false );
//	
//	$("#idDelivery").val(id);
//	$("#aliasIndModal").val(aliasIndir);
//	$("#indRestModal").val(indirRestituzione);
//	
//	$("#configurazioneIndririRest_ModificaModal").modal({backdrop: 'static', keyboard: false});
//	$("#configurazioneDeliveryPA_ModificaModal").modal('show');
////	loadModalModifica(id, aliasIndir, indirRestituzione);
//}





function loadingModalModifica(ID, INTESTATARIO, REFERENTE, INDIRIZZO, CAP , CITTA , PROVINCIA , COD_NAZIONE , ALIAS_INDIRIZZO, TELEFONO, MAIL){	
	console.log(INTESTATARIO);
	$("#titleModal").text("Modifica indirizzi di restituzione");
	$("#subTitleModal").text("Valorizza correttamente i campi sotto e conferma l'operazione");
	
	$("#confermaAggiorna").show();
	$("#confermaCancella").hide();
	
	$( "#aliasIndModal" ).prop( "readonly", false );
	$( "#indRestModal" ).prop( "readonly", false );
	
	$("#idDelivery").val(ID);
	
	$('#intestatarioUpdModal').val(INTESTATARIO);
	$('#referenteUpdModal').val(REFERENTE);
	$('#aliasIndUpdModal').val(ALIAS_INDIRIZZO);
	$('#indirizzoUpdModal').val(INDIRIZZO);
	$('#capUpdModal').val(CAP);
	$('#cittaUpdModal').val(CITTA);
	$('#provinciaUpdModal').val(PROVINCIA);
	$('#codNazUpdModal').val(COD_NAZIONE);
	$('#emailUpdModal').val(MAIL);
	$('#telefonoUpdModal').val(TELEFONO);

	
	$("#configurazioneIndririRest_ModificaModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneDeliveryPA_ModificaModal").modal('show');
}

function loadingModalElimina(ID, INTESTATARIO, REFERENTE, INDIRIZZO, CAP , CITTA , PROVINCIA , COD_NAZIONE , ALIAS_INDIRIZZO, TELEFONO, MAIL){
	
	$("input[id*=UpdModal]").attr("readonly", true);
	
	$("#confermaAggiorna").hide();
	$("#confermaCancella").show();
	
	$( "#aliasIndModal" ).prop( "readonly", true );
	$( "#indRestModal" ).prop( "readonly", true );
	
    $("#idDelivery").val(ID);
	
	$('#intestatarioUpdModal').val(INTESTATARIO);
	$('#referenteUpdModal').val(REFERENTE);
	$('#aliasIndUpdModal').val(ALIAS_INDIRIZZO);
	$('#indirizzoUpdModal').val(INDIRIZZO);
	$('#capUpdModal').val(CAP);
	$('#cittaUpdModal').val(CITTA);
	$('#provinciaUpdModal').val(PROVINCIA);
	$('#codNazUpdModal').val(COD_NAZIONE);
	$('#emailUpdModal').val(MAIL);
	
	
	$("#subTitleModal").text("Vuoi eliminare il seguente indirizzo?");
	$("#titleModal").text("Elimina indirizzi di restituzione");
	
	$("#configurazioneIndririRest_ModificaModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneDeliveryPA_ModificaModal").modal('show');
}

