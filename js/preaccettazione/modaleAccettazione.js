var SUFFIX_MSG = '';
var username = $('input[name="user"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
var idPostazione = $('input[name="postazione"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime



function checkCodiceDispaccio(codiceDispaccio){
	console.log('checkCodiceDispaccio start');
	var url = contextPath + '/' + 'dispacci' + '/checkCodiceDispaccio';  
	showErrorMessage(false,'',SUFFIX_MSG);
	showSuccessMessage(false,'',SUFFIX_MSG);
	console.log('codiceDispaccio: ', codiceDispaccio);
	var checkCode = checkCodice(codiceDispaccio);
	if (!checkCode.status) {
		showErrorMessage(true,checkCode.description,SUFFIX_MSG);
	} else {
		var requestPreadv = {"data": {"codiceDispaccio": codiceDispaccio}};
		$.ajax({
			type: 'POST',
			url: url,
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(requestPreadv),
			success: function (result) {
				if (result.status) {  
					console.log(result.data);
					console.log(result.data.dispaccioInfoSospesoObj);
					dispaccioInfoSospesoObj = result.data.dispaccioInfoSospesoObj;

					if (dispaccioInfoSospesoObj) {
						dispaccioObj = dispaccioInfoSospesoObj.dispaccioObj;
						console.log(dispaccioObj);
						dispaccioSospesoObj = dispaccioInfoSospesoObj.dispaccioSospesoObj;
						//	alert(" stato " + dispaccioObj.statoDispaccioTypeId);

						if (dispaccioObj && dispaccioObj.codiceDispaccio) {
							if (dispaccioObj.statoDispaccioTypeId === '100') { // pronto

								$('#accettazioneModale_1').modal('toggle'); //proseguiAccettazione(codiceRaccomandata);
							}
							else {
								// $('#accettazioneModale_Message_messaggio').text(dispaccioInfoSospesoObj.message);
								//             			 $('#accettazioneModale_Message').modal('toggle');
								$("#codice-input").val('');
								$("#codice-input").focus();
								$('#danger_msg').text("Il Dispaccio " + codiceDispaccio + " risulta in uno stato non conforme (" + dispaccioObj.statoDispaccioTypeId + ")");  // 
								$('#div_error_alert').show(); //div_error_alert
							}
						}
						else {
							if (dispaccioSospesoObj && dispaccioSospesoObj.codiceDispaccio) {
								var dateI = new Date(dispaccioSospesoObj.dataInserimento);
								var dateFormatI = dateI.getDate()+"/"+(dateI.getMonth()+1)+"/"+dateI.getFullYear();
								$('#codiceDispaccio').text(dispaccioSospesoObj.codiceDispaccio);
								$('#dataInserimento').text(dateFormatI);
								$('#operatore').text(dispaccioSospesoObj.username);
								$('#postazione').text(dispaccioSospesoObj.postazioneId);
								$('#accettazioneModale_Sospesi').modal('toggle');
								$("#codice-input").val('');
								$("#codice-input").focus();
								//div_error_alert
								// alert("dispaccio sospeso " + dispaccioSospesoObj.codiceDispaccio);
							}
							else {
								$('#accettazioneModale_NOPREADV').modal('toggle');
//								$("#codice-input").val('');
//								$("#codice-input").focus();
							}
						}
					}
				} else {
					//	loadCasellari();
					$("#codice-input").val('');
					$("#codice-input").focus();
					showSuccessMessage(false,'',SUFFIX_MSG);
					showErrorMessage(true,'Errore! ' + result.message,SUFFIX_MSG);
				}
			},
			error: function (xhr, status, error, result) {
				$("#codice-input").val('');
				$("#codice-input").focus();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,error,SUFFIX_MSG);
			}
		});
	}
}


function preAccettazioneDispaccio(codiceDispaccio){
	console.log('proseguiAccettazione start');
	var url = contextPath + '/' + 'dispacci' + '/preaccettazione_dispaccio';  

	console.log('codiceDispaccio: ', codiceDispaccio);

	var checkCode = checkCodice(codiceDispaccio);
	if (!checkCode.status) {
		showErrorMessage(true,checkCode.description,SUFFIX_MSG);
	} else {
		var requestPreadv = {"data": {"codiceDispaccio": codiceDispaccio, 
			"operatoreUsername": username,
			"postazioneId":idPostazione}};
		$.ajax({
			type: 'POST',
			url: url,
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(requestPreadv),
			success: function (result) {
				if (result.status) {
					console.log('success! ', result);
					var dati = result.data;
					console.log(" preAccettazioneDispaccio codiceIdPreadv " + dati);
					if (!dati) {
						$('#accettazioneModale_NOPREADV').modal('toggle');
					} else {
						//$('#success_msg').text("Dispaccio " + codiceDispaccio + " preaccettato con successo");  // danger_msg
						//	$('#div_success_alert').show(); //div_error_alert
						showSuccessMessage(true,"Dispaccio " + codiceDispaccio + " preaccettato con successo",SUFFIX_MSG);
						//alert("Dispaccio " + codiceDispaccio + " preaccettato con successo");

					}
				} else {
					showSuccessMessage(false,'',SUFFIX_MSG);
					showErrorMessage(true,'Errore! ' + result.message,SUFFIX_MSG);
				}

			},
			error: function (xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,error,SUFFIX_MSG);
			}
		});
	}
}




