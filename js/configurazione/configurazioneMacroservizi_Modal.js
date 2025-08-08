
$(document).ready(function() {
	
	$('#configurazioneMacroservizio_AddMod_Modal').on('show.bs.modal', function() { 
		$( "#pulisciFiltri" ).prop( "disabled", true );
		resetDivAlert();
		target = document.getElementById('spinnerContainerModal');
		loadLstClienti();
		
			$("#titleAddMod_Modal").text("Aggiungi Macroservizio");
	});
	
	$('#configurazioneMacroservizio_AddMod_Modal').on('hidden.bs.modal', function () {
	    $(this).find('form').trigger('reset');
	    target = document.getElementById('spinnerContainer');
	    $("#servizi").empty();
	    reset_validateCodMacroSe();
	})

	//ricerca clienti al caricamento della pagina
    function loadLstClienti() {
    	disableInput();
    	
    	$("#clienti").empty();
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
    				disableInputPartial();
    				alert("Nessun servizio associato all'utente selezionato.");
    			}else{
	    			$("#clienti").append("<option value='-1'> -- seleziona -- </option>");
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#clienti").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
	    			$( "#clienti" ).prop( "disabled", false );
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
	
    $( "#clienti" ).change(function() {
    	disableInputPartial();
    	loadLstServizi();
    });
	
    function loadLstServizi(){
    	
    	$("#servizi").empty();
    	var idCliente = $( "#clienti" ).val();
    	if(idCliente == -1){
//    		disableInputPartial();
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
    			console.log("lengt: " +lst.length);
//    			$("#clienti").append("<option value=''> Tutti </option>");
    			if(lst.length < 1){
    				disableInputPartial();
    				alert("Nessun servizio associato all'utente selezionato.");
    			}else{
    			
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#servizi").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
	    			$( "#servizi" ).prop( "disabled", false );
	    			$( "#codMacroservizio" ).prop( "disabled", false );
	    			$( "#codMacroservizio" ).prop( "readonly", false );
	    			$( "#verificaAddMS" ).prop( "disabled", false );
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
    
    
	function disableInput(){
		$( "#clienti" ).prop( "disabled", true );
		$( "#servizi" ).prop( "disabled", true );
		$( "#codMacroservizio" ).prop( "disabled", true );
		$( "#verificaAddMS" ).prop( "disabled", true );
	}
	
	function disableInputPartial(){
		$( "#servizi" ).prop( "disabled", true );
		$( "#codMacroservizio" ).prop( "disabled", true );
		$( "#verificaAddMS" ).prop( "disabled", true );
	}
	
	function readonlyInput(){
		$( "#clienti" ).prop( "disabled", true );
		$( "#servizi" ).prop( "disabled", true );
		$( "#codMacroservizio" ).prop( "readonly", true );
		$( "#verificaAddMS" ).prop( "disabled", true );
	}
	
	function readonlyInputPartial_noCodMacServ(){
		$( "#clienti" ).prop( "disabled", true );
		$( "#servizi" ).prop( "disabled", true );
		$( "#codMacroservizio" ).prop( "readonly", false );
		$( "#verificaAddMS" ).prop( "disabled", false );
	}
	
	$("#pulisciFiltri").click(function() {
		resetDivAlert();
		reset_validateCodMacroSe();
		$("#servizi").empty();
		$("#codMacroservizio").val("");
		disableInput();
		$( "#clienti" ).prop( "disabled", false );
		$( "#clienti" ).val(-1);
	});
	
	$("#verificaAddMS").click(function(e) {
		
		var checkValue = validateCodMacroSe();
		if (checkValue == false) {
			return;
		} 

		resetDivAlert();
		
		var r = confirm("Confermi l'operazione?");
		if (r == false) {
		  
		} else {
		
		//chiamata ajax per verificare se il macroservizio esiste
		var idCliente = $( "#clienti" ).val(); 
		var idServizio = $( "#servizi" ).val();
		var codeMacroservizio = $( "#codMacroservizio" ).val();
		
		showLoaderLst(true,"Attendere! Richiesta inserimento macroservio in corso ...");
    	
		var url = contextPath + '/configurazione/' + 'configurazioneMacroservizi/addMacroServizioToClient';
    	var request = {"data":{ "idCliente": idCliente, "idServizio": idServizio , "codeMacroservizio": codeMacroservizio}}
    	console.log(request);
    	console.log(url);
    	$.ajax({
    		type : 'POST',
    		url: url,
    		contentType : 'application/json',
            dataType: 'json',
            data: JSON.stringify(request),
    		success : function(result) {
    			
    			if(result.data == true){
    				readonlyInput();
    				$('#success_msg_modal').text(result.message);
        			$('#div_success_alert_modal').show(1000);
    			}else{
    				readonlyInputPartial_noCodMacServ();
    				$('#danger_msg_modal').text(result.message);
        			$('#div_error_alert_modal').show(1000);
    			}
    			
    			$( "#verificaAddMS" ).prop( "disabled", true );
    			$( "#pulisciFiltri" ).prop( "disabled", false );
    			showLoaderLst(false,'');
    			
    		},
    		error : function(xhr, status, error, result) {
    			console.log('errore!');
    			console.log('xhr ', xhr);
    			console.log('status ', status);
    			console.log('error ', error);
    			console.log('result ', result);
    			$('#danger_msg_modal').text(error);
    			$('#div_error_alert_modal').show();
    			
    			showLoaderLst(false,'');
    		}
    	});
		
		
		}
	});
	
	//verifica validazione campo codice macro servizio
	function validateCodMacroSe(checkBoolean)
 	{
		var valMS = $("#codMacroservizio").val();
		var flag = true;
		var message = "";
		if(valMS.length > 20){
			flag = false;
			message = "Codice Macroservizio deve essere lungo non piu' di 20 caratteri."
		}
		
		if(valMS == null || valMS == '' ){
			flag = false;
			message = "Codice Macroservizio non puo' essere vuoto."
		}
		
		if (flag == false) {
			alert(message);
			var div = $("#codMacroservizio").closest("div");
			div.removeClass("has-success");
			$("#glypcn").remove();
			div.addClass("has-error has-feedback");
			div.append('<span id="glypcn" class="glyphicon glyphicon-remove form-control-feedback"></span>');
			return false;
		} 
			
			return true;
	}
	
	function reset_validateCodMacroSe(){
		
		var div = $("#codMacroservizio").closest("div");
		div.removeClass("has-error");
		$("#glypcn").remove();
	}
	
	function resetDivAlert(){
		$('#success_msg_modal').text('');
		$('#danger_msg_modal').text('');
		$('#div_success_alert_modal').hide();
		$('#div_error_alert_modal').hide();
	}
	function showLoaderLst(show,message){
		$("#loadFields").text(message);
		$("#loadFields").attr("style",((show)?"display:''":"display:none"));
	}
});

