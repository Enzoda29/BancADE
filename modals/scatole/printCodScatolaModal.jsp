
<div class="modal fade barcode" id="printCodScatolaModal" tabindex="-1"	role="dialog" aria-labelledby="exampleModalCenterTitle"	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content printable">
			<div class="modal-header" style="text-align: center">
				<h3 class="modal-title" id="modal-title">Stampa Barcode</h3>
			</div>
			
			
			<div class="modal-body" style="text-align: center" id="printableArea">
			<div id="bodyIframe">
			<form class="form-inline">
			<div class="row">
				<div class="form-group">
  					<label id="identificativoPaScatolaSelectedLabel" for="identificativoPaScatolaSelected">Identificativo PA: </label>
  					<div name="identificativoPaScatolaSelected" id="identificativoPaScatolaSelected" style="display:inline-block;"></div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
  					<label id="codiceIstanzaPaScatolaSelectedLabel" class="control-label">Codice Tipo Istanza: </label>
  						<div id="codiceIstanzaPaScatolaSelected" style="display:inline-block;"></div>
				</div>
			</div>
			
			<div class="row">
				<div class="form-group">
  					<label class="control-label">Tipo Scatola: </label>
  						<div id="descrizioneScatolaSelected" style="display:inline-block;"></div>
				</div>
			</div>
			</form>
			</div>
				<div class="row" style="text-align: center;">
					<div class="col-md-offset-1 " id="barCodeDiv">
<!-- 						<iframe  src="#" id="imgBcPrintScatola" name="imgBcPrintScatola" frameBorder="0" style="min-width: 400px"></iframe > -->
						
					</div>
					<div id="printableZone" class="col-md-offset-1 ">
						
					</div>
				</div>
			</div>

			<div class="modal-footer" style="text-align: center">
				<button type="button" id="printCodScatola" class="btn btn-primary printBarcode">Stampa</button>
				<button type="button" id="closeCodScatola" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>

		</div>
	</div>
</div>


