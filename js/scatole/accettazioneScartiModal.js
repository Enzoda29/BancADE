var lstRaccSelected = null
var tableRaccomadata = null;
var SUFFIX_ACC_SCARTI = "_ACC_SCARTI";
$(document).ready(function() {
	tableRaccomadata = $('#tableRaccomadata').DataTable({
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

	$('#accettazioneScartiModal').on('show.bs.modal', function() {		
		showErrorMessage(false,"",SUFFIX_ACC_SCARTI);	
		showSuccessMessage(false,"",SUFFIX_ACC_SCARTI);	
		$("#tipoIstanza").empty();
		$("#identificativoPA").empty();
		tableRaccomadata.clear().draw();
		//loadLstTipIstanza_Spedizione("tipoIstanza");
		//loadLstIdentificativoPA_Spedizione("identificativoPA");
		loadLstIdentificativoPA("identificativoPA",0);
		loadLstTipIstanza("tipoIstanza",0);
		lstRaccSelected = new Array();
	});
	
	$("form").on('submit',function(e){
	    e.preventDefault();
	});

	
	$("#btnAddCodiceRacc").click(function(){
		showErrorMessage(false,'',SUFFIX_ACC_SCARTI);
		var codiceRaccomandata = $("#codiceRaccomandata").val();
		if(checkRaccomandataIsPresent(codiceRaccomandata)){
			checkRaccomandata();
		}

	});
	
	$("#submitAccettazione").click(function(){
		submit();
	});

});




function addRaccomandata(){
	showErrorMessage(false,"",SUFFIX_ACC_SCARTI);	
	var codiceRaccomandata = $("#codiceRaccomandata").val();
	lstRaccSelected.push(codiceRaccomandata);
	tableRaccomadata.row.add( [	
		codiceRaccomandata,
		  "<button class='glyphicon glyphicon-minus' title='Rimuovi raccomandata' onclick=delRaccomandata(this,"+codiceRaccomandata+")></button>"
	 ] ).draw(false);
}


function delRaccomandata(objThis, codRaccSelected){
	var row = tableRaccomadata.row( $(objThis).parents('tr') );
	row.remove().draw();
	
	for(var i=0; i<lstRaccSelected.length; i++){
		if(lstRaccSelected[i] == codRaccSelected){
			lstRaccSelected.splice(i,1);	
		}
	}
}

function checkRaccomandataIsPresent(codRacc){
	for(var i=0; i<lstRaccSelected.length; i++){
		if(lstRaccSelected[i] == codRacc){
			showErrorMessage(true,"Codice Raccomandata già inserito!",SUFFIX_ACC_SCARTI);	
			return false;
		}
	}
	return true;
}


function checkRaccomandata(){
	var idIstanza = $("#tipoIstanza").val();
	var idAnagPA = $("#identificativoPA").val();
	var codiceRaccomandata = $("#codiceRaccomandata").val();
	if((idIstanza != "") && (idAnagPA != "")){
		showLoaderLst(true,"Attendere! Controllo raccomandata in corso...");
		
		$("#submitApriScatola").prop("disabled",false);
		var request = {	"data" : {	"idAnagrPA" : idAnagPA, "idIstanza": idIstanza,"codiceRaccomandata":codiceRaccomandata   }};
			var url = contextPath + '/' + 'scatola' + '/checkRaccomandataScarto';
			$.ajax({
					type : 'POST',
					url : url,
					contentType : 'application/json',
					dataType : 'json',
					data : JSON.stringify(request),
					success : function(result) {
						showLoaderLst(false,"");
						console.log('success! ', result);
						if(result.status){
							if(result.data){								
								addRaccomandata();
								$("#codiceRaccomandata").val("");
							}else{
								var message = "Codice raccomandata per Tipologia Istanza e Identificativo PA selezionati, non è uno scarto!";
								showErrorMessage(true,message,SUFFIX_ACC_SCARTI);									
							}						
						}else{
							$("#submitAccettazione").prop("disabled",true);
							showErrorMessage(true,result.message,SUFFIX_ACC_SCARTI);	
						}
					},
					error : function(xhr, status, error, result) {
						$("#submitAccettazione").prop("disabled",true);
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


function showLoaderLst(show,message){
	$("#loadLstAccettazioneScarti").text(message);
	$("#loadLstAccettazioneScarti").attr("style",((show)?"display:''":"display:none"));
}



function submit() {
	if(lstRaccSelected.length == 0){
		showErrorMessage(true,"Nessuna raccomandata selezionata!",SUFFIX_ACC_SCARTI);
		return;
	}     
	showErrorMessage(false,"",SUFFIX_ACC_SCARTI);
	
	var idIstanza = $("#tipoIstanza").val();
	var idAnagPA = $("#identificativoPA").val();

	
	$("#submitAccettazione").prop("disabled",true);
	showLoaderLst(true,"Attendere! Creazione accettazione scarto in corso...");	
	
	var lstRaccomandate = [];
	for(var i=0; i<lstRaccSelected.length; i++){
		lstRaccomandate.push(lstRaccSelected[i]);		
	}
	var idCentroDemat = $('input[name="centrodemat"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
	var idPostazione = $('input[name="postazione"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
	var operatore = $('input[name="user"]').val();
	var request = {
		"data" : {
			"idAnagrPA" : idAnagPA,
			"idIstanza": idIstanza,
			"idCentroDemat": idCentroDemat,
			"idPostazione": idPostazione,
			"operatore": operatore,
			"listRaccomandate": lstRaccomandate 
	   }};
	console.log(request);
	var url = contextPath + '/' + 'scatola' + '/accettazioneScarto';
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			success : function(result) {
				console.log('success! ', result);
				showLoaderLst(false,"");
				if(result.status){			
					showSuccessMessage(true,result.message,SUFFIX_ACC_SCARTI);	
					//$("#accettazioneScartiModal").modal('hide');
					$("#codicePacchetto").val(result.data);
					$("#distintaPacchettoModal").modal({backdrop: 'static', keyboard: false});

				}else{
					showErrorMessage(true,result.message,SUFFIX_ACC_SCARTI);		
				}
				$("#submitAccettazione").prop("disabled",false);				
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				showErrorMessage(true,error);
			}
		});
}


