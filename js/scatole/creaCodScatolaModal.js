$(document).ready(function() {

	$("#copyCodScatola").click(function(e) {
		$("#codice_scatola").select();
		document.execCommand("copy");
	});

	$("#printCodScatola").click(function(e) {
		printWindow("printableArea",200,200);
	});

});