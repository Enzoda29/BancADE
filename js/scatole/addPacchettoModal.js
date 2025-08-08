var tablePacchetto = null;
var tablePacchettoSelected = null;
var listPacchettoSelected = null;
var listPacchetto = null;
$(document).ready(function() {
	
	tablePacchetto = $('#tablePacchetto').DataTable({
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
	
	tablePacchettoSelected = $('#tablePacchettoSelected').DataTable({
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
	
	$('#addPacchettoModal').on('show.bs.modal', function() {
		showLblOKPacchetto("",false);
		showLblErrorPacchetto("",false);
		showLblWarningPacchetto("",false);
		setValuePraticheInserite(null);
		listPacchettoSelected = new Array();
		$("#codPacchetto").val("");
		
		tablePacchetto.clear();
		tablePacchetto.draw();
		tablePacchettoSelected.clear();
		tablePacchettoSelected.draw();
		$("#spanCodiceScatolaPacchetto").text("");
		
		if(idScatolaSelected == null){
			$("#codScatolaPacchetto").val('');
			$("#divPaccDaScegliere").hide();
			$("#divCodScaPacchetto").show();
		}else{
			showLoaderLstAddPacchetto(true);
			loadPacchetti();
			$("#divPaccDaScegliere").show();
			$("#divCodScaPacchetto").hide();
		}
	});
	
	$("#insPacchetto").click(function(){
		if(idScatolaSelected == null){
			showLblErrorPacchetto("Codice Scatola non inserito!",true);
			return;
		}
		if(listPacchettoSelected.length == 0){			
			showLblWarningPacchetto("ATTENZIONE! Nessun pacchetto selezionato!",true);
		}else{
			insertPacchetto(listPacchettoSelected);
		}

	});
	
	$("#btnCodPacchetto").click(function(){

		var codicePacchetto = $("#codPacchetto").val();
		if(codicePacchetto.trim().length == 0){
			showLblErrorPacchetto("Codice Pacchetto non inserito!",true);
			return;
		}
		
		if(idScatolaSelected == null){
			setScatolaAperta();
		}else{
			addManualPacchetto();
		}
		
		
	});
	
	$("#codPacchetto").keyup(function(e){
		if (e.keyCode === 13) {

			var codicePacchetto = $("#codPacchetto").val();
			if(codicePacchetto.trim().length == 0){
				showLblErrorPacchetto("Codice Pacchetto non inserito!",true);
				return;
			}
			
			if(idScatolaSelected == null){
				setScatolaAperta();				
			}else{
				addManualPacchetto();
			}
		}		
	});
	
	$("#btnSelScatola").click(function(){
		checkCodScatolaApertaPacchetto();
	});
	

	$("#codScatolaPacchetto").keyup(function(e){
		if (e.keyCode === 13) {
			checkCodScatolaApertaPacchetto();
		}		
	});


});

function showLblOKPacchetto(message, show){
	$('#lblOKPacchetto').attr("style",((show)?"display:''":"display:none"));
	$('#lblOKPacchetto').text(message);
}

function showLblErrorPacchetto(message, show){
	$('#lblErrorPacchetto').attr("style",((show)?"display:''":"display:none"));
	$('#lblErrorPacchetto').text(message);
}

function showLblWarningPacchetto(message, show){
	$('#lblWarningPacchetto').attr("style",((show)?"display:''":"display:none"));
	$('#lblWarningPacchetto').text(message);
}

function setValuePraticheInserite(val){
	if(val != null){
		var num_pratiche_ins =parseInt($("#num_pratiche_ins").text());
		num_pratiche_ins += parseInt(val);
	}else{
		num_pratiche_ins = 0;
	}
	$("#num_pratiche_ins").text(num_pratiche_ins);
}

function showLoaderLstAddPacchetto(show){
	$("#loadLstAddPacchetto").text("Attendere! Caricamento dati in corso...");
	$("#loadLstAddPacchetto").attr("style",((show)?"display:''":"display:none"));
}

function loadPacchetti() {
	showLoaderLstAddPacchetto(true);
	tablePacchetto.clear();
	tablePacchetto.draw();
	tablePacchettoSelected.clear();
	tablePacchettoSelected.draw();
	
	var url = contextPath + '/' + 'scatola' + '/loadListPacchetto';
	var request = {	"data" : {	"idCentroDemat" : idCentroDematUser}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			$("#spanCodiceScatolaPacchetto").text(codiceScatolaSelected);
			$("#num_max_pratiche").text(numMaxPraticheSelected);
			$("#num_pratiche_ins").text(numPraticheInsSelected);
			
			listPacchetto = result.data.listPacchetto;
			for(var i=0; i<listPacchetto.length; i++){
				addPacchettoObj(listPacchetto[i],i);
			}
			showLoaderLstAddPacchetto(false);
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

function insertPacchetto(listPacchettoSelected){
	var lstPacchetti = [];
	for(var i=0; i<listPacchettoSelected.length; i++){
		lstPacchetti.push(listPacchettoSelected[i].idPacchetto);		
	}
	var request = {
			"data" : {
				"idScatola" : idScatolaSelected,
				"numPraticheIns": parseInt($("#num_pratiche_ins").text()),
				"listPacchetto" : lstPacchetti,
		   }};
		var url = contextPath + '/' + 'scatola' + '/addPacchetto';
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
						$("#addPacchettoModal").modal('hide');					
						$('#div_success_alert').show();
						$('#success_msg').text(result.message);
						findScatole();
					}else{
						showLblWarningPacchetto(result.message,true);			
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

function addPacchettoObj(objPacchetto,posIndex){
	
	/*var dataInsPraticaFormatStr = null;
	if(objPratica.dataInserimento != null){
		var dataInsPraticaFormat = new Date(objPratica.dataInserimento);
		dataInsPraticaFormatStr = dataInsPraticaFormat.toLocaleString();
	}
	
	var dataAccettazioneRaccomandataStr = null;
	if(objPratica.dataAccettazioneRacc != null){
		var dataAccettazioneRaccomandata = new Date(objPratica.dataAccettazioneRacc);
		dataAccettazioneRaccomandataStr = dataAccettazioneRaccomandata.toLocaleString()
	}*/
	
		
	tablePacchetto.row.add( [	
		  objPacchetto.codicePacchetto,
		  objPacchetto.statoPacchettoDescr,
		  objPacchetto.descrizione,
		  objPacchetto.numDocPacchetto,
		  "<button class='glyphicon glyphicon-plus' title='Seleziona Pacchetto' onclick=addPacchettoTableSelected(this,"+objPacchetto.idPacchetto+")></button>"
	 ] ).draw(false);
}

function getPositionInList(lst,idPacchetto){
	for(var i=0; i<lst.length; i++){
		if(lst[i].idPacchetto == idPacchetto){
			return i;
		}
	}
}


function addPacchettoTableSelected(objThis,idPacchetto){
	var posIndex = getPositionInList(listPacchetto,idPacchetto);   	 
	var objPacchetto = listPacchetto[posIndex];	
	
	listPacchetto.splice(posIndex,1);
	 var row = tablePacchetto.row( $(objThis).parents('tr') );
	 row.remove().draw();
	addObjPacchettoTableSelected(objPacchetto,idPacchetto);
	
}


function addObjPacchettoTableSelected(objPacchetto,idPacchetto){
	var numDocPacchetto = parseInt(objPacchetto.numDocPacchetto);
	var numPratInserite = parseInt($("#num_pratiche_ins").text());
	var numMaxPratiche = parseInt(numMaxPraticheSelected);
	
	if(((numDocPacchetto+numPratInserite) > numMaxPratiche) || (numMaxPratiche == 0)){
		if(!confirm("ATTENZIONE! Numero di pratiche da inserire superiore al Num.Max.Pratiche.Continuare?"))
		return;
	}

	if (listPacchettoSelected.some(e => e.idPacchetto === objPacchetto.idPacchetto)) {
		 console.log('il pacchetto è già presente nella lista');
		 alert('il pacchetto è già presente nella lista');
		 return;
	}
	listPacchettoSelected.push(objPacchetto);
	
	var lastPos = listPacchettoSelected.length -1;
	tablePacchettoSelected.row.add( [	
		  objPacchetto.codicePacchetto,
		  objPacchetto.statoPacchettoDescr,
		  objPacchetto.descrizione,
		  objPacchetto.numDocPacchetto,
		  "<button class='glyphicon glyphicon-minus' title='Deseleziona Pacchetto' onclick=delPacchettoTableSelected(this,"+idPacchetto+")></button>"
		  ] ).draw(false);
	setValuePraticheInserite(numDocPacchetto);
}


function delPacchettoTableSelected(objThis,idPacchetto){
	var row = tablePacchettoSelected.row( $(objThis).parents('tr') );
	row.remove().draw();
	 
	var posIndex = getPositionInList(listPacchettoSelected,idPacchetto);  
	var objPacchetto = listPacchettoSelected[posIndex];
	var numDocPacchetto = parseInt(objPacchetto.numDocPacchetto);
	listPacchetto.push(objPacchetto);
	listPacchettoSelected.splice(posIndex,1);
	
	var size = listPacchetto.length -1;
	addPacchettoObj(objPacchetto,idPacchetto);
	setValuePraticheInserite(-numDocPacchetto);
}


function addManualPacchetto(){
	showLoaderLstAddPacchetto(false);
	showLblErrorPacchetto("",false);
	var codicePacchetto = $("#codPacchetto").val();
	var url = contextPath + '/' + 'scatola' + '/getPacchettoObj';
	var request = {	"data" : {	"codicePacchetto" : codicePacchetto,"idScatola":idScatolaSelected}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			if(!result.status){
				showLblErrorPacchetto(result.message,true);
			}else{
				var itemObj = result.data;
				addObjPacchettoTableSelected(itemObj,itemObj.idPacchetto);
			}

			showLoaderLstAddPacchetto(false);
			 $("#codPacchetto").val('');
			
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

function setScatolaAperta(){
	showLoaderLstAddPacchetto(false);
	showLblErrorPacchetto("",false);
	
	var url = contextPath + '/' + 'scatola' + '/getFirstScatolaAperta';
	var request = {	"data" : {"idTipoScatola" : idTipoScatola}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			if(!result.status){
				showErrorMessage(true,result.message);
			}else{
				if(result.data != null){
					idScatolaSelected = result.data.idScatola;
					codiceScatolaSelected = result.data.codiceScatola;
					numMaxPraticheSelected = result.data.numMaxPratiche;
					numPraticheInsSelected = result.data.numPraticheInserite;
					$("#spanCodiceScatolaPacchetto").text(codiceScatolaSelected);
					$("#num_max_pratiche").text(numMaxPraticheSelected);
					$("#num_pratiche_ins").text(numPraticheInsSelected);
					$("#spanCodiceScatolaPacchetto").text(codiceScatolaSelected);
					
					addManualPacchetto();
				}else{
					showLblErrorPacchetto("Codice Scatola non inserito!",true);	
				}
				
				
			}

			showLoaderLstAddPacchetto(false);			
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

function checkCodScatolaApertaPacchetto(){
	showLoaderLstAddPacchetto(false);
	showLblErrorPacchetto("",false);
	var codScatola = $("#codScatolaPacchetto").val();
	if(codScatola.trim().length == 0){
		showLblErrorPacchetto("Codice Scatola non inserito!",true);
		return;
	}
	if(!((codScatola.length == 10) && (codScatola.substring(0,3) == prefix_sca))) {
		showLblErrorPacchetto("Attenzione! Formato codice scatola non valido! E' atteso "+prefix_sca+"XXXXXXX",true);
		return;
	}
	var url = contextPath + '/' + 'scatola' + '/getScatolaApertaByCodice';
	var request = {	"data" : {	"codiceScatola" : codScatola	}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			if(!result.status){
				showErrorMessage(true,result.message);
			}else{
				if(result.data != null){
					idScatolaSelected = result.data.idScatola;
					codiceScatolaSelected = result.data.codiceScatola;
					numMaxPraticheSelected = result.data.numMaxPratiche;
					numPraticheInsSelected = result.data.numPraticheInserite;
					$("#spanCodiceScatolaPacchetto").text(codiceScatolaSelected);
					$("#num_max_pratiche").text(numMaxPraticheSelected);
					$("#num_pratiche_ins").text(numPraticheInsSelected);
					$("#spanCodiceScatolaPacchetto").text(codiceScatolaSelected);
					$("#codPacchetto").focus();	
				}else{
					showLblErrorPacchetto(result.message,true);	
				}
				
				
			}

			showLoaderLstAddPacchetto(false);			
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


