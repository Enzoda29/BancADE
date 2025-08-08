var table=null;
var tableMetadati = null;
var rimuoviArray =new Array();
var codiceScatolaSanabili=null;
var codiceScatolaNonSanabili=null;
var documentiScatolaSanabili=0;
var documentiScatolaNonSanabili=0;
var codicePicking=null;

var tot_anomalie = 0;

function disableButtonRecupera(){
	var v1 = $("#documentiSelezionatiSanabili").text();
	var v2 = $("#documentiSelezionatiNonSanabili").text();
	//v1+v2 = concat string
	if ((v1+v2) != 0) $("#recupera").attr("disabled", false);
	else $("#recupera").attr("disabled", true);
}

$(document).ready(function() {
	
	
	
//	if($('input[name="descprofilo"]').val()==="Supervisore"){
//		loadLstCentriDemat('centrodemat');		
//	}	

	table = $('#tableDocumentiAnomali').DataTable({
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : false,
			"searchable" : false,
			
			
		} ],
		"scrollX": true,
        "bFilter": false,
       
		"language": {
            "lengthMenu": "Mostra _MENU_ record per pagina",
            "zeroRecords": "Non sono stati trovati record",
            "info": "Mostra pagina _PAGE_ di _PAGES_",
            "infoEmpty": "",
            "infoFiltered": "(Filtrati da _MAX_ record totali)",
            "paginate": {
                "first":      "Primo",
                "last":       "Ultimo",
                "next":       "Prossimo",
                "previous":   "Precedente"
            }
        }
	
		
	});
	
	$("#findDocumentiAnomali").click(function() {
		waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'default'});
		findDocumentiAnomali();
	});
	$("#recupera").click(function() {
		var ndoc=$('#documentiSelezionatiSanabili').text()*1+$('#documentiSelezionatiNonSanabili').text()*1;
		if(confirm("Sono stati selezionati "+ndoc+" documenti per il recupero. Confermi l'operazione?")){
			rimuovi();

		}
	});

	findDocumentiAnomali();

});


function findDocumentiAnomali(){
//	console.log('findDocumentiAnomali start');
	var url = contextPath + '/'+'gestione'  + '/getDocumentiAnomali';
//	console.log('recuperoDocumentiAnomali : '+url);
	
	//var identificativoPAOpt = $('#identificativoPA').val();
	//var codiceTipoIstanzaOpt = $('#codiceTipoIstanza').val();
	//var identificativoPA = "";
	//var codiceTipoIstanza = "";
//	if($('input[name="descprofilo"]').val()==="Supervisore"){
//		var	idCentroDemat = $('[name="centrodemat"]').val();			
//	}else{
var	idCentroDemat = $('[name="centrodemat"]').val();
//	}
//	if (identificativoPAOpt!=""){
//		identificativoPA = $("#identificativoPA option:selected").text();
//	}
//	if (codiceTipoIstanzaOpt!=""){
//		codiceTipoIstanza = $("#codiceTipoIstanza option:selected").text();
//	}
		
	table.clear().draw(false);
	var requestDocumentiAnomali = { "data":{"idCentroDemat":idCentroDemat}};
	waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'default'});
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDocumentiAnomali),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				
				if(result.status){
					var lstDocumenti =result.data.listDocumento
					for(var i=0; i<lstDocumenti.length; i++){
						addDocumentiObj(lstDocumenti[i]);
						rimuoviArray[i]=new Array();
						rimuoviArray[i][0]=lstDocumenti[i].idScatola;
						rimuoviArray[i][3]=lstDocumenti[i].sanabili;
						rimuoviArray[i][4]=lstDocumenti[i].nonSanabili;
					}
					for (var i=0; i<rimuoviArray.length; i++) {
						rimuoviArray[i][1]=false;
						rimuoviArray[i][2]=false;
					}
					codiceScatolaSanabili=result.data.codiceScatolaSanabili;
					codiceScatolaNonSanabili=result.data.codiceScatolaNonSanabili;
					documentiScatolaSanabili=result.data.documentiScatolaSanabili;
					documentiScatolaNonSanabili=result.data.documentiScatolaNonSanabili;
					
					initViewValues();
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
				}
				waitingDialog.hide();				
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
				waitingDialog.hide();
			}
		});
	
}

