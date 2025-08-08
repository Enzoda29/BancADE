$(document).ready(function() {

	$('#divDataDa').datetimepicker({
		locale: 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataA').datetimepicker({
		locale: 'it',
		format: 'DD/MM/YYYY'
	});

	getListDateGmida();
	getListLottiTerritoriali();
	getListAccountingJobs(true);
	getLastAccountingJob();
	

	$('#estrazione').click(function() {
		submitJobRequest();
	});
	$('#salva').click(function() {
		AccountingInsert();
	});

});

function getListLottiTerritoriali() {
	var CIGURL = contextPath + "/accounting/getListLotti";

	$.ajax({
		url: CIGURL,
		type: 'GET',
		async: false,
		success: function(data) {
			var lst = data.data;
			for (var i = 0; i < lst.length; i++) {
				$('#selectCIG').append($('<option/>', {
					value: lst[i].value,
					text: lst[i].descrizione
				}));
			}
		},
		error: function(xhr, status, error, result) {
			//console.log('errore!');
			//console.log('xhr ', xhr);
			//console.log('status ', status);
			//console.log('error ', error);
			//console.log('result ', result);
			$('#danger_msg').text(error);
			$('#div_error_alert').show();
			$('#div_success_alert').hide();
		}
	});

}

function getListAccountingJobs(bwait) {
	var searchUrl = contextPath + '/accounting/getListAccountingRequest';

	var pageNumber = $('#tableAccounting').bootstrapTable('getOptions').pageNumber;
	if (!pageNumber)
		pageNumber = 1

	if (bwait)
		waitingDialog.show('Caricamento in corso...');
	setTimeout(function() {
		$("#tableAccounting").show(1000);
		$('#tableAccounting').bootstrapTable('selectPage', pageNumber);
		$('#tableAccounting').bootstrapTable('refresh', {
			url: searchUrl
		});
		if (bwait)
			waitingDialog.hide();
	});

	//console.log("uri: " + searchUrl);
}

function getLastAccountingJob() {
	//alert('getLastAccountingJob()');
	var searchUrl = contextPath + '/accounting/getLastAccountingRequest';

	$.ajax({
		url: searchUrl,
		method: "GET",
		success: function(data) {
			$('#dataDa').val(data.data.inizioPeriodo);
			$('#dataA').val(data.data.finePeriodo);
/*			$('#percentCartolineNonMecc').val(data.data.percentCartolineNonMecc);
			$('#percentBusteNonMecc').val(data.data.percentBusteNonMecc);
			$('#percentNcNonMecc').val(data.data.percentNcNonMecc);
			$('#numAnomalieAde').val(data.data.numAnomalieAde);
			$('#numAnomalieAder').val(data.data.numAnomalieAder);
			$('#indPercentBusteNonMecc').val(data.data.indPercentBusteNonMecc);
			$('#indNumAnomalieAde').val(data.data.indNumAnomalieAde);
			$('#indNumAnomalieAder').val(data.data.indNumAnomalieAder);*/
			if (data.data.insIntestazioneColonne > 0)
				$('#checkHeader').attr('checked', true).change();
			else
				$('#checkHeader').attr('checked', false).change();

			var bitval = data.data.codiceLottoTerritorialeBit;
			var options = [];
			$("#selectCIG > option").each(function() {
				if ((bitval & this.value) == this.value) {
					options.push(this.value);
				}
			});
			$('#selectCIG').val(options);

			var separatore = data.data.separatoreCampo;
			$("#inputSeparatore > option").each(function() {
				if (separatore == this.text) {
					$('#inputSeparatore').val(this.value);
				}
			});

		}

	});

}

