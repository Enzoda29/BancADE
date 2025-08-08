$(document).ready(function() {
	
//	$('#configurazioneOperatoriAggiungiModal').modal('toggle');

	$("#aggiungi").click(function() {
		getAllProfile('listProfiliAdd', 1, false);
		getAllCentroDemat('listCentroDematAdd',1, false);
		openModalAggiungi();
		resetAllAdd();
	});
	
	$("#buttonAddOperatore").click(function() {
		//button add modal
		resetDivAlertModalAdd();
		addOperatore();
	});
	
	$("#buttonUpdOperatore").click(function() {
		//button upd modal confirm
		updExecution($("#typeOperation").val() );
	});
	
	
	function openModalAggiungi(){
		$("#configurazioneOperatoriAggiungiModal").modal({backdrop: 'static', keyboard: true});
		$("#configurazioneOperatoriAggiungiModal").modal('show');
	}
	
	var target = document.getElementById('spinnerContainer');
	var spinner;
	var spinning = false;
	
	function toggleSpin(){
	    spinning ? spinner.stop() : spinner = new Spinner(opts).spin(target);  
	    spinning = !spinning;
	}
	
	$("#btn-ricerca-operatore").click(function(e) {
		
		var centrodemat = $('input[name="centrodemat"').val();
		var usernameSearch = $('#usernameSearch').val();	
		var uri = contextPath
				+ "/configurazione/dataTableConfOperatori.json?usernameSearch="
				+ usernameSearch+"&codiceCentro="+centrodemat;
		console.log('URI.. -> '+uri);
		$('#table-conf-operatori').bootstrapTable('refresh', {
		    url: uri
		});
	});	


});


	function getAllCentroDemat(idSelect, valueSelected, valueReadOnly){
		
		$("#"+idSelect).empty();
    	showLoaderLst(true,"Attendere! Caricamento lista centri demat. in corso...");
    	var url = contextPath + '/common/getAllCentroDemat';
    	$.ajax({
    		type : 'GET',
    		url : url,
    		success : function(data) {
    			var lst = data.data;
    			console.log("lengt: " +lst.length);
    			if(lst.length < 1){
    				alert("Nessun centro trovato.");
    			}else{
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#"+idSelect).append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
	    			$("#"+idSelect).val(valueSelected).attr("selected", "selected");
	    			$("#"+idSelect).prop('disabled', valueReadOnly);
	    			
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
    	function getAllProfile(idSelect, valueSelected, valueReadOnly){
    		
    		$("#"+idSelect).empty();
        	showLoaderLst(true,"Attendere! Caricamento profili in corso...");
        	var url = contextPath + '/common/getAllUserProfiles';
        	$.ajax({
        		type : 'GET',
        		url : url,
        		success : function(data) {
        			var lst = data.data;
        			console.log("lengt: " +lst.length);
        			if(lst.length < 1){
        				alert("Nessun profilo trovato.");
        			}else{
    	    			for (var i = 0; i < lst.length; i++) {
    	    				var obj = lst[i];
    	    				
    	    				$("#"+idSelect).append(
    	    						"<option value=" + obj.value + ">"
    	    								+ obj.descrizione + "</option>");
    	    				
    	    			}
    	    			$("#"+idSelect).val(valueSelected).attr("selected", "selected");
    	    			$("#"+idSelect).prop('disabled', valueReadOnly);
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
		
    	function showLoaderLst(show,message){
    		$("#loadFields").text(message);
    		$("#loadFields").attr("style",((show)?"display:''":"display:none"));
    	}
    	
    	
    	function addOperatore(){
    		
    	var flagValidate = false;
 		var flagValidateMail = false;
 		    
 		if (!validateText("usernameAdd")){flagValidate = true;}
 		if (!validateText("emailAdd")){flagValidate = true;}
 		if (!validateEmail("emailAdd")){flagValidateMail = true;}
 		  
 		if(flagValidate == true){alertCstm('Inserire i dati mancanti!');return; }
 		if(flagValidateMail == true){alertCstm('Inserire una mail valida!');return; }

 		 
 		var username = $("#usernameAdd").val();
		var cd = $("#listCentroDematAdd").val();
		var profilo = $("#listProfiliAdd").val();
		//forzatura profilo supervisore sempre
		if(profilo == null) profilo = 1; 
		var email = $("#emailAdd").val();
		var telfisso = $("#telfissoAdd").val();
		var telMob = $("#telMobileAdd").val();
		var descr = $("#descUserAdd").val();
		
		var request = { "data":{"username": username,"idProfilo": profilo,"idCentrDemat": cd,"telFisso": telfisso,"email": email,"telMobile": telMob,"descrizione": descr}}
		var url = contextPath + '/configurazione/operatore/add';	
    	
		BootstrapDialog.show({
    			   size: BootstrapDialog.SIZE_SMALL,
    			   title: 'CONFERMA AGGIUNGI OPERATORE',
    	           message: 'Confermi di aggiungere operatore ' + username +' ?',
    	           buttons: [{
    	               label: 'Conferma Aggiungi',
    	               cssClass: 'btn-primary',
    	               action: function(dialog) {
    	               	  toggleSpin();	
    	               	 $.ajax({
    	          	        type: 'POST',
    	          	        url: url,	   
    	          	        contentType : 'application/json; charset=utf-8',
    	          	        dataType: 'json',
    	          	        data: JSON.stringify(request),
    	          	        success: function (result) {	        	

    	          	        	if(result.status){
    	          	        		
    	          	        		$('#buttonAddOperatore').prop("disabled", true);
    								$('#success_msg_add_modal').text(result.message);
    								$('#div_success_alert_add_modal').show(1000);	
    								
    								var centrodemat = $('input[name="centrodemat"').val();
    								var uri = contextPath
    								+ "/configurazione/dataTableConfOperatori.json?codiceCentro="+centrodemat;
    					
		    						$('#table-conf-operatori').bootstrapTable('refresh', {
		    						    url: uri
		    						});
    							}else{
    								$('#danger_msg_add_modal').text(result.message);
    								$('#div_error_alert_add_modal').show(1000);
    							}
    	          	        	toggleSpin();
    	          	        	
    	          	        },
    	          	        error: function (xhr, status, error, result) {
    	          	            console.log('errore!');
    	          	            console.log('xhr ', xhr);
    	          	            console.log('status ', status);
    	          	            console.log('error ', error);
    	          	            console.log('result ', result);
    	          	            $('#danger_msg').text(error);
    	          	            $('#div_error_alert').show();
    	          	            toggleSpin();
    	          	        }
    	          	    });
    	               	dialog.close();              
    	               }
    	           }, {
    	               label: 'Annulla',
    	               action: function(dialogItself){
    	                   dialogItself.close();
    	               }
    	           }]
    	       });
    	}
    	
	

    	function validateEmail(id) {
			var email = $('#' + id).val();
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var flag = re.test(email);
		
			if (flag)
				return true;
		
			var div = $("#" + id).closest("div");
			div.removeClass("has-success");
			$("#glypcn" + id).remove();
			div.addClass("has-error has-feedback");
			div.append('<span id="glypcn'+ id + '" class="glyphicon glyphicon-remove form-control-feedback"></span>');
			return flag;
    	}
    	

    function resetDivAlertModalAdd(){
    	$('#danger_msg_add_modal').text();
    	$('#div_error_alert_add_modal').hide();
    	$('#success_msg_add_modal').text();
    	$('#div_success_alert_add_modal').hide();
    }
    
    
    function resetAllUPD(){
		
    	$('#buttonUpdOperatore').prop("disabled", false);
    	
    	$('#danger_msg_upd_modal').text();
    	$('#div_error_alert_upd_modal').hide();
    	$('#success_msg_upd_modal').text();
    	$('#div_success_alert_upd_modal').hide();
    	
    	var div = $("input[id*=Upd]").closest("div");
		div.removeClass("has-error");
		$("span[id^=glypcn]").remove();
		div.removeClass("has-success");
		
		
		$('#danger_msg_upd_modal').text();
    	$('#div_error_alert_upd_modal').hide();
    	$('#success_msg_upd_modal').text();
    	$('#div_success_alert_upd_modal').hide();
		
	}
    
	
	function resetAllAdd(){
		
		$("input[id*=Add]").val('');
		$('#danger_msg_add_modal').text();
    	
    	var div = $("input[id*=Add]").closest("div");
		div.removeClass("has-error");
		$("span[id^=glypcn]").remove();
		div.removeClass("has-success");

		$('#buttonAddOperatore').prop("disabled", false);
		
	}
	

	function validateText(id) {
	if ($("#" + id).val() == null || $("#" + id).val() == "") {
		var div = $("#" + id).closest("div");
		div.removeClass("has-success");
		$("#glypcn" + id).remove();
		div.addClass("has-error has-feedback");
		div
				.append('<span id="glypcn'
						+ id
						+ '" class="glyphicon glyphicon-remove form-control-feedback"></span>');
		return false;
	} else {
		var div = $("#" + id).closest("div");
		div.removeClass("has-error");
		$("#glypcn" + id).remove();
//		div.addClass("has-success has-feedback");
//		div
//				.append('<span id="glypcn'
//						+ id
//						+ '" class="glyphicon glyphicon-ok form-control-feedback"></span>');
		return true;
		}
	}
	
	function alertCstm(msg){
		BootstrapDialog.show({
			   size: BootstrapDialog.SIZE_SMALL,
	            title: 'ATTENZIONE!',
	            message: msg,
	            buttons: [{
	                label: 'OK!',
	                cssClass: 'btn-warning',
	                action: function(dialog){
	                    dialog.close();
	                }
	            }]
	        });
	}
	
	function updOperatore(ID, USERNAME , DESC_OPERATORE , PROFILO_ID , CENTRO_DEMAT_ID , email , tel_fisso , tel_mobile){
		
		resetAllUPD();
		
		$("input[id*=Upd]").prop('disabled', false);
		
		getAllProfile('listProfiliUpd',PROFILO_ID, false);
		getAllCentroDemat('listCentroDematUpd',CENTRO_DEMAT_ID, false);
		
		$("#ID_OP_UPD").val(ID);
		$("#typeOperation").val('updOP');
		$("#usernameUpd").val(USERNAME);
		$("#listCentroDematUpd").val(CENTRO_DEMAT_ID);
		$("#listProfiliUpd").val(3).attr("selected", "selected");
		$("#emailUpd").val(email);
		$("#telfissoUpd").val(tel_fisso);
		$("#telMobileUpd").val(tel_mobile);
		$("#descUserUpd").val(DESC_OPERATORE);
		$("#buttonUpdOperatore").text("MODIFICA");
		
		
		
		$("#titleUPD").text("Aggiorna operatore");
		$("#descTitle").text("Modifica i campi sotto e premi il tasto 'Modifica'");
		$("#configurazioneOperatoriModificaModal").modal({backdrop: 'static', keyboard: true});
		$("#configurazioneOperatoriModificaModal").modal('show');
		
	}
	
	function dltOpertore(ID, USERNAME , DESC_OPERATORE , PROFILO_ID , CENTRO_DEMAT_ID , email , tel_fisso , tel_mobile){
		
		resetAllUPD();
		
		$("#typeOperation").val('dltOP');
		$("input[id*=Upd]").prop('disabled', true);
		getAllProfile('listProfiliUpd',PROFILO_ID, true);
		getAllCentroDemat('listCentroDematUpd',CENTRO_DEMAT_ID, true);
//		$("#listProfiliUpd option[value=5]").attr('selected', 'selected');
//		$("#listProfiliUpd").attr("selected", PROFILO_ID);
		
		$("#ID_OP_UPD").val(ID);
		$("#usernameUpd").val(USERNAME);
		$("#listCentroDematUpd").val(CENTRO_DEMAT_ID);
		$("#listProfiliUpd").val(3).attr("selected", "selected");
		$("#emailUpd").val(email);
		$("#telfissoUpd").val(tel_fisso);
		$("#telMobileUpd").val(tel_mobile);
		$("#descUserUpd").val(DESC_OPERATORE);
		
		$("#titleUPD").text("CANCELLA OPERATORE");
		$("#descTitle").text("Per cancellare l'operatore selezionato premere il tasto 'Cancella'");
		$("#buttonUpdOperatore").text("Cancella");
		$("#configurazioneOperatoriModificaModal").modal({backdrop: 'static', keyboard: true});
		$("#configurazioneOperatoriModificaModal").modal('show');
		
	}
	
	function updExecution(operation){
		
	  var url;
	  var request;
	  var title;
	  var message;
	  var labelButton;
	  
	  var idOperatore = $("#ID_OP_UPD").val();
	  
  	  if(operation =='updOP'){
  		
  		var flagValidate = false;
		var flagValidateMail = false;
		    
		if (!validateText("usernameUpd")){flagValidate = true;}
		if (!validateText("emailUpd")){flagValidate = true;}
 	    if (!validateEmail("emailUpd")){flagValidateMail = true;}
		if(flagValidate == true){alertCstm('Inserire i dati mancanti!');return; }
		if(flagValidateMail == true){alertCstm('Inserire una mail valida!');return; }

		 
		var username = $("#usernameUpd").val();
		var cd = $("#listCentroDematUpd").val();
		var profilo = $("#listProfiliUpd").val();
		//forzatura profilo supervisore sempre
		if(profilo == null) profilo = 1; 
		var email = $("#emailUpd").val();
		var telfisso = $("#telfissoUpd").val();
		var telMob = $("#telMobileUpd").val();
		var descr = $("#descUserUpd").val();
		
		var request = { "data":{"id": idOperatore ,"username": username,"idProfilo": profilo,"idCentrDemat": cd,"telFisso": telfisso,"email": email,"telMobile": telMob,"descrizione": descr}}
		var url = contextPath + '/configurazione/operatore/upd';
  		  
		title = 'CONFERMA MODIFICA';
  		message = 'Confermi di modificare l\'operatore ' + username +' ?';
  		labelButton = 'Conferma modifica';
  		
  	  }else if(operation =='dltOP'){
  		 
  		var request = { "data":{"id": idOperatore}}
		var url = contextPath + '/configurazione/operatore/delete';	
  		var username = $("#usernameUpd").val();
  		
  		title = 'CONFERMA ELIMINA';
  		message = 'Confermi di eliminare l\'operatore ' + username +' ?';
  		labelButton = 'Conferma elimina';
  	  }else{
  		  alert("Errore! riprovare a ricaricare la pagina.");
  		  return;
  	  }
  	  
		BootstrapDialog.show({
  			   size: BootstrapDialog.SIZE_SMALL,
  			   title: title,
  	           message: message,
  	           buttons: [{
  	               label: labelButton,
  	               cssClass: 'btn-primary',
  	               action: function(dialog) {
  	               	  toggleSpin();	
  	               	 $.ajax({
  	          	        type: 'POST',
  	          	        url: url,	   
  	          	        contentType : 'application/json; charset=utf-8',
  	          	        dataType: 'json',
  	          	        data: JSON.stringify(request),
  	          	        success: function (result) {	        	

  	          	        	if(result.status){
  	          	        		
  	          	        		$('#buttonUpdOperatore').prop("disabled", true);
  								
  								$('#success_msg_upd_modal').text(result.message);
  								$('#div_success_alert_upd_modal').show(1000);	
  								
  								
  								var centrodemat = $('input[name="centrodemat"').val();
  								var uri = contextPath
  								+ "/configurazione/dataTableConfOperatori.json?codiceCentro="+centrodemat;
  					
		    						console.log('URI.. -> '+uri);
		    						$('#table-conf-operatori').bootstrapTable('refresh', {
		    						    url: uri
		    						});
  							}else{
  								
  								$('#danger_msg_upd_modal').text(result.message);
  								$('#div_error_alert_upd_modal').show(1000);
  							}
  	          	        	toggleSpin();
  	          	        	
  	          	        },
  	          	        error: function (xhr, status, error, result) {
  	          	            console.log('errore!');
  	          	            console.log('xhr ', xhr);
  	          	            console.log('status ', status);
  	          	            console.log('error ', error);
  	          	            console.log('result ', result);
  	          	            $('#danger_msg_upd_modal').text(error);
  	          	            $('#div_error_alert_upd_modal').show();
  	          	            toggleSpin();
  	          	        }
  	          	    });
  	               	dialog.close();              
  	               }
  	           }, {
  	               label: 'Annulla',
  	               action: function(dialogItself){
  	                   dialogItself.close();
  	               }
  	           }]
  	       });
  		
  		
  	}
	
