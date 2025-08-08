var tableScatolaSelected = null;
var listScatolaSelected = null;
var numMaxScatoleSped = 0;
var lstVettore = null;
const SDA = "SDA";
const PI = "PI";
$(document).ready(function() {
	
	tableScatolaSelected = $('#tableScatolaSelected').DataTable({
		/*"paging":   false,*/
        "ordering": false,
        "info":     false,
       /* "searching":  	false,
		select: {
            style: 'single'
        },*/
		"language": {
            "lengthMenu": "Mostra _MENU_ record per pagina",
            "zeroRecords": "Non sono stati trovati record",
            "info": "Mostra pagina _PAGE_ di _PAGES_",
            "infoEmpty": "Non ci sono record",
            "infoFiltered": "(Filtrati da _MAX_ record totali)",
            "search": "Ricerca:",
            "paginate": {
                "first":      "Primo",
                "last":       "Ultimo",
                "next":       "Prossimo",
                "previous":   "Precedente"
            }
        }
		
	});

	$('#creaSpedizioneModal').on('show.bs.modal', function() { 
		showAllSDA(false);
		$("#id_ldv").val('');
		
		tableScatolaSelected.clear();
		tableScatolaSelected.draw();
		listScatolaSelected = new Array();
		showLblWarningCrea("",false);
		loadLstTipIstanza("tipoIstanza",0);
		loadLstIdentificativoPA("identificativoPA",0);
		loadLstVettori();
	});
	
	$("form").on('submit',function(e){
	    e.preventDefault();
	});
	
	$("#formCreaSpedizione").submit(function() {
		submit();		
	});
	
	$("#tipoIstanza").change(function(){
		getVettoreDefault();
	});
	
	$("#identificativoPA").change(function(){
		getVettoreDefault();
	});
	
	$("#vettore").change(function(){
		var idVettore =$("#vettore").val();
		var objVettore = lstVettore[getPositionInListVettore(idVettore)];
		var numMaxScatoleSped  = objVettore.num_max_scatole_sped;
		this.numMaxScatoleSped = numMaxScatoleSped;
		$("#num_max_scatole_ins").text(numMaxScatoleSped);
		if(objVettore.nomeVettore == SDA){
			$("#rowLdV_SDA").show();
		}else{
			$("#rowLdV_SDA").hide();
		}
	});
	
	$("#loadLdv").click(function(){
		createLdvSDA();
	});
	
	$("#addScatolaSDA").click(function(){
		var codiceScatola = $("#codiceScatola").val();
		addScatolaSDA(codiceScatola);
	});
});
//------------------ METODI----------------------------
function showAllSDA(show){
	if(show){
		$("#rowTblScatoleSelect").show();
		$("#rowLdV_SDA").show();
		$("#rowAddScatola_SDA").show();
	}else{
		$("#rowTblScatoleSelect").hide();
		$("#rowLdV_SDA").hide();
		$("#rowAddScatola_SDA").hide();
	}
}



function showLblWarningCrea(message, show){
	$('#lblWarningCreaSpedizione').text(message);
	$('#lblWarningCreaSpedizione').attr("style",((show)?"display:''":"display:none"));
}

function showLoaderLst(show,message){
	$("#loadLstCreaSpedizione").text(message);
	$("#loadLstCreaSpedizione").attr("style",((show)?"display:''":"display:none"));
}

