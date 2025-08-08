var table=null;
var loaded=false ;
$(document).ready(function () {
	
	$("#tableDDT").hide();
	
	loadListaFiltriPerStatoDDT() ;
	loadListaFiltriPerClienteDDT() ;
	loadListaFiltriPerTipologiaDDT() ;
	loadListaFiltriPerLottoTerritorialeDDT() ;
	loadListaFiltriPerTipoSpedizioneDDT() ;
	loadListaFiltriPerTipoProdottoDDT() ;
	loadListaFiltriPerModelloDDT() ;


	//button ricerca ddt 
    $("#Cerca").click(function () {
    	$(".bootstrap-table").show(500);	
    	console.log('ricercaDDT start');
    	
    	//stato
    	var filtroStatiSelected="list_id_stati_select=";
        $('#filtriPerStatoDDTCombo :selected').each(function(){
        	filtroStatiSelected+=$(this).val()+"-";
        });
        
        //cliente
        var filtroClientiSelected="&list_id_clienti_select=";
        $('#filtriPerClienteDDTCombo :selected').each(function(){
        	filtroClientiSelected+=$(this).val()+"-";
        });
        
        //tipologia
        var filtroTipologieSelected="&list_id_tipologia_select=";
        $('#filtriPerTipologiaDDTCombo :selected').each(function(){
        	filtroTipologieSelected+=$(this).val()+"-";
        });
        
        
        //lotto
        var filtroLottoSelected="&list_id_lotto_select=";
        $('#filtriPerLottoTerritorialeDDTCombo :selected').each(function(){
        	filtroLottoSelected+=$(this).val()+"-";
        });
        
        //spedizione
        var filtroSpedizioneSelected="&list_id_spedizione_select=";
        $('#filtriPerTipoSpedizioneDDTCombo :selected').each(function(){
        	var text = $(this).text() ;
        	if( text === "N/A" ) {
        		text = "-" ;
        	}
        	filtroSpedizioneSelected+=text+"-";
        });
        
        //prodotto
        var filtroProdottoSelected="&list_id_prodotto_select=";
        $('#filtriPerTipoProdottoDDTCombo :selected').each(function(){
        	filtroProdottoSelected+=$(this).val()+"-";
        });
        
        //modello
        var filtroModelloSelected="&list_id_modello_select=";
        $('#filtriPerModelloDDTCombo :selected').each(function(){
        	filtroModelloSelected+=$(this).val()+"-";
        });

    	var codiceDDT = $("#codiceDDT").val() ;
        var centroDemat = $("input[name='centrodemat']").val() ;
        
    	var uri = contextPath + "/ddt/ricerca/dataTableRicercaDDT?"
    		+ filtroStatiSelected + filtroClientiSelected + filtroTipologieSelected + filtroLottoSelected + filtroSpedizioneSelected 
    		+ filtroProdottoSelected + filtroModelloSelected + "&codiceDDT="+codiceDDT + "&centroDemat="+centroDemat;
    	
    	var pageNumber = $('#tableDDT').bootstrapTable('getOptions').pageNumber;
    	if(!pageNumber)
    		pageNumber = 1
    	
    	waitingDialog.show('Ricerca in corso...');
    	setTimeout(function () {
    		$("#tableDDT").show(1000);
    		$('#tableDDT').bootstrapTable('selectPage', pageNumber);
    		$('#tableDDT').bootstrapTable('refresh', {
    			url: uri
    		});	
    	  waitingDialog.hide();
    	});
    	
    	console.log("uri: " + uri);   	
    });
    
    
    $("#ricercaPallet").click(function () {
    	$(".bootstrap-table").show(500);	
    	console.log('ricercaDDT start');
        
        //cliente
        var filtroClientiSelected="&list_id_clienti_select=";
        $('#filtriPerClienteAddPalletCombo :selected').each(function(){
        	filtroClientiSelected+=$(this).val()+"-";
        });
        
        //tipologia
        var filtroTipologieSelected="&list_id_tipologia_select=";
        $('#filtriPerTipologiaAddPalletCombo :selected').each(function(){
        	filtroTipologieSelected+=$(this).val()+"-";
        });
                
        //lotto
        var filtroLottoSelected="&list_id_lotto_select=";
        $('#filtriPerLottoTerritorialeAddPalletCombo :selected').each(function(){
        	filtroLottoSelected+=$(this).val()+"-";
        });
        
        //spedizione
        var filtroSpedizioneSelected="&list_id_spedizione_select=";
        $('#filtriPerTipoSpedizioneAddPalletCombo :selected').each(function(){
        	filtroSpedizioneSelected+=$(this).text()+"-";
        });
        
        //prodotto
        var filtroProdottoSelected="&list_id_prodotto_select=";
        $('#filtriPerTipoProdottoAddPalletCombo :selected').each(function(){
        	filtroProdottoSelected+=$(this).val()+"-";
        });
        
        //modello
        var filtroModelloSelected="&list_id_modello_select=";
        $('#filtriPerModelloAddPalletCombo :selected').each(function(){
        	filtroModelloSelected+=$(this).val()+"-";
        });

        var filtroCentroDemat="&centroDemat=" + $("input[name='centrodemat']").val();
        
    	var uri = contextPath + "/ddt/ricerca/dataTableAssociaPallet?"
    		 + filtroClientiSelected + filtroTipologieSelected + filtroLottoSelected + filtroSpedizioneSelected + filtroProdottoSelected + filtroModelloSelected  + filtroCentroDemat;
    	
    	var pageNumber = $('#tableAddPallet').bootstrapTable('getOptions').pageNumber;
    	if(!pageNumber)
    		pageNumber = 1
    	
    	waitingDialog.show('Ricerca in corso...');
    	setTimeout(function () {
    		$("#tableAddPallet").show(1000);
    		$('#tableAddPallet').bootstrapTable('selectPage', pageNumber);
    		$('#tableAddPallet').bootstrapTable('refresh', {
    			url: uri
    		});	
    	  waitingDialog.hide();
    	});
    	
    	console.log("uri: " + uri);   	
    });
    
	$("#reset").click(function () {
		$(".bootstrap-table").hide(500);	
		$("#tableDDT").hide(500);
		$("#tableDDT").bootstrapTable();
	    $('input:checkbox').prop("checked", false);
	    $('input:text').val('');
		$('#filtriPerStatoDDTCombo :selected').prop("selected", false);
	    $('#filtriPerClienteDDTCombo :selected').prop("selected", false);
	    $('#filtriPerTipologiaDDTCombo :selected').prop("selected", false);
	});
	
	$("#esportaCSV").click(function() {
    	console.log('esportaCSV');    
    	$(".bootstrap-table").show(500);	
    	console.log('ricercaDDT start - export csv');
    	
    	var filtroStatiSelected="list_id_stati_select=";
        $('#filtriPerStatoDDTCombo :selected').each(function(){
        	filtroStatiSelected+=$(this).val()+"-";
        });
        
        //cliente
        var filtroClientiSelected="&list_id_clienti_select=";
        $('#filtriPerClienteDDTCombo :selected').each(function(){
        	filtroClientiSelected+=$(this).val()+"-";
        });
        
        //tipologia
        var filtroTipologieSelected="&list_id_tipologia_select=";
        $('#filtriPerTipologiaDDTCombo :selected').each(function(){
        	filtroTipologieSelected+=$(this).val()+"-";
        });
    	
        var centroDemat = $("input[name='centrodemat']").val() ;
        
    	var codiceDDT = $("#codiceDDT").val() ;
    	var uri = contextPath + "/ddt/ricerca/dataTableRicercaDDT?"
		+ filtroStatiSelected + filtroClientiSelected + filtroTipologieSelected + "&codiceDDT="+codiceDDT + "&centroDemat="+centroDemat + "&sort=CODICE_DDT&order=desc&offset=0&limit=10000";
    	console.log(uri);
    	$.ajax({
			url: uri,
			method: "GET",
			success: function(data) {
				console.log('success! ', data);
				var csv = 
					'"DDT_ID";'+
					'"CODICE_DDT";'+
					'"STATO_DDT_TYPE_ID";'+
					'"DATA_DDT";'+
					'"TIPO_DOC_ID";'+
					'"CLIENTE_ID";'+
					'"CODICE_LOTTO_TERRITORIALE_ID";'+
					'"TIPO_MODELLO_ID";'+
					'"TIPO_SPEDIZIONE_DOC";'+
					'"TIPO_POSTA_TYPE_ID";'+
					'"TOTALE_SCATOLE";'+
					'"SPEDIZIONE_ID";'+
					'"CLIENTE_IND_REST_ID";'+
					'"CENTRO_DEMAT_ID";'+
					'"OPERATORE_ID";' ;
					'"POSTAZIONE_ID";'+
					'"DATA_INSERIMENTO";'+
					'"DATA_AGGIORNAMENTO";'+
					'"TOTALE_PALLET";' ;
				var dataTmp = JSON.parse(data);
				for(i = 0; i < dataTmp.rows.length; i++) {
					
		    		row = dataTmp.rows [i];
		    		var csvrow=
		    				'"' + row["DDT_ID"]				+ '"' + ';'
		    			+	'"' + row["CODICE_DDT"]				+ '"' + ';'
		    			+	'"' + row["STATO_DDT_TYPE_ID"]				+ '"' + ';'
		    			+	'"' + row["DATA_DDT"]		+ '"' + ';'
		    			+	'"' + row["TIPO_DOC_ID"]		+ '"' + ';'
		    			+	'"' + row["CLIENTE_ID"]					+ '"' + ';'
		    			+	'"' + row["CODICE_LOTTO_TERRITORIALE_ID"]	+ '"' + ';'
		    			+	'"' + row["TIPO_MODELLO_ID"] 				+ '"' + ';'
		    			+	'"' + row["TIPO_SPEDIZIONE_DOC"] 				+ '"' + ';'
		    			+	'"' + row["TIPO_POSTA_TYPE_ID"]			+ '"' + ';'
		    			+	'"' + row["TOTALE_SCATOLE"]			+ '"' + ';'
		    			+	'"' + row["SPEDIZIONE_ID"]			+ '"' + ';'
		    			+	'"' + row["CLIENTE_IND_REST_ID"]			+ '"' + ';'
		    			+	'"' + row["CENTRO_DEMAT_ID"]		+ '"' + ';'
		    			+	'"' + row["OPERATORE_ID"]					+ '"' + ';'
		    			+	'"' + row["POSTAZIONE_ID"]			+ '"' + ';'
		    			+	'"' + row["DATA_INSERIMENTO"]			+ '"' + ';'
		    			+	'"' + row["DATA_AGGIORNAMENTO"]			+ '"' + ';'
		    			+	'"' + row["TOTALE_PALLET"]			+ '"' + ';'
		    		
		    		;
		    		//console.log(csvrow)
		    		csv += '\n' + csvrow;
		    		//console.log(csv)
		    		
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
	
	$('#dissassociaModalBtn').click(function(){
		var DDTID = $('#ddtId').val() ;
		var selected = $('#tableDettDDT').bootstrapTable('getSelections') ;
		var selectedIds = "" ;
		for( var i = 0 ; i < selected.length ; i++ ) {
			selectedIds += selected[i].PALLET_ID + "-" ;
		}
		
		var url=contextPath + "/ddt/dissassociaDaDDT?DDTID=" + DDTID + "&selectedIds=" + selectedIds ;
		
		console.log('url= ' + url );
		
		if( selectedIds == "" ) {
			alert( "Selezionare dei pallet prima di procedere" ) ;
			return ;
		}
		
		if( !confirm( "Siete sicuri di voler disassociare i pallet selezionati dal DDT?" ) ) {
			return ;
		}
		waitingDialog.show('Operazione in corso...');
		$.ajax({
			type : 'GET',
			url : url,
			success : function(data) {
				var lst = data.data;
				if( data.status ) {
					$('#dettaglioDDTModal').modal('toggle') ;
					setTimeout( function(){
						$("#Cerca").click() ;
					} , 1000 ) ;
					$('#success_msg').text(data.message);
					$('#div_success_alert').show();
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
		
		
	});
	
	$(document).on( 'click' , '#stampaDistintaModalBtn' ,  function() {
		var divToPrint=document.getElementById('printBody');

		  var newWin=window.open('','Print-Window');

		  newWin.document.open();

		  newWin.document.write('<html><head></head><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

		  newWin.document.close();

		  //setTimeout(function(){newWin.close();},10);
	} ) ;
	
	
	$(document).on( 'show.bs.modal' , '#distintaDDTModal' , function() {
		var url = contextPath + '/ddt/getDatiDistinta?ddtId=' + $('#distintaDDTModal').data( "ddtId" ) ;
		
		$.ajax({
			type : 'GET',
			url : url,
			success : function(result) {
				var data = result.data.data;//no, non lo so
				if( result.status ) {
					console.log( data ) ;
					$('#numeroDDT').text( data.codiceDDT ) ;
					$('#numeroPallet').text( data.listaPallet.length ) ;
					$('#dataDDT').text( data.dataDDT ) ;
					
					var numScatole = 0 ;
					
					for( var i = 0 ; i < data.listaPallet.length ; i++ ) {
						numScatole += data.listaPallet[i].listaScatole.length ;
					}
					
					$('#numeroScatole').text( numScatole ) ;
					
					$('#barcodeDDT').attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+data.codiceDDT+"-"+data.dataDDT) ;
					
					//TAB_START
					
					var toAppend = "";

					var tabStart = '<table style="text-align:center;width:100%">';
					var tabEnd = "</table>";

					var wideColStart = '<td colspan="7">';
					var wideColEnd = "</td>";

					var rowStart = '<tr>';
					var rowEnd = "</tr>";

					var colStart = '<td>';
					var colEnd = "</td>";

					for (var i = 0; i < data.listaPallet.length; i++) {
						toAppend += tabStart ;

						toAppend += rowStart + wideColStart + "<h3><strong>Codice Pallet: </strong>" + data.listaPallet[i].codicePallet + "</h3>" + wideColEnd + rowEnd ;
						toAppend += rowStart + wideColStart + "<h4><strong>Numero Scatole: </strong>" + data.listaPallet[i].listaScatole.length + "</h4>" + wideColEnd + rowEnd ;

						var totCols = (Math.round(data.listaPallet[i].listaScatole.length / 7) + 1) * 7;

						for (var j = 0; j < totCols; j++) {
							var sel = j >= data.listaPallet[i].listaScatole.length ? "" : data.listaPallet[i].listaScatole[j].codiceScatola ;
							sel = colStart + sel + colEnd;
							if (j == 0) {
								sel = rowStart + sel;
							}
							if ((j + 1) % 7 == 0) {
								sel = sel + rowEnd;
								if (j < data.listaPallet[i].listaScatole.length) {
									sel += rowStart;
								}
							}
							toAppend += sel;
						}

						console.log(totCols);

						toAppend += tabEnd;
						toAppend += '<div class="col-xs-12 col-md-12 col-sm-12 col-lg-12"><hr></div>';
					}

					console.log(toAppend);
					$('#appendingPallets').html(toAppend);
					
//					for( var i = 0 ; i < data.listaPallet.length ; i++ ) {
//						toAppend += '<div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 text-center"><h3><span>Codice Pallet: '+data.listaPallet[i].codicePallet+'</span></h3><div class="col-xs-12 col-ms-12 col-sm-12 col-lg-12"><span>Numero scatole: '+data.listaPallet[i].listaScatole.length+'</span></div></div>' ;
//						for( var j=0 ; j<data.listaPallet[i].listaScatole.length ; j++ ) {
//							toAppend += '<div class="col-xs-2 col-md-2 col-sm-2 col-lg-2"><p>'+ data.listaPallet[i].listaScatole[j].codiceScatola +'</p></div>' ;
//						}
//						toAppend += '<div class="col-xs-12 col-md-12 col-sm-12 col-lg-12"><hr></div>' ;
//					}
					
					//TAB_END
				}
				else {
					$('#danger_msg').text(data.message);
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
	} ) ;
	
	$('#associa').click( function() {
		$('#associaPalletDDTModal').modal( 'show' ) ;
		
		if( !loaded ) {
			loadListaFiltriPerClienteAddPallet() ;
			loadListaFiltriPerTipologiaAddPallet() ;
			loadListaFiltriPerLottoTerritorialeAddPallet() ;
			loadListaFiltriPerTipoSpedizioneAddPallet() ;
			loadListaFiltriPerTipoProdottoAddPallet() ;
			loadListaFiltriPerModelloAddPallet() ;
			
			loaded = true ;
		}
		$("#ricercaPallet").click();
	} ) ;
	
	$(document).on( "click" , "#associaModalBtn" , function() {
		var selected = $('#tableAddPallet').bootstrapTable('getSelections') ;
		var selectedIds = "" ;
		for( var i = 0 ; i < selected.length ; i++ ) {
			selectedIds += selected[i].PALLET_ID + "-" ;
		}
		var operatoreId = $('#operatoreId').val() ;
		var postazione = $('#postazione').val() ;
		var centroDemat = $('#centroDemat').val() ;
		
		var url=contextPath + "/ddt/associaADDT?selectedIds=" + selectedIds + "&operatoreId=" + operatoreId + "&postazione=" + postazione + "&centroDemat=" + centroDemat;
		
		console.log('url= ' + url );
		
		if( selectedIds == "" ) {
			alert( "Selezionare dei pallet prima di procedere" ) ;
			return ;
		}
		
		if( !confirm( "Siete sicuri di voler associare i pallet selezionati dal DDT?" ) ) {
			return ;
		}
		waitingDialog.show('Operazione in corso...');
		$.ajax({
			type : 'GET',
			url : url,
			success : function(data) {
				var lst = data.data;
				if( data.status ) {
					$('#associaPalletDDTModal').modal('hide') ;
					setTimeout( function(){
//						$("#ricercaPallet").click();
						$("#Cerca").click() ;
					} , 1000 ) ;
					$('#success_msg').text(data.message);
					$('#div_success_alert').show();
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
//		waitingDialog.hide();
	} ) ;
});

function loadListaFiltriPerStatoDDT() {
	var url = contextPath + '/ddt/getListStatiFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerStatoDDTCombo");
}

function loadListaFiltriPerClienteDDT() {
	var url = contextPath + '/ddt/getListClientiFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerClienteDDTCombo");
}

function loadListaFiltriPerTipologiaDDT() {
	var url = contextPath + '/ddt/getListTipiFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerTipologiaDDTCombo");
}

function loadListaFiltriPerLottoTerritorialeDDT() {
	var url = contextPath + '/ddt/getListLottiFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerLottoTerritorialeDDTCombo");
}

function loadListaFiltriPerTipoSpedizioneDDT() {
	var url = contextPath + '/ddt/getListTipiSpedizioneFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerTipoSpedizioneDDTCombo");
}

function loadListaFiltriPerTipoProdottoDDT() {
	var url = contextPath + '/ddt/getListTipiProdottoFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerTipoProdottoDDTCombo");
}

function loadListaFiltriPerModelloDDT() {
	var url = contextPath + '/ddt/getListModelliFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerModelloDDTCombo");
}

function loadListaFiltriPerClienteAddPallet() {
	var url = contextPath + '/ddt/getListClientiFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerClienteAddPalletCombo");
}

function loadListaFiltriPerTipologiaAddPallet() {
	var url = contextPath + '/ddt/getListTipiFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerTipologiaAddPalletCombo");
}

function loadListaFiltriPerLottoTerritorialeAddPallet() {
	var url = contextPath + '/ddt/getListLottiFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerLottoTerritorialeAddPalletCombo");
}

function loadListaFiltriPerTipoSpedizioneAddPallet() {
	var url = contextPath + '/ddt/getListTipiSpedizioneFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerTipoSpedizioneAddPalletCombo");
}

function loadListaFiltriPerTipoProdottoAddPallet() {
	var url = contextPath + '/ddt/getListTipiProdottoFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerTipoProdottoAddPalletCombo");
}

function loadListaFiltriPerModelloAddPallet() {
	var url = contextPath + '/ddt/getListModelliFiltroRicercaDDT';
	loadListaFiltri(url, "#filtriPerModelloAddPalletCombo");
}

function loadListaFiltri(url, comboName) {
	$.ajax({
		type : 'GET',
		url : url,
		success : function(data) {
			var lst = data.data;
			if( data.status ) {
				if(lst.length < 1){
					alert("Nessuni filtri trovati.");
				}else{
					for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				var desc = obj.descrizione ;
	    				if( desc === "-" ) {
	    					desc = "N/A" ;
	    				}
	    				$(comboName).append("<option value=\""+obj.value+"\">"+desc+"</option>");
					}
				}
			}
			else {
				$('#danger_msg').text(data.message);
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

function openDettagliDDT( DDTID , codiceDDT , totPallet , modify ) {
	$('#dettaglioDDTModal').modal('toggle') ;
	
	$('#title_cod_DDT').text(codiceDDT) ;
	$('#title_tot_pallet').text(totPallet) ;
	
	$('#ddtId').val( DDTID ) ;
	
	var uri = contextPath + "/ddt/ricerca/dataTabledettaglioDDT?id_ddt="+DDTID ;
	
	var pageNumber = $('#tableDDT').bootstrapTable('getOptions').pageNumber;
	if(!pageNumber)
		pageNumber = 1
	
	waitingDialog.show('Ricerca in corso...');
	setTimeout(function () {
		$("#tableDettDDT").show(1000);
		$('#tableDettDDT').bootstrapTable('selectPage', pageNumber);
		$('#tableDettDDT').bootstrapTable('refresh', {
			url: uri
		});	
	  waitingDialog.hide();
	  
	  if( !modify ) {
		  $('#dissassociaModalBtn').hide();
		  $('#tablePalletScatola').bootstrapTable('hideColumn' , 'selection') ;
	  }
	  else{
		  $('#dissassociaModalBtn').show();
		  $('#tablePalletScatola').bootstrapTable('showColumn' , 'selection') ;
	  }
	});
}

function chiudiDDT( ddtId ) {
	
	var url = contextPath + "/ddt/chiudiDDT" ;
	
	if( !confirm( "Siete sicuri di voler chiudere il DDT?" ) ) {
		return ;
	}
	waitingDialog.show('Operazione in corso...');
	$.ajax({
		type : 'POST',
		data : JSON.stringify( ddtId ) ,
		url : url,
		success : function(data) {
			var lst = data.data;
			if( data.status ) {
				$('#success_msg').text(data.message);
				$('#div_success_alert').show();
				waitingDialog.hide() ;
				setTimeout( function(){
					$("#Cerca").click() ;
				} , 1000 );
			}
			else {
				$('#danger_msg').text(data.message);
				$('#div_error_alert').show();
				waitingDialog.hide() ;
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

function stampaDDT( ddtId ) {
	$('#dettaglioDDTModal').modal('hide') ;
	$('#distintaDDTModal').data( "ddtId" , ddtId ) ;
	$('#distintaDDTModal').modal( 'show' ) ;
}