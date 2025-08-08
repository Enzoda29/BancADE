var print_tableRecuperaAnomalie = null;

$(document).ready(function() {
	print_tableRecuperaAnomalie = $('#print_tableRecuperaAnomalie').DataTable({
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
	
	$('#distintaRecuperaAnomalieModal').on('show.bs.modal', function() {
		loadLstAnomalie();
	});
	
	$("#printDistintaRecuperaAnomalie").click(function(){
		printWindow("printableAreaRecuperaAnomalie",1000,1000);		
	});

});


function loadLstAnomalie(){
	print_tableRecuperaAnomalie.clear().draw(false);
	for(var i=0; i<lstSelectedItem.length; i++){
		var objPratica = lstSelectedItem[i];
		print_tableRecuperaAnomalie.row.add( [	
			  objPratica.codiceScatola,
			  objPratica.codicePacchetto,
		      objPratica.progrPacchetto,
		      objPratica.codiceRaccomandata,
		      objPratica.dataAccettazione,
		      objPratica.identificativoPa,
		      objPratica.codiceTipoIstanza
		 ] ).draw(false);
	}
		

}

