var table=null;
$(document).ready(function () {
	loadLstIdentificativoPA("identificativoPA",0);
	loadLstTipIstanza("codiceTipoIstanza",0);
	
//	table = $('#tablePreadvising').DataTable({
//		
//		"columnDefs" : [ {
//			"targets" : [ 0 ],
//			"visible" : true,
//			"searchable" : true
//		} ],
//		"language": {
//            "lengthMenu": "",
//            "zeroRecords": "Non sono stati trovati record",
//            "info": "Mostra pagina _PAGE_ di _PAGES_",
//            "infoEmpty": "Non ci sono record",
//            "infoFiltered": "(Filtrati da _MAX_ record totali)",
//            "search": "Ricerca:",
//            "paginate": {
//                "first":      "Primo",
//                "last":       "Ultimo",
//                "next":       "Prossimo",
//                "previous":   "Precedente"
//            }
//        }
//		
//	});

	
	$('#divDataAccDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataAccA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCarDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCarA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});

    $("#esportaCSV").click(function() {
    	console.log('esportaCSV');    
		  var queryString = '';		  
		  var idAnagrPA = $('#identificativoPA').val() === '' ? '': queryString+= 'idAnagrPA='+$('#identificativoPA').val()+'&';
		  var idIstanza =$('#codiceTipoIstanza').val() === '' ? '': queryString+= 'idIstanza='+$('#identificativoPA').val()+'&';
		  var codiceIstanza = $('#codiceIstanza').val() === '' ? '': queryString+= 'codiceIstanza='+$('#codiceIstanza').val()+'&';		
		  var dataDa = $('#dataCaricamentoDa').val()  === '' ? '': queryString+= 'dataDa='+$('#dataCaricamentoDa').val().replaceAll("/","-")+'&';
		  var dataA = $('#dataCaricamentoA').val() === '' ? '': queryString+= 'dataA='+$('#dataCaricamentoA').val().replaceAll("/","-")+'&';
		  var dataDa_1 = $('#dataAccettazioneDa').val()  === '' ? '': queryString+= 'dataDa_1='+$('#dataAccettazioneDa').val().replaceAll("/","-")+'&';
		  var dataA_1 = $('#dataAccettazioneA').val() === '' ? '': queryString+= 'dataA_1='+$('#dataAccettazioneA').val().replaceAll("/","-")+'&';
		  var codiceRaccomandata = $('#codiceRaccomandata').val() === '' ? '': queryString+= 'codiceRaccomandata='+$('#codiceRaccomandata').val()+'&';		
		  queryString+= 'typeExport=PREADVISING';
		  
		  document.location.href = contextPath+ "/download/csv?"+queryString;
    });

    $("#ricercaPreadvising").click(function () {
    	console.log('ricercaPreadvising start');    	
    	
      var dataCaricamentoDa = $('#dataCaricamentoDa').val();
      dataCaricamentoDa = dataCaricamentoDa.replaceAll("/","-");        
      var dataCaricamentoA = $('#dataCaricamentoA').val();
      dataCaricamentoA = dataCaricamentoA.replaceAll("/","-");
      var dataAccettazioneDa = $('#dataAccettazioneDa').val();
      dataAccettazioneDa = dataAccettazioneDa.replaceAll("/","-");        
      var dataAccettazioneA = $('#dataAccettazioneA').val();
      dataAccettazioneA = dataAccettazioneA.replaceAll("/","-");
      var identificativoPA = $("#identificativoPA option:selected").text();
      var codiceTipoIstanza = $("#codiceTipoIstanza option:selected").text();
      if(codiceTipoIstanza=='- Seleziona -') codiceTipoIstanza='';
      if(identificativoPA=='- Seleziona -') identificativoPA='';
      var codiceIstanza = $('#codiceIstanza').val();
      var codiceRaccomandata = $("#codiceRaccomandata").val();
      
		var uri = contextPath
				+ "/ricerche/dataTableRicercaPreadvising.json?dataCaricamentoDa="+ dataCaricamentoDa
				+ "&dataCaricamentoA=" + dataCaricamentoA
				+ "&dataAccettazioneDa="+ dataAccettazioneDa
				+ "&dataAccettazioneA="+ dataAccettazioneA
				+ "&identificativoPA="+ identificativoPA
				+ "&codiceTipoIstanza="+ codiceTipoIstanza
				+ "&codiceIstanza="+ codiceIstanza
				+ "&codiceRaccomandata="+ codiceRaccomandata;
				
	
		console.log('URI.. -> '+uri);
		$('#tablePreadvising').bootstrapTable('selectPage', 1);		
		$('#tablePreadvising').bootstrapTable('refresh', {
		    url: uri
		});
//    	waitingDialog.show();
//        console.log('ricercaPreadvising start');
//        var url = contextPath + '/ricerche/preadvising/ricercaPreadvising';
//
//    	table.clear().draw(false);
//
////    	if ($("#flag_anomalia").val()=='off') {
////	    	$("#flag_anomalia").val("F");
////	    }
////	    if ($("#flag_anomalia").val()=='on') {
////	    	$("#flag_anomalia").val("V");
////	    }
//
//    	
//        var dataCaricamentoDa = $('#dataCaricamentoDa').val();
//        dataCaricamentoDa = dataCaricamentoDa.replaceAll("/","-");        
//        var dataCaricamentoA = $('#dataCaricamentoA').val();
//        dataCaricamentoA = dataCaricamentoA.replaceAll("/","-");
//        var dataAccettazioneDa = $('#dataAccettazioneDa').val();
//        dataAccettazioneDa = dataAccettazioneDa.replaceAll("/","-");        
//        var dataAccettazioneA = $('#dataAccettazioneA').val();
//        dataAccettazioneA = dataAccettazioneA.replaceAll("/","-");
//        //var identificativoPA = $('#identificativoPA').val();
//        var identificativoPA = $("#identificativoPA option:selected").text();
//        //var codiceTipoIstanza = $('#codiceTipoIstanza').val();
//        var codiceTipoIstanza = $("#codiceTipoIstanza option:selected").text();
//        if(codiceTipoIstanza=='- Seleziona -') codiceTipoIstanza=null;
//        if(identificativoPA=='- Seleziona -') identificativoPA=null;
//        var codiceIstanza = $('#codiceIstanza').val();
//        var codiceRaccomandata = $("#codiceRaccomandata").val();
//        
//        console.log('dataCaricamentoDa ',dataCaricamentoDa);
//        console.log('dataCaricamentoA ',dataCaricamentoA);
//        console.log('dataAccettazioneDa ',dataAccettazioneDa);
//        console.log('dataAccettazioneA ',dataAccettazioneA);
//        var preadvisingRequest = {
//            "data": {
//                "dataCaricamentoDa": dataCaricamentoDa,
//                "dataCaricamentoA": dataCaricamentoA,
//                "dataAccettazioneDa": dataAccettazioneDa,
//                "dataAccettazioneA": dataAccettazioneA,
//                "identificativoPa": identificativoPA,
//                "codiceTipoIstanza": codiceTipoIstanza,
//                "codiceIstanza": codiceIstanza,
//                "codiceRaccomandata":codiceRaccomandata
//            }
//        };
//        $.ajax({
//            type: 'POST',
//            url: url,
//            contentType: 'application/json',
//            dataType: 'json',
//            data: JSON.stringify(preadvisingRequest),
//            success: function (result) {
//            	waitingDialog.hide();
//                console.log('success! ', result);
//                if (result.status){
//					var lstPreadvising =result.data;
//					for(var i=0; i<lstPreadvising.length; i++){
//						addPreadvisingObj(lstPreadvising[i]);
//					}
//				}else{
//					$('#danger_msg').text(result.message);
//					$('#div_error_alert').show();
//                }
//
//            },
//            error: function (xhr, status, error, result) {
//            	waitingDialog.hide();
//                console.log('errore!');
//                console.log('xhr ', xhr);
//                console.log('status ', status);
//                console.log('error ', error);
//                console.log('result ', result);
//                $('#danger_msg').text(error);
//                $('#div_error_alert').show();
//            }
//        });


    });
});


String.prototype.replaceAll = function(target, replacement) {
	  return this.split(target).join(replacement);
};
/*	
function addPreadvisingObj(objPreadvising){
	 var dataAccettazioneFormat=new Date(objPreadvising.dataAccettazioneRacc); 
	 var dataCaricamentoFormat=new Date(objPreadvising.dataCaricamento);
	 

	table.row.add( [
              objPreadvising.codiciRacc,
	      dataAccettazioneFormat.toLocaleString(),
	      dataCaricamentoFormat.toLocaleString(),
              objPreadvising.identificativoPa,
	      objPreadvising.tipologiaPratica,	   
              objPreadvising.codiceIstanza,
	      objPreadvising.codiceFrazionario,
              objPreadvising.esito,
	      objPreadvising.codiceIdentificativo,
//	      objPreadvising.codiceMittente,
//	      objPreadvising.codicePresentatore,
	      objPreadvising.codiceService,
	      "<button class='glyphicon glyphicon-user'style='margin-top:10px'  title='Mostra dati Mittente' onclick=openDettMittPres('"+objPreadvising.codiceMittente+"','Mittente')></button>"+
	      " <button class='glyphicon glyphicon-user'style='margin-top:10px'  title='Mostra dati Presentatore' onclick=openDettMittPres('"+objPreadvising.codicePresentatore+"','Presentatore')></button>"
	      
//	      objPreadvising.idReq,
//	      objPreadvising.idTracking,
	 ] ).draw(false);
}
*/


