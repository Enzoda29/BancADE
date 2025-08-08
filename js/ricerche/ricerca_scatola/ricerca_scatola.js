var table=null;
$(document).ready(function () {
	
	$("#tableScatola").hide();	
//	loadLstIdentificativoPA("identificativoPA",0); //function in head.jsp
//	loadLstTipIstanza("codiceTipoIstanza",0);
	if($('input[name="descprofilo"]').val()==="Supervisore"){
//		loadLstCentriDemat('centroDemat');		
	}	
	
	$('#divDataCreazDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCreazA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	
	$('#divDataDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	


	var currentCentroDemat = $('input[name="centrodemat"]').val();
	getAllCentroDemat('listCentroDemat', currentCentroDemat, false);

	//ricerca cliente
	$("#identificativoCliente" ).keypress(function() {
	$('#identificativoCliente').typeahead({   	
		source: function(query, result) {
			var quesryValue = $("#identificativoCliente").val();
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
					console.log('success! ', data.data.descrizione);
					var array = data.data;
					var arrayReturn = [];
					array.forEach(function(element) {
						  console.log(element.descrizione);
						  arrayReturn.push(element.descrizione);
						});
					console.log(arrayReturn);
					return result(arrayReturn);
				}
			})
		},
		minLength: 2
		});
	});

	//button ricerca scatole 
    $("#Cerca").click(function () {
    	$(".bootstrap-table").show(500);	
    	console.log('ricercaScatola start');
    	var id_tipo_MaterialitaConforme = "";
    	if ($( "#cboxTipo_MaterialitaConforme" ).is( ":checked" )) {
    			id_tipo_MaterialitaConforme =	$("#cboxTipo_MaterialitaConforme").val();
    	}
    	var id_tipo_MaterialitaNonConforme = "";
    	if ($( "#cboxTipo_MaterialitaNonConforme" ).is( ":checked" )) {
    		id_tipo_MaterialitaNonConforme = $("#cboxTipo_MaterialitaNonConforme").val();
    	}
    	
    	var id_tipo_AnomalieNonSanabili = "";
    	if ($( "#cboxTipo_AnomalieNonSanabili" ).is( ":checked" )) {
    		id_tipo_AnomalieNonSanabili = $("#cboxTipo_AnomalieNonSanabili").val();
    	}
    	
    	var id_tipo_AnomalieSanabili  = "";
    	if ($( "#cboxTipo_AnomalieSanabili" ).is( ":checked" )) {
    		id_tipo_AnomalieSanabili = $("#cboxTipo_AnomalieSanabili").val();
    	}
    	
    	var id_tipo_AnomaliaNonConforme = "";
    	if ($( "#cboxTipo_AnomaliaNonConforme" ).is( ":checked" )) {
    		id_tipo_AnomaliaNonConforme = $("#cboxTipo_AnomaliaNonConforme").val();
    	}
    	
    	var id_tipo_PostaIndescritta = "";
    	if ($( "#cboxTipo_PostaIndescritta" ).is( ":checked" )) {
    		id_tipo_PostaIndescritta = $("#cboxTipo_PostaIndescritta").val();
    	}
    	
    	//stato
    	var filtriStatiSelected="&list_id_stati_select=";
        $('#filtriPerStatoCombo :selected').each(function(){
        	filtriStatiSelected+=$(this).val()+"-";
        });

    	var identificativoCliente = $("#identificativoCliente").val();
    	var codiceScatola = $("#codiceScatola").val();
    	var codiceDDT = $("#codiceDDT").val();
    	//var centroDemat  = $('input[name="centrodemat"]').val();
    	var centroDemat = $("#listCentroDemat").val();
    	var codicePallet = $('#codicePallet').val() ;
    	var dataInizio = $("#dataDa").val();
		var dataFine= $("#dataA").val();
    	var uri = contextPath + "/ricerche/scatola/dataTableRicercaScatole.json?id_tipo_MaterialitaConforme="+id_tipo_MaterialitaConforme										
    														+ "&id_tipo_MaterialitaNonConforme="+id_tipo_MaterialitaNonConforme
    														+ "&id_tipo_AnomalieNonSanabili="+id_tipo_AnomalieNonSanabili
    														+ "&id_tipo_AnomalieSanabili="+id_tipo_AnomalieSanabili
    														+ "&id_tipo_AnomaliaNonConforme="+id_tipo_AnomaliaNonConforme
    														+ "&id_tipo_PostaIndescritta="+id_tipo_PostaIndescritta
    														+ filtriStatiSelected
    														+ "&identificativoCliente="+identificativoCliente
    														+ "&codiceScatola="+codiceScatola
    														+ "&centroDemat="+centroDemat
    														+ "&codiceDDT="+codiceDDT
    														+ "&codicePallet="+codicePallet
    														+ "&dataInizio="+dataInizio
    														+ "&dataFine="+dataFine;
    	
    	var pageNumber = 1
    	
    	waitingDialog.show('Ricerca in corso...');
    	setTimeout(function () {
    		$("#tableScatola").show(1000);
    		$('#tableScatola').bootstrapTable('selectPage', pageNumber);
    		$('#tableScatola').bootstrapTable('refresh', {
    			url: uri
    		});	
    	  waitingDialog.hide();
    	});
    	
    	console.log("uri: " + uri);   	
    });
    
    
    $('#tableScatola').on( 'dblclick', 'tbody tr', function (event) {
    	var codiceScatolaSelected = $(this).find('td:nth-child(2)').text();
    	
    });
    	
$("#reset").click(function () {
	$(".bootstrap-table").hide(500);	
	$("#tableScatola").hide(500);	
	$("#tableScatola").bootstrapTable();	
    $('input:checkbox').prop("checked", false);
    $('input:text').val('');
    
 });


    
	$('#dettaglioScatolaModal').on('shown.bs.modal', function () {
   	 	
	    $(this).find('.modal-dialog').css({width:'auto',
	                               height:'auto', 
	                              'max-height':'100%'});
	});
	
	
	 

	 $("#esportaCSV").click(function() {
	    	console.log('esportaCSV');    
	    	$(".bootstrap-table").show(500);	
	    	console.log('ricercaScatola start');
	    	var id_tipo_MaterialitaConforme = "";
	    	if ($( "#cboxTipo_MaterialitaConforme" ).is( ":checked" )) {
	    			id_tipo_MaterialitaConforme =	$("#cboxTipo_MaterialitaConforme").val();
	    	}
	    	var id_tipo_MaterialitaNonConforme = "";
	    	if ($( "#cboxTipo_MaterialitaNonConforme" ).is( ":checked" )) {
	    		id_tipo_MaterialitaNonConforme = $("#cboxTipo_MaterialitaNonConforme").val();
	    	}
	    	
	    	var id_tipo_AnomalieNonSanabili = "";
	    	if ($( "#cboxTipo_AnomalieNonSanabili" ).is( ":checked" )) {
	    		id_tipo_AnomalieNonSanabili = $("#cboxTipo_AnomalieNonSanabili").val();
	    	}
	    	
	    	var id_tipo_AnomalieSanabili  = "";
	    	if ($( "#cboxTipo_AnomalieSanabili" ).is( ":checked" )) {
	    		id_tipo_AnomalieSanabili = $("#cboxTipo_AnomalieSanabili").val();
	    	}
	    	
	    	var id_tipo_AnomaliaNonConforme = "";
	    	if ($( "#cboxTipo_AnomaliaNonConforme" ).is( ":checked" )) {
	    		id_tipo_AnomaliaNonConforme = $("#cboxTipo_AnomaliaNonConforme").val();
	    	}
	    
	    	var id_tipo_PostaIndescritta = "";
	    	if ($( "#cboxTipo_PostaIndescritta" ).is( ":checked" )) {
	    		id_tipo_PostaIndescritta = $("#cboxTipo_PostaIndescritta").val();
	    	}
	    	//stato
	    	var filtriStatiSelected="&list_id_stati_select=";
	        $('#filtriPerStatoCombo :selected').each(function(){
	        	filtriStatiSelected+=$(this).val()+"-";
	        });
	    	
	    	var identificativoCliente = $("#identificativoCliente").val();
	    	var codiceScatola = $("#codiceScatola").val();
	    	var codiceDDT = $("#codiceDDT").val();
	    	//var centroDemat = $('input[name="centrodemat"]').val();
	    	var centroDemat = $("#listCentroDemat").val();
	    	var dataInizio = $("#dataDa").val();
			var dataFine= $("#dataA").val();
	    	var uri = contextPath + "/ricerche/scatola/dataTableRicercaScatole.json?id_tipo_MaterialitaConforme="+id_tipo_MaterialitaConforme										
	    														+ "&id_tipo_MaterialitaNonConforme="+id_tipo_MaterialitaNonConforme
	    														+ "&id_tipo_AnomalieNonSanabili="+id_tipo_AnomalieNonSanabili
	    														+ "&id_tipo_AnomalieSanabili="+id_tipo_AnomalieSanabili
	    														+ "&id_tipo_AnomaliaNonConforme="+id_tipo_AnomaliaNonConforme
	    														+ "&id_tipo_PostaIndescritta="+id_tipo_PostaIndescritta
	    														+ filtriStatiSelected
	    														+ "&identificativoCliente="+identificativoCliente
	    														+ "&codiceScatola="+codiceScatola
	    														+ "&centroDemat="+centroDemat
	    														+ "&codiceDDT="+codiceDDT
	    														+ "&dataInizio="+dataInizio
    															+ "&dataFine="+dataFine
	    														+ "&sort=CODICE_SCATOLA&order=desc&offset=0&limit=10000";
	    	console.log(uri);
	    	$.ajax({
				url: uri,
				method: "GET",
				success: function(data) {
					console.log('success! ', data);
//					csv = '"'+'ID Scatola'+'"'+' ;'+'"'+'Identificativo Cliente'+'"'+' ;'+'"'+ 'Codice Scatola'+'"'+';'+'"'+ 'Tipologia'+'"'+';'+'"'+ 'Stato'+'"'+';'+'"'+ 'Tipologia Documenti'+'"'+';'+'"'+'Totale Anomalie'+'"'+';'+'"'+'Totale Documenti'+'"'+';'+'"'+'Data Chiusura'+'"'+';'+'"'+'Data Fine Data Entry'+'"'+';'+'"'+'LDV cod. racc.'+'"';
					csv = '"'+'Centro Demat'+'"'+' ;"'+'Codice Scatola'+'"'+' ;'+'"'+'Identificativo Cliente'+'"'+' ;'+'"'+'Tipologia'+'"'+';'+'"'+'MacroserviceName'+'"'+';'+'"'+ 'Stato'+'"'+';'+'"'+ 'Tipologia Documenti'+'"'+';'+'"'+'Totale Anomalie'+'"'+';'+'"'+'Totale Documenti'+'"'+';'+'"'+'Data Chiusura'+'"'+';'+'"'+'Data Fine Data Entry'+'"'+';'+'"'+'Codice DDT'+'"';
					
					for(i = 0; i < data.rows.length; i++) {
						
			    		row = data.rows [i];
			    		console.log(row)
			    		console.log(row["ID Scatola"])
			    		console.log(row["Tipologia"])
			    		console.log(row["Stato"])
			    		console.log(row["Totale Anomalie"])
			    		csvIntest=
//			    			csvrow ='"' + row["ID Scatola"] + '"' + ' ;' +
//			    			'"' + row["Identificativo Cliente"] + '"'+ ' ;'+ '"'  + row["Codice Scatola"] + '"' + ' ;'+ '"' + row["Tipologia"] + '"' + ' ;' +
			    			csvrow ='"' + row["CENTRO_DEMAT"] + '"' + ' ;"' + row["ID Scatola"] + '"' + ' ;' +'"' + row["Identificativo Cliente"] + '"'+ ' ;'+ '"' + row["Tipologia"] + '"' + ' ;' + '"' + row["MacroserviceName"] + '"' + ' ;' +
			    		    '"' + row["Stato"] + '"'+' ;'+ '"' + row["Tipologia Documenti"] + '"' + ' ;' +
			    		    '"' + row["Totale Anomalie"]+'"'+';' + '"' + row["Totale Documenti"] + '"' +';' + '"' + row["Data Chiusura"] + '"' + ' ;'+ '"' + row["Data Fine Data Entry"] + '"' + ' ;' +
			    		    '"' + row["CODICE_DDT"] + '"';
			    		
			    		;
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
					
					}
	    	
			});
	 
	    });
	 
	 loadListiFiltriPerStato();
});