function submitJobRequest() {

	var dataDa = $('#dataDa').val();
	var dataA = $('#dataA').val();

	if (dataDa != "" && dataA == "") {
		var today = new Date();
		dataA = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
		$('#dataA').val(dataA);
		alert("La data di fine estrazione e' stata trovata vuota ed e' stata quindi impostata con quella attuale");
		$('#dataA').focus();
		return;
	}

	if (dataDa == "" || dataA == "") {
		alert("Selezionare almeno la data di inizio per l'estrazione");
		$('#dataDa').focus();
		return;
	}

	var percentCartolineNonMeccVal = $('#percentCartolineNonMecc').val();
	if (percentCartolineNonMeccVal == "") {
		alert("Il campo 'Percentuale Cartoline Non Meccanizzabili' non puo' essere vuoto");
		$('#percentCartolineNonMecc').focus();
		return;
	}
	if (parseInt(percentCartolineNonMeccVal) > 100) {
		alert("Il campo 'Percentuale Cartoline Non Meccanizzabili' e' stato valorizzato in modo non corretto (>100)");
		$('#percentCartolineNonMecc').focus();
		return;
	}

	var percentBusteNonMeccVal = $('#percentBusteNonMecc').val();
	if (percentBusteNonMeccVal == "") {
		alert("Il campo 'Percentuale Buste Non Meccanizzabili' non puo' essere vuoto");
		$('#percentBusteNonMecc').focus();
		return;
	}
	if (parseInt(percentBusteNonMeccVal) > 100) {
		alert("Il campo 'Percentuale Buste Non Meccanizzabili' e' stato valorizzato in modo non corretto (>100)");
		$('#percentBusteNonMecc').focus();
		return;
	}

	var percentNcNonMeccVal = $('#percentNcNonMecc').val();
	if (percentNcNonMeccVal == "") {
		alert("Il campo 'Percentuale NC Non Meccanizzabili' non puo' essere vuoto");
		$('#percentNcNonMecc').focus();
		return;
	}
	if (parseInt(percentNcNonMeccVal) > 100) {
		alert("Il campo 'Percentuale NC Non Meccanizzabili' e' stato valorizzato in modo non corretto (>100)");
		$('#percentNcNonMecc').focus();
		return;
	}

	var numAnomalieAdeVal = $('#numAnomalieAde').val();
	if (numAnomalieAdeVal == "") {
		alert("Il campo 'Numero Anomalie Scarti per Ade' non puo' essere vuoto");
		$('#numAnomalieAde').focus();
		return;
	}

	var numAnomalieAderVal = $('#numAnomalieAder').val();
	if (numAnomalieAderVal == "") {
		alert("Il campo 'Numero Anomalie Scarti per Ader' non puo' essere vuoto");
		$('#numAnomalieAder').focus();
		return;
	}

	var indPercentBusteNonMeccVal = $('#indPercentBusteNonMecc').val();
	if (indPercentBusteNonMeccVal == "") {
		alert("Il campo 'Percentuale Buste Non Meccanizzabili' non puo' essere vuoto");
		$('#indPercentBusteNonMecc').focus();
		return;
	}
	if (parseInt(indPercentBusteNonMeccVal) > 100) {
		alert("Il campo 'Percentuale Buste Non Meccanizzabili  (posta indescritta)' e' stato valorizzato in modo non corretto (>100)");
		$('#indPercentBusteNonMecc').focus();
		return;
	}

	var indNumAnomalieAdeVal = $('#indNumAnomalieAde').val();
	if (indNumAnomalieAdeVal == "") {
		alert("Il campo 'Numero Anomalie Scarti per Ade' non puo' essere vuoto");
		$('#indNumAnomalieAde').focus();
		return;
	}

	var indNumAnomalieAderVal = $('#indNumAnomalieAder').val();
	if (indNumAnomalieAderVal == "") {
		alert("Il campo 'Numero Anomalie Scarti per Ader' non puo' essere vuoto");
		$('#indNumAnomalieAder').focus();
		return;
	}


	var selectCIGVal = 0;
	var selectCIGNoVal = 0;
	$("#selectCIG > option").each(function() {
		if (this.selected)
			selectCIGVal += parseInt(this.value);
		else
			selectCIGNoVal++;
	});
	if (selectCIGNoVal == 0)
		selectCIGVal = -1;
	if (selectCIGVal == 0) {
		alert("Nessun elemento selezionato nella lista dei CIG");
		$('#selectCIG').focus();
		return;
	}

	var inputSeparatoreVal = $('#inputSeparatore').val();

	var insIntestazioneColonneVal = 0;
	if ($('#checkHeader').prop('checked'))
		insIntestazioneColonneVal = 1;

	var operatoreId = $('#operatoreId').val();
	var postazioneId = $('[name="postazione"]').val();
	var centroDematId = $('[name="centrodemat"]').val();

	var parameters = "?inizioPeriodo=" + dataDa +
		"&finePeriodo=" + dataA +
		"&percentCartolineNonMecc=" + percentCartolineNonMeccVal +
		"&percentBusteNonMecc=" + percentBusteNonMeccVal +
		"&percentNcNonMecc=" + percentNcNonMeccVal +
		"&numAnomalieAde=" + numAnomalieAdeVal +
		"&numAnomalieAder=" + numAnomalieAderVal +
		"&indPercentBusteNonMecc=" + indPercentBusteNonMeccVal +
		"&indNumAnomalieAde=" + indNumAnomalieAdeVal +
		"&indNumAnomalieAder=" + indNumAnomalieAderVal +
		"&codiceLottoTerritorialeBit=" + selectCIGVal +
		"&separatoreCampo=" + inputSeparatoreVal.charCodeAt(0) +
		"&insIntestazioneColonne=" + insIntestazioneColonneVal +
		"&operatoreId=" + operatoreId +
		"&postazioneId=" + postazioneId +
		"&centroDematId=" + centroDematId;

	var execurl = contextPath + "/accounting/executeAccountingJob" + parameters;

	$.ajax({
		url: execurl,
		method: "GET",
		async: true,
		beforeSend: function() {
			waitingDialog.show('Estrazione in corso...');
		},
		success: function(result) {
			waitingDialog.hide();
			$('#div_error_alert').hide();
			if (result.status) {
				msgbox = result.accResultDescr;
				$('#success_msg').text(result.accResultDescr);
				$('#div_success_alert').show();
				$('#div_error_alert').hide();
				//alert(result.accResultDescr);
				//alert("La richiesta di accounting e' terminata e alla stessa e' stata assegnato l'identificativo univoco numero " + result.accRequestId);
			} else {
				//console.log('errore nella richiesta!');
				//console.log('result ', result);
				$('#danger_msg').text(result.message);
				$('#div_error_alert').show();
				$('#div_success_alert').hide();
			}
			getListAccountingJobs(false);
			getLastAccountingJob();
		}
	});

}

