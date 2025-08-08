$(document).ready( function(){
	$('#dettaglioPalletModal').on( 'show.bs.modal' , function(){
		var numPallet = $('#dettaglioPalletModal').data( 'numPallet' ) ;
		var statoPallet = $('#dettaglioPalletModal').data( 'statoPallet' ) ;
		var tipoPallet = $('#dettaglioPalletModal').data( 'tipoPallet' ) ;
		var totScatole = $('#dettaglioPalletModal').data( 'totScatole' ) ;		
		var idCliente = $('#dettaglioPalletModal').data( 'idCliente' ) ;
		var lottoTerritoriale = $('#dettaglioPalletModal').data( 'lottoTerritoriale' ) ;		
		var modify = $('#dettaglioPalletModal').data( 'isMod' ) ;
		console.log( numPallet ) ;
		
		$('#title_cod_pallet').text( numPallet ) ;
		$('#title_stato_pallet').text( statoPallet ) ;
		$('#title_tipo_documento').text( tipoPallet ) ;
		$('#title_totale_scatole').text( totScatole ) ;
		$('#title_id_cliente').text( idCliente ) ;
		$('#title_lotto_territoriale').text( lottoTerritoriale ) ;
		
		if( !modify ) {
			$('#divAggiungiScatola').hide() ;
		}
		else {
			$('#divAggiungiScatola').show() ;
		}
		
		var uri = contextPath + "/ricerche/pallet/dataTableDettagliPallet.json?codPacchetto="+numPallet ;
		//Chiamata ajax per dettagli pallet
//		$('#tablePalletScatola').bootstrapTable('selectPage', 1);
//		$('#tablePalletScatola').bootstrapTable('refresh', {
//			url: uri
//		});	
		
		var pageNumber = $('#tablePalletScatola').bootstrapTable('getOptions').pageNumber;
    	if(!pageNumber)
    		pageNumber = 1
    	
    	waitingDialog.show('Ricerca in corso...');
    	setTimeout(function () {
    		$("#tablePalletScatola").show(1000);
    		$('#tablePalletScatola').bootstrapTable('selectPage', pageNumber);
    		$('#tablePalletScatola').bootstrapTable('refresh', {
    			url: uri
    		});	
    	  waitingDialog.hide();
    	  if( !modify ) {
    		  $('#tablePalletScatola').bootstrapTable('hideColumn' , 'BUTTONS') ;
    	  }
    	  else{
    		  $('#tablePalletScatola').bootstrapTable('showColumn' , 'BUTTONS') ;
    	  }
    	});
    	
    	if( statoPallet == "Completo - Associato ad un DDT" ) {
    		$('#divAggiungiScatola').hide() ;
    		$('#tablePalletScatola').bootstrapTable( 'showColumn' , 'BUTTONS' ) ;
    	}
    	
    	$('#dettaglioPalletModal').modal('handleUpdate') ;
	} ) ;
	
	$('#aggiungiScatola').click( function() {
		var codScatola = $('#aggScatolaInputModal').val() ;
		var numPallet = $('#dettaglioPalletModal').data( 'numPallet' ) ;
		addScatolaToPallet( numPallet , codScatola ) ; //in ricerca_pallet.js
	} ) ;
	
	$('#chiudiPalletButton').click( function() {
		var numPallet = $('#dettaglioPalletModal').data( 'numPallet' ) ;
		chiudiPallet( numPallet ) ;
		$('#dettaglioPalletModal').modal('toggle') ;
	} ) ;
	
	
	$("#dettaglioPalletModal").keyup(function(event) {
	    if (event.keyCode === 13) {
	        $("#aggiungiScatola").click();
	    }
	});
	

} ) ;



function onEnterPressed(event){
	if (event.keyCode === 13) {
        $("#aggiungiScatola").click();
		
	}
}

function removeScatola( scatolaId ) {
	var uri= contextPath + "/ricerche/pallet/removeScatola";
	var data ={"data": { "scatolaId" : scatolaId , "numPallet" : $('#dettaglioPalletModal').data( 'numPallet' ) } };
	waitingDialog.show('Operazione in corso...');
	$.ajax({
		url: uri,
		method: "POST",
		contentType : 'application/json',
		dataType : 'json',
		data:JSON.stringify( data ),
		success: function(data) {
			waitingDialog.hide();
			if( data.status ) {
				$('#success_msg').text(data.message);
				$('#div_success_alert').show();
				
				var uri = contextPath + "/ricerche/pallet/dataTableDettagliPallet.json?codPacchetto="+$('#dettaglioPalletModal').data( 'numPallet' ) ;
				
				var pageNumber = $('#tablePalletScatola').bootstrapTable('getOptions').pageNumber;
		    	if(!pageNumber)
		    		pageNumber = 1
				
		    	var totScatole = $('#title_totale_scatole').text() ;
		    	$('#title_totale_scatole').text( +totScatole - 1 ) ;
		    		
				$("#tablePalletScatola").show(1000);
	    		$('#tablePalletScatola').bootstrapTable('selectPage', pageNumber);
	    		$('#tablePalletScatola').bootstrapTable('refresh', {
	    			url: uri
	    		});	
			}
			else{
				$('#danger_msg').text(data.data);
				$('#div_error_alert').show();
			}
		}
	
	});
}