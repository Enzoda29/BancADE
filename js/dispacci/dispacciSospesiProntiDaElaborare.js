$(document).ready(function () {

	caricaTabell();
	
	function getCentroDemat(){
		var centroDemat;
		$("#centroDemat").val()==null ? centroDemat=$('input[name="centrodemat"]').val() : centroDemat=$("#centroDemat").val();
		return centroDemat;
	}
	
$('#ricaricaTabella').click(function () {
		
	caricaTabell();
	
});

$("#esportaCSV").click(function() {
	console.log('esportaCSV');
	
	
	var idCentroDemat = getCentroDemat();
	var request = {"data": { "idCentroDemat":  idCentroDemat }} ;

	url = contextPath + '/dispacci/getLstDispacciSospProntiDaElabo';
	
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
				csv= '"'+'DISPACCIO SOSPESO ID'+'"'+';'+'"'+'CODICE DISPACCIO'+'"'+';'+'"'+'DATA PREACCETTAZIONE'+'"'+ ';'+ '"'+'DATA RICEZIONE TRK'+'"';
				var checkDataEmpty = result.data;
				if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
					alert("Nessun Dispaccio trovato!");
					return ;
				}
				var jsonData_temp = result.data.jsonDataTable;
				var jsonData = JSON.parse(jsonData_temp);
			
				for(i = 0; i < jsonData.rows.length; i++) {
						
			    		row = jsonData.rows [i];
			    		console.log("SONO NEL FOR")
			    		console.log(row)
			    		
			    		csvrow ='"' + row["DISPACCIO_SOSPESO_ID"] + '"' + ' ;' +
			    		    '"' + row["CODICE_DISPACCIO"] + '"'+ ' ;'+ '"'  + row["DATA_REGISTRAZIONE"] + '"' + ' ;'+ '"' + row["DATA_RICEZIONE_DISPACCIO"] + '"' + ' ;' +
			    		    '"';
			    		console.log(csvrow)
			    		
			    		csv = csv + '\n' + csvrow;
			    		
			    		console.log(csv)
			    		
			    	}
				var downloadLink = document.createElement("a");
		        downloadLink.href = "data:text/csv," + encodeURIComponent(csv);
		        downloadLink.download = "data.csv";

		        document.body.appendChild(downloadLink);
		        downloadLink.click();
		        document.body.removeChild(downloadLink);

				
				waitingDialog.show('Ricerca in corso...');
		    	setTimeout(function () {
		    		$("#tableDispacci").bootstrapTable( 'load' , jsonData );

		    	  waitingDialog.hide();
		    	}, 1200);
					
			}else{
				alert("Nessun dispaccio trovato!");
			}
			
		},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,error);
			}
		});
		
	
	
	
});

function caricaTabell(){
	$(".bootstrap-table").show(500);	
	$("#tableDispacci").show(500);	
//	$("#tableDispacci").bootstrapTable('destroy');
//	$("#tableDispacci thead tr").html('');
//	$("#tableDispacci").bootstrapTable();
	
	
	var idCentroDemat = getCentroDemat();
	var request = {"data": { "idCentroDemat":  idCentroDemat }} ;

	url = contextPath + '/dispacci/getLstDispacciSospProntiDaElabo';
	
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
				var jsonData_temp = result.data.jsonDataTable;
				var jsonData = JSON.parse(jsonData_temp);
				console.log(result.data.jsonDataTable);
				console.log(jsonData_temp);
				console.log(jsonData);
//				alert(jsonData);
				var listColonne = result.data.value.intestazioneColonne;
				
				var tr;
//				 console("inizo tr append");
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
				
//				$("#tableDispacci thead tr").append(tr);
//				$("#tableDispacci").bootstrapTable( 'load' , jsonData );
				
				waitingDialog.show('Ricerca in corso...');
		    	setTimeout(function () {
//		    		$("#tableDispacci").show(1000);
//		    		$('#tableDispacci').bootstrapTable('selectPage', 1);
//		    		$('#tableDispacci').bootstrapTable( {
//		    			data: result.data.jsonDataTable
		    		$("#tableDispacci").bootstrapTable( 'load' , jsonData );
//		    		});	
		    	  waitingDialog.hide();
		    	}, 1200);
					
			}
			else{
				alert("Nessun dispaccio trovato!");
			}
			
		},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,error);
			}
		});
		
	}
	
	
	$("#reset").click(function () {
		resetTableAndInput();	    
	 });
	
});


function resetTableAndInput() {
	$(".bootstrap-table").hide(500);	
//	$("#tableDispacci").hide(500);	
	$("#tableDispacci").bootstrapTable();	
    $('input:checkbox').prop("checked", false);
    $('input:text').val('');
    $("#selectTipoData").val("1");
    
 }

