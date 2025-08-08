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
			"searchable" : false,
			 "paging": false
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
	$("#stampa").click(function(e) {
		//printWindow("printableArea",1000,1000);
	
	     var corpo = document.getElementById('printableArea').innerHTML;
	
	     // Apro una finestra pop-up nella quale inserisco i blocchi
	     var a = window.open('','','width=640,height=480');
	     a.document.open("text/html");
	     a.document.write("<html><head></head><body>");
	
	     // Scrivo il titolo e il corpo con un pò di stile in CSS
	     a.document.write("<div style='border: 1px solid #CCCCCC'></div><br/>"+corpo);
	     a.document.write("</body></html>");
	     a.document.close();
		 
	     // Invio il documento alla stampante
	    
	});
	/*
	$("#stampaMio").click(function(e) {
		
		var codicePicking = $("#codicePicking").val();
		console.log("sono il picking"+codicePicking);
		var url = contextPath + '/gestione/listaDistintaPerIlRecuperoPdf?codicePicking='+codicePicking;
    	console.log(url);
    	window.open(url);
	    
	});
	*/

	$("#aggiornaPicking").click(function() {
		waitingDialog.show('Caricamento in corso...', {dialogSize: 'sm', progressType: 'warning'});
		aggiornaPicking();
	});

	$("#closeModalStampa").click(function() {
		findDocumentiAnomali();
	});
	
//	aggiornaPicking(); TODO: perche qui????
	
	$("#stampaDistinta").click(function() {
		stampaListaDistintaPerIlRecuperoModal();
	});

});



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