function downloadAccounting(value) {
	//alert("Ready to download attachment on event id " + value);
	var url = contextPath + "/accounting/getExportFile?eventId=" + value;

	$('#danger_msg').text('');
	$('#div_error_alert').hide();

	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		contentType: 'application/json',
		dataType: 'json',
		success: function(result) {

			if (result.status) {
				var b64 = result.data;
				var a = document.createElement('a');
				var txtAsDataUri = "data:text/plain;base64," + b64;
				a.download = result.message;
				a.type = 'text/plain';
				a.href = txtAsDataUri;
				a.click();
			}
			else {
				//console.log('errore!');
				//console.log('result ', result);
				$('#danger_msg').text(result.message);
				$('#div_error_alert').show();
				$('#div_success_alert').hide();
			}
		},
		error: function(xhr, status, error, result) {
			//console.log('errore!');
			//console.log('xhr ', xhr);
			//console.log('status ', status);
			//console.log('error ', error);
			//console.log('result ', result);
			$('#danger_msg').text(error);
			$('#div_error_alert').show();
			$('#div_success_alert').hide();
		}
	});

}

function imageFormatter(value, row) {
	if (value != null) {
		return "<button onclick='javascript:downloadAccounting(" + value + ");' id='imgdl' type='submit'> <img src='../resources/template/images/download.png' /> </button>";
	}
}


