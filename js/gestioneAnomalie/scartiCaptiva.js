$(document).ready( function() {
	var uri = contextPath + "/gestione/getTableScarti.json" ;

	waitingDialog.show('Ricerca in corso...');
	setTimeout(function () {
		$("#tableScarti").show(1000);
		$('#tableScarti').bootstrapTable('selectPage', 1);
		$('#tableScarti').bootstrapTable('refresh', {
			url: uri
		});	
	  waitingDialog.hide();
	});
} );