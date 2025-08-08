var table=null;


$(document).ready(function() {

	table = $('#tableListaDistinta').DataTable({
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : false,
			"searchable" : false
		} ],
		"scrollX": true,
		"bFilter": false,
		"language": {
            "lengthMenu": "Mostra _MENU_ record per pagina",
            "zeroRecords": "Non sono stati trovati record",
            "info": "",
            "infoEmpty":"",
            "infoFiltered": "(Filtrati da _MAX_ record totali)",
            "paginate": {
                "first":      "Primo",
                "last":       "Ultimo",
                "next":       "Prossimo",
                "previous":   "Precedente"
            }
        }
		
	});
	
	$("#aggiornaPicking").click(function() {
//		waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'warning'});
		findListaDistinta();
	});
	findListaDistinta();

});


function findListaDistinta(){

	console.log('findListaDistinta start');
	var url = contextPath + '/'+'gestione'  + '/getListaDistintaPerIlRecupero';
	console.log('ListaDistinta : '+url);
	table.clear().draw(false);
//	var requestDocumentiAnomali = { "data":{"codicePicking":codicePicking}};
	
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
//			data : JSON.stringify(requestDocumentiAnomali),
			data : null,
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);

				if(result.status){
					var lstDistinta =result.data.listDistinta
					for(var i=0; i<lstDistinta.length; i++){
						addDistintaObj(lstDistinta[i]);
						
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
	$("#esportaCSV").click(function() {
		console.log('esportaCSV'); 
		$(".bootstrap-table").show(500);	

		var uri = contextPath + '/'+'gestione'  + '/getListaDistintaPerIlRecupero';
		$.ajax({
			type: 'GET',
	        url: uri,
			success : function(result) {

					csv = '"'+'Codice Picking'+'"'+' ;'+'"'+'Anomalie Sanabili'+'"'+' ;'+'"'+ 'Anomalie non sanabili'+'"';
					var lstDistinta =result.data.listDistinta
					console.log(lstDistinta);
					for(i = 0; i < lstDistinta.length; i++) {
						row = lstDistinta[i];
						
					
				    		csvrow ='"' + row["codicePicking"] + '"' + ' ;' +
				    		    '"' + row["anomalieSanabili"] + '"'+ ' ;'+ '"'  + row["anomalieNonSanabili"]  + '"';
				    		csv = csv + '\n' + csvrow;
				    		
				    		console.log(csv)
					}
					var downloadLink = document.createElement("a");
			        downloadLink.href = "data:text/csv," + encodeURIComponent(csv);
			        downloadLink.download = "data.csv";

			        document.body.appendChild(downloadLink);
			        downloadLink.click();
			        document.body.removeChild(downloadLink);
			}
		});
					

	});
}



//
//function initViewValues(){
//	$('#codiceScatolaSanabili').val(codiceScatolaSanabili);
//	$('#codiceScatolaNonSanabili').val(codiceScatolaNonSanabili);
//	$('#documentiScatolaSanabili').val(documentiScatolaSanabili);
//	$('#documentiScatolaNonSanabili').val(documentiScatolaSanabili);
//	$('#documentiSelezionatiSanabili').val(documentiScatolaSanabili);
//	$('#documentiSelezionatiNonSanabili').val(documentiScatolaNonSanabili);
//}
function addDistintaObj(objDocumenti){
	buttonV = "<button class='glyphicon glyphicon-edit' title='Visualizza picking' onclick= \"stampaListaDistintaPerIlRecupero('"+objDocumenti.codicePicking+
	"')\"></button>";
	buttonS = "<button class='glyphicon glyphicon-edit' title='Stampa picking' onclick= \"loadingModalStampa('"+objDocumenti.codicePicking+
	"')\"></button>";
	table.row.add( [
	checkVar(objDocumenti.codicePicking),
		  checkVar(objDocumenti.codicePicking),
		  checkVar(objDocumenti.anomalieSanabili),
	      checkVar(objDocumenti.anomalieNonSanabili),
	      buttonV

	 ] ).draw(false);

}

function loadingModalVisualizza(codicePicking){	
	$("#stampaDistintaPerIlRecupero").modal({backdrop: 'static', keyboard: false});
	$("#stampaDistintaPerIlRecupero").modal('show');
	aggiornaPicking(codicePicking);
	
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


function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}

 function stampaListaDistintaPerIlRecupero (codicePicking ){
		console.log("sono il picking"+codicePicking);
		var url = contextPath + '/gestione/listaDistintaPerIlRecuperoPdf?codicePicking='+codicePicking;
    	console.log(url);
    	window.open(url);
    	
}
    

