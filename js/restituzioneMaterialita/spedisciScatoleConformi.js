var table=null;
var JSNO_REQUEST_STAMPA_SDA = null;

$(document).ready(function () {
	
	getSpedizioniAjax();

//	$(".panel.panel-default").css('background',  '#eeeeee');
	$("table").css('background',  'white');
	$(".pre-scrollable").css('height',  '500px');
	
	$('#richiediStampaLDVModal').on('hide.bs.modal', function () {
		JSNO_REQUEST_STAMPA_SDA = null;
		 $('[id*="_request_ldv"]').text(" - ");
		 $('[id*="_request_ldv"]').val("");
		 $("#confermaStampaSDA").prop("disabled",false);
		 $("input[id*='request_ldv']").prop("disabled", false);
		
	})
	 
	$('#dettaglioScatoleSpedizione_modal').on('hide.bs.modal', function () {
		$("#tableDettaglioSpedizione").bootstrapTable();
	})
	
	//stampa ldv da modal
	 $("#confermaStampaSDA").click(function() {
		 
		 var  note_request_ldv =  $("#note_request_ldv").val();
		 var  contenuto =  $("#contenuto_request_ldv").val();
		 var  altezza =  $("#altezza_request_ldv").val();
		 var  peso =  $("#peso_request_ldv").val();
		 var  larghezza =  $("#larghezza_request_ldv").val();
		 var  profondita =  $("#profondita_request_ldv").val();
		 var  numRifInt =  $("#numRifInterno_request_ldv").text();
		 
		 JSNO_REQUEST_STAMPA_SDA.data.spedizioni.datiSpedizione.datiGenerali.note = note_request_ldv;
		 JSNO_REQUEST_STAMPA_SDA.data.spedizioni.datiSpedizione.sezioneColli.colli[0].altezza = altezza;
		 JSNO_REQUEST_STAMPA_SDA.data.spedizioni.datiSpedizione.sezioneColli.colli[0].peso = peso;
		 JSNO_REQUEST_STAMPA_SDA.data.spedizioni.datiSpedizione.sezioneColli.colli[0].larghezza = larghezza;
		 JSNO_REQUEST_STAMPA_SDA.data.spedizioni.datiSpedizione.sezioneColli.colli[0].profondita = profondita;

		 waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'default'});

		 stampaLDV(numRifInt);
		 
	 });
	
	
	 $("#AssociaSpedizioni").click(function() {
		 var cboxSelected = $('#appendTables').find('input[type=checkbox]:checked');
		 if(cboxSelected.length > 0){
			 $("#scatoleConformiConfermaSpedizione").modal({backdrop: 'static', keyboard: false});
		 }else{
			 alertCstm("INFO","Nessuna scatola selezionata");
		 }
	 });
	 
	$('#scatoleConformiConfermaSpedizione').on('hidden.bs.modal', function () {

		$('div[id*=_modal]').text('');
		$('div[id*=_modal]').hide();	
		$('#confermaAssociaESpedisci').prop('disabled', false);
	    //TODO
	})
			
    $("#confermaAssociaESpedisci").click(function() {
    	
    	$('#confermaAssociaESpedisci').prop('disabled', true);
    	
    	var centroDemat = $('input[name="centrodemat"]').val();
    	var cbox = $('#appendTables').find('input[type=checkbox]:checked');
    	var requestString =  '{"data":{"idCentroDemat" : '+centroDemat+', "scatole": []}}';
    	var request = JSON.parse(requestString);
//    	var data = [];
    	$.each( cbox, function(){
    		
    		var valueAggregato = $(this).parent().find('.AGGREGATO_ID').val();	
    		var valueScatola = $(this).parent().find('.SCATOLA_ID').val();
    				
    		var data ={"aggregatoId" : valueAggregato , "scatolaId" : valueScatola};
    		request.data.scatole.push(data);
    			
    	});
    	
    	sendScatoleConformiDaAssociareSped(JSON.stringify(request));
    });
});//end ready

