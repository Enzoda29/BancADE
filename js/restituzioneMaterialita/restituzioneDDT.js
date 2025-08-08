$(document).ready( function() {
	$(".bootstrap-table").show(500);	
	
	ricercaRestituzioni() ;
	
	$('#associaASpedizioneBtn').click( function(){
		var selected = $('#tableRestituzioneDDT').bootstrapTable('getSelections') ;
		var selectedIds = [] ;
		var centroDemat = $('#centroDemat').val() ;
		for( var i = 0 ; i < selected.length ; i++ ) {
			selectedIds.push(selected[i].DDT_ID) ;
		}
		
		if( selectedIds.length <= 0 ) {
			return ;
		}
		
		console.log( 'selectedIds:' + selectedIds ) ;
		
		var url = contextPath + "/restMaterialita/associaDDT" ;
		
		var data = { "listDdtId" : selectedIds , "centroDemat" : centroDemat } ;
		
		$.ajax({
			type : 'POST',
			data : JSON.stringify( data ) ,
			contentType : 'application/json',
			url : url,
			success : function(data) {
				var lst = data.data;
				if( data.status ) {
					$('#success_msg').text(data.message);
					$('#div_success_alert').show();
					waitingDialog.hide() ;
					ricercaRestituzioni() ;
				}
				else {
					$('#danger_msg').text(data.message);
					$('#div_error_alert').show();
					waitingDialog.hide() ;
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
	} ) ;
	
	$('#stampaEtichettaBtn').click( function() {
		var selected = $('#tableRestituzioneDDT').bootstrapTable('getSelections') ;
		var selectedIds = [] ;
		var centroDemat = $('#centroDemat').val() ;
		for( var i = 0 ; i < selected.length ; i++ ) {
			selectedIds.push(selected[i].DDT_ID) ;
		}
		
		if( selectedIds.length <= 0 ) {
			return ;
		}
		
		if( selectedIds.length > 1 ) {
			alert( "Selezionare un solo DDT!" ) ;
			return ;
		}
		
		stampaEtichetta( selectedIds[0] , 1 )
		
	} ) ;
	
	$('#stampaModuloBtn').click( function() {
		var selected = $('#tableRestituzioneDDT').bootstrapTable('getSelections') ;
		var selectedIds = [] ;
		var centroDemat = $('#centroDemat').val() ;
		for( var i = 0 ; i < selected.length ; i++ ) {
			selectedIds.push(selected[i].DDT_ID) ;
		}
		
		if( selectedIds.length <= 0 ) {
			return ;
		}
		
		if( selectedIds.length > 1 ) {
			alert( "Selezionare un solo DDT!" ) ;
			return ;
		}
		
		stampaModuloDDT( selectedIds[0] ) ;
	} ) ;
} ) ;

function ricercaRestituzioni() {
	console.log('ricercaDDT start');
	
	var centroDemat = $('#centroDemat').val() ;
	
	var uri = contextPath + "/restMaterialita/dataTableRestituzioneDDT?centroDemat=" + centroDemat ;

	var pageNumber = $('#tableRestituzioneDDT').bootstrapTable('getOptions').pageNumber;
	if(!pageNumber)
		pageNumber = 1
	
	waitingDialog.show('Ricerca in corso...');
	setTimeout(function () {
		$("#tableRestituzioneDDT").show(1000);
		$('#tableRestituzioneDDT').bootstrapTable('selectPage', pageNumber);
		$('#tableRestituzioneDDT').bootstrapTable('refresh', {
			url: uri
		});	
	  waitingDialog.hide();
	});
	
	console.log("uri: " + uri);  
}