/** CREA LDV  SDA */
function createLdvSDA(){
	showLoaderLst(true,"Attendere! Collegamento SDA per creazione LdV in corso...");	
	$("#loadLdv").attr("disabled",true);
	var url = contextPath + '/' + 'spedizione' + '/getPdfLdV';
	$.ajax({
		type : 'GET',
		url : url,
		xhrFields: {
		    responseType: 'blob'
		  },
		success : function(result, textStatus, xhr) {
			
			console.log('textStatus', textStatus);
			console.log('xhr', xhr);
			console.log('success! ', result.size);
			showLoaderLst(false,"");
			$("#loadLdv").attr("disabled",false);
			
			if(xhr.getResponseHeader('ERROR_MESSAGE') != null){
				showLblWarningCrea(xhr.getResponseHeader('ERROR_MESSAGE'),true);
				return;
			}
				
			var ID_LDV = xhr.getResponseHeader('ID_LDV');
			$("#id_ldv").val(ID_LDV);
			
		    var disposition = xhr.getResponseHeader('Content-Disposition');
		    var filename = null;
		    if (disposition && disposition.indexOf('filename') !== -1) {
		        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
		        var matches = filenameRegex.exec(disposition);
		        if (matches != null && matches[1]) { 
		          filename = matches[1].replace(/['"]/g, '');
		        }
		    }

		    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                //   IE
                window.navigator.msSaveBlob(result, filename);
            } else {
				var link = document.createElement('a');
	            link.href = window.URL.createObjectURL(result);
	            link.download = filename;
	            link.target="_blank";
	            link.click();
            }
			showAllSDA(true);
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


/** AGGIUNGI SCATOLA SDA **/
function addScatolaSDA(codiceScatola){
	showLblWarningCrea("",false);
	if(codiceScatola.trim() == ""){		
		showLblWarningCrea("ATTENZIONE! Nessuna scatola inserita!",true);
		return;
	}
	showLoaderLst(true,"Attendere! Check codice scatola in corso...");	
	var request = {
		"data" : {
			"codiceScatola": codiceScatola,
	   }};
	var url = contextPath + '/' + 'spedizione' + '/checkScatolaPerSpedizione';
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				console.log('success! ', result);
				showLoaderLst(false,"");

				if(result.status){					
					$("#submitCreaSpedizione").prop("disabled",false);
					var objScatola = result.data;
					addScatolaTableSelected(objScatola);
				}else{
					$("#submitCreaSpedizione").prop("disabled",true);
					showLblWarningCrea(result.message,true);			
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


function addScatolaTableSelected(objScatola){
	var idScatola = objScatola.idScatola;
	if(getPositionInListScatola(idScatola) != -1){
		showLblWarningCrea("ATTENZIONE! Codice scatola già presente in questa spedizione!",true);
		return;
	}
	listScatolaSelected.push(objScatola);
	
	var dataCreazioneStr = null;
	if(objScatola.dataCreazione != null){
		var dataInsPratica = new Date(objScatola.dataCreazione);
		dataCreazioneStr = dataInsPratica.toLocaleString();
	}
	
	var dataChiusuraStr = null;
	if(objScatola.dataChiusura != null){
		var dataChiusura = new Date(objScatola.dataChiusura);
		dataChiusuraStr = dataChiusura.toLocaleString()
	}
	tableScatolaSelected.row.add( [	
			objScatola.codiceScatola,
			objScatola.numPraticheInserite,
			dataCreazioneStr,
			dataChiusuraStr,
		  "<button class='glyphicon glyphicon-minus' title='Deseleziona Scatola' onclick=delScatolaTableSelected(this,"+idScatola+")></button>"
		  ] ).draw(false);
	
}


function delScatolaTableSelected(objThis,idScatola){
	var row = tableScatolaSelected.row( $(objThis).parents('tr') );
	row.remove().draw();
	 
	var posIndex = getPositionInListScatola(idScatola);  
	var objScatola = listScatolaSelected[posIndex];

	listScatolaSelected.splice(posIndex,1);
}


/* CREAZIONE SPEDIZIONE */
function submit() {
	if($("#id_ldv").val() == ''){
		showLblWarningCrea("ATTENZIONE! Lettera di Vettura non creata!",true);
		return;
	}
	
	if(listScatolaSelected.length == 0){
		showLblWarningCrea("ATTENZIONE! Nessuna scatola inserita!",true);
		return;		
	}
	if(!confirm("Confermi l'invio della spedizione?")){
		return;
	}
	
	showLblWarningCrea("",false);
	
	var idIstanza = $("#tipoIstanza").val();
	var idAnagPA = $("#identificativoPA").val();
	var idVettore = $("#vettore").val();
	var operatore = $('input[name="user"]').val(); //TODO utente da prendere in fase di autenticazione
	var nota = $("#nota").val();
	var codice_ldv = $("#id_ldv").val();
	
	//Validazione codice scatola		
	$("#submitCreaSpedizione").prop("disabled",true);
	showLoaderLst(true,"Attendere! Creazione spedizione in corso...");	
	

	var listScatole = [];
	for(var i=0; i<listScatolaSelected.length; i++){
		listScatole.push(listScatolaSelected[i].idScatola);		
	}

	var request = {
		"data" : {
			"listScatole": listScatole,
			"idAnagPA" : idAnagPA,
			"idIstanza": idIstanza,
			"idVettore": idVettore,
			"operatore": operatore,
			"codice_ldv": codice_ldv,
			"nota":nota
	   }};
	var url = contextPath + '/' + 'spedizione' + '/creaSpedizione';
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				console.log('success! ', result);
				showLoaderLst(false,"");
				if(result.status){			
					idSpedizioneSelected = result.data;
					$("#creaSpedizioneModal").modal('hide');					
					$('#div_success_alert').show();
					$('#success_msg').text(result.message);
					ricercaSpedizione();
					
					$("#distintaSpedizioneModal").modal();
				}else{
					showLblWarningCrea(result.message,true);			
				}
				$("#submitCreaSpedizione").prop("disabled",false);
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

function getPositionInListVettore(idVettore){
	var pos = -1;
	for(var i=0; i<lstVettore.length; i++){
		if(lstVettore[i].idVettore == idVettore){
			return i;
		}
	}
	
	return pos;
}

function getPositionInListScatola(idScatola){
	var pos = -1;
	for(var i=0; i<listScatolaSelected.length; i++){
		if(listScatolaSelected[i].idScatola == idScatola){
			return i;
		}
	}
	return pos;
}

//function loadLstTipIstanza() {
//	showLoaderLst(true,"Attendere!Caricamento lista Tipo Istanza in corso...");
//	var url = contextPath + '/' + 'spedizione' + '/loadListTipologiaIstanzaPA';
//	$.ajax({
//		type : 'GET',
//		url : url,
//		success : function(result) {
//			$("#tipoIstanza").empty();
//			console.log('success! ', result.data.listIstanza);
//			var lst = result.data.listIstanza;
//			$("#tipoIstanza").append("<option value=''></option>");
//
//			for (var i = 0; i < lst.length; i++) {
//				var obj = lst[i];
//				$("#tipoIstanza").append(
//						"<option value=" + obj.idIstanza + ">"
//								+ obj.codiceTipoIstanza + "</option>");
//			}
//			showLoaderLst(false,'');
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
//}
//
//function loadLstIdentificativoPA() {
//	showLoaderLst(true,"Attendere!Caricamento lista Identificativo PA in corso...");
//	var url = contextPath + '/' + 'spedizione' + '/loadListIdentificativoPA';
//	$.ajax({
//		type : 'GET',
//		url : url,
//		success : function(result) {
//			$("#identificativoPA").empty();
//			console.log('success! ', result.data.listIdPA);
//			var lst = result.data.listIdPA;
//			$("#identificativoPA").append("<option value=''></option>")
//			for (var i = 0; i < lst.length; i++) {
//				var obj = lst[i];
//				$("#identificativoPA").append(
//						"<option value=" + obj.idAnagr + ">"
//								+ obj.identificativoPA + "</option>");
//			}
//			showLoaderLst(false,'');
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
//}

function loadLstVettori() {
	showLoaderLst(true,"Attendere!Caricamento lista Vettori in corso...");
	var url = contextPath + '/' + 'ricerche' + '/loadListVettori';
	$.ajax({
		type : 'GET',
		url : url,
		success : function(result) {
			$("#vettore").empty();
			console.log('success! ', result.data);
			var lst = result.data.listVettore;
			$("#vettore").append("<option value=''></option>")
			lstVettore = new Array();
			for (var i = 0; i < lst.length; i++) {				
				var obj = lst[i];
				lstVettore.push(obj);
				$("#vettore").append(
						"<option value=" + obj.idVettore + ">"
								+ obj.descrizione + "</option>");
			}
			showLoaderLst(false,'');
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

function getVettoreDefault(){
	showLblWarningCrea("",false);
	var idIstanza = $("#tipoIstanza").val();
	var idAnagPA = $("#identificativoPA").val();
	
	if((idIstanza != "") && (idAnagPA != "")){
		showLoaderLst(true,"Attendere! Caricamento Vettori default in corso...");
		
		$("#submitCreaSpedizione").prop("disabled",false);
		var request = {	"data" : {	"idAnagrPA" : idAnagPA, "idIstanza": idIstanza   }};
			var url = contextPath + '/' + 'spedizione' + '/loadVettoreDefault';
			$.ajax({
					type : 'POST',
					url : url,
					contentType : 'application/json',
					dataType : 'json',
					data : JSON.stringify(request),
					success : function(result) {
						showLoaderLst(false,"");
						console.log('success! ', result);
						if(result.status){
							$("#vettore").val(result.data.idVettore);
							numMaxScatoleSped = result.data.num_max_scatole_sped;
							$("#num_max_scatole_ins").text(numMaxScatoleSped);
							if(result.data.nomeVettore == SDA){
								$("#rowLdV_SDA").show();
							}
						}else{
							$("#submitCreaSpedizione").prop("disabled",true);
							showLblWarningCrea(result.message,true);	
						}
						$("#num_maxPratiche").prop("disabled",false);
						
					},
					error : function(xhr, status, error, result) {
						$("#submitCreaSpedizione").prop("disabled",true);
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
}
