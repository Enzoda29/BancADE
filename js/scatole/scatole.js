var tableScatole = null;
var idScatolaSelected = null;
var idCentroDematUser = $('input[name="centrodemat"]').val(); //TODO estrarre il centro dall'utente loggato
var operatore = $('input[name="user"]').val(); //TODO estrarre dall'utente loggato
var idPostazione = $('input[name="postazione"]').val(); //TODO estrarre dall'utente loggato
var codiceScatolaSelected = null;
var identificativoPaScatolaSelected = null;
var codiceIstanzaPaScatolaSelected = null;
var descrizioneScatolaSelected = null;
var numMaxPraticheSelected = null;
var numPraticheInsSelected = null;
var statoScatolaSelected = null;
$(document).ready(function() {
	loadLstIdentificativoPA("identificativoPASearch",idTipoScatola);
	loadLstTipIstanza("codiceTipoIstanzaSearch",idTipoScatola);
	
	/*tableScatole = $('#tableScatole').DataTable({
		 dom: 'Bfrtip',
		 buttons: [
		       {
	                extend:    'csvHtml5',
	                text:      '<i class="fa fa-file-text-o"></i> CSV',
	                titleAttr: 'CSV'
	            },
	            {
	                extend:    'excelHtml5',
	                text:      '<i class="fa fa-file-excel-o"></i> EXCEL',
	                titleAttr: 'Excel'
	            }
	        ],
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : false,
			"searchable" : false
		}],
		"columnDefs" : [ {
			"targets" : -1,			
			"sortable" : false
		} ],
		select: {
            style: 'single',
            selector: 'td:not(:last-child)'
        },
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
		
	});*/
	
	$('#tableScatola').on( 'click-cell.bs.table', function (field, value, row, $element) {
		 console.log("tableScatole:dblclick:");
		 
		 if(row.indexOf('<button') != -1)
			 return;
			
	      idScatolaSelected = $element.id_scatola;
	      statoScatolaSelected = $element.stato_scatola;
	      codiceScatolaSelected = $element.codice_scatola;        
	      numMaxPraticheSelected = $element.num_max_pratiche;
	      numPraticheInsSelected = $element.num_pratiche_inserite;	      
       
       
	       /*if((idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE) && (statoScatolaSelected == STATO_SCATOLA_APERTA)){
	       	$("#dettScatolaAnomalieModal").modal();	
	       }else*/
	       if((idTipoScatola == ID_TIPO_SCATOLA_SCARTI) && (statoScatolaSelected == STATO_SCATOLA_APERTA)){
	       	$("#dettScatolaScartiModal").modal();	
	       }else{
	       	$("#dettaglioScatolaModal").modal();
	       }
	});
	
/*
	$('#tableScatola').on( 'click-row.bs.table', function (row, $element, field ) {
	
		 console.log("tableScatole:dblclick:"+$element.idScatola);
//        var rowData = tableScatole.rows( indexes ).data();
//        idScatolaSelected = rowData[0][0];
//        statoScatolaSelected = rowData[0][1];
//        codiceScatolaSelected = rowData[0][2];        
//        numMaxPraticheSelected = rowData[0][7];
//        numPraticheInsSelected = rowData[0][8];
		
		
	      idScatolaSelected = $element.id_scatola;
	      statoScatolaSelected = $element.stato_scatola;
	      codiceScatolaSelected = $element.codice_scatola;        
	      numMaxPraticheSelected = $element.num_max_pratiche;
	      numPraticheInsSelected = $element.num_pratiche_inserite;	      
        
        
        //if((idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE) && (statoScatolaSelected == STATO_SCATOLA_APERTA)){
        //	$("#dettScatolaAnomalieModal").modal();	
        //}else
        if((idTipoScatola == ID_TIPO_SCATOLA_SCARTI) && (statoScatolaSelected == STATO_SCATOLA_APERTA)){
        	$("#dettScatolaScartiModal").modal();	
        }else{
        	$("#dettaglioScatolaModal").modal();
        }
        
        
    });*/
    /*.on( 'deselect', function ( e, dt, type, indexes ) {
        idScatolaSelected = null;
        statoScatolaSelected = null;
        codiceScatolaSelected = null;
        numMaxPraticheSelected = null;
        numPraticheInsSelected = null;
        console.log("IdScatola_unselected:"+idScatolaSelected);
    });*/
	$('#divDataAccDA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataAccA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCarDA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataCarA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	
	$("#findScatole").click(function() {
		findScatole();
	});

	$("#creaCodScatola").click(function() { //al momento non usato
		creaCodScatola();
	});

	$("#apriScatola").click(function() {
		creaCodScatola();
		//$("#apriScatolaModal").modal({backdrop: 'static', keyboard: false});
	});
	
	$("#btnAccettazioneSospesi").click(function() {
		$('#accettaScatolaSospesiModal').modal({backdrop: 'static', keyboard: false});
	});
	
	$("#btnAddPacchetto").click(function(){
		idScatolaSelected = null;
		codiceScatolaSelected = null;
		numMaxPraticheSelected = 0;
		numPraticheInsSelected = 0;
		$("#addPacchettoModal").modal({backdrop: 'static', keyboard: false});
	});
        
	
	$("#btnAddPraticheAnomalie").click(function(){
		$("#addPraticheAnomalieModal").modal({backdrop: 'static', keyboard: false});
	});
	

//    tableScatole.columns([0]).visible( false );
//    tableScatole.columns([1]).visible( false );
	
	
	$("#esportaCSV").click(function() {
    	console.log('esportaCSV');    
    	var queryString = '';
    	
    	var tipoScatolaSearchSOS_ANP = $('#tipoScatolaSearchSOS_ANP').val();
		var idTipoScatolaSearch = idTipoScatola;
		if(tipoScatolaSearchSOS_ANP != undefined){
			idTipoScatolaSearch = tipoScatolaSearchSOS_ANP;
		}
    	
    	var identificativoPASearch = $('#identificativoPASearch').val();
    	var codiceTipoIstanzaSearch = $('#codiceTipoIstanzaSearch').val();
    	var codiceRaccomandataSearch = $('#codiceRaccomandataSearch').val();
    	var dataAccettazioneDaSearch = $('#dataAccettazioneDaSearch').val();
    	dataAccettazioneDaSearch = dataAccettazioneDaSearch.replaceAll("/","-");
    	var dataAccettazioneASearch = $('#dataAccettazioneASearch').val();
    	dataAccettazioneASearch = dataAccettazioneASearch.replaceAll("/","-");
    	var dataCaricamentoDaSearch = $('#dataCaricamentoDaSearch').val();
    	dataCaricamentoDaSearch = dataCaricamentoDaSearch.replaceAll("/","-"); 
    	var dataCaricamentoASearch = $('#dataCaricamentoASearch').val();
    	dataCaricamentoASearch = dataCaricamentoASearch.replaceAll("/","-");
    	var statoSearch = $('#statoSearch').val();
    	//var ggSlaSearch = $('#ggSlaSearch').val();
    	var codiceScatolaSearch = $('#codiceScatolaSearch').val();
    	var codicePacchettoSearch = $('#codicePacchettoSearch').val();
    	
    	codicePacchettoSearch = ((codicePacchettoSearch == undefined)?'':codicePacchettoSearch);
    	codiceTipoIstanzaSearch = ((codiceTipoIstanzaSearch == undefined)?'':codiceTipoIstanzaSearch);		
		identificativoPASearch = ((identificativoPASearch == undefined)?'':identificativoPASearch);   
    	
        queryString+= (idTipoScatolaSearch == '')?'': "idTipoScatola="+idTipoScatolaSearch;
        queryString+= (dataAccettazioneDaSearch == '')?'':"&dataDa="+dataAccettazioneDaSearch;
        queryString+= (dataAccettazioneASearch == '')?'':"&dataA="+dataAccettazioneASearch;
        queryString+= (dataCaricamentoDaSearch == '')?'':"&dataDa1="+dataCaricamentoDaSearch;
        queryString+= (dataCaricamentoASearch == '')?'':"&dataA1="+dataCaricamentoASearch;
        queryString+= (statoSearch == '')?'': "&stato="+statoSearch;
        queryString+= (codiceScatolaSearch == '')?'':"&codiceScatola="+codiceScatolaSearch;
        queryString+= (codicePacchettoSearch == '')?'':"&codicePacchetto="+codicePacchettoSearch;
        queryString+= (codiceRaccomandataSearch == '')?'':"&codiceRaccomandata="+codiceRaccomandataSearch;
        queryString+= (identificativoPASearch == '')?'':"&idAnagrPA="+identificativoPASearch;
        queryString+= (codiceTipoIstanzaSearch == '')?'':"&idIstanza="+codiceTipoIstanzaSearch;

		  queryString+= '&typeExport=GESTIONE_SCATOLE';
		  console.log(queryString);
		  document.location.href = contextPath+ "/download/csv?"+queryString;
    });
	
});

String.prototype.replaceAll = function(target, replacement) {
	  return this.split(target).join(replacement);
	};
	
function creaCodScatola(){
	var url = contextPath + '/' + 'scatola' + '/creaCodScatola';
	var requestCrea = {"data" : { "idTipoScatola" : idTipoScatola}};
	
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestCrea),
		success : function(result) {
			console.log('success! ', result);
			if(result.status){
				idScatolaSelected = result.data.idScatola;
				codiceScatolaSelected = result.data.codiceScatola;
				$("#codScatola").val(codiceScatolaSelected);
				$("#apriScatolaModal").modal({backdrop: 'static', keyboard: false});
				
				//al momento non usato
				/*var idScatola = result.data.idScatola;
				var codiceScatola = result.data.codiceScatola;				
				$("#creaCodScatolaModal").modal(); 
				$("#codice_scatola").val(codiceScatola);
				$("#codice_scatolaPrint").text(codiceScatola);
				*/
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
		}
	});
}	

