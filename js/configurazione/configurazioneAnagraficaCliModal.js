$(document).ready(function() {
	
	
	
	$("#azione").click(function(e) {
		aggiungiAnagrafica();
	});
	
	
});

$('#configurazioneAnagraficaCliModal').on('hidden.bs.modal', function () {
    reset_validateText("codiceModal");
    reset_validateText("identificativoModal");
    reset_validateText("descrizioneModal");
    
})
	

function aggiungiAnagrafica(){
	var tipo=$("#tipo").val();
	var url="";
	var idAnagr = null;
	var requestAddAnag = null;

	var codice = checkVar($('#codiceModal').val());
	var identificativo = checkVar($('#identificativoModal').val());
	var descrizione = checkVar($('#descrizioneModal').val());
	
	if (tipo=="ADD"){
	   url = contextPath + '/' + 'configurazione/configurazioneAnagraficaPA' + '/insertAnagraficaPA';
	   var requestAddAnag = { "data":{"codice": codice,"identificativo": identificativo,"descrizione": descrizione}};
	}
	else{
		 url = contextPath + '/' + 'configurazione/configurazioneAnagraficaPA' + '/updateAnagraficaPA';
		 idAnagr = $('#idAnagr').val();
			var requestAddAnag = { "data":{"id": idAnagr,"descrizione": descrizione}};
	}
		
	if (!validateText("codiceModal"))  {
		alert("Inserire codice cliente!")
		return false;
	}
	if (!validateText("identificativoModal"))  {
		alert("Inserire identificativo cliente!")
		return false;
	}
	if (!validateText("descrizioneModal"))  {
		alert("Inserire descrizione cliente!")
		return false;
	}
	
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestAddAnag),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					if (tipo=="ADD"){
//						alert('Aggiunta anagrafica');
						$('#div_success_alert').show(500);
						$('#success_msg').text("Cliente inserito correttamente.");
						$('#azione').hide(500);
					}
					else{
//						alert('Modificata anagrafica');		
						$('#success_msg').text("Descrizione cliente modificata con successo.");
						$('#azione').hide(1000);
						$('#div_success_alert').show(1000);
					}
					findConfigAnagrafica();
//					modalAggiungiAnagrafica.modal('hide');
					
					
					
				}else{
					$('#azione').hide(1000);
					$('#modalMessage #danger_msg').text(result.message);
					$('#modalMessage #div_error_alert').show(500);
				}
				
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#modalMessage #danger_msg').text(error);
				$('#modalMessage #div_error_alert').show(500);
				$('#azione').hide(500);
			}
		});
	
}	


function validateEmail(id)
{
  var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  var variabile=$("#"+id).val();
	if (typeof(variabile) != 'undefined' && variabile != null && variabile != 'null' && variabile!=""){
		if(!email_regex.test($("#"+id).val()))
		{
			var div = $("#"+id).closest("div");
			div.removeClass("has-success");
			$("#glypcn"+id).remove();
			div.addClass("has-error has-feedback");
			div.append('<span id="glypcn'+id+'" class="glyphicon glyphicon-remove form-control-feedback"></span>');
		return false;
		}
		else{
		    var div = $("#"+id).closest("div");
		    div.removeClass("has-error");
		    $("#glypcn"+id).remove();
		    div.addClass("has-success has-feedback");
		    div.append('<span id="glypcn'+id+'" class="glyphicon glyphicon-ok form-control-feedback"></span>');	
	    return true;
		}
	}
	return true;
}

function reset_validateText(id){

	var div = $("#"+id).closest("div");
	div.removeClass("has-error");
	$("#glypcn"+id).remove();
	div.removeClass("has-success");

}

function validateText(id)
{
if($("#"+id).val()==null || $("#"+id).val()=="")
{
	var div = $("#"+id).closest("div");
	div.removeClass("has-success");
	$("#glypcn"+id).remove();
	div.addClass("has-error has-feedback");
	div.append('<span id="glypcn'+id+'" class="glyphicon glyphicon-remove form-control-feedback"></span>');
	return false;
}
else{
    var div = $("#"+id).closest("div");
    div.removeClass("has-error");
	$("#glypcn"+id).remove();
	div.addClass("has-success has-feedback");
	div.append('<span id="glypcn'+id+'" class="glyphicon glyphicon-ok form-control-feedback"></span>');
    return true;
}

}

