$(document).ready(function() {
	
	
	
	$('#configurazioneIndirizzoRestituzione_AddModal').on('hidden.bs.modal', function () {
		  
		$(this).find('form').trigger('reset');
	    cleanModalMod();
	    cleanAddModalDivMessage();
	    disableResetInput();
	})

	
	$('#configurazioneIndirizzoRestituzione_AddModal').on('show.bs.modal', function () {
		$("input[id*=AddModal]").prop( "disabled", true );
		$(this).find('form').trigger('reset');
		loadListaClientiAdd();
		reset_validateText();
	})
	
	$("#azioneAddModal").click(function(e) {
		aggiungiDelivery();
	});
	
	$("#closeAdd").click(function(e) {
		
//		cleanModalAdd();
	});

	
	
	

	$( "#lstclientiAddModal" ).change(function() {
		var check =  $( "#lstclientiAddModal" ).val();
		if(check == '') {
			$("input[id*=AddModal]").prop( "disabled", true );
			$( "#azioneAddModal" ).prop( "disabled", true );
		}else{
			$("input[id*=AddModal]").prop( "disabled", false );
			$( "#azioneAddModal" ).prop( "disabled", false );
		}
	});	



	function showLoaderLst(show,message){
		$("#loadFields_addModal").text(message);
		$("#loadFields_addModal").attr("style",((show)?"display:''":"display:none"));
	}
	
	function loadListaClientiAdd() {
		$("#lstclientiAddModal").empty();
		showLoaderLst(true,"Attendere! Caricamento lista clienti in corso...");
		var url = contextPath + '/common/getComboClientiWhitCode';
		$.ajax({
			type : 'GET',
			url : url,
			success : function(data) {
				var lst = data.data;
				console.log("lengt: " +lst.length);
				if(lst.length < 1){
	//				disableInputPartial();
					alert("Nessun servizio associato all'utente selezionato.");
				}else{
					$("#lstclientiAddModal").append("<option value=''> -- Seleziona un cliente -- </option>");
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#lstclientiAddModal").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
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
		showLoaderLst(false,'');
	}


	
	function aggiungiDelivery(){

//		var id = $("#idDelivery").val();
		   var url = contextPath + '/' + 'configurazione/indirizziRestituzione/insertIndirizzoRestituzione';
		   
		   var flagValidate = false;
		   
		   if (!validateText("intestatarioAddModal"))  {
//				alert("Inserire un intestatario!")
			   flagValidate = true;
			}
			if (!validateText("referenteAddModal"))  {
//							alert("Inserire un referente!")
				flagValidate = true;
			}
			if (!validateText("aliasIndAddModal"))  {
//					alert("Inserire un alias per l'indirizzo di restituzione !")
			}
			if (!validateText("indirizzoAddModal"))  {
//				alert("Inserire un indirizzo!")
				flagValidate = true;
			}
			if (!validateText("capAddModal"))  {
//							alert("Inserire un CAP!")
				flagValidate = true;
			}
			if (!validateText("cittaAddModal"))  {
//							alert("Inserire una citta'!")
							flagValidate = true;
			}
			
			if (!validateText("provinciaAddModal"))  {
//							alert("Inserire una provincia !")
							flagValidate = true;
			}
			if (!validateText("codNazAddModal"))  {
//							alert("Inserire un codice nazionale !")
							flagValidate = true;
			}
//			if (!validateText("emailAddModal"))  {
////							alert("Inserire un'email!")
//							flagValidate = true;
//			}
//			if (!validateText("telefonoAddModal"))  {
////							alert("Inserire un numero di telefono !")
//							flagValidate = true;
//			}
		   
		   if(flagValidate == true){
			   alert("Inserire i campi mancanti !");
			   return;
		   }
			
		   if($('#emailAddModal').val() && !validateEmail("emailAddModal")){
			   alert("formato della mail con valido;");
			   return;
		   }
		   
			var idCliente = $('#lstclientiAddModal').val();
			
			var intestatarioAddModal= $('#intestatarioAddModal').val();
			var referenteAddModal   = $('#referenteAddModal').val();
			var aliasIndAddModal    = $('#aliasIndAddModal').val();
			var indirizzoAddModal   = $('#indirizzoAddModal').val();
			var capAddModal         = $('#capAddModal').val();
			var cittaAddModal       = $('#cittaAddModal').val();
			var provinciaAddModal   = $('#provinciaAddModal').val();
			var codNazAddModal      = $('#codNazAddModal').val();
			var emailAddModal       = $('#emailAddModal').val();
			var telefonoAddModal    = $('#telefonoAddModal').val();
			
			var operatoreID = $('input[name="operatoreId"').val();
			
			var request = { "data":{"clientID": idCliente,"operatoreID": operatoreID,
				"intestatario":intestatarioAddModal,
				"referente":referenteAddModal,
				"aliasIndirizzo":aliasIndAddModal,
				"indirizzo":indirizzoAddModal,
				"cap":capAddModal,
				"citta":cittaAddModal,
				"provincia":provinciaAddModal,
				"codNaz":codNazAddModal,
				"email":emailAddModal,
				"telefono":telefonoAddModal,
				}};
			
			
			
//			waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'default'});
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
							
							$('#success_msg_add_modal').text(result.message);
							$('#div_success_alert_add_modal').show(1000);	
							
						}else{
							
							$('#danger_msg_add_modal').text(result.message);
							$('#div_error_alert_add_modal').show(1000);
						}
						
						
						
						$('#azioneAddModal').prop('disabled' , true);
//						waitingDialog.hide();
						
						$('#ricercaClienti').val(idCliente);
						$( "#findDelivery" ).prop( "disabled", false );	
						findConfigDelivery(idCliente);
						
						
						

					},
					error : function(xhr, status, error, result) {
						console.log('errore!');
						console.log('xhr ', xhr);
						console.log('status ', status);
						console.log('error ', error);
						console.log('result ', result);
						$('#danger_msg_add_modal').text(error);
						$('#div_error_alert_add_modal').show(1000);
//						waitingDialog.hide();
						
					}
				});
//				waitingDialog.hide();
	   }
	
	
	function disableResetInput(){
		
		$("input[id*=AddModal]").prop( "disabled", true );
	}
	
	
	function reset_validateText(){

		var div = $("input[id*=AddModal]").closest("div");
		div.removeClass("has-error");
//		$("#glypcn").remove();
		div.removeClass("has-success");

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
	
	
});


function cleanAddModalDivMessage(){
	
	$('#danger_msg_add_modal').text();
	$('#div_error_alert_add_modal').hide();
	
	$('#success_msg_add_modal').text();
	$('#div_success_alert_add_modal').hide();
}
