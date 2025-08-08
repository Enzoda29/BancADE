var tableModal = null ;
$(document).ready(function(){
	
	tableModal = $('#tableEsitoRicercaSpedizioni').DataTable({
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : true,
			"searchable" : true,


		} ],
		"paging" : false ,
		"scrollX": true,
		"scrollY": true,
		"bInfo" : false,
		"ordering": false,
		"searching": false,
		"bFilter": false,

		"language": {
			"lengthMenu": "Mostra _MENU_ record per pagina",
			"zeroRecords": "Non sono stati trovati record",
			"infoEmpty": "",
			"infoFiltered": "(Filtrati da _MAX_ record totali)",
			"paginate": false
		}
	});
	
	$("#statoSpedizione").on("change",function(){
		var selected = $(this).children("option:selected").val();
		if(selected != 100) {
			$("#dataRitiro").val( new Date().toLocaleString() ) ;
		}
		else{
			$("#dataRitiro").val("-");
		}
	});
	
	$("#aggiorna").click(function(){
		
		var idSpedizione = $("#spedizioneId").val() ;
		var dataRitiro = $("#dataRitiro").val() ;
		var note = $("#note").val() ;
		var username = $('input[name="operatoreId"]').val();
		var statoSpedizione = $('#statoSpedizione').children("option:selected").val();
		
		if( dataRitiro == "-" ) {
			alert( "Aggiornare lo stato della spedizione!" ) ;
			return ;
		}
		
		var url = contextPath + '/'+'restMaterialita'  + '/aggiornaSpedizione';
		var data = { "data":{ "statoSpedizione" : statoSpedizione , "idSpedizione":idSpedizione , "dataRitiro":dataRitiro , "note":note , "username":username } } ;
		
		waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'default'});
		
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(data),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);

				if(result.status){
					alert("Spedizione aggiornata correttamente!") ;
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
					alert("Errore! Spedizione non aggiornata!") ;
				}
				waitingDialog.hide();
				$("#dettaglioSpedizioneModal").modal('toggle');
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
				$("#dettaglioSpedizioneModal").modal('toggle');
			}
		});
		
	});
	
	$("#dettaglioSpedizioneModal").on("hide.bs.modal" , function(){
		tableModal.clear().draw(false) ;
		$('#spedizioneId').val("") ;
		$('#aggregatoId').val("") ;
		$('#letteraDiVettura').val("") ;
		$('#nomeVettore').val("") ;
		$('#dataRitiro').val("") ;
		$('#note').val("") ;
	});
	
	$("#dettaglioSpedizioneModal").on("show.bs.modal" , function(){
		showModal( $('#dettaglioSpedizioneModal').attr("data-function") ) ;
	});
});

function showModal( callback ) {
	var idSpedizione = table.cell('.selected', 0).data() ;
	
	var url = contextPath + '/'+'restMaterialita'  + '/getDettSpedizione';
	var data = { "data":idSpedizione};

	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(data),
		success : function(result) {
			console.log('success! ', result);
			console.log('success! ', result.data);

			if(result.status){
				if( result.data ){
					var list = result.data ;
					for( var i = 0 ; i < list.length ; i++ ) {
						var element = list[i] ;
						tableModal.row.add( [ 
							checkVar(element.statoSda),
//							checkVar(element.aggregatoId),
							checkVar(element.descrizioneStatoSda),
							checkVar(element.dataStato)
							] ).draw(false);
					}
					$("#spedizioneId").val(list[0].spedizioneId) ;
					$('#aggregatoId').val(list[0].aggregatoId) ;
					$("#letteraDiVettura").val(list[0].codiceLdv) ;
					$("#nomeVettore").val(list[0].nomeVettore) ;
					$("#dataRitiro").val(list[0].dataRitiroStabilimento) ;
					$("#statoSpedizione option[value='"+ list[0].statoSpedizioneTypeId +"']").prop("selected",true) ;
					
					$("#spedizioneId").attr("disabled", true);
					$('#aggregatoId').attr("disabled", true);
					$("#letteraDiVettura").attr("disabled", true);
					$("#nomeVettore").attr("disabled", true);
					$("#dataRitiro").attr("disabled", true);
					$("#note").val( list[0].note ) ;
					
					if(list[0].statoSpedizioneTypeId != 100) {
						$("#statoSpedizione").attr("disabled", true);
						$("#aggiorna").attr("disabled", true);
						$("#note").attr("disabled", true);
					}
					else{
						$("#statoSpedizione").attr("disabled", false);
						$("#aggiorna").attr("disabled", false);
						$("#note").attr("disabled", false);
					}
					window[callback].call() ;
				}
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