
$(document).ready(function() {
	loadLstIdentificativoPA("identificativoPA",0);
	loadLstTipIstanza("codiceTipoIstanza",0);
	loadLstStato("statoPacchetto","PACCHETTO");
	if($('input[name="descprofilo"]').val()==="Supervisore"){
		loadLstCentriDemat('centroDemat');		
	}	

	
	$('#divDataCreaDa').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCreaA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});

	$('#dettaglioPacchettoModal').on('shown.bs.modal', function () {
	    $(this).find('.modal-dialog').css({width:'auto',
	                               height:'auto', 
	                              'max-height':'100%'});
	});
	
	$(document).on('click', '#showDistinta', function(event) {
		console.log('showDistinta start');
		var codice_pacchetto = $(this).data("value");
		var url = contextPath + '/' + 'ricerche' + '/pacchetti/distinta';
		
		 $.ajax({
		        type: 'POST',
      	        url: url,	    
      	        dataType: 'json',
	    		data : { "codice_pacchetto": codice_pacchetto},
	    		success : function(result) {
	    			console.log('success! ', result);
	    			
	    			if(result.status){
	    				var res=result.data;
						var lstPratiche =result.data.elencoPratiche;
	    				var modalBarcode = $("#barcodeModale");
	    				var dataCreazionePac = res.dataCreazionePacchettoAsString;

	    				$("#imgBc").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+codice_pacchetto);
	    		        $('input[name="codPacchetto"]').val(codice_pacchetto);
	    		        $('input[name="numero_buste"]').val(res.numeroPratiche);
	    		        $('input[name="id_pa"]').val(res.identificativoPa);
	    		        $('input[name="tipo_pra"]').val(res.codiceTipoIstanza);
	    		        $('input[name="dt_crea"]').val(dataCreazionePac);
	    		        $('#barcode_riepilogo tbody').remove();
	    		        $("#barcode_riepilogo").append("<tbody>");
						for(var i=0; i<lstPratiche.length; i++){
			    			console.log('data ', lstPratiche[i].dataInserimento);		    							
							addRowTbBarcode(lstPratiche[i].codiceRaccomandata,lstPratiche[i].dataInserimentoAsString);
						}
	    		        $("#barcode_riepilogo").append("</tbody>");
	    		        $("#checkAll").prop('checked', false);   				
	    				
	    				modalBarcode.modal({backdrop: 'static', keyboard: false}); 
	    				modalBarcode.modal('show');
	    			}else{
	    				alert(result.message);
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
	    			alert(error);
	    			$('#danger_msg').text(error);
	    			$('#div_error_alert').show();
	    		}
	    	});
	});
	
	function addRowTbBarcode(codiceRaccomandata,dataInserimento){
		var row="<tr><td>" + codiceRaccomandata +"</td>" +
				"<td>" + dataInserimento + "</td>" + 
				"</tr>";
		 $("#barcode_riepilogo").append(row);						    	
	}
	
	$("#stampaBarcode").click(function(e) {
		printWindow("printableArea",1000,1000);		
	});	

 $('#tablePacchetti').on( 'dblclick', 'tbody tr', function (event) {
	 	$(this).addClass('highlight').siblings().removeClass('highlight');        	
        var codicePacchetto = $(this).find('td:first-child').text();
    	var url = contextPath + '/ricerche/pacchetti/dettaglioPacchetto';
    	$.ajax({
    		type: 'POST',
 	        url: url,	    
 	        dataType: 'json',
 	        data: { "codicePacchetto": codicePacchetto},
			success : function(result) {	    			
				console.log('success! ', result);		
                if (result.status){
                    $('#dettaglioPacchettoModal').modal('show');
                    $('#dettaglioPratica').bootstrapTable({
                        data: result.data.listPratica
                    });
                    $('#dettaglioPacchettoTrk').bootstrapTable({
                        data: result.data.listPacchettoTrkLst
                    });
                    $('#dettaglioPratica').bootstrapTable('load', result.data.listPratica);
                    $('#dettaglioPacchettoTrk').bootstrapTable('load', result.data.listPacchettoTrkLst);
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
                }


			},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
			}
		}); 
            
        
    } );
	
	
	$("#ricercaPacchetti").click(function() {
		waitingDialog.show();
		console.log('ricercaPacchetti start');
		var centroDemat;
		var url = contextPath + '/ricerche/pacchetti/ricercaPacchetti';		
		var statoPacchetto = $('#statoPacchetto').val();
		if($('input[name="descprofilo"]').val()==="Supervisore"){
			centroDemat = $('#centroDemat').val();			
		}else{
			centroDemat =  $('input[name="centrodemat"]').val();
		}	
        var codicePacchetto = $('#codicePacchetto').val();
		var identificativoPA = $('#identificativoPA').val();
		var codiceTipoIstanza = $('#codiceTipoIstanza').val();
		var codiceRaccomandata = $('#codiceRaccomandata').val();
		var flag_anomalia = $('#flag_anomalia').val();
		var data_creazione_pacchetto_da = $('#dataCrezionePacchettoDa').val();
		data_creazione_pacchetto_da = data_creazione_pacchetto_da.replaceAll("/","-");
		var data_creazione_pacchetto_a = $('#dataCrezionePacchettoA').val();
		data_creazione_pacchetto_a = data_creazione_pacchetto_a.replaceAll("/","-");		
		var pacchettoRequest = {  
				   "data":{  
					      "statoPacchetto":statoPacchetto,
					      "centroDemat": centroDemat,
						  "idAnagrPA":identificativoPA,
					      "idIstanza":codiceTipoIstanza,
						  "codiceRaccomandata":codiceRaccomandata,
                          "codicePacchetto": codicePacchetto,
					      "flagAnomalia":flag_anomalia,	 
					      "dataCreazioneDa":data_creazione_pacchetto_da,
					      "dataCreazioneA":data_creazione_pacchetto_a
					   }
					};
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(pacchettoRequest),
			success : function(result) {
				waitingDialog.hide();
				console.log('success! ', result);		
                if (result.status){
                	$('#tablePacchetti').bootstrapTable('load', result.data.listPacchetto);
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
                }


			},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
			}
		});

		
	});
	
	$('#dettaglioPratica').on( 'dblclick', 'tbody tr', function (event) {
	 	$(this).addClass('highlight').siblings().removeClass('highlight');        	
	 	
	 	var codiceRaccomandataSelected = $(this).find('td:first-child').text();
	 	loadDettPratica(codiceRaccomandataSelected);       	
    });
	
	$('#dettaglioPraticaModal').on('shown.bs.modal', function () {
	    $('#btnIndietroDettPratica').click(function(){
	    	$('#dettaglioPraticaModal').modal('hide');
	    });
	    $('#btnCloseDettPratica').click(function(){
	    	$('#dettaglioPraticaModal').modal('hide');
	    	$('#dettaglioPacchettoModal').modal('hide');    	
	    	
	    });
	    $(this).find('.modal-dialog').css({width:'auto',
            height:'auto', 
           'max-height':'100%'});
	});
	
	  $("#esportaCSV").click(function() {
		  var centroDemat = '';
		  var queryString = '';
		  var statoPacchetto = $('#statoPacchetto').val() === '' ? '': queryString+= 'stato='+$('#statoPacchetto').val()+'&';
		  var codicePacchetto = $('#codicePacchetto').val() === '' ? '': queryString+= 'codicePacchetto='+$('#codicePacchetto').val()+'&';
		  var codiceRaccomandata = $('#codiceRaccomandata').val() === '' ? '': queryString+= 'codiceRaccomandata='+$('#codiceRaccomandata').val()+'&';
			if($('input[name="descprofilo"]').val()==="Supervisore"){
				centroDemat = $('#centroDemat').val();			
			}else{
				centroDemat =  $('input[name="centrodemat"]').val();
			}
		  centroDemat = centroDemat  === '' ? '': queryString+= 'centroDemat='+centroDemat+'&';
		  var dataDa = $('#dataCrezionePacchettoDa').val()  === '' ? '': queryString+= 'dataDa='+$('#dataCrezionePacchettoDa').val().replaceAll("/","-")+'&';
		  var dataA = $('#dataCrezionePacchettoA').val() === '' ? '': queryString+= 'dataA='+$('#dataCrezionePacchettoA').val().replaceAll("/","-")+'&';
		  var idAnagrPA = $('#identificativoPA').val() === '' ? '': queryString+= 'idAnagrPA='+$('#identificativoPA').val()+'&';
		  var idIstanza =$('#codiceTipoIstanza').val() === '' ? '': queryString+= 'idIstanza='+$('#identificativoPA').val()+'&';
		  var flagAnomalia =$('#flag_anomalia').val() === '' ? '': queryString+= 'flagAnomalia='+$('#flag_anomalia').val()+'&';
		  queryString+= 'typeExport=PACCHETTO';
		  
		  document.location.href = contextPath+ "/download/csv?"+queryString;
		
		
	  });
});


String.prototype.replaceAll = function(target, replacement) {
	  return this.split(target).join(replacement);
	}
	


//function caricaCentriDemat(){
//	
//	console.log('caricaCentriDemat start');
//	var url = contextPath + '/configurazione/configurazioneCentriDemat/listaCentriDemat';
//	var centroDemat=null;
//	var centroDematSelect = $('#centroDemat');
//	centroDematSelect.empty();
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
	
	

