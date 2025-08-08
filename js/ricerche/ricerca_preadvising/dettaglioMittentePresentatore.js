var codiceMittPres = null;
$(document).ready(function() {
	
	$('#dettaglioMittentePresentatore').on('show.bs.modal', function() { 
		showLoaderLst(true,"Caricamento valori in corso....");
		populateDettMittPresentatore();
	});
	
});

function openDettMittPres(codice, label){	
	codiceMittPres = codice;
	$("#titleMittPres").text(label);
	$("#dettaglioMittentePresentatore").modal('show');
}

function showLoaderLst(show,message){
	$("#loadFields").text(message);
	$("#loadFields").attr("style",((show)?"display:''":"display:none"));
}

function populateDettMittPresentatore(){
	var url = contextPath + '/' + 'ricerche' + '/getDettMittPresentatore';
	 var request = { "data":{ "codice": codiceMittPres}};
	$.ajax({       
        type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			console.log('success! ', result.data);
			var item = result.data;
				
			 $("#cognome").val(item.cognome);
			 $("#nome").val(item.nome);
			 $("#sesso").val(item.sesso);
			 $("#ragione_sociale").val(item.ragioneSociale);
			 $("#pIVA").val(item.partitaIva);
			 $("#email").val(item.email);
			 $("#data_nascita").val(item.dataDiNascitaFormat);
			 $("#comune_nascita").val(item.comuneDiNascita);			 
			 $("#codice_fiscale").val(item.codiceFiscale);			 
			 $("#indirizzo").val(item.indirizzo);
			 $("#prov").val(item.provincia);
			 $("#cap").val(item.cap);
			 $("#comune").val(item.comune);				 
			 $("#cellulare").val(item.cellulare);
			 $("#telefono").val(item.telefono);
 			showLoaderLst(false,"");

		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,error);
		}
	});
}