function getSpedizioniAjax(){
	waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'default'});
	var url = contextPath + '/restMaterialita/getAllSpedisciScatoleConformi';
	$.ajax({
//		type: 'POST',
	        url: url,	    
//	        dataType: 'json',
//	        data:  {},
	        async: false,
		success : function(result) {
			waitingDialog.hide();
			if(result.status){
				waitingDialog.hide();
				var dataTable = result.data.dataTable;
				if( dataTable == null ||  dataTable.length <= 0){
					alertCstm("INFO","Nessuna scatola trovata");
					return ;
				}
				
				createTable(dataTable);
				$("#AssociaSpedizioni").prop('disabled', false);
				
				
			}else{
				alertCstm("WARNING","Errore richiesta dettaglio!");
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
	waitingDialog.hide();
}


function createTable (listObj){

	var  dataTable = {"rows" : []};

	for (var i = 0; i < listObj.length; i++) {
		
		var centroDematID = $('input[name="centrodemat"]').val()
		var aggregatoID = listObj[i].AGGREGATO_ID;
		
//		(spedizioneID, centroDematID, aggregatoID)
	    var numScatAssociate = listObj[i].TOT_SCATOLE_ASSOCIATE;
		var spedizioneID = listObj[i].SPEDIZIONE_ID;
		var divIdSped= '<div id="table_spedizione_id'+spedizioneID+'" >'+spedizioneID+'</div>';
		var buttonStampaLDV = '<button class="glyphicon glyphicon-print" title="Stampa lettera di vettura" onclick="showdetailRequestPrintLDV('+spedizioneID + ',' + centroDematID + ',' + aggregatoID + ');"></button>';
		
		var dettaglioScatola = '<button type="button" class="btn btn-link" onclick="showDettaglioSpedizione('+spedizioneID+');" title="clicca per vedere il dettaglio">' + numScatAssociate + '</button>';
		
		dataTable.rows.push({
//			 "ID_SPEDIZIONE": listObj[i].SPEDIZIONE_ID,
			"ID_SPEDIZIONE": divIdSped,
			"AGGREGATO":aggregatoID,
			 "DATA_CREAZIONE": listObj[i].DATA_CREAZIONE,
			 "STATO_SPEDIZIONE": listObj[i].STATO_SPEDIZIONE,
			 "NUMERO_SCATOLE": dettaglioScatola,
			 "TIPO_PRODOTTO": listObj[i].TIPO_PRODOTTO,
			 "SPEDISCI": buttonStampaLDV
		})
	
	}
	
	$("#tableSpedizioni").bootstrapTable('load', { data: dataTable.rows});
}

//ok
function showDettaglioSpedizione(spedizione_id){
	
	waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'default'});
	var url = contextPath + '/' + 'restMaterialita/getDettaglioSpedizione?spedizioneID='+spedizione_id;
	
	$.ajax({
		type: 'GET',
	        url: url,	    
	        dataType: 'json',
	        contentType : 'application/json',
		success : function(result) {
			waitingDialog.hide();
			if(result.status){
				
				var dataTable = result.data.dataTable;
				if( dataTable == null ||  dataTable.length <= 0){
					alertCstm("INFO","Nessuna scatola trovata");
					return ;
				}
				
				
				$("#dettaglioScatoleSpedizione_modal").modal({backdrop: 'static', keyboard: false});
				$("#tableDettaglioSpedizione").bootstrapTable('load',{ data: dataTable});
				
			}else{
				alertCstm("WARNING","Errore richiesta dettaglio!");
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
	waitingDialog.hide();
}

function showdetailRequestPrintLDV(spedizioneID, centroDematID, aggregatoID){
	
	$("#richiediStampaLDVModal").modal({backdrop: 'static', keyboard: false});
	$("#idSpedizioneDetailModal").val(spedizioneID);
	getDettaglioRequestStampaLdvSDA(spedizioneID, centroDematID, aggregatoID);
}


function stampaLDV(numRifInt){

	$("#confermaStampaSDA").prop("disabled",true);
	
	var url = contextPath + '/' + 'restMaterialita' + '/stampaLdvSDA';
	var requestSpedizione = JSNO_REQUEST_STAMPA_SDA;
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestSpedizione),
			async: false,
			success : function(result) {
				waitingDialog.hide();
				console.log('success! ', result);				
				if(result.status){
					var b64 = result.data;
					var a = document.createElement('a');
					var pdfAsDataUri = "data:application/pdf;base64," + b64;
					a.download = "numRifInt_"+numRifInt;
					a.type = 'application/pdf';
					a.href = pdfAsDataUri;
					a.click();
					
					$("input[id*='request_ldv']").prop("disabled", true);
					var tdDiv = $("table[id=tableSpedizioni]").find("div[id=table_spedizione_id"+numRifInt+"]");
					var tr = tdDiv.parent().parent();
					tr.find("td:nth-child(6)").text("LDV stamapata");
					
				}else{
					alertCstm("ATTENZIONE. Errore Richiesta Stampa LDV.", result.message);
				}
			},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				alertCstm("WARNING","La richiesta d ha generato il seguente errore: " + result.message);
			}
		});
		waitingDialog.hide();
}



function alertCstm(title, msg){
	BootstrapDialog.show({
			type: BootstrapDialog.TYPE_DANGER,
		    size: BootstrapDialog.SIZE_NORMAL ,
            title: title,
            message: msg,
            buttons: [{
                label: 'OK',
                cssClass: 'btn-primary',
                action: function(dialog){
                    dialog.close();
                }
            }]
        });
}

//ok
function getDettaglioRequestStampaLdvSDA(spedizioneID, centroDematID, aggregatoID){
	
	waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'default'});
	var request = {"data": {"aggregatoID":aggregatoID, "centroDematID": centroDematID, "spedizioneID": spedizioneID}} ;
	var url = contextPath + '/restMaterialita/getDettaglioRichiestaStampaLdvSDA';
	
	$.ajax({
		type: 'POST',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
        url: url,	    
		async: false,
        success : function(result) {
			
			if(result.status){
				waitingDialog.hide();
				//valorizza modal
				JSNO_REQUEST_STAMPA_SDA = result;
				
				var mittente = result.data.spedizioni.mittente;
				var destinatario = result.data.spedizioni.destinatario;
				var datiSpedizione = result.data.spedizioni.datiSpedizione;
				var collo = result.data.spedizioni.datiSpedizione.sezioneColli;

				var nonTrovato = ' - ';
				
				mittente.intestatario == 'undefined' || mittente.intestatario == null || mittente.intestatario == '' ? $('#mittente_intestatario_request_ldv').html(nonTrovato):$('#mittente_intestatario_request_ldv').html(mittente.intestatario);
				mittente.indirizzo == 'undefined' || mittente.indirizzo == null || mittente.indirizzo == '' ?  $('#mittente_indirizzo_request_ldv').html(nonTrovato):$('#mittente_indirizzo_request_ldv').html(mittente.indirizzo);
				mittente.cap == 'undefined' || mittente.cap == null || mittente.cap == '' ?  $('#mittente_cap_request_ldv').html(nonTrovato):$('#mittente_cap_request_ldv').html(mittente.cap);
				mittente.localita == 'undefined' || mittente.localita == null || mittente.localita == ''?  $('#mittente_localita_request_ldv').html(nonTrovato):$('#mittente_localita_request_ldv').html(mittente.localita);
				mittente.provincia == 'undefined' || mittente.provincia == null || mittente.provincia == ''?  $('#mittente_provincia_request_ldv').html(nonTrovato):$('#mittente_provincia_request_ldv').html(mittente.provincia);
				mittente.telefono == 'undefined' || mittente.telefono == null || mittente.telefono == ''?  $('#mittente_telefono_request_ldv').html(nonTrovato):$('#mittente_telefono_request_ldv').html(mittente.telefono);
				mittente.email == 'undefined' || mittente.email == null || mittente.email == ''?  $('#mittente_email_request_ldv').html(nonTrovato):$('#mittente_email_request_ldv').html(mittente.email);
				mittente.identificativoFiscale == 'undefined' || mittente.identificativoFiscale == null || mittente.identificativoFiscale == ''?  $('#mittente_identificativo_fiscale_request_ldv').html(nonTrovato):$('#mittente_identificativo_fiscale_request_ldv');
				mittente.codNazione == 'undefined' || mittente.codNazione == null || mittente.codNazione == ''?  $('#mittente_codice_nazione_request_ldv').html(nonTrovato):$('#mittente_codice_nazione_request_ldv').html(mittente.codNazione);
				mittente.referente == 'undefined' || mittente.referente == null || mittente.referente == ''?  $('#mittente_referente_request_ldv').html(nonTrovato):$('#mittente_referente_request_ldv').html(mittente.referente);
				mittente.tipoAnagrafica == 'undefined' || mittente.tipoAnagrafica == null || mittente.tipoAnagrafica == ''?  $('#mittente_tipoanagrafica_request_ldv').html(nonTrovato):$('#mittente_tipoanagrafica_request_ldv').html(mittente.tipoAnagrafica);

				destinatario.intestatario == 'undefined' || destinatario.intestatario == null || destinatario.intestatario == ''?  $('#destinatario_intestatario_request_ldv').html(nonTrovato):$('#destinatario_intestatario_request_ldv').html(destinatario.intestatario);
				destinatario.indirizzo == 'undefined' || destinatario.indirizzo == null || destinatario.indirizzo == ''?  $('#destinatario_indirizzo_request_ldv').html(nonTrovato):$('#destinatario_indirizzo_request_ldv').html(destinatario.indirizzo);
				destinatario.cap == 'undefined' || destinatario.cap == null || destinatario.intestatario == ''?  $('#destinatario_cap_request_ldv').html(nonTrovato):$('#destinatario_cap_request_ldv').html(destinatario.cap);
				destinatario.localita == 'undefined' || destinatario.localita == null || destinatario.localita == ''?  $('#destinatario_localita_request_ldv').html(nonTrovato):$('#destinatario_localita_request_ldv').html(destinatario.localita);
				destinatario.intestatario == 'undefined' || destinatario.provincia == null || destinatario.provincia == ''?  $('#destinatario_provincia_request_ldv').html(nonTrovato):$('#destinatario_provincia_request_ldv').html(destinatario.provincia);
				destinatario.telefono == 'undefined' || destinatario.telefono == null || destinatario.telefono == ''?  $('#destinatario_telefono_request_ldv').html(nonTrovato):$('#destinatario_telefono_request_ldv').html(destinatario.telefono);
				destinatario.email == 'undefined' || destinatario.email == null || destinatario.email == ''?  $('#destinatario_email_request_ldv').html(nonTrovato):$('#destinatario_email_request_ldv').html(destinatario.email);
				destinatario.identificativoFiscale == 'undefined' || destinatario.identificativoFiscale == null || destinatario.identificativoFiscale == ''?  $('#destinatario_identificativo_fiscale_request_ldv').html(nonTrovato):$('#destinatario_identificativo_fiscale_request_ldv');
				destinatario.codNazione == 'undefined' || destinatario.codNazione == null || destinatario.codNazione == ''?  $('#destinatario_codice_nazione_request_ldv').html(nonTrovato):$('#destinatario_codice_nazione_request_ldv').html(destinatario.codNazione);
				destinatario.referente == 'undefined' || destinatario.referente == null || destinatario.referente == ''?  $('#destinatario_referente_request_ldv').html(nonTrovato):$('#destinatario_referente_request_ldv').html(destinatario.referente);
				destinatario.tipoAnagrafica == 'undefined' || destinatario.tipoAnagrafica == null || destinatario.tipoAnagrafica == ''?  $('#destinatario_tipoanagrafica_request_ldv').html(nonTrovato):$('#destinatario_tipoanagrafica_request_ldv').html(destinatario.tipoAnagrafica);

				datiSpedizione.datiGenerali.numRifInterno == null ? ' - ':$('#numRifInterno_request_ldv').html(datiSpedizione.datiGenerali.numRifInterno);
				datiSpedizione.datiGenerali.contenuto == null ? ' - ':$('#contenuto_request_ldv').val(datiSpedizione.datiGenerali.contenuto);

				collo.colli[0].altezza == null ? ' - ':$('#altezza_request_ldv').val(collo.colli[0].altezza);
				collo.colli[0].larghezza == null ? ' - ':$('#larghezza_request_ldv').val(collo.colli[0].larghezza);
				collo.colli[0].peso == null ? ' - ':$('#peso_request_ldv').val(collo.colli[0].peso);
				collo.colli[0].profondita == null ? ' - ':$('#profondita_request_ldv').val(collo.colli[0].profondita);

				
				
				
//				$('#success_msg_modal').text(result.message);
//				$('#div_success_alert_modal').show(1000);	
//				
			}else{
//				
				alertCstm("WARNING", result.message);
			}
			
		},
		error : function(xhr, status, error, result) {
			waitingDialog.hide();
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
		}
	}); 
	waitingDialog.hide();
}

