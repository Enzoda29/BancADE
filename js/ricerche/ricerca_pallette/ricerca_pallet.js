var table=null;
$(document).ready(function () {
	
	$(document.body).on('hidden.bs.modal', function () {
		$('body').css('padding-right','0');
	});
	
	$("#tablePallet").hide();
	
	loadListaFiltriPerStatoPallet() ;
	loadListaFiltriPerClientePallet() ;
	loadListaFiltriPerTipologiaPallet() ;

	$('#creaPallet').click( function() {
		$('#creaPalletModal').modal('toggle');
	} ) ;
	
	//button ricerca pallet 
    $("#Cerca").click(function () {
    	$(".bootstrap-table").show(500);	
    	console.log('ricercaScatola start');
    	
    	//stato
    	var filtriStatiSelected="list_id_stati_select=";
        $('#filtriPerStatoPalletCombo :selected').each(function(){
        	filtriStatiSelected+=$(this).val()+"-";
        });
        
        //cliente
        var filtriClienteSelected="&list_id_clienti_select=";
        $('#filtriPerClientePalletCombo :selected').each(function(){
        	filtriClienteSelected+=$(this).val()+"-";
        });
        
        //tipologia
        var filtriPerTipologiaPalletCombo="&list_id_tipologia_select=";
        $('#filtriPerTipologiaPalletCombo :selected').each(function(){
        	filtriPerTipologiaPalletCombo+=$(this).val()+"-";
        });
    	
        var centroDemat = $("input[name='centrodemat']").val() ;
    	var codicePallet = $("#codicePallet").val();
    	var codiceDDT = $("#codiceDDT").val() ;
    	var uri = contextPath + "/ricerche/pallet/dataTableRicercaPallet.json?"
    														+ filtriStatiSelected
    														+ filtriClienteSelected
    														+ filtriPerTipologiaPalletCombo
    														+ "&codiceDDT="+codiceDDT
    														+ "&codicePallet="+codicePallet
    														+ "&centroDemat="+centroDemat;
//    														+ "&sort=CODICE_PALLET&order=desc&offset=0&limit=10000";
    	
    	var pageNumber = $('#tablePallet').bootstrapTable('getOptions').pageNumber;
    	if(!pageNumber)
    		pageNumber = 1
    	
    	waitingDialog.show('Ricerca in corso...');
    	setTimeout(function () {
    		$("#tablePallet").show(1000);
    		$('#tablePallet').bootstrapTable('selectPage', pageNumber);
    		$('#tablePallet').bootstrapTable('refresh', {
    			url: uri
    		});	
    	  waitingDialog.hide();
    	});
    	
    	console.log("uri: " + uri);   	
    });
    
    
$("#reset").click(function () {
	$(".bootstrap-table").hide(500);	
	$("#tablePallet").hide(500);
	$("#tablePallet").bootstrapTable();
    $('input:checkbox').prop("checked", false);
    $('input:text').val('');
    //stato
	$('#filtriPerStatoPalletCombo :selected').prop("selected", false);
    
    //cliente
    $('#filtriPerClientePalletCombo :selected').prop("selected", false);
    
    //tipologia
    $('#filtriPerTipologiaPalletCombo :selected').prop("selected", false);
    
 });
	
	$("#esportaCSV").click(function() {
	    	console.log('esportaCSV');    
	    	$(".bootstrap-table").show(500);	
	    	console.log('ricercaScatola start');
	    	
	    	//stato
	    	var filtriStatiSelected="list_id_stati_select=";
	        $('#filtriPerStatoPalletCombo :selected').each(function(){
	        	filtriStatiSelected+=$(this).val()+"-";
	        });
	        
	        //cliente
	        var filtriClienteSelected="&list_id_clienti_select=";
	        $('#filtriPerClientePalletCombo :selected').each(function(){
	        	filtriClienteSelected+=$(this).val()+"-";
	        });
	        
	        //tipologia
	        var filtriPerTipologiaPalletCombo="&list_id_tipologia_select=";
	        $('#filtriPerTipologiaPalletCombo :selected').each(function(){
	        	filtriPerTipologiaPalletCombo+=$(this).val()+"-";
	        });
	    	
	        var centroDemat = $("input[name='centrodemat']").val() ;
	    	var codicePallet = $("#codicePallet").val();
	    	var codiceDDT = $("#codiceDDT").val() ;
	    	var uri = contextPath + "/ricerche/pallet/dataTableRicercaPallet.json?"
	    														+ filtriStatiSelected
	    														+ filtriClienteSelected
	    														+ filtriPerTipologiaPalletCombo
	    														+ "&codiceDDT="+codiceDDT
	    														+ "&codicePallet="+codicePallet
	    														+ "&centroDemat="+centroDemat
	    														+ "&sort=CODICE_PALLET&order=desc&offset=0&limit=10000";
	    	console.log(uri);
	    	$.ajax({
				url: uri,
				method: "GET",
				success: function(data) {
					console.log('success! ', data);
					var csv = 
						'"CODICE_PALLET";'+
						'"STATO_PALLET";'+
						'"NOME_DOCUMENTO";'+
						'"IDENTIFICATIVO_CLIENTE";'+
						'"TIPO_SPEDIZIONE_DOC";'+
						'"TIPO_POSTA";'+
						'"TOTALE_SCATOLE_INSERITE";'+
						'"CODICE_DDT";'+
						'"PROGRESSIVO_DDT";'+
						'"DATA_INSERIMENTO";'+
						'"DATA_AGGIORNAMENTO";'+
						'"DESCR_TIPO_PALLET";'+
						'"PESO_NETTO_PALLET_G";'+
						'"USERNAME";'+
						'"DESCR_CENTRO_DEMAT";' ;
					for(i = 0; i < data.rows.length; i++) {
						
			    		row = data.rows [i];
			    		var csvrow=
			    				'"' + row["CODICE_PALLET"]				+ '"' + ';'
			    			+	'"' + row["STATO_PALLET"]				+ '"' + ';'
			    			+	'"' + row["NOME_DOCUMENTO"]				+ '"' + ';'
			    			+	'"' + row["IDENTIFICATIVO_CLIENTE"]		+ '"' + ';'
			    			+	'"' + row["TIPO_SPEDIZIONE_DOC"]		+ '"' + ';'
			    			+	'"' + row["TIPO_POSTA"]					+ '"' + ';'
			    			+	'"' + row["TOTALE_SCATOLE_INSERITE"]	+ '"' + ';'
			    			+	'"' + row["CODICE_DDT"] 				+ '"' + ';'
			    			+	'"' + row["PROGRESSIVO_DDT"]			+ '"' + ';'
			    			+	'"' + row["DATA_INSERIMENTO"]			+ '"' + ';'
			    			+	'"' + row["DATA_AGGIORNAMENTO"]			+ '"' + ';'
			    			+	'"' + row["DESCR_TIPO_PALLET"]			+ '"' + ';'
			    			+	'"' + row["PESO_NETTO_PALLET_G"]		+ '"' + ';'
			    			+	'"' + row["USERNAME"]					+ '"' + ';'
			    			+	'"' + row["DESCR_CENTRO_DEMAT"]			+ '"' + ';'
			    		
			    		;
			    		console.log(csvrow)
			    		
			    		csv += '\n' + csvrow;
			    		
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
});

function openDettagliPallet( numPallet , statoPallet , tipoPallet , totScatole , idCliente , lottoTerritoriale , modify ) {
	$('#creaPalletModal').modal('hide');
	$('#dettaglioPalletModal').data( 'numPallet' , numPallet ) ;
	$('#dettaglioPalletModal').data( 'statoPallet' , statoPallet ) ;
	$('#dettaglioPalletModal').data( 'tipoPallet' , tipoPallet ) ;
	$('#dettaglioPalletModal').data( 'totScatole' , totScatole ) ;
	$('#dettaglioPalletModal').data( 'idCliente' , idCliente ) ;
	$('#dettaglioPalletModal').data( 'lottoTerritoriale' , lottoTerritoriale ) ;
	$('#dettaglioPalletModal').data( 'isMod' , modify ) ;
	$('#dettaglioPalletModal').modal('toggle');
	if( statoPallet != 'Creato' ) {
		$('#chiudiPalletButton').hide() ;
	}
	else{
		$('#chiudiPalletButton').show() ;
	}
}

function loadListaFiltriPerStatoPallet() {
	var url = contextPath + '/ricerche/pallet/getListStatiFiltroRicercaElencoStatoPallet';
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
    				$("#filtriPerStatoPalletCombo").append("<option value=\""+obj.value+"\">"+obj.descrizione+"</option>");
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

function loadListaFiltriPerClientePallet() {
	var url = contextPath + '/ricerche/pallet/getListStatiFiltroRicercaElencoClientiPallet';
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
    				$("#filtriPerClientePalletCombo").append("<option value=\""+obj.value+"\">"+obj.descrizione+"</option>");
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

function loadListaFiltriPerTipologiaPallet() {
	var url = contextPath + '/ricerche/pallet/getListStatiFiltroRicercaElencoTipiPallet';
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
    				$("#filtriPerTipologiaPalletCombo").append("<option value=\""+obj.value+"\">"+obj.descrizione+"</option>");
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

function addScatolaToPallet( numPallet , codScatola ) {
	console.log( "codScatola = " + codScatola ) ;
	
	var url = contextPath + '/ricerche/pallet/addScatolaToPallet?codScatola='+codScatola + '&numPallet=' + numPallet ;
	waitingDialog.show();
	$.ajax({
		type : 'GET',
		url : url,
		success : function(data) {
			var esit = data.status ;
			if( esit ) {
				var uri = contextPath + "/ricerche/pallet/dataTableDettagliPallet.json?codPacchetto="+numPallet ;
				//Chiamata ajax per dettagli pallet
				$('#tablePalletScatola').bootstrapTable('selectPage', 1);
				$('#tablePalletScatola').bootstrapTable('refresh', {
					url: uri
				});
				var totScatole = $('#title_totale_scatole').text() ;
				$('#title_totale_scatole').text( +totScatole + 1 ) ;
				waitingDialog.hide();
//				alert( data.message ) ;
				$('#aggScatolaInputModal').val('') ;
				$('#aggScatolaInputModal').focus() ;
			}
			else {
				waitingDialog.hide();
				alert( data.message ) ;
				$('#aggScatolaInputModal').val('') ;
				$('#aggScatolaInputModal').focus() ;
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
			$('#aggScatolaInputModal').val('') ;
			$('#aggScatolaInputModal').focus() ;
		}
	});
}

function chiudiPallet( codicePallet ) {
	console.log( "codicePallet = " + codicePallet ) ;
		
	if( !confirm( "Siete sicuri di voler chiudere il pallet selezionato?" ) ) {
		return ;
	}

	var url = contextPath + '/ricerche/pallet/chiudiPallet';
	var data = { "data" : codicePallet } ;
	waitingDialog.show();
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data:JSON.stringify( data ),
		success : function(data) {
			if( data.status ) {
				$('#success_msg').text(data.message);
				$('#div_success_alert').show();
				waitingDialog.hide();
				setTimeout( function(){
					$("#Cerca").click() ;
				} , 1000 ) ;
			}
			else {
				$('#danger_msg').text(data.message);
				$('#div_error_alert').show();
				waitingDialog.hide();
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
			waitingDialog.hide();
		}
	});
	
}

function stampaDistinta() {
	var divToPrint=document.getElementById('printBody');

	  var newWin=window.open('','Print-Window');

	  newWin.document.open();

	  newWin.document.write('<html><head></head><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

	  newWin.document.close();

	  //setTimeout(function(){newWin.close();},10);
}

function stampaDistintaPallet( codicePallet ) {
	var url = contextPath + '/ricerche/pallet/stampaDistintaPallet';
	var data = { "data" : codicePallet } ;
	waitingDialog.show();
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data:JSON.stringify( data ),
		success : function(data) {
			var result = data.data ;
			console.log( result ) ;
			if( data.status ) {
				$('#distintaPalletModal').modal('show') ;
				$('#codPalletSpan').text(result.codicePallet) ;
				$('#tipoPostaSpan').text(result.tipologiaPosta) ;
				$('#codClienteSpan').text(result.codCliente) ;
				$('#lottoTerritorialeSpan').text(result.descrLottoTerritoriale) ;
				$('#nomeDocumentoSpan').text(result.nomeDocumento) ;
				$('#tipoSpedizioneSpan').text(result.tipoSpedizioneDoc) ;
				$('#numeroScatoleSpan').text(result.totaleScatoleInserite) ;
				
				$('#barcodePallet').attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+result.codicePallet) ;
				
//				var toAppend = "" ;
//				
//				for( var i = 0 ; i < result.codiciScatole.length ; i++ ) {
//					toAppend += '<div class="col-xs-2 col-md-2 col-sm-2 col-lg-2"><p>'+ result.codiciScatole[i] +'</p></div>' ;
//				}
//				
//				$('#appendingScatole').html( toAppend ) ;
				
				var toAppend = "";

				var tabStart = '<table style="text-align:center;width:100%">';
				var tabEnd = "</table>";

				var wideColStart = '<td colspan="7">';
				var wideColEnd = "</td>";

				var rowStart = '<tr>';
				var rowEnd = "</tr>";

				var colStart = '<td>';
				var colEnd = "</td>";

				toAppend += tabStart ;

				toAppend += rowStart + wideColStart + "<h4><strong>Numero Scatole: </strong>" + result.codiciScatole.length + "</h4>" + wideColEnd + rowEnd ;

				var totCols = (Math.round(result.codiciScatole.length / 7) + 1) * 7;

					for (var j = 0; j < totCols; j++) {
						var sel = j >= result.codiciScatole.length ? "" : result.codiciScatole[j] ;
						sel = colStart + sel + colEnd;
						if (j == 0) {
							sel = rowStart + sel;
						}
						if ((j + 1) % 7 == 0) {
							sel = sel + rowEnd;
							if (j < result.codiciScatole.length) {
								sel += rowStart;
							}
						}
						toAppend += sel;
					}
					console.log(totCols);
	
					toAppend += tabEnd;

				console.log(toAppend);
				$('#appendingScatole').html(toAppend);
				
				stampaDistinta() ;
			}
			else {
				$('#danger_msg').text(data.message);
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