function initViewValues(){
	$('#codiceScatolaSanabili').text(codiceScatolaSanabili);
	$('#codiceScatolaNonSanabili').text(codiceScatolaNonSanabili);
	$('#documentiScatolaSanabili').text(documentiScatolaSanabili);
	$('#documentiScatolaNonSanabili').text(documentiScatolaSanabili);
	$('#documentiSelezionatiSanabili').text(documentiScatolaSanabili);
	$('#documentiSelezionatiNonSanabili').text(documentiScatolaNonSanabili);
}
function addDocumentiObj(objDocumenti){
//	var button=null;
//	button = "<button class='glyphicon glyphicon-edit' title='Modifica Documenti anomali' onclick= \"loadingModalModifica('"+objDelivery.idDeliveryPa+
//				"','" + objDelivery.idServizioPa + "','" +
//				objDelivery.archivioCompresso+ "','" +objDelivery.delayExport+ "','" + objDelivery.formatoFileImmagine+ "','" +
//				objDelivery.formatoFileMetadati+ "','" +objDelivery.intervalloTemporaleInvio+ "','" + objDelivery.nomeArchivio+ "','" +
//				objDelivery.nomeFileImmagine+ "','" +objDelivery.nomeFileMetadati+ "','" +objDelivery.pathExpProd+ "','" + 
//				objDelivery.pathExpProd2+ "','" +objDelivery.pathLocal+ "','" +objDelivery.pathLocal2+ "','" +objDelivery.pathScarti+ "','" +
//				objDelivery.schedulazioneInvio+ "','" +
//				objDelivery.separatoreCampi+ "','" +objDelivery.tipologiaInvio+ "','"+ objDelivery.listMetadati.idDeliveryPAMetadati +
//				"')\"></button>";
	
	var sanabiliValue = objDocumenti.sanabili;
	var nonSanabiliValue = objDocumenti.nonSanabili;
	
	var checkBoxSanabili ='';
	var checkBoxNonSanabili ='';
	
	if(sanabiliValue == 0){
		checkBoxSanabili = "<input type='checkbox' id='"+objDocumenti.idScatola +"' disabled='true' >"
	}else{
		checkBoxSanabili = "<input type='checkbox' id='"+objDocumenti.idScatola +"' onclick='addRimuoviSan(\""+objDocumenti.idScatola +"\");'>"

	}
	
	if(nonSanabiliValue == 0){
		checkBoxNonSanabili = "<input type='checkbox' id='"+objDocumenti.idScatola +"'  disabled='true' >";
	}else{
		checkBoxNonSanabili = "<input type='checkbox' id='"+objDocumenti.idScatola +"'  onclick='addRimuoviNonSan(\""+objDocumenti.idScatola +"\");'>";

	}
	
	
	table.row.add( [ 
		 // checkVar(objDocumenti.codiceScatolaGme),
		  checkVar(objDocumenti.codiceScatolaGme),
	      checkVar(objDocumenti.codiceScatola+" - "+objDocumenti.codiceScatolaGme),
	      checkVar(objDocumenti.aggregato),
	      checkVar(objDocumenti.sanabili),
	      checkBoxSanabili,
	      checkVar(objDocumenti.nonSanabili),
	      checkBoxNonSanabili
//	      button
	 ] ).draw(false);

}

//function openModalAggiungi(){

//	$("#tipo").val("ADD");
//    
//	$("#archivioCompressoModal").val("");
//    $("#delayExportModal").val("");
//    $("#formatoFileImmagineModal").val("");
//    $("#formatoFileMetadatiModal").val("");
//    $("#intervalloTemporaleInvioModal").val("");
//    $("#nomeArchivioModal").val("");
//    $("#nomeFileImmagineModal").val("");
//    $("#nomeFileMetadatiModal").val("");
//
//	$("#pathExpProdModal").val("");
//    $("#pathExpProd2Modal").val("");
//    $("#pathLocalModal").val("");
//    $("#pathLocal2Modal").val("");
//    $("#pathScartiModal").val("");
//    $("#schedulazioneInvioModal").val("");
//    $("#separatoreCampiModal").val("");
//    $("#tipologiaInvioModal").val("");
//    
//    
//	$("#configurazioneDeliveryPAModal").modal({backdrop: 'static', keyboard: false});
//	$("#configurazioneDeliveryPAModal").modal('show');
//	tableMetadatiAdd.clear().draw(false); 
//}

