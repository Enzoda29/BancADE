var table=null;
$(document).ready(function () {
	
	table = $('#tableFlussi').DataTable({
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
        "infoEmpty": "",
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

	//cercaMaterialitaIndescritta
	  $("#cercaMaterialita").on("click", function(e) {
		  console.log('cercaMaterialita');
	      e.preventDefault();
	      var codiceOggetto = $("#codiceOggettoSearch").val();
	      var url = contextPath + '/materialita/datiMaterialita?codiceOggetto=' + codiceOggetto;
	     
	      if(codiceOggetto != null && codiceOggetto != ""){
		    	 
		  	table.clear().draw(false);
		  	$(".badge").text("");
		     $.ajax({
				url: url,
				method: "GET",
				dataType: "json",
				success: function(data) {
				console.log('success!');	
				if(data.data!=null && data.data.rowContent){
				
					var urlFlusso = contextPath + '/materialita/flussoMaterialita?codiceOggetto=' + codiceOggetto;
				      $.ajax({
							url: urlFlusso,
							method: "GET",
							dataType: "json",
							success: function(data) {
								 
								console.log('success!');
								 if(data.status){
									 var lstFlussi = data.data.rowContent;
									 for(var i=0; i<lstFlussi.length; i++){
										 addFlussi(lstFlussi[i]);
									 }
								 }
							},
				      error: function (xhr, status, error, result) {
			              console.log('Errore Flusso');
			              console.log('xhr ', xhr);
			              console.log('status ', status);
			              console.log('error ', error);
			              console.log('result ', result);
			          }
				     
					});
					    $("#codScatola").text(data.data.rowContent[0].CODICE_SCATOLA);
						$("#idCliente").text(data.data.rowContent[0].CLIENTE);
						$("#codiceOggetto").text(data.data.rowContent[0].COD_OGGETTO);
						$("#StatoSorter").text(data.data.rowContent[0].STATO_SORTER);
						
						$("#stato").text(data.data.rowContent[0].STATO_DOC);
						$("#codMacroservizio").text(data.data.rowContent[0].CODIFICA_MACROSERVIZIO);
						$("#NomeFileFronte").text(data.data.rowContent[0].NOME_FILE_IMMAGINE_FRONTE);
						$("#DataCreazione").text(data.data.rowContent[0].DATA_CREAZIONE);
						
						$("#TipoDocumento").text(data.data.rowContent[0].NOME_DOCUMENTO);
						$("#DescrizioneCliente").text(data.data.rowContent[0].DESCRIZIONE_CLIENTE);
						$("#PosizioneInScatola").text(data.data.rowContent[0].POSIZIONE_IN_SCATOLA_SCAN);
						$("#NomeFileRetro").text(data.data.rowContent[0].NOME_FILE_IMMAGINE_RETRO);
						$("#DataScansione").text(data.data.rowContent[0].DATA_SCANSIONE);
						$("#ProgressivoInvio").text(data.data.rowContent[0].PROGRESSIVO_INVIO);
						
						$("#CodiceMazzetta").text(data.data.rowContent[0].CODICE_MAZZETTA);
						$("#PosizioneInMazzetta").text(data.data.rowContent[0].POSIZIONE_IN_MAZZETTA);
						$("#ProgressivoCartaceo").text(data.data.rowContent[0].PROGRESSIVO_CARTACEO);
						$("#CodicePallet").text(data.data.rowContent[0].CODICE_PALLET);
						$("#CodiceDDT").text(data.data.rowContent[0].CODICE_DDT);
						$("#DescrLottoTerritoriale").text(data.data.rowContent[0].DESCR_LOTTO_TERRITORIALE);
						$("#TipoPosta").text(data.data.rowContent[0].TIPO_POSTA);
					}			
				
				else {
				   alert("Il codice inserito non esiste o non contiene informazioni");
			}	
		},
	      error: function (xhr, status, error, result) {
              console.log('errore!');
              console.log('xhr ', xhr);
              console.log('status ', status);
              console.log('error ', error);
              console.log('result ', result);
              alert("i campi sono vuoti");
             
          }
	     
		});
		     
	  } else {
		  alert("Inserire Codice Oggetto per effettuare la ricerca");
	  }
});
	  
	  $("#cercaMaterialitaIndescritta").on("click", function(e) {
		  console.log('cercaMaterialita');
	      e.preventDefault();
	      var codiceOggetto = $("#codiceOggettoSearch").val();
	      var url = contextPath + '/materialita/datiMaterialitaIndescr?codiceOggetto=' + codiceOggetto;
	     
	      if(codiceOggetto != null && codiceOggetto != ""){
		    	 
		  	table.clear().draw(false);
		  	$(".badge").text("");
		     $.ajax({
				url: url,
				method: "GET",
				dataType: "json",
				success: function(data) {
				console.log('success!');	
				if(data.data!=null && data.data.rowContent){
				
					var urlFlusso = contextPath + '/materialita/flussoMaterialita?codiceOggetto=' + codiceOggetto;
				      $.ajax({
							url: urlFlusso,
							method: "GET",
							dataType: "json",
							success: function(data) {
								 
								console.log('success!');
								 if(data.status){
									 var lstFlussi = data.data.rowContent;
									 for(var i=0; i<lstFlussi.length; i++){
										 addFlussi(lstFlussi[i]);
									 }
								 }
							},
				      error: function (xhr, status, error, result) {
			              console.log('Errore Flusso');
			              console.log('xhr ', xhr);
			              console.log('status ', status);
			              console.log('error ', error);
			              console.log('result ', result);
			          }
				     
					});
				      $("#opId").text(data.data.rowContent[0]					.OP_ID);
				      $("#dataMatrix").text(data.data.rowContent[0]				.DATAMATRIX);
				      $("#idPrenotazione").text(data.data.rowContent[0]			.ID_PRENOTAZIONE);
				      $("#formatoBusta").text(data.data.rowContent[0]			.FORMATO_BUSTA);
				      $("#tipoSpedizione").text(data.data.rowContent[0]			.TIPO_SPEDIZIONE);
				      $("#tipoModello").text(data.data.rowContent[0]			.TIPO_MODELLO);
				      $("#descDocumento").text(data.data.rowContent[0]			.DESCRIZIONE_DOCUMENTO);
				      $("#statoDocumento").text(data.data.rowContent[0]			.STATO_DOC);
				      $("#dataScansione").text(data.data.rowContent[0]			.DATA_SCANSIONE);
				      $("#codiceScatola").text(data.data.rowContent[0]			.CODICE_SCATOLA);
				      $("#idPreadvising").text(data.data.rowContent[0]			.PREADV_INDESCR_ID);
				      $("#tipoScatola").text(data.data.rowContent[0]			.TIPO_SCATOLA);
				      $("#posizioneScatolaScan").text(data.data.rowContent[0]	.POSIZIONE_IN_SCATOLA_SCAN);
				      $("#codiceMazzetta").text(data.data.rowContent[0]			.CODICE_MAZZETTA);
				      $("#posizioneInMazzetta").text(data.data.rowContent[0]	.POSIZIONE_IN_MAZZETTA);
				      $("#cliente").text(data.data.rowContent[0]				.CLIENTE);
				      $("#codicePallet").text(data.data.rowContent[0]			.CODICE_PALLET);
				      $("#codiceDDT").text(data.data.rowContent[0]				.CODICE_DDT);
				      $("#lottoTerritoriale").text(data.data.rowContent[0]		.LOTTO_TERRITORIALE);
				      $("#idFusione").text(data.data.rowContent[0]				.ID_FUSIONE);
				      $("#idDistinta").text(data.data.rowContent[0]				.ID_DISTINTA);
				      idDistinta
					}			
				
				else {
				   alert("Il codice inserito non esiste o non contiene informazioni");
			}	
		},
	      error: function (xhr, status, error, result) {
              console.log('errore!');
              console.log('xhr ', xhr);
              console.log('status ', status);
              console.log('error ', error);
              console.log('result ', result);
              alert("i campi sono vuoti");
             
          }
	     
		});
		     
	  } else {
		  alert("Inserire Codice Oggetto per effettuare la ricerca");
	  }
});
	  
	  
	
	
});

function addFlussi(listFlussi){
	
	table.row.add( [
		  "",
		  listFlussi.NOME_FLUSSO,
		  listFlussi.TIPOLOGIA_FLUSSO,
		  listFlussi.DATA_INSERIMENTO,
		
	 ] ).draw(true);
}



