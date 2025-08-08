var print_tableRecuperaScarti = null;
var SUFFIX = "_REC_SCARTI";
$(document).ready(function() {
	print_tableRecuperaScarti = $('#print_tableRecuperaScarti').DataTable({
		fixedHeader: true,
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
	
	$('#distintaRecuperaScartiModal').on('show.bs.modal', function() {
		loadLstScarti();
	});
	
	$("#printDistintaRecuperaScarti").click(function(){
		printWindow("printableAreaRecuperaScarti",1000,1000);		
	});
	
	SUFFIX = "_REC_SCARTI";
});




function loadLstScarti(){
	showErrorMessage(false,'',SUFFIX);
	$("#printDistintaRecuperaScarti").attr("disabled",false);
	print_tableRecuperaScarti.clear().draw(false);
	if(lstSelectedItem.length == 0){
		showErrorMessage(true,"Nessuno scarto selezionato!",SUFFIX);
		$("#printDistintaRecuperaScarti").attr("disabled",true);
	}
	for(var i=0; i<lstSelectedItem.length; i++){
		var objPratica = lstSelectedItem[i];
		print_tableRecuperaScarti.row.add( [	
			  objPratica.codiceScatola,
			  objPratica.codicePacchetto,
		      objPratica.progrPacchetto,
		      objPratica.codiceRaccomandata,
		      objPratica.dataAccettazione,
		      objPratica.identificativoPa,
		      objPratica.codiceTipoIstanza
		 ] ).draw(false);
	}
	checkScarti();

}


function checkScarti(){
	
	var idCentroDemat = $('input[name="centrodemat"]').val(); 
	var idPostazione = $('input[name="postazione"]').val(); 
	
	var url = contextPath + '/' + 'scatola' + '/checkRecuperoScarti?idCentroDemat='+idCentroDemat+"&idPostazione="+idPostazione;
	

	//var request = {"idPostazione":idPostazione,"idCentroDemat":idCentroDemat, "listScarti" : {lstSelectedItem }};
	//console.log(request);
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(lstSelectedItem),
		success : function(result) {
			console.log('success! ', result);
			if(!result.status){
				showErrorMessage(true,result.message,SUFFIX);	
			}
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