function AccountingInsert() {
    var accountInsert = contextPath + "/accounting/AccountingInsert";

    // Recupero dei dati dai campi del modulo
    var dati = {
        "data": {
            percentCartolineNonMeccDescritta: $('#percentCartolineNonMecc').val(),
            percentBusteNonMeccDescritta: $('#percentBusteNonMecc').val(),
            percentNcNonMeccDescritta: $('#percentNcNonMecc').val(),
            numAnomalieAdeDescritta: $('#numAnomalieAde').val(),
            numAnomalieAderDescritta: $('#numAnomalieAder').val(),
            percentBusteNonMeccIndescritta: $('#indPercentBusteNonMecc').val(),
            numAnomalieAdeIndescritta: $('#indNumAnomalieAde').val(),
            numAnomalieAderIndescritta: $('#indNumAnomalieAder').val(),
            pickingAde: $('#pickingAde').val(),
            pickingAder: $('#pickingAder').val(),
        }
    };

    // Funzione per recuperare il testo della label
    function getLabel(fieldId) {
        // Cerca la label associata usando l'attributo "for" o un pattern
        var label = $(`label[for='${fieldId}']`).text();
        return label ? label.trim() : fieldId; // Se non trova una label, ritorna l'ID del campo
    }

    // Funzione per validare i dati
    function validateData(data) {
        // Controllo sui campi percentuali (valori tra 0 e 100)
        for (let key in data) {
            let value = data[key];
            let label = getLabel(key); // Recupera la label associata al campo
            if (key.startsWith("percent")) {
                let numericValue = parseFloat(value);
                if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
                    alert(`Il campo "${label}" deve contenere un valore numerico tra 0 e 100. Valore inserito: ${value}`);
                    return false;
                }
            }

            // Controllo sui campi numerici
            if (key.startsWith("numAnomalie") || key.startsWith("picking")) {
                let numericValue = parseInt(value);
                if (isNaN(numericValue)) {
                    alert(`Il campo "${label}" deve contenere solo valori numerici. Valore inserito: ${value}`);
                    return false;
                }
            }
        }
        return true;
    }

    // Validazione dei dati prima dell'invio
    if (!validateData(dati.data)) {
        return; // Interrompe l'esecuzione se la validazione fallisce
    }

    // Invio dati tramite AJAX
    $.ajax({
        url: accountInsert,
        type: 'POST',
        data: JSON.stringify(dati),
        contentType: 'application/json',
        success: function(response) {
            if (response.data) {
                alert("Dati inseriti con successo!" + response.message);
                //console.log("Risposta del server:", response);
            } else {
                alert("Errore durante l'inserimento:" + response.message);
            }
        },
        error: function(xhr, status, error) {
            // Gestione degli errori
            alert("Errore nell'inserimento dei dati: " + error);
            //console.error("Dettagli dell'errore:", xhr.responseText);
        }
    });
}



function getListDateGmida() {
	var descritta = contextPath + "/accounting/getListDateGmida";

	$.ajax({
		url: descritta,
		type: 'GET',
		success: function(data) {
			var result = data.date; // Estrarre l'oggetto con i valori

			// Svuota i campi <select> prima di aggiungere nuove opzioni
			$('#percentCartolineNonMecc').empty();
			$('#percentBusteNonMecc').empty();
			$('#percentNcNonMecc').empty();
			$('#numAnomalieAde').empty();
			$('#numAnomalieAder').empty();


			// Popola ciascun campo con il valore corrispondente
			if (result) {
				
				$('#percentCartolineNonMecc').val(result.percentCartolineNonMeccDescritta);
				$('#percentBusteNonMecc').val(result.percentBusteNonMeccDescritta);
				$('#percentNcNonMecc').val(result.percentNcNonMeccDescritta);
				$('#numAnomalieAde').val(result.numAnomalieAdeDescritta);
				$('#numAnomalieAder').val(result.numAnomalieAderDescritta);
				$('#indPercentBusteNonMecc').val(result.percentBusteNonMeccIndescritta);
				$('#indNumAnomalieAde').val(result.numAnomalieAdeIndescritta);
				$('#indNumAnomalieAder').val(result.numAnomalieAderIndescritta);
				$('#pickingAde').val(result.pickingAde);
				$('#pickingAder').val(result.pickingAder);

					
			}
		},
		error: function(xhr, status, error) {
			console.error("Errore durante la chiamata AJAX: " + error);
		}
	})
}

