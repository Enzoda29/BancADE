var table = null;

$(document).ready(function() {
	
	 table = $('#riepilogo_normalizzazione').DataTable({
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
		  
	
	$("#handleColumnCheckBox").click(function(e) {
		console.log('handleColumnCheckBox');
		e.preventDefault();		
	    var column = table.column( $(this).attr('data-column') );	  
	    column.visible( ! column.visible() );
	    var labelButton=$("#handleColumnCheckBox").text();
	    if (column.visible()){
	    	$('#riepilogo_normalizzazione tr:has(th)').find('#checkAll').prop('checked', false);
            $('#riepilogo_normalizzazione tr:has(td)').find('input[type="checkbox"]').each(function() {
                $(this).prop('checked', false);
            });
	    }

	    if (labelButton=='Prendi in Carico'){
	    	$("#handleColumnCheckBox").text('Rilascia Presa in Carico');
	    	prendiInCarico();
	    }
	    if (labelButton=='Rilascia Presa in Carico'){
	    	$("#handleColumnCheckBox").text('Prendi in Carico');
	    	rilasciaPresaInCarico();
	    }
	    var isHidden = $("#normalizza").is(":hidden");
	    if(isHidden){
	    	$("#normalizza").removeClass("hidden");
	    }else{
	    	$("#normalizza").addClass("hidden");
	    }
		
	});
	
	$('#normalizzazioneModale_1').on('show.bs.modal', function() {		
		
	});
	
	$('#riepilogo_normalizzazione').on('click', '#checkAll', function() {
        var isChecked = $(this).prop("checked");
        $('#riepilogo_normalizzazione tr:has(td)').find('input[type="checkbox"]').prop('checked', isChecked);
    });

	$('#riepilogo_normalizzazione tbody').on('click', 'input[type="checkbox"]', function () {
		var isChecked = $(this).prop("checked");
        var isHeaderChecked = $("#checkAll").prop("checked");
        if (isChecked == false && isHeaderChecked)
            $("#checkAll").prop('checked', isChecked);
        else {
            $('#riepilogo_normalizzazione tr:has(td)').find('input[type="checkbox"]').each(function() {
                if ($(this).prop("checked") == false)
                    isChecked = false;
            });
            $("#checkAll").prop('checked', isChecked);
        }
    });

	$("#normalizza").click(function(e) {
        console.log('normalizza');
      
        var listSelectedRow = [];
        $('#riepilogo_normalizzazione tbody > tr').each(function() {
            var selectedRow = new Object();
            var pratica;
            var checkBoxTd = $(this).find('td:first-child').find('input:checkbox');
            if (!checkBoxTd.is(':checked')) {
                return true;
            }

            pratica = $(this).find('td:first-child').find('input:checkbox').val();
            listSelectedRow.push(pratica);
        });
        console.log('listSelectedRow: ' + listSelectedRow);
        var idCasellario = $('input[name="id_casellario"]').val();
    	var url = contextPath + '/' + 'normalizzazione' + '/normalizzazionePratiche';
    	console.log('normalizzazionePratiche '+url);
    	
        var username = $('input[name="user"]').val(); 
        var idPostazione = $('input[name="postazione"]').val();

    	var requestPratiche = { "data":{"username":username,"idPostazione":idPostazione,"identificativoCasellario": idCasellario,"listaPratiche":listSelectedRow}};
    	if (listSelectedRow.length>0){
    	$.ajax({
    		type : 'POST',
    		url : url,
    		contentType : 'application/json',
    		dataType : 'json',
    		data : JSON.stringify(requestPratiche),
    		success : function(result) {
    			console.log('success! ', result);
    			if(result.status){
    				var res=result.data;
					var lstPratiche =result.data.elencoPratiche;
    				var modalBarcode = $("#barcodeModale");
    				var dataCreazionePac = timeStamp(res.dataCreazionePacchetto);

    				//$("#imgBc").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+res.codicePacchetto);
    				if (/Edge\/\d./i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
    				   	//creo il tag img
    					var imgTag = $('<img id="printableBarcode">'); 
    				    $('#imgBc').append(imgTag);
    					$("#printableBarcode").attr("src",contextPath+"/CreaBarcodeServlet?TEXT="+res.codicePacchetto);
    				}else{
    					//chiamata ajax per gli altri browser
    					var url = contextPath+"/CreaBarcodeServlet";
    					$.ajax({
    						type : 'GET',
    						url : url,		
    						cache:false,			
    						data : {
    							TEXT : res.codicePacchetto
    			            },  	  
    			             xhr:function(){
    			                 var xhr = new XMLHttpRequest();   
    			                 xhr.responseType= 'blob'               
    		                 	 return xhr;
    			             },
    						success : function(blob) {
    							console.log('success! ', blob);
    							var iFrame = $('<iframe  src="" id="imgBcPrintScatola" name="imgBcPrintScatola" frameBorder="0" style="min-width: 400px"></iframe>');
    							$('#imgBc').append(iFrame);
    			 				var img = URL.createObjectURL(blob);
    			 				$('#imgBcPrintScatola').attr('src', img);
    							//faccio una copia dell'iframe che poi andrò a stampare 
    			 				var printable = $('#imgBcPrintScatola').clone();
    			 				printable.attr("id", "pritableIframe");
    			 				printable.attr("name", "pritableIframe");
    			 				$('<div id="printableZone"></div>').appendTo('#imgBcPrintScatola');
    			 		        $('#printableZone').append(printable);
    			 		        $('#pritableIframe').hide();		
    						},
    						error : function(xhr, status, error, result) {
    							console.log('errore!');
    							console.log('xhr ', xhr);
    							console.log('status ', status);
    							console.log('error ', error);
    							console.log('result ', result);
    							$('#danger_msg').text(error);
    							$('#div_error_alert').show();
    						}
    					});
    				}
    			
    		        $('input[name="codPacchetto"]').val(res.codicePacchetto);
    		        $('input[name="numero_buste"]').val(res.numeroPratiche);
    		        $('input[name="id_pa"]').val(res.identificativoPa);
    		        $('input[name="tipo_pra"]').val(res.codiceTipoIstanza);
    		        $('input[name="dt_crea"]').val(dataCreazionePac);
    		        $('#barcode_riepilogo tbody').remove();
    		        $("#barcode_riepilogo").append("<tbody>");
					for(var i=0; i<lstPratiche.length; i++){
		    			console.log('data ', lstPratiche[i].dataInserimento);
	    				var dataInsPraticaFormat = timeStamp(lstPratiche[i].dataInserimento);
						addRowTbBarcode(lstPratiche[i].codiceRaccomandata,dataInsPraticaFormat);
					}
    		        $("#barcode_riepilogo").append("</tbody>");
    		        $("#checkAll").prop('checked', false);
    				getDettCasellario(idCasellario);
    				findCasellario();
//    				$('#div_success_alert').show();
//    				$('#success_msg').text('Normalizzazione avvenuta correttamente!');
//    				$('#div_success_alert').addClass("fade show");
    				alert('Normalizzazione avvenuta correttamente!');

    				modalBarcode.modal({backdrop: 'static', keyboard: false}); 
    				modalBarcode.modal('show');
    			}else{
    				$('#danger_msg').text(result.message);
    				$('#div_error_alert').show();
    			}
    		
    		},
    	
    		error : function(xhr, status, error, result) {
    			console.log('errore!');
    			console.log('xhr ', xhr);
    			console.log('status ', status);
    			console.log('error ', error);
    			console.log('result ', result);
    			$('#danger_msg').text(error);
    			$('#div_error_alert').show();
    		}
    	});
    }
    	else
    		alert('Selezionare almeno una pratica da normalizzare')
    });
	

});	


function showButtons(){
	var column = table.column( $(this).attr('data-column') );	 
	var labelButton=$("#handleColumnCheckBox").text();
	var stato = $("#stato_casellario").val();
	if(stato == "1"){ //Aperto
		 column.visible(false);
		 $("#handleColumnCheckBox").text('Prendi in Carico');	
		 $("#normalizza").addClass("hidden");

	}else{ //In normalizzazione
		 column.visible(true);
		 $("#handleColumnCheckBox").text('Rilascia Presa in Carico');
		 $("#normalizza").removeClass("hidden");
	}	
    
    if (column.visible()){
    	$('#riepilogo_normalizzazione tr:has(th)').find('#checkAll').prop('checked', false);
        $('#riepilogo_normalizzazione tr:has(td)').find('input[type="checkbox"]').each(function() {
            $(this).prop('checked', false);
        });
    }
    
    table.draw();

}

function addRowTbBarcode(codiceRaccomandata,dataInserimento){
	var row="<tr><td>" + codiceRaccomandata +"</td>" +
			"<td>" + dataInserimento + "</td>" + 
			"</tr>";
	 $("#barcode_riepilogo").append(row);						    	
}


function prendiInCarico(){
    console.log('prendi in carico');
	var url = contextPath + '/' + 'normalizzazione' + '/lockPraticaCasellario';
	console.log('lockPraticaCasellario '+url);
	
    var idCasellario = $('input[name="id_casellario"]').val();
    var username = $('input[name="user"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime
//	console.log('idCasellario '+ idCasellario)

	var requestCasellario = { "data":{"identificativoCasellario": idCasellario,"username":username}};
	console.log('requestCasellario'+ requestCasellario)
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestCasellario),
		success : function(result) {
			console.log('success! ', result);
			if(result.status){
				var res=result.data;
			}else{
				showErrorMessage(true,result.message);
			}
			findCasellario();
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




function rilasciaPresaInCarico(){
    console.log('rilascia presa in carico');
	var url = contextPath + '/' + 'normalizzazione' + '/unlockPraticaCasellario';
	console.log('unlockPraticaCasellario '+url);
	
    var idCasellario = $('input[name="id_casellario"]').val();
    var username = $('input[name="user"]').val(); //TODO prelevare il parametro a runtime quando siamo a regime

	var requestCasellario = { "data":{"identificativoCasellario": idCasellario,"username":username}};

	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(requestCasellario),
		success : function(result) {
			console.log('success! ', result);
			if(result.status){
				
			}else{
				showErrorMessage(true,result.message);
			}
			findCasellario();
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


function trackingError(pratica){
	console.log('trackingError');
	var url = contextPath + '/' + 'tracking' + '/trackingError';
	//"OPERATORE"
	//"COD_RACCOMANDATA"
	//"COD_ID_PREADVISING"
	//"STATO_PRATICA"
	//"ID_PRATICA_PA"
	
    var username = $('input[name="user"]').val();
    var idPratica=pratica.idPratica;
    var codiceRaccomandata=pratica.codiceRaccomandata;
    var stato=pratica.stato;
    var codiceIdPreadv=pratica.codIdPreadvising;

    var request = {"data":{"codiceIdPreadv":codiceIdPreadv,"codiceRaccomandata":codiceRaccomandata,"idPratica": idPratica,"stato":stato,"username":username}};
	
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			console.log('success! ', result);			
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			$('#danger_msg').text(error);
			$('#div_error_alert').show();
		}
	});
	
}
