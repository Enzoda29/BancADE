<%@ include file="../../pages/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ page import="it.citel.postel.commonLib.constants.PlicoConstants" %>
<%@ include file="../../pages/heads/head.jsp"%>
<link href="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/css/bootstrap-toggle.min.css" rel="stylesheet" />
<script src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/bootstrap-toggle.min.js"></script>
</head>
<body>

	<div id="wrapper">

		<!-- Navigation -->
		<nav class="navbar navbar-default navbar-static-top navbar-custom" role="navigation" style="margin-bottom: 0"> <%@ include
			file="../../pages/heads/header.jsp"%> <!-- /.navbar-top-links --> <%@ include file="../../pages/sidebar/sidebar.jsp"%>
		<!-- /.navbar-static-side --> </nav>

		<div id="page-wrapper">
			<div class="row">
				<div class="col-lg-12">
					<h3 class="page-header">Ricerca Plichi</h3>
				</div>
			</div>
			<div class="row">
<!-- 				<div class="col-lg-6"> -->
<!-- 					<div class="form-group"> -->
<!-- 						<fieldset> -->
<!-- 							<legend>Filtra per stato</legend> -->
<!-- 							<div> -->
<%-- 								<input type="checkbox" id="cbox_ProntoPerScansione" value="<%= PlicoConstants.PRONTO_PER_SCANSIONE %>" name="cBoxPlichi">  --%>
<!-- 								<label for="cbox_ProntoPerScansione">Pronto per la scansione</label> -->
<!-- 							</div> -->
<!-- 							<div> -->
<%-- 								<input type="checkbox" id="cbox_InScansione" value="<%= PlicoConstants.IN_SCANSIONE %>" name="cBoxPlichi">  --%>
<!-- 								<label for="cbox_InScansione">In scansione</label> -->
<!-- 							</div> -->
<!-- 							<div> -->
<%-- 								<input type="checkbox" id="cbox_Scansionato" value="<%= PlicoConstants.SCANSIONATO %>" name="cBoxPlichi">  --%>
<!-- 								<label for="cbox_Scansionato">Scansionato</label> -->
<!-- 							</div> -->
<!-- 							<div> -->
<%-- 								<input type="checkbox" id="cbox_Errore" value="<%= PlicoConstants.ERRORE %>" name="cBoxPlichi">  --%>
<!-- 								<label for="cbox_Errore">Errore</label> -->
<!-- 							</div> -->
<!-- 						</fieldset> -->
<!-- 					</div> -->
<!-- 				</div> -->
				<div class="col-lg-6">                
					<div class="form-group">
						<label>Identificativo cliente</label> 
						<input class="form-control" id="idCliente" placeholder="" onkeypress="">
					</div>
			    </div>
			    <div class="col-lg-12" style="padding: 0px;">
			        <div class="col-xs-6">
						<div class="form-group">
							<label>Codice Plico</label> 
							<input class="form-control" id="codPlico" placeholder="" onkeypress="">
						</div>
					</div>
					<div class="col-xs-6">
						<div class="form-group">
							<label>CodiceScatola</label> 
							<input class="form-control" id="codScatola" placeholder="" onkeypress="">
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12 col-md-12" style="text-align: center">
					<div class="panel-footer">
						<button type="button" id="cerca" class="btn btn-primary btn-sm btnFind">Cerca</button>
						<span style="margin:20px;"></span>
						<button type="button" id="reset"  class="btn btn-warning btn-sm btnFind">Reset</button>
					</div>
				</div>
			</div>
			
			<div class="row">
				<%@ include file="../components/bootrap_error_alerts.jsp"%></div>
			<div class="row">
				<%@ include file="../components/bootrap_success_alerts.jsp"%></div>
			
			<div class="row">
				<table id="tablePlichi" 
					data-toggle="table"
					data-toolbar="#toolbar-table" 
					data-side-pagination="server"
					data-pagination="true" 
					data-page-size="10"
					data-page-list="[5,10,20,50,100]" 
					data-show-refresh="false"
					data-show-toggle="false" 
					data-mobile-responsive="true"
					data-check-on-init="false" 
					data-click-to-select="true"
					data-show-columns="false" 
					data-sort-name="PLICO_ID"
					data-id-field="object_id" 
					data-sort-order="desc"
					data-show-fullscreen="false" 
					data-maintain-meta-data="false"
					class="table">
					<thead>
						<tr>
							<th data-field="<%= PlicoConstants.ID_PLICO.dataField() %>" data-sortable="true" label="<%=PlicoConstants.ID_PLICO.titleHTML()%>" data-visible="false"><%=PlicoConstants.ID_PLICO.columnHTML()%></th>
							<th data-field="<%= PlicoConstants.CODICE_PLICO.dataField() %>" data-sortable="true" label="<%=PlicoConstants.CODICE_PLICO.titleHTML()%>"><%=PlicoConstants.CODICE_PLICO.columnHTML()%></th>
<%-- 						<th data-field="<%= PlicoConstants.STATO.dataField() %>" data-sortable="true" label="<%=PlicoConstants.STATO.titleHTML()%>"><%=PlicoConstants.STATO.columnHTML()%></th> --%>
							<th data-field="<%= PlicoConstants.CODICE_CLIENTE.dataField() %>" data-sortable="true" label="<%=PlicoConstants.CODICE_CLIENTE.titleHTML()%>"><%=PlicoConstants.CODICE_CLIENTE.columnHTML()%></th>
							<th data-field="<%= PlicoConstants.TIPO_PRODOTTO.dataField() %>" data-sortable="true" label="<%=PlicoConstants.TIPO_PRODOTTO.titleHTML()%>"><%=PlicoConstants.TIPO_PRODOTTO.columnHTML()%></th>
							<th data-field="<%= PlicoConstants.TOTALE_DOCUMENTI.dataField() %>" data-sortable="true" label="<%=PlicoConstants.TOTALE_DOCUMENTI.titleHTML()%>"><%=PlicoConstants.TOTALE_DOCUMENTI.columnHTML()%></th>
							<th data-field="<%= PlicoConstants.CODICE_SCATOLA.dataField() %>" data-sortable="true" label="<%=PlicoConstants.CODICE_SCATOLA.titleHTML()%>"><%=PlicoConstants.CODICE_SCATOLA.columnHTML()%></th>
							<th data-field="<%= PlicoConstants.DATA_CREAZIONE.dataField() %>" data-sortable="true" label="<%=PlicoConstants.DATA_CREAZIONE.titleHTML()%>"><%=PlicoConstants.DATA_CREAZIONE.columnHTML()%></th>
							<th data-field="BUTTONS" data-sortable="false" label="Operazioni">Operazioni</th>
						</tr>
					</thead>
				</table>
			</div>
			<%@ include file="../modals/plichi/dettagliPlicoModal.jsp" %>
			<%@ include file="../modals/plichi/statiPlicoModal.jsp" %>
			<!-- /#page-wrapper -->
		</div>
		<script src="${pageContext.servletContext.contextPath}/resources/template/js/plichi/ricerca_plichi.js"></script>
</body>
</html>
