

$(document).ready(function() {
	waitingDialog.show();
	
	 $(".modal-dialog").css({'width':'40%',
         'height':'auto', 
        'max-height':'40%'});
	
	$("#confermaRecupero").attr("disabled", true);
	$('#confermaRecuperoPickingModal').on('shown.bs.modal', function () {
   	 	
//	    $(this).find('.modal-dialog').css({width:'30%',
//	                               height:'auto', 
//	                              'max-height':'40%'});
	});
	
	$("#confermaRecupero").click(function() {
		resetMsg();
		
		var picking = $('#picking').val();
		$('#titleModal').text("CONFERMA PIKING");
		$('#textBodyConfermaModal').text("Confermi il recupero dei documenti associati al codice: ");
		$('#textBold').text(picking);
		
		$("#conferma").attr("onclick", "confermaRecupero('" + picking + "' );");
		$('#confermaRecuperoPickingModal').modal('show');
		
	});
	
	$("#btnChiudiECreaSanabili").click(function() {
		resetMsg();
//		var codiceScatolaSanabili = $('#scatolaIdSanabili').val();
		$('#titleModal').text("CONFERMA CREA SCATOLA ANOMALIE SANABILI");
		$('#textBodyConfermaModal').text("Confermi la chiusura e creazione della scatolala Anomalie Sanabili con codice: ");
		$('#textBold').text(codiceScatolaSanabili);
		
		$("#conferma").attr("onclick", "chiudiECreaSanabili();");
		$('#confermaRecuperoPickingModal').modal('show');
		
//		chiudiECreaSanabili();
	});
	
	$("#btnChiudiECreaNonSanabili").click(function() {
		resetMsg();
//		var codiceScatolaSanabili = $('#scatolaIdSanabili').val();
		$('#titleModal').text("CONFERMA CREA SCATOLA ANOMALIE NON SANABILI");
		$('#textBodyConfermaModal').text("Confermi la chiusura e creazione della scatolala Anomalie non Sanabili con codice: ");
		$('#textBold').text(codiceScatolaNonSanabili);
		
		$("#conferma").attr("onclick", "chiudiECreaNonSanabili();");
		$('#confermaRecuperoPickingModal').modal('show');
		
//		chiudiECreaSanabili();
	});
	aggiornaDatiVideata();
	
	waitingDialog.hide();
});


function aggiornaDatiVideata(){
//	waitingDialog.show();
	activeBtnChiudiECrea();
	console.log('caricaVideata start');
	var url = contextPath + '/'+'gestione'  + '/getConfermaDocumentiAnomali';
	console.log('getConfermaDocumentiAnomali : '+url);
	
	var	idCentroDemat = $('[name="centrodemat"]').val();
	var requestDocumentiAnomali = { "data":{"idCentroDemat":idCentroDemat}};
	activeBtnChiudiECrea();
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDocumentiAnomali),
			beforeSend: function(){
//				waitingDialog.show();
		        },
			success : function(result) {
								
				if(result.status){
					var lstDocumenti =result.data.listDocumento
					scatolaIdSanabili=result.data.scatolaIdSanabili;
					scatolaIdNonSanabili=result.data.scatolaIdNonSanabili;
					codiceScatolaSanabili=result.data.codiceScatolaSanabili;
					codiceScatolaNonSanabili=result.data.codiceScatolaNonSanabili;
					documentiScatolaSanabili=result.data.documentiScatolaSanabili;
					documentiScatolaNonSanabili=result.data.documentiScatolaNonSanabili;
					
					initViewValues();
					
				}else{
					$('#danger_msg_getConfermaDocumentiAnomali').text(error);
					$('#div_error_alert_getConfermaDocumentiAnomali').show();
				}
								
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg_getConfermaDocumentiAnomali').text(error);
				$('#div_error_alert_getConfermaDocumentiAnomali').show();				
			}
		});
//	setTimeout(waitingDialog.hide(),4000);
}

function initViewValues(){
	$('#scatolaIdSanabili').val(scatolaIdSanabili);
	$('#scatolaIdNonSanabili').val(scatolaIdNonSanabili);
	$('#codiceScatolaSanabili').text(codiceScatolaSanabili);
	$('#codiceScatolaNonSanabili').text(codiceScatolaNonSanabili);
	$('#documentiScatolaSanabili').text(documentiScatolaSanabili);
	$('#documentiScatolaNonSanabili').text(documentiScatolaNonSanabili);
	$('#picking').val('');
	activeBtnChiudiECrea();
}

