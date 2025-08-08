$(document).ready(function() {

	$('#apriScatolaModal').on('show.bs.modal', function() {
		showLblWarningApri("",false);
		$("#tipoIstanza").empty();
		$("#identificativoPA").empty();
		if((idTipoScatola == ID_TIPO_SCATOLA) || (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE) || (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)){
			loadLstTipIstanza("tipoIstanza",idTipoScatola);
			loadLstIdentificativoPA("identificativoPA",idTipoScatola); 
		}else{
			$("#num_maxPratiche").attr("disabled",false);
		}
	});
	
	$("form").on('submit',function(e){
	    e.preventDefault();
	});
	
	$("#formApriScatola").submit(function() {
		submit();		
	});

	if((idTipoScatola == ID_TIPO_SCATOLA) || (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE) || (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)){
		$("#tipoIstanza").change(function(){
			loadNumMaxPratiche();
		});
		
		$("#identificativoPA").change(function(){
			loadNumMaxPratiche();
		});
	}
});




function loadNumMaxPratiche(){
	var idIstanza = $("#tipoIstanza").val();
	var idAnagPA = $("#identificativoPA").val();
	
	if((idIstanza != "") && (idAnagPA != "")){
		showLoaderLst(true,"Attendere! Caricamento num max pratiche in corso...");
		
		$("#submitApriScatola").prop("disabled",false);
		var request = {	"data" : {	"idAnagrPA" : idAnagPA, "idIstanza": idIstanza   }};
			var url = contextPath + '/' + 'scatola' + '/getNumMaxPratiche';
			$.ajax({
					type : 'POST',
					url : url,
					contentType : 'application/json',
					dataType : 'json',
					data : JSON.stringify(request),
					success : function(result) {
						showLoaderLst(false,"");
						console.log('success! ', result);
						if(result.status){
							$("#num_maxPratiche").val(result.data.numMaxPratiche);							
						}else{
							$("#submitApriScatola").prop("disabled",true);
							showLblWarningApri(result.message,true);	
						}
						$("#num_maxPratiche").prop("disabled",false);
					},
					error : function(xhr, status, error, result) {
						$("#submitApriScatola").prop("disabled",true);
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
}

function showLblWarningApri(message, show){
	$('#lblWarningApriScatola').text(message);
	$('#lblWarningApriScatola').attr("style",((show)?"display:''":"display:none"));
}

function showLoaderLst(show,message){
	$("#loadLstApriScatola").text(message);
	$("#loadLstApriScatola").attr("style",((show)?"display:''":"display:none"));
}

function submit() {
	showLblWarningApri("",false);
	
	var idIstanza = $("#tipoIstanza").val();
	var idAnagPA = $("#identificativoPA").val();
	var identificativoPA = $("#identificativoPA option:selected").text();
	var codiceTipoIstanza = $("#tipoIstanza option:selected").text();
	var num_maxPratiche = $("#num_maxPratiche").val();
	var note = $("#noteScarto").val();
	
	//Validazione codice scatola	
	var codScatola = $("#codScatola").val();
	var idScatola = parseInt(codScatola.substring(3,10));
	console.log(idIstanza+"--"+idAnagPA+"--"+num_maxPratiche+"--"+codScatola);

	if(!((codScatola.length == 10) && (codScatola.substring(0,3) == prefix_sca) && (idScatola > 0))) {
		showLblWarningApri("Attenzione! Formato codice scatola non valido! E' atteso "+prefix_sca+"XXXXXXX",true);
		return;
	}
	$("#submitApriScatola").prop("disabled",true);
	showLoaderLst(true,"Attendere! Creazione scatola in corso...");	
	
	var request = {
		"data" : {
			"idScatola" : idScatola,
			"codiceScatola" : codScatola,
			"numMaxPratiche" : num_maxPratiche,
			"idAnagrPA" : idAnagPA,
			"idIstanza": idIstanza,
			"idCentroDemat": idCentroDematUser,
			"idTipoScatola" : idTipoScatola,
			"operatore":operatore,
			"idPostazione":idPostazione,
			"note":note
	   }};
	var url = contextPath + '/' + 'scatola' + '/apriScatola';
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				console.log('success! ', result);
				showLoaderLst(false,"");
				if(result.status){					
					$("#apriScatolaModal").modal('hide');					
					printBarCodeScatola(codScatola,identificativoPA,codiceTipoIstanza,result.data.descrizioneScatola);					
					$('#div_success_alert').show();
					$('#success_msg').text(result.message);
					findScatole();
				}else{
					showLblWarningApri(result.message,true);			
				}
				$("#submitApriScatola").prop("disabled",false);
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