function printBarCodeScatola(codScatola,identificativoPa,codiceTipoIstanza,descrizioneScatola){
	identificativoPaScatolaSelected = identificativoPa;
	codiceIstanzaPaScatolaSelected = codiceTipoIstanza;
	descrizioneScatolaSelected = descrizioneScatola;
	codiceScatolaSelected = codScatola;
	$("#printCodScatolaModal").modal({backdrop: 'static', keyboard: false});
}

function findScatole(){
	//waitingDialog.show();
	
	console.log('findScatole start');

	
	var identificativoPASearch = $('#identificativoPASearch').val();
	var codiceTipoIstanzaSearch = $('#codiceTipoIstanzaSearch').val();
	var codiceRaccomandataSearch = $('#codiceRaccomandataSearch').val();
	var dataAccettazioneDaSearch = $('#dataAccettazioneDaSearch').val();
	dataAccettazioneDaSearch = dataAccettazioneDaSearch.replaceAll("/","-");
	var dataAccettazioneASearch = $('#dataAccettazioneASearch').val();
	dataAccettazioneASearch = dataAccettazioneASearch.replaceAll("/","-");
	var dataCaricamentoDaSearch = $('#dataCaricamentoDaSearch').val();
	dataCaricamentoDaSearch = dataCaricamentoDaSearch.replaceAll("/","-"); 
	var dataCaricamentoASearch = $('#dataCaricamentoASearch').val();
	dataCaricamentoASearch = dataCaricamentoASearch.replaceAll("/","-");
	var statoSearch = $('#statoSearch').val();
	//var ggSlaSearch = $('#ggSlaSearch').val();
	var codiceScatolaSearch = $('#codiceScatolaSearch').val();
	var codicePacchettoSearch = $('#codicePacchettoSearch').val();
	
	console.log('identificativoPASearch:',identificativoPASearch, 'codiceTipoIstanzaSearch:',codiceTipoIstanzaSearch,
			'codiceRaccomandataSearch:',codiceRaccomandataSearch,'dataAccettazioneDaSearch:',dataAccettazioneDaSearch,
			'dataAccettazioneASearch:',dataAccettazioneASearch,'dataCaricamentoDaSearch:',dataCaricamentoDaSearch,
			'dataCaricamentoASearch:',dataCaricamentoASearch,'statoSearch:',statoSearch,
			'codiceScatolaSearch:',codiceScatolaSearch,'codicePacchettoSearch:'+codicePacchettoSearch);
	
	var checkRaccomandata = checkCodiceRaccomandataScatola(codiceRaccomandataSearch);
	if (!checkRaccomandata.status) {
		$('#danger_msg').text(checkRaccomandata.description);
		$('#div_error_alert').show();
	} else {
		
		console.log('checkRaccomandata:'+checkRaccomandata.status);
		
		var tipoScatolaSearchSOS_ANP = $('#tipoScatolaSearchSOS_ANP').val();
		var idTipoScatolaSearch = idTipoScatola;
		if(tipoScatolaSearchSOS_ANP != undefined){
			idTipoScatolaSearch = tipoScatolaSearchSOS_ANP;
		}
		
		var uri = contextPath + "/scatola/dataTableGestioneScatole.json?idTipoScatola="+idTipoScatolaSearch
		+"&statoScatola="+statoSearch
		+"&dataCaricamentoDa="+dataCaricamentoDaSearch
		+"&dataCaricamentoA="+dataCaricamentoASearch
		+"&dataAccettazioneDa="+dataAccettazioneDaSearch
		+"&dataAccettazioneA="+dataAccettazioneASearch
		+"&codicePacchetto="+((codicePacchettoSearch == undefined)?'':codicePacchettoSearch)
		+"&codiceScatola="+codiceScatolaSearch
		+"&idIstanza="+((codiceTipoIstanzaSearch == undefined)?'':codiceTipoIstanzaSearch)		
		+"&identificativoPA="+((identificativoPASearch == undefined)?'':identificativoPASearch)   
		+"&codiceRaccomandata="+codiceRaccomandataSearch;
     						
		
		
		$('#tableScatola').bootstrapTable('selectPage', 1);
		$('#tableScatola').bootstrapTable('refresh', {
			url: uri
		});	
		
		/*var requestScatole = { "data":{"codiceRaccomandata": codiceRaccomandataSearch,"idAnagrPA":identificativoPASearch,"codiceScatola":codiceScatolaSearch,"codicePacchetto":codicePacchettoSearch,//"sla_gg":ggSlaSearch,
									 "dataAccettazioneDa":dataAccettazioneDaSearch,"dataAccettazioneA":dataAccettazioneASearch,"dataCaricamentoDa":dataCaricamentoDaSearch,
									 "dataCaricamentoA":dataCaricamentoASearch, "idIstanza":codiceTipoIstanzaSearch,
									 "statoScatola":statoSearch,"idTipoScatola":idTipoScatolaSearch }};
		var url = contextPath + '/' + 'scatola' + '/findScatole';
		console.log('findScatole '+url);
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestScatole),
			success : function(result) {
				waitingDialog.hide();
				console.log('success! ', result);				
				if(result.status){
					console.log('success! ', result.data.listScatole);
					var listScatole =result.data.listScatole;
					tableScatole.clear();
					tableScatole.draw();
					for(var i=0; i<listScatole.length; i++){
						addScatoleObj(listScatole[i]);
					}
                   tableScatole.columns([0]).visible( false );
                   tableScatole.columns([1]).visible( false );
                                        
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
		});*/
	}

};

