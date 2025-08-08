$(document).ready(function() {

	$("#stampaBarcode").click(function(e) {
	
		if (/Edge\/\d./i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) { //se browser >= IE 11
			openWin("imgBc",1000,1000);
	   	}else{
	   		//setto il body dell'iframe che andrò poi a stampare e applico lo stile
	   		 var eps = $('#bodyIframe').clone().html();
	   	        $('#pritableIframe').contents().find("body").prepend(eps);
	   	        $('#pritableIframe').contents().find("body").css({"marginLeft" : "200px"});
	   	        $("#pritableIframe").contents().find("title").text("");
	   	 		//stampa dell'iframe		    	 		
		 		window.frames["pritableIframe"].focus();
		 		window.frames["pritableIframe"].print();
		 		window.frames["pritableIframe"].close();
	   		
	   	}
		//pulizia
		$('#pritableIframe').empty();
	});
 	
	$( "#closeCodScatola" ).click(function() {
 		 $('#printableZone').empty();
	});
	
	//stampa per windows
	function openWin(idPrintableArea,widthIE,heightIE) {
		var myWindow = window.open('', '', 'width='+widthIE+',height='+heightIE);
//		myWindow.document.write($('#bodyIframe').html());
		myWindow.document.write($("#"+idPrintableArea).html());

		myWindow.document.close();
		myWindow.focus();
		myWindow.print();
		myWindow.close();

	}

});

