var table=null;
$(document).ready(function() {
	table = $('#tableConfigCd').DataTable({
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
			
		});
//	if($('input[name="descprofilo"]').val()=="Supervisore"){
//		loadLstCentriDematCodCentro('codiceCentro');
//	}
	$("#cercaCentro").click(function() {
		waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'warning'});
		findConfigCentriDemat();
	});

	$("#aggiungiCentro").click(function() {
		openModalAggiungi();
	});
	
	
});


function findConfigCentriDemat(){
	console.log('findConfigCentriDemat start');
	var url = contextPath + '/' + 'configurazione/configurazioneCentriDemat' + '/listaCentriDemat';
	console.log('configurazioneCentriDemat '+url);
	
	var centroDemat = 0;
	var codiceCentro = $('#codiceCentro').val();
	
	console.log('centroDemat:',centroDemat);
	table.clear().draw(false);
	var requestConfigCentroDemat = { "data":{"centroDemat": centroDemat,"codiceCentro": codiceCentro}};
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestConfigCentroDemat),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				if(result.status){
					var lstCentroDemat =result.data;
					for(var i=0; i<lstCentroDemat.length; i++){
						addCentroObj(lstCentroDemat[i]);
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

function addCentroObj(objCentro){
	var button=null;
	button = "<button class='glyphicon glyphicon-edit' title='Modifica Centro' onclick= \"openModalModifica('"+objCentro.idCentroDemat+
				"','" +objCentro.codiceCentro+ "','" +objCentro.department+ "','" + objCentro.descrizioneCentro+ "','" +
				objCentro.localita+
				"')\"></button>";

	table.row.add( [
	      objCentro.idCentroDemat,
	      objCentro.codiceCentro,
	      objCentro.descrizioneCentro,
	      objCentro.localita,
              objCentro.department,
	      button
	 ] ).draw(false);
}

function openModalAggiungi(){

	$("#tipo").val("ADD");
    
	$("#codiceCentroModal").val("");
    $("#departmentModal").val("");
    $("#descrizioneModal").val("");
    $("#localitaModal").val("");
    
	$("#configurazioneCentroDematModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneCentroDematModal").modal('show');
}

function openModalModifica(idCentro,codiceCentro,department,descrizione,localita){	
	$("#tipo").val("MOD");
	
	$("#idCentro").val(checkVar(idCentro));
	$("#codiceCentroModal").val(checkVar(codiceCentro));
    $("#departmentModal").val(checkVar(department));
    $("#descrizioneModal").val(descrizione);
    $("#localitaModal").val(checkVar(localita));

    $("#configurazioneCentroDematModal").modal({backdrop: 'static', keyboard: false});
	$("#configurazioneCentroDematModal").modal('show');
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