var tableDett = null;
$(document).ready(function() {
	$("#codice-input").focus();
	$("#codice-input").keypress(function(e) {
		if(e.which == 13) {
			$("#proseguiAccettazione").click();
			
	    }		
	});

	// loadDispacci();

});
