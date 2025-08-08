$(document).ready( function() {
	
} ) ;

function stampaEtichetta( ddtId , numEtichette ) {
	
	var url2 = contextPath + "/restMaterialita/stampatichette?ddtId=" + ddtId ; ;
	var url = contextPath + "/restMaterialita/getCountEtichetta?ddtId=" + ddtId ;
	
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url,
		success : function(result) {
			if( result.status ) {
				if(!confirm("Siete sicuri di voler mandare in stampa " + result.data + " etichette?") ) {
					return ;
				}
				
				$.ajax({
					type : 'GET',
					contentType : 'application/json',
					url : url2,
					success : function(result) {
						if( result.status ) {
							$('#success_msg').text("Mandate in stampa " + result.data + " etichette");
							$('#div_success_alert').show();
						}
						else {
							console.log('status ', result.status);
							console.log('result ', result);
							$('#danger_msg').text(result.message);
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
			else {
				console.log('status ', result.status);
				console.log('result ', result);
				$('#danger_msg').text(result.message);
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

function recuperaEStampaLDV( spedizioneId ){
var url = contextPath + "/restMaterialita/stampaLDV?spedizioneId="+ ddtId ;
	
	$.ajax({
		type : 'GET',
		url : url,
		async: false,
		contentType : 'application/json',
		dataType : 'json',
		success : function(result) {
			
			if(result.status){
				var b64 = result.data;
				var a = document.createElement('a');
				var pdfAsDataUri = "data:application/pdf;base64," + b64;
				a.download = result.message + ".pdf" ;
				a.type = 'application/pdf';
				a.href = pdfAsDataUri;
				a.click();
			}
			else{
				console.log('errore!');
				console.log('result ', result);
				$('#danger_msg').text(result.message);
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

function stampaModuloDDT( ddtId ) {
	var url = contextPath + "/restMaterialita/getModuloDDT?ddtId="+ ddtId ;
	
	$.ajax({
		type : 'GET',
		url : url,
		async: false,
		contentType : 'application/json',
		dataType : 'json',
		success : function(result) {
			
			if(result.status){
				var b64 = result.data;
				var a = document.createElement('a');
				var pdfAsDataUri = "data:application/pdf;base64," + b64;
				a.download = result.message + ".pdf" ;
				a.type = 'application/pdf';
				a.href = pdfAsDataUri;
				a.click();
			}
			else{
				console.log('errore!');
				console.log('result ', result);
				$('#danger_msg').text(result.message);
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