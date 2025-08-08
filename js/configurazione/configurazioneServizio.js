var table=null;
$(document).ready(function() {
	/*table = $('#tableConfigServ').DataTable({
	      "searching":  	false,
			"columnDefs" : [ {
				"targets" : 0,			
				"sortable" : false
			} ],
			select: {
	          style: 'single',
	          selector: 'td:not(:last-child)'
	      },
			"language": {
	          "lengthMenu": "Mostra _MENU_ record per pagina",
	          "zeroRecords": "Non sono stati trovati record",
	          "info": "Mostra pagina _PAGE_ di _PAGES_",
	          "infoEmpty": "",
	          "infoFiltered": "(Filtrati da _MAX_ record totali)",
	          "search": "Ricerca:",
	          "paginate": {
	              "first":      "Primo",
	              "last":       "Ultimo",
	              "next":       "Prossimo",
	              "previous":   "Precedente"
	          }
	      }
			
		});*/
	
	
	loadListaClienti();
	loadListaServizi();
	
	
	$("#cercaServizio").click(function() {
		findConfigServizio();
	});

	$("#aggiungiServizio").click(function() {
		openModalAggiungi();
	});
	$("#confermaBtn").click(function() {
		var cs=$("#codServizio").val();
		deleteServizio(cs);
	});
	
	
	
	
	
	

	$( "#ricercaServizi" ).prop( "disabled", true );
	
	function loadListaClienti() {
    	
//		$( "#ricercaServizi" ).prop( "disabled", true );
    	$("#ricercaClienti").empty();
    	showLoaderLst(true,"Attendere! Caricamento lista clienti in corso...");
    	//var url = contextPath + '/' + 'spedizione' + '/getComboClienti';
    	var url = contextPath + '/common/getComboClienti';
    	$.ajax({
    		type : 'GET',
    		url : url,
    		success : function(data) {
    			var lst = data.data;
    			console.log("lengt: " +lst.length);
    			if(lst.length < 1){
//    				disableInputPartial();
    				alert("Nessun servizio associato all'utente selezionato.");
    			}else{
//    				$("#ricercaClienti").append("<option value=''> -- Seleziona un cliente -- </option>");
	    			$("#clienti").append("<option value='-1'>Tutti</option>");
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#clienti").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
//	    			$( "#ricercaServizi" ).prop( "disabled", false );
    			}
    			showLoaderLst(false,'');
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
	
	
	function showLoaderLst(show,message){
		$("#loadFields").text(message);
		$("#loadFields").attr("style",((show)?"display:''":"display:none"));
	}
	
	
    $( "#clienti" ).change(function() {
    	var valueTutti = $( "#clienti" ).val();
    	if (valueTutti == '-1') {
    		$('input[type="checkbox"]').prop( "disabled", false );
		}else{
			$('input[type="checkbox"]').prop( "disabled", true );
			$('input[type="checkbox"]').prop('checked', false);
		}
    });
	
	
    function findConfigServizio(){
		console.log('findConfigServizio start');
		var url = contextPath + '/' + 'configurazione/configurazioneServizio' + '/listaServizi';
		
		var idCliente = $( "#clienti" ).val();
//		alert(idCliente);
		
//		var idPostaDescritta = -1;
//		if ($( "#servizio_1" ).is( ":checked" )) {
//			idPostaDescritta = $("#servizio_1").val();
//    	}
//		
//		var idPostaIndescritta = -1;
//		if ($( "#servizio_2" ).is( ":checked" )) {
//			idPostaIndescritta = $("#servizio_2").val();
//    	}
		
		var listaServizi=[];
		$('#listaCheckboxServizi').children().each(function () {
			$(this).children('input').each(function() { 
				if ($(this).is(":checked")){
					//var idServizio = $(this).val();
					//var codServizio = $(this).attr("id");
//					listaServizi.push($(this).val());
					var servizio = {"idServizio": $(this).val(), "codServizio": $(this).attr("id"), "flagAttivo": true};
					listaServizi.push(servizio);
//					console.log("idServizio=" + idServizio);
				}
			})
		})
		
		console.log('configurazioneServizio '+url);
		var codiceServizio = $('#codiceServizio').val();
		console.log('codiceServizio:',codiceServizio);
		table.clear().draw(false);
//		var requestRicercaServ = { "data":{"idCliente": idCliente, "idPostaDescritta": idPostaDescritta , "idPostaIndescritta": idPostaIndescritta}};
		var requestRicercaServ = { "data":{"idCliente": idCliente, "listaServizi": listaServizi}};
			$.ajax({
				type : 'POST',
				url : url,
				contentType : 'application/json',
				dataType : 'json',
				data : JSON.stringify(requestRicercaServ),
				success : function(result) {
					console.log('success! ', result);
					console.log('success! ', result.data.dataTable);
					if(result.status){
						table.rows.add(result.data.dataTable).draw(false);
//						var lstServizi =result.data.dataTable;
//						for(var i=0; i<lstServizi.length; i++){
//							addServizioObj(lstServizi[i]);
//							console.log('lstServizi[i]! ', lstServizi[i]);
//						}
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
});
	
	
function addServizioObj(objServizio){
	var button=null;
	buttons = "<button class='glyphicon glyphicon-edit' title='Modifica Servizio' onclick= \"openModalModifica('"+objServizio.codiceServizio+"','" + objServizio.descrizione +"')\"></button>"+
			  "<button class='glyphicon glyphicon-remove' title='Delete Servizio' onclick=\"confirmDialogBoot('"+objServizio.codiceServizio+"')\"></button>";

	 var PI = '';
	 var PD = '';
	 if(objServizio.PI == 'true') PI = 'Attivo'; else PI = 'Non Attivo';
	 if(objServizio.PD == 'true') PD = 'Attivo'; else PD = 'Non Attivo';
	
	
	
		
//	table.row.add( [
//	      objServizio.DESCRIZIONE_CLIENTE,
//	      objServizio.ATTI_GIUDIZIARI,
//	      objServizio.MESSO_NOTIFICATORE,
//	      objServizio.RACCOMANDATE,
//	      buttons
//	 ] ).draw(false);
	
	table.row.add( [
	      objServizio.DESCRIZIONE_CLIENTE,
	      PD, PI
	 ] ).draw(false);
}
	
	

$( "#ricercaServizi" ).prop( "disabled", true );


function openModalAggiungi(){
	$("#tipo").val("ADD");
	$("#codice_servizio").removeAttr('readonly');
    $("#codice_servizio").val("");
    $("#descrizione_servizio").val("");
	$("#configurazioneServizioModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneServizioModal").modal('show');
}

function openModalModifica(codiceServizio,descrizioneServizio){	
	$("#tipo").val("MOD");
	$("#codice_servizio").val(codiceServizio);
	$("#codice_servizio").attr('readonly', 'readonly');  //.removeAttr('readonly');
	$("#descrizione_servizio").val(descrizioneServizio);
	$("#configurazioneServizioModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneServizioModal").modal('show');
}

function deleteServizio(codiceServizio){
	var url = contextPath + '/' + 'configurazione/configurazioneServizio' + '/deleteServizio';
	
//	var codiceServizio = $("#codice_servizio").val();

	console.log('codiceServizio:',codiceServizio);

	var requestDeleteService = { "data":{"codiceServizio": codiceServizio}};
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDeleteService),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					$("#confirmDialogModal").modal('hide');
					findConfigServizio();
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
//configurazioneServizio/getListaServizi
function loadListaServizi() {
	var url = contextPath + '/' + 'configurazione/configurazioneServizio' + '/getListaServizi';
	var div;
	$.ajax({
		type : 'GET',
		url : url,
		success : function(data) {
			var lst = data.data;
			if(lst.length < 1){
				alert("Nessun Servizio trovato.");
			}else{
				drawListaCheckboxServizi(lst);
				drawTabellaServizi(lst);
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

function drawListaCheckboxServizi(lst){
	var div;
	for (var i = 0; i < lst.length; i++) {
		var obj = lst[i];
		div  = "<div class=\"col-lg-12 col-md-6\">" + 
		"	<input type=\"checkbox\" " +
				"name=\"checkbox_servizi\" " +
				" value="+ obj.idServizio +
				" id=\"" + obj.codiceServizio + "\">" +
		"	<label class=\"btn btn-link\">" + obj.nomeServizio + " </label>" + 
		"</div>";
		$("#listaCheckboxServizi").append(div);
	}
}

function drawTabellaServizi(lst){
	
	var columns=[];
	columns.push({data:"cliente", title :"Cliente", width:200});
	
	for (var i = 0; i < lst.length; i++) {
		var obj = lst[i];
//		columns.push({data: obj.value, title: obj.descrizione});//se preso da oggetto tipo combo
		columns.push({data: obj.codiceServizio, title: obj.nomeServizio,
			defaultContent:"Non attivo",
			width: 100, 
			render: function ( data, type, row, meta ) {
	          if (data==true) return "Attivo"; else return "Non attivo";
			}
		});
	}
	
	table = $('#tableConfigServ').DataTable({
		"searching":  	false,
		scrollX: true,
		scrollCollapse: true,
		fixedColumns: true,
		columns: columns,
		select: {
			style: 'single',
			selector: 'td:not(:last-child)'
		},
		"language": {
			"lengthMenu": "Mostra _MENU_ record per pagina",
			"zeroRecords	": "Non sono stati trovati record",
		"info": "Mostra pagina _PAGE_ di _PAGES_",
		"infoEmpty": "",
		"infoFiltered": "(Filtrati da _MAX_ record totali)",
		"search": "Ricerca:",
		"paginate": {
			"first":      "Primo",
			"last":       "Ultimo",
			"next":       "Prossimo",
			"previous":   "Precedente"
			}
		}

	});
}
