var tableScatola = null;
var tableScatolaSelected = null;
var listScatolaSelected = null;
var listScatola = null;
$(document).ready(function() {
	
	tableScatola = $('#tableScatola').DataTable({
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
		tableScatola.clear();
		tableScatola.draw();
		tableScatolaSelected.clear();
		tableScatolaSelected.draw();
		showLblWarningCrea("",false);
		loadLstTipIstanza();
		loadLstIdentificativoPA();
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
		loadLstScatole();
	});
	
	$("#identificativoPA").change(function(){
		getVettoreDefault();
		loadLstScatole();
	});
	

});





function showLblWarningCrea(message, show){
	$('#lblWarningCreaSpedizione').text(message);
	$('#lblWarningCreaSpedizione').attr("style",((show)?"display:''":"display:none"));
}

function showLoaderLst(show,message){
	$("#loadLstCreaSpedizione").text(message);
	$("#loadLstCreaSpedizione").attr("style",((show)?"display:''":"display:none"));
}

function submit() {
	showLblWarningCrea("",false);
	
	var idIstanza = $("#tipoIstanza").val();
	var idAnagPA = $("#identificativoPA").val();
	var idVettore = $("#vettore").val();
	var operatore = $('input[name="user"]').val(); //TODO utente da prendere in fase di autenticazione
	var nota = $("#nota").val();
	
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
					$("#creaSpedizioneModal").modal('hide');					
					$('#div_success_alert').show();
					$('#success_msg').text(result.message);
					ricercaSpedizione();
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

function loadLstScatole(){
	var idIstanza = $("#tipoIstanza").find(":selected").text();;
	var idAnagPA = $("#identificativoPA").find(":selected").text();;
	
	if((idIstanza != "") && (idAnagPA != "")){
		showLoaderLst(true,"Attendere! Caricamento elenco Scatole in corso...");
		
		$("#submitCreaSpedizione").prop("disabled",false);
		var request = {	"data" : {	"statoScatola": SCATOLA_ARCHIVIATA_TEMPORANEAMENTE ,"identificativoPa" : idAnagPA, "codiceTipoIstanza": idIstanza   }};
		console.log(request);
			
		var url = contextPath + '/' + 'spedizione' + '/loadListScatole';			
		$.ajax({
				type : 'POST',
				url : url,
				contentType : 'application/json',
				dataType : 'json',
				data : JSON.stringify(request),
				success : function(result) {
					console.log('success! ', result);
					if(result.status){
						//$("#vettore").val(result.data.idVettore);	
						listScatola = result.data.listScatole;
						listScatolaSelected = new Array();
						for(var i=0; i<listScatola.length; i++){
							addScatolaObj(listScatola[i],i);
						}
					}else{
						$("#submitCreaSpedizione").prop("disabled",true);
						showLblWarningCrea(result.message,true);	
					}
					showLoaderLst(false,'');
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

function addScatolaObj(objScatola,posIndex){	
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
	
		
	tableScatola.row.add( [	
		objScatola.codiceScatola,
		objScatola.numPraticheInserite,
		dataCreazioneStr,
		dataChiusuraStr,
		  "<button class='glyphicon glyphicon-plus' title='Seleziona Scatola' onclick=addScatolaTableSelected(this,"+objScatola.idScatola+")></button>"
	 ] ).draw(false);
}


function getPositionInList(lst,idScatola){
	for(var i=0; i<lst.length; i++){
		if(lst[i].idScatola == idScatola){
			return i;
		}
	}
}


function addScatolaTableSelected(objThis,idScatola){
	var posIndex = getPositionInList(listScatola,idScatola);   
	var objScatola = listScatola[posIndex];	
	
	 var row = tableScatola.row( $(objThis).parents('tr') );
	 row.remove().draw();
	 
	
	listScatolaSelected.push(objScatola);
	listScatola.splice(posIndex,1);
	
	var lastPos = listScatolaSelected.length -1;
	
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
	 
	var posIndex = getPositionInList(listScatolaSelected,idScatola);  
	var objScatola = listScatolaSelected[posIndex];

	listScatola.push(objScatola);
	listScatolaSelected.splice(posIndex,1);
	
	var size = listScatola.length -1;
	addScatolaObj(objScatola,idScatola);
}

function loadLstTipIstanza() {
	showLoaderLst(true,"Attendere!Caricamento lista Tipo Istanza in corso...");
	var url = contextPath + '/' + 'spedizione' + '/loadListTipologiaIstanzaPA';
	$.ajax({
		type : 'GET',
		url : url,
		success : function(result) {
			$("#tipoIstanza").empty();
			console.log('success! ', result.data.listIstanza);
			var lst = result.data.listIstanza;
			$("#tipoIstanza").append("<option value=''></option>");
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
				$("#tipoIstanza").append(
						"<option value=" + obj.idIstanza + ">"
								+ obj.codiceTipoIstanza + "</option>");
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

function loadLstIdentificativoPA() {
	showLoaderLst(true,"Attendere!Caricamento lista Identificativo PA in corso...");
	var url = contextPath + '/' + 'spedizione' + '/loadListIdentificativoPA';
	$.ajax({
		type : 'GET',
		url : url,
		success : function(result) {
			$("#identificativoPA").empty();
			console.log('success! ', result.data.listIdPA);
			var lst = result.data.listIdPA;
			$("#identificativoPA").append("<option value=''></option>")
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
				$("#identificativoPA").append(
						"<option value=" + obj.idAnagr + ">"
								+ obj.identificativoPA + "</option>");
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

function loadLstVettori() {
	showLoaderLst(true,"Attendere!Caricamento lista Vettori in corso...");
	var url = contextPath + '/' + 'spedizione' + '/loadListVettori';
	$.ajax({
		type : 'GET',
		url : url,
		success : function(result) {
			$("#vettore").empty();
			console.log('success! ', result.data.listVettore);
			var lst = result.data.listVettore;
			$("#vettore").append("<option value=''></option>")
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
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
