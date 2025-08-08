
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ page import="it.citel.postel.commonLib.constants.Constants"%>

<title>ADE</title>

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- jQuery -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/jquery/jquery.min.js"></script>

<!-- Moment Core JavaScript -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/moment/moment.js"></script>
<!-- Moment Language JavaScript -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/moment/it.js"></script>

<!-- jQuery DataTables-->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/jquery/jquery.dataTables.min.js"></script>

<!-- Bootstrap Core JavaScript -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/bootstrap.min.js"></script>

<!-- Bootstrap DataTables JavaScript -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/dataTables.bootstrap.min.js"></script>

<!-- Bootstrap Datepicker JavaScript -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/bootstrap-datetimepicker.min.js"></script>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/bootstrap-dialog.min.js"></script>

<!-- Metis Menu Plugin JavaScript -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/metisMenu/metisMenu.min.js"></script>

<!-- Custom Theme JavaScript -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/dist/js/sb-admin-2.js"></script>

<!-- Bootstrap WaitingFor -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/bootstrap-waitingfor.min.js"></script>

<!-- Bootstrap typeahead bundle -->	
<script 
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap3-typeahead/typeahead.bundle.js"></script>	

<!-- Bootstrap typeahead -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap3-typeahead/bootstrap3-typeahead.js"></script> 
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap3-typeahead/jquery.typeahead.js"></script>
<script charset="utf8"
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap3-typeahead/bootstrap3-typeahead.min.js"></script> 

<!-- Bootstrap DataTables Select ROW -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/dataTables.select.min.js"></script>

<!-- Bootstrap DataTables Select ROW -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/dataTables.select.min.js"></script>

<!-- Bootstrap bootstrapTable -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap-table/bootstrap-table.min.js"></script>
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap-table/bootstrap-table-it-IT.min.js"></script>


<!-- Sping.js -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/spin/spin.js"></script>

<!-- Sping.js -->
<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/bootstrap-checkbox.min.js"></script>


<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/dataTables.buttons.min.js"></script>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/buttons.flash.min.js"></script>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/jszip.min.js"></script>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/pdfmake.min.js"></script>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/vfs_fonts.js"></script>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/buttons.html5.min.js"></script>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/js/buttons.print.min.js"></script>
	
<script
	src="${pageContext.servletContext.contextPath}/resources/template/js/utils.js"></script>	

<!-- ++++++++++++++++++++++++++++++++++ CSS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- Bootstrap Core CSS -->
	<link rel="stylesheet" href="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap3-typeahead/jquery.typeahead.css">

<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">

<!-- Bootstrap Data table CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/css/dataTables.bootstrap.min.css"
	rel="stylesheet">

<!-- Bootstrap bootstrapTable CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap-table/bootstrap-table.min.css"
	rel="stylesheet" type="text/css">

<!-- Bootstrap Select CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/css/select.bootstrap.min.css"
	rel="stylesheet">

<!-- Bootstrap Datepicker CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/css/bootstrap-datetimepicker.min.css"
	rel="stylesheet">

<!-- MetisMenu CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/metisMenu/metisMenu.min.css"
	rel="stylesheet">

<!-- Custom CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/dist/css/sb-admin-2.css"
	rel="stylesheet">

<link
	href="${pageContext.servletContext.contextPath}/resources/template/custom/boostrap/menu.css"
	rel="stylesheet">

<!-- Morris Charts CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/morrisjs/morris.css"
	rel="stylesheet">

<!-- Custom Fonts -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">

<!-- Custom CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/custom/boostrap/custom.css"
	rel="stylesheet" type="text/css">

<!-- Custom CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/spin/spin.css"
	rel="stylesheet" type="text/css">

<!-- Bootstrap Data table button CSS -->
<link
	href="${pageContext.servletContext.contextPath}/resources/template/vendor/datatables/css/buttons.dataTables.min.css"
	rel="stylesheet">

