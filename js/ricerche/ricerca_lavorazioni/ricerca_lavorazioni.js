var table=null;
var tablePac=null;
var tableSca=null;

$(document).ready(function() {
	loadLstStato("statoPratica","PRATICA");
	if($('input[name="descprofilo"]').val()==="Supervisore"){
		loadLstCentriDemat('centroDemat_pratiche');		
		loadLstCentriDemat('centroDemat_pacchetto');		
		loadLstCentriDemat('centroDemat_scatole');		
	}	
	
	$('#divDataOpeDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataOpeA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});

	$('#divDataAggDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataAggA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCreazScDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCreazScA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataAggScDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataAggScA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});

		
	$("#ricercaLavorazioniPratiche").click(function() {
		console.log('ricercaLavorazioniPratiche start');
		var statoPratica = $('#statoPratica').val();
		var codiceRaccomandata = $('#codiceRaccomandata').val();
		var data_operazione_da = $('#dataOperazioneDa').val();
		data_operazione_da = data_operazione_da.replaceAll("/","-");
		var data_operazione_a = $('#dataOperazioneA').val();
		data_operazione_a = data_operazione_a.replaceAll("/","-");
		var centroDemat = '';			
		if($('input[name="descprofilo"]').val()==="Supervisore"){
			centroDemat = $('#centroDemat_pratiche').val();			
		}else{
			centroDemat =  $('input[name="centrodemat"]').val();
		}

		var uri = contextPath
				+ "/ricerche/dataTableRicercheLavPratiche.json?statoPratica="
				+ statoPratica
				+ "&codiceRaccomandata=" + codiceRaccomandata
				+ "&data_operazione_da=" + data_operazione_da
				+ "&centroDemat="+centroDemat
				+ "&data_operazione_a=" + data_operazione_a;
		
	
		console.log('URI.. -> '+uri);
//		$('#tableLavorazioniPratiche').bootstrapTable('selectPage', 1);	
		$('#tableLavorazioniPratiche').bootstrapTable('refresh', {
		    url: uri
		});
		
		
	});

	$("#ricercaLavorazioniPacchetto").click(function() {
		console.log('ricercaLavorazioniPacchetto start');
		
		var codicePacchetto = $('#codicePacchetto').val();
		var data_aggiornamento_da = $('#dataAggiornamentoDa').val();
		data_aggiornamento_da = data_aggiornamento_da.replaceAll("/","-");
		var data_aggiornamento_a = $('#dataAggiornamentoA').val();
		data_aggiornamento_a = data_aggiornamento_a.replaceAll("/","-");
		var centroDemat = '';			
		if($('input[name="descprofilo"]').val()==="Supervisore"){
			centroDemat = $('#centroDemat_pacchetto').val();			
		}else{
			centroDemat =  $('input[name="centrodemat"]').val();
		}
		var uri = contextPath
				+ "/ricerche/dataTableRicercheLavPacchetto.json?codicePacchetto="
				+ codicePacchetto
				+ "&centroDemat="+centroDemat
				+ "&dataAggiornamentoDa=" + data_aggiornamento_da
				+ "&dataAggiornamentoA="
				+ data_aggiornamento_a;
	
		console.log('URI.. -> '+uri);
//		$('#tableLavorazioniPacchetto').bootstrapTable('selectPage', 1);		
		$('#tableLavorazioniPacchetto').bootstrapTable('refresh', {
		    url: uri
		});
		
	});
	
	

    $("#ricercaLavorazioniScatole").click(function () {
    	console.log('ricercaLavorazioniScatole start');
		
    	var dataCreazioneDa = $('#dataCreazioneScDa').val();
        dataCreazioneDa = dataCreazioneDa.replaceAll("/","-");        
        var dataCreazioneA = $('#dataCreazioneScA').val();
        dataCreazioneA = dataCreazioneA.replaceAll("/","-");
        var dataAggiornamentoDa = $('#dataAggiornamentoScDa').val();
        dataAggiornamentoDa = dataAggiornamentoDa.replaceAll("/","-");        
        var dataAggiornamentoA = $('#dataAggiornamentoScA').val();
        dataAggiornamentoA = dataAggiornamentoA.replaceAll("/","-");
        var codiceScatola = $('#codiceScatola').val();
        var centroDemat = '';			
		if($('input[name="descprofilo"]').val()==="Supervisore"){
			centroDemat = $('#centroDemat_scatole').val();			
		}else{
			centroDemat =  $('input[name="centrodemat"]').val();
		}
		var uri = contextPath
				+ "/ricerche/dataTableRicercheLavScatola.json?dataCreazioneDa="
				+ dataCreazioneDa
				+ "&dataCreazioneA=" + dataCreazioneA
				+ "&centroDemat="+centroDemat
				+ "&dataAggiornamentoDa="+ dataAggiornamentoDa
				+ "&dataAggiornamentoA="+ dataAggiornamentoA
				+ "&codiceScatola="+ codiceScatola;
	
		console.log('URI.. -> '+uri);
//		$('#tableLavorazioniScatole').bootstrapTable('selectPage', 1);		
		$('#tableLavorazioniScatole').bootstrapTable('refresh', {
		    url: uri
		});

    });
    
	  $("#esportaCSV_Pratiche").click(function() {
		  var queryString = '';
		  var centroDemat = '';
			if($('input[name="descprofilo"]').val()==="Supervisore"){
				centroDemat = $('#centroDemat_pratiche').val();			
			}else{
				centroDemat =  $('input[name="centrodemat"]').val();
			}
		  var codiceRaccomandata = $('#codiceRaccomandata').val() === '' ? '': queryString+= 'codiceRaccomandata='+$('#codiceRaccomandata').val()+'&';
		  var statoPacchetto = $('#statoPratica').val() === '' ? '': queryString+= 'stato='+$('#statoPratica').val()+'&';
		  centroDemat = $('#centroDemat').val() === '' ? '': queryString+= 'centroDemat='+centroDemat+'&';
		  var dataDa = $('#dataOperazioneDa').val()  === '' ? '': queryString+= 'dataDa='+$('#dataOperazioneDa').val().replaceAll("/","-")+'&';
		  var dataA = $('#dataOperazioneA').val() === '' ? '': queryString+= 'dataA='+$('#dataOperazioneA').val().replaceAll("/","-")+'&';
		  var codicePacchetto = $('#codicePacchetto').val() === '' ? '': queryString+= 'codicePacchetto='+$('#codicePacchetto').val()+'&';		 
		  queryString+= 'typeExport=LAVORAZIONI_PRATICHE';		  
		  document.location.href = contextPath+ "/download/csv?"+queryString;		
		
	  });
	  
	  $("#esportaCSV_Pacchetto").click(function() {
		  var queryString = '';
		  var centroDemat = '';
			if($('input[name="descprofilo"]').val()==="Supervisore"){
				centroDemat = $('#centroDemat_pacchetto').val();			
			}else{
				centroDemat =  $('input[name="centrodemat"]').val();
			}
			centroDemat = $('#centroDemat').val() === '' ? '': queryString+= 'centroDemat='+centroDemat+'&';
		  var codicePacchetto = $('#codicePacchetto').val() === '' ? '': queryString+= 'codicePacchetto='+$('#codicePacchetto').val()+'&';		 
		  var dataDa = $('#dataAggiornamentoDa').val()  === '' ? '': queryString+= 'dataDa='+$('#dataAggiornamentoDa').val().replaceAll("/","-")+'&';
		  var dataA = $('#dataAggiornamentoA').val() === '' ? '': queryString+= 'dataA='+$('#dataAggiornamentoA').val().replaceAll("/","-")+'&';		 	 
		  queryString+= 'typeExport=LAVORAZIONI_PACCHETTO';		  
		  document.location.href = contextPath+ "/download/csv?"+queryString;		
		
	  });
	  
	  $("#esportaCSV_Scatole").click(function() {
		  var queryString = '';
		  var centroDemat = '';
			if($('input[name="descprofilo"]').val()==="Supervisore"){
				centroDemat = $('#centroDemat_scatole').val();			
			}else{
				centroDemat =  $('input[name="centrodemat"]').val();
			}
			centroDemat = $('#centroDemat').val() === '' ? '': queryString+= 'centroDemat='+centroDemat+'&'; 
		  
		  var codiceScatola = $('#codiceScatola').val() === '' ? '': queryString+= 'codiceScatola='+$('#codiceScatola').val()+'&';
		  var statoPacchetto = $('#statoPratica').val() === '' ? '': queryString+= 'stato='+$('#statoPratica').val()+'&';
		  var dataDa = $('#dataAggiornamentoScDa').val()  === '' ? '': queryString+= 'dataDa='+$('#dataAggiornamentoScDa').val().replaceAll("/","-")+'&';
		  var dataA = $('#dataAggiornamentoScA').val() === '' ? '': queryString+= 'dataA='+$('#dataAggiornamentoScA').val().replaceAll("/","-")+'&';
		  var dataDa_1 = $('#dataCreazioneScDa').val()  === '' ? '': queryString+= 'dataDa_1='+$('#dataCreazioneScDa').val().replaceAll("/","-")+'&';
		  var dataA_1 = $('#dataCreazioneScA').val() === '' ? '': queryString+= 'dataA_1='+$('#dataCreazioneScA').val().replaceAll("/","-")+'&';
			 
		  queryString+= 'typeExport=LAVORAZIONI_SCATOLE';		  
		  document.location.href = contextPath+ "/download/csv?"+queryString;		
		
	  });

});





String.prototype.replaceAll = function(target, replacement) {
	  return this.split(target).join(replacement);
	};
	