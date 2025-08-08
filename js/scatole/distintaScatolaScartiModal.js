var printTableDettScatoleScarti = null;

$(document).ready(function() {
	printTableDettScatoleScarti = $('#print_tableDettScatoleScarti').DataTable({
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
	
	$('#distintaScatolaScartiModal').on('show.bs.modal', function() {
		loadDistintaScatolaScarti();
	});
	
	$("#printDistintaScarti").click(function(){
		printWindow("printableAreaDettScatolaScarti",1000,1000);		
	});

});


function showLoaderLstDistintaScatolaScarti(show){
	$("#print_loadLstDettScatolaScarti").text("Attendere! Caricamento dati in corso...");
	$("#print_loadLstDettScatolaScarti").attr("style",((show)?"display:''":"display:none"));
}

function loadDistintaScatolaScarti() {
	showLoaderLstDistintaScatolaScarti(true);
	var url = contextPath + '/' + 'scatola' + '/dettScatolaScartiPratica';
	var request = {	"data" : {	"idScatola" : idScatolaSelected, "idTipoScatola" : idTipoScatola}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			$("#imgBcDistintaScatolaScarti").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+result.data.codiceScatola);
			$("#print_codiceScatolaScarti").text(result.data.codiceScatola);
			var dataCreazioneStr = new Date(result.data.dataCreazione).toLocaleString();	
			$("#print_dataCreazioneScatolaScarti").text(dataCreazioneStr);
			
			var stato = null;
			if(result.data.statoScatola == SCATOLA_APERTA){
				stato = "APERTA";				
			}else
			if(result.data.statoScatola == SCATOLA_CHIUSA){
				stato = "CHIUSA";
			}
			$("#print_statoScatolaScarti").text(stato);
			
			$("#print_idPAScatolaScarti").text(result.data.identificativoPA);
			$("#print_tipIstScatolaScarti").text(result.data.codiceTipoIstanza);
			$("#print_numPraticheScatolaScarti").text(result.data.numPraticheInserite);
			$("#print_percComplScatolaScarti").text(result.data.percCompletamento);
		
			var dataChiusuraStr = "";
			if(result.data.dataChiusura != null){
				dataChiusuraStr = new Date(result.data.dataChiusura).toLocaleString();	
			}				
			$("#print_dataChiusuraScatolaScarti").text(dataChiusuraStr);
			$("#print_centroDematScatolaScarti").text(result.data.localitaCentroDemat);
			
			printTableDettScatoleScarti.clear().draw();
			var lstPratiche = result.data.lstPratiche;
			for(var i=0; i<lstPratiche.length; i++){
				addDistintaPraticheScartiObj(lstPratiche[i]);
			}			
			showLoaderLstDistintaScatolaScarti(false);			
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

function addDistintaPraticheScartiObj(objPratica){
		
	printTableDettScatoleScarti.row.add( [	
		  objPratica.codicePacchetto,
		  objPratica.progrScatola,
	      objPratica.codiceRaccomandata
	 ] ).draw(false);
}

