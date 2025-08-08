$(document).ready(function () {	 
	
    
});


function loadDettPratica(codiceRaccomandataSelected){
	var url = contextPath + '/ricerche/pratiche/dettaglioPratica';

	$.ajax({
		type: 'POST',
	        url: url,	    
        dataType: 'json',
        data: { "codiceRaccomandata": codiceRaccomandataSelected},
		success : function(result) {	    			
			console.log('success! ', result.data);		
            if (result.status){
            	 $('#dettaglioPraticaModal').modal('show');
            	 
            	 var objRacc = result.data.lstPratica[0];
            	 $("#codiceRaccomandataDett").text(objRacc.codiceRaccomandata);
            	 $("#statoDett").text(objRacc.stato);
            	 $("#dataAccettazioneDett").text(objRacc.dataAccettazioneAsString);
            	 $("#idPADett").text(objRacc.identificativoPa);
            	 $("#tipIstanzaDett").text(objRacc.codiceTipoIstanza);
            	 $("#dataAccettazioneUPDett").text(objRacc.dataAccettazioneRaccAsString);
            	 $("#casellarioDett").text(objRacc.casellario);
            	 
            	 $('#dettaglioPraticaTrk').bootstrapTable({
                     data: result.data.listPacchettoTrkLst
                 });
                 $('#dettaglioPraticaTrk').bootstrapTable('load', result.data.listPraticaTrkLst);
			}else{
				showErrorMessage(true,result.message);
            }
		},
		error : function(xhr, status, error, result) {
			waitingDialog.hide();
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,error);
		}
	});
}

