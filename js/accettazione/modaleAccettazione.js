var SUFFIX_MSG = '';
var username = $('input[name="user"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
var idPostazione = $('input[name="postazione"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime



function checkNOPreadvising(codiceRaccomandata){
	console.log('checkNOPreadvising start');
	var url = contextPath + '/' + 'accettazione' + '/checkNOPreadvising';  
	showErrorMessage(false,'',SUFFIX_MSG);
	showSuccessMessage(false,'',SUFFIX_MSG);
	console.log('codiceRaccomandata: ', codiceRaccomandata);
	var checkRaccomandata = checkCodiceRaccomandata(codiceRaccomandata);
	if (!checkRaccomandata.status) {
		showErrorMessage(true,checkRaccomandata.description,SUFFIX_MSG);
	} else {
		var requestPreadv = {"data": {"codiceRaccomandata": codiceRaccomandata}};
		$.ajax({
			type: 'POST',
			url: url,
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(requestPreadv),
			success: function (result) {
				if (result.status) {                    
					proseguiAccettazione(codiceRaccomandata);                    
				} else {
					loadCasellari();
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

function proseguiAccettazione(codiceRaccomandata){
	console.log('proseguiAccettazione start');
	var url = contextPath + '/' + 'accettazione' + '/checkRangeRaccomandata';  
	showErrorMessage(false,'',SUFFIX_MSG);
	showSuccessMessage(false,'',SUFFIX_MSG);
	console.log('codiceRaccomandata: ', codiceRaccomandata);
	var checkRaccomandata = checkCodiceRaccomandata(codiceRaccomandata);
	if (!checkRaccomandata.status) {
		showErrorMessage(true,checkRaccomandata.description,SUFFIX_MSG);
	} else {
		var requestPreadv = {"data": {"codiceRaccomandata": codiceRaccomandata}};
		$.ajax({
			type: 'POST',
			url: url,
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(requestPreadv),
			success: function (result) {
				if (result.status) {                    
					acettazioneMaterialita(codiceRaccomandata);                    
				} else {
					loadCasellari();
//					showSuccessMessage(false,'',SUFFIX_MSG);
//					showErrorMessage(true,'Errore! ' + result.message,SUFFIX_MSG);
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


function acettazioneMaterialita(codiceRaccomandata){
	console.log('proseguiAccettazione start');
	var url = contextPath + '/' + 'accettazione' + '/accettazione_materialita';  

	console.log('codiceRaccomandata: ', codiceRaccomandata);
	var checkRaccomandata = checkCodiceRaccomandata(codiceRaccomandata);
	if (!checkRaccomandata.status) {
		showErrorMessage(true,checkRaccomandata.description,SUFFIX_MSG);
	} else {
		var requestPreadv = {"data": {"codiceRaccomandata": codiceRaccomandata}};
		$.ajax({
			type: 'POST',
			url: url,
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(requestPreadv),
			success: function (result) {
				if (result.status) {
					console.log('success! ', result);
					var codiceIdPreadv = result.data;
					if (!codiceIdPreadv) {
						$('#accettazioneModale_NOPREADV').modal('toggle');
					} else {
						//Controllo dell' anagrafica operatori					
						checkCentroDemat_Operatore(codiceRaccomandata, username, codiceIdPreadv);
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
	var codiceRaccomandata = $('#codice-raccomandata-input').val();
	checkNOPreadvising(codiceRaccomandata);    

	$('#accettazioneModale_1').modal('toggle');

});

$("#proseguiAccettazioneNOPREADV").click(function () {
	console.log('proseguiAccettazioneNOPREADV start');
	var url = contextPath + '/' + 'accettazione' + '/noPreAdvising';
	var codiceRaccomandata = $('#codice-raccomandata-input').val();
	var username = $('input[name="user"]').val(); 
	var idPostazione = $('input[name="postazione"]').val();
	var requestPreadv = {"data": {"codiceRaccomandata": codiceRaccomandata, "username": username, "idPostazione":idPostazione}};
	$.ajax({
		type: 'POST',
		url: url,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(requestPreadv),
		success: function (result) {
			console.log('success! ', result);
			showErrorMessage(false,'',SUFFIX_MSG);
			$('#codice-raccomandata-input').val('');
			if (result.status) {
				showSuccessMessage(true,'Inserito in Sospesi! ' + result.message,SUFFIX_MSG)
				trackingError(result);
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

	$('#accettazioneModale_NOPREADV').modal('toggle');

});


function checkCodiceRaccomandata(codice_raccomandata) {
	var checkResponse = new Object();
	checkResponse.status = true;
	checkResponse.description = '';
	if (codice_raccomandata == '') {
		checkResponse.status = false;
		checkResponse.description = 'Il campo non può essere vuoto';
	} else if (!$.isNumeric(codice_raccomandata)) {
		checkResponse.status = false;
		checkResponse.description = 'Il codice raccomandata deve essere numerico';
	}
	return checkResponse;
}

function checkCentroDemat_Operatore(codiceRaccomandata, username, codiceIdPreadv) {
	console.log('checkCentroDemat_Operatore start');
	var url = contextPath + '/' + 'accettazione' + '/checkCentroDemat_Operatore';
	var centroDemat = $('input[name="centrodemat"]').val(); 
	var idPostazione = $('input[name="postazione"]').val(); 

	var requestPreadv = {
			"data": {
				"codiceRaccomandata": codiceRaccomandata,
				"username": username,
				"codiceIdPreadv": codiceIdPreadv,
				"idPostazione": idPostazione,
				"centroDemat":centroDemat
			}
	};
	$.ajax({
		type: 'POST',
		url: url,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(requestPreadv),
		success: function (result) {
			console.log('success! ', result);
			if (result.data.stato === 'E502') {
				showErrorMessage(true,result.data.stato + ' - ' + 'Il centro di dematerializzazione'
						+ ' associato all\'operatore non è abilitato a gestire' + ' la lavorazione della pratica',SUFFIX_MSG);
				trackingError(result);
			} else {
				checkPraticaAlreadyExist(result);
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

}

function checkPraticaAlreadyExist(result) {
	var url = contextPath + '/' + 'accettazione' + '/checkPraticaAlreadyExist';
	console.log('checkPraticaAlreadyExist');
	var requestPreadv = {"data": result.data};

	$.ajax({
		type: 'POST',
		url: url,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(requestPreadv),
		success: function (result) {
			console.log('success! ', result);
			if(result.status){
				if (result.data.stato === 'E503') {
					$('#codice-raccomandata-input').val('');
					showErrorMessage(true,result.data.stato + ' - ' + 'Il codice raccomandata '+result.data.codiceRaccomandata+ ' è già presente nelle pratiche',SUFFIX_MSG);
					loadCasellari();
					trackingError(result);
				} else 
					if (result.data.stato === 'E504') {
						$('#codice-raccomandata-input').val('');
						showErrorMessage(true,result.data.stato + ' - ' + 'Il codice raccomandata '+result.data.codiceRaccomandata+ ' è già presente nel casellario '+result.data.nomeCasellario,SUFFIX_MSG);
						loadCasellari(result.data.identificativoCasellario,true);
						trackingError(result);
					}else 
						if (result.data.stato === 'E505') { 
							showErrorMessage(true,result.data.stato + ' - ' + "Il casellario "+result.data.nomeCasellario +" per la raccomandata "+result.data.codiceRaccomandata+ " si trova in Normalizzazione da parte dell'utente "+result.data.username ,SUFFIX_MSG);
							loadCasellari();
							trackingError(result);
						}
						else  {
							insertPratica(result);
						}
			}else{
				showErrorMessage(true,result.message,SUFFIX_MSG);
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


function insertPratica(result) {
	console.log('insertIntoPratica');
	var url = contextPath + '/' + 'accettazione' + '/insertPratica';
	result.data.idPostazione = idPostazione;
	var requestPreadv = {"data": result.data};
	$.ajax({
		type: 'POST',
		url: url,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(requestPreadv),
		success: function (result) {
			console.log('success! ', result);
			if (result.data.stato === 'A010') {
				trackingError(result);
				insertCasellario(result);
			} else {
				showErrorMessage(true,result.data.stato,SUFFIX_MSG);
				trackingError(result);
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



function insertCasellario(result) {
	console.log('insertCasellario');
	var url = contextPath + '/' + 'accettazione' + '/insertCasellario';
	result.data.idPostazione = idPostazione;
	var requestPreadv = {"data": result.data};
	console.log('insertCasellario', requestPreadv);
	$.ajax({
		type: 'POST',
		url: url,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(requestPreadv),
		success: function (result) {
			console.log('success! ', result);
			if(result.status){
				if (result.data.stato === 'A011') {
					showSuccessMessage(true,'Inserimento completato! '+ result.message,SUFFIX_MSG)
					$('#codice-raccomandata-input').val('');

					trackingError(result);                
					loadCasellari(result.data.identificativoCasellario);
				} else {
					$('#codice-raccomandata-input').val('');
					showSuccessMessage(false,'',SUFFIX_MSG);
					showErrorMessage(true,result.message,SUFFIX_MSG);
				}            	
			}else{
				showErrorMessage(true,result.message,SUFFIX_MSG);
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
