
$(document).ready(function() {
	tableDett = $('#riepilogo_casellario').DataTable({
	    columnDefs: [{
		  "targets": 0, 
	      "orderable": false,
		  "visible" : false,
		  "searchable" : false
	    }],
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
		},
	    order: [[1,'asc']]
	  });
//		  
//	$('#dettCasellarioModal').on('show.bs.modal', function() {
//		getDettCasellario()
//	});

});	


