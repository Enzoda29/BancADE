var printTableDettScatoleAnomalie = null;

$(document).ready(function() {
	printTableDettScatoleAnomalie = $('#print_tableDettScatoleAnomalie').DataTable({
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
	
	$('#distintaScatolaAnomalieModal').on('show.bs.modal', function() {
		loadDistintaScatolaAnomalie();
	});
	
	$("#printDistintaAnomalie").click(function(){
		printWindow("printableAreaDettScatolaAnomalie",1000,1000);		
	});

});


function showLoaderLstDistintaScatolaAnomalie(show){
	$("#print_loadLstDettScatolaAnomalie").text("Attendere! Caricamento dati in corso...");
	$("#print_loadLstDettScatolaAnomalie").attr("style",((show)?"display:''":"display:none"));
}

function loadDistintaScatolaAnomalie() {
	showLoaderLstDistintaScatolaAnomalie(true);
	var url = contextPath + '/' + 'scatola' + '/dettScatolaAnomaliePratica';
	var request = {	"data" : {	"idScatola" : idScatolaSelected, "idTipoScatola" : idTipoScatola}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			$("#imgBcDistintaScatolaAnomalie").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+result.data.codiceScatola);
			$("#print_codiceScatolaAnomalie").text(result.data.codiceScatola);
			var dataCreazioneStr = new Date(result.data.dataCreazione).toLocaleString();	
			$("#print_dataCreazioneScatolaAnomalie").text(dataCreazioneStr);
			
			var stato = null;
			if(result.data.statoScatola == SCATOLA_APERTA){
				stato = "APERTA";				
			}else
			if(result.data.statoScatola == SCATOLA_CHIUSA){
				stato = "CHIUSA";
			}
			$("#print_statoScatolaAnomalie").text(stato);
			
			$("#print_idPAScatolaAnomalie").text(result.data.identificativoPA);
			$("#print_tipIstScatolaAnomalie").text(result.data.codiceTipoIstanza);
			$("#print_numPraticheScatolaAnomalie").text(result.data.numPraticheInserite);
			$("#print_percComplScatolaAnomalie").text(result.data.percCompletamento);
		
			var dataChiusuraStr = "";
			if(result.data.dataChiusura != null){
				dataChiusuraStr = new Date(result.data.dataChiusura).toLocaleString();	
			}				
			$("#print_dataChiusuraScatolaAnomalie").text(dataChiusuraStr);
			$("#print_centroDematScatolaAnomalie").text(result.data.localitaCentroDemat);
			
			printTableDettScatoleAnomalie.clear().draw();
			var lstPratiche = result.data.lstPratiche;
			for(var i=0; i<lstPratiche.length; i++){
				addDistintaPraticheAnomalieObj(lstPratiche[i]);
			}			
			showLoaderLstDistintaScatolaAnomalie(false);			
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

function addDistintaPraticheAnomalieObj(objPratica){
		
	printTableDettScatoleAnomalie.row.add( [	
		  objPratica.codicePacchetto,
		  objPratica.progrScatola,
	      objPratica.codiceRaccomandata
	 ] ).draw(false);
}

