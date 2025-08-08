$(document).ready(function() {

	$("#buttonConfiguraServizio").click(function(e) {
		aggiungiServizio();
		
	});

	loadListaClienti();
	loadListaServiziModal();

    $( "#clientiModal" ).change(function() {
    	
    	resetTag();
    	resetDivAlert();
    	var valueTutti = $( "#clientiModal" ).val();
    	if (valueTutti != '-1') {
    		$('#buttonConfiguraServizio').attr( "disabled", false );
    		getServiziByCliente();
    	}else{
    		$('#buttonConfiguraServizio').attr( "disabled", true );
    		}
    	
    });
    
    $('#configurazioneServizioModal').on('hidden.bs.modal', function () {
	    $(this).find('form').trigger('reset');
	    resetTag();
	    resetDivAlert();
	    $('#clientiModal').val('-1');
	})
	
	    $('#configurazioneServizioModal').on('show.bs.modal', function () {
	    	$('#buttonConfiguraServizio').attr( "disabled", true );
	    	resetTag();
	})

});

function loadListaClienti() {
	
	$("#clientiModal").empty();
	showLoaderLst(true,"Attendere! Caricamento lista clienti in corso...");
	var url = contextPath + '/common/getComboClienti';
	$.ajax({
		type : 'GET',
		url : url,
		success : function(data) {
			var lst = data.data;
			console.log("lengt: " +lst.length);
			if(lst.length < 1){
				alert("Nessun servizio associato all'utente selezionato.");
			}else{
				$("#clientiModal").append("<option value='-1'> -- Seleziona un cliente -- </option>");
    			for (var i = 0; i < lst.length; i++) {
    				var obj = lst[i];
    				$("#clientiModal").append(
    						"<option value=" + obj.value + ">"
    								+ obj.descrizione + "</option>");
    			}
			}
			resetTag();
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


function showLoaderLst(show,message){
	$("#loadFieldsModal").text(message);
	$("#loadFieldsModal").attr("style",((show)?"display:''":"display:none"));
}


function resetTag(){
	
	var valueTutti = $( "#clientiModal" ).val();
	if (valueTutti == '-1') {
		$('select[id*=_active]').val('-1');
		$('select[id*=_active]').prop( "disabled", true );
	}else{
		$('select[id*=_active]').prop( "disabled", false );
	}
	
//	$('select[id*=_active] option').remove();
//	$('select[id*=_active]').append("<option value='-1'> --- </option>");
}

function getServiziByCliente(){
	$('select[id*=_active] option').remove();
	$('select[id*=_active]').append("<option value='1'>Attivo</option>");
	$('select[id*=_active]').append("<option value='2'>Non attivo</option>");
	
	var url = contextPath + '/' + 'configurazione/configurazioneServizio' + '/listaServizi';
	
	var idCliente = $( "#clientiModal" ).val();
//	alert(idCliente);
//	var AG_active = $( "#AG_active" ).val();
//	var MN_active = $( "#MN_active" ).val();
//	var R_active = $( "#R_active" ).val();
	
	table.clear().draw(false);
//	var requestRicercaServ = { "data":{"idCliente": clientiModal, "idAttiGiudiziari": AG_active , "idMessoNotificatore": MN_active , "idRaccomandate": R_active}};
	var requestRicercaServ = { "data":{"idCliente": idCliente}};
	waitingDialog.show('Ricerca in corso...');
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestRicercaServ),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data.dataTable);
				if(result.status){
					var servizi =result.data.dataTable[0];
					console.log(result.data.dataTable.length );
					if(result.data.dataTable.length > 0){
						$('select[id*=_active] option[value=2]').prop('selected', true);
						 var keys = Object.keys(servizi);
						for (var i in keys){
							$('#'+keys[i]+'_active').val('1');
							//$('select[id*=_active]').val()
						}
						//"RACCOMANDATE":"true","DESCRIZIONE_CLIENTE":"ENEL","CLIENTE_ID":"1","ATTI_GIUDIZIARI":"true","MESSO_NOTIFICATORE":"true"
						//if(servizi.PD == 'true')  $('#PD_active').val('1'); else $('#PD_active').val('2');
						//if(servizi.PI == 'true')  $('#PI_active').val('1'); else $('#PI_active').val('2');
					}else{
						$('select[id*=_active]').val('2');
						alert("Attenzione! Cliente non ancora configurato! ");
					}
					waitingDialog.hide();
				}else{
					$('#danger_msg_modal').text(result.message);
					$('#div_error_alert_modal').show();
				}
				
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg_modal').text(error);
				$('#div_error_alert_modal').show();
			}
		});
		waitingDialog.hide();
}












function aggiungiServizio(){
//	var tipo=$("#tipo").val();
//	var url="";
//	if (tipo=="ADD"){
//	   url = contextPath + '/' + 'configurazione/configurazioneServizio' + '/aggiungiServizio';
//	}
//	else{
//		 url = contextPath + '/' + 'configurazione/configurazioneServizio' + '/modificaServizio';
//	}
	
	var url = contextPath + '/' + 'configurazione/configurazioneServizio' + '/insertServiziToCliente';
	
	var idCliente = $( "#clientiModal option:selected" ).val();
//	var PD_active = $( "#PD_active option:selected" ).val();
//	var PI_active = $( "#PI_active option:selected" ).val();
		
	var listaServizi=[];
	$('select[id*=_active]').each(function () {
		var sel = $(this).val();
		if(sel=='1'){	
			var idServizio=$(this).attr('value');
			var codServizio=  $(this).attr("id");
			var servizio = {"idServizio": idServizio, "codServizio": codServizio};
			listaServizi.push(servizio);
		}
	})
	
	
//	var request = { "data":{"idCliente": idCliente, "idPostaDescritta": PD_active , "idPostaIndescritta": PI_active}};
	var request = { "data":{"idCliente": idCliente, "listaServizi": listaServizi}}; 
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					$('#success_msg_modal').text(result.message);
					$('#div_success_alert_modal').show();
					
//					modalAggiungiServizio.modal('hide');
				}else{
					$('#danger_msg_modal').text(error);
					$('#div_error_alert_modal').show();
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

	function resetDivAlert(){
		$('#success_msg_modal').text('');
		$('#div_success_alert_modal').hide();
		
		$('#danger_msg_modal').text('');
		$('#div_error_alert_modal').hide();
		
	}
	
	
function loadListaServiziModal() {
	var url = contextPath + '/' + 'configurazione/configurazioneServizio' + '/getListaServizi';
	var div;
	$.ajax({
		type : 'GET',
		url : url,
		success : function(data) {
			var lst = data.data;
			if(lst.length < 1){
				alert("Nessun Servizio trovato.");
			}else{
				for (var i = 0; i < lst.length; i++) {
    				var obj = lst[i];
					div  = "<div class=\"col-lg-3 col-md-4\" style=\"margin-top: 10px;\">" + 
					"	<label for=\""+obj.codiceServizio+"_active\">" + obj.nomeServizio + ": </label>" + 
					"	<select id=\""+obj.codiceServizio+"_active\" value=\""+obj.idServizio+"\" class=\"form-control is-valid\" required>" +
					"	</select></div>";
    				$("#listaFiltriServizi").append(div);
				}
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
