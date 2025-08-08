$(document).ready( function(){
	$("#tablePlichi").hide() ;
	
	$('#cerca').click( function(){
		$(".bootstrap-table").show(500);
		var idCliente	= $('#idCliente').val() ;
		var codPlico	= $('#codPlico').val() ;
		var codScatola	= $('#codScatola').val() ;
		var statiSelected = [] ;
//		$.each($("input[name='cBoxPlichi']:checked") , function() {
//			statiSelected.push( $(this).val() );
//		} );
//		if( statiSelected.length == 0 ) {
//			$.each($("input[name='cBoxPlichi']") , function() {
//				statiSelected.push( $(this).val() );
//			} );
//		}
		
		var uri = contextPath + "/plichi/getTablePlichi.json?idCliente=" + idCliente + "&codPlico=" + codPlico + "&codScatola=" + codScatola + "&statiSelected=" + statiSelected ;
		
		waitingDialog.show('Ricerca in corso...');
    	setTimeout(function () {
    		$("#tablePlichi").show(1000);
    		$('#tablePlichi').bootstrapTable('selectPage', 1);
    		$('#tablePlichi').bootstrapTable('refresh', {
    			url: uri
    		});	
    	  waitingDialog.hide();
    	});
		
	} );
	
	$('#dettaglioPlicoModal').on( 'hide.bs.modal' , function() {
		$('#tableDettDocs tbody').empty() ;
		$('#title_cod_plico').text( "" ) ;
		$('#title_tipo_prod').text( "" ) ;
		$('#title_stato_plico').text( "" ) ;
		$('#title_tot_doc').text( "" ) ;
	} ) ;
	
	$('#title_tot_doc').on('refresh.bs.table' , function() {
		waitingDialog.hide();
	}) ;
	
	$('#tableStatiPlico').on('refresh.bs.table' , function() {
		waitingDialog.hide();
	}) ;
	
	$('#reset').click( function(){
		$(".bootstrap-table").hide(500);
		$("#tablePlichi").hide(500);	
		$("#tablePlichi").bootstrapTable();	
	    $('input:checkbox').prop("checked", false);
	    $('input:text').val('');
	}) ;
} );

function openDettagliPlico( idPlico ) {
	//$('#dettaglioPlicoModal').modal('toggle') ;
	
	var url = contextPath + "/plichi/dettagliPlico?idPlico=" + idPlico ;
	waitingDialog.show('Ricerca in corso...');
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		success : function(result) {			
			var data = result.data ;
			if(data!=null){
				$('#dettaglioPlicoModal').modal('toggle') ;
				$('#title_cod_plico').text( data.codicePlico ) ;
				$('#title_tipo_prod').text( data.tipoProdotto ) ;
//			$('#title_stato_plico').text( data.statoPlico ) ;
				$('#title_tot_doc').text( data.totDocumenti ) ;
				for( var i = 0 ; i < data.documenti.length ; i++ ) {
					var row = '<tr><td>'+data.documenti[i].codOggetto+'</td>'+
					'<td>'+data.documenti[i].statoDocumento+'</td>'+
					'<td>'+data.documenti[i].dataScansione+'</td>'+
					'<td>'+data.documenti[i].posizioneInScatola+'</td></tr>' ;
					$('#tableDettDocs tbody').append( row ) ;
					waitingDialog.hide();
				}
			} else {
				waitingDialog.hide();
				$('#danger_msg').text("Dati di dettaglio plico non presenti!");
				$('#div_error_alert').addClass("col-md-offset-3");
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

function stampaPlico( plicoId ) {
	var url = contextPath + '/normalizzazione/printPlico/' + plicoId;
	window.open(url) ;
}

function openStatiPlico( plicoId , codPlico ) {
	$('#statiPlicoModal').modal( 'toggle' ) ;
	$("#title_stati_plico").text( codPlico ) ;
	
	var uri = contextPath + "/plichi/tableStatiPlico.json?idPlico=" + plicoId ;
	
	waitingDialog.show('Ricerca in corso...');
	setTimeout(function () {
		$("#tableStatiPlico").show(1000);
		$('#tableStatiPlico').bootstrapTable('selectPage', 1);
		$('#tableStatiPlico').bootstrapTable('refresh', {
			url: uri
		});	
	});
}