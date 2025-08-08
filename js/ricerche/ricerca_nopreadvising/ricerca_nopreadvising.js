var table=null;
$(document).ready(function () {
	alert("ready");
	if($('input[name="descprofilo"]').val()==="Supervisore"){
		loadLstCentriDemat('centroDemat');		
	}	
	
	$('#divDataDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});

    $("#ricercaNoPreadvising").click(function () {
    	console.log('ricercaSospesi start');
        
    	var dataDa = $('#dataDa').val();
        dataDa = dataDa.replaceAll("/","-");        
        var dataA = $('#dataA').val();
        dataA = dataA.replaceAll("/","-");
        var codiceRaccomandata = $("#codiceRaccomandata").val();
        var codiceScatola = $('#codiceScatola').val();
        var accettato = $("#accettato").val();
        var ricevutoPreadv = $('#ricevutoPreadv').val();
        if($('input[name="descprofilo"]').val()==="Supervisore"){
			var	idCentroDemat = $('#centroDemat').val();			
		}else{
			var	idCentroDemat =  $('input[name="centrodemat"]').val();
		}
        var uri = contextPath + "/ricerche/dataTableRicercaNoPreadvising.json?idCentroDemat="+idCentroDemat
        						+ "&dataDa="+dataDa
        						+"&dataA="+dataA
        						+"&id_scatola="+codiceScatola
        						+"&codiceRaccomandata="+codiceRaccomandata
        						+"&accettato="+accettato
        						+"&ricevutoPreadv="+ricevutoPreadv;
        console.log(uri);
        var uri2 = contextPath +  "/ricerche/scatola/dataTableRicercaScatole.json?id_tipo_MaterialitaConforme=&id_tipo_MaterialitaNonConforme=&id_tipo_AnomalieNonSanabili=&id_tipo_AnomalieSanabili=&id_tipo_AnomaliaNonConforme=&id_stato_Scansionata=&id_stato_InAttesaDiDE=&id_stato_DECompletato=&id_stato_CompletaDaRestituire=&id_stato_AssociataAdUnSpedizione=&id_stato_Restituita=&identificativoCliente=&codiceScatola=&letteraDiVettura=";
    	
        $('#tableNoPreadvising').bootstrapTable('selectPage', 1);	
    	$('#tableNoPreadvising').bootstrapTable('refresh', {
    	    url: uri2
    	});	
    	console.log("ok table");

    });
    
    $("#esportaCSV").click(function() {
    	console.log('esportaCSV');    
    	var queryString = '';
    	
    	var dataDa = $('#dataDa').val();
        dataDa = dataDa.replaceAll("/","-");        
        var dataA = $('#dataA').val();
        dataA = dataA.replaceAll("/","-");
        var codiceRaccomandata = $("#codiceRaccomandata").val();
        var codiceScatola = $('#codiceScatola').val();
        
        var accettato = $("#accettato").val();
        var ricevutoPreadv = $('#ricevutoPreadv').val();
        var idCentroDemat = $('#centroDemat').val();
        
        
        queryString+= (dataDa == '')?'':"&dataDa="+dataDa;
        queryString+= (dataA == '')?'':"&dataA="+dataA;
        queryString+= (codiceScatola == '')?'':"&codiceScatola="+codiceScatola;
        queryString+= (codiceRaccomandata == '')?'':"&codiceRaccomandata="+codRaccomandata;
        queryString+= (accettato == '')?'':"&accettato="+accettato;
        queryString+= (ricevutoPreadv == '')?'':"&ricevutoPreadv="+ricevutoPreadv;
        queryString+= (idCentroDemat == '')?'':"&idCentroDemat="+idCentroDemat;

		  queryString+= '&typeExport=SOSPESI';
		  
		  document.location.href = contextPath+ "/download/csv?"+queryString;
    });
});


String.prototype.replaceAll = function(target, replacement) {
	  return this.split(target).join(replacement);
};


//function caricaCentriDemat(){
//	
//	console.log('caricaCentriDemat start');
//	var url = contextPath + '/configurazione/configurazioneCentriDemat/listaCentriDemat';
//	var centroDemat=null;
//	var centroDematSelect = $('#centroDemat');
//	centroDematSelect.empty();
//
//	var centriDematRequest = {  
//			   "data":{  
//				      "centroDemat":centroDemat
//				   }
//				};
//	$.ajax({
//		type : 'POST',
//		url : url,
//		contentType : 'application/json',
//		dataType : 'json',
//		data : JSON.stringify(centriDematRequest),
//		success : function(result) {
//			console.log('success! ', result);		
//            if (result.status){
//				var lstCentriDemat =result.data;
//				centroDematSelect.append("<option value=''> - Seleziona - </option>");
//				for(var i=0; i<lstCentriDemat.length; i++){
//					centroDematSelect.append("<option value='" + lstCentriDemat[i].idCentroDemat + "'>" + lstCentriDemat[i].codiceCentro + "</option>");
//				}
//			}else{
//				$('#danger_msg').text(result.message);
//				$('#div_error_alert').show();
//            }
//		},
//		error : function(xhr, status, error, result) {
//			console.log('errore!');
//			console.log('xhr ', xhr);
//			console.log('status ', status);
//			console.log('error ', error);
//			console.log('result ', result);
//			$('#danger_msg').text(error);
//			$('#div_error_alert').show();
//		}
//	});
