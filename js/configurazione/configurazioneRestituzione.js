var NUM_ROWS = 0;
var retListIndRest_GLOBAL = null;
var retProfileInitial_GLOBAL = null;
var aggregatoDIV = null; 
var columnsArrayTipoProdotto = null;
var spinner;
var spinning = false;
var target = null;

function toggleSpin(){
    spinning ? spinner.stop() : spinner = new Spinner(opts).spin(target);  
    spinning = !spinning;
}


$(document).ready(function() {

		$('#configurazioneRestituzioneModal').on('hidden.bs.modal', function () {

		$('#success_msg_upd_modal').text('');
		$('#div_success_alert_upd_modal').hide();	
		$('#confermaSalvaProfilo').prop('disabled', false);
	    
	})

	table = $('#tableGetRestProfile').DataTable({
		"paging": false,
		"ordering": false,
		"searching":  	false,
		"scrollX": false,
		"language": {
            "lengthMenu": "Mostra _MENU_ record per pagina",
            "zeroRecords": "Non sono stati trovati record",
            "info": "",
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
        columnDefs: [
           { className: "dt-head-center", targets: [ 0,1,2,3 ] },
           { className: "dt-body-center", targets: [ 0,1,2,3 ] }
        ]
		
	});

	$("#aggiungiAggregato").css('float', 'left');
	$("#salvaRestituzione").css('float', 'right');
	$( "#ricercaServizi" ).prop( "disabled", true );
	
	disableButtonsCercaProfilo(true);
	disableButtonAggreagatoSalva(true);
	
	loadListaClienti();
	
    $( "#ricercaClienti" ).change(function() {
    	
    	$( "#ricercaCodiceMacServ" ).prop( "disabled", true );
    	$( "#ricercaServizi" ).prop( "disabled", true );
    	
    	disableButtonAggreagatoSalva(true);
    	loadLstServiziRicerca();
    	
    	table.clear().draw(false);
    	$( "#profiloRestituzioneID" ).html( "" );
    	
    });
    
    $("#ricercaServizi").change(function() {
    	
    	disableButtonAggreagatoSalva(true);
    	
    	if ($("#ricercaServizi").val() == '') {
    		$( "#ricercaCodiceMacServ" ).prop( "disabled", true );
    		$("#ricercaCodiceMacServ").empty();
			return ; 
		}
    	findMacroserviziByClienteAndServizio();
    });
    
    
    $("#ricercaCodiceMacServ").change(function() {
    	if ($("#ricercaCodiceMacServ").val() == '') {
    		$("#caricaRestituzione").prop( "disabled", true );
		}else{
    	$("#caricaRestituzione").prop( "disabled", false );
		}
    });
    
    $("#caricaRestituzione").click(function() {
    	disableButtonsCercaProfilo(true);
    	NUM_ROWS = 0;
    	getCliRestProfileByMacroSid();
    });
    
	 $("#salvaRestituzione").click(function() {
		 var jsonForm = buildJson(); // json in string
   		 var jsonInput = JSON.stringify(retProfileInitial_GLOBAL);

   		var checkModifiche =  checkVariazioniDatiIniziali(jsonInput, jsonForm);
   		if(checkModifiche){
   			alertCstm("INFO","Non sono state apportate modifiche.");
   			return ; 
   		}
   		
   		var checkCampiComp = checkCampiCompilati();
   		
   		if(checkCampiComp == true){
			$("#configurazioneRestituzioneModal").modal({backdrop: 'static', keyboard: true});
			$("#configurazioneRestituzioneModal").modal('show');
   		}
		 
	 });
	 
	 $('#aggiungiAggregato').on('click', function(){
			
		 	var countElemMax = columnsArrayTipoProdotto.length;
			if(NUM_ROWS == countElemMax){
				alert("Raggiunto numero massimo di aggregati.");
				return ;
			}
			NUM_ROWS = NUM_ROWS +1;
			var rowID = "profile_desc_row"+NUM_ROWS;
			
			var id_obj = creaID(rowID, "#");
			var posizione= creaPosizione(rowID, "");
			var arrColumns = columnsArrayTipoProdotto;
			var prod = creaTipoProdottoDynamic(rowID,arrColumns);
			var tipoRestituzione = creaTipoRest(rowID, retListIndRest_GLOBAL);
			
			table.row.add( [
				id_obj,
				posizione,
				prod,
				tipoRestituzione,
			 ] ).draw(false);
			
			
			//disable list indRest  -- profile_desc_row<X>_tipoRest_restit_indirizzo
			var idIndRest = "profile_desc_row"+ NUM_ROWS+ "_tipoRest_restit_indirizzo";
			$('#'+idIndRest).val('');
			$('#'+idIndRest).attr("disabled", true);
		})
		
		 $("#confermaSalvaProfilo").click(function() {

			var jsonForm = buildJson(); // json in string

        	var jsonFormCleaned = cleanJsonOnlyRowTipoProdottoForSave(jsonForm);
			var saveret = save(jsonFormCleaned);
				
		 });
});//end ready

	function loadListaClienti() {
		
		$("#ricercaClienti").empty();
		showLoaderLst(true,"Attendere! Caricamento lista clienti in corso...");
		var url = contextPath + '/common/getComboClienti';
		$.ajax({
			type : 'GET',
			url : url,
			success : function(data) {
				var lst = data.data;
				console.log("lengt: " +lst.length);
				if(lst.length < 1){
					alert("Nessun servizio associato all'utente selezionato.");
				}else{
					$("#ricercaClienti").append("<option value=''> -- Seleziona un cliente -- </option>");
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#ricercaClienti").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
				}
				showLoaderLst(false,'');
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
	
    function loadLstServiziRicerca(){
    	
	    $("#ricercaServizi").empty();
    	$("#ricercaCodiceMacServ").empty();
    	
    	var idCliente = $( "#ricercaClienti" ).val();
    	if(idCliente == '' || idCliente == -1 ){
    		$( "#ricercaServizi" ).prop( "disabled", true );
    		return;
    	}
    	
    	showLoaderLst(true,"Attendere! Caricamento lista Servizi in corso...");
    	var url = contextPath + '/' + 'common/lstServiziByCliente';
    	$.ajax({
    		type : 'POST',
    		url: url,	
            dataType: 'json',
            data: { "idCliente": idCliente},
    		success : function(result) {
    			var lst = result.data;
    			if(lst.length < 1){
    				alert("Nessun servizio associato all'utente selezionato.");
    			}else{
    				$("#ricercaServizi").append("<option value=''> -- Seleziona -- </option>");
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#ricercaServizi").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
	    			$( "#ricercaServizi" ).prop( "disabled", false );
    			}
    			showLoaderLst(false,'');
    		},
    		error : function(xhr, status, error, result) {
    			console.log('errore!');
    			console.log('xhr ', xhr);
    			console.log('status ', status);
    			console.log('error ', error);
    			console.log('result ', result);
    			$('#danger_msg').text(error);
    			$('#div_error_alert').show();
    			showLoaderLst(false,'');
    		}
    	});
    }
	
	function findMacroserviziByClienteAndServizio(){
		showLoaderLst(true,"Attendere! Caricamento lista macroservizi in corso...");
		$("#ricercaCodiceMacServ").empty();
		
		var idCliente = $( "#ricercaClienti" ).val(); 
		var idServizio = $( "#ricercaServizi" ).val();
		var url = contextPath + '/common/getMacroservByCliAndServ';
		var request = {"data":{ "idCliente": idCliente, "idServizio": idServizio }}
		
		$.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
		 	success : function(data) {
				var lst = data.data;
				console.log("lengt: " +lst.length);
				if(lst.length < 1){
					alert("Nessun Macroservizio associato al cliente e servizio selezionato.");
				}else{
	    			$("#ricercaCodiceMacServ").append("<option value=''> -- Seleziona -- </option>");
	    			for (var i = 0; i < lst.length; i++) {
	    				var obj = lst[i];
	    				$("#ricercaCodiceMacServ").append(
	    						"<option value=" + obj.value + ">"
	    								+ obj.descrizione + "</option>");
	    			}
	    			$( "#ricercaCodiceMacServ" ).prop( "disabled", false );
				}
				showLoaderLst(false,'');
			},
				error : function(xhr, status, error, result) {
					alert("nessun macroservizio trovato");
					console.log('errore!');
					console.log('xhr ', xhr);
					console.log('status ', status);
					console.log('error ', error);
					console.log('result ', result);
					$('#danger_msg').text(error);
					$('#div_error_alert').show();
					showLoaderLst(false,'');
				}
			});
		
	}

	function findIndRestByCli(idCliente){
		
		var selectIndRest = "";
		var url = contextPath + '/common/getIndirizzoRestituzioneByCli';
		var request = {"data":{ "idCliente": idCliente }}
		 var ret = $.ajax({
			type : 'POST',
			url : url,
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(request),
			async:false,
		 	success : function(data) {
		 		var lst = data.data;
		 		var optionIndRest = '<option value=""> </option> ';
		 		if(lst.length > 0){
			 		for (var i = 0; i < lst.length; i++) {
			 			var objOpt = lst[i];
			 			optionIndRest = optionIndRest  + "<option value=" + objOpt.value + ">"+ objOpt.descrizione + "</option>";
			 		}
		 		}else{
		 			optionIndRest = '<option value="">  -- Nessun indirizzo trovato  -- </option> ';
		 		}
		 		
		 		selectIndRest = optionIndRest;
		 		disableButtonAggreagatoSalva(false);
		 		return selectIndRest;
		 	},
				error : function(xhr, status, error, result) {
					alert("nessun Indirizzo di restituzione trovato");
					console.log('errore!');
					console.log('xhr ', xhr);
					console.log('status ', status);
					console.log('error ', error);
					console.log('result ', result);
					$('#danger_msg').text(error);
					$('#div_error_alert').show();
	//				$('#azione').hide();
					waitingDialog.hide();
				}
			
			
			});
		return selectIndRest + '';
	}


	function showLoaderLst(show,message){
		$("#loadFields").text(message);
		$("#loadFields").attr("style",((show)?"display:''":"display:none"));
	}
	
	

	function getCliRestProfileByMacroSid(){
		
		waitingDialog.show('Elaborazione in corso...');
		
//		var ricercaServizi = $('#ricercaServizi').val();
		var idCliente = $('#ricercaClienti').val();
		
		var retListIndRest = findIndRestByCli(idCliente);
		retListIndRest_GLOBAL = retListIndRest;
		var idMacroServizio = $('#ricercaCodiceMacServ').val();
		
		var idServizio = $('#ricercaServizi').val();
		var url = contextPath + '/' + 'configurazione/restituzione/getCliRestProfileByMacroSid?idMacroservizio=' + idMacroServizio+'&idServizio=' + idServizio;
	//	var request = { "idMacroservizio": idMacroServizio };
		
		var idProfileText = '';
		table.clear().draw(false);
		$.ajax({
				type : 'GET',
				url : url,
				async: false,
	//			contentType : 'application/json',
	//			dataType : 'json',
	//			data : JSON.stringify(request),
				success : function(result) {
					console.log('success! ', result.data.rowContent);
					if(result.status){
						
						var lstDelivery =result.data.dataTable;
						var lstColumn =result.data.value.COLUMN;
						columnsArrayTipoProdotto = lstColumn;
						
						if(lstDelivery.length > 0){
							var id_profile = lstDelivery[0].CLIENTE_REST_PROFILE_ID;
							var macroserv_cliente_id = lstDelivery[0].MACROSERV_CLIENTE_ID;
							
//							retProfileInitial_GLOBAL = JSON.stringify(lstDelivery);
							retProfileInitial_GLOBAL =  lstDelivery;
							
							idProfileText = 'Profilo di restituzione: <b >'+ id_profile + '</b>';
							
							$('#cli_rest_profile_id').val(id_profile);
							$('#macroserv_cliente_id').val(macroserv_cliente_id);
							
						for(var i=0; i<lstDelivery.length; i++){
							buildRowsObj(lstDelivery[i], retListIndRest, idServizio, lstColumn);
						}
						}else{
							alertCstm('INFO', 'Nessun profilo di restituzione trovato per il macroservizio selezionato.');
							aggiungiAggregato();
							disableButtonAggreagatoSalva(false);
						}
						$('#profiloRestituzioneID').html(idProfileText);
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
		
		waitingDialog.hide();	
	}
	
function buildRowsObj(obj, listIndRest, idServizio, arrayColumn){
	
	NUM_ROWS = NUM_ROWS +1;
	var rowID = "profile_desc_row"+NUM_ROWS;
	
	var id_obj = creaID(rowID, obj.AGGREGATO_ID);
	
	var posizione= creaPosizione(rowID, obj.NOTE == 'undefined' || obj.NOTE ==null ?'':obj.NOTE);//posizione potrebbe essere vuota
	var prod = creaTipoProdottoDynamic(rowID, arrayColumn);
	var tipoRestituzione = creaTipoRest(rowID, listIndRest);
	
	var cliente_ind_rest_id = obj.CLIENTE_IND_REST_ID;
	
	table.row.add( [
		id_obj,
		posizione,
		prod,
		tipoRestituzione,
	 ] ).draw(false);
	
	
	//select tipo prodotto
//	profile_desc_row1_tipoProdotto_23L
	
	for (var i = 0; i < arrayColumn.length; i++) {
		
		var indexColumValue = replaceCharSpecialColumn(arrayColumn[i]);
		var idChec = rowID+'_tipoProdotto_'+indexColumValue;
		if(obj[arrayColumn[i]] == 1){
			$('#'+rowID+'_tipoProdotto_'+indexColumValue).attr("checked", true);
			}
	}
	
	$('#'+rowID+'_'+obj.NOME_DOCUMENTO).attr("checked", true); //TODO c'è ancora???

	var archiviazioneCostant = 		$('#archiviazioneCostant').val();
	var restituzioneCostant =       $('#restituzioneCostant').val();
	var archiv_presso_stabCostant = $('#archiv_presso_stabCostant').val();
	
	if(obj.TIPO_RESTITUZIONE_TYPE_ID == restituzioneCostant ){
		
		//profile_desc_row1_tipoRest_restit_indirizzo
		$('#'+rowID+'_tipoRest_restit_indirizzo').val(obj.CLIENTE_IND_REST_ID);
		//profile_desc_row1_tipo_rest
		$('#'+rowID+'_tipoRest_restit').attr("checked", true);
		
	}else{
		$('#'+rowID+'_tipoRest_restit_indirizzo').attr("disabled", true);
		if(obj.TIPO_RESTITUZIONE_TYPE_ID == archiviazioneCostant){
			$('#'+rowID+'_tipoRest_archiv').attr("checked", true);
		}else if(obj.TIPO_RESTITUZIONE_TYPE_ID == archiv_presso_stabCostant){
			$('#'+rowID+'_tipoRest_archStab').attr("checked", true);
		}
		
		
	}
	
}
	
	function creaID(id_root, aggregato_id){
		return '<h5 id="'+id_root+'_aggregato">'+aggregato_id+'</h5>';
	}
	
	function creaPosizione(id_root, valuePosizione){
		return '<input type="text" class="form-control col-lg-1" id="'+ id_root + '_posizione" value="'+valuePosizione +'" placeholder="Inserire una descrizione">';
	}
	
	function creaTipoProdottoDynamic(id_root, arrayColumn){
		
		var prefixName ="checkbox_name_tipoProdotto_";
		var prefixID = id_root + '_tipoProdotto_'; 
		
		var prod =  ' <div class="btn-group btn-group-toggle"  >'
			
			for (var i = 0; i < arrayColumn.length; i++) {
				var replaceCharSpec_ID =  replaceCharSpecialColumn(arrayColumn[i]);
				
//				var replaceCharSpec_ID = replaceAll( arrayColumn[i] ,' ', '');
//				replaceCharSpec_ID = replaceAll(  replaceCharSpec_ID ,'/', '_');
				var labelDiv = 
					'<label id="'+ arrayColumn[i]+ '-label" class="btn btn-link">'
				+ '     <input type="checkbox" name="'+prefixName + replaceCharSpec_ID + '" id="'+prefixID + replaceCharSpec_ID +'" autocomplete="on" onclick=\"tipoProdotto_event(event);\">'+arrayColumn[i] 
				+ '   </label>';
				prod = prod	+ labelDiv;
			}
			
		prod = prod + ' </div>';
		
		return prod;
	}
	
	function creaTipoProdotto(id_root){
		
		var prefixName ="checkbox_name_tipoProdotto_";
		var prefixID = id_root + '_tipoProdotto'; 
		
		var prod =  ' <div class="btn-group btn-group-toggle"  >'
		+ '   <label id="23L-label" class="btn btn-link">'
		+ '     <input type="checkbox" name="'+prefixName+'23L" id="'+prefixID+'_23L" autocomplete="on" onclick=\"tipoProdotto_event(event);\"> 23L'
		+ '   </label>'
		+ '   <label id="CAD-label" class="btn btn-link">'
		+ '     <input type="checkbox" name="'+prefixName+'CAD" id="'+prefixID+'_CAD" autocomplete="on" onclick=\"tipoProdotto_event(event);\"> CAD'
		+ '   </label>'
		+ '   <label id="CAN-label" class="btn btn-link">'
		+ '     <input type="checkbox" name="'+prefixName+'CAN" id="'+prefixID+'_CAN" autocomplete="on" onclick=\"tipoProdotto_event(event);\"> CAN'
		+ '   </label>'
		+ '   <label id="PMR-label" class="btn btn-link">'
		+ '     <input type="checkbox" name="'+prefixName+'PMR" id="'+prefixID+'_PMR" autocomplete="on" onclick=\"tipoProdotto_event(event);\"> PMR'
		+ '   </label>'
		+ '   <label id="PCG-label" class="btn btn-link">'
		+ '     <input type="checkbox" name="'+prefixName+'PCG" id="'+prefixID+'_PCG" autocomplete="on" onclick=\"tipoProdotto_event(event);\"> PCG'
		+ '   </label>'
		+ ' </div>';
		
		return prod;
	}
	
	function creaTipoRest(id_root, listIndRest){
		var divIndRest = "<select id='"+id_root+"_tipoRest_restit_indirizzo' class=\"form-control\">" +listIndRest + "</select>";
		
		var div  = "<div class=\"row\">			" + 
		"				<div class=\"col-lg-12 col-md-6\">" + 
		"							<label class=\"btn btn-link\">" + 
		"							<input type=\"checkbox\" name=\"checkbox_tipoRest\" id='"+id_root+"_tipoRest_archiv' autocomplete=\"on\" onclick=\"tipoResti_event(event);\">Archiviazione PI" + 
		"							</label>" + 
		"						</div>" + 
		"				" + 
		"</div>";
		
		return div;
	}

//profile_desc_row1_tipoRest_archiv
	function tipoResti_event(event){

		var id_obj = event.target.id;
		//profile_desc_row1_tipoRest_
		var partital_ID = id_obj.substring(0, 27);
		
		$('input[id*="'+partital_ID+'"]').not('#'+id_obj).prop('checked',false);
		
		if (id_obj.includes('tipoRest_restit') == true) {
//			$('#'+id_obj+'_indirizzo').val('');
			$('#'+id_obj+'_indirizzo').attr("disabled", false);
		} else {
			//profile_desc_row1_tipoRest_restit_indirizzo
			$('#'+partital_ID+'restit_indirizzo').val('');
			$('#'+partital_ID+'restit_indirizzo').attr("disabled", true);
		}
			$('#'+event.target.id).prop('checked',true);
	}

	function tipoProdotto_event(event){

		var id_obj = event.target.id;
		//profile_desc_row1_tipoRest_
		var partital_ID = id_obj.substring(17, id_obj.length);

		$('input[id*="'+partital_ID+'"]').not('#'+id_obj).prop('checked',false);
		$('#'+id_obj).prop('checked',true);
	}
	
	
	/*
	profile_desc_row1_aggregato
	profile_desc_row1_posizione

	profile_desc_row1_tipoProdotto_23L
	profile_desc_row1_tipoProdotto_CAD
	profile_desc_row1_tipoProdotto_CAN
	profile_desc_row1_tipoProdotto_PMR
	profile_desc_row1_tipoProdotto_PCG

	profile_desc_row1_tipoRest_archiv  --> profile_desc_row1_tipoRest_restit_indirizzo
	profile_desc_row1_tipoRest_restit
	profile_desc_row1_tipoRest_archStab
	*/
	function buildJson (){
		
		//fix: passare solo 
		var profiloRestituzioneID = 	$('#cli_rest_profile_id').val() == '' ?null:$('#cli_rest_profile_id').val();
		var archiviazioneCostant = 		$('#archiviazioneCostant').val();
		var restituzioneCostant =       $('#restituzioneCostant').val();
		var archiv_presso_stabCostant = $('#archiv_presso_stabCostant').val();
		
		var numRow = NUM_ROWS;
		var macroserv_cliente_id = $('#macroserv_cliente_id').val() == ''?$('#ricercaCodiceMacServ').val():$('#macroserv_cliente_id').val();
		 
		var jsonRet = '{"data":{"macroserv_cliente_id": ' + macroserv_cliente_id + ',"listProfile":[]}}'

//		var jsonRet =  '{"data":[]}';
		var obj = JSON.parse(jsonRet);
		for (var i = 1; i <= numRow ; i++) {
			
			var arrayColumn = columnsArrayTipoProdotto;
			var prefixID = 'profile_desc_row' + i + '_';
			var aggregato = $('#'+prefixID+'aggregato').text()!='#'?$('#'+prefixID+'aggregato').text():null;
			var posizione = $('#'+prefixID+'posizione').val();
			
			var jsonString = '{"listProfile" : {';
			for (var y = 0; y < arrayColumn.length; y++) {
				
				var idReplaced = replaceCharSpecialColumn(arrayColumn[y]);
				var temp = $('#'+prefixID+'tipoProdotto_'+idReplaced).is(':checked') == true?1:0;
				
					jsonString = jsonString + '"' + idReplaced + '" :' + temp + ',';
				
			}
			
			var tipo_restituzione_type_id = null;
//			profile_desc_row1_tipoRest_restit_indirizzo
			var restituzione_indirizzo_id = null;

			if($('#'+prefixID+'tipoRest_archiv').is(':checked')){
				
				tipo_restituzione_type_id = archiviazioneCostant;
				
			}else if($('#'+prefixID+'tipoRest_restit').is(':checked')){
				
				restituzione_indirizzo_id = $('#'+prefixID+'tipoRest_restit_indirizzo').val() == ''?null:$('#'+prefixID+'tipoRest_restit_indirizzo').val() ;
				tipo_restituzione_type_id = restituzioneCostant;
				
				}else if($('#'+prefixID+'tipoRest_archStab').is(':checked')){
					
					tipo_restituzione_type_id = archiv_presso_stabCostant;
				}
			
			
			jsonString = jsonString + '"' + "id" + '" : ' + profiloRestituzioneID + ','
									+ '"' + "aggregato_id" + '" : ' + aggregato + ','
									+ '"' + "note" + '" : "' + posizione + '" ,'
									+ '"' + "tipo_restituzione_type_id" + '" : ' + tipo_restituzione_type_id + ','
									+ '"' + "restituzione_indirizzo_id" + '" : ' + restituzione_indirizzo_id + '}}';
			
			
			
			
//			var jsontemp = {"listProfile" :{
//				
//				
//				
//				
//			}}
			
			console.log(jsonString);
			var parseJ = JSON.parse(jsonString);
			console.log(parseJ);
			obj.data['listProfile'].push(parseJ.listProfile);
					
					
			
//			obj.data['listProfile'].push({
//							  "id":profiloRestituzioneID,
//							  "aggregato_id":aggregato!='#'?aggregato:null,
//							  "note":posizione, 
//							  "tipoProdotto_23L": tipoProdotto_23L,
//							  "tipoProdotto_CAD": tipoProdotto_CAD,
//							  "tipoProdotto_CAN": tipoProdotto_CAN,
//							  "tipoProdotto_PMR": tipoProdotto_PMR,
//							  "tipoProdotto_PCG": tipoProdotto_PCG,
//							  "tipo_restituzione_type_id": tipo_restituzione_type_id,
//							  "restituzione_indirizzo_id": restituzione_indirizzo_id,
////							  "isChanged":false
//			});
			
		}
		
		jsonRet = JSON.stringify(obj);
		return jsonRet;
		
	}
	
	function alertCstm(title, msg){
		BootstrapDialog.show({
				type: BootstrapDialog.TYPE_DANGER,
			    size: BootstrapDialog.SIZE_NORMAL ,
	            title: title,
	            message: msg,
	            buttons: [{
	                label: 'OK',
	                cssClass: 'btn-primary',
	                action: function(dialog){
	                    dialog.close();
	                }
	            }]
	        });
	}

	//TODO verificare da qui
	//ritorna true se NON sono state apportate modifiche - false altrimenti
	function checkVariazioniDatiIniziali(jsonDB_toStr,jsonOutput_toStr){
		
			var objDB = JSON.parse(jsonDB_toStr);
			// nessun profilo esistente 
			if(objDB == null){
				return false;
			}
		
			var objFORM_data = JSON.parse(jsonOutput_toStr);
//			console.log(" jsonDB_toStr -->" + jsonDB_toStr);
//			console.log(" jsonOutput_toStr -->" + jsonOutput_toStr);
//			var objDB = jsonDB_toStr;
//			var objFORM_data =  jsonOutput_toStr;
			
			var objFORM = objFORM_data.data.listProfile;
//			var objFORM = objFORM_data.data;
			
			var arrayColumn = columnsArrayTipoProdotto;
			var indexDB = objDB.length  ;

			//verifica su righe da DB
			for (var i = 0; i < indexDB ; i++) {
	
				if(objDB[i].NOTE != objFORM[i].note){return false;}
		
				//verifica con column su tipo prodotto - dinamico
				for (var indCol = 0; indCol < arrayColumn.length ; indCol++) {
					
					var idColumnFORM = replaceCharSpecialColumn(arrayColumn[indCol]);

					var tipoPro_DB = objDB[i][arrayColumn[indCol]];
					var tipoPro_FORM = objFORM[i][arrayColumn[indCol]];
					if(tipoPro_DB != tipoPro_FORM){
						return false;
						}
				}
				
				var archiviazioneCostant = 		$('#archiviazioneCostant').val();
				var restituzioneCostant =       $('#restituzioneCostant').val();
				var archiv_presso_stabCostant = $('#archiv_presso_stabCostant').val();
				
				
				if(objDB[i].TIPO_RESTITUZIONE_TYPE_ID != objFORM[i].tipo_restituzione_type_id){
					return false;
					}else{
						
						if(objDB[i].TIPO_RESTITUZIONE_TYPE_ID == restituzioneCostant){
							console.log(objDB[i].CLIENTE_IND_REST_ID +' -- ' + objFORM[i].restituzione_indirizzo_id);
							if(objDB[i].CLIENTE_IND_REST_ID != objFORM[i].restituzione_indirizzo_id){
								return false;
							}
						}
					}
							
			}
			
			//aggiunto aggregato e senza valorizzare nulla 
			if( objFORM.length!= objDB.length){

				for (var i = indexDB; i < NUM_ROWS ; i++) {
					
					for (var indCol = 0; indCol < arrayColumn.length ; indCol++) {
						var tipoPro_FORM = objFORM[i][arrayColumn[indCol]];
						if(tipoPro_FORM == '1'){
							return false;
							}
					}
					
//						if(objFORM[i].tipoProdotto_23L == '1'){return false;}
//						if(objFORM[i].tipoProdotto_CAD == '1'){return false;}
//						if(objFORM[i].tipoProdotto_CAN == '1'){return false;}
//						if(objFORM[i].tipoProdotto_PMR == '1'){return false;}
//						if(objFORM[i].tipoProdotto_PCG == '1'){return false;}
					
				}
				
			} //end aggiunto aggregato
			
			return true;
	 	}
		
		//true se i campi compilati sono corretti - false altrimenti
		function checkCampiCompilati() {
		
			var numRow = NUM_ROWS;
		
			// VERIFICA checkbox_name_tipoProdotto_
			var flagTIPO_PROD = true;
			var nomeProdotto = '';
			//TODO non funziona con piu righe
			var arrayColumn = columnsArrayTipoProdotto;
			for (var y = 0; y < arrayColumn.length; y++) {
//				if(!flagTIPO_PROD)return false;			
				
				var idReplaced = replaceCharSpecialColumn(arrayColumn[y]);
				
				var countTipoProd = $('input[name=checkbox_name_tipoProdotto_'+idReplaced+']').filter(':checked').length;
				var nomeProdotto = arrayColumn[y];
				
				if(countTipoProd < 1){
					alertCstm("ATTENZIONE", "Tipo prodotto <b>" + nomeProdotto + "</b> non selezionato.");
					flagTIPO_PROD = false;
					return false;
					
				}
					
				
			}//end for
			
			//verifica tipo restituzione
			var flagOK = true;
			//se tipo prodotto non selezionato, non verificare e cheched=false tipo restituzione
			for (var i = 1; i <= numRow; i++) {
				
				//profile_desc_row4_tipoProdotto_PMR
				var countTipoProd = $('input[id*=profile_desc_row'+ i +'_tipoProdotto_]').filter(':checked').length;

				if(countTipoProd < 1){
					//disable list indRest  -- profile_desc_row<X>_tipoRest_restit_indirizzo
					//profile_desc_row2_tipoRest_restit
					var prefixID = 'profile_desc_row'+ i + '_';
					$('#' + prefixID + 'posizione').val('');
					$('input[id*=' + prefixID + 'tipoRest_]').prop('checked',false);
					$('#' + prefixID + 'tipoRest_restit_indirizzo').val('');
					
				}else{
				
					var countCheched = $('input[id*=profile_desc_row' + i + '_tipoRest_]').filter(':checked').length;
					
					if(countCheched < 1){
						alertCstm("ATTENZIONE","Tipo restituzione mancante alla riga "+ i + ".");
						flagOK = false;
						break;
					}else{
						if($('input[id=profile_desc_row' + i + '_tipoRest_restit]').filter(':checked').length == 1) {
	
								if ($("#profile_desc_row"+ i+ "_tipoRest_restit_indirizzo").val() == '') {
									alertCstm("ATTENZIONE","Indirizzo di restituzione mancante alla riga "+ i + ".");
									flagOK = false;
									break;
								}
						}
						
					}
			 }//end if else 		
			}//end for
			return flagOK;
				
			
		}
		
		
		function save(request){
	    	
//			waitingDialog.show('Richiesta salvataggio in corso...');
			toggleSpin();
	    	var url = contextPath + '/configurazione/restituzione/saveCliRestProfile';
	    	console.log(request);
	    	$.ajax({
		    		type : 'POST',
		    		url: url,	
		    		contentType : 'application/json; charset=utf-8',
        	        dataType: 'json',
        	        data: request,
        	        async: false,
	    		success : function(result) {
	    			waitingDialog.hide();	
	    			$('#confermaSalvaProfilo').prop('disabled', true);
	    			$('#success_msg_upd_modal').text(result.message);
					$('#div_success_alert_upd_modal').show(1000);	
					getCliRestProfileByMacroSid();
					toggleSpin();	
	    		},
	    		error : function(xhr, status, error, result) {
	    			console.log('errore!');
	    			console.log('xhr ', xhr);
	    			console.log('status ', status);
	    			console.log('error ', error);
	    			console.log('result ', result);
	    			$('#danger_msg').text(error);
	    			$('#div_error_alert').show();
	    			toggleSpin();	
	    		}
	    	});
	    	
			disableButtonAggreagatoSalva(true);
			toggleSpin();	
	    	readonlyAfterSave();
	    }
		
		/*
		 * Ritorna il json in formato stringa da persistere filtrato per tipo prodotto
		 */
		function cleanJsonOnlyRowTipoProdottoForSave (jsonToSave_toString){
			console.log('begin clean json form');
			var objSave = JSON.parse(jsonToSave_toString);
			
//			var jsonRet = '{"data":{"listProfile":[]}}';
			var macroserv_cliente_id = $('#macroserv_cliente_id').val() == ''?$('#ricercaCodiceMacServ').val():$('#macroserv_cliente_id').val();
			
//			var macroserv_cliente_id = $('#macroserv_cliente_id').val();
			var jsonRet = '{"data":{"macroserv_cliente_id": ' + macroserv_cliente_id + ',"listProfile":[]}}'
			
			var obj = JSON.parse(jsonRet);
			
			var objList = objSave.data.listProfile;
			console.log('objSave.data.listProfile');
			console.log(objSave.data.listProfile);
			
			var arrayColumn = columnsArrayTipoProdotto;
			for (var i = 0; i < NUM_ROWS ; i++) {
				
				//verifica se è selezionato tipo prodotto
				var checkTipoProd = false; //true se tipo prodotto è valorizzato - false altrimenti
				
				for (var y = 0; y < arrayColumn.length; y++) {
					var indexColumValue = replaceCharSpecialColumn(arrayColumn[y]);
					var valueListProf = objSave.data.listProfile[i][indexColumValue];
					
					if(valueListProf == 1){
						checkTipoProd = true;
						break;
					}
				}
				
//				if(    objSave.data.listProfile[i].tipoProdotto_23L == 1 
//					|| objSave.data.listProfile[i].tipoProdotto_CAD == 1 
//					|| objSave.data.listProfile[i].tipoProdotto_CAN == 1 
//					|| objSave.data.listProfile[i].tipoProdotto_PMR == 1 
//					|| objSave.data.listProfile[i].tipoProdotto_PCG == 1 ){
//					
//						checkTipoProd = true;
//				}
				
				if(checkTipoProd){
					
//					var map1 = new Map();
//					var arrayReq = [];
//					for (var indexCol = 0; indexCol < arrayColumn.length; indexCol++) {
//						var valueListProf = objSave.data.listProfile[i][arrayColumn[y]];
//						
//						if(valueListProf == 1){
//							map1.set(arrayColumn[y] , 1);
//							break;
//						}
//					}
					
					obj.data['listProfile'].push(objSave.data.listProfile[i]);
				}
			}
				
			jsonRet = JSON.stringify(obj);
			return jsonRet;
		}
		
		
		function aggiungiAggregato(){
			
			var countElemMax = columnsArrayTipoProdotto.length;
			if(NUM_ROWS == countElemMax){
				alert("Raggiunto numero massimo di aggregati.");
				return ;
			}
			NUM_ROWS = NUM_ROWS +1;
			var rowID = "profile_desc_row"+NUM_ROWS;
			var arrColumns = columnsArrayTipoProdotto;
			
			var id_obj = creaID(rowID, "#");
			var posizione= creaPosizione(rowID, "");
			var prod = creaTipoProdottoDynamic(rowID,arrColumns);
			var tipoRestituzione = creaTipoRest(rowID, retListIndRest_GLOBAL);
			
			table.row.add( [
				id_obj,
				posizione,
				prod,
				tipoRestituzione,
			 ] ).draw(false);
			
			
			//disable list indRest  -- profile_desc_row<X>_tipoRest_restit_indirizzo
			var idIndRest = "profile_desc_row"+ NUM_ROWS+ "_tipoRest_restit_indirizzo";
			$('#'+idIndRest).val('');
			$('#'+idIndRest).attr("disabled", true);
			
		}
		
		function disableButtonAggreagatoSalva(flagBoolean){
			$( "#aggiungiAggregato" ).prop( "disabled", flagBoolean );
			$( "#salvaRestituzione" ).prop( "disabled", flagBoolean );
		}
		
		function disableButtonsCercaProfilo(flagBoolean){
			$( "#ricercaServizi" ).prop( "disabled", true );
			$( "#ricercaCodiceMacServ" ).prop( "disabled", true );
			$("#caricaRestituzione").prop( "disabled", true ); 
			
		}
		
		function readonlyAfterSave(){
			$( "table[id=tableGetRestProfile] input" ).attr('disabled', true);
			
			$( "table[id=tableGetRestProfile] select" ).attr('disabled', true);
			//profile_desc_row5_tipoRest_restit_indirizzo
		}
		
		function replaceCharSpecialColumn(valueColumn){
			let ret = '';
			ret =  valueColumn;
			ret = ret.replace(/\s/g, "_");
			ret = ret.replace('/', "_");
			return ret;
			
		}
