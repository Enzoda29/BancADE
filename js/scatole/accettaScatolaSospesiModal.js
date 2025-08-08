var idScatolaSelected = null;
var codScatolaSelected = null;
var prosegui_accettazione = false;
$(document).ready(function() {
	
	$('#accettaScatolaSospesiModal').on('show.bs.modal', function() {
		showLblWarningAccSospesi(false,"");
		showLblWarningCodRacc(false,"");
		$("#codiceScatolaSOS").attr("readonly",false);
		$("#codiceScatolaSOS").val('');
		$("#rowCodiceRaccomandata").attr("style","display:none");
		 $(this).find('form').trigger('reset');
		 SUFFIX_MSG = '_SCATOLA_SOSPESI';
		 getLstCasellari();
		 loadScatoleANP();
	});
	
	$("form").on('submit',function(e){
	    e.preventDefault();
	});

	
	$("#checkAccettaSospesi").click(function() {
		checkScatola();
	});
	
	$("#btnAddCodiceRaccomandata").click(function() {
		addRaccomandata();
	});
	
	$("#submitAccettaSospesi").click(function(){
		submitAccettazione();
	});
	
	$("#closeAccettaSospesi").click(function(){
		var codScatola = $("#lblScatolaSelected").text()
		if(codScatola == ""){
			$('#accettaScatolaSospesiModal').modal('hide');
		}else{
		

			var request = {
					"data" : {
						"codiceScatola" : codScatola,
						"accettato" : 0,
				   }};
							var url = contextPath + '/' + 'scatola' + '/loadNumNonAccettato';
							  $.ajax({
									type : 'POST',
									url : url,
									contentType : 'application/json',
									dataType : 'json',
									data : JSON.stringify(request),
									success : function(result) {
										console.log('success! ', result);
										if(result.status){
											if(result.data > 0){
												$("<div id='backdrop' class='modal-backdrop fade in'></div>").appendTo('#accettaScatolaSospesiModal');
												$("#closeMsg").text(result.message);
												$('#Warning').modal('show');												
											}else{
												prosegui_accettazione = true;
												submitAccettazione();
												//$('#confirmClose').click();
												
												$('#accettaScatolaSospesiModal').modal('hide');
												prosegui_accettazione = false;
//												submitAccettazione();
											}
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
	});
//	$('#confirmClose').click(function () {
//        $('#Warning').modal('hide');
//        $('#accettaScatolaSospesiModal').modal('hide');
//        $('#appendTo').removeClass('modal-backdrop fade in');
//   
//    });
	$('#suspendClose').click(function () {
        $('#Warning').modal('hide');
        $('#backdrop').remove();
        $('#accettaScatolaSospesiModal').modal('hide')
    });
	$('#cancelClose').click(function () {
        $('#Warning').modal('hide');
        $('#backdrop').remove();
    });

	var input = document.getElementById("codiceScatolaSOS");

	input.addEventListener("keyup", function(event) {
	  event.preventDefault();
	  if (event.keyCode === 13) {
		  checkScatola();
	  }
	});
	prosegui_accettazione = false;
});


function showLblWarningAccSospesi(show,message){
	$('#lblWarningAccSospesi').text(message);
	$('#lblWarningAccSospesi').attr("style",((show)?"display:''":"display:none"));
}


function showLblWarningCodRacc(show,message){
	$('#lblWarningCodRacc').text(message);
	$('#lblWarningCodRacc').attr("style",((show)?"display:''":"display:none"));
}

function showLoaderLstAccSospesi(show,message){
	$("#loadLstAccSospesi").text(message);
	$("#loadLstAccSospesi").attr("style",((show)?"display:''":"display:none"));
}

function checkScatola() {
	showLblWarningAccSospesi(false,"");
	$("#lblScatolaSelected").text("");
	idScatolaSelected = null;
	codScatolaSelected = null;
	var codScatola = $("#codiceScatolaSOS").val();
	
	if(!((codScatola.length == 10) && (codScatola.substring(0,3) == prefix_sca))) {
		showLblWarningAccSospesi(true,"Attenzione! Formato codice scatola non valido! E' atteso "+prefix_sca+"XXXXXXX");
		return;
	}
	showLoaderLstAccSospesi(true,"Attendere! Controllo codice scatola in corso...");	

	var request = {
		"data" : {
			"codiceScatola" : codScatola,
	   }};
	var url = contextPath + '/' + 'scatola' + '/checkScatolaExist';
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				showLoaderLstAccSospesi(false,"");
				console.log('success! ', result);
				showLoaderLstAccSospesi(false,"");
				if(result.status){		
					if(result.data == null){
						showLblWarningAccSospesi(true,result.message);
					}else{
						idScatolaSelected = result.data.idScatola
						codScatolaSelected = codScatola;
						$("#rowCodiceRaccomandata").attr("style","display:''");
						$("#lblScatolaSelected").text(codScatola);		
						$("#codiceScatolaSOS").attr("readonly",true);
					}
				}else{
					showLblWarningAccSospesi(true,result.message);			
				}
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,result.message);
			}
		});
}

function addRaccomandata(){
	showLblWarningCodRacc(false,"");
	showLblWarningAccSospesi(false,"");
	var codRaccomandata = $("#codiceRaccomandata").val();
	var codScatola = $("#codiceScatolaSOS").val();
	var request = {
			"data" : {
				"idScatola" : codScatola,
				"codiceRaccomandata": codRaccomandata
		   }};
	var url = contextPath + '/' + 'scatola' + '/checkRaccomandataInScatolaExist';
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				showLoaderLstAccSospesi(false,"");
				console.log('success! ', result);
				showLoaderLstAccSospesi(false,"");
				if(result.status){		
					if(!result.data){
						showLblWarningAccSospesi(true,result.message);
					}else{	
						console.log("result: "+result.message);
						if(result.message == "OK"){
							//FASE DI ACCETTAZIONE
							showLoaderLstAccSospesi(true,"Elaborazione accettazione raccomandata in corso...");
							proseguiAccettazione(codRaccomandata);
							showLoaderLstAccSospesi(false,"");
						}else{
							//CREA SCATOLA ANP
							updateAccettato_NOPREADVISING(null,NO_PREADVISING_NON_ACCETTATO);
						}

					}
				}else{
					showLblWarningAccSospesi(true,result.message);			
				}
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,result.message);
			}
		});
}

