$(document).ready( function() {
	$(".bootstrap-table").show(500);
	
	tablespedizioni() ;
	
	$('#richiediLetteraBtn').click( function() {
		var selected = $('#tableSpedizioniDDT').bootstrapTable('getSelections') ;
		var selectedIds = [] ;
		var selectedClienteId = [] ;
		var centroDemat = $('#centroDemat').val() ;
		for( var i = 0 ; i < selected.length ; i++ ) {
			selectedIds.push(selected[i].SPEDIZIONE_ID) ;
			selectedClienteId.push(selected[i].CLIENTE_IND_REST_ID) ;
		}
		
		if( selectedIds.length > 1 ) {
			alert( "Selezionare una sola spedizione!" ) ;
			return ;
		}
		
		if( selectedIds.length <= 0 ) {
			alert( "Selezionare una spedizione!" ) ;
			return ;
		}
		
		var url = contextPath + "/restMaterialita/getLDV?selectedId="+ selectedIds[0] + "&clienteId=" + selectedClienteId[0] + "&centroDemat=" + centroDemat ;
		
		waitingDialog.show('Richiesta in corso...');
		
		$.ajax({
			type : 'GET',
			url : url,
			success : function(result) {
				if(result.status){
					var b64 = result.data;
					var a = document.createElement('a');
					var pdfAsDataUri = "data:application/pdf;base64," + b64;
					a.download = result.message + ".pdf" ;
					a.type = 'application/pdf';
					a.href = pdfAsDataUri;
					a.click();

					waitingDialog.hide();
					setTimeout( function() {
						tablespedizioni() ;
					} , 1000 );
				}
				else{
					console.log('errore!');
					console.log('result ', result);
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
					waitingDialog.hide();
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
				waitingDialog.hide();
			}
		});
	} ) ;
} );

function tablespedizioni() {
console.log('tableSpedizioniDDT start');
	
	//var centroDemat = $('#centroDemat').val() ;
	
	var uri = contextPath + "/restMaterialita/dataTableSpedizioneDDT" ;

	var pageNumber = $('#tableSpedizioniDDT').bootstrapTable('getOptions').pageNumber;
	if(!pageNumber)
		pageNumber = 1
	
	waitingDialog.show('Ricerca in corso...');
	setTimeout(function () {
		$("#tableSpedizioniDDT").show(1000);
		$('#tableSpedizioniDDT').bootstrapTable('selectPage', pageNumber);
		$('#tableSpedizioniDDT').bootstrapTable('refresh', {
			url: uri
		});	
	  waitingDialog.hide();
	});
	
	console.log("uri: " + uri); 
}