$(document).ready(function() {	
	
	ajaxCallGet(contextPath+'/archiviazione/elencoTipiDoc', {microservizioClientId:$('#macroservizio_client_id').val()}, onSuccessElencoTipiDoc, errorCallback);	
	ajaxCallGet(contextPath+'/archiviazione/elencoAggregati', "", onSuccessElencoAggregati, errorCallback);
	
	function onSuccessElencoAggregati(result){
//		console.log(data.data);
		$("#aggregato").append("<option value=''> Seleziona Aggregato</option>");
		 $.each(result.data, function(value, desc) {				
			 $("#aggregato").append(
					 "<option value=" + desc.AGGREGATO_ID + ">"
						+ desc.AGGREGATO_ID + "</option>");
		});		
	} 
	function onSuccessElencoTipiDoc(result){
//		console.log(data.data);
		$("#nomeDocumento").append("<option value=''> Seleziona Nome Documento</option>");
		 $.each(result.data, function(value, desc) {				
			 $("#nomeDocumento").append(
					 "<option value=" + desc.TIPO_DOC_ID + ">"
						+ desc.NOME_DOCUMENTO + "</option>");
		});		
	}
	function errorCallback(err){
		console.log(err);
	}
	
	$("#nomeDocumento").change(function(){
		console.log($(this).val());
		buildTable($(this).val(),$("#aggregato").find('option:selected').val());	
		
	});
	
	$("#aggregato").change(function(){
		console.log($(this).val());
		buildTable($("#nomeDocumento").find('option:selected').val(), $(this).val());			
	});
	
	
	buildTable("","");
	function buildTable(tipo_doc_id, aggregato_id){
		var url = contextPath + '/archiviazione/dataTable/details?aggregato='+aggregato_id+'&tipo_doc_id='+tipo_doc_id+'&macroservizio_client_id='+$('#macroservizio_client_id').val()+'&_='+new Date().getTime();
	    $('#dettaglio_scatole_archiviabili').DataTable( {
	    	"destroy": true,
	    	"searching": false,    
	    	"lengthChange": false,
	    	"info": false,
	    	"language": {
	    		"paginate":{
	    			"next":"Prossima",
	    			"previous":"Precedente",
	    			"first":"Prima",	
	    			"last":"Ultima"
	    		} 
	    	},
	        "ajax": {
	        	"url":url,
	        	"type":"GET"
	        },
	        "columns": [
	            { "data": "AGGREGATO_ID" },
	            { "data": "CODICE_SCATOLA" },
	            { "data": "NOME_DOCUMENTO" }
	        ]
	    } );
	}

} );

function historyBack(idCliente, codiceScatola){
	var url = contextPath + '/archiviazione?';
	location.href = url+"idCliente="+idCliente+"&codiceScatola="+codiceScatola;
}
