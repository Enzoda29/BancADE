var tableRaccomandateDistPacchetto = null;

$(document).ready(function() {
	tableRaccomandateDistPacchetto = $('#tableRaccomandateDistPacchetto').DataTable({
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
	
	$('#distintaPacchettoModal').on('show.bs.modal', function() {
		loadDistintaPacchetto();
	});
	
	$("#stampaPacchetto").click(function(){
		printWindow("printableAreaPacchetto",1000,1000);		
	});

});


function showLoaderLstDistintaPacchetto(show){
	$("#print_loadPacchetto").text("Attendere! Caricamento dati in corso...");
	$("#print_loadPacchetto").attr("style",((show)?"display:''":"display:none"));
}

function loadDistintaPacchetto() {
	showLoaderLstDistintaPacchetto(true);
	var codicePacchetto = $("#codicePacchetto").val();
	var url = contextPath + '/' + 'scatola' + '/getDettPacchettoPratiche';
	var request = {	"data" : {"codicePacchetto" : codicePacchetto}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			$("#imgBcDistintaPacchetto").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+codicePacchetto);
			$("#numero_buste").val(result.data.numeroPratiche);
			$("#id_pa").val(result.data.identificativoPa);
			var dataCreazioneStr = "";
			if(result.data.dataCreazionePacchetto != null){
				dataCreazioneStr = new Date(result.data.dataCreazionePacchetto).toLocaleString();	
			}				
			$("#dt_crea").val(dataCreazioneStr);
			$("#tipo_pra").val(result.data.codiceTipoIstanza);
			
						
			tableRaccomandateDistPacchetto.clear().draw();
			var lstRacc = result.data.elencoPratiche;
			for(var i=0; i<lstRacc.length; i++){
				addDistintaRaccObj(lstRacc[i]);
			}			
			showLoaderLstDistintaPacchetto(false);			
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			showErrorMessage(true,error,SUFFIX);
		}
	});
}

function addDistintaRaccObj(objRacc){

	var dataAccettazioneRaccomandataStr = null;
	if(objRacc.dataInserimento != null){
		var dataAccettazioneRaccomandata = new Date(objRacc.dataInserimento);
		dataAccettazioneRaccomandataStr = dataAccettazioneRaccomandata.toLocaleString()
	}
	
		
	tableRaccomandateDistPacchetto.row.add( [	
		objRacc.codRaccomandata,
	      dataAccettazioneRaccomandataStr
	 ] ).draw(false);
}

