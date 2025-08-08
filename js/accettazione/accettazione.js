var tableDett = null;
$(document).ready(function() {
	$("#codice-raccomandata-input").keypress(function(e) {
		if(e.which == 13) {
			$("#proseguiAccettazione").click();
	    }		
	});

	loadCasellari();

});


function loadCasellari(identificativoCasellarioNew,isError){
	var isError = (isError == undefined)?false:true;
	$("#rowCasellari").empty();
	console.log('loadCasellari start');
	var url = contextPath + '/' + 'accettazione' + '/getLstCasellari';
	console.log('findCasellario '+url);


	var centroDemat = $('input[name="centrodemat"]').val(); 
	var idPostazione = $('input[name="postazione"]').val(); 
	
	console.log('centroDemat:',centroDemat,'idPostazione:',idPostazione);
	
	var requestPreadv = { "data":{"idPostazione": idPostazione,"centroDemat":centroDemat}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestPreadv),
		success : function(result) {
			console.log('success! ', result);
			console.log('success! ', result.data.listCasellari);
			if(result.status){
				var lstCasellari =result.data.listCasellari;
				for(var i=0; i<lstCasellari.length; i++){
					addCasellarioObj(lstCasellari[i],identificativoCasellarioNew,isError);
				}
			}else{
				showErrorMessage(true,result.message);
			}
			
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
	
};

function addCasellarioObj(objCasellario,identificativoCasellarioNew,isError){
	var panel_color = "panel-primary";
	
	var stato = ((objCasellario.stato=="1")?"Aperto":"In Normalizzazione");

	if(identificativoCasellarioNew ==  objCasellario.identificativoCasellario){
		panel_color = "panel-green";
		if(isError){
			panel_color = "panel-pink";
		}
	}else
	if(objCasellario.lock_owner != null){
		panel_color = "panel-default";
		stato = "In Normalizzazione (da "+objCasellario.lock_owner+")";
	}

	
	
	var header_casellario = objCasellario.identificativoCasellario+"_"+objCasellario.identificativoPA+"_"+objCasellario.tipologiaIstanza

	
	var casellario_div = "<div class='col-lg-3 col-md-6'>" +
							"<div class='panel "+panel_color+"'>"+
						       "<div class='panel-heading'>"+
						           " <b>"+header_casellario+"</b> "+
						        "</div>"+
						        "<div class='panel-body'>"+
									"<ul class='list-group'>"+
										"<li class='list-group-item'>Stato: "+stato+"</li>"+
										"<li class='list-group-item'>Numero Pratiche: "+objCasellario.numPratiche+"</li>"+
									"</ul>"+
								"</div>"+
						        "<div class='panel-footer'>"+
						            "<button type='button' name='btnDettaglio' data-toggle='modal' data-target='#dettCasellarioModal' " +
						            "data-id_casellario='"+objCasellario.identificativoCasellario+"'"+
						            "data-header_casellario='"+header_casellario+"' data-identificativo_casellario='"+ objCasellario.identificativoCasellario+"' " +
						            "data-identificativo_pa='"+objCasellario.identificativoPA+"' class='btn btn-default'>Dettaglio</button>"+
					            "</div>"+								
						    "</div>"+
						"</div>";
 $("#rowCasellari").append(casellario_div);						    
}

//data-* attributes to scan when populating modal values
var ATTRIBUTES = ['id_casellario','header_casellario', 'identificativo_casellario', 'identificativo_pa'];
$(document).on('click', function (e) {
	
  // convert target (e.g. the button) to jquery object
  var $target = $(e.target);
  
  var id_casellario = $target.data('id_casellario');
  
  if(id_casellario != undefined){
	  // modal targeted by the button
	  var modalSelector = $target.data('target');  
	 
	  console.log("id_casellario: "+id_casellario);
	  // iterate over each possible data-* attribute
	  ATTRIBUTES.forEach(function (attributeName) {
	    // retrieve the dom element corresponding to current attribute
	    var $modalAttribute = $(modalSelector + ' #modal-' + attributeName);
	    var dataValue = $target.data(attributeName);
	    
	    // if the attribute value is empty, $target.data() will return undefined.
	    // In JS boolean expressions return operands and are not coerced into
	    // booleans. That way is dataValue is undefined, the left part of the following
	    // Boolean expression evaluate to false and the empty string will be returned
	    $modalAttribute.text(dataValue || '');
	  });
	  getDettCasellario(id_casellario);
  }
});



function getDettCasellario(idCasellario){
	console.log('getDettCasellario');
	tableDett.clear().draw(false);
	$('input[name="id_casellario"]').val(idCasellario);
	var requestDettCasellario = { "data":{"identificativoCasellario": idCasellario}};
	var url = contextPath + '/' + 'normalizzazione' + '/dettCasellario';
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestDettCasellario),
		success : function(result) {
			console.log('success! ', result);
			if(result.status){
				var desc=result.data.dettCasellari.descrizione;
				$("#descr_tipo_istanza").append(desc);

				var lstPratiche =result.data.dettCasellari.elencoPratiche;
				for(var i=0; i<lstPratiche.length; i++){					
					addPraticaObj(lstPratiche[i]);
				}

			}else{
				showErrorMessage(true,result.message);
			}
			
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

function addPraticaObj(objPratica){

	var oldDataInsPraticaFormat = new Date(objPratica.dataInserimento);
	var oldDataAccettazioneRaccomandata = new Date(objPratica.dataAccettazioneRacc);
	tableDett.row.add( [
	      "<input type='checkbox' value='"+objPratica.idPratica +"'>",
	      objPratica.codiceRaccomandata,
	      oldDataInsPraticaFormat.toLocaleString(),
	      oldDataAccettazioneRaccomandata.toLocaleString(),
	      objPratica.codiceFrazionario
	 ] ).draw(false);
}