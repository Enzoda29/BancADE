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
	loadLstIdentificativoPA("identificativoPASearch",4);
	loadLstTipIstanza("codiceTipoIstanzaSearch",4);
	target =document.getElementById('spinnerContainer');	
	
	$("#findAnomalie").click(function(e) {
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
	
	$("#btnRecuperaAnomalie").click(function(){
		$("#distintaRecuperaAnomalieModal").modal({backdrop: 'static', keyboard: false});
	});
	
	$("#btnAccettazioneAnomalie").click(function(){
		$("#accettazioneAnomalieModal").modal({backdrop: 'static', keyboard: false});
	});
	
	$("#checkAll").click(function(){
		var items = $('input[name="check_select_item"]');
		for(var i=0; i<items.length; i++){
			items[i].click();
		}
	})
	
});

function find(){	
	lstSelectedItem = new Array();
	var centroDemat = $('input[name="centrodemat"]').val(); 
	var idPostazione = $('input[name="postazione"]').val(); 
	
	console.log('findAnomalie start');
	var identificativoPASearch = $('#identificativoPASearch').val();
	var codiceTipoIstanzaSearch = $('#codiceTipoIstanzaSearch').val();
	var codiceRaccomandataSearch = $('#codiceRaccomandataSearch').val();		
	var dataAccettazioneDaSearch = $("#dataAccettazioneDaSearch").val();
	var dataAccettazioneASearch = $("#dataAccettazioneASearch").val();
	var codiceScatolaSearch = $('#codiceScatolaSearch').val();
	var codicePacchettoSearch = $('#codicePacchettoSearch').val();
	var uri = contextPath
			+ "/scatola/dataTableGestAnomalie.json?identificativoPASearch="+ identificativoPASearch
			+ "&codiceTipoIstanzaSearch=" + codiceTipoIstanzaSearch
			+ "&codiceRaccomandataSearch=" + codiceRaccomandataSearch
			+ "&codiceScatolaSearch=" + codiceScatolaSearch
			+ "&codicePacchettoSearch=" + codicePacchettoSearch
			+ "&dataAccettazioneDaSearch=" + dataAccettazioneDaSearch
			+ "&dataAccettazioneASearch=" + dataAccettazioneASearch
			+ "&centroDemat=" + centroDemat
			+ "&idPostazione=" + idPostazione;

	console.log('URI.. -> '+uri);
		
	$('#tableGestioneAnomalie').bootstrapTable('refresh', {
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



