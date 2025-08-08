$(document).ready(function() {

	// $("#azione").click(function(e) {
	// aggiungiRange();
	// });
	showLblWarning("",false);
	showLoader(false,"");
	$("form").on('submit', function(e) {
		e.preventDefault();
	});
	$("#formRangeRacc").submit(function() {
		aggiungiRange();
	});

	
});




function validateRange(codiceRaccDA, codiceRaccA) {
	var result = true;
	
	if (parseInt(codiceRaccDA) >= parseInt(codiceRaccA)) {
		var msg = "Il CodiceRaccDA deve essere inferiore a CodiceRaccA";
		showLblWarning(msg,true);
		return false;
	}
	
	for (var i = 0; i < lstRange.length; i++) {
		var itemCodiceRaccDA = lstRange[i].codiceRaccDA;
		var itemCodiceRaccA = lstRange[i].codiceRaccA;

		if(((itemCodiceRaccDA > codiceRaccDA) && (itemCodiceRaccDA < codiceRaccA) && (itemCodiceRaccA > codiceRaccA)) ||
		(itemCodiceRaccDA < codiceRaccDA) && (itemCodiceRaccA > codiceRaccDA) && (itemCodiceRaccA < codiceRaccA)){
			showLblWarning("ATTENZIONE! Range sovrapposto",true);
			return false;
		}

		console.log("validateRange:->" + itemCodiceRaccDA + "-"	+ itemCodiceRaccA);

	}
	
	return result;
}

function showLblWarning(message, show) {
	$('#lblWarning').text(message);
	$('#lblWarning').attr("style", ((show) ? "display:''" : "display:none"));
}

function showLoader(show, message) {
	$("#load").text(message);
	$("#load").attr("style", ((show) ? "display:''" : "display:none"));
}

function aggiungiRange() {
	showLblWarning("",false);
	showLoader(false,"");
	var tipo = $("#tipo").val();
	var codiceRaccDA = $('#codiceRaccDA').val();
	var codiceRaccA = $('#codiceRaccA').val();
	var modalAggiungiRange = $("#configurazioneRangeRaccModal");

	if (!validateRange(codiceRaccDA,codiceRaccA)) {
		return;
	}

	var url = "";
	if (tipo == "ADD") {
		url = contextPath + '/' + 'configurazione/configurazioneRangeRacc' + '/aggiungiRange';
		showLoader(true, "Inserimento in corso....");
	} else {
		url = contextPath + '/' + 'configurazione/configurazioneRangeRacc'	+ '/modificaRange';
		showLoader(true, "Modifica in corso....");
	}

	console.log('codiceRaccDA:', codiceRaccDA);
	console.log('codiceRaccA:', codiceRaccA);

	var requestAddRange = {
		"data" : {
			"idRangeRacc" : idRangeRacc,
			"codiceRaccDA" : codiceRaccDA,
			"codiceRaccA" : codiceRaccA
		}
	};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestAddRange),
		success : function(result) {
			console.log('success! ', result);
			console.log('success! ', result.data);
			if (result.status) {
				/*
				 * if (tipo=="ADD"){ alert('Aggiunto range'); } else{
				 * alert('Modificato range'); }
				 */
				showLoader(false, "");
				findConfigRange();
				modalAggiungiRange.modal('hide');
			} else {
				$('#danger_msg').text(result.message);
				$('#div_error_alert').show();
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
