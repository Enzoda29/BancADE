var table=null;
$(document).ready(function() {
	table = $('#tableConfigCd').DataTable({

      "searching":  	false,
		"columnDefs" : [ {
			"targets" : 3,			
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
		
	});
	
	$("#cercaAnagrafica").click(function() {
		findConfigAnagrafica();
	});

	$("#aggiungiAnagrafica").click(function() {
		resetModalAggiungi();
		openModalAggiungi();
	});
	
	
	$("#identificativo" ).keypress(function() {
//		upperCaseF(this)
		$('#identificativo').typeahead({   	
			source: function(query, result) {
				var quesryValue = $("#identificativo").val();
				console.log("query = " +quesryValue);
				var uri = contextPath + '/' + 'common/getClientiAutocomplete';
				console.log("uri = " +uri);
				$.ajax({
					url: uri,
					method: "POST",
					data: { 
						"query": quesryValue,
					},
					dataType: "json",
					success: function(data) {
						var array = data.data;
						var arrayReturn = [];
						array.forEach(function(element) {
							  console.log(element.descrizione);
							  arrayReturn.push(element.descrizione);
							});
						return result(arrayReturn);
					}
				})
			},
			minLength: 3
			});
		});
	
	$("#esportaCSV").click(function() {
		console.log('esportaCSV');   
		var url = contextPath + '/' + 'configurazione/AnagraficaClienti/listaAnagraficaClienti';
		
		var code = $('#codiceCliente').val();
		var identificativo = $('#identificativo').val();
		var descrizione = $('#descrizione').val();

	//	table.clear().draw(false);
		var requestConfigAnagCli = '{ "data":{"codiceCliente": ' + code + ',"identificativo": ' + identificativo + ',"descrizione": ' + descrizione +'}}';
		var requestGET = '?codiceCliente=' + code + '&identificativo=' + identificativo + '&descrizione=' + descrizione;
		
		$.ajax({
			type : 'POST',
			url : url+requestGET,
			contentType : 'application/json',
			dataType : 'json',
			data : "",
			success : function(result) {
				console.log('success! ');				
				if(result.status){
					var lstAnagrafica = result.data;
					csv= '"'+'Codice Cliente'+'"'+';'+'"'+'Identificativo Cliente'+'"'+';'+'"'+'Descrizione'+'"';
					console.log('lengt:  ' + lstAnagrafica.length);	
					for(var i=0; i<lstAnagrafica.length; i++){
						console.log("sono descrizione: "+lstAnagrafica[i].descrizioneCliente)
						console.log("sono codice"+lstAnagrafica[i].codiceCliente)
						console.log("sono id:"+lstAnagrafica[i].identificativoCliente)
						
						addAnagraficaObj(lstAnagrafica[i]);
						
						row= lstAnagrafica[i];
						console.log("sono console "+row);
			    		console.log(row.codiceCliente);
			    		console.log(row.identificativoCliente);
			    		console.log(row.descrizioneCliente);
						
			    		csvrow ='"' + row.codiceCliente + '"' + ' ;' +
		    		    '"' + row.identificativoCliente + '"'+ ' ;'+ '"'  + row.identificativoCliente + '"';
						console.log(csvrow)
			    		
			    		csv = csv + '\n' + csvrow;
			    		
			    		console.log(csv)
					}
					var downloadLink = document.createElement("a");
			        downloadLink.href = "data:text/csv," + encodeURIComponent(csv);
			        downloadLink.download = "data.csv";

			        document.body.appendChild(downloadLink);
			        downloadLink.click();
			        document.body.removeChild(downloadLink)
			        
				}else{
//					$('#azione').hide();
					$('#div_error_alert').show();
					$('#danger_msg').text(result.message);
				}
				
			},
			error : function(xhr, status, error, result) {
				alert("nessun cliente trovato");
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
//				$('#azione').hide();

			}
	
	
	
});

	});
		
	
	
	
});


function findConfigAnagrafica(){
	console.log('findConfigAnagrafica start');
	var url = contextPath + '/' + 'configurazione/AnagraficaClienti/listaAnagraficaClienti';
	
	
	var code = $('#codiceCliente').val();
	var identificativo = $('#identificativo').val();
	var descrizione = $('#descrizione').val();

	table.clear().draw(false);
	var requestConfigAnagCli = '{ "data":{"codiceCliente": ' + code + ',"identificativo": ' + identificativo + ',"descrizione": ' + descrizione +'}}';
	var requestGET = '?codiceCliente=' + code + '&identificativo=' + identificativo + '&descrizione=' + descrizione;
	
	$.ajax({
			type : 'POST',
			url : url+requestGET,
			contentType : 'application/json',
			dataType : 'json',
			data : "",
			success : function(result) {
				console.log('success! ');				
				if(result.status){
					var lstAnagrafica = result.data;
					console.log('lengt:  ' + lstAnagrafica.length);	
					for(var i=0; i<lstAnagrafica.length; i++){
						console.log("-->"+lstAnagrafica[i].descrizioneCliente)
						addAnagraficaObj(lstAnagrafica[i]);
						
					}
				}else{
//					$('#azione').hide();
					$('#div_error_alert').show();
					$('#danger_msg').text(result.message);
				}
				
			},
			error : function(xhr, status, error, result) {
				alert("nessun cliente trovato");
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
//				$('#azione').hide();

			}
		});
	
}


	
	
	
	
	
	
	
	
function addAnagraficaObj(objAnagrafica){
	var button=null;
	buttons = "<button class='glyphicon glyphicon-edit' title='Modifica Anagrafica' onclick= \"openModalModifica('"+objAnagrafica.id+ 
	"','" +objAnagrafica.codiceCliente + "','" + objAnagrafica.identificativoCliente + "','" + objAnagrafica.descrizioneCliente +"')\"></button>"

	$("#tipo").val("UPDATE");	
	$("#azione").text("Aggiorna");	
	
	var x = JSON.stringify(objAnagrafica);
	console.log(x);
	table.row.add( [
		  objAnagrafica.codiceCliente,
		  objAnagrafica.identificativoCliente,
          objAnagrafica.descrizioneCliente,
	      buttons
	 ] ).draw(true);
}

function openModalAggiungi(){
	
	$("#tipo").val("ADD");
    
	$("#codiceModal").val("");
    $("#identificativoModal").val("");
    $("#descrizioneModal").val("");
    
	$("#configurazioneAnagraficaCliModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneAnagraficaCliModal").modal('show');

}

function openModalModifica(id ,codiceCliente , identificativoCliente, descrizioneCliente ){	

	resetModalAggiorna();
	$("#tipo").val("UPDATE");
	
    $("#configurazioneAnagraficaCliModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneAnagraficaCliModal").modal('show');
	$("#idAnagr").val(checkVar(id));
	$("#codiceModal").prop("readonly", true);
	$("#codiceModal").val(checkVar(codiceCliente));
	$("#identificativoModal").prop("readonly", true);
	$("#identificativoModal").val(checkVar(identificativoCliente));
	$("#descrizioneModal").val(checkVar(descrizioneCliente));
}

function checkVar(variabile){
	if (typeof(variabile) === 'undefined' || variabile === null || variabile === 'null')
	{
	    return "";
	}
	else
		return variabile;
}

function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}


function resetModalAggiungi(){
	$('#titoloModal').text("Aggiungi nuovo cliente:");
	
	$('#codiceModal').text("");
	$('#identificativoModal').val("");
	$('#descrizioneModal').val("");
	
	$('#azione').show();
	$('#azione').text("Aggiungi cliente");
	
	$('#modalMessage #danger_msg').text("");
	$('#modalMessage #div_error_alert').hide();
	$('#modalMessage #div_success_alert').hide();
	
	$("#codiceModal").prop("readonly", false);
	$("#identificativoModal").prop("readonly", false);
}

function resetModalAggiorna(){
	$('#titoloModal').text("Modifica cliente:");
	
	$('#codiceModal').text("");
	$('#identificativoModal').val("");
	$('#descrizioneModal').val("");
	
	$('#azione').show();
	$('#azione').text("Modifica cliente");
	
	$('#modalMessage #danger_msg').text("");
	$('#modalMessage #div_error_alert').hide();
	$('#modalMessage #div_success_alert').hide();
	
	$("#codiceModal").prop("readonly", false);
	$("#identificativoModal").prop("readonly", false);
}