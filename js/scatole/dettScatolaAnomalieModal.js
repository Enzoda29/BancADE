var tablePraticheScatoleAnomalie = null;
var tablePraticheScatoleAnomalie_Selected = null;
var listPraticheSelected = null;
var listPratiche = null;
var idIstanzaSelected = null;
var idAnagrPASelected = null;
var SUFFIX_ANM = "_DETT_SCA_ANOM";
$(document).ready(function() {
	
	tablePraticheScatoleAnomalie = $('#tablePraticheScatoleAnomalie').DataTable({
		/*"paging":   false,
        "scrollCollapse": true,*/
        "ordering": false,
        "info":     false,
        /*"searching":  	true,
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
	
	tablePraticheScatoleAnomalie_Selected = $('#tablePraticheScatoleAnomalie_Selected').DataTable({
		/*"paging":   false,
        "scrollY":  "300px",
        "scrollCollapse": true,*/
        "ordering": false,
        "info":     false,
        /*"searching":  	true,
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
	
	$('#dettScatolaAnomalieModal').on('show.bs.modal', function() {
		showLblWarningDettAnomalie("",false);
		setValuePraticheAnomalieInserite(null);
		loadDettScatolaAnomalie();
	});
	
	$("#btnInsAnomalie").click(function(){
		addPraticheSelected();
	});
	
	$("#codRaccomandataDettAnom").keyup(function(e){
		if (e.keyCode === 13) {
			checkRaccomandataAnomala();
		}		
	});

	$("#btnCodRaccomandataDettAnom").click(function(){
		checkRaccomandataAnomala();
	});
});


function clickCambioStatoScatolaAnomalie(stato){
	$("#dettScatolaAnomalieModal").modal('hide');
	cambiaStatoScatola(idScatolaSelected,stato);
}

function showLoaderLstDettScatolaAnomalie(show){
	$("#loadLstDettScatolaAnomalie").text("Attendere! Caricamento dati in corso...");
	$("#loadLstDettScatolaAnomalie").attr("style",((show)?"display:''":"display:none"));
}

function loadDettScatolaAnomalie() {
	tablePraticheScatoleAnomalie.clear();
	tablePraticheScatoleAnomalie.draw();
	tablePraticheScatoleAnomalie_Selected.clear();
	tablePraticheScatoleAnomalie_Selected.draw();
	
        setValuePraticheAnomalieInserite(null);
	showLoaderLstDettScatolaAnomalie(true);
	var url = contextPath + '/' + 'scatola' + '/dettScatola';
	var request = {	"data" : {	"idScatola" : idScatolaSelected, "idCentroDemat" : $('input[name="centrodemat"]').val(), "idTipoScatola" : idTipoScatola, "statoScatola":statoScatolaSelected}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			idIstanzaSelected = result.data.idIstanza;
			idAnagrPASelected = result.data.idAnagrPA;
			codiceScatolaSelected = result.data.codiceScatola;
			$("#codiceScatolaAnomalie").text(result.data.codiceScatola);
			var dataCreazioneStr = new Date(result.data.dataCreazione).toLocaleString();	
			$("#dataCreazioneScatolaAnomalie").text(dataCreazioneStr);
			
			$("#num_max_pratiche_anomalie").text(numMaxPraticheSelected);
			//$("#num_pratiche_ins_ANM").text(numPraticheInsSelected);
			
			var stato = null;
			if(result.data.statoScatola == SCATOLA_APERTA){
				stato = "APERTA";
				$("#btnCambioScatolaAnomalie").html("<i class='glyphicon glyphicon-folder-close'></i> Chiudi Scatola");
				$("#btnCambioScatolaAnomalie").attr("style","display:''");
				$("#btnCambioScatolaAnomalie").unbind();
				$("#btnCambioScatolaAnomalie").bind("click", function(){clickCambioStatoScatolaAnomalie(STATO_SCATOLA_CHIUSA);});
				$("#divPraticheAnomalie").attr("style","display:''");
				$("#btnInsAnomalie").attr("style","display:''");
			}else
			if(result.data.statoScatola == SCATOLA_CHIUSA){
				stato = "CHIUSA";
				$("#btnCambioScatolaAnomalie").html("<i class='glyphicon glyphicon-folder-open'></i> Apri Scatola");
				$("#btnCambioScatolaAnomalie").attr("style","display:''");
				$("#btnCambioScatolaAnomalie").unbind();
				$("#btnCambioScatolaAnomalie").bind("click", function(){clickCambioStatoScatolaAnomalie(STATO_SCATOLA_APERTA);});
				$("#divPraticheAnomalie").attr("style","display:none");
				$("#btnInsAnomalie").attr("style","display:none");
			}
			$("#statoScatolaAnomalie").text(stato);
			
			$("#idPAScatolaAnomalie").text(result.data.identificativoPA);
			$("#tipIstScatolaAnomalie").text(result.data.codiceTipoIstanza);
			$("#numPraticheScatolaAnomalie").text(result.data.numPraticheInserite);
			$("#percComplScatolaAnomalie").text(result.data.percCompletamento);
		
			var dataChiusuraStr = "";
			if(result.data.dataChiusura != null){
				dataChiusuraStr = new Date(result.data.dataChiusura).toLocaleString();	
			}				
			$("#dataChiusuraScatolaAnomalie").text(dataChiusuraStr);
			$("#centroDematScatolaAnomalie").text(result.data.localitaCentroDemat);
			
			tablePraticheScatoleAnomalie.clear().draw();
			
			listPratiche = result.data.lstPratiche;
			listPraticheSelected = new Array();
			for(var i=0; i<listPratiche.length; i++){
				addPraticheObjAnm(listPratiche[i]);
			}			
			showLoaderLstDettScatolaAnomalie(false);			
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


function getPositionInListAnomalie(lst,idPratica){
	for(var i=0; i<lst.length; i++){
		if(lst[i].idPratica == idPratica){
			return i;
		}
	}
}

function setValuePraticheAnomalieInserite(val){
	var num_pratiche_ins = 0;
	if(val != null){
		num_pratiche_ins =parseInt($("#num_pratiche_ins_ANM").text());
		num_pratiche_ins += parseInt(val);
	}else{
		num_pratiche_ins = 0;
	}
	$("#num_pratiche_ins_ANM").text(num_pratiche_ins);
}


function getStatoSTR(stato){
	var statoSTR = stato;
	if(statoSTR == STATO_SCATOLA_CHIUSA){
		statoSTR = "CHIUSA";
	}else
	if(statoSTR == STATO_SCATOLA_APERTA){
		statoSTR = "APERTA";
	}
	
	return statoSTR;

}

function showLblWarningDettAnomalie(message, show){
	$('#lblWarningDettAnomalie').attr("style",((show)?"display:''":"display:none"));
	$('#lblWarningDettAnomalie').text(message);
}

function addPraticaTableSelected(objThis,idPratica,progPacchetto){
	showLblWarningDettAnomalie('',false);
	var posIndex = getPositionInListAnomalie(listPratiche,idPratica);   
	var objPratica = listPratiche[posIndex];	
	
//	if(objPratica.scatolaObj.statoScatola == STATO_SCATOLA_CHIUSA){
//		showLblWarningDettAnomalie("ATTENZIONE! Scatola Chiusa, la pratica non può essere aggiunta!.",true);
//		return;
//	}

	var numPratInserite = parseInt($("#num_pratiche_ins_ANM").text());
	var numMaxPratiche = parseInt(numMaxPraticheSelected);
	
	if((numPratInserite > numMaxPratiche) || (numMaxPratiche == 0)){
		if(!confirm("Numero di pratiche da inserire superiore al Num.Max.Pratiche! Si vuole procedere?")){
			return;	
		}		
	}	
	 var row = tablePraticheScatoleAnomalie.row( $(objThis).parents('tr') );
	 row.remove().draw(); 

	listPratiche.splice(posIndex,1);
	addPraticheObjAnmSelected(objPratica,idPratica);
	/*listPraticheSelected.push(objPratica);
	tablePraticheScatoleAnomalie_Selected.row.add( [	
		 objPratica.codicePacchetto,
		  objPratica.progrScatola,
	      objPratica.codiceRaccomandata,
	      objPratica.scatolaObj.codiceScatola,
	      getStatoSTR(objPratica.scatolaObj.statoScatola),
		  "<button class='glyphicon glyphicon-minus' title='Deseleziona Pratica' onclick=delPraticaTableSelected(this,"+idPratica+")></button>"
		  ] ).draw(false);
	
	setValuePraticheAnomalieInserite(1);*/
}

function addPraticheObjAnmSelected(objPratica,idPratica){
	if (listPraticheSelected.some(e => e.codiceRaccomandata === objPratica.codiceRaccomandata)) {
		 console.log('La pratica è già presente nella lista');
		 alert('La pratica è già presente nella lista');
		 return;
	}
	listPraticheSelected.push(objPratica);

	tablePraticheScatoleAnomalie_Selected.row.add( [	
		 objPratica.codicePacchetto,
		  objPratica.progrScatola,
	      objPratica.codiceRaccomandata,
	      objPratica.scatolaObj.codiceScatola,
	      getStatoSTR(objPratica.scatolaObj.statoScatola),
		  "<button class='glyphicon glyphicon-minus' title='Deseleziona Pratica' onclick=delPraticaTableSelected(this,"+idPratica+")></button>"
		  ] ).draw(false);
	
	setValuePraticheAnomalieInserite(1);
}

function addPraticheObjAnm(objPratica){
		
	tablePraticheScatoleAnomalie.row.add( [	
		  objPratica.codicePacchetto,
		  objPratica.progrScatola,
	      objPratica.codiceRaccomandata,
	      objPratica.scatolaObj.codiceScatola,
	      getStatoSTR(objPratica.scatolaObj.statoScatola),
	      "<button class='glyphicon glyphicon-plus' title='Seleziona Pratica' onclick=addPraticaTableSelected(this,"+objPratica.idPratica+")></button>"
	      
	 ] ).draw(false);
}

function delPraticaTableSelected(objThis,idPratica){
	var row = tablePraticheScatoleAnomalie_Selected.row( $(objThis).parents('tr') );
	row.remove().draw();
	 
	var posIndex = getPositionInListAnomalie(listPraticheSelected,idPratica);  
	var objPratica = listPraticheSelected[posIndex];
	//var numDocPacchetto = parseInt(objPratica.numDocPacchetto);
	listPratiche.push(objPratica);
	listPraticheSelected.splice(posIndex,1);
	
	var size = listPratiche.length -1;
	addPraticheObjAnm(objPratica,idPratica);
	//setValuePraticheAnomalieInserite(-numDocPacchetto);
	setValuePraticheAnomalieInserite(-1);
}


function addPraticheSelected(){
	if(listPraticheSelected.length == 0){
		showLblWarningDettAnomalie("ATTENZIONE! Nessuna pratica selezionata!",true);
		return;
	}
	var lstPratiche = [];
	/*for(var i=0; i<listPraticheSelected.length; i++){
		lstPratiche.push(listPraticheSelected[i].idPratica);		
	}*/
        var numDoc=parseInt($("#numPraticheScatolaAnomalie").text())+parseInt($("#num_pratiche_ins_ANM").text());
	var request = {
			"data" : {
				"idScatola" : idScatolaSelected,
				"codiceScatola": codiceScatolaSelected,
				"numPraticheIns": numDoc,
				"listPratiche" : listPraticheSelected,
		   }};
		var url = contextPath + '/' + 'scatola' + '/addPraticheAnomalie';
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
						$("#dettScatolaAnomalieModal").modal('hide');					
						$('#div_success_alert').show();
						$('#success_msg').text(result.message);
						$("#distintaScatolaAnomalieModal").modal();
						findScatole();
					}else{
						showLblWarningDettAnomalie(result.message,true);			
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

function checkPraticaIsPresent(idPraticaSel){
	for(var i=0; i<listPratiche.length; i++){
		if(listPratiche[i].idPratica == idPraticaSel){
			showErrorMessage(true,"Pratica già presente nella lista da selezionare!",SUFFIX_ANM);
			return false;
		}
	}
	for(var i=0; i<listPraticheSelected.length; i++){
		if(listPraticheSelected[i].idPratica == idPraticaSel){
			showErrorMessage(true,"Pratica già presente nella lista delle selezionate!",SUFFIX_ANM);
			return false;
		}
	}

	return true;
}

function checkRaccomandataAnomala(){
	showErrorMessage("",false,SUFFIX_ANM);
	showLoaderLstDettScatolaAnomalie(false);
	var codiceRaccomandata = $("#codRaccomandataDettAnom").val();
	if(codiceRaccomandata.trim().length == 0){
		showErrorMessage(true,"Codice Raccomandata non inserito!",SUFFIX_ANM);
		return;
	}
	showLoaderLstDettScatolaAnomalie(true);
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
				showErrorMessage(true,result.message,SUFFIX_ANM);
			}else{
				if(checkPraticaIsPresent(result.data.idPratica)){
					addPraticheObjAnmSelected(result.data,result.data.idPratica);					 					
				}
				$("#codRaccomandataDettAnom").val('');
				
			}

			showLoaderLstDettScatolaAnomalie(false);			
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
