var numeroBoxPerRiga=getNumeroBoxPerRiga();
$(document).ready(function() {
	getNonConformi();
	getCaselle(null,null);
	
	$("#cercaOggetto").click(function() {
		$("#cercaOggetto").prop("disabled" , true);
		accettazioneBarcode();
	});
	
	$('#confermaTipoProdotto').click( function(){
		accettazioneBarcode();
		$('#tipoProdottoModal').modal('toggle') ;
		$("input[name=tipoOptions]").prop( 'checked' , false ) ;
		$("#codiceOggettoSearch").val("");
		$("#cercaOggetto").prop("disabled" , false);
	} );
	
	$('#annullaTipoProdotto').click( function(){
		$("input[name=tipoOptions]").prop( 'checked' , false ) ;
		$("#cercaOggetto").prop("disabled" , false);
		$("#codiceOggettoSearch").val("");
	});
	
	$("#procediNonConforme").click(function(){
		accettazioneBarcode();
		$('#confermaNonConformeModal').modal('toggle') ;
		$("#cod_sca_nonConforme").text( "" ) ;
		$("#codiceOggettoSearch").val("");
		$("#cercaOggetto").prop("disabled" , false);
	});
	
	$('#annullaNonConforme').click(function(){
		$("#cod_sca_nonConforme").text( "" ) ;
		$("#codiceOggettoSearch").val("");
		$("#cercaOggetto").prop("disabled" , false);
	});
	
	$('#div_info').hide();
	$('#div_error').hide();
	
	
	$("#associa_plico").click(function(){
		
		var cboxSelected = $('#tab_dettaglio_casellario').find('.plico:checked');
		 if(cboxSelected.length > 0){	

		        BootstrapDialog.show({
		            title: 'Conferma Associazione Plico',
		            message: 'Sei sicuro di associare '+cboxSelected.length+' documento&#92;i ad un plico di scansione',
		            buttons: [{
		                label: 'Conferma',
		                action: function(dialogItself) {
		                	var casellarioId = cboxSelected[0].attributes["data-casellario"].value;
		                	var centroDemat =  $('input[name="centrodemat"]').val();
		                	var operatore =  $('input[name="user"]').val();
		                	var postazione =  $('input[name="postazione"]').val();
		                	var listCodiceOggetto = [];
		                	$.each( cboxSelected, function(){ 		                
		                		listCodiceOggetto.push($(this).attr("data-oggetto"));    			
		                	});
		                	var request =  {'listaPratiche' : listCodiceOggetto };
		                	var url = contextPath + '/normalizzazione/plico/'+casellarioId+'/'+centroDemat+'/'+operatore+'/'+postazione;
		                	$.ajax({
		            			type : 'PUT',
		            			url : url,
		            			contentType : 'application/json',
		            			data : JSON.stringify(request),
		            			dataType : 'json',
		            			success : function(result) {
		            				console.log('Success!');
		            				console.log(result.data);
		            				dialogItself.close();
		            				$('#casellarioDetailsModal').modal('toggle') ;
		            				getCaselle() ;
		            				getPdf( result.data ) ;
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
		            }, {
		                label: 'Annulla',
		                action: function(dialogItself) {
		                	dialogItself.close();
		                }
		            }]
		        });
		 }else{
			  BootstrapDialog.alert('Nessun documento selezionato');
		 }
		
	});
	
$("#rimuovi_documenti").click(function(){
	showMessage() ;
		var cboxSelected = $('#tab_dettaglio_casellario').find('.plico:checked');
		 if(cboxSelected.length > 0){	

		        BootstrapDialog.show({
		            title: 'Conferma Rimozione',
		            message: 'Sei sicuro di rimuovere '+cboxSelected.length+' documento&#92;i dal casellario?',
		            buttons: [{
		                label: 'Conferma',
		                action: function(dialogItself) {
		                	var casellarioId = cboxSelected[0].attributes["data-casellario"].value;
		                	var centroDemat =  $('input[name="centrodemat"]').val();
		                	var operatore =  $('input[name="user"]').val();
		                	var postazione =  $('input[name="postazione"]').val();
		                	var listCodiceOggetto = [];
		                	$.each( cboxSelected, function(){ 		                
		                		listCodiceOggetto.push($(this).attr("data-oggetto"));    			
		                	});
		                	var request =  {'listaPratiche' : listCodiceOggetto };
		                	var url = contextPath + '/normalizzazione/removeFromCasellario/'+casellarioId;
		                	$.ajax({
		            			type : 'POST',
		            			url : url,
		            			contentType : 'application/json',
		            			data : JSON.stringify(request),
		            			dataType : 'json',
		            			success : function(result) {
		            				console.log('Success!');
		            				if( result.status ) {
		            					if( result.data = 'CASELLARIO_VUOTO' ) {
		            						console.log(result.data);
				            				dialogItself.close();
				            				$('#casellarioDetailsModal').modal('toggle') ;
				            				getCaselle() ;
				            				showMessage(true,"Casellario aggiornato correttamente");
			            				}
			            				else if( result.data = 'CASELLARIO_AGGIORNATO ' ) {
			            					dialogItself.close();
			            					$('#casellarioDetailsModal').modal('toggle') ;
			            					getCaselle() ;
			            					showMessage(true,"Casellario aggiornato correttamente");
			            				}
		            				}
		            				else {
		            					console.log('errore!');
		            					dialogItself.close();
		            					$('#casellarioDetailsModal').modal('toggle') ;
		            					$('#danger_msg').text(result.message);
		            					showMessage(false,result.message);
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
		            }, {
		                label: 'Annulla',
		                action: function(dialogItself) {
		                	dialogItself.close();
		                }
		            }]
		        });
		 }else{
			  BootstrapDialog.alert('Nessun documento selezionato');
		 }
		
	});
	
	$("#dettaglioNC").click(function () {
		getDetailsNonConformi($(this).attr("data-idScatola"),20);
	});
	$("#dettaglioANC").click(function () {
		getDetailsNonConformi($(this).attr("data-idScatola"),30);
	});
	
	$("#close_scatola").click(function(){
		var scatolaId = $(this).attr("data-idScatola");
    	var tipoScatolaTypeId =  $(this).attr("data-tipoScatolaTypeId");
	    BootstrapDialog.show({
            title: 'Conferma Chiusura Scatola',
            message: 'Sei sicuro di voler chiudere la scatola <b>'+$('#lbl_codice_scatola').text()+'</b> contenente <b>'+$('#lbl_numero_doc').text()+'</b> anomalie?',
            buttons: [{
                label: 'Conferma',
                action: function(dialogItself) {
                	var url = contextPath + '/normalizzazione/printNonConformi/' + scatolaId + '/' +tipoScatolaTypeId;
    				window.open(url) ;
    				setTimeout(function(){console.log('waiting 2 second'); }, 2000);
                	var centroDemat =  $('input[name="centrodemat"]').val();
                	var operatore =  $('input[name="user"]').val();
                	var postazione =  $('input[name="postazione"]').val();                	
                	var url = contextPath + '/normalizzazione/nonConformi/'+scatolaId+'/'+operatore+'/'+postazione+'/'+tipoScatolaTypeId+'/'+centroDemat;
                	$.ajax({
            			type : 'PUT',
            			url : url,
            			contentType : 'application/json',            			
            			dataType : 'json',
            			success : function(result) {            				
            				dialogItself.close();
            				$('#nonConformiDetailsModal').modal('toggle') ;
            				getNonConformi();            			
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
            }, {
                label: 'Annulla',
                action: function(dialogItself) {
                	dialogItself.close();
                }
            }]
        });
	});
	
	$('#c_selAll').click( function() {
		if( $('.plico').prop( 'checked' ) ) {
			$('.plico').prop( 'checked' , false ) ;
		}
		else{
			$('.plico').prop( 'checked' , true ) ;
		}
		
	} );
	

});

function getPdf( plicoId ) {
	var url = contextPath + '/normalizzazione/printPlico/' + plicoId;
	window.open(url) ;
}

function getNonConformi() {
	var url = contextPath + '/normalizzazione/getNonConformi/'+$('input[name="centrodemat"]').val();
	//waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'default'});
	$.ajax({
			type : 'GET',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			success : function(result) {
				if(result.status){
					var data = result.data;
					var nc = data[0];
					var anc = data[1];
					if(nc){
						$("#codiceScatolaNC").text(nc.CODICE_SCATOLA);
						$("#numeroDocumentiNC").text(nc.DOC_INSERITI_NELLA_SCATOLA);
						$("#dettaglioNC").attr('data-idScatola', nc.SCATOLA_ID);						
					}
					if(anc){
						$("#codiceScatolaANC").text(anc.CODICE_SCATOLA);
						$("#numeroDocumentiANC").text(anc.DOC_INSERITI_NELLA_SCATOLA);						
						$("#dettaglioANC").attr('data-idScatola', anc.SCATOLA_ID);
					}
					
					
//					$("#dettaglioNC").click(function () {
//						dettaglioScatola(nc.SCATOLA_ID,nc.TIPO_SCATOLA_TYPE_ID);
//					});
//					$("#dettaglioANC").click(function () {
//						dettaglioScatola(anc.SCATOLA_ID,anc.TIPO_SCATOLA_TYPE_ID);
//					});
					
				}else{
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
				//waitingDialog.hide();
			}
		});
}

function getCaselle(casellarioId,colore) {
	var url = contextPath + '/normalizzazione/getCaselle/'+$('input[name="user"]').val();
	$.ajax({
		type : 'GET',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		success : function(result) {
			if(result.status){
				var caselle = result.data;
				var div = $("#caselle");
				div.empty();
				for(var i=0; i<caselle.length; i++) {
					var casellario = caselle[i];
					var col = null;
					if (casellario.CASELLARIO_ID==casellarioId) {
						col = colore;
					}
					var html_casellario = buildCasellario(
							casellario.CASELLARIO_ID,
							casellario.CODICE_CASELLA,
							casellario.DESCRIZIONE_CLIENTE,
							casellario.NOME_DOCUMENTO,
							casellario.TOTALE_DOCUMENTI,
							col);
					div.append(html_casellario);
				}
			}else{
				$('#danger_msg').text(result.message);
				$('#div_error_alert').show();
			}
			//waitingDialog.hide();
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			$('#danger_msg').text(error);
			$('#div_error_alert').show();
			//waitingDialog.hide();
		}
	});
}

function buildCasellario(id,nome,cliente,prodotto,num_doc,colore) {
	var cas_html="<div class=\"col-lg-"+(12/parseInt(numeroBoxPerRiga))+" col-md-12\">";
	
	//evidenziare casellario
	var class_panel = "panel panel-primary";
	var class_btn = "btn btn-primary btn-sm";
	if (colore==0) {
		class_panel = "panel panel-primary panel-yellow";
		class_btn = "btn btn-warning btn-sm";
	} else if (colore==1) {
		class_panel = "panel panel-primary panel-green";
		class_btn = "btn btn-sucess btn-sm";
	}
	
	cas_html += "	<div class=\""+class_panel+"\" id="+id+">";
	cas_html += "		<div class=\"panel-heading\">";
	cas_html += "			<h3 class=\"panel-title\">"+nome+"</h3>";
	cas_html += "		</div>";
	cas_html += "		<div class=\"panel-body\">";
	cas_html += "			<p>Cliente: <b>"+cliente+"</b></p>";
	cas_html += "			<p>Prodotto: <b>"+prodotto	+"</b></p>";
	cas_html += "			<p>Numero Documenti: <b class=\"badge\">"+num_doc+"</b></p>";
	cas_html += "			<p><button ctype=\"button\" class=\""+class_btn+"\" onclick=\"dettaglioCasella("+id+",'"+cliente+"','"+prodotto+"',"+num_doc+")\">Dettaglio</button></p>";
	cas_html += "		</div>";
	cas_html += "	</div>";
	cas_html += "</div>";
	return cas_html;
}

function getNumeroBoxPerRiga() {
	var url = contextPath + '/normalizzazione/getNumeroBoxPerRiga';
	$.ajax({
		type : 'GET',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		success : function(result) {
			if(result.status){
				numeroBoxPerRiga=result.data;
			} else {
				numeroBoxPerRiga="6";
			}
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
		}
	});
}

function dettaglioCasella(casellarioId , cliente , prodotto , num_doc) {
	var url = contextPath + '/normalizzazione/getDetailsCasellario?casellarioId='+casellarioId;
	
	$.ajax({
		type : 'GET',
		url : url,
		contentType : 'application/json',
		dataType : 'json',		
		success : function(result){	
			var t = $('#tab_dettaglio_casellario').DataTable({	
				"destroy": true,
		    	"searching": false,    
		    	"lengthChange": false,
		    	"info": false,
		    	"language": {
		    		"paginate":{
		    			"next":"Prossima",
		    			"previous":"Precedente",
		    			"first":"Prima",	
		    			"last":"Ultima"
		    		} 
		    	}
			});	
			t.clear().draw();
			$.each( result.data, function( key, value ) {		
			    t.row.add( [			  
//			    	value.NOME_CASELLARIO,
//		            value.CLIENTE,
//		            value.PRODOTTO,
//		            value.TOT_DOC,
		            value.COD_OGGETTO,
		            value.DATA_NORMALIZZAZIONE,
		            "<input type=\"checkbox\" data-casellario="+value.CASELLARIO_ID+" data-oggetto="+value.OP_ID+" class=\"plico\"></input>"
		        ] ).draw( false );
			});
			
			$('#casellarioDetailsModal').modal('toggle');
	
			$('#lbl_dettCas_cliente').text( cliente );
			$('#lbl_dettCas_prodotto').text( prodotto );
			$('#lbl_dettCas_totale').text( num_doc );
			
			$('#c_selAll').prop( "checked" , true );
			
			$('.plico').prop( 'checked' , true ) ;
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showMessage(false,error);			
		}
	});
}




function accettazioneBarcode() {
	var codOggetto = $("#codiceOggettoSearch").val();
	var tipo = $("input[name=tipoOptions]:checked").val() ;
	var codScatolaNonConforme = $('#cod_sca_nonConforme').text();
	var url = contextPath + '/normalizzazione/accettazioneBarcode';
	var request = { "data":{"codOggetto": codOggetto , "tipo" : tipo , "codScatolaNonConforme" : codScatolaNonConforme}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			if(result.status){
				var codiceResponse = result.codiceResponse;
				var casellarioId = result.casellarioId;
				var colore = null;
				if (codiceResponse=="PRONTO") {
					colore = 1;
					$("#codiceOggettoSearch").val("");
					$("#cercaOggetto").prop("disabled" , false);
				} else if (codiceResponse=="NORMALIZZATO") {
					colore = 0;
					$("#codiceOggettoSearch").val("");
					$("#cercaOggetto").prop("disabled" , false);
				} else if (codiceResponse=="ANOMALIA_NON_CONFORME") {
					if (result.codiceScatola) {
						evidenziareScatolaANC();
					}
					$("#codiceOggettoSearch").val("");
					$("#cercaOggetto").prop("disabled" , false);
				} else if ( codiceResponse == "TIPO_DOC_SCONOSCIUTO" ) {
					$('#cod_ogg_sconosciuto').text( codOggetto ) ;
					$('#tipoProdottoModal').modal('toggle') ;
				} else if( codiceResponse == "NON_CONFORME" ) {
					$('#cod_ogg_nonConforme').text( codOggetto ) ;
					$('#cod_sca_nonConforme').text( $('#codiceScatolaNC').text() ) ;
					$('#confermaNonConformeModal').modal('toggle') ;
				} else if( codiceResponse == "NON_CONFORME_OK" ) {
					getNonConformi() ;
					$("#codiceOggettoSearch").val("");
					$("#cercaOggetto").prop("disabled" , false);
				} else if( codiceResponse == 'ANOMALIA_NON_CONFORME_OK' ) {
					getNonConformi() ;
					evidenziareScatolaANC();
				}
				if (result.message) {
					showMessage(true,result.message);
					$("#codiceOggettoSearch").val("");
					$("#cercaOggetto").prop("disabled" , false);
				}
			}else{
				showMessage(false,result.message);
				$("#codiceOggettoSearch").val("");
				$("#cercaOggetto").prop("disabled" , false);
			}
			getNonConformi() ;
			getCaselle(casellarioId,colore);//reload caselle
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showMessage(false,error);
			$("#cercaOggetto").prop("disabled" , false);
		}
	});	
}

function showMessage(info,message) {
	$('#div_info').hide();
	$('#div_error').hide();
	if (info) {
		$('#info_msg').text(message);
		$('#div_info').show();
	} else {
		$('#alert_msg').text(message);
		$('#div_error').show();
	}
}

function evidenziareScatolaANC(codice_scatola) {
	$("#scatolaANC").attr("class","panel panel-primary panel-yellow");
}




function getDetailsNonConformi(scatolaId, tipoScatolaTypeId) {
	var url = contextPath + '/normalizzazione/getDetailsNonConformi/'+scatolaId+'/'+tipoScatolaTypeId;
	$('#close_scatola').prop('disabled',false);
	$.ajax({
		type : 'GET',
		url : url,
		contentType : 'application/json',
		dataType : 'json',		
		success : function(result){	
			var t = $('#tab_dettaglio_non_conf').DataTable({	
				"destroy": true,
		    	"searching": false,    
		    	"lengthChange": false,
		    	"info": false,
		    	"language": {
		    		"paginate":{
		    			"next":"Prossima",
		    			"previous":"Precedente",
		    			"first":"Prima",	
		    			"last":"Ultima"		    			
		    		},
		    		"emptyTable": "Non ci sono documenti"
		    	}
			});	
			t.clear().draw();
			$.each( result.data, function( key, value ) {		
			    t.row.add( [			  
			    	value.COD_OGGETTO,
		            value.POSIZIONE_IN_SCATOLA_SCAN,
		            value.DATA_INS_IN_SCATOLA
		        ] ).draw( false );
			});
			if(result.data.length > 0){
				$('#lbl_codice_scatola').text(result.data[0].CODICE_SCATOLA); 
				parseInt(Math.trunc(result.data[0].TIPO_SCATOLA_TYPE_ID)) == 20 ? $('#lbl_tipo_scatola').text('Non conformi') : $('#lbl_tipo_scatola').text('Tipo scatola: Anomalie non conformi')
				$('#lbl_numero_doc').text(result.data[0].TOTALE_ANOMALIE);
				$('#close_scatola').attr('data-idScatola',scatolaId);
				$('#close_scatola').attr('data-tipoScatolaTypeId',tipoScatolaTypeId);
							
			}else{
				$('#close_scatola').prop('disabled',true);
			}
			$('#nonConformiDetailsModal').modal('toggle');	
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showMessage(false,error);			
		}
	});
}
