$(document).ready(function () {
//	waitingDialog.show('Ricerca in corso...');
	caricaTabella();
	
	function getCentroDemat(){
		var centroDemat;
		$("#centroDemat").val()==null ? centroDemat=$('input[name="centrodemat"]').val() : centroDemat=$("#centroDemat").val();
		return centroDemat;
	}
	
$('#ricaricaTabella').click(function () {
	caricaTabella();
});
	
function caricaTabella(){
		
		$(".bootstrap-table").show(500);	
		$("#tableDispacci").show(500);	
		
		
		var idCentroDemat = getCentroDemat();
		var request = {"data": { "idCentroDemat":  idCentroDemat }} ;

		var url = contextPath + '/dispacci/getLstDispSospInAttDiTRK';
		
		$.ajax({
			type: 'POST',
            url: url,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(request),
			success : function(result) {
//				console.log("success!" );
				if(result.status){
					
					var checkDataEmpty = result.data;
					if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
						alert("Nessun Dispaccio trovato!");
						return ;
					}
					
					var jsonData_temp = result.data.jsonDataTable;
					var jsonData = JSON.parse(jsonData_temp);
					
					waitingDialog.show('Ricerca in corso...');
//			    	setTimeout(function () {
//			    		$("#tableDispacci").show(1000);
//			    		$('#tableDispacci').bootstrapTable('selectPage', 1);
//			    		$('#tableDispacci').bootstrapTable( {
//			    			data: result.data.jsonDataTable
			    		$("#tableDispacci").bootstrapTable( 'load' , jsonData );
//			    		});	
			    	  waitingDialog.hide();
//			    	}, 1200);
						
				}else{
					alert("Errore richiesta!");
				}
				
			},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
			}
		});
		
//		$('#tableDispacci').bootstrapTable('refresh', {
//			url: url+"?"
//		});	
		
	}
	
	
	$("#reset").click(function () {
		resetTableAndInput();	    
	 });
	

	
	
//	$('#tableDispacci').on( 'click', 'tbody tr', function (event) {
//		var codiceScatolaSelected = $(this).find('td:nth-child(2)').text();
//		alert(codiceScatolaSelected);
//	});
	
//	 waitingDialog.hide();
	
	$("#esportaCSV").click(function() {
		console.log('esportaCSV'); 
		$(".bootstrap-table").show(500);	
		$("#tableDispacci").show(500);	
		
		
		var idCentroDemat = getCentroDemat();
		var request = {"data": { "idCentroDemat":  idCentroDemat }} ;

		var url = contextPath + '/dispacci/getLstDispSospInAttDiTRK';
		
		$.ajax({
			type: 'POST',
            url: url,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(request),
			success : function(result) {
//				console.log("success!" );
				if(result.status){
					csv = '"'+'ID'+'"'+' ;'+'"'+'CODICE_DISPACCIO'+'"'+' ;'+'"'+ 'DATA_REGISTRAZIONE'+'"'+';'+'"'+ 'NOME_POSTAZIONE'+'"'+';'+'"'+ 'NOME_OPERATORE'+'"';
					var checkDataEmpty = result.data;
					
					if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
						alert("Nessun Dispaccio trovato!");
						return ;
					}
					
					var jsonData_temp = result.data.jsonDataTable;
					var jsonData = JSON.parse(jsonData_temp);
					console.log(jsonData);
					console.log("sono prima del for");
					
					
					for(i=0; i< jsonData.rows.length; i++){
						row =  jsonData.rows[i];
						console.log("sono dentro al for");
						console.log(row);
						
						csvrow ='"' + row["ID"] + '"' + ' ;' +
		    		    '"' + row["CODICE_DISPACCIO"] + '"'+ ' ;'+ '"'  + row["DATA_REGISTRAZIONE"] + '"' + ' ;'+ '"' + row["NOME_POSTAZIONE"] + '"' + ' ;' +
		    		    '"' + row["NOME_OPERATORE"] + '"';
						console.log(csvrow)
			    		
			    		csv = csv + '\n' + csvrow;
			    		
			    		console.log(csv)
		
						}
					var downloadLink = document.createElement("a");
			        downloadLink.href = "data:text/csv," + encodeURIComponent(csv);
			        downloadLink.download = "data.csv";

			        document.body.appendChild(downloadLink);
			        downloadLink.click();
			        document.body.removeChild(downloadLink)
					waitingDialog.show('Ricerca in corso...');
//			    	setTimeout(function () {
//			    		$("#tableDispacci").show(1000);
//			    		$('#tableDispacci').bootstrapTable('selectPage', 1);
//			    		$('#tableDispacci').bootstrapTable( {
//			    			data: result.data.jsonDataTable
			    		$("#tableDispacci").bootstrapTable( 'load' , jsonData );
//			    		});	
			    	  waitingDialog.hide();
//			    	}, 1200);
						
				}else{
					alert("Errore richiesta!");
				}
				
			},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
			}
		});
		
	
	});
	
	
	
	
});


function resetTableAndInput() {
	$(".bootstrap-table").hide(500);	
//	$("#tableDispacci").hide(500);	
	$("#tableDispacci").bootstrapTable();	
    $('input:checkbox').prop("checked", false);
    $('input:text').val('');
    $("#selectTipoData").val("1");
    
 }

function rimuoviRow(_this, dispaccioID, codiceDispaccio){
	
	$('#success_msg_modal').text('');
	$('#div_success_alert_modal').hide();
	$('#error_msg_modal').text('');
	$('#div_error_alert_modal').hide();
	$('#conferma').show();
	
	var index = $(_this).parents("tr").attr("data-index");
	
	$("#codiceDispaccio").text(codiceDispaccio);
	
	$("#configurazioneAnagraficaCliModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneAnagraficaCliModal").modal('show');

	var func_cancellaDispaccioConferma = 'cancellaDispaccioConferma(' + index + ',' + dispaccioID + ',' + codiceDispaccio +');';
	var esito = $("#conferma").attr("onclick", func_cancellaDispaccioConferma);
	
}


function cancellaDispaccioConferma( indexTR , id , codice){

	var operatoreId = $('input[name="operatoreId"]').val(); 
	var request = {"data": { "dispaccioId":  id , "codiceDispaccio":  codice, "operatoreId": operatoreId }} ;
	var url = contextPath + '/dispacci/eliminaDispaccioSospeso';
	
	$('#conferma').hide();
	$.ajax({
	type: 'POST',
  url: url,
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify(request),
	success : function(result) {
		if(result.status){
			
			$('#success_msg_modal').text(result.message);
			$('#div_success_alert_modal').show();
			
			
			$("#tableDispacci tr[data-index=" + indexTR + "]").css( "color", "red" );
			$("#tableDispacci tr[data-index=" + indexTR + "]").find('td:nth-child(6)').text("cancellato");
			
		}else{
			$('#danger_msg_modal').text(result.message);
			$('#div_error_alert_modal').show();
		}
		
	},
	error : function(xhr, status, error, result) {
		waitingDialog.hide();
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