<!-- context root dell'applicazione	 -->
<script type="text/javascript">
var spinner;
var spinning = false;
var transactionClick = false;
function toggleSpin(target){
    spinning ? spinner.stop() : spinner = new Spinner(opts).spin(target);  
    spinning = !spinning;
}
$( document ).ajaxError(function(event, xhr, settings, thrownError ) {
	  if(xhr.status === 403)
		  window.location.reload();
});
$( document ).ajaxSend(function() {
	$(".csv").attr("disabled",true);
	$(".printBarcode").attr("disabled",true);
	$(".button").attr("disabled",true);
	$(".btn").attr("disabled",true);
    toggleSpin(document.getElementById('spinnerContainer'));
	});
$( document ).ajaxComplete(function() {
	$(".csv").attr("disabled",false);
	$(".printBarcode").attr("disabled",false);
	$(".button").attr("disabled",false);
	$(".btn").attr("disabled",false);
    toggleSpin(document.getElementById('spinnerContainer'));
});

var contextPath='<%=request.getContextPath()%>';



var PREFIX_CODICE_SCATOLA = "<%=Constants.PREFIX_CODICE_SCATOLA%>";
var PREFIX_COD_SCATOLA_SOSP = "<%=Constants.PREFIX_COD_SCATOLA_SOSP%>";

var SCATOLA_APERTA = "<%=Constants.SCATOLA_APERTA%>";
var SCATOLA_CHIUSA = "<%=Constants.SCATOLA_CHIUSA%>";

var SCATOLA_ARCHIVIATA_TEMPORANEAMENTE = "<%=Constants.SCATOLA_PRONTA_PER_ARCHIVIAZIONE%>";

function isNumberKey(evt)
{
	return true;
	//****da risolvare il problema  su firefox il ctrl-v**/
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

    
	return true;
} 

function isNewNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
		return false;    
	return true;
} 

