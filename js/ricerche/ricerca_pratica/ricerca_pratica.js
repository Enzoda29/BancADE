var table=null;

$(document).ready(function () {
	loadLstIdentificativoPA("identificativoPA",0);
	loadLstTipIstanza("codiceTipoIstanza",0);
	loadLstStato("statoPratica","PRATICA");
	if($('input[name="descprofilo"]').val()==="Supervisore"){
		loadLstCentriDemat('centroDemat');		
	}	

//	table = $('#tablePratiche').DataTable({	
//
//		
//		"columnDefs" : [ {
//			"targets" : [ 0 ],
//			"visible" : true,
//			"searchable" : true
//		} ],
//		"language": {
//	        "lengthMenu": "",
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

	
    $("#ricercaPratica").click(function () {
//    	waitingDialog.show();
        console.log('ricercaPratica start');
        var url = contextPath + '/ricerche/pratiche/ricercaPratiche';
        var centroDemat;
//    	table.clear().draw(false);

        var statoPratica = $('#statoPratica').val();
        var dataAccettazioneDa = $('#dataAccettazioneDa').val();
        dataAccettazioneDa = dataAccettazioneDa.replaceAll("/","-");        
        var dataAccettazioneA = $('#dataAccettazioneA').val();
        dataAccettazioneA = dataAccettazioneA.replaceAll("/","-");        
        var identificativoPA = $('#identificativoPA').val();
        var codiceTipoIstanza = $('#codiceTipoIstanza').val();
        var codiceRaccomandata = $('#codiceRaccomandata').val();
        var flag_anomalia = $('#flag_anomalia').val();
    	if($('input[name="descprofilo"]').val()==="Supervisore"){
			centroDemat = $('#centroDemat').val();			
		}else{
			centroDemat =  $('input[name="centrodemat"]').val();
		}	
  	
    	var uri = contextPath
    			+ "/ricerche/pratiche/ricercaPratiche?statoPratica="
    			+ statoPratica+ "&dataAccettazioneDa=" + dataAccettazioneDa + "&dataAccettazioneA=" +dataAccettazioneA+
    			"&identificativoPA="+identificativoPA+"&codiceTipoIstanza="+codiceTipoIstanza+"&codiceRaccomandata="+codiceRaccomandata+"&centroDemat="+centroDemat+
    			"&flag_anomalia="+flag_anomalia;	
    	console.log('URI.. -> '+uri);		
    	$('#tablePratiche').bootstrapTable('refresh', {
    		    url: uri
    	});	       
        
//        
//        $.ajax({
//            type: 'POST',
//            url: url,
//            contentType: 'application/json',
//            dataType: 'json',
//            data: JSON.stringify(praticaRequest),
//            success: function (result) {
//            	waitingDialog.hide();
//                console.log('success! ', result);
//                if (result.status){
//					var lstPratiche =result.data;
//					for(var i=0; i<lstPratiche.length; i++){
//						addPraticaObj(lstPratiche[i]);
//					}
//				}else{
//					showErrorMessage(true,result.message);
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
//                showErrorMessage(true,error);
//            }
//        });


    });
    
    $('#tablePratiche').on( 'dblclick', 'tbody tr', function (event) {
	 	$(this).addClass('highlight').siblings().removeClass('highlight');        	
	 	
	 	var codiceRaccomandataSelected = $(this).find('td:first-child').text();
	 	loadDettPratica(codiceRaccomandataSelected);    
    });
    
    
	$('#dettaglioPraticaModal').on('shown.bs.modal', function () {
	    $('#btnIndietroDettPratica').hide();
	    $(this).find('.modal-dialog').css({width:'auto',
            height:'auto', 
           'max-height':'100%'});
	    $('#btnCloseDettPratica').click(function(){
	    	$('#dettaglioPraticaModal').modal('hide');
	    });
	});
    
    $("#esportaCSV").click(function() {
    	console.log('esportaCSV');    
		  var queryString = '';
		  var centroDemat;
		  if($('input[name="descprofilo"]').val()==="Supervisore"){
				centroDemat = $('#centroDemat').val();			
			}else{
				centroDemat =  $('input[name="centrodemat"]').val();
			}
		  centroDemat = centroDemat  === '' ? '': queryString+= 'centroDemat='+centroDemat+'&';
		  var statoPacchetto = $('#statoPratica').val() === '' ? '': queryString+= 'stato='+$('#statoPratica').val()+'&';	
		  var codiceRaccomandata = $('#codiceRaccomandata').val() === '' ? '': queryString+= 'codiceRaccomandata='+$('#codiceRaccomandata').val()+'&';		
		  var dataDa = $('#dataAccettazioneDa').val()  === '' ? '': queryString+= 'dataDa='+$('#dataAccettazioneDa').val().replaceAll("/","-")+'&';
		  var dataA = $('#dataAccettazioneA').val() === '' ? '': queryString+= 'dataA='+$('#dataAccettazioneA').val().replaceAll("/","-")+'&';
		  var idAnagrPA = $('#identificativoPA').val() === '' ? '': queryString+= 'idAnagrPA='+$('#identificativoPA').val()+'&';
		  var idIstanza =$('#codiceTipoIstanza').val() === '' ? '': queryString+= 'idIstanza='+$('#identificativoPA').val()+'&';
		  var flagAnomalia =$('#flag_anomalia').val() === '' ? '': queryString+= 'flagAnomalia='+$('#flag_anomalia').val()+'&';
		  queryString+= 'typeExport=PRATICHE';
		  
		  document.location.href = contextPath+ "/download/csv?"+queryString;
    });
});


String.prototype.replaceAll = function(target, replacement) {
	  return this.split(target).join(replacement);
};
	
//function addPraticaObj(objPratica){
//	var dataAccettazioneRacc = null;
//	var dataAccettazione = null;	
//	
//	if(objPratica.dataAccettazione != null){
//		 var dataAccettazioneFormat=new Date(objPratica.dataAccettazione); 
//		 dataAccettazione = dataAccettazioneFormat.toLocaleString();
//	 }
//	 
//	if(objPratica.dataAccettazioneRacc != null){
//		 var dataAccettazioneRaccFormat=new Date(objPratica.dataAccettazioneRacc);
//		 dataAccettazioneRacc = dataAccettazioneRaccFormat.toLocaleString();
//	 }
//
//	table.row.add( [
//	      objPratica.codiceRaccomandata,
//	      dataAccettazione,
//	      objPratica.stato,
//	      objPratica.identificativoPa,
//	      objPratica.codiceTipoIstanza,
//	      dataAccettazioneRacc,
//	      objPratica.casellario,
//	      objPratica.codicePacchetto,
//	      objPratica.codiceScatola,
//	      objPratica.codiceIstanza
//	 ] ).draw(false);
//}
