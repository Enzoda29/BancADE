var lstRaccSelected_ANM = null
var tableRaccomadata_ANM = null;
var idScatolaSelected_ANM = null;
var codScatolaSelected_ANM = null;
var SUFFIX_PRAT_ANM = "_ANM";
$(document).ready(function() {
	
	tableRaccomadata_ANM = $('#tableRaccomadata_ANM').DataTable({
		fixedHeader: true,
		"paging":   false,
        "scrollCollapse": true,
        "ordering": false,
        "info":     false,
        "searching":  	false,
		/*select: {
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

	$('#addPraticheAnomalieModal').on('show.bs.modal', function() {		
		showErrorMessage(false,"",SUFFIX_PRAT_ANM);	
		showSuccessMessage(false,"",SUFFIX_PRAT_ANM);	
		$("#tipoIstanza_ANM").empty();
		$("#identificativoPA_ANM").empty();
		tableRaccomadata_ANM.clear().draw();
		loadLstTipIstanza("tipoIstanza_ANM",4);
		loadLstIdentificativoPA("identificativoPA_ANM",4); 
		$("#codiceRaccomandata_ANM").val('');
		$("#codScatola_ANM").val('');
		lstRaccSelected_ANM = new Array();
	});
	
	$("#formAddPratiche_ANM").on('submit',function(e){
	    e.preventDefault();
	});

	
	$("#btnAddCodiceRacc_ANM").click(function(){
		showErrorMessage(false,'',SUFFIX_PRAT_ANM);
		var codiceRaccomandata = $("#codiceRaccomandata_ANM").val();
		if(checkRaccomandataIsPresent_ANM(codiceRaccomandata)){
			checkRaccomandata_ANM();
		}

	});
	
	$("#codiceRaccomandata_ANM").keyup(function(e){
		if (e.keyCode === 13) {
			showErrorMessage(false,'',SUFFIX_PRAT_ANM);
			var codiceRaccomandata = $("#codiceRaccomandata_ANM").val();
			if(checkRaccomandataIsPresent_ANM(codiceRaccomandata)){
				checkRaccomandata_ANM();
			}
		}		
	});
	
	$("#codScatola_ANM").keyup(function(e){
		if (e.keyCode === 13) {
			showErrorMessage(false,'',SUFFIX_PRAT_ANM);
			checkScatola_ANM();
		}		
	});
	
	$("#btnSelScatola_ANM").click(function(){
		checkScatola_ANM();
	});
	
	$("#submitAddPratiche_ANM").click(function(){
		submit_ANM();
	});

});

function setValuePraticheAnomalieInserite(val){
	var num_pratiche_ins = 0;
	if(val != null){
		num_pratiche_ins =parseInt($("#num_pratiche_ins_ANM").text());
		num_pratiche_ins += parseInt(val);
	}
	$("#num_pratiche_ins_ANM").text(num_pratiche_ins);
}



function addRaccomandata_ANM(){
	var numPratInserite = parseInt($("#num_pratiche_ins_ANM").text());
	var numMaxPratiche = parseInt($("#num_max_pratiche_ANM").text());
	
	if((numPratInserite > numMaxPratiche) || (numMaxPratiche == 0)){
		if(!confirm("ATTENZIONE! Numero di pratiche da inserire superiore al Num.Max.Pratiche.Continuare?"))
		return;
	}
	showErrorMessage(false,"",SUFFIX_PRAT_ANM);	
	var codiceRaccomandata = $("#codiceRaccomandata_ANM").val();
	lstRaccSelected_ANM.push(codiceRaccomandata);
	tableRaccomadata_ANM.row.add( [	
		codiceRaccomandata,
		  "<button class='glyphicon glyphicon-minus' title='Rimuovi raccomandata' onclick=delRaccomandata_ANM(this,"+codiceRaccomandata+")></button>"
	 ] ).draw(false);
	
	setValuePraticheAnomalieInserite(1);
}


function delRaccomandata_ANM(objThis, codRaccSelected){
	var row = tableRaccomadata_ANM.row( $(objThis).parents('tr') );
	row.remove().draw();
	
	for(var i=0; i<lstRaccSelected_ANM.length; i++){
		if(lstRaccSelected_ANM[i] == codRaccSelected){
			lstRaccSelected_ANM.splice(i,1);	
		}
	}
	setValuePraticheAnomalieInserite(-1);
}

function checkRaccomandataIsPresent_ANM(codRacc){
	for(var i=0; i<lstRaccSelected_ANM.length; i++){
		if(lstRaccSelected_ANM[i] == codRacc){
			showErrorMessage(true,"Codice Raccomandata già inserito!",SUFFIX_PRAT_ANM);	
			return false;
		}
	}
	return true;
}

function checkRaccomandata_ANM(){
	showErrorMessage(false,"",SUFFIX_PRAT_ANM);
	showLoaderLst_ANM(false);

	var idIstanzaSelected = $("#tipoIstanza_ANM").val();
	if(idIstanzaSelected == ""){
		showErrorMessage(true,"Tipologia Istanza non selezionato!",SUFFIX_PRAT_ANM);
		return;
	}
	var idAnagrPASelected = $("#identificativoPA_ANM").val();
	if(idAnagrPASelected == ""){
		showErrorMessage(true,"Identificativo PA non selezionato!",SUFFIX_PRAT_ANM);
		return;
	}
	if(idScatolaSelected_ANM == null){
		showErrorMessage(true,"Codice Scatola non inserito!",SUFFIX_PRAT_ANM);
		return;
	}
	var codiceRaccomandata = $("#codiceRaccomandata_ANM").val();
	if(codiceRaccomandata.trim().length == 0){
		showErrorMessage(true,"Codice Raccomandata non inserito!",SUFFIX_PRAT_ANM);
		return;
	}
	showLoaderLst_ANM(true,"Attendere! Controllo raccomandata in corso...");
	var url = contextPath + '/' + 'scatola' + '/checkPraticaAnomala';
	var request = {	"data" : {	"idAnagrPA" : idAnagrPASelected, "idIstanza" : idIstanzaSelected, "codiceRaccomandata" : codiceRaccomandata}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			if(!result.status){
				showErrorMessage(true,result.message,SUFFIX_PRAT_ANM);
			}else{
				addRaccomandata_ANM();		
			}
			$("#codiceRaccomandata_ANM").val("");		
			showLoaderLst_ANM(false);			
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


function checkScatola_ANM(){
	showErrorMessage(false,"",SUFFIX_PRAT_ANM);
	showLoaderLst_ANM(false);

	var idIstanza = $("#tipoIstanza_ANM").val();
	if(idIstanza == ""){
		showErrorMessage(true,"Tipologia Istanza non selezionato!",SUFFIX_PRAT_ANM);
		return;
	}
	var idAnagPA = $("#identificativoPA_ANM").val();
	if(idAnagPA == ""){
		showErrorMessage(true,"Identificativo PA non selezionato!",SUFFIX_PRAT_ANM);
		return;
	}
	
	var codScatola_ANM = $("#codScatola_ANM").val();
	if(codScatola_ANM.trim().length == 0){
		showErrorMessage(true,"Codice Scatola non inserito!",SUFFIX_PRAT_ANM);
		return;
	}
	showLoaderLst_ANM(true,"Attendere! Controllo codice scatola in corso...");
	var url = contextPath + '/' + 'scatola' + '/getScatolaApertaAnomalaByCodice';
	var request = {	"data" : {	"codiceScatola" : codScatola_ANM}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			if(result.data != null){
				idScatolaSelected_ANM = result.data.idScatola;	
				codScatolaSelected_ANM = result.data.codiceScatola;
				$("#num_max_pratiche_ANM").text(result.data.numMaxPratiche);
				$("#num_pratiche_ins_ANM").text(result.data.numPraticheInserite);
			}else{
				showErrorMessage(true,result.message,SUFFIX_PRAT_ANM);
				$("#codScatola_ANM").val("");	
			}

			showLoaderLst_ANM(false);			
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




function showLoaderLst_ANM(show,message){
	$("#loadLstAddPratiche_ANM").text(message);
	$("#loadLstAddPratiche_ANM").attr("style",((show)?"display:''":"display:none"));
}



function submit_ANM() {
	if(lstRaccSelected_ANM.length == 0){
		showErrorMessage(true,"Nessuna raccomandata selezionata!",SUFFIX_PRAT_ANM);
		return;
	}     
	showErrorMessage(false,"",SUFFIX_PRAT_ANM);
	
	
	$("#submitAddPratiche_ANM").prop("disabled",true);
	showLoaderLst(true,"Attendere! Creazione accettazione scarto in corso...");	
	
	var lstRaccomandate = [];
	for(var i=0; i<lstRaccSelected_ANM.length; i++){
		lstRaccomandate.push(lstRaccSelected_ANM[i]);		
	}
	var idPostazione = $('input[name="postazione"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
	var operatore = $('input[name="user"]').val();
	var request = {
		"data" : {
			"idScatola": idScatolaSelected_ANM,
			"codiceScatola":codScatolaSelected_ANM,
			"numPraticheIns": parseInt($("#num_pratiche_ins_ANM").text()),
			"listRaccomandate": lstRaccomandate 
	   }};
	console.log(request);
	var url = contextPath + '/' + 'scatola' + '/addPraticheScatolaAnomalie';
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
					showSuccessMessage(true,result.message);	
					$("#addPraticheAnomalieModal").modal('hide');
				}else{
					showErrorMessage(true,result.message,SUFFIX_PRAT_ANM);		
				}
				$("#submitAddPratiche_ANM").prop("disabled",false);				
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


