$(document).ready(function() {


//$('#submitDiv').hide();
//$('#error_login').hide();	

function showLoaderLst(show,message){
	$("#loadLst").text(message);
	$("#loadLst").attr("style",((show)?"display:''":"display:none"));
}


$("#caricaPostazioni").click(function () {
//	$('#test').text("change test");
	$('#div_error_alert').hide();
	
	showLoaderLst(true,"Autenticazione in corso...");
	var username = $('[name="username"]').val();
	var password = $('[name="password"]').val();
	var request = {
			"data" : {
				"username": username,
				"password": password
		   }};
	var url = contextPath  + '/login/autenticazione';
	$.ajax({
		type : 'POST',
		url : url,	
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result, textStatus, xhr) {	
			if(result.status){
//				$('#test').text("Change --> " + result.data.listPostazione[1].descrizione  );
				$('#error_login').hide();
				$("#postazioneDiv").show();
				$("#postazione").attr("disabled",false);
				$('[name="username"]').attr("readonly","readonly");
				$('[name="password"]').attr("readonly","readonly");
//				isPostLoaded = true;	
//				var lst = result.data.listPostazione;
//				$('#testRes').text("Change --> " + result);
//				for (var i = 0; i < lst.length; i++) {
//					var obj = lst[i];
					$("#postazione").append(
							"<option value=1>pz8</option>");
//				}
				
				$('#postazioniDivButton').hide();
				$('#submitDiv').show();
				showLoaderLst(false,"");
			}else{
				$('#test').text("Change --> " + result.status);
				$('#error_login').show();
				$("#loadLst").text(result.message);		
			}

			
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			$('#error_login').show();
			$("#loadLst").text(result.message);			
		}
	});


});


$('#postazione').on('change', function() {
	 var idPostazione = this.value;
	 var descrizionePostazione = $( "#postazione option:selected" ).text();
	 var username = $('[name="username"]').val();
	 console.log('postazione: '+postazione);
	 var url = contextPath  + '/login/postazione';
	 $('#test').text("Change --> " + descrizionePostazione);
	 $.ajax({
			type : 'POST',
			url : url,	
			dataType : 'json',
			data: { "idPostazione": idPostazione,"descrizionePostazione":descrizionePostazione, "username":username},
			success : function(result, textStatus, xhr) {
				if(result.status){
					 $('[name="submit"]').attr("disabled",false);					
				}else{
					$('#error_login').show();
					showLoaderLst(true,result.message)
				}				
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#error_login').show();
				$("#loadLst").text(error);		
			}
		});

});




});

function onEnterPressed(event){
	if (event.keyCode === 13) {
		if($('#submitDiv').css('display') == 'none'){
			$("#caricaPostazioni").click();
		}else
		if($('#postazioniDivButton').css('display') == 'none'){
			$( "#loginForm" ).submit();
		}
		
	}
}