//TODO: metodo che popola le table
function aggiornaPicking(codicePicking){
	
	//pulisciamo la modal prima di mostrarla
	$("#appendBody").html("&nbsp;");
	$("#imgBcDistintaPicking").attr("src","");
	
//	console.log('findDocumentiAnomali start');
	$("#codicePicking").val(codicePicking);
	
	var url = contextPath + '/'+'gestione'  + '/getStampaDistintaPerIlRecupero';
//	console.log('recuperoDocumentiAnomali : '+url);
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
					
					
				      var colDataField_1 = "codiceOggetto";
			    	  var colDataField_2 = "posizioneInScatola";
			    	  var colDataField_3 = "tipoAnomalia";
			    	  
			    	  var colName_1 = "ID";
			    	  var colName_2 = "Posizione";
			    	  var colName_3 = "Tipologia";
			    	  
					  var tr = '<th data-field="'+ colDataField_1 +'" data-sortable=\"true\" >'+ colName_1 +'</th>';
					  tr = tr +'<th data-field="'+ colDataField_2 +'" data-sortable=\"true\" >'+ colName_2 +'</th>';
					  tr = tr + '<th data-field="'+ colDataField_3 +'" data-sortable=\"true\" >'+ colName_3 +'</th>';
					  console.log("append tr : " + tr);
					
					//arrayData.push(["new", "99"]);
					  
//					var codiceScatolaGme_item = lstDistinta[0].codiceScatolaGme;
					var i_esima = 1;
					var dimList = lstDistinta.length;
					var jsonStr = '{"listDistinta":[]}';
					var dataTable = JSON.parse(jsonStr);
					var codiceScatolaGme_prev = lstDistinta[0].codiceScatolaGme;
					console.log("elemnti trovati" + dimList );
					for(var i=0; i< dimList; i++){
						//crea list di table
						
						var codiceScatolaGme_item =lstDistinta[i].codiceScatolaGme;
						var codiceScatolaGme_nextItem = codiceScatolaGme_item;
						if(i < dimList -1 ){
							codiceScatolaGme_nextItem = lstDistinta[i+1].codiceScatolaGme;
							console.log("codiceScatolaGme_nextItem i+1 -> " + codiceScatolaGme_nextItem );
						}
//						else{
//							codiceScatolaGme_nextItem = lstDistinta[i].codiceScatolaGme
//							console.log("codiceScatolaGme_nextItem i -> " + codiceScatolaGme_nextItem );
//						}  
						
						
						
						console.log("i" + i );
//						 if(codiceScatolaGme_item == codiceScatolaGme_nextItem && i < dimList -1 ){
						 if(codiceScatolaGme_item == codiceScatolaGme_nextItem && i < dimList -1 ){
							  dataTable['listDistinta'].push(lstDistinta[i]);
							  console.log("add record: " + JSON.stringify(lstDistinta[i]));
						  }else {
						
						
							  dataTable['listDistinta'].push(lstDistinta[i]);
						
						
						
						
						
						
						
						
						
//						console.log("lstDistinta[i]" + lstDistinta[i] );
//				    	  console.log("codiceScatolaGme_item=" + codiceScatolaGme_item + "--- lstDistinta[i].codiceScatolaGme= " + lstDistinta[i].codiceScatolaGme);
//				    	  console.log( codiceScatolaGme_item +" == "  + lstDistinta[i].codiceScatolaGme + " AND " + i +" == "  + dimList + " -1?"); 
//				    	  if(codiceScatolaGme_item == lstDistinta[i].codiceScatolaGme && i < dimList -1 ){
//							  dataTable['listDistinta'].push(lstDistinta[i]);
//							  console.log("add record: " + JSON.stringify(lstDistinta[i]));
//						  }else {
							  console.log( i +" == "  + dimList + " -1?"); 
//							  if(i == dimList -1){
//							  dataTable['listDistinta'].push(lstDistinta[i]);
//							  console.log("ULTIMO ELEMENTO INSERITO");
//							  }
							  console.log("Inizio creaz table....");
							  var nameTable = "table_"+ i_esima;
							  
							 var table_append = "<table id=\"" + nameTable +"\" data-toggle=\"table\" class=\"table table-hover\"><thead><tr></tr></thead></table>";
							 var title_append= "<h4 class=\"panel-title\">ID Scatola: <b>" + lstDistinta[i].codiceScatolaGme + "</b> - Codice Scatola: <b>" + lstDistinta[i].codiceScatola + "</b> - Codice Aggregato: <b>" + lstDistinta[i].aggregatoId + "</b></h4>";
							 var tag_append =  "<div class=\"panel panel-primary\">"
							             + "<div class=\"panel-heading\">" 
							             + title_append + "</div>"
							             + "<div class=\"panel-body\">" + table_append +"</div>";
							 		     + "</div>";
							  
							  
					    	  $("#appendBody").append(tag_append);
//					    	  console.log("tag_append : " + tag_append);
					    	  $("#"+ nameTable + " thead tr").append(tr);
					    	  $("#"+ nameTable + "").bootstrapTable();
							  $("#"+ nameTable + "").bootstrapTable('load', {data: dataTable.listDistinta});
//							  console.log("table created... records: " + dataTable.listDistinta.length);
							  console.log("json output: " + JSON.stringify(dataTable));
							  i_esima = i_esima + 1;
							  dataTable = JSON.parse(jsonStr);
							  
						  }
						  
//				    	  console.log("old GME -> " + codiceScatolaGme_item);
//				    	  codiceScatolaGme_item =lstDistinta[i].codiceScatolaGme;
//				    	  console.log("new GME -> " + codiceScatolaGme_item);
						  
						
						
						
						
						
						
						
						
//						if(codGma!=lstDistinta[i].codiceScatolaGme&&index==0){
//							$('#codiceScatolaGme1').text(lstDistinta[i].codiceScatolaGme);
//							$('#codiceScatola1').text(lstDistinta[i].codiceScatola);
//							codGma=lstDistinta[i].codiceScatolaGme;
//							index++;
//						}else if(codGma!=lstDistinta[i].codiceScatolaGme&&index==1){
//							$('#codiceScatolaGme2').text(lstDistinta[i].codiceScatolaGme);
//							$('#codiceScatola2').text(lstDistinta[i].codiceScatola);
//							codGma=lstDistinta[i].codiceScatolaGme;
//							index++;
//						}
//						if(index==1){
//							addDistinta1Obj(lstDistinta[i]);
//						}
//						if(index==2){
//							addDistinta2Obj(lstDistinta[i]);
//						}
				    	 
					}
					codiceScatolaSanabili=result.data.codiceScatolaSanabili;
					codiceScatolaNonSanabili=result.data.codiceScatolaNonSanabili;
					documentiScatolaSanabili=result.data.documentiScatolaSanabili;
					r=result.data.documentiScatolaNonSanabili;
					
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

function stampaListaDistintaPerIlRecuperoModal ( ){
	var codicePicking =  $("#codicePicking").val();
	var url = contextPath + '/gestione/listaDistintaPerIlRecuperoPdf?codicePicking='+codicePicking;
	console.log(url);
	window.open(url);
	
}
