var table=null;
$(document).ready(function () {
	
	resetTableAndInput();
	
//	if($('input[name="descprofilo"]').val()==="Supervisore"){
//		loadLstCentriDemat('centroDemat');		
//	}	
	
	function getCentroDemat(){
		var centroDemat;
		$("#centroDemat").val()==null ? centroDemat=$('input[name="centrodemat"]').val() : centroDemat=$("#centroDemat").val();
		return centroDemat;
	}
	
	$('#divDataDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	
	String.prototype.replaceAll = function(target, replacement) {
		  return this.split(target).join(replacement);
	};
	
	$('#Cerca').click(function () {
		getTable();
	});
	
	
	$("#reset").click(function () {
		resetTableAndInput();	    
	 });
	
	$("#cbox_PresoInCarico").prop("checked", true);
	getTable();




function resetTableAndInput() {
	$(".bootstrap-table").hide(500);	
//	$("#tableDispacci").hide(500);	
	$("#tableDispacci").bootstrapTable();	
    $('input:checkbox').prop("checked", false);
    $('input:text').val('');
    $("#selectTipoData").val("1");
    
 }

function getTable(){
	waitingDialog.show('Ricerca in corso...');

	
	$(".bootstrap-table").show(500);	
	$("#tableDispacci").show(500);	
	$("#tableDispacci").bootstrapTable('destroy');
	$("#tableDispacci thead tr").html('');
//	$("#tableDispacci").bootstrapTable();
	
	
	var idCentroDemat = getCentroDemat();
	var dataInizio = $("#dataDa").val();
	var dataFine= $("#dataA").val();
	var idTipoData= $("#selectTipoData").val();
	var codiceDispaccio = $("#codiceDispaccio").val();
	

	var cbox_Pronto = "";
	if ($("#cbox_Pronto").is(":checked")) {
		cbox_Pronto = $("#cbox_Pronto").val();
	}
	
	var cbox_Preaccettato = "";
	if ($("#cbox_Preaccettato").is(":checked")) {
		cbox_Preaccettato = $("#cbox_Preaccettato").val();
	}
	
	var cbox_PresoInCarico = "";
	if ($("#cbox_PresoInCarico").is(":checked")) {
		cbox_PresoInCarico = $("#cbox_PresoInCarico").val();
	}
	
	var request = {"data": { "stato_pronto":  cbox_Pronto , "stato_preaccettato": cbox_Preaccettato , "stato_presaInCarico": cbox_PresoInCarico ,  
			"codiceDispaccio": codiceDispaccio , "dataInizio": dataInizio , "dataFine": dataFine , "tipoData" : idTipoData, "idCentroDemat" : idCentroDemat }} ;

	url = contextPath + '/dispacci/getLstDispacci';
	
	console.log("dataJson: " +  request );
	console.log("url: " + url);
	
	
	console.log("ajax");
	$.ajax({
		type: 'POST',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(request),
		success : function(result) {
			console.log("success!" );
			if(result.status){
				
				var checkDataEmpty = result.data;
				if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
					alert("Nessun Dispaccio trovato!");
					return ;
				}
				
//				$('#dettaglioScatolaModal').modal('show');
//				addEventToStampaButton(idScatola, tipoScatola);//button stampa contenuto 
				var listData = result.data.rowContent;
				var listColonne = result.data.columnHeader;
				
				var tr;
				var arrayColumn = [];
				for(var i in listColonne){
				    var sequenceColumns = i; ///000,0001 ...
				    var valore = listColonne[sequenceColumns];
				    	
				    var tr_temp;
				        $.each(valore, function(index, value) {
					    	var columnDataField = index;
					    	var columnTitle = value;
					    	tr_temp = "<th data-field=\"" + columnDataField + "\" data-sortable=\"true\">" + columnTitle + "</th>";
					    	console.log(tr_temp);
				        });
				        tr = tr + tr_temp.toString();
				}
				
				$("#tableDispacci thead tr").append(tr);
				if( listData ) {
					$("#tableDispacci").bootstrapTable({
						data: listData});
				}
					
			}else{
				alert("Errore richiesta!");
			}
			
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
	
	waitingDialog.hide();
}

$("#esportaCSV").click(function() {
	console.log('esportaCSV');
	
	
	var idCentroDemat = getCentroDemat();
	var dataInizio = $("#dataDa").val();
	var dataFine= $("#dataA").val();
	var idTipoData= $("#selectTipoData").val();
	var codiceDispaccio = $("#codiceDispaccio").val();
	

	var cbox_Pronto = "";
	if ($("#cbox_Pronto").is(":checked")) {
		cbox_Pronto = $("#cbox_Pronto").val();
	}
	
	var cbox_Preaccettato = "";
	if ($("#cbox_Preaccettato").is(":checked")) {
		cbox_Preaccettato = $("#cbox_Preaccettato").val();
	}
	
	var cbox_PresoInCarico = "";
	if ($("#cbox_PresoInCarico").is(":checked")) {
		cbox_PresoInCarico = $("#cbox_PresoInCarico").val();
	}
	
	var request = {"data": { "stato_pronto":  cbox_Pronto , "stato_preaccettato": cbox_Preaccettato , "stato_presaInCarico": cbox_PresoInCarico ,  
			"codiceDispaccio": codiceDispaccio , "dataInizio": dataInizio , "dataFine": dataFine , "tipoData" : idTipoData, "idCentroDemat" : idCentroDemat }} ;

	url = contextPath + '/dispacci/getLstDispacci';
	
	console.log("dataJson: " +  request );
	console.log("url: " + url);
	
	
	console.log("ajax");
	$.ajax({
		type: 'POST',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(request),
		success : function(result) {
			console.log("success!" );
			if(result.status){
				
				var checkDataEmpty = result.data;
				if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
					alert("Nessun Dispaccio trovato!");
					return ;
				}
				
				var listData = result.data.rowContent;
				
				console.log("listData: "+listData);
				var listColonne = result.data.columnHeader;
				console.log("listCOLONNE: "+listColonne);
				
				csv= '"'+'CODICE_DISPACCIO'+'"'+';'+'"'+'STATO_DISPACCIO'+'"'+';'+'"'+'EX_SOSPESO'+'"'+ ';'+ '"'+'DATA_CREAZIONE'+'"'+';'+'"'+'DATA_PREACCETTAZIONE'+'"'+';'+ '"'+'DATA_PRESA_IN_CARICO'+'"';
			
				for(i=0; i< listData.length; i++){
					row =  listData[i];
					
					csvrow ='"' + row.CODICE_DISPACCIO + '"' + ' ;' +
	    		    '"' + row.STATO_DISPACCIO + '"'+ ' ;'+ '"'  + row.EX_SOSPESO + '"'+';'+'"' + row.DATA_CREAZIONE + '"' + ' ;' +
	    		    '"' + row.DATA_PREACCETTAZIONE + '"'+ ' ;'+ '"'  + row.DATA_PRESA_IN_CARICO + '"';
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
				alert("Errore richiesta!");
			}
			
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

});

});
