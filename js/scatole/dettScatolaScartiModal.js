/******************************************
 * 
 * 
 * NON USATA IN QUANTO LA VOCE DI MENU' /scatola/scatolaScarti è DISABILITATA
 * 
 */


var tablePraticheScatoleScarti = null;
var tablePraticheScatoleScarti_Selected = null;
var listPraticheSelected = null;
var listPratiche = null;
$(document).ready(function() {
	tablePraticheScatoleScarti = $('#tablePraticheScatoleScarti').DataTable({
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
	
	tablePraticheScatoleScarti_Selected = $('#tablePraticheScatoleScarti_Selected').DataTable({
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
	
	$('#dettScatolaScartiModal').on('show.bs.modal', function() {
		showLblWarningDettScarti("",false);
		setValuePraticheScartiInserite(null);
		loadDettScatolaScarti();
	});
	
	$("#btnInsScarti").click(function(){
		addPraticheSelected();
	});

});


function clickCambioStatoScatolaScarti(stato){
	$("#dettScatolaScartiModal").modal('hide');
	cambiaStatoScatola(idScatolaSelected,stato);
}

function showLoaderLstDettScatolaScarti(show){
	$("#loadLstDettScatolaScarti").text("Attendere! Caricamento dati in corso...");
	$("#loadLstDettScatolaScarti").attr("style",((show)?"display:''":"display:none"));
}

function loadDettScatolaScarti() {
	tablePraticheScatoleScarti.clear();
	tablePraticheScatoleScarti.draw();
	tablePraticheScatoleScarti_Selected.clear();
	tablePraticheScatoleScarti_Selected.draw();
	
	showLoaderLstDettScatolaScarti(true);
	var url = contextPath + '/' + 'scatola' + '/dettScatola';
	var request = {	"data" : {	"idScatola" : idScatolaSelected, "idTipoScatola" : idTipoScatola, "statoScatola":statoScatolaSelected}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			codiceScatolaSelected = result.data.codiceScatola;
			$("#codiceScatolaScarti").text(result.data.codiceScatola);
			var dataCreazioneStr = new Date(result.data.dataCreazione).toLocaleString();	
			$("#dataCreazioneScatolaScarti").text(dataCreazioneStr);
			
			$("#num_max_pratiche_scarti").text(numMaxPraticheSelected);
			$("#num_pratiche_scarti_ins").text(numPraticheInsSelected);
			
			var stato = null;
			if(result.data.statoScatola == SCATOLA_APERTA){
				stato = "APERTA";
				$("#btnCambioScatolaScarti").html("<i class='glyphicon glyphicon-folder-close'></i> Chiudi Scatola");
				$("#btnCambioScatolaScarti").attr("style","display:''");
				$("#btnCambioScatolaScarti").unbind();
				$("#btnCambioScatolaScarti").bind("click", function(){clickCambioStatoScatolaScarti(STATO_SCATOLA_CHIUSA);});
				$("#divPraticheScarti").attr("style","display:''");
				$("#btnInsScarti").attr("style","display:''");
			}else
			if(result.data.statoScatola == SCATOLA_CHIUSA){
				stato = "CHIUSA";
				$("#btnCambioScatolaScarti").html("<i class='glyphicon glyphicon-folder-open'></i> Apri Scatola");
				$("#btnCambioScatolaScarti").attr("style","display:''");
				$("#btnCambioScatolaScarti").unbind();
				$("#btnCambioScatolaScarti").bind("click", function(){clickCambioStatoScatolaScarti(STATO_SCATOLA_APERTA);});
				$("#divPraticheScarti").attr("style","display:none");
				$("#btnInsScarti").attr("style","display:none");
			}
			$("#statoScatolaScarti").text(stato);
			
			$("#idPAScatolaScarti").text(result.data.identificativoPA);
			$("#tipIstScatolaScarti").text(result.data.codiceTipoIstanza);
			$("#numPraticheScatolaScarti").text(result.data.numPraticheInserite);
			$("#percComplScatolaScarti").text(result.data.percCompletamento);
		
			var dataChiusuraStr = "";
			if(result.data.dataChiusura != null){
				dataChiusuraStr = new Date(result.data.dataChiusura).toLocaleString();	
			}				
			$("#dataChiusuraScatolaScarti").text(dataChiusuraStr);
			$("#centroDematScatolaScarti").text(result.data.localitaCentroDemat);
			$("#noteScatolaScarti").text(result.data.note);
			
			tablePraticheScatoleScarti.clear().draw();
			
			listPratiche = result.data.lstPratiche;
			listPraticheSelected = new Array();
			for(var i=0; i<listPratiche.length; i++){
				addPraticheObjAnm(listPratiche[i]);
			}			
			showLoaderLstDettScatolaScarti(false);			
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


function getPositionInListScarti(lst,idPratica){
	for(var i=0; i<lst.length; i++){
		if(lst[i].idPratica == idPratica){
			return i;
		}
	}
}

function setValuePraticheScartiInserite(val){
	var num_pratiche_ins = 0;
	if(val != null){
		num_pratiche_ins =parseInt($("#num_pratiche_scarti_ins").text());
		num_pratiche_ins += parseInt(val);
	}
	$("#num_pratiche_scarti_ins").text(num_pratiche_ins);
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

function showLblWarningDettScarti(message, show){
	$('#lblWarningDettScarti').attr("style",((show)?"display:''":"display:none"));
	$('#lblWarningDettScarti').text(message);
}

function addPraticaTableSelected(objThis,idPratica,progPacchetto){
	showLblWarningDettScarti('',false);
	var posIndex = getPositionInListScarti(listPratiche,idPratica);   
	var objPratica = listPratiche[posIndex];	
	
	if(objPratica.scatolaObj.statoScatola == STATO_SCATOLA_CHIUSA){
		showLblWarningDettScarti("ATTENZIONE! Scatola Chiusa, la pratica non può essere aggiunta!.",true);
		return;
	}
	//var numDocPacchetto = parseInt(objPratica.numDocPacchetto);
	var numPratInserite = parseInt($("#num_pratiche_scarti_ins").text());
	var numMaxPratiche = parseInt(numMaxPraticheSelected);
	
	//if(((numDocPacchetto+numPratInserite) > numMaxPratiche) || (numMaxPratiche == 0)){
	if((numPratInserite > numMaxPratiche) || (numMaxPratiche == 0)){
		showLblWarningDettScarti("ATTENZIONE! Numero di pratiche da inserire superiore al Num.Max.Pratiche.",true);
		return;
	}
	
	
	 var row = tablePraticheScatoleScarti.row( $(objThis).parents('tr') );
	 row.remove().draw();
	 
	
	listPraticheSelected.push(objPratica);
	listPratiche.splice(posIndex,1);
	
	
	var lastPos = listPraticheSelected.length -1;
	tablePraticheScatoleScarti_Selected.row.add( [	
		 objPratica.codicePacchetto,
		  objPratica.progrScatola,
	      objPratica.codiceRaccomandata,
	      objPratica.scatolaObj.codiceScatola,
	      getStatoSTR(objPratica.scatolaObj.statoScatola),
		  "<button class='glyphicon glyphicon-minus' title='Deseleziona Pacchetto' onclick=delPraticaTableSelected(this,"+idPratica+")></button>"
		  ] ).draw(false);
	
	//setValuePraticheScartiInserite(numDocPacchetto);
	setValuePraticheScartiInserite(1);
}


function addPraticheObjAnm(objPratica){
		
	tablePraticheScatoleScarti.row.add( [	
		  objPratica.codicePacchetto,
		  objPratica.progrScatola,
	      objPratica.codiceRaccomandata,
	      objPratica.scatolaObj.codiceScatola,
	      getStatoSTR(objPratica.scatolaObj.statoScatola),
	      "<button class='glyphicon glyphicon-plus' title='Seleziona Pratica' onclick=addPraticaTableSelected(this,"+objPratica.idPratica+")></button>"
	      
	 ] ).draw(false);
}

function delPraticaTableSelected(objThis,idPratica){
	var row = tablePraticheScatoleScarti_Selected.row( $(objThis).parents('tr') );
	row.remove().draw();
	 
	var posIndex = getPositionInListScarti(listPraticheSelected,idPratica);  
	var objPratica = listPraticheSelected[posIndex];
	//var numDocPacchetto = parseInt(objPratica.numDocPacchetto);
	listPratiche.push(objPratica);
	listPraticheSelected.splice(posIndex,1);
	
	var size = listPratiche.length -1;
	addPraticheObjAnm(objPratica,idPratica);
	//setValuePraticheScartiInserite(-numDocPacchetto);
	setValuePraticheScartiInserite(-1);
}


function addPraticheSelected(){
	if(listPraticheSelected.length == 0){
		showLblWarningDettScarti("ATTENZIONE! Nessuna pratica selezionata!",true);
		return;
	}
	/*var lstPratiche = [];
	for(var i=0; i<listPraticheSelected.length; i++){
		lstPratiche.push(listPraticheSelected[i].idPratica);		
	}*/
	var request = {
			"data" : {
				"idScatola" : idScatolaSelected,
				"codiceScatola":codiceScatolaSelected,
				"numPraticheIns": parseInt($("#num_pratiche_scarti_ins").text()),
				"listPratiche" : listPraticheSelected,
		   }};
		var url = contextPath + '/' + 'scatola' + '/addPraticheScarti';
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
						$("#dettScatolaScartiModal").modal('hide');					
						$('#div_success_alert').show();
						$('#success_msg').text(result.message);
						$("#distintaScatolaScartiModal").modal();
						findScatole();
					}else{
						showLblWarningDettScarti(result.message,true);			
					}				
				},
				error : function(xhr, status, error, result) {
					$("#dettScatolaScartiModal").modal('hide');	
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

