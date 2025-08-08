var tableMetadati = null;
$(document).ready(function() {
	
	$('#configurazioneIndririRest_ModificaModal').on('hidden.bs.modal', function () {
	  
//		$(this).find('form').trigger('reset');
	    cleanModalMod();
	    cleanModalDivMessage();
	    reset_validateText();
	    $("#confermaAggiorna").prop( "disabled", false );
	    $("#confermaCancella").prop( "disabled", false );
	    $("input[id*=UpdModal]").prop("readonly", false);
	    
	})
	
		$('#configurazioneIndririRest_ModificaModal').on('show.bs.modal', function () {
			
	})
	
	
	
	});
	
	$("#confermaAggiorna").click(function(e) {

		var txt;
		var retConfirm = confirm("Confermi l'aggiornamento?");
		if (retConfirm == true) {
			updateIndirizzoRest();
		} 
	});
	
	$("#confermaCancella").click(function(e) {

		var txt;
		var retConfirm = confirm("Confermi la cancellazione?");
		if (retConfirm == true) {
			deleteIndirizzoRest();
		} 
		
	});
	
	$("#closeMod").click(function(e) {	
		cleanModalMod();
	});



	function validateText(id)
	{
		if($("#"+id).val()==null || $("#"+id).val()=="")
		{
			var div = $("#"+id).closest("div");
			div.removeClass("has-success");
			$("#glypcn"+id).remove();
			div.addClass("has-error has-feedback");
			div.append('<span id="glypcn'+id+'" class="glyphicon glyphicon-remove form-control-feedback validatori"></span>');
			return false;
		}
		else{
		    var div = $("#"+id).closest("div");
		    div.removeClass("has-error");
			$("#glypcn"+id).remove();
			div.addClass("has-success has-feedback");
			div.append('<span id="glypcn'+id+'" class="glyphicon glyphicon-ok form-control-feedback validatori"></span>');
		    return true;
		}
	
	}

	function cleanModalMod()
	{
		$(".form-group").each(function(){
			$(this).parents('.form-group').addClass('has-error');
			$(this).removeClass("has-success has-error has-feedback");
	
				$(".validatori").remove();
		});
		
	}

	function cleanModalDivMessage(){
		
		$('#danger_msg_modal').text();
		$('#div_error_alert_modal').hide();
		
		$('#success_msg_modal').text();
		$('#div_success_alert_modal').hide();
	}

 
   function updateIndirizzoRest(){

	   var flagValidate = false;
	   
	    if (!validateText("intestatarioUpdModal"))  {flagValidate = true;}
		if (!validateText("referenteUpdModal"))  {flagValidate = true;	}
		if (!validateText("aliasIndUpdModal"))  { flagValidate = true;}
		if (!validateText("indirizzoUpdModal"))  {flagValidate = true;}
		if (!validateText("capUpdModal"))  {flagValidate = true;}
		if (!validateText("cittaUpdModal"))  {flagValidate = true;}
		if (!validateText("provinciaUpdModal"))  {flagValidate = true;}
		if (!validateText("codNazUpdModal"))  {flagValidate = true;}
		if (!validateText("emailUpdModal"))  {flagValidate = true;}
		if (!validateText("telefonoUpdModal"))  {flagValidate = true;}
	   
	   if(flagValidate == true){
		   alert("Inserire i campi manacnti !");
		   return;
	   }
		
	   if(!validateEmail("emailUpdModal")){
		   alert("formato della mail con valido;");
		   return;
	   }
	   
		var intestatarioUpdModal= $('#intestatarioUpdModal').val();
		var referenteUpdModal   = $('#referenteUpdModal').val();
		var aliasIndUpdModal    = $('#aliasIndUpdModal').val();
		var indirizzoUpdModal   = $('#indirizzoUpdModal').val();
		var capUpdModal         = $('#capUpdModal').val();
		var cittaUpdModal       = $('#cittaUpdModal').val();
		var provinciaUpdModal   = $('#provinciaUpdModal').val();
		var codNazUpdModal      = $('#codNazUpdModal').val();
		var emailUpdModal       = $('#emailUpdModal').val();
		var telefonoUpdModal    = $('#telefonoUpdModal').val();
		
	   var operatoreID = $('input[name="operatoreId"').val();
	   var idCliente = $('#lstclientiAddModal').val();
	   var idDelivery = $('#idDelivery').val();
	   
	   var url = contextPath + '/' + 'configurazione/indirizziRestituzione/updateIndirizzoRestituzione';
		   
		var request = { "data":{
			"id": idDelivery,
			"clientID": idCliente,
			"operatoreID": operatoreID,
			"intestatario":intestatarioUpdModal,
			"referente":referenteUpdModal,
			"aliasIndirizzo":aliasIndUpdModal,
			"indirizzo":indirizzoUpdModal,
			"cap":capUpdModal,
			"citta":cittaUpdModal,
			"provincia":provinciaUpdModal,
			"codNaz":codNazUpdModal,
			"email":emailUpdModal,
			"telefono":telefonoUpdModal,
			}};
		
		waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'default'});
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
						
						$("#confermaAggiorna").prop( "disabled", true );
						$('#success_msg_modal').text(result.message);
						$('#div_success_alert_modal').show(1000);	
						
						$("#tableDelivery div[name=" + idDelivery + "]").parent().parent().find('td:nth-child(7)').html("Aggiornato");
					
					}else{
						
						$('#danger_msg_modal').text(result.message);
						$('#div_error_alert_modal').show(1000);
					}
					
					waitingDialog.hide();

				},
				error : function(xhr, status, error, result) {
					console.log('errore!');
					console.log('xhr ', xhr);
					console.log('status ', status);
					console.log('error ', error);
					console.log('result ', result);
					$('#danger_msg_modal').text(error);
					$('#div_error_alert_modal').show(1000);
					waitingDialog.hide();
					
				}
			});
		
   }
   
   
   function deleteIndirizzoRest(){
	   
	   var url = contextPath + '/' + 'configurazione/indirizziRestituzione/deleteIndirizzoRestituzione';
	   
		var idDelivery = $('#idDelivery').val();
		var alias = $('#aliasIndModal').val();
		var indirizzo = $('#indRestModal').val();
		
		var operatoreID = $('input[name="operatoreId"').val();
		var request = { "data":{"id": idDelivery, "operatoreID": operatoreID}};

		waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'default'});
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
						
						$("#confermaCancella").prop( "disabled", true );
						$('#success_msg_modal').text(result.message);
						$('#div_success_alert_modal').show(1000);	
						
