$(document).ready(function() {

	$("#azione").click(function(e) {
		aggiungiIstanza();
	});

});


function aggiungiIstanza(){
	var tipo=$("#tipo").val();
	var url="";
	if (tipo=="ADD"){
	   url = contextPath + '/' + 'configurazione/configurazioneIstanza' + '/aggiungiIstanza';
	}
	else{
		 url = contextPath + '/' + 'configurazione/configurazioneIstanza' + '/modificaIstanza';
	}
		

	var idIstanza = $('#idIstanza').val();
	var codiceIstanza = $('#codiceIstanzaModal').val();
	var codiceTipoIstanza = $('#codiceTipoIstanzaModal').val();
	var descrizione = $('#descrizioneModal').val();
	var modalAggiungiIstanza = $("#configurazioneIstanzaModal");

	console.log('idIstanza:',idIstanza);
	console.log('codiceIstanza:',codiceIstanza);
	console.log('codiceTipoIstanza:',codiceTipoIstanza);
	console.log('descrizione:',descrizione);

	var requestAddService = { "data":{"idIstanza": idIstanza,"codiceIstanza": codiceIstanza,"codiceTipoIstanza": codiceTipoIstanza,"descrizione": descrizione}};
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestAddService),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					if (tipo=="ADD"){
						alert('Aggiunta istanza');
					}
					else{
						alert('Modificata istanza');						
					}
					findConfigIstanza();
					modalAggiungiIstanza.modal('hide');
				}else{
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
