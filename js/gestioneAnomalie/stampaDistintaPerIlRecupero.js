var table1=null;
var table2=null;
var rimuoviArray =new Array();
var codiceScatolaSanabili=null;
var codiceScatolaNonSanabili=null;
var documentiScatolaSanabili=0;
var documentiScatolaNonSanabili=0;

$(document).ready(function() {

	table1 = $('#table1ScatolaDocAnomali').DataTable({
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : false,
			"searchable" : false
		} ],
		"scrollX": true,
		"language": {
            "lengthMenu": "Mostra _MENU_ record per pagina",
            "zeroRecords": "Non sono stati trovati record",
            "info": "Mostra pagina _PAGE_ di _PAGES_",
            "infoEmpty": "Non ci sono record",
            "infoFiltered": "(Filtrati da _MAX_ record totali)",
            "paginate": {
                "first":      "Primo",
                "last":       "Ultimo",
                "next":       "Prossimo",
                "previous":   "Precedente"
            }
        }
		
	});
	table2 = $('#table2ScatolaDocAnomali').DataTable({
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : false,
			"searchable" : false
		} ],
		"scrollX": true,
		"language": {
            "lengthMenu": "Mostra _MENU_ record per pagina",
            "zeroRecords": "Non sono stati trovati record",
            "info": "Mostra pagina _PAGE_ di _PAGES_",
            "infoEmpty": "Non ci sono record",
            "infoFiltered": "(Filtrati da _MAX_ record totali)",
            "paginate": {
                "first":      "Primo",
                "last":       "Ultimo",
                "next":       "Prossimo",
                "previous":   "Precedente"
            }
        }
		
	});
	
	$("#aggiornaPicking").click(function() {
//		waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'warning'});
		aggiornaPicking();
	});
	aggiornaPicking();

});


function aggiornaPicking(){

	console.log('findDocumentiAnomali start');
	var url = contextPath + '/'+'gestione'  + '/getStampaDistintaPerIlRecupero';
	console.log('recuperoDocumentiAnomali : '+url);
	var	idCentroDemat = $('[name="centrodemat"]').val();
	table1.clear().draw(false);
	table2.clear().draw(false);
	var requestDocumentiAnomali = { "data":{"codicePicking":codicePicking}};
	
	$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(requestDocumentiAnomali),
			success : function(result) {
				console.log('success! ', result);
				console.log('success! ', result.data);

				if(result.status){
					var lstDistinta =result.data.listDistinta
					if(lstDistinta.length>0){

						$("#imgBcDistintaPicking").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+lstDistinta[0].codicePicking);

					}
					codGma='';
					index=0;
					for(var i=0; i<lstDistinta.length; i++){
						if(codGma!=lstDistinta[i].codiceScatolaGme&&index==0){
							$('#codiceScatolaGme1').val(lstDistinta[i].codiceScatolaGme);
							$('#codiceScatola1').val(lstDistinta[i].codiceScatola);
							$('#codiceAggregato1').val(lstDistinta[i].aggregatoId);
							codGma=lstDistinta[i].codiceScatolaGme;
							index++;
						}else if(codGma!=lstDistinta[i].codiceScatolaGme&&index==1){
							$('#codiceScatolaGme2').val(lstDistinta[i].codiceScatolaGme);
							$('#codiceScatola2').val(lstDistinta[i].codiceScatola);
							$('#codiceAggregato2').val(lstDistinta[i].aggregatoId);
							codGma=lstDistinta[i].codiceScatolaGme;
							index++;
						}
						if(index==1){
							addDistinta1Obj(lstDistinta[i]);
						}
						if(index==2){
							addDistinta2Obj(lstDistinta[i]);
						}
						
					}
					codiceScatolaSanabili=result.data.codiceScatolaSanabili;
					codiceScatolaNonSanabili=result.data.codiceScatolaNonSanabili;
					documentiScatolaSanabili=result.data.documentiScatolaSanabili;
					documentiScatolaNonSanabili=result.data.documentiScatolaNonSanabili;
					
					initViewValues();
				}else{
					$('#danger_msg').text(result.message);
					$('#div_error_alert').show();
				}
				waitingDialog.hide();				
			},
			error : function(xhr, status, error, result) {
				console.log('errore!');
				console.log('xhr ', xhr);
				console.log('status ', status);
				console.log('error ', error);
				console.log('result ', result);
				$('#danger_msg').text(error);
				$('#div_error_alert').show();
				waitingDialog.hide();
			}
		});
	
}

function initViewValues(){
	$('#codiceScatolaSanabili').val(codiceScatolaSanabili);
	$('#codiceScatolaNonSanabili').val(codiceScatolaNonSanabili);
	$('#documentiScatolaSanabili').val(documentiScatolaSanabili);
	$('#documentiScatolaNonSanabili').val(documentiScatolaSanabili);
	$('#documentiSelezionatiSanabili').val(documentiScatolaSanabili);
	$('#documentiSelezionatiNonSanabili').val(documentiScatolaNonSanabili);
}
function addDistinta1Obj(objDocumenti){
	table1.row.add( [
		  checkVar(objDocumenti.codiceScatolaGme),
		  checkVar(objDocumenti.codiceOggetto),
	      checkVar(objDocumenti.posizioneInScatola),
	      checkVar(objDocumenti.tipoAnomalia),

	 ] ).draw(false);

}
function addDistinta2Obj(objDocumenti){
	table2.row.add( [
		  checkVar(objDocumenti.codiceScatolaGme),
		  checkVar(objDocumenti.codiceOggetto),
	      checkVar(objDocumenti.posizioneInScatola),
	      checkVar(objDocumenti.tipoAnomalia),

	 ] ).draw(false);

}
function checkVar(variabile){
	if (typeof(variabile) === 'undefined' || variabile === null || variabile === 'null')
	{
	    return "";
	}
	else
		return variabile;
}

function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}