$("#proseguiAccettazione").click(function () {
	var codiceDispaccio = $('#codice-input').val();
	// proseguiAccettazione(codiceDispaccio);  
	checkCodiceDispaccio(codiceDispaccio); 
});


$("#proseguiPreaccettazione").click(function () {

	var codiceDispaccio = $('#codice-input').val();
	// proseguiAccettazione(codiceDispaccio);
	$('#accettazioneModale_1').modal('hide');
	preAccettazioneDispaccio(codiceDispaccio);
	$("#codice-input").val('');
	$("#codice-input").focus();

});



$("#proseguiSospensione").click(function () {
	console.log('proseguiSospensione start');
	var url = contextPath + '/' + 'dispacci' + '/sospensioneDispaccio'; //per la rest
	var codiceDispaccio = $('#codice-input').val();
	var username = $('input[name="user"]').val(); 
	var idPostazione = $('input[name="postazione"]').val();
	var requestSospensione = {"data": {"codiceDispaccio": codiceDispaccio, "operatoreUsername": username, "postazioneId":idPostazione}};
	$.ajax({
		type: 'POST',
		url: url,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(requestSospensione),
		success: function (result) {
			console.log('success! ', result);
			//   showErrorMessage(false,'',SUFFIX_MSG);
			$('#codice-input').val('');
			if (result.status) {
				showSuccessMessage(true,'Dispaccio:'+ codiceDispaccio +' inserito in Sospesi. ')
				// trackingError(result);
			} else {
				showSuccessMessage(false,'',SUFFIX_MSG);
				showErrorMessage(true,'Errore! ' + result.message,SUFFIX_MSG);
			}
			$("#codice-input").val('');
			$("#codice-input").focus();
		},
		error: function (xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,error,SUFFIX_MSG);
			$("#codice-input").val('');
			$("#codice-input").focus();
		}
	});

	$('#accettazioneModale_NOPREADV').modal('hide');

});


function checkCodice(codice_dispaccio) {
	var checkResponse = new Object();
	checkResponse.status = true;
	checkResponse.description = '';

	if (codice_dispaccio == '') {
		checkResponse.status = false;
		checkResponse.description = 'Il campo non può essere vuoto';
	} else if (!$.isNumeric(codice_dispaccio)) {
		checkResponse.status = false;
		checkResponse.description = 'Il codice dispaccio deve essere numerico';
	} else if (codice_dispaccio.toString().length < 12) {
		checkResponse.status = false;
		checkResponse.description ='Il codice dispaccio deve essere di 12 cifre';
	}
	return checkResponse;
}

/*
function trackingError(result) {
    console.log('trackingError');
    var url = contextPath + '/' + 'tracking' + '/trackingError';
    var request = {"data": result.data};
    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(request),
        success: function (result) {
            console.log('success! ', result);
        },
        error: function (xhr, status, error, result) {
            console.log('errore!');
            console.log('xhr ', xhr);
            console.log('status ', status);
            console.log('error ', error);
            console.log('result ', result);
            showErrorMessage(true,error,SUFFIX_MSG);
        }
    });

}*/


