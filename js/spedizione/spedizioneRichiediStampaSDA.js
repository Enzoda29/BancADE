var tableSpedizione = null;
var idSpedizioneSelected = null;
var idCentroDematUser = $('input[name="centrodemat"]').val(); //TODO estrarre il centro dall'utente loggato
var codiceScatolaSelected = null;
var numMaxPraticheSelected = null;
var numPraticheInsSelected = null;
$(document).ready(function() {
	
	
	
	$("#richiediStampa").click(function() {

		stampaLDV();
	});	
	
	
	
	
});


	function stampaLDV (){

		var url = contextPath + '/' + 'spedizione' + '/stampaLdvSDA';
		var requestSpedizione = { "data":{"idAnagPA": ""}}
			$.ajax({
				type : 'POST',
				url : url,
				contentType : 'application/json',
				dataType : 'json',
				data : JSON.stringify(requestSpedizione),
				success : function(result) {
					waitingDialog.hide();
					console.log('success! ', result);				
					if(result.status){
						var b64 = result.data;
						
//						var viewer = new ej.pdfviewer.PdfViewer({      
//			                //Sets the base64 string to the documentPath API          
//			                    documentPath: flussByte,
//			                    serviceUrl: '/api/PdfViewer'
//			                });
//						ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation);
//		                viewer.appendTo('#pdfViewer');
//						var obj = document.createElement('obj');
//						obj.style.width = '100%';
//						obj.style.height = '842pt';
//						obj.type = 'application/pdf';
//						obj.data = 'data:application/pdf;base64,' + b64;
//						document.body.appendChild(obj);
						
//						window.open("data:application/pdf;base64," + b64);
						
						var a = document.createElement('a');
						var pdfAsDataUri = "data:application/pdf;base64," + b64;
						a.download = 'export.pdf';
						a.type = 'application/pdf';
						a.href = pdfAsDataUri;
						a.click();
//						var listSpedizione =result.data.listSpedizione;
//						tableSpedizione.clear();
//						tableSpedizione.draw();
//						for(var i=0; i<listSpedizione.length; i++){
//							addSpedizioneObj(listSpedizione[i]);
//						}
					}else{
						$('#danger_msg').text(result.message);
						$('#div_error_alert').show();
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
	}
