
$(document).ready(function() {
	loadLstIdentificativoPA("identificativoPA",0);
	loadLstTipIstanza("codiceTipoIstanza",0);
	if($('input[name="descprofilo"]').val()==="Supervisore"){
		loadLstCentriDemat('centroDemat');		
	}	

	$('#divDataAccDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataAccA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	
	$('#divDataScadDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataScadA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});

	$('#dettaglioPacchettoModal').on('shown.bs.modal', function () {
	    $(this).find('.modal-dialog').css({width:'auto',
	                               height:'auto', 
	                              'max-height':'100%'});
	});
	
	$("#ricercaPraticaSLA").click(function() {
		console.log('ricercaPraticaSLA start');
		if($('input[name="descprofilo"]').val()==="Supervisore"){
			var	centroDemat = $('#centroDemat').val();			
		}else{
			var	centroDemat =  $('input[name="centrodemat"]').val();
		}
		var identificativoPA = $('#identificativoPA').val();
		var codiceTipoIstanza = $('#codiceTipoIstanza').val();
		var codiceRaccomandata = $('#codiceRaccomandata').val();
		var out_sla = $('#out_sla').val();
		var in_sla = $('#in_sla').val();
		var in_corso = $('#in_corso').val();		
		
		var data_accettazione_da = $('#dataAccettazioneDa').val();
		data_accettazione_da = data_accettazione_da.replaceAll("/","-");

		var data_accettazione_a = $('#dataAccettazioneA').val();
		data_accettazione_a = data_accettazione_a.replaceAll("/","-");
	
		var data_scadenza_da = $('#dataScadenzaDa').val();
		data_scadenza_da = data_scadenza_da.replaceAll("/","-");

		var data_scadenza_a = $('#dataScadenzaA').val();
		data_scadenza_a = data_scadenza_a.replaceAll("/","-");
		
		var uri = contextPath + "/ricerche/dataTableRicercaSla.json?idAnagrPA="+identificativoPA
		+ "&idIstanza="+codiceTipoIstanza
		+"&codiceRaccomandata="+codiceRaccomandata
		+"&outSla="+out_sla
		+"&inSla="+in_sla
		+"&inCorso="+in_corso
		+"&dataAccettazioneDa="+data_accettazione_da
		+"&dataAccettazioneA="+data_accettazione_a
		+"&dataScadenzaDa="+data_scadenza_da
		+"&dataScadenzaA="+data_scadenza_a
		+"&centroDemat="+centroDemat;
		console.log(uri);
		
		$('#tablePraticaSLA').bootstrapTable('selectPage', 1);	
		$('#tablePraticaSLA').bootstrapTable('refresh', {
			url: uri
		});	
	});
	
	 $("#esportaCSV").click(function() {
	    	console.log('esportaCSV');    
	    	var queryString = '';
	    	if($('input[name="descprofilo"]').val()==="Supervisore"){
				var	centroDemat = $('#centroDemat').val();			
			}else{
				var	centroDemat =  $('input[name="centrodemat"]').val();
			}
	    	var identificativoPA = $('#identificativoPA').val();
			var codiceTipoIstanza = $('#codiceTipoIstanza').val();
			var codiceRaccomandata = $('#codiceRaccomandata').val();
			var out_sla = $('#out_sla').val();
			var in_sla = $('#in_sla').val();
			var in_corso = $('#in_corso').val();		
			
			var data_accettazione_da = $('#dataAccettazioneDa').val();
			data_accettazione_da = data_accettazione_da.replaceAll("/","-");

			var data_accettazione_a = $('#dataAccettazioneA').val();
			data_accettazione_a = data_accettazione_a.replaceAll("/","-");
		
			var data_scadenza_da = $('#dataScadenzaDa').val();
			data_scadenza_da = data_scadenza_da.replaceAll("/","-");

			var data_scadenza_a = $('#dataScadenzaA').val();
			data_scadenza_a = data_scadenza_a.replaceAll("/","-");

	        
	        queryString+= (identificativoPA == '')?'':"&idAnagrPA="+identificativoPA;
	        queryString+= (codiceTipoIstanza == '')?'':"&idIstanza="+codiceTipoIstanza;
	        queryString+= (codiceRaccomandata == '')?'':"&codiceRaccomandata="+codiceRaccomandata;
	        queryString+= (out_sla == '')?'':"&out_sla="+out_sla;
	        queryString+= (in_sla == '')?'':"&in_sla="+in_sla;
	        queryString+= (in_corso == '')?'':"&in_corso="+in_corso;
	        queryString+= (data_accettazione_da == '')?'':"&dataDa="+data_accettazione_da;
	        queryString+= (data_accettazione_a == '')?'':"&dataA="+data_accettazione_a;
	        queryString+= (data_scadenza_da == '')?'':"&dataDa_1="+data_scadenza_da;
	        queryString+= (data_scadenza_a == '')?'':"&dataA_1="+data_scadenza_a;
	        queryString+= (centroDemat == '')?'':"&centroDemat="+centroDemat;

			  queryString+= '&typeExport=SLA';
			  console.log(queryString);
			  document.location.href = contextPath+ "/download/csv?"+queryString;
	    });
});


String.prototype.replaceAll = function(target, replacement) {
	  return this.split(target).join(replacement);
	};
	
