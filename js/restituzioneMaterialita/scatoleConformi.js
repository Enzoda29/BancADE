var table=null;

$(document).ready(function () {
	

	ajaxCallGet(contextPath+'/restMaterialita/elencoTipiDoc', {microservizioClientId:$('#macroservizio_client_id').val()}, onSuccessElencoTipiDoc, errorCallback);	
	ajaxCallGet(contextPath+'/restMaterialita/elencoAggregati', "", onSuccessElencoAggregati, errorCallback);
	
	function onSuccessElencoAggregati(result){
//		console.log(data.data);
		$("#aggregato").append("<option value=''> Seleziona Aggregato</option>");
		 $.each(result.data, function(value, desc) {				
			 $("#aggregato").append(
					 "<option value=" + desc.AGGREGATO_ID + ">"
						+ desc.AGGREGATO_ID + "</option>");
		});		
	} 
	function onSuccessElencoTipiDoc(result){
//		console.log(data.data);
		$("#nomeDocumento").append("<option value=''> Seleziona Nome Documento</option>");
		 $.each(result.data, function(value, desc) {				
			 $("#nomeDocumento").append(
					 "<option value=" + desc.TIPO_DOC_ID + ">"
						+ desc.NOME_DOCUMENTO + "</option>");
		});		
	}
	function errorCallback(err){
		console.log(err);
	}
	
	$("#nomeDocumento").change(function(){
		console.log($(this).val());
		getScatoleConformiAjax($(this).val(),$("#aggregato").find('option:selected').val());	
		
	});
	
	$("#aggregato").change(function(){
		console.log($(this).val());
		getScatoleConformiAjax($("#nomeDocumento").find('option:selected').val(), $(this).val());			
	});
	
$('#AssociaSpedizioni-barcode').hide();
	
	$("#barcode").keypress(function(e) {		
		if(e.which == 13) {
			if(transactionClick) return;
			transactionClick = true;		
			checkBarcode();
	    }		
	});
	
	$('#search-barcode').click(function() {
		transactionClick = true;
		checkBarcode();		
	});
	
	
	function checkBarcode(){
		var request = {barcode:$('input[name="barcode"]').val(),macroservizio_client_id:$('#macroservizio_client_id').val()};
		if(request.barcode){
			ajaxCallGet(contextPath+'/restMaterialita/barcode', request, onSuccessCheckBarcode, errorCallback);				
		}else{
			$("#barcode-error").text('Il barcode inserito non è valido');
			$('#AssociaSpedizioni-barcode').hide();
			transactionClick = false;
		}
	}
	
	
	function onSuccessCheckBarcode(response){
		if(!response.status){
			$("#barcode-error").text('Il barcode inserito non è valido');
			$('#AssociaSpedizioni-barcode').hide();
		}else{
			console.log("found it");
			$("#barcode-error").text('');
			
			$('#AssociaSpedizioni-barcode').show();
			$('#AssociaSpedizioni-barcode').attr("data-spedizione",response.data.AGGREGATO_ID + "|" +response.data.SCATOLA_ID);
			
		}
		transactionClick = false;
	}
	function errorCallback(xhr, textStatus, errorThrown){
		console.log('error - '+xhr);
		console.log('textStatus - '+textStatus);
		console.log('errorThrown - '+errorThrown);
		transactionClick = false;
		$("#barcode-error").text('Si è verificato un problema');
		$('#AssociaSpedizioni-barcode').hide();
	}
	
	$('#AssociaSpedizioni-barcode').click(function() {
		var value = $('#AssociaSpedizioni-barcode').attr("data-spedizione").split('|');
		$("#barcode").focus().val('');
		BootstrapDialog.show({
			   size: BootstrapDialog.SIZE_SMALL,
			   title: 'CONFERMA ASSOCIA SPEDIZIONE',
	           message: 'Sei sicuro di voler associare questa scatola ad una spedizione?',
	           buttons: [{
	               label: 'Conferma',
	               cssClass: 'btn-primary',
	               action: function(dialog) {
	            	var centroDemat = $('input[name="centrodemat"]').val();    	
	               	var requestString =  '{"data":{"idCentroDemat" : '+centroDemat+', "scatole": []}}';
	               	var request = JSON.parse(requestString);    		
	           		var valueAggregato = value[0];	
	           		var valueScatola = value[1];					
	           		var data ={"aggregatoId" : valueAggregato , "scatolaId" : valueScatola};
	           		request.data.scatole.push(data);    	
	               	sendScatoleConformiDaAssociareSped(JSON.stringify(request));
	               	dialog.close();
	            	$('#AssociaSpedizioni-barcode').hide();
	               }
	           }, {
	               label: 'Annulla',
	               action: function(dialogItself){
	                   dialogItself.close();
	               }
	           }]
	       });
		
    	
	});
	

	
	
//	$("#AssociaSpedizioni").prop('disabled', true);
	
	$('table tr').click(function(e) {
//        var cb = $(this).find("input[type=checkbox]");
//        if(cb.is(':checked')) {
//        	cb.prop('checked', false); 
//        }else {
//        	cb.prop('checked', true); 
//        }
		  if (e.target.type == "checkbox") {

		        e.stopPropagation();
		    } else {
		        var $checkbox = $(this).find(':checkbox');
		        $checkbox.prop("checked", !$checkbox.prop("checked"));
		    }
    });
	
	 $("#AssociaSpedizioni").click(function() {

		 var cboxSelected = $('#appendTables').find('input[type=checkbox]:checked');
		 if(cboxSelected.length > 0){
			 $("#scatoleConformiConfermaSpedizione").modal({backdrop: 'static', keyboard: false});
		 }else{
			 alertCstm("INFO","Nessuna scatola selezionata");
		 }
	 });
	 
	$('#scatoleConformiConfermaSpedizione').on('hidden.bs.modal', function () {

		$('div[id*=_modal]').text('');
		$('div[id*=_modal]').hide();	
		$('#confermaAssociaESpedisci').prop('disabled', false);
	    
	})
			
    $("#confermaAssociaESpedisci").click(function() {
    	
    	$('#confermaAssociaESpedisci').prop('disabled', true);
    	
    	var centroDemat = $('input[name="centrodemat"]').val();
    	var cbox = $('#appendTables').find('input[type=checkbox]:checked');
    	var requestString =  '{"data":{"idCentroDemat" : '+centroDemat+', "scatole": []}}';
    	var request = JSON.parse(requestString);
//    	var data = [];
    	$.each( cbox, function(){    		
    		//var valueAggregato = $(this).attr("data-aggregato");//$(this).parent().find('.AGGREGATO_ID').val();	
    		//var valueScatola = $(this).attr("data-scatola");//$(this).parent().find('.SCATOLA_ID').val();    
    		if($(this).attr("id")==='checkbox-master')
    			return;
    		var data ={"aggregatoId" : $(this).attr("data-aggregato") , "scatolaId" : $(this).attr("data-scatola")};
    		request.data.scatole.push(data);    			
    	});
    	
    	sendScatoleConformiDaAssociareSped(JSON.stringify(request));
    });
	
	$('#stampaScatoleConformiBtn').click(function(){
		waitingDialog.show('Operazione in corso...', {dialogSize: 'sm', progressType: 'default'});
		$('#stampaTabellaDiv').empty() ;
		var url = contextPath + '/restMaterialita/getScatoleConformi?macroservizio_client_id='+$('#macroservizio_client_id').val()+'&_='+new Date().getTime();
//		var url = contextPath + '/restMaterialita/getScatoleConformi';
		$.ajax({
		        url: url,
		        async: false,
			success : function(result) {
				waitingDialog.hide();
				if(result.status){
					waitingDialog.hide();
					var dataTable = result.data.dataTable;
					if( dataTable == null ||  dataTable.length <= 0){
						alertCstm("INFO","Nessuna scatola trovata");
						return ;
					}
					
					createTableScatole(dataTable);
					waitingDialog.hide();
					var myWindow = window.open( "", "Stampa Scatole Conformi", 'left=300,top=100,width=800,height=600' ) ;
					myWindow.document.write( document.getElementById('stampaTabellaDiv').innerHTML ) ;
					myWindow.document.close() ;
					myWindow.focus() ;
					myWindow.print() ;
				}else{
					alertCstm("WARNING","Errore richiesta dettaglio!");
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
		waitingDialog.hide();
	});
	
	

	
});

function createTableScatole( data ) {
	var printTableElement = "" ;
	var startTable = "<table style='width:100%'>" ;
	var endTable = "</table>" ;
	var startRow = "<tr>";
	var endRow = "</tr>" ;
	var startHeader = "<th style='border:1px solid black'>" ;
	var endHeader = "</th>" ;
	var startCell = "<td style='border:1px solid black'>" ;
	var endCell = "</td>" ;
	var header = startRow + 
			startHeader + "Id Cliente"		+ endHeader +
			startHeader + "Id Aggregato"	+ endHeader +
			startHeader + "Id Scatola"		+ endHeader +
			startHeader + "Codice Scatola"	+ endHeader +
			startHeader + "Nome Documento"	+ endHeader + 
			endRow ;
	printTableElement += startTable + header ;
	for( var i = 0; i < data.length; i++ ) {
		var row = startRow + 
				startCell+ data[i].IDENTIFICATIVO_CLIENTE 	+ endCell +
				startCell+ data[i].AGGREGATO_ID 			+ endCell +
				startCell+ data[i].SCATOLA_ID				+ endCell +
				startCell+ data[i].CODICE_SCATOLA			+ endCell +
				startCell+ data[i].NOME_DOCUMENTO			+ endCell +
				endRow ;
		printTableElement += row ;
	}
	printTableElement += endTable ;
	$('#stampaTabellaDiv').append( printTableElement ) ;
}



function createTable (listTable){

	//	var listTable = JSNOINPUT.data.dataTable;
	var thead = theadBuild(listTable[0]);
	
	var checkbox2 = '<div class="form-check">'
				   +'    <input type="checkbox" class="form-check-input" id="exampleCheck1">'
				   +'    <label class="form-check-label" for="exampleCheck1"></label>'
				   +'</div>';

	var  dataTable = {"rows" : []}
	
	var idCliente = listTable[0].CLIENTE_ID;
	var numTab = 0;
	
	var _IDENTIFICATIVO_CLIENTE = '';
	var _NOME_SERVIZIO = '';
	var _CODIFICA_MACROSERVIZIO = '';
	
	for(var indexTbl = 0 ;  indexTbl < listTable.length ; indexTbl ++){

		var AGGREGATO_ID = listTable[indexTbl].AGGREGATO_ID ? listTable[indexTbl].AGGREGATO_ID : '';
		var SCATOLA_ID = listTable[indexTbl].SCATOLA_ID;
		var checkbox = '<input type="checkbox" data-aggregato="'+AGGREGATO_ID+'" data-scatola="'+SCATOLA_ID+'">';

		var showwvalue = listTable[indexTbl].CLIENTE_ID;
		if(idCliente == listTable[indexTbl].CLIENTE_ID ){
			
			_IDENTIFICATIVO_CLIENTE = listTable[indexTbl].IDENTIFICATIVO_CLIENTE;
			_NOME_SERVIZIO = listTable[indexTbl].NOME_SERVIZIO;
			_CODIFICA_MACROSERVIZIO = listTable[indexTbl].CODIFICA_MACROSERVIZIO;
			
			//add row
			dataTable.rows.push({
				 		 "AGGREGATO_ID":listTable[indexTbl].AGGREGATO_ID != null?listTable[indexTbl].AGGREGATO_ID: '',
						 "CODICE_SCATOLA":listTable[indexTbl].CODICE_SCATOLA,
						 "NOME_DOCUMENTO": listTable[indexTbl].NOME_DOCUMENTO,
						 "ASSOCIA_SPEDIZIONE": checkbox
			})
			
			//verifica se ultimo - stampa tabella
			if(indexTbl == listTable.length -1){
				
				var idTableDiv = 'table_'+numTab;
				var idTextCliente = idTableDiv + '_idTextCliente';
				var idTextServizio = idTableDiv + '_idTextServizio';
				var idTextMacroserv = idTableDiv + '_idTextMacroserv';
				
				var _divBuild = divBuild(idTableDiv, idTextCliente, idTextServizio , idTextMacroserv);
				$("#appendTables").append(_divBuild);

		    	$("#"+idTextCliente).text(_IDENTIFICATIVO_CLIENTE);
		    	$("#"+idTextServizio).text(_NOME_SERVIZIO);
				$("#"+idTextMacroserv).text(_CODIFICA_MACROSERVIZIO);
				
//		    	$("#"+idTextCliente).text(listTable[indexTbl].IDENTIFICATIVO_CLIENTE);
//		    	$("#"+idTextServizio).text(listTable[indexTbl].NOME_SERVIZIO);
//				$("#"+idTextMacroserv).text(listTable[indexTbl].CODIFICA_MACROSERVIZIO);
				
		    	$("#"+idTableDiv+" thead tr").append(thead);
			        
			        $("#"+idTableDiv).bootstrapTable('destroy').bootstrapTable({ 
			        	data: dataTable.rows});
			}
			
			numTab = numTab +1;
			
			
		}else{
						
			//se ultimo stampa tabella
//			if(indexTbl == listTable.length -1 ){
				
				
				var idTableDiv = 'table_'+numTab;
				var idTextCliente = idTableDiv + '_idTextCliente';
				var idTextServizio = idTableDiv + '_idTextServizio';
				var idTextMacroserv = idTableDiv + '_idTextMacroserv';
				
				var _divBuild = divBuild(idTableDiv, idTextCliente, idTextServizio , idTextMacroserv);
				$("#appendTables").append(_divBuild);

		    	$("#"+idTextCliente).text(_IDENTIFICATIVO_CLIENTE);
		    	$("#"+idTextServizio).text(_NOME_SERVIZIO);
				$("#"+idTextMacroserv).text(_CODIFICA_MACROSERVIZIO);
				
//		    	$("#"+idTextCliente).text(listTable[indexTbl].IDENTIFICATIVO_CLIENTE);
//		    	$("#"+idTextServizio).text(listTable[indexTbl].NOME_SERVIZIO);
//				$("#"+idTextMacroserv).text(listTable[indexTbl].CODIFICA_MACROSERVIZIO);
				
		    	$("#"+idTableDiv+" thead tr").append(thead);
			        
		    	$("#"+idTableDiv).bootstrapTable('destroy').bootstrapTable({ 
			        	data: dataTable.rows});
//			}
			dataTable.rows = [];
			
			_IDENTIFICATIVO_CLIENTE = listTable[indexTbl].IDENTIFICATIVO_CLIENTE;
			_NOME_SERVIZIO = listTable[indexTbl].IDENTIFICATIVO_CLIENTE;
			_CODIFICA_MACROSERVIZIO = listTable[indexTbl].CODIFICA_MACROSERVIZIO;
			
			dataTable.rows.push({
				 "AGGREGATO_ID":listTable[indexTbl].AGGREGATO_ID != null?listTable[indexTbl].AGGREGATO_ID: ' - ',
				 "CODICE_SCATOLA":listTable[indexTbl].CODICE_SCATOLA,
				 "NOME_DOCUMENTO": listTable[indexTbl].NOME_DOCUMENTO,
				 "ASSOCIA_SPEDIZIONE": checkbox
			})
			
			numTab = numTab +1;
			//se ultimo -> stampa
			if(indexTbl == listTable.length -1 ){
				
				var idTableDiv = 'table_'+numTab;
				var idTextCliente = idTableDiv + '_idTextCliente';
				var idTextServizio = idTableDiv + '_idTextServizio';
				var idTextMacroserv = idTableDiv + '_idTextMacroserv';
				
				var _divBuild = divBuild(idTableDiv, idTextCliente, idTextServizio , idTextMacroserv);
				$("#appendTables").append(_divBuild);

		    	$("#"+idTextCliente).text(_IDENTIFICATIVO_CLIENTE);
		    	$("#"+idTextServizio).text(_NOME_SERVIZIO);
				$("#"+idTextMacroserv).text(_CODIFICA_MACROSERVIZIO);
				
//		    	$("#"+idTextCliente).text(listTable[indexTbl].IDENTIFICATIVO_CLIENTE);
//		    	$("#"+idTextServizio).text(listTable[indexTbl].NOME_SERVIZIO);
//				$("#"+idTextMacroserv).text(listTable[indexTbl].CODIFICA_MACROSERVIZIO);
				
		    	$("#"+idTableDiv+" thead tr").append(thead);
			        
		    	$("#"+idTableDiv).bootstrapTable('destroy').bootstrapTable({ 
			        	data: dataTable.rows});
			        
			        numTab = numTab +1;
			}
			
		}	
			
		idCliente = listTable[indexTbl].CLIENTE_ID;
		} //nuovo id cliente
	//TODO includere in fogli di stile custom

	$("table").css('background',  'white');
	$(".pre-scrollable").css('max-height',  '420px');
	}

	
	        function theadBuild(arrayColumn){
	        	
//	        	 var tr = '';
//	        	 $.each(arrayColumn, function(index, value) {
//	 	        	var tr_temp = '';
//	 		    	var columnDataField = index;
//	 		    	var columnTitle = index.split("_").join(" ");
//	 		    	tr_temp = "<th data-field=\"" + columnDataField + "\" data-sortable=\"false\">" + columnTitle + "</th>";
//	 		    	tr = tr + tr_temp.toString();
//	 	        });
	        	 
				 var tr = "<th data-field=\"AGGREGATO_ID\" data-sortable=\"false\">AGGREGATO ID</th>";
					 tr = tr + "<th data-field=\"CODICE_SCATOLA\" data-sortable=\"false\">CODICE SCATOLA</th>";
				     tr = tr + "<th data-field=\"NOME_DOCUMENTO\" data-sortable=\"false\">NOME DOCUMENTO</th>";
				     tr = tr + "<th data-field=\"ASSOCIA_SPEDIZIONE\" data-sortable=\"false\"><input type=\"checkbox\" id=\"checkbox-master\" style=\"float: left; margin-top: 5px !important;\" onclick=\"associaSpedizioneSelectAll(this)\"/>Associa Spedizione</th>";
	        	
	 	    	return tr;
	        	 
	        	
	        }
	        
	        function divBuild(idTableDiv, idTextCliente, idTextServizio, idTextMacroserv){
	        	
	    		var headTable = '<div class="btn-group btn-group-toggle">'
	    					 +' <H5 class="navbar-text navbar-left">Cliente: <b id="'+idTextCliente+'"></b></H5>'
	    					 +' <H5 class="navbar-text navbar-left">Servizio: <b id="'+idTextServizio+'"></b></H5>'
	    					 +' <H5 class="navbar-text navbar-left">Macroservizio: <b id="'+idTextMacroserv+'"></b></H5>'
//	    					 +' <p>Cliente: <b id="'+idTextCliente+'"></b></p>'
	    					 +'</div>';
	    		
	    		var div = '<div class="panel panel-default" style="background: #eeeeee">'
//				+'	  <div class="panel-heading" >Panel heading</div>'
							+'	  <div class="panel-body">'
							+	    	headTable
							+'<table id="'+idTableDiv+'" class="table table-borderless table-dark"><thead><tr></tr></thead></table>'
							+'	  </div>'
							+'</div>'
							
				return div;
	        }
	
	
	    	function alertCstm(title, msg){
	    		BootstrapDialog.show({
	    				type: BootstrapDialog.TYPE_DANGER,
	    			    size: BootstrapDialog.SIZE_NORMAL ,
	    	            title: title,
	    	            message: msg,
	    	            buttons: [{
	    	                label: 'OK',
	    	                cssClass: 'btn-primary',
	    	                action: function(dialog){
	    	                    dialog.close();
	    	                }
	    	            }]
	    	        });
	    	}
	    	
	    	function sendScatoleConformiDaAssociareSped(request){
	    
	    		var requestLocal = request;
	    		var url = contextPath + '/restMaterialita/sendAssociaSpedScatoleConformi';
	    		
	    		$.ajax({
	    			type: 'POST',
	    			contentType : 'application/json',
	    			dataType : 'json',
	    			data : requestLocal,
    		        url: url,	    
	    			success : function(result) {
	    				
	    				if(result.status){	    
	    					if(($("#scatoleConformiConfermaSpedizione").data('bs.modal') || {}).isShown)	    						
	    						$('#scatoleConformiConfermaSpedizione').modal('toggle');
							$('#spedizione_success').show();	
							$('#success_msg_modal').text(result.message);
							getScatoleConformiAjax("","");
							
	    				}else{
	    					$('#danger_msg_modal').text(result.message);
							$('#speidzione_error').show();checkBoxes.prop("checked", !checkBoxes.prop("checked"));
							if(($("#scatoleConformiConfermaSpedizione").data('bs.modal') || {}).isShown)	    						
	    						$('#scatoleConformiConfermaSpedizione').modal('toggle');
	    				}
	    				
	    			},
	    			error : function(xhr, status, error, result) {
	    				waitingDialog.hide();
	    				console.log('errore!');
	    				console.log('xhr ', xhr);
	    				console.log('status ', status);
	    				console.log('error ', error);
	    				console.log('result ', result);
	    				$('#danger_msg_modal').text(result.message);
						$('#div_error_alert_modal').show(1000);
	    			}
	    		}); 
	    	}
	    	
	    	
	    	
	$(window).on('load', function() {
		    
		getScatoleConformiAjax("","");	    
	});
	
	
 	function getScatoleConformiAjax(tipo_doc_id, aggregato_id){
		
		$("#appendTables").html('');
		console.log('getScatoleConformiAjax: '+$('#macroservizio_client_id').val());
		var url = contextPath + '/restMaterialita/getScatoleConformi?aggregato='+aggregato_id+'&tipo_doc_id='+tipo_doc_id+'&macroservizio_client_id='+$('#macroservizio_client_id').val()+'&_='+new Date().getTime();
		
//		$("#tableDettaglioScatola").bootstrapTable();
//		$("table").bootstrapTable('destroy');
//		$("table thead tr").html('');
		$.ajax({
//			type: 'POST',
		        url: url,	    
//		        dataType: 'json',
//		        data:  {},
		        async: false,
		        success : function(result) {
				
				if(result.status){
					
					var dataTable = result.data.dataTable;
					if( dataTable == null ||  dataTable.length <= 0){
						alertCstm("INFO","Nessuna scatola trovata");
						return ;
					}
					
					createTable(dataTable);
					$("#AssociaSpedizioni").prop('disabled', false);
					
					
				}else{
					alertCstm("WARNING","Errore richiesta dettaglio!");
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
 	
 	function associaSpedizioneSelectAll(element) {
 		var checkedStatus = element.checked;
    	var cbox = $('#appendTables').find('input[type=checkbox]');    	
    	$.each( cbox, function(){    		
    		$(this).prop('checked', checkedStatus); 			
    	});
 	}