//Metodo chiamato al termine della chiamata proseguiAccettazione
function loadCasellari(identificativoCasellarioNew){
	$("#rowCasellari").empty();
	console.log('loadCasellari start');
	prosegui_accettazione = true;
	//aggiorna Accettato=1 NO_PREADVISING
	updateAccettato_NOPREADVISING(identificativoCasellarioNew,NO_PREADVISING_ACCETTATO);

}



function updateAccettato_NOPREADVISING(identificativoCasellarioNew,accettato){
	var codRaccomandata = $("#codiceRaccomandata").val();
	var codScatola = $("#codiceScatolaSOS").val();
	var request = {
			"data" : {
				"idScatola" : codScatola,
				"codiceRaccomandata": codRaccomandata,
				"accettato":accettato
		   }};
	var url = contextPath + '/' + 'scatola' + '/updateNOPREADVISING';
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				showLoaderLstAccSospesi(false,"");
				console.log('success! ', result);
				showLoaderLstAccSospesi(false,"");
				if(result.status){	
					if(accettato == NO_PREADVISING_ACCETTATO){
						getLstCasellari(identificativoCasellarioNew)	
					}else
					if(accettato == NO_PREADVISING_NON_ACCETTATO){
						var idScatolaANPNew = result.data.idScatola;
						loadScatoleANP(idScatolaANPNew);
					}
					
				}else{
					showLblWarningAccSospesi(true,result.message);			
				}
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,result.message);
			}
		});
}

function loadScatoleANP(idScatolaANPNew){
	var url = contextPath + '/' + 'scatola' + '/getLstScatoleANP';
	console.log('loadScatoleANP '+url);

	var idCentroDemat = $('input[name="centrodemat"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
	var idPostazione = $('input[name="postazione"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
	
	console.log('centroDemat:',idCentroDemat,'idPostazione:',idPostazione);	
	
	var requestPreadv = { "data":{"idPostazione": idPostazione,"idCentroDemat":idCentroDemat}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestPreadv),
		success : function(result) {			
			console.log('success! ', result);
			console.log('success! ', result.data.listScatole);
			if(result.status){
				$("#rowScatoleANP").empty();
				var listScatole =result.data.listScatole;
				for(var i=0; i<listScatole.length; i++){
					addScatolaANPObj(listScatole[i],idScatolaANPNew);
				}
			}else{
				showErrorMessage(true,result.message);
			}
			
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,error);
		}
	});	
}


function addScatolaANPObj(objScatola,idScatolaANPNew){
	var panel_color = "panel-primary";
	
	var stato = ((objScatola.statoScatola==SCATOLA_APERTA)?"Aperta":"Chiusa");
	if(idScatolaANPNew ==  objScatola.idScatola){
		panel_color = "panel-green";	
	}
	
	var header = objScatola.codiceScatola;

	
	var scatola_div = "<div class='col-lg-3 col-md-6'>" +
							"<div class='panel "+panel_color+"'>"+
						       "<div>"+
					           " <b>Scatola</b> "+
						        "</div>"+
						       "<div class='panel-heading'>"+
						           " <b>"+header+"</b> "+
						        "</div>"+
						        "<div class='panel-body'>"+
									"<ul class='list-group'>"+
										"<li class='list-group-item'>Stato: <b>"+stato+"</b></li>"+
										"<li class='list-group-item'>Numero Pratiche: "+objScatola.numPraticheInserite+"</li>"+
										"<li class='list-group-item'><button onclick=chiudiScatolaANP('"+objScatola.idScatola+"')>Chiudi</button></li>"+
									"</ul>"+
								"</div>"+
						    "</div>"+
						"</div>";
	$("#rowScatoleANP").append(scatola_div);						    
}