function cambiaStatoScatola(idScatola, statoScatola){
	
	var strStato = "";
	if(statoScatola == STATO_SCATOLA_APERTA){
		strStato = "Aprire";
	}		
	else
	if(statoScatola == STATO_SCATOLA_CHIUSA){
		strStato = "Chiudere";
	}else
	if(statoScatola == STATO_SCATOLA_IN_ARCHIVIAZIONE){
		strStato = "inviare In archiviazione";
	}
			
	if(!confirm("Sei sicuro di voler "+strStato+" la SCATOLA?")){
		return;
	}
	//waitingDialog.show();
	var request = {
			"data" : {
				"idScatola" : idScatola,
				"statoScatola": statoScatola,
				"operatore":operatore,
				"idPostazione":idPostazione,
				"idTipoScatola": idTipoScatola
		   }};
	console.log(JSON.stringify(request));
	var url = contextPath + '/' + 'scatola' + '/cambioStatoScatola';
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			//waitingDialog.hide();
			console.log('success! ', result);
			
			if(result.status){
				$('#div_success_alert').show();
				$('#success_msg').text(result.message);
				findScatole();
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
}

/*
function addScatoleObj(objPratica){
	
	var oldDataInsPraticaFormatStr = null;
	if(objPratica.oldDataInserimentoPratica != null){
		var oldDataInsPraticaFormat = new Date(objPratica.oldDataInserimentoPratica);
		oldDataInsPraticaFormatStr = oldDataInsPraticaFormat.toLocaleString();
	}
	
	var oldDataAccettazioneRaccomandataStr = null;
	if(objPratica.oldDataAccettazioneRaccomandata != null){
		var oldDataAccettazioneRaccomandata = new Date(objPratica.oldDataAccettazioneRaccomandata);
		oldDataAccettazioneRaccomandataStr = oldDataAccettazioneRaccomandata.toLocaleString()
	}
	
	var dataCreazioneStr = new Date(objPratica.dataCreazione).toLocaleString();	
	
	var buttons = null;

		if(objPratica.statoScatola == SCATOLA_CHIUSA){
			buttons = "<button class='glyphicon glyphicon-folder-open' title='Apri Scatola' onclick=cambiaStatoScatola('"+objPratica.idScatola+"','"+STATO_SCATOLA_APERTA+"')></button>";
			buttons += " <button class='glyphicon glyphicon-print' title='Stampa Barcode Scatola' onclick=printBarCodeScatola('"+objPratica.codiceScatola+"')></button>";
			if(idTipoScatola == ID_TIPO_SCATOLA_ANP){
				buttons += " <button class='glyphicon glyphicon-list-alt'style='margin-top:10px'  title='Stampa distinta' onclick=openModalDistinta('"+objPratica.idScatola+"')></button>";	
			}
		}else
		if(objPratica.statoScatola == SCATOLA_APERTA){		
			buttons = "<button class='glyphicon glyphicon-folder-close' title='Chiudi Scatola' onclick=cambiaStatoScatola('"+objPratica.idScatola+"','"+STATO_SCATOLA_CHIUSA+"')></button>";
			buttons += " <button class='glyphicon glyphicon-print' title='Stampa Barcode Scatola' onclick=printBarCodeScatola('"+objPratica.codiceScatola+"')></button>";
			if(idTipoScatola == ID_TIPO_SCATOLA){
				buttons += " <button class='glyphicon glyphicon-inbox' style='margin-top:10px' title='Aggiungi Pacchetto' onclick=openModalAddPacchetto('"+objPratica.idScatola+"','"+objPratica.codiceScatola+"','"+objPratica.numMaxPratiche+"','"+objPratica.numPraticheInserite+"')></button>";	
			}		
			if(idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE){
				buttons += " <button class='glyphicon glyphicon-inbox' style='margin-top:10px' title='Aggiungi Pratiche' onclick=openModalAddPraticheAnomalie('"+objPratica.idScatola+"','"+objPratica.codiceScatola+"','"+objPratica.numMaxPratiche+"','"+objPratica.numPraticheInserite+"','"+objPratica.statoScatola+"')></button>";	
			}	
		}else		
		if(objPratica.statoScatola == STATO_SCATOLA_PRONTA_PER_ARCHIVIAZIONE){
			buttons = " <button class='glyphicon glyphicon-hdd' title='Invia In Archiviazione' onclick=cambiaStatoScatola('"+objPratica.idScatola+"','"+STATO_SCATOLA_IN_ARCHIVIAZIONE+"')></button>";
		}

	
	if((idTipoScatola == ID_TIPO_SCATOLA) || (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE) || (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)){
		tableScatole.row.add( [
                        objPratica.idScatola,
                        objPratica.statoScatola,
		      objPratica.codiceScatola,
		      dataCreazioneStr,
		      objPratica.statoScatolaDesc,
		      objPratica.identificativoPA,
		      objPratica.codiceTipoIstanza,
		      objPratica.numMaxPratiche,
		      objPratica.numPraticheInserite,
//		      objPratica.percCompletamento,
//		      objPratica.numGGResidui,
		      oldDataInsPraticaFormatStr,
		      oldDataAccettazioneRaccomandataStr,
		      buttons
		 ] ).draw(false);
	}else
	if((idTipoScatola == ID_TIPO_SCATOLA_SOSPESI) || (idTipoScatola == ID_TIPO_SCATOLA_ANP)){
		tableScatole.row.add( [
                    objPratica.idScatola,
                    objPratica.statoScatola,
		      objPratica.codiceScatola,
		      dataCreazioneStr,
		      objPratica.statoScatolaDesc,
		      objPratica.numMaxPratiche,
		      objPratica.numPraticheInserite,
//		      objPratica.percCompletamento,
		      oldDataInsPraticaFormatStr,
		      oldDataAccettazioneRaccomandataStr,
		      buttons
		 ] ).draw(false);
	}
}
*/



function openModalDistinta(idScatola){
	idScatolaSelected = idScatola;
	
	$("#distintaScatolaModal").modal();
}


function openModalAddPacchetto(idScatola,codiceScatola,numMaxPratiche,numPraticheInserite){
	idScatolaSelected = idScatola;
	codiceScatolaSelected = codiceScatola;
	numMaxPraticheSelected = numMaxPratiche;
	numPraticheInsSelected = numPraticheInserite;
	$("#addPacchettoModal").modal({backdrop: 'static', keyboard: false});
}

function openModalAddPraticheAnomalie(idScatola,codiceScatola,numMaxPratiche,numPraticheInserite,statoScatola){
	idScatolaSelected = idScatola;
	codiceScatolaSelected = codiceScatola;
	numMaxPraticheSelected = numMaxPratiche;
	numPraticheInsSelected = numPraticheInserite;
	statoScatolaSelected = statoScatola;
	$("#dettScatolaAnomalieModal").modal({backdrop: 'static', keyboard: false});
}

function timeStamp(data) {
	// Create a date object with the current time

	//  var now = new Date();
	  var now = new Date(data * 1000);
	// Create an array with the current month, day and time
	  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
	// Create an array with the current hour, minute and second

	  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
	// Determine AM or PM suffix based on the hour

	  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
	// Convert hour from military time

	  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
	// If hour is 0, set it to 12

	  time[0] = time[0] || 12;
	// If seconds and minutes are less than 10, add a zero
	  for ( var i = 1; i < 3; i++ ) {

	    if ( time[i] < 10 ) {

	      time[i] = "0" + time[i];

	    }

	  }
	// Return the formatted string

	  return date.join("/") + " " + time.join(":") + " " + suffix;
//	  return date.join("/") + " " + time.join(":") ;

	}


function checkCodiceRaccomandataScatola(codice_raccomandata) {
	var checkResponse = new Object();
	checkResponse.status = true;
	checkResponse.description = '';
	
	if (codice_raccomandata != '') {
		if(!$.isNumeric(codice_raccomandata)){
			checkResponse.status = false;
			checkResponse.description = 'Il codice raccomandata deve essere numerico'; 
		}
	}
	return checkResponse;
}