<script type="text/javascript">
var iframe = null;
$(document).ready(function() {
	$('#printCodScatolaModal').on('show.bs.modal', function() {	
		loadBarcode();
	});
	
	
 	$("#printCodScatola").click(function() {
	
		if (/Edge\/\d./i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) { //se browser >= IE 11
			openWin("barCodeDiv",400,300);
	   	}else{
	   		//setto il body dell'iframe che andrò poi a stampare e applico lo stile
	   		 var eps = $('#bodyIframe').clone().html();
	   	        $('#pritableIframe').contents().find("body").prepend(eps);
	   	        $('#pritableIframe').contents().find("body").css({"marginLeft" : "200px"});
	   	        $("#pritableIframe").contents().find("title").text("");
	   	 		//stampa dell'iframe		    	 		
		 		window.frames["pritableIframe"].focus();
		 		window.frames["pritableIframe"].print();
		 		window.frames["pritableIframe"].close();
	   		
	   	}
		//pulizia
		$('#pritableIframe').empty();
	});
 	
	$( "#closeCodScatola" ).click(function() {
 		 $('#printableZone').empty();
	});
	
	//stampa per windows
	function openWin(idPrintableArea,widthIE,heightIE) {
		var myWindow = window.open('', '', 'width='+widthIE+',height='+heightIE);
		myWindow.document.write($('#bodyIframe').html());
		myWindow.document.write($("#"+idPrintableArea).html());

		myWindow.document.close();
		myWindow.focus();
		myWindow.print();
		myWindow.close();

	}
	
	function loadBarcode(){	
		//discrimino il browser nel quale mi ritrovo, nel caso in cui fossi su ie cambia il flusso
		if (/Edge\/\d./i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
		   	//creo il tag img
		    var imgTag = $('<img id="printableBarcode">'); 
		    $('#barCodeDiv').append(imgTag);
		    $('#printableBarcode').attr('src', contextPath+"/CreaBarcodeServlet?TEXT="+codiceScatolaSelected);	
		    setIntestazioneBarcode();
		}else{
			//chiamata ajax per gli altri browser
			var url = contextPath+"/CreaBarcodeServlet";
			$.ajax({
				type : 'GET',
				url : url,		
				cache:false,			
				data : {
					TEXT : codiceScatolaSelected
	            },  	  
	             xhr:function(){
	                 var xhr = new XMLHttpRequest();   
	                 xhr.responseType= 'blob'               
                 	 return xhr;
	             },
				success : function(blob) {
					console.log('success! ', blob);
					var iFrame = $('<iframe  src="'+img+'" id="imgBcPrintScatola" name="imgBcPrintScatola" frameBorder="0" style="min-width: 400px"></iframe>');
					$('#barCodeDiv').append(iFrame);
	 				var img = URL.createObjectURL(blob);
	 				$('#imgBcPrintScatola').attr('src', img);
					//faccio una copia dell'iframe che poi andrò a stampare 
	 				var printable = $('#imgBcPrintScatola').clone();
	 				printable.attr("id", "pritableIframe");
	 				printable.attr("name", "pritableIframe");
	 		        $('#printableZone').append(printable);
	 		        $('#pritableIframe').hide();
			        //setto l'intestazione dell'iframe
			        setIntestazioneBarcode();
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
		
		function setIntestazioneBarcode(){
			
			if(identificativoPaScatolaSelected!="null"){
	        	$('#identificativoPaScatolaSelectedLabel').css('display','inline-block');
	        	$('#identificativoPaScatolaSelected').css('display','inline-block');
	        	$('#identificativoPaScatolaSelected').text(identificativoPaScatolaSelected);  
	        }else{
	        	$('#identificativoPaScatolaSelected').css('display','none');
	        	$('#identificativoPaScatolaSelectedLabel').css('display','none');
	        }
	        if(codiceIstanzaPaScatolaSelected!="null"){
	        	$('#codiceIstanzaPaScatolaSelectedLabel').css('display','inline-block');
	        	$('#codiceIstanzaPaScatolaSelected').css('display','inline-block');
	        	$('#codiceIstanzaPaScatolaSelected').text(codiceIstanzaPaScatolaSelected);  
	        }else{
	        	$('#codiceIstanzaPaScatolaSelected').css('display','none');
	        	$('#codiceIstanzaPaScatolaSelectedLabel').css('display','none');
	        }
	       	 if(descrizioneScatolaSelected!="null"){
	        	$('#descrizioneScatolaSelected').show();
	        	$('#descrizioneScatolaSelected').text(descrizioneScatolaSelected);  
	        }else{
	        	$('#descrizioneScatolaSelected').hide();
	        }
		}
// 		var xhr = new XMLHttpRequest();
// 		xhr.open('GET', url+"?TEXT="+codiceScatolaSelected, true);
// // 		xhr.responseType = 'blob';
// 		xhr.onload = function(e) {
// 		  if (this.status == 200) {
// 			console.log('success! ', e.currentTarget.response);
// // 			var img = URL.createObjectURL(e.currentTarget.response);			

// 				if (/Edge\/\d./i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
// 				    // This is internet explorer 9 or 11
// 				    alert("Sei su un browser di merda");
// 				   // window.location = 'pages/core/ie.htm';
// 				    var imgTag = $('<img id="printableBarcode">'); //Equivalent: $(document.createElement('img'))
// 				    $('#barCodeDiv').append(imgTag);
// 				    $('#printableBarcode').attr('src', e.currentTarget.response);				    
// 				}else{
// // 					var iFrame = $('<iframe  src="'+img+'" id="imgBcPrintScatola" name="imgBcPrintScatola" frameBorder="0" style="min-width: 400px"></iframe ><hr>');
// // 				    $('#printableZone').append(iFrame);
// // // 					$('#imgBcPrintScatola').attr('src', img);
// // 					//faccio una copia dell'iframe che poi andrò a stampare 
// // 					var printable = $('#imgBcPrintScatola').clone();
// // 					printable.attr("id", "pritableIframe");
// // 					printable.attr("name", "pritableIframe");
// // 			        $('#printableZone').append(printable);
// // 			        $('#pritableIframe').hide();
// 				}
// 	        //setto l'intestazione dell'iframe
// 	        if(identificativoPaScatolaSelected!="null"){
// 	        	$('#identificativoPaScatolaSelectedLabel').css('display','inline-block');
// 	        	$('#identificativoPaScatolaSelected').css('display','inline-block');
// 	        	$('#identificativoPaScatolaSelected').text(identificativoPaScatolaSelected);  
// 	        }else{
// 	        	$('#identificativoPaScatolaSelected').css('display','none');
// 	        	$('#identificativoPaScatolaSelectedLabel').css('display','none');
// 	        }
// 	        if(codiceIstanzaPaScatolaSelected!="null"){
// 	        	$('#codiceIstanzaPaScatolaSelectedLabel').css('display','inline-block');
// 	        	$('#codiceIstanzaPaScatolaSelected').css('display','inline-block');
// 	        	$('#codiceIstanzaPaScatolaSelected').text(codiceIstanzaPaScatolaSelected);  
// 	        }else{
// 	        	$('#codiceIstanzaPaScatolaSelected').css('display','none');
// 	        	$('#codiceIstanzaPaScatolaSelectedLabel').css('display','none');
// 	        }
// 	       	 if(descrizioneScatolaSelected!="null"){
// 	        	$('#descrizioneScatolaSelected').show();
// 	        	$('#descrizioneScatolaSelected').text(descrizioneScatolaSelected);  
// 	        }else{
// 	        	$('#descrizioneScatolaSelected').hide();
// 	        }
			  
// 		  }
// 		};

// 		xhr.send();

	}

});
</script>