function getAllCentroDemat(idSelect, valueSelected, valueReadOnly){
	
	$("#"+idSelect).empty();
	var url = contextPath + '/common/getAllCentroDemat';
	$.ajax({
		type : 'GET',
		url : url,
		success : function(data) {
			var lst = data.data;
			console.log("lengt: " +lst.length);
			if(lst.length < 1){
				alert("Nessun centro trovato.");
			}else{
    			for (var i = 0; i < lst.length; i++) {
    				var obj = lst[i];
    				$("#"+idSelect).append(
    						"<option value=" + obj.value + ">"
    								+ obj.descrizione + "</option>");
    			}
    			$("#"+idSelect).val(valueSelected).attr("selected", "selected");
    			$("#"+idSelect).prop('disabled', valueReadOnly);    			
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


function exportCsv (idScatola, tipoScatola) {
	console.log(idScatola);
	console.log(tipoScatola);
	
	console.log('esportaCSV');
	var url = contextPath + '/ricerche/scatola/dettaglioScatola';
	
//	$("#tableDettaglioScatola").bootstrapTable();
//	$("#tableDettaglioScatola").bootstrapTable('destroy');
//	$("#tableDettaglioScatola thead tr").html('');
	$.ajax({
		type: 'POST',
	        url: url,	    
	        dataType: 'json',
	        data:  { "idScatola": idScatola , "tipoScatolaTypeID": tipoScatola },
		success : function(result) {
			
			if(result.status){
				
				var checkDataEmpty = result.data;
				if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
					alert("Contenuto della scatola vuoto!");
					return ;
				}
				
				$('#dettaglioScatolaModal').modal('show');
				
				var listData = result.data.rowContent;
				var listColonne = result.data.columnHeader;
				
				var codScatolaGME = listData[0].CODICE_SCATOLA_GME;
				
				csv='';
				if (tipoScatola==40 || tipoScatola==50) {
					csv=exportCSVScatolaTipo_40_50(listData,listColonne);
				} else if (tipoScatola==60) {
					csv=exportCSVScatolaTipo_60(listData,listColonne);
				} else {
					csv=exportCSVScatolaTipo_10_20_30(listData,listColonne);
				}
				
				var downloadLink = document.createElement("a");
		        downloadLink.href = "data:text/csv," + encodeURIComponent(csv);
		        downloadLink.download = codScatolaGME+".csv";

		        document.body.appendChild(downloadLink);
		        downloadLink.click();
		        document.body.removeChild(downloadLink)
				
		 
				
		
			}else{
				alert("Errore richiesta dettaglio!");
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

function exportCSVScatolaTipo_10_20_30(listData,listColonne) {
	console.log("sono sopra lista e colonne");
	console.log(listData);
	console.log(listColonne);
	var dataScanzione = listData[0].DATA_SCANSIONE;
	csv= '"'+'POSIZIONE IN SCATOLA'+'"'+';'+'"'+'COD.OGGETTO'+'"'+';'+'"'+'STATO DOCUMENTO'+'"'+ ';'+ '"'+'STATO DOCUMENTO ESTESO'+'"';
	if (dataScanzione) {
		csv = csv + ';'+'"'+'DATA SCANSIONE'+'"';
	}
	for(i=0; i< listData.length; i++){
		row =  listData[i];
		csvrow ='"' + row.POSIZIONE_IN_SCATOLA + '"' + ' ;' +
	    '"' + row.COD_OGGETTO + '"'+ ' ;'+ '"'  + row.STATO_DOCUMENTO + '"'+';'+'"' + row.STATO_DOCUMENTO_ESTESO + '"';
		if (dataScanzione) {
			csvrow = csvrow + ' ;' + '"' + row.DATA_SCANSIONE + '"';
		}
		csv = csv + '\n' + csvrow;
	}
	return csv;
}

function exportCSVScatolaTipo_40_50(listData,listColonne) {
	csv= '"'+'CODICE SCATOLA ORIGINE'+'"'+';'+'"'+'TIPO SCATOLA'+'"'+';'+'"'+'CODICE OGGETTO'+'"'+ ';'+'"'+'CODICE PICKING'+'"';
	console.log("sono sopra lista e colonne");
	console.log(listData);
	console.log(listColonne);
	for(i=0; i< listData.length; i++){
		row =  listData[i];
		csvrow ='"' + row.CODICE_SCATOLA_ORIGINE + '"' + ' ;' +
	    '"' + row.TIPO_SCATOLA + '"'+ ' ;'+ '"'  + row.CODICE_OGGETTO + '"'+' ;' +
	    '"' + row.CODICE_PICKING + '"';
		csv = csv + '\n' + csvrow;
	}
	return csv;
}

function exportCSVScatolaTipo_60(listData,listColonne) {
	csv= '"'+'POSIZIONE IN SCATOLA'+'"'+';'+'"'+'DATAMATRIX/COD. OGGETTO'+'"'+';'+'"'+'STATO DOCUMENTO'+'"';
	var dtScansione = listData[0].DATA_SCANSIONE;
	if (dtScansione) {
		csv = csv + ';'+'"'+'DATA SCANSIONE'+'"';
	}
	csv= csv + ';'+'"'+'ID PRENOTAZIONE'+'"';
	console.log("sono sopra lista e colonne");
	console.log(listData);
	console.log(listColonne);
	for(i=0; i< listData.length; i++){
		row =  listData[i];
		csvrow ='"' + row.POSIZIONE_IN_SCATOLA_SCAN + '"' + ' ;' + '"' + row.DATAMATRIX + '"'+ ' ;'+ '"'  + row.STATO_DOCUMENTO + '"';
		if (dtScansione) {
			csvrow = csvrow + ' ;' + '"' + row.DATA_SCANSIONE + '"';
		}
		csvrow= csvrow + ';'+'"' + row.ID_PRENOTAZIONE +'"';
		csv = csv + '\n' + csvrow;
	}
	return csv;
}

//String.prototype.replaceAll = function(target, replacement) {
//	  return this.split(target).join(replacement);
//};

function trackingScatola( idScatola , tipoScatola ) {
	var url = contextPath + '/ricerche/scatola/trackingScatola';
	$("#tableTrkScatole").bootstrapTable('destroy');
	$("#tableTrkScatole thead tr").html('');
	$.ajax({
		type: 'POST',
	        url: url,	    
	        dataType: 'json',
	        data:  { "idScatola": idScatola , "tipoScatolaTypeID": tipoScatola },
		success : function(result) {
			
			if(result.status){
				
				var checkDataEmpty = result.data;
				if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
					alert("Nessun tracking esistente per la scatola selezionata");
					return ;
				}
				
				$('#trackingScatolaModal').modal('show');
				
				var listData = result.data.rowContent;
				var listColonne = result.data.columnHeader;
				
				var codScatolaGME = listData[0].CODICE_SCATOLA_GME;
				 $("#title_cod_scat_gme").text(codScatolaGME);
				 $("#codiceTrkScatola").text( codScatolaGME ) ;
				 
				 var tr;
					for(var i in listColonne){
						if( i == '000' ) {
							continue ;
						}
					    var sequenceColumns = i; ///000,0001 ...
					    var valore = listColonne[sequenceColumns];
					    	
					    var tr_temp;
					        $.each(valore, function(index, value) {
						    	var columnDataField = index;
						    	var columnTitle = value;
						    	console.log(" - data-field: " + columnDataField +"- tag: " + columnTitle );
						    	tr_temp = "<th data-field=\"" + columnDataField + "\" data-sortable=\"true\">" + columnTitle + "</th>";
					        });
					        tr = tr + tr_temp.toString();
					}
					
				        $("#tableTrkScatole thead tr").append(tr);
					
					$("#tableTrkScatole").bootstrapTable({
						data: listData});
				
			}else{
				alert("Errore richiesta dettaglio!");
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

function stampaDistinta() {
	var divToPrint=document.getElementById('printBody');

	  var newWin=window.open('','Print-Window');

	  newWin.document.open();

	  newWin.document.write('<html><head><style>.fixed-table-loading{display:none}</style></head><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

	  newWin.document.close();

	  //setTimeout(function(){newWin.close();},10);
}

function apriDistintaScatola( idScatola, tipoScatola , tipoLavorazione ) {
	
	var url = contextPath + '/ricerche/scatola/dettaglioScatola';
	
	$("#tableDettaglioStampaScatola").bootstrapTable('destroy');
	$("#tableDettaglioStampaScatola thead tr").html('');
	
	$.ajax({
		type: 'POST',
	        url: url,	    
	        dataType: 'json',
	        data:  { "idScatola": idScatola , "tipoScatolaTypeID": tipoScatola },
		success : function(result) {
			
			if(result.status){
				
				var checkDataEmpty = result.data;
				if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
					alert("Contenuto della scatola vuoto!");
					return ;
				}
				
				$('#stampaScatolaModal').modal('show');
				//barcodeScatola
				
				$('#barcodeScatola').attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+result.data.rowContent[0].CODICE_SCATOLA_GME) ;
				
				addEventToStampaButton(idScatola, tipoScatola , tipoLavorazione);//button stampa contenuto 
				addEventToCsvButton(idScatola, tipoScatola); // button export csv
				var listData = result.data.rowContent;
				var listColonne = result.data.columnHeader;
				var totDocumenti = result.data.totalRow;
//				var arrayColonne = [];
				
				//Dettagli scatola
				var codScatolaGME = listData[0].CODICE_SCATOLA_GME;
				 $("#title_print_cod_scat_gme").text(codScatolaGME);
				 
				var codScatola = listData[0].CODICE_SCATOLA;
				$("#title_print_cod_scat").text(codScatola);
				
				var TIPO_SCATOLA = listData[0].TIPO_SCATOLA;
				$("#title_print_tipo_scatola").text(TIPO_SCATOLA);
				
				var TIPO_DOCUMENTO = listData[0].TIPO_DOCUMENTO;
				$("#title_print_tipo_documento").text(TIPO_DOCUMENTO);
				
				var COD_CLIENTE = listData[0].COD_CLIENTE;
				$("#title_print_cliente").text(COD_CLIENTE);
				
				var TIPO_SPEDIZIONE = listData[0].TIPO_SPEDIZIONE_DOC;
				$("#title_print_tipo_spedizione").text(TIPO_SPEDIZIONE);
				
				var LOTTO_TERRITORIALE = listData[0].DESCR_LOTTO_TERRITORIALE;
				$("#title_print_lotto_territoriale").text(LOTTO_TERRITORIALE);
				
				var TOTALE_MAZZETTE = listData[0].TOTALE_MAZZETTE;
				$("#title_print_totale_mazzette").text(TOTALE_MAZZETTE);
				
				
				var STATO_SCATOLA = listData[0].STATO_SCATOLA;
				$("#title_print_stato_scatola").text(STATO_SCATOLA);
				
				var STATO_SCATOLA_ESTESO = listData[0].STATO_SCATOLA_ESTESO;
				$("#title_print_stato_scatola_esteso").text(STATO_SCATOLA_ESTESO);
				
				$("#title_print_totale_documenti").text(totDocumenti);
					 
					 
				
				var tr;
				for(var i in listColonne){
				    var sequenceColumns = i; ///000,0001 ...
				    var valore = listColonne[sequenceColumns];
				    	
				    var tr_temp;
				        $.each(valore, function(index, value) {
					    	var columnDataField = index;
					    	var columnTitle = value;
					    	console.log(" - data-field: " + columnDataField +"- tag: " + columnTitle );
					    	tr_temp = "<th data-field=\"" + columnDataField + "\" data-sortable=\"true\">" + columnTitle + "</th>";
				        });
				        tr = tr + tr_temp.toString();
				}
				
			        $("#tableDettaglioStampaScatola thead tr").append(tr);
				
				$("#tableDettaglioStampaScatola").bootstrapTable({
					data: listData});
				
				setTimeout( function() {
					stampaDistinta();
				} , 1000 );
			}else{
				alert("Errore richiesta dettaglio!");
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

function dettaglioScatola( idScatola, tipoScatola , tipoLavorazione ){
//	$(this).addClass('highlight').siblings().removeClass('highlight');        	
// 	var codiceScatolaSelected = $(this).find('td:nth-child(2)').text();
	var url = contextPath + '/ricerche/scatola/dettaglioScatola';
	
//	$("#tableDettaglioScatola").bootstrapTable();
	$("#tableDettaglioScatola").bootstrapTable('destroy');
	$("#tableDettaglioScatola thead tr").html('');
	$.ajax({
		type: 'POST',
	        url: url,	    
	        dataType: 'json',
	        data:  { "idScatola": idScatola , "tipoScatolaTypeID": tipoScatola },
		success : function(result) {
			
			if(result.status){
				
				var checkDataEmpty = result.data;
				if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
					alert("Contenuto della scatola vuoto!");
					return ;
				}
				
				$('#dettaglioScatolaModal').modal('show');
				addEventToStampaButton(idScatola, tipoScatola , tipoLavorazione);//button stampa contenuto 
				addEventToCsvButton(idScatola, tipoScatola); // button export csv
				var listData = result.data.rowContent;
				var listColonne = result.data.columnHeader;
				var totDocumenti = result.data.totalRow;
//				var arrayColonne = [];
				
				//Dettagli scatola
				var codScatolaGME = listData[0].CODICE_SCATOLA_GME;
				 $("#title_cod_scat_gme").text(codScatolaGME);
				 
				var codScatola = listData[0].CODICE_SCATOLA;
				$("#title_cod_scat").text(codScatola);
				
				var TIPO_SCATOLA = listData[0].TIPO_SCATOLA;
				$("#title_tipo_scatola").text(TIPO_SCATOLA);
				
				var TIPO_DOCUMENTO = listData[0].TIPO_DOCUMENTO;
				$("#title_tipo_documento").text(TIPO_DOCUMENTO);
				
				var COD_CLIENTE = listData[0].COD_CLIENTE;
				$("#title_cliente").text(COD_CLIENTE);
				
				var TIPO_SPEDIZIONE = listData[0].TIPO_SPEDIZIONE_DOC;
				$("#title_tipo_spedizione").text(TIPO_SPEDIZIONE);
				
				var LOTTO_TERRITORIALE = listData[0].DESCR_LOTTO_TERRITORIALE;
				$("#title_lotto_territoriale").text(LOTTO_TERRITORIALE);
				
				var TOTALE_MAZZETTE = listData[0].TOTALE_MAZZETTE;
				$("#title_totale_mazzette").text(TOTALE_MAZZETTE);
				
				var CODICE_PALLET = listData[0].CODICE_PALLET;
				$("#title_codice_pallet").text( CODICE_PALLET ) ;
				
				var STATO_SCATOLA = listData[0].STATO_SCATOLA;
				$("#title_stato_scatola").text(STATO_SCATOLA);
				
				var STATO_SCATOLA_ESTESO = listData[0].STATO_SCATOLA_ESTESO;
				$("#title_stato_scatola_esteso").text(STATO_SCATOLA_ESTESO);
				
				$("#title_totale_documenti").text(totDocumenti);
					 
					 
				
				var tr;
				for(var i in listColonne){
				    var sequenceColumns = i; ///000,0001 ...
				    var valore = listColonne[sequenceColumns];
				    	
				    var tr_temp;
				        $.each(valore, function(index, value) {
					    	var columnDataField = index;
					    	var columnTitle = value;
					    	console.log(" - data-field: " + columnDataField +"- tag: " + columnTitle );
					    	tr_temp = "<th data-field=\"" + columnDataField + "\" data-sortable=\"true\">" + columnTitle + "</th>";
				        });
				        tr = tr + tr_temp.toString();
				}
				
			        $("#tableDettaglioScatola thead tr").append(tr);
				
				$("#tableDettaglioScatola").bootstrapTable({
					data: listData});
			}else{
				alert("Errore richiesta dettaglio!");
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

function addEventToStampaButton (idScatola, tipoScatola, tipoLavorazione){
	$('#stampaPdfDistinta').attr('onClick', 'preStampaDistinta(' + idScatola +',' + tipoScatola +','+tipoLavorazione+');');
	$('#scaricaPdfDistinta').attr('onClick', 'stampaScatola(' + idScatola +',' + tipoScatola +','+tipoLavorazione+','+true+');');
}

function preStampaDistinta( idScatola, tipoScatola , tipoLavorazione ) {
	$('#dettaglioScatolaModal').modal('hide') ;
	apriDistintaScatola( idScatola, tipoScatola , tipoLavorazione )
}

function addEventToCsvButton (idScatola, tipoScatola){
	$('#esportaCSV2').attr('onClick', 'exportCsv(' + idScatola +',' + tipoScatola +');');
}

function stampaPdfScatola(idScatola, tipoScatola, tipoLavorazione, toDownload){
	if( tipoLavorazione == undefined ) {
		var url = contextPath + '/ricerche/scatola/stampa?scatolaID='+idScatola+'&tipoScatolaTypeID='+tipoScatola+'&tipoLavorazione=&toDownload='+toDownload;
	}
	else {
		var url = contextPath + '/ricerche/scatola/stampa?scatolaID='+idScatola+'&tipoScatolaTypeID='+tipoScatola+'&tipoLavorazione='+tipoLavorazione+'&toDownload='+toDownload;
	}
	//if (/Edge\/\d./i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) { //se browser >= IE 11
		
		var embedPdf = document.createElement('embed');
		embedPdf.setAttribute("id", "pdf-frame");
		embedPdf.setAttribute("src", url);
		embedPdf.setAttribute("type", "application/pdf");
		document.body.appendChild(embedPdf);
		setTimeout(function(){
			var doPrinting = function(id){
			    var pdfObject = document.getElementById(id);
			    if (typeof(pdfObject.print) === 'undefined') {    
			         setTimeout(function(){ doPrinting(id); }, 1000);
			    } else {
			        pdfObject.print();
			    }
			 }
			doPrinting('pdf-frame');
		}, 1000);
		
   	//}else{
	
	
	//console.log(url);
    /*if(toDownload){
        if (window.open(url) == null) window.close();	
    } else {
    	console.log("stampa del file...");
        var element = document.getElementById('pdf-frame');
        if(element) {
        	element.parentNode.removeChild(element);
        }
    	var iframe = document.createElement('iframe');
        iframe.setAttribute("id", "pdf-frame");
        //iframe.setAttribute("hidden", true);
        iframe.setAttribute("src", url);
        document.body.appendChild(iframe); 
		setTimeout(function(){
			//document.getElementById('pdf-frame').contentWindow.print();
            var element = window.document.getElementById('pdf-frame').contentWindow.document.execCommand('print', false, null);
            if(!element) {
            	document.getElementById('pdf-frame').contentWindow.print();
            }
			//var element = document.getElementById('pdf-frame');
		}, 1000);
		//document.getElementById('pdf-frame').contentWindow.print();
		
    }*/
}

function sbloccaScatola( scatolaId ) {
	if( !confirm( "Siete sicuri di voler sbloccare la lavorazione per la scatola selezonata?" ) ) {
		return ;
	}
	
	var url = contextPath + '/ricerche/scatola/sblocca?scatolaID='+scatolaId ;
	
	$.ajax({
		type : 'GET',
		url : url,
		async: false,
		contentType : 'application/json',
		dataType : 'json',
		success : function(result) {
			if(result.status){
				console.log('Success!');
 				console.log(result.data);
 				$('#success_msg').text("Scatola aggiornata con successo!");
				$('#div_success_alert').show();
				
				$("#Cerca").click() ;
			}
			else{
				console.log('errore!');
				console.log('result ', result);
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

function stampaScatola(idScatola, tipoScatola, tipoLavorazione, toDownload){
	if( tipoLavorazione == undefined ) {
		var url = contextPath + '/ricerche/scatola/stampa?scatolaID='+idScatola+'&tipoScatolaTypeID='+tipoScatola+'&tipoLavorazione=&toDownload='+toDownload;
	}
	else {
		var url = contextPath + '/ricerche/scatola/stampa?scatolaID='+idScatola+'&tipoScatolaTypeID='+tipoScatola+'&tipoLavorazione='+tipoLavorazione+'&toDownload='+toDownload;
	}
	if( toDownload ) {
		$.ajax({
			type : 'GET',
			url : url,
			async: false,
			contentType : 'application/json',
			dataType : 'json',
			success : function(result) {
//				console.log(blob.size);
//			      var link=document.createElement('a');
//			      link.href=window.URL.createObjectURL(blob);
//			      link.download="Dossier_" + new Date() + ".pdf";
//			      link.click();
				
				if(result.status){
					var b64 = result.data;
					var a = document.createElement('a');
					var pdfAsDataUri = "data:application/pdf;base64," + b64;
					a.download = result.message + ".pdf" ;
					a.type = 'application/pdf';
					a.href = pdfAsDataUri;
					a.click();
				}
				else{
					console.log('errore!');
					console.log('result ', result);
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
	else {
		$.ajax({
			type : 'GET',
			url : url,
			async: false,
			contentType : 'application/json',
			dataType : 'json',
			success : function(result) {
				
				if(result.status){
//					var b64 = result.data;
//	
//					var htmlPop = '<embed id="pdffile" width="100%" height="100%" style="outline: none;"'
//									 + ' type="application/pdf"'
//									 + ' src="data:application/pdf;base64,'
//									 + escape(b64)
//									 + '"></embed>'; 
//	
//					var printWindow = window.open('','Print-Window');
//					printWindow.document.write(htmlPop);
//					setTimeout( function(){
//						printWindow.document.getElementById('pdffile').contentWindow.print();
//					} , 2000 ) ;
					
//					var pdfFile = new Blob([result.data], {
//				        type: 'application/pdf'
//				    });
//				    var pdfUrl = URL.createObjectURL(pdfFile);
//				    var printwWindow = $window.open(pdfUrl);
//				    printwWindow.print();
					
					if (/Edge\/\d./i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) { //se browser >= IE 11
						console.log( "IE" )
						window.open("data:application/pdf;base64, " + result.data);
					}
					else{
						console.log( "CHROME" )
						var pdfWindow = window.open("test")
						pdfWindow.document.write(
							"<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
							encodeURI(result.data) + "'></iframe>"
						)
					}
				}
				else{
					console.log('errore!');
					console.log('result ', result);
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
	
//	$http({
//	    url: yourUrl,
//	    method: 'GET',
//	    headers: {
//	        'Content-type': 'application/pdf'
//	    },
//	    responseType: 'arraybuffer'
//	}).success(function (data, status, headers, config) {
//	    
//	}).error(function (data, status, headers, config) {
//	    alert('Sorry, something went wrong')
//	});
	
//	if(toDownload){
//	      if (window.open(url) == null) window.close();
//	} else {
//		console.log("stampa del file...");
//		var element = document.getElementById('print-pdf');
//		if(element) element.parentNode.removeChild(element);
//		element = document.getElementById('frame-pdf');
//		if(element) element.parentNode.removeChild(element);
//		
//		var browser = window.navigator.userAgent;
//		var isIE = browser.indexOf('Trident/') > 0;
//		if(isIE){
//			window.open(url);
//		} else {			
//			var embedOrIframe = document.createElement(isIE ? 'embed': 'iframe');
//			var iframe = document.createElement('iframe');
//			embedOrIframe.setAttribute("id", "print-pdf");
//			embedOrIframe.setAttribute("hidden", true);
//			iframe.setAttribute("src", url);
//			iframe.setAttribute("hidden", true);
//			iframe.setAttribute("id", "frame-pdf");
//			document.body.appendChild(iframe);
//			embedOrIframe.setAttribute("src", iframe.getAttribute("src"));
//			embedOrIframe.setAttribute("type", "application/pdf");
//			document.body.appendChild(embedOrIframe);
//	
//			setTimeout(function(){
//				var pdfObject = document.getElementById('print-pdf');
//				if(isIE){
//					pdfObject.print();
//					//var url = "http://localhost:7001/banc_ADE/ricerche/scatola/stampa?scatolaID=2&tipoScatolaTypeID=60&tipoLavorazione=1&toDownload=false"; 
//					//window.open(url);
//				}else{
//					pdfObject.contentWindow.print();
//				}
//				//commentata sta parte perchè su chrome non funziona, i frame sono cmq hidden
//				/*var element = document.getElementById('print-pdf');
//				if(element) element.parentNode.removeChild(element);
//				document.body.removeChild(iframe);*/
//				
//			}, 1000);
//		}
//
//	}
}

function loadListiFiltriPerStato() {
	var url = contextPath + '/ricerche/scatola/getListStatiFiltroRicercaScatola';
	$.ajax({
		type : 'GET',
		url : url,
		success : function(data) {
			var lst = data.data;
			if(lst.length < 1){
				alert("Nessuni filtri trovati.");
			}else{
				for (var i = 0; i < lst.length; i++) {
    				var obj = lst[i];
    				$("#filtriPerStatoCombo").append("<option value=\""+obj.value+"\">"+obj.descrizione+"</option>");
				}
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

function closeScatola(scatola_id){
	
	 BootstrapDialog.show({
         title: 'Conferma Chiusura Scatola',
         message: 'Sei sicuro di voler chiudere la scatola?',
         buttons: [{
             label: 'Conferma',
             action: function(dialogItself) {             	
             	var operatore =  $('input[name="user"]').val();
             	var postazione =  $('input[name="postazione"]').val();          
          
             	var url = contextPath + '/scatole/'+scatola_id+'/'+operatore+'/'+postazione;
             	$.ajax({
         			type : 'PATCH',
         			url : url,
         			contentType : 'application/json',         			
         			dataType : 'json',
         			success : function(result) {
         				console.log('Success!');
         				console.log(result.data);
         				dialogItself.close();       				
         				$( "#Cerca" ).trigger( "click" );
         			},
         			error : function(xhr, status, error, result) {
         				console.log('errore!');
         				console.log('xhr ', xhr);
         				console.log('status ', status);
         				console.log('error ', error);
         				console.log('result ', result);
         				$('#danger_msg').text(error);
         				$('#div_error_alert').show();	
         				dialogItself.close();
         			}
         		});
             }
         }, {
             label: 'Annulla',
             action: function(dialogItself) {
             	dialogItself.close();
             }
         }]
     });
	
}



function printEtichetta(scatola_id){
	
	 BootstrapDialog.show({
        title: 'Conferma Stamp Etichetta',
        message: 'Sei sicuro di voler stampare l&apos;etichetta?',
        buttons: [{
            label: 'Conferma',
            action: function(dialogItself) {         
            	var url = contextPath + '/scatole/etichetta/'+scatola_id;            	
				window.open(url) ;
				dialogItself.close();
            }
        }, {
            label: 'Annulla',
            action: function(dialogItself) {
            	dialogItself.close();
            }
        }]
    });
	
}