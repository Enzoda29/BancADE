$(document).ready(function() {
	var transactionClick = false;
	$("#ricercaIdCliente").keypress(function(e) {		
		if(e.which == 13) {
			if(transactionClick) return;
			if(!e.currentTarget.value){
				transactionClick = true;				
				buildTable("", $("#codiceScatola").val());
			}
			
	    }		
	});
	
	$("#codiceScatola").keypress(function(e) {		
		if(e.which == 13) {
			if(transactionClick) return;		
			transactionClick = true;				
			buildTable($("#ricercaIdCliente").val(), $("#codiceScatola").val());		
			
	    }		
	});
	
	var $input = $("#ricercaIdCliente");	
	$input.typeahead({
	    source: function (query, process) {
	        return $.get(contextPath+'/restMaterialita/elencoClienti', { identificativoCliente: query}, function (data) {
	            return process(data.options);
	        });
	    },
	    updater:function (item) {
	    	buildTable(item, $("#codiceScatola").val());
	    	return item;
	    }
	});
	
	buildTable($("#ricercaIdCliente").val(), $("#codiceScatola").val());
	function buildTable(identificativo_cliente, codice_scatola){
		var url = contextPath + '/restMaterialita/dataTable?identificativoCliente='+identificativo_cliente+'&codiceScatola='+codice_scatola+'&_='+new Date().getTime();
	    $('#scatoleConformi').DataTable( {
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
	        	"type":"GET",
	            "dataSrc": function ( json ) {	                
	                transactionClick = false;
	                return json.data;
	            }       
	        },
	        "columns": [
	            { "data": "MACROSERV_CLIENTE_ID" },
	            { "data": "COD_CLIENTE" },
	            { "data": "IDENTIFICATIVO_CLIENTE" },
	            { "data": "CODIFICA_MACROSERVIZIO" },
	            { "data": "NOME_SERVIZIO" },
	            { "data": "TOT_SCATOLE_DA_RESTITUIRE" }
	        ]
	    } 
	    
	    );
	
	}
	
    
    
    $('#scatoleConformi tbody').on( 'dblclick', 'tr', function () {
    	var url = contextPath + '/restMaterialita/scatoleConformi/';
    	var macroservizio_client_id = $(this).find("td:eq(0)").text();  
    	var codice_scatola = $("#codiceScatola").val(); 
    	var id_cliente = $("#ricercaIdCliente").val();
    	if(!$(this).find("td:eq(1)").text())return;
    	location.href = url+macroservizio_client_id+"?id_cliente="+id_cliente+"&codice_scatola="+codice_scatola;
    });
} );