//function openModalModifica(idDeliveryPa,archivioCompresso,delayExport,formatoFileImmagine,formatoFileMetadati,
//		intervalloTemporaleInvio,nomeArchivio,nomeFileImmagine,nomeFileMetadati,
//		pathExpProd,pathExpProd2,pathLocal,pathLocal2,pathScarti,schedulazioneInvio,
//		separatoreCampi,tipologiaInvio){	
//	$("#tipo").val("MOD");
//	
//	$("#idDeliveryPa").val(checkVar(idDeliveryPa));
//	$("#archivioCompressoModalMod").val(checkVar(archivioCompresso));
//    $("#delayExportModalMod").val(checkVar(delayExport));
//    $("#formatoFileImmagineModalMod").val(checkVar(formatoFileImmagine));
//    $("#formatoFileMetadatiModalMod").val(checkVar(formatoFileMetadati));
//    $("#intervalloTemporaleInvioModalMod").val(checkVar(intervalloTemporaleInvio));
//    $("#nomeArchivioModalMod").val(checkVar(nomeArchivio));
//    $("#nomeFileImmagineModalMod").val(checkVar(nomeFileImmagine));
//    $("#nomeFileMetadatiModalMod").val(checkVar(nomeFileMetadati));
//
//	$("#pathExpProdModalMod").val(checkVar(pathExpProd));
//    $("#pathExpProd2ModalMod").val(checkVar(pathExpProd2));
//    $("#pathLocalModalMod").val(checkVar(pathLocal));
//    $("#pathLocal2ModalMod").val(checkVar(pathLocal2));
//    $("#pathScartiModalMod").val(checkVar(pathScarti));
//    $("#schedulazioneInvioModalMod").val(checkVar(schedulazioneInvio));
//    $("#separatoreCampiModalMod").val(checkVar(separatoreCampi));
//    $("#tipologiaInvioModalMod").val(checkVar(tipologiaInvio));
//
//    $("#configurazioneDeliveryPA_ModificaModal").modal({backdrop: 'static', keyboard: false});
//	$("#configurazioneDeliveryPA_ModificaModal").modal('show');
//}

function checkVar(variabile){
	if (typeof(variabile) === 'undefined' || variabile === null || variabile === 'null')
	{
	    return "";
	}
	else
		return variabile;
}

function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}
function addRimuoviSan(idScatola){
	
	for(var i=0; i<rimuoviArray.length; i++){
		if(rimuoviArray[i][0]==idScatola){
			rimuoviArray[i][1]=!rimuoviArray[i][1];
			if(rimuoviArray[i][1]){
				documentiScatolaSanabili=documentiScatolaSanabili+rimuoviArray[i][3];
				$('#documentiSelezionatiSanabili').text(documentiScatolaSanabili);
				tot_anomalie = tot_anomalie + documentiScatolaSanabili;
			}else{
				documentiScatolaSanabili=documentiScatolaSanabili-rimuoviArray[i][3];
				$('#documentiSelezionatiSanabili').text(documentiScatolaSanabili);
				tot_anomalie = tot_anomalie - documentiScatolaSanabili;
			}
			break;
		}
	}
	disableButtonRecupera();
}
function addRimuoviNonSan(idScatola){
//	$("#recupera").attr("disabled", false);
	for(var i=0; i<rimuoviArray.length; i++){
		if(rimuoviArray[i][0]==idScatola){
			rimuoviArray[i][2]=!rimuoviArray[i][2];
			if(rimuoviArray[i][2]){
				documentiScatolaNonSanabili=documentiScatolaNonSanabili+rimuoviArray[i][4];
				$('#documentiSelezionatiNonSanabili').text(documentiScatolaNonSanabili);
				tot_anomalie = tot_anomalie - documentiScatolaNonSanabili;
			}else{
				documentiScatolaNonSanabili=documentiScatolaNonSanabili-rimuoviArray[i][4];
				$('#documentiSelezionatiNonSanabili').text(documentiScatolaNonSanabili);
				tot_anomalie = tot_anomalie + documentiScatolaNonSanabili;
			}
			break;
		}
	}
	disableButtonRecupera();
}

function rimuovi(){
	console.log('recupera i documenti dalle scatole start');

	$("#recupera").attr("disabled", true);
	
	var url = contextPath + '/'+'gestione'  + '/recuperaDocumentiScatole';
	console.log('rimuoviDocumentiAnomali : '+url);

	var visu='{"data":{"listaRecupero":[';
	for(var i=0; i<rimuoviArray.length; i++){
		visu=visu+ '{"scatolaId": "'+rimuoviArray[i][0]+'","flagRimuoviSanabili":'+rimuoviArray[i][1]+',"flagRimuoviNonSanabili":'
		+	rimuoviArray[i][2]+'}';
		if(i<rimuoviArray.length-1){
			visu=visu+',';
		}
		
	}
	visu=visu+' ]}}'
	
	requestDocumentiAnomali=JSON.parse(visu);
	
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDocumentiAnomali),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);
				
				if(result.status){
					codicePicking=result.data;
					$("#stampaDistintaPerIlRecupero").modal({backdrop: 'static', keyboard: false});
					$("#stampaDistintaPerIlRecupero").modal('show');
					aggiornaPicking(codicePicking);
//					findDocumentiAnomali();
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
				}
				$("#recupera").attr("disabled", false);			
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
				$("#recupera").attr("disabled", false);	
			}
		});
	
}