//						$("#tableDelivery div[id=" + idDelivery + "]").parent().parent().css( "color", "red" );
						$("#tableDelivery div[name=" + idDelivery + "]").parent().parent().find('td:nth-child(8)').html("Cancellato");
						$("#tableDelivery div[name=" + idDelivery + "]").parent().parent().find('td:nth-child(8)').css( "color", "red" );
						$("#tableDelivery div[name=" + idDelivery + "]").parent().parent().find('td:nth-child(7)').html("");
					}else{
						$('#danger_msg_modal').text(result.message);
						$('#div_error_alert_modal').show(1000);
					}
					waitingDialog.hide();

				},
				error : function(xhr, status, error, result) {
					console.log('errore!');
					console.log('xhr ', xhr);
					console.log('status ', status);
					console.log('error ', error);
					console.log('result ', result);
					$('#danger_msg_modal').text(error);
					$('#div_error_alert_modal').show(1000);
					waitingDialog.hide();
					
				}
			});
		
	}	

   
	function validateEmail(id) {
		var email = $('#'+ id ).val();  
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		  var flag = re.test(email);
		  
		  if(flag) return true;
		  
		  var div = $("#"+id).closest("div");
			div.removeClass("has-success");
			$("#glypcn"+id).remove();
			div.addClass("has-error has-feedback");
			div.append('<span id="glypcn'+id+'" class="glyphicon glyphicon-remove form-control-feedback"></span>');
			return flag;
		}


	function reset_validateText(){

		var div = $("input[id*=UpdModal]").closest("div");
		div.removeClass("has-error");
//		$("#glypcn").remove();
		div.removeClass("has-success");

	}