function getLstCasellari(identificativoCasellarioNew){
	var url = contextPath + '/' + 'accettazione' + '/getLstCasellari';
	console.log('findCasellario '+url);

	var centroDemat = $('input[name="centrodemat"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
	var idPostazione = $('input[name="postazione"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
	
	console.log('centroDemat:',centroDemat,'idPostazione:',idPostazione);	
	
	var requestPreadv = { "data":{"idPostazione": idPostazione,"centroDemat":centroDemat}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestPreadv),
		success : function(result) {
			console.log('success! ', result);
			console.log('success! ', result.data.listCasellari);
			if(result.status){
				$("#rowCasellari").empty();
				var lstCasellari =result.data.listCasellari;
				for(var i=0; i<lstCasellari.length; i++){
					addCasellarioObj(lstCasellari[i],identificativoCasellarioNew);
				}
			}else{
				showErrorMessage(true,result.message);
			}
			
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,error);
		}
	});	
}

function addCasellarioObj(objCasellario,identificativoCasellarioNew){
	var panel_color = "panel-primary";
	
	var stato = ((objCasellario.stato=="1")?"Aperto":"Chiuso");
	if(identificativoCasellarioNew ==  objCasellario.identificativoCasellario){
		panel_color = "panel-green";
	}else
	if(objCasellario.lock_owner != null){
		panel_color = "panel-default";
		stato = "In Normalizzazione (da "+objCasellario.lock_owner+")";
	}
	
	
	var header_casellario = objCasellario.identificativoCasellario+"_"+objCasellario.identificativoPA+"_"+objCasellario.tipologiaIstanza

	
	var casellario_div = "<div class='col-lg-3 col-md-6'>" +
							"<div class='panel "+panel_color+"'>"+
						       "<div >"+
				           		" <b>Casellario</b> "+
					           "</div>"+
						       "<div class='panel-heading'>"+
						           " <b>"+header_casellario+"</b> "+
						        "</div>"+
						        "<div class='panel-body'>"+
									"<ul class='list-group'>"+
										"<li class='list-group-item'>Stato: <b>"+stato+"</b></li>"+
										"<li class='list-group-item'>Numero Pratiche: "+objCasellario.numPratiche+"</li>"+
									"</ul>"+
								"</div>"+
						    "</div>"+
						"</div>";
	$("#rowCasellari").append(casellario_div);						    
}


function chiudiScatolaANP(idScatola){
	
	var strStato = (statoScatola == STATO_SCATOLA_APERTA)?"Aprire": "Chiudere";
	if(!confirm("Sei sicuro di voler "+strStato+" la SCATOLA?")){
		return;
	}
	var request = {
			"data" : {
				"idScatola" : idScatola,
				"statoScatola": STATO_SCATOLA_CHIUSA,
				"operatore":operatore,
				"idPostazione":idPostazione,
				"idTipoScatola": ID_TIPO_SCATOLA_ANP
		   }};

	var url = contextPath + '/' + 'scatola' + '/cambioStatoScatola';
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			console.log('success! ', result);
			
			if(result.status){
				showSuccessMessage(true,result.message,SUFFIX_MSG);
				loadScatoleANP();
			}else{
				showErrorMessage(true,result.message,SUFFIX_MSG);
			}
			
		},
		error : function(xhr, status, error, result) {
			waitingDialog.hide();
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,result.message,SUFFIX_MSG);
		}
	});
}



//***ACCETTA***//
function submitAccettazione(){
	if((idScatolaSelected == null) || (!prosegui_accettazione)){
		return;
	}
	var idPostazione = $('input[name="postazione"]').val();
	var user = $('input[name="user"]').val();
	
	var request = {
			"data" : {
				"idScatola" : idScatolaSelected,
				"codiceScatola":codScatolaSelected,
				"idPostazione": idPostazione,
				"operatore": user
				
		   }};
	var url = contextPath + '/' + 'scatola' + '/accettaSospesi';
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				showLoaderLstAccSospesi(false,"");
				console.log('success! ', result);
				showLoaderLstAccSospesi(false,"");
				if(result.status){		
					showSuccessMessage(true,"Accettazione completata correttamente!");		
					$('#accettaScatolaSospesiModal').modal('hide');
				}else{
					showErrorMessage(true,result.message,SUFFIX_MSG);			
				}
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,result.message,SUFFIX_MSG);
			}
		});

}