function loadLstTipIstanza(idObj,idTipoScatola) {
	//showLoaderLst(true,"Attendere!Caricamento lista Tipo Istanza in corso...");
	var url = contextPath + '/' + 'ricerche' + '/loadListTipologiaIstanzaPA';
	var request = {"data" : { "idTipoScatola" : idTipoScatola}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			
			console.log('success! ', result.data.listIstanza);
			var lst = result.data.listIstanza;
			$("#"+idObj).find('option').remove();
			$("#"+idObj).append("<option value=''>- Seleziona -</option>");
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
				$("#"+idObj).append(
						"<option value=" + obj.idIstanza + ">"
								+ obj.codiceTipoIstanza + "</option>");
			}
			//showLoaderLst(false,'');
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

function loadLstIdentificativoPA(idObj,idTipoScatola) {
	//showLoaderLst(true,"Attendere!Caricamento lista Identificativo PA in corso...");
	var url = contextPath + '/' + 'ricerche' + '/loadListIdentificativoPA';
	var request = {"data" : { "idTipoScatola" : idTipoScatola}};
	$.ajax({
		type : 'POST',
		url : url,
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(request),
		success : function(result) {
			
			console.log('success! ', result.data.listIdPA);
			var lst = result.data.listIdPA;
			$("#"+idObj).find('option').remove();
			$("#"+idObj).append("<option value=''>- Seleziona -</option>");
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
				$("#"+idObj).append(
						"<option value=" + obj.idAnagr + ">"
								+ obj.identificativoPA + "</option>");
			}
			//showLoaderLst(false,'');
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


function loadLstStato(idObj,tipo_entita) {
	//showLoaderLst(true,"Attendere!Caricamento lista Identificativo PA in corso...");
	var url = contextPath + '/' + 'ricerche' + '/loadLstStato';
	$.ajax({
		type: 'POST',
	    url: url,	    
	    dataType: 'json',
		data : { "tipoEntita": tipo_entita},		
		success : function(result) {			
			console.log('success! ', result.data);
			$("#"+idObj).find('option').remove();
			$("#"+idObj).append("<option value=''>- Seleziona -</option>");
			 $.each(result.data, function(value, desc) {				
				 $("#"+idObj).append(
	 						"<option value=" + value + ">"
	 								+ desc + "</option>");
			});
		
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			alert(error);
		}
	});
}

function loadLstCentriDemat(id) {
	//showLoaderLst(true,"Attendere!Caricamento lista Identificativo PA in corso...");
	var url = contextPath + '/' + 'ricerche' + '/getListCentriDemat';
	$.ajax({
		type: 'GET',
	    url: url,	    	
		success : function(result) {			
			console.log('success! ', result.data);
			var lst = result.data.listCentroDemat;
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
				$("#"+id).append(
						"<option value=" + obj.idCentroDemat + ">"
								+ obj.localita.toUpperCase() + "</option>");
		
			};
		
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			alert(error);
		}
	});
}

function openWin(idPrintableArea,widthIE,heightIE) {
	var myWindow = window.open('', '', 'width='+widthIE+',height='+heightIE);
	//myWindow.document.write($("#"+idPrintableArea).text());
	myWindow.document.write($("#"+idPrintableArea).html());

	myWindow.document.close();
	myWindow.focus();
	myWindow.print();
	myWindow.close();

}

function printWindow(idPrintableArea,widthIE,heightIE){
	$("#"+idPrintableArea).attr("style", "display:block");

	if (navigator.userAgent.indexOf('Trident') >= 0) { //se browser >= IE 11
		openWin(idPrintableArea,widthIE,heightIE);
    }else{
    	printElement(document.getElementById(idPrintableArea));
    }
}


function printElement(elem) {
	var domClone = elem.cloneNode(true);

	var $printSection = document.getElementById("printSection");

	if (!$printSection) {
		var $printSection = document.createElement("div");
		$printSection.id = "printSection";
		document.body.appendChild($printSection);
	}

	$printSection.innerHTML = "";
	$printSection.appendChild(domClone);
	window.print();
}


function loadLstCentriDematCodCentro(id) {
	//showLoaderLst(true,"Attendere!Caricamento lista Identificativo PA in corso...");
	var url = contextPath + '/' + 'ricerche' + '/getListCentriDemat';
	$.ajax({
		type: 'GET',
	    url: url,	    	
		success : function(result) {			
			console.log('success! ', result.data);
			var lst = result.data.listCentroDemat;
			for (var i = 0; i < lst.length; i++) {
				var obj = lst[i];
				$("#"+id).append(
						"<option value=" + obj.codiceCentro + ">"
								+ obj.localita.toUpperCase() + "</option>");
		
			};
		
		},
		error : function(xhr, status, error, result) {
			console.log('errore!');
			console.log('xhr ', xhr);
			console.log('status ', status);
			console.log('error ', error);
			console.log('result ', result);
			alert(error);
		}
	});
}


function showErrorMessage(show, message, suffix){
	if(suffix == undefined){
		suffix = '';
	}
	$('#danger_msg'+suffix).text(message);
	if(show){
		$('#div_error_alert'+suffix).show();	
	}else{
		$('#div_error_alert'+suffix).hide();		
	}
}

function showSuccessMessage(show, message, suffix){
	if(suffix == undefined){
		suffix = '';
	}
	$('#success_msg'+suffix).text(message);
	if(show){
		$('#div_success_alert'+suffix).show();	
	}else{
		$('#div_success_alert'+suffix).hide();		
	}
}
</script>

<input type="hidden" name="user" value="${sessionScope.user.username}" />
<!-- TODO aggiungere operatoreID in sessione da BackEnd -->
<input type="hidden" name="operatoreId" id="operatoreId" value="1"/>

<input type="hidden" name="postazione" id="postazione"
	value="${sessionScope.user.idPostazione}" />
<input type="hidden" name="centrodemat" id="centroDemat"
	value="${sessionScope.user.idCentroDemat}" />
<input type="hidden" name="descprofilo" value="${sessionScope.user.descrProfilo}" />

<!-- Morris Charts JavaScript -->
<!-- <script -->
<%-- 	src="${pageContext.servletContext.contextPath}/resources/template/vendor/raphael/raphael.min.js"></script> --%>
<!-- <script -->
<%-- 	src="${pageContext.servletContext.contextPath}/resources/template/vendor/morrisjs/morris.min.js"></script> --%>
<!-- <script -->
<%-- 	src="${pageContext.servletContext.contextPath}/resources/template/data/morris-data.js"></script>	 --%>
