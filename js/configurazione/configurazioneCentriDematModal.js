$(document).ready(function() {
	$("#azione").click(function(e) {
		waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'warning'});
		aggiungiCentro();
	});

});


function aggiungiCentro(){
	var tipo=$("#tipo").val();
	var url="";
	var idCentro = null;
	var requestAddCentro = null;

	var codiceCentro = checkVar($('#codiceCentroModal').val());
	var descrizione = checkVar($('#descrizioneModal').val());
	var department = checkVar($('#departmentModal').val());
	var localita = checkVar($('#localitaModal').val());
	
	console.log('codiceCentro:',codiceCentro);
	console.log('descrizione:',descrizione);
	console.log('department:',department);
	console.log('localita:',localita);
	
	if (tipo=="ADD"){
		url = contextPath + '/' + 'configurazione/configurazioneCentriDemat' + '/insertCentriDemat';
		var requestAddCentro = { "data":{"codiceCentro": codiceCentro,"department": department,"descrizioneCentro": descrizione,"localita":localita}};
	}
	else{
		url = contextPath + '/' + 'configurazione/configurazioneCentriDemat' + '/updateCentriDemat';
		idCentro = $('#idCentro').val();
		var requestAddCentro = { "data":{"idCentroDemat": idCentro,"codiceCentro": codiceCentro,"department": department,"descrizioneCentro": descrizione,"localita":localita}};
	}
		

	
	var modalAggiungiCentro = $("#configurazioneCentroDematModal");

//	if (!validateText("identificativoPaModal"))  {
//		alert("Immettere identificativo PA!")
//		return false;
//	}
	
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestAddCentro),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					if (tipo=="ADD"){
						alert('Aggiunto centro demat');
					}
					else{
						alert('Modificato centro demat');						
					}
					findConfigCentriDemat();
					modalAggiungiCentro.modal('hide');
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
				}
				waitingDialog.hide();						
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
				waitingDialog.hide();						
			}
		});

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

