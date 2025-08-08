var tableMetadati = null;
$(document).ready(function() {
	
	$('#scatoleDiAnomalieModal').on('hidden.bs.modal', function () {
	  
//	    cleanModalMod();
	    cleanModalDivMessage();
	    reset_validateText();
//	    $("#confermaAggiorna").prop( "disabled", false );
//	    $("#confermaCancella").prop( "disabled", false );
//	    $("input[id*=UpdModal]").prop("readonly", false);
	    
	    
	})
	
		$('#scatoleDiAnomalieModal').on('show.bs.modal', function () {
		$("#codRaccAddModal").val('');
		$("#noteAddModal").val('');
		$("#spedisciScatola").prop( "disabled", false );
	})
	
	
	
	});
	
	$("#spedisciScatola").click(function(e) {
		
		
		if(!validateCodRaccomand("codRaccAddModal"))return ;
		
		var id = $("#id").val();
		var codRac = $("#codRaccAddModal").val();
		var codScatola = $("#codScatola").val();
		var note = $("#noteAddModal").val();
		var descText = "Vuoi procedere con l’associazione della scatola <"+ codScatola +"> al codice raccomandata <"+codRac+"> ?";
		var txt;
		var retConfirm = confirm(descText);
		if (retConfirm == true) {
			
			invioSpedizione(id, codScatola, codRac, note);
		} 
	});
	
	
//	$("#closeMod").click(function(e) {	
//		cleanModalMod();
//		reset_validateText();
//	});

	

	function validateCodRaccomand(id)
	{
		var valCodRac = $("#"+id).val();
		
		if(valCodRac.length < 12)
		{
			alert("Attenzione! Inserire un codice raccomandata di 12 caratteri!");
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

//	function cleanModalMod()
//	{
//		$(".form-group").each(function(){
//			$(this).parents('.form-group').addClass('has-error');
//			$(this).removeClass("has-success has-error has-feedback");
//	
//				$(".validatori").remove();
//		});
//		
//	}

	function cleanModalDivMessage(){
		
		$('#danger_msg_modal').text();
		$('#div_error_alert_modal').hide();
		
		$('#success_msg_modal').text();
		$('#div_success_alert_modal').hide();
	}

   function invioSpedizione(idSpedizione, codScatola, codRacomandata, note){

		
//	   var operatoreID = $('input[name="operatoreId"').val();
//	   var idCliente = $('#lstclientiAddModal').val();
	   var idDelivery = $('#idDelivery').val();
	   var centroDemat  = $('input[name="centrodemat"]').val();
	   
	   
	   var url = contextPath + '/restMaterialita/spedisciScatolaDiAnomalie';
		   
		var request = { "data":{
			"scatolaID": idSpedizione,
			"centroDemat": centroDemat,
			"codicaRaccomandata": codRacomandata,
			"note":note,
			"codiceScatola":codScatola
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

						$("#spedisciScatola").prop( "disabled", true );
						$('#success_msg_modal').html(result.message);
						$('#div_success_alert_modal').show(1000);	
						caricaTabScatoleDiAnomalie();
						
					}else{
						
						alert(result.message);
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
   
   
	function reset_validateText(){

		var div = $("input[id*=AddModal]").closest("div");
		div.removeClass("has-error");
		$("#glypcncodRaccAddModal").remove();
		div.removeClass("has-success");

	}