function activeBtnChiudiECrea(){
	if(documentiScatolaSanabili > 0){
		$("#btnChiudiECreaSanabili").attr("disabled", false);
	}else{
		console.log("-->ELSE");
		$("#btnChiudiECreaSanabili").attr("disabled", true);
	}
	if(documentiScatolaNonSanabili > 0){
		$("#btnChiudiECreaNonSanabili").attr("disabled", false);
	}else{
		$("#btnChiudiECreaNonSanabili").attr("disabled", true);
	}
	

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

function confermaRecupero(picking){
	console.log('confermaRecupero start');
	var url = contextPath + '/'+'gestione'  + '/confermazioneRecuperoDocumentiAnomali';
	console.log('confermaRecupero : '+url);
	
	var centroDematId=$('[name="centrodemat"]').val();
	var pickingTrim = picking;
	
	var requestDocumentiAnomali={"data":{"centroDematId":centroDematId,"codicePicking":pickingTrim }}
	$('#conferma').hide();
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDocumentiAnomali),
			success : function(result) {
				
				
				if(result.status){
					
					if(result.data == 1 ){
					var msg = "Conferma della scatola associata a " + pickingTrim + " avvenuta con successo.";
					$('#div_success_alert_modal').show();
					$('#success_msg_modal').text(msg);
					aggiornaDatiVideata();
					}else{
						var msg = "Non ci sono scatole associate a " + pickingTrim + ".";
						$('#danger_msg_modal').text(msg);
						$('#div_error_alert_modal').show(1000);
					}
				}else{
					var msg = "Non ci sono scatole associate a " + pickingTrim + ".";
					$('#danger_msg_modal').text(result.message);
					$('#div_error_alert_modal').show(1000);
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
	
}
function chiudiECreaSanabili(){
	console.log('chiudiECreaSanabili start');
	var url = contextPath + '/'+'gestione'  + '/chiudiECreaNuovaScatolaAnomalieSanabili';
	console.log('chiudiECreaSanabili : '+url);
	var scatolaId=$('#scatolaIdSanabili').val();
    var operatoreId=$('#operatoreId').val();
    var postazioneId=$('[name="postazione"]').val();
    var centroDematId=$('[name="centrodemat"]').val();
	var requestDocumentiAnomali={"data":{"scatolaId":scatolaId,"operatoreId":operatoreId,"postazioneId":postazioneId,"centroDematId":centroDematId }}
	$('#conferma').hide();
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDocumentiAnomali),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				
				if (result.status) {
					if (result.data != null) {
						aggiornaDatiVideata();
						var msg = "Conferma della scatola anomalie sanabili creata con successo.";
						$('#div_success_alert_modal').show();
						$('#success_msg_modal').text(msg);
					} else {
						$('#danger_msg_modal').text(result.message);
						$('#div_error_alert_modal').show();
					}
				} else {
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
}
function chiudiECreaNonSanabili(){
	console.log('chiudiECreaNonSanabili start');
	var url = contextPath + '/'+'gestione'  + '/chiudiECreaNuovaScatolaAnomalieNonSanabili';
	console.log('chiudiECreaNonSanabili : '+url);
	var scatolaId=$('#scatolaIdNonSanabili').val();
    var operatoreId=$('#operatoreId').val();
    var postazioneId=$('[name="postazione"]').val();
    var centroDematId=$('[name="centrodemat"]').val();
	var requestDocumentiAnomali={"data":{"scatolaId":scatolaId,"operatoreId":operatoreId,"postazioneId":postazioneId,"centroDematId":centroDematId }}
	
	$('#conferma').hide();
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDocumentiAnomali),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				
				if (result.status) {
					if (result.data != null) {
						aggiornaDatiVideata();
						var msg = "Conferma della scatola anomalie non sanabili creata con successo.";
						$('#div_success_alert_modal').show();
						$('#success_msg_modal').text(msg);
					} else {
						$('#danger_msg_modal').text(result.message);
						$('#div_error_alert_modal').show();
					}
				} else {
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
	
}

function resetMsg() {
	$('#conferma').show();
	$('#div_success_alert').hide();
	$('#div_success_alert_modal').hide();
	$('#success_msg').text("");
	$('#div_error_alert').hide();
	$('#danger_msg').text("");
}


function removeSpaces(string) {
	var retString = string.split(' ').join('');
	var picking = $('#picking').val();
	
	if(picking.length < 1){
		$("#confermaRecupero").attr("disabled", true);
	 }else{
		 $("#confermaRecupero").attr("disabled", false);
	 }
	 return retString;
	}
