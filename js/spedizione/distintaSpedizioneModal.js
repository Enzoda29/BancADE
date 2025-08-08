var printTableDettScatole = null;

$(document).ready(function() {
	printTableDettScatole = $('#print_tableDettScatole').DataTable({
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
	
	$('#distintaSpedizioneModal').on('show.bs.modal', function() {
		loadDistintaSpedizione();
	});
	
	$("#printDistintaSpedizione").click(function(){
		printWindow("printableAreaDettScatola",1000,1000);		
	});

});


function showLoaderLstDistintaScatola(show){
	$("#print_loadLstDettSpedizione").text("Attendere! Caricamento dati in corso...");
	$("#print_loadLstDettSpedizione").attr("style",((show)?"display:''":"display:none"));
}

function loadDistintaSpedizione() {
	showLoaderLstDistintaScatola(true);
	var url = contextPath + '/' + 'spedizione' + '/dettScatolaFromSpedizione';
	var request = {	"data" : {	"idSpedizione" : idSpedizioneSelected}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {			
			console.log('success! ', result.data);
			
			if(result.status){
				$("#imgBcDistintaSpedizione").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+result.data.codice_ldv);
				var dataCreazioneStr = new Date(result.data.dataCreazione).toLocaleString();
				$("#print_dataCreazioneDistinta").text(dataCreazioneStr);
				$("#print_operatoreDistinta").text(result.data.operatore);
				
				printTableDettScatole.clear();
				var listScatole = result.data.listScatole;
				for(var i=0; i<listScatole.length; i++){
					addDistintaScatoleObj(listScatole[i]);
				}
			}else{
				
			}
			showLoaderLstDistintaScatola(false);			
			
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

function addDistintaScatoleObj(objScatola){
	
	var dataChiusuraStr = null;
	if(objScatola.dataChiusura != null){
		var dataChiusura = new Date(objScatola.dataChiusura);
		dataChiusuraStr = dataChiusura.toLocaleString();
	}

		
	printTableDettScatole.row.add( [	
			objScatola.codiceScatola,
			dataChiusuraStr

	 ] ).draw(false);
}

