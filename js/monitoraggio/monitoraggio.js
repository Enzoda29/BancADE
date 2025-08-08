$( document ).ajaxError(function(event, xhr, settings, thrownError ) {
	if(xhr.status === 403)
		window.location.reload();
});

var timer = null;
var timerGlobalInMillesecond = 60 * 5000;
var timerGlobalInMinute = "5:00";

$(document).ready(function() {

	loadLstClienti();
	var username = $('input[name="user"]').val();
	var clienteID = $('#comboClienti').children("option:selected").val();
	updateTableCarico( username , clienteID );
	$("#btn-cerca").click(function() {
		var username = $('input[name="user"]').val();
		var clienteID = $('#comboClienti').children("option:selected").val();
		updateTableCarico( username , clienteID );	
	});

	var target = document.getElementById('spinnerContainer');
	var spinner;
	var spinning = false;

	if($('input[name="descprofilo"]').val()!="Supervisore"){
//		detailsMonitor();
	}else{
//		loadLstCentriDemat('centroDemat');
	}



	function toggleSpin(){
		spinning ? spinner.stop() : spinner = new Spinner(opts).spin(target);  
		spinning = !spinning;
	}	

	$("#comboClienti").change(function() {
		var username = $('input[name="user"]').val();
		var clienteID = $('#comboClienti').children("option:selected").val();
		updateTableCarico( username , clienteID );
	});	

	$("#esportaCSV").click(function() {
		console.log('esportaCSV'); 
		$(".bootstrap-table").show(500);	

		var centroDemat = getCentroDemat();
		var username = $('input[name="user"]').val();
		var clienteID = $('#comboClienti').children("option:selected").val();
		var tipoMonTypeId = $('input[name="tipoMonTypeId"]').val(); 
		var tipoMonTypeId = 1;
		var uri_carico = contextPath + "/monitoraggio/getMonitorCarico?"; 	
		$.ajax({
			type : 'GET',
			url: uri_carico,	
			dataType: 'json',
			data: { 
				"clienteID": clienteID, 
				"centroDematID": centroDemat, 
				"username": username,
				"tipoMonTypeId": tipoMonTypeId
			},
			success : function(result) {
				console.log(result );

				var checkDataEmpty = result.data[0];
				console.log(checkDataEmpty);
				console.log("sono prima del for");

				var arrayCsv = [];
				for (numTabella = 0; numTabella < result.data.length; numTabella++ ){
					csv = "";

					var arrayIntestazioniColonna = result.data[numTabella].intestazioneColonna;
					arrayIntestazioniColonna.sort((a, b) => (a.sequenceColumn > b.sequenceColumn) ? 1 : -1);

					for(j = 0; j < arrayIntestazioniColonna.length; j++) {
						if (csv != "")
							csv += ";";
						csv += '"' + arrayIntestazioniColonna[j].colonna.replace("<br>"," ") +  '"';
					}

					for(i = 0; i < result.data[numTabella].value.length; i++) {
						row = result.data[numTabella].value[i];
						csvrow = "";
						for(j = 0; j < arrayIntestazioniColonna.length; j++) {
							console.log(arrayIntestazioniColonna[j].colonna);
							if (csvrow != "")
								csvrow += ";";
							csvrow += '"' + row[arrayIntestazioniColonna[j].colonna] +  '"';
						}
						console.log(csvrow);
						csv = csv + '\n' + csvrow;
					}

					arrayCsv.push(csv);
				}

				var zip = new JSZip();
				for(h=0; h<arrayCsv.length; h++){
					zip.file("Monitor_" + h +".csv", arrayCsv[h]);

				}
				zip.generateAsync({type:"blob"})
				.then(function(content) {

					var downloadLink = document.createElement("a");
					downloadLink.href = window.URL.createObjectURL(content);
					downloadLink.download = "monitoraggio_carico.zip";

					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);
				});

			}


		});

	});


//	ricerca clienti al caricamento della pagina
	function loadLstClienti() {
		showLoaderLst(true,"Attendere! Caricamento lista clienti in corso...");
		//var url = contextPath + '/' + 'spedizione' + '/getComboClienti';
		var url = contextPath + '/common/getComboClienti';
		$.ajax({
			type : 'GET',
			url : url,
			success : function(data) {
//				$("#comboClienti").empty();
				var lst = data.data;
				console.log("lengt: " +lst.length);
				$("#comboClienti").append("<option value=''> Tutti </option>");
				for (var i = 0; i < lst.length; i++) {
					var obj = lst[i];
					$("#comboClienti").append(
							"<option value=" + obj.value + ">"
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


	function showLoaderLst(show,message){
		$("#loadFields").text(message);
		$("#loadFields").attr("style",((show)?"display:''":"display:none"));
	}
});

function dynamicSort(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		/* next line works with strings and numbers, 
		 * and you may want to customize it to your needs
		 */
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

$("#refresh").click(function() {	
//	timer.reset(timerGlobalInMillesecond);
	console.log('refresh');
	var username = $('input[name="user"]').val();
	var clienteID = $('#comboClienti').children("option:selected").val();
	updateTableCarico( username , clienteID );
});


function Timer(fn, t) {
	var timerObj = setInterval(fn, t);

	this.stop = function() {
		if (timerObj) {
			clearInterval(timerObj);
			timerObj = null;
		}
		return this;
	}

	// start timer using current settings (if it's not already running)
	this.start = function() {
		if (!timerObj) {
			this.stop();
			timerObj = setInterval(fn, t);
		}

		return this;
	}

	// start with new interval, stop current interval
	this.reset = function(newT) {
		t = newT;
		return this.stop().start();
	}
}	

//timer refresh page
timer = new Timer(function() {
	var username = $('input[name="user"]').val();
	var clienteID = $('#comboClienti').children("option:selected").val();
	updateTableCarico( username , clienteID );
//	timedRefresh(timer);
}, timerGlobalInMillesecond);	


function timedRefresh(timer) {

	timer.reset(timerGlobalInMillesecond);
	var timer2 = timerGlobalInMinute;
	alert(timer2);
	timer = setInterval(function() {


		console.log(timerGlobalInMinute);
		var timer = timer2.split(':');
		//by parsing integer, I avoid all extra string processing
		var minutes = parseInt(timer[0], 10);
		var seconds = parseInt(timer[1], 10);
		--seconds;
		minutes = (seconds < 0) ? --minutes : minutes;
		if (minutes < 0) clearInterval(interval);
		seconds = (seconds < 0) ? 59 : seconds;
		seconds = (seconds < 10) ? '0' + seconds : seconds;
		//minutes = (minutes < 10) ?  minutes : minutes;
//		$('#countdown').html("Aggiornamento Monitor: " + minutes + ':' + seconds);
		timer2 = minutes + ':' + seconds;
	}, 1000);
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function resetValue(){

	$("#appendBody").empty();
	$("#appendBody").html('');

}

function getCentroDemat(){
	var centroDemat;
	$("#centroDemat").val()==null ? centroDemat=$('input[name="centrodemat"]').val() : centroDemat=$("#centroDemat").val();
	return centroDemat;
}

function updateTableCarico( username , clienteID ){	
//	timedRefresh();
	console.log('monitorCarico start');		
//	calculateTimeRemaining(this.timer)
	resetValue();
	var centroDemat = getCentroDemat();


	var tipoMonTypeId = $('input[name="tipoMonTypeId"]').val(); 
//	var tipoMonTypeId = 1;
	var uri_carico = contextPath + "/monitoraggio/getMonitorCarico?"; 	
	$.ajax({
		type : 'POST',
		url: uri_carico,	
		dataType: 'json',
		data: { 
			"clienteID": clienteID, 
			"centroDematID": centroDemat, 
			"username": username,
			"tipoMonTypeId": tipoMonTypeId
		},
		success : function(result) {
			if(result.status){

				//table show
				var listaValue = result.data.value;
				var intestazioneColonna = result.data.intestazioneColonna;
				var tableArray = result.data;

				$("table").bootstrapTable('destroy');
				$("table thead tr").html('');

				var valueTable = 1;
				//per ogni tabella
				tableArray.forEach(function(element) {
					var nameTable = "table_"+ valueTable;
					var tag_append = "<div class='row'><h3 class='col-lg-12'>"+element.titoloMonitor +"</h3></div><div class='row'><table id=\"" + nameTable +"\" data-toggle=\"table\" class=\"table table-hover\"><thead><tr></tr></thead></table></div>";
					$("#appendBody").append(tag_append);
					var intColonnaObj = element.intestazioneColonna;
					intColonnaObj.sort(dynamicSort("sequenceColumn"));
					$.each(intColonnaObj, function(index, value) {
						var colonna = value.colonna;
						var label = value.label;
						var width = 'auto';
						if(value.width != '') width = value.width + '%';

						var tr = '<th data-field="'+ colonna +'" title="'+ label +'" width="'+ width +'%" >'+ colonna +'</th>';
						$("#"+ nameTable + " thead tr").append(tr);
//						console.log("tr : " + tr);
					});

//					var listData = element
//					alert("id table = " + nameTable);
					$("#"+ nameTable + "").bootstrapTable();
//					console.log("carico table..");
					$("#"+ nameTable + "").bootstrapTable('load', {data: element.value});

					$("#"+ nameTable + "").on('dbl-click-row.bs.table',showDettaglioMonitorDiCarico);
					
					valueTable = valueTable + 1;
				});

				console.log("carico table terminata..");
			}else{
				alert("Nessun dato trovato per il cliente " +  $('#comboClienti').children("option:selected").text());
			}

		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,error,SUFFIX_MSG);
		}
	});
}

function showDettaglioMonitorDiCarico(row,$element,field) {
	if ($element.showDetail==1) {
		var url = contextPath + '/monitoraggio/getDettaglioMonitorDiCarico';
		$("#dettaglioMonitorDiCarico").bootstrapTable('destroy');
		$("#dettaglioMonitorDiCarico thead tr").html('');
	
		$.ajax({
			type: 'POST',
		        url: url,	    
		        dataType: 'json',
		        data:  {"clienteID": $element.macroservClientId, "tipoLavorazioneTypeId":$element.tipoLavorazioneTypeId},
			success : function(result) {
				if(result.status){
					var checkDataEmpty = result.data;
					if( checkDataEmpty == null || checkDataEmpty == '' || checkDataEmpty.length <= 0){
						alert("Contenuto della scatola vuoto!");
						return ;
					}
					$('#dettaglioMonitorDiCaricoModal').modal('show');
					var listData = result.data.rowContent;
					var listColonne = result.data.columnHeader;
					var tr;
					for(var i in listColonne){
					    var sequenceColumns = i; ///000,0001 ...
					    var valore = listColonne[sequenceColumns];
					    	
					    var tr_temp;
					        $.each(valore, function(index, value) {
						    	var columnDataField = index;
						    	var columnTitle = value;
						    	console.log(" - data-field: " + columnDataField +"- tag: " + columnTitle );
						    	tr_temp = "<th data-field=\"" + columnDataField + "\">" + columnTitle + "</th>";
					        });
					        tr = tr + tr_temp.toString();
					}
					
				        $("#dettaglioMonitorDiCarico thead tr").append(tr);
					
					$("#dettaglioMonitorDiCarico").bootstrapTable({
						data: listData});
				}else{
					alert("Errore richiesta dettaglio!");
				}
				
			},
			error : function(xhr, status, error, result) {
				waitingDialog.hide();
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,error);
			}
		}); 
	}
}
