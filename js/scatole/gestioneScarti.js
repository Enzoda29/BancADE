var spinner;
var spinning = false;
var target = null;
var lstSelectedItem = null;
function toggleSpin(){
    spinning ? spinner.stop() : spinner = new Spinner(opts).spin(target);  
    spinning = !spinning;
}

$(document).ready(function() {
	lstSelectedItem = new Array();
//	loadLstIdentificativoPA_Spedizione("identificativoPASearch");
//	loadLstTipIstanza_Spedizione("codiceTipoIstanzaSearch");
	loadLstIdentificativoPA("identificativoPASearch",0);
	loadLstTipIstanza("codiceTipoIstanzaSearch",0);
	target =document.getElementById('spinnerContainer');	
	
	$("#findScarti").click(function(e) {
		find();	
		
	});	
	
	$('#divDataAccDA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	$('#divDataAccA').datetimepicker({
		locale : 'it',
		format: 'DD/MM/YYYY'
	});
	
	$("#btnRecuperaScarti").click(function(){
		$("#distintaRecuperaScartiModal").modal({backdrop: 'static', keyboard: false});
	});
	
	$("#btnAccettazioneScarti").click(function(){
		$("#accettazioneScartiModal").modal({backdrop: 'static', keyboard: false});
	});
	
	$("#checkAll").click(function(){
		var items = $('input[name="check_select_item"]');
		for(var i=0; i<items.length; i++){
			items[i].click();
		}
	})
	
});


function loadLstTipIstanza_Spedizione(idObj) {
	//showLoaderLst(true,"Attendere!Caricamento lista Tipo Istanza in corso...");
	var url = contextPath + '/' + 'ricerche' + '/loadListTipologiaIstanzaPA_Spedizione';
	var request = {"data" : { }};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			
			console.log('success! ', result.data.listIstanza);
			var lst = result.data.listIstanza;
			$("#"+idObj).find('option').remove();
			$("#"+idObj).append("<option value=''>- Seleziona -</option>");
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
				$("#"+idObj).append(
						"<option value=" + obj.idIstanza + ">"
								+ obj.codiceTipoIstanza + "</option>");
			}
			//showLoaderLst(false,'');
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(error);
		}
	});
}

function loadLstIdentificativoPA_Spedizione(idObj) {
	//showLoaderLst(true,"Attendere!Caricamento lista Identificativo PA in corso...");
	var url = contextPath + '/' + 'ricerche' + '/loadListIdentificativoPA_Spedizione';
	var request = {"data" : { }};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			
			console.log('success! ', result.data.listIdPA);
			var lst = result.data.listIdPA;
			$("#"+idObj).find('option').remove();
			$("#"+idObj).append("<option value=''>- Seleziona -</option>");
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
				$("#"+idObj).append(
						"<option value=" + obj.idAnagr + ">"
								+ obj.identificativoPA + "</option>");
			}
			//showLoaderLst(false,'');
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(error);
		}
	});
}

function find(){
	lstSelectedItem = new Array();
	var centroDemat = $('input[name="centrodemat"]').val(); 
	var idPostazione = $('input[name="postazione"]').val(); 
	
	console.log('findScarti start');
	var identificativoPASearch = $('#identificativoPASearch').val();
	var codiceTipoIstanzaSearch = $('#codiceTipoIstanzaSearch').val();
	var codiceRaccomandataSearch = $('#codiceRaccomandataSearch').val();		
	var dataAccettazioneDaSearch = $("#dataAccettazioneDaSearch").val();
	var dataAccettazioneASearch = $("#dataAccettazioneASearch").val();
	var codiceScatolaSearch = $('#codiceScatolaSearch').val();
	var codicePacchettoSearch = $('#codicePacchettoSearch').val();
	var uri = contextPath
			+ "/scatola/dataTableGestScarti.json?identificativoPASearch="+ identificativoPASearch
			+ "&codiceTipoIstanzaSearch=" + codiceTipoIstanzaSearch
			+ "&codiceRaccomandataSearch=" + codiceRaccomandataSearch
			+ "&codiceScatolaSearch=" + codiceScatolaSearch
			+ "&codicePacchettoSearch=" + codicePacchettoSearch
			+ "&dataAccettazioneDaSearch=" + dataAccettazioneDaSearch
			+ "&dataAccettazioneASearch=" + dataAccettazioneASearch
			+ "&centroDemat=" + centroDemat
			+ "&idPostazione=" + idPostazione;

	console.log('URI.. -> '+uri);
		
	$('#tableGestioneScarti').bootstrapTable('refresh', {
	    url: uri
	});	
}



function selectItem(obj,item){
	
	if(obj.checked){
		lstSelectedItem.push(item);
		console.log("push:"+item);
	}else{
		for(var i=0; i<lstSelectedItem.length; i++){
			if(lstSelectedItem[i].codiceRaccomandata == item.codiceRaccomandata){
				console.log("slice:"+item);
				lstSelectedItem.splice(i,1);
				break;
			}			
		}

		
	}
	console.log(lstSelectedItem);
}



