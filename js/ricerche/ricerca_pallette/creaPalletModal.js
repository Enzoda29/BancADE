$(document).ready(function () {
	$('#creaPalletModal').on( 'show.bs.modal' , function() {
		var filtriStatiSelected="list_id_stati_select=100-";
        
		
		var centroDemat = $("input[name='centrodemat']").val() ;
		var uri = contextPath + "/ricerche/pallet/dataTableRicercaPallet.json?"
				+ filtriStatiSelected
//				+ filtriClienteSelected
//				+ filtriPerTipologiaPalletCombo
//				+ "&codiceDDT="+codiceDDT
//				+ "&codicePallet="+codicePallet
				+ "&centroDemat="+centroDemat;
		//		+ "&sort=CODICE_PALLET&order=desc&offset=0&limit=10000";

		var pageNumber = $('#tablePalletModal').bootstrapTable('getOptions').pageNumber;
		if(!pageNumber)
		pageNumber = 1
		
		waitingDialog.show('Ricerca in corso...');
		setTimeout(function () {
			$("#tablePalletModal").show(1000);
			$('#tablePalletModal').bootstrapTable('selectPage', pageNumber);
			$('#tablePalletModal').bootstrapTable('refresh', {
					url: uri
			});	
			waitingDialog.hide();
		});
	} ) ;
	
	$("#creaPalletModal").keyup(function(event) {
	    if (event.keyCode === 13) {
	        $("#creaPalletModalButton").click();
	    }
	});
	
	$('#creaPalletModalButton').click( function() {
		var codScatola = $('#codScatolaCreaModal').val() ;
		var operatoreId = $('#operatoreId').val() ;
		var postazione = $('#postazione').val() ;
		var centroDemat = $('#centroDemat').val() ;
		
		var uri= contextPath + "/ricerche/pallet/checkScatola?codScatola="+codScatola+"&centroDemat="+centroDemat+"&operatore="+operatoreId+"&postazione="+postazione ;
		waitingDialog.show('Operazione in corso...');
		$.ajax({
			url: uri,
			method: "GET",
			success: function(data) {
				waitingDialog.hide();
				if( !data.status ){
					alert( "Impossibile creare il pallet!" ) ;
					$('#codScatolaCreaModal').val('');
					$('#danger_msg').text(data.message);
					$('#div_error_alert').show();
				}
				else{
					$('#codScatolaCreaModal').val('');
					$('#creaPalletModal').modal('hide');
					setTimeout( function(){
						openDettagliPallet( data.data.codPallet , data.data.statoPallet , data.data.descrTipo , data.data.totScatole , data.data.idCliente , data.data.descrLottoTerritoriale , true ) ;
					} , 500 );
					
				}
			}
    	
		});
 
    });
} ) ;