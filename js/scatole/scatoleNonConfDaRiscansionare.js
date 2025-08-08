var table=null;
$(document).ready(function () {
	
	caricaTabella();

	if($('input[name="descprofilo"]').val()==="Supervisore"){
//		loadLstCentriDemat('centroDemat');		
	}	
	
	$('#divDataCreazDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCreazA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	

    $("#ricaricaTabella").click(function () {
    	caricaTabella();
    });
    	

	$('#ScatoleNConfDaRiscanModal').on('shown.bs.modal', function () {
   	 	
	    $(this).find('.modal-dialog').css({width:'30%',
	                               height:'auto', 
	                              'max-height':'40%'});
	});
	
	$("#esportaCSV").click(function() {
		console.log('esportaCSV'); 
		$(".bootstrap-table").show(500);	
		var centroDemat  = $('input[name="centrodemat"]').val();
		var uri = contextPath + "/scatole/getLstScatoleNConfDaRiscan.json?idCentroDemat="+centroDemat+'&sort=scatola_id&order=desc&offset=0&limit=1000';
		$.ajax({
			type: 'GET',
            url: uri,
			success : function(result) {
			console.log(result );
	
					csv = '"'+'ID Scatola'+'"'+' ;'+'"'+'DATA CREAZIONE'+'"'+' ;'+'"'+ 'TIPOLOGIA SCATOLA'+'"'+';'+'"'+ 'TOTALE ANOMALIE'+'"'+';'+'"'+ 'DATA RICEZIONE ESITO'+'"';
					var checkDataEmpty = result.rows;

					for(i = 0; i < result.rows.length; i++) {
						row = result.rows [i];
						
					
				    		csvrow ='"' + row["IDENTIFICATIVO_SCATOLA"] + '"' + ' ;' +
				    		    '"' + row["DATA_CREAZIONE"] + '"'+ ' ;'+ '"'  + row["TIPOLOGIA_SCATOLA"] + '"' + ' ;'+ '"' + row["TOTALE_ANOMALIE"] + '"' + ' ;' +
				    		    '"' + row["DATA_RICEZIONE_ESITO"] + '"';
				    		
				    		
				    		csv = csv + '\n' + csvrow;
				    		
				    		console.log(csv)
					}
					var downloadLink = document.createElement("a");
			        downloadLink.href = "data:text/csv," + encodeURIComponent(csv);
			        downloadLink.download = "data.csv";

			        document.body.appendChild(downloadLink);
			        downloadLink.click();
			        document.body.removeChild(downloadLink);
			}
		});
					
	
	});
	
});

function riscansionaScatola( idScatola, identificativoScatola ){
//	$(this).addClass('highlight').siblings().removeClass('highlight');        	
	resetMsg();
	
	$("#identificativoScatolaPrint").text(identificativoScatola);
	$("#conferma").attr("onclick", "confermaRiscansionata(" + idScatola+" , '" + identificativoScatola + "' );");
	$('#ScatoleNConfDaRiscanModal').modal('show');
}

function confermaRiscansionata(idScatola, identificativoScatola) {
	
	var url = contextPath + '/scatole/updateNconfDaRisc';
	var postazioneID  = $('input[name="postazione"]').val();
	var operatoreID  = $('input[name="operatoreId"]').val();
	var scatolaID = idScatola;
	var requestData = { "data":{ "scatolaID": scatolaID , "operatoreID": operatoreID, "postazioneID": postazioneID }}
	
		$.ajax({
		type: 'POST',
	        url: url,
	        contentType : 'application/json',
	        dataType: 'json',
	        data:  JSON.stringify(requestData),
		success : function(result) {
			
			if(result.status){
//				$('#ScatoleNConfDaRiscanModal').modal('hide');
				$('#conferma').hide(500);
				caricaTabella();
				var msg = "Riscansionamento della scatola inserito correttamente nel sistema.";
				$('#div_success_alert').show(500);
				$('#success_msg').text(msg);
			}else{
				$('#div_error_alert').show(500);
				$('#danger_msg').text(result.message);
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
//			$('#div_error_alert').show(1000);
//			$('#danger_msg').text(result.message);
		}
	}); 
}

function caricaTabella(){
	
	var centroDemat  = $('input[name="centrodemat"]').val();
	var uri = contextPath + "/scatole/getLstScatoleNConfDaRiscan.json?idCentroDemat="+centroDemat;
					
	waitingDialog.show('Ricerca in corso...');
	setTimeout(function () {
		$("#tableScatoleNConf").show(1000);
		$('#tableScatoleNConf').bootstrapTable('selectPage', 1);
		$('#tableScatoleNConf').bootstrapTable('refresh', {
			url: uri
		});	
	  waitingDialog.hide();
	});
	
	console.log("uri: " + uri);   	
	}

	function resetMsg() {
	$('#conferma').show();
	$('#div_success_alert').hide();
	$('#success_msg').text("");
	$('#div_error_alert').hide();
	$('#danger_msg').text("");
}
