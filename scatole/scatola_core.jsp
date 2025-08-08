<%@ include file="../../pages/taglibs.jsp" %>
<%@ page import="it.citel.postel.commonLib.constants.Constants" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<%@ include file="../../pages/heads/head.jsp" %>
		<link href="${pageContext.servletContext.contextPath}/resources/template/custom/boostrap/scatole.css" rel="stylesheet" type="text/css">
    <script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/scatole.js"></script>

    
    <script type="text/javascript">
    	var ID_TIPO_SCATOLA = 1;
    	var ID_TIPO_SCATOLA_SOSPESI = 2;
    	var ID_TIPO_SCATOLA_SCARTI = 3;
    	var ID_TIPO_SCATOLA_ANOMALIE = 4;   
    	var ID_TIPO_SCATOLA_ANP = 5; 
    	
    	var labelTipoScatola = "${labelTipoScatola}";    	
    	var idTipoScatola =  ${idTipoScatola};
    	var prefix_sca = "${prefix_sca}";
    	
    	var STATO_SCATOLA_APERTA = "<%= Constants.SCATOLA_APERTA %>";
    	var STATO_SCATOLA_CHIUSA = "<%= Constants.SCATOLA_CHIUSA %>";
    	var STATO_SCATOLA_PRONTA_PER_ARCHIVIAZIONE = "<%= Constants.SCATOLA_PRONTA_PER_ARCHIVIAZIONE %>";
    	var STATO_SCATOLA_IN_ARCHIVIAZIONE = "<%= Constants.SCATOLA_IN_ARCHIVIAZIONE %>";
    	var STATO_SCATOLA_SOSPESA_DA_ACCETTARE = "<%= Constants.SCATOLA_SOSPESA_DA_ACCETTARE %>";
    	var STATO_SCATOLA_IN_ACCETTAZIONE =  "<%= Constants.SCATOLA_IN_ACCETTAZIONE %>";
<%--     	var STATO_SCATOLA_SPEDITA = "<%= Constants.SCATOLA_SPEDITA %>"; --%>
    	var STATO_SCATOLA_SPEDITA = "";
    	var STATO_SCATOLA_ACCETTATA = "<%= Constants.SCATOLA_ACCETTATA %>";
    	var STATO_SCATOLA_PRONTA_PER_SPEDIZIONE = "<%= Constants.SCATOLA_PRONTA_PER_SPEDIZIONE %>";
    	var STATO_SCATOLA_ARCHIVIATA  = "<%= Constants.SCATOLA_ARCHIVIATA %>";
    	
    	var NO_PREADVISING_ACCETTATO = <%= Constants.NO_PREADVISING_ACCETTATO %>;
        var NO_PREADVISING_NON_ACCETTATO = <%= Constants.NO_PREADVISING_NON_ACCETTATO %>;
    </script>
    <c:set var="ID_TIPO_SCATOLA" value="<%= Constants.ID_TIPO_SCATOLA %>"/>
    <c:set var="ID_TIPO_SCATOLA_SOSPESI" value="<%= Constants.ID_TIPO_SCATOLA_SOSP%>"/>
    <c:set var="ID_TIPO_SCATOLA_ANOMALIE" value="<%= Constants.ID_TIPO_SCATOLA_ANOMALIE%>"/>
    <c:set var="ID_TIPO_SCATOLA_SCARTI" value="<%= Constants.ID_TIPO_SCATOLA_SCARTI%>"/>
    <c:set var="ID_TIPO_SCATOLA_ANP" value="<%= Constants.ID_TIPO_SCATOLA_ANP%>"/>
</head>
<body>

	<div id="wrapper">
		<!-- Navigation -->
		<nav class="navbar navbar-default navbar-static-top navbar-custom" role="navigation"
			style="margin-bottom: 0">
		<%@ include file="../../pages/heads/header.jsp" %>
		<!-- /.navbar-top-links -->
		<%@ include file="../../pages/sidebar/sidebar.jsp" %>
		<!-- /.navbar-static-side --> </nav>

		<div id="page-wrapper">
			<div class="row">
				<div class="col-lg-12">	
							
					<h1 class="page-header"><i class="fa fa-dropbox fa-1x"></i>	Gestione Scatole ${labelTipoScatola}</h1>
				</div>
				<!-- /.col-lg-12 -->
			</div>
			<div class="col-lg-12 col-md-12" style="text-align: center">
				<div>
                     <button type="button" id='creaCodScatola' class="btn btn-primary" style="display: none">Crea Codice Scatola</button>
                     <button type="button" id='apriScatola' class="btn btn-primary">Crea Scatola</button>
                      <c:if test="${(idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE)}" >
                      <button type="button" id='btnAddPraticheAnomalie' class="btn btn-primary">Aggiungi Pratiche</button>
                      </c:if>
                     <c:if test="${(idTipoScatola == ID_TIPO_SCATOLA)}" >
                      <button type="button" id='btnAddPacchetto' class="btn btn-primary">Aggiungi Pacchetto</button>
                      </c:if>
                     <c:if test="${(idTipoScatola == ID_TIPO_SCATOLA_SOSPESI)}" >
                    	 <button type="button" id='btnAccettazioneSospesi' class="btn btn-primary">Accettazione Sospesi</button>
                     </c:if>
                </div>
                <hr>
            </div>
			<div class="row">
				<div class="col-lg-4 col-md-6">
					<div class="form-group">
						<label>Stato</label> 
						<select class="form-control" id="statoSearch">
							<option value="<%= Constants.SCATOLA_APERTA %>">Aperta</option>
							<option value="<%= Constants.SCATOLA_CHIUSA %>">Chiusa</option>
							<c:if test="${(idTipoScatola == ID_TIPO_SCATOLA_SOSPESI) or (idTipoScatola == ID_TIPO_SCATOLA_ANP)}">
								<option value="<%= Constants.SCATOLA_SOSPESA_DA_ACCETTARE %>">Sospesa da Accettare</option>
	                            <option value="<%= Constants.SCATOLA_IN_ACCETTAZIONE %>">In Accettazione</option>
	                            <option value="<%= Constants.SCATOLA_ACCETTATA %>">Accettata</option>
                            </c:if>
                            <c:if test="${(idTipoScatola == ID_TIPO_SCATOLA) or (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE)  or (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)}" >
                            	<option value="<%= Constants.SCATOLA_PRONTA_PER_ARCHIVIAZIONE %>">Pronta per archiviazione</option>
                            	<option value="<%= Constants.SCATOLA_IN_ARCHIVIAZIONE %>">In archiviazione</option>
	                            <option value="<%= Constants.SCATOLA_PRONTA_PER_SPEDIZIONE %>">Pronta per spedizione</option>
	                            <option value="<%= Constants.SCATOLA_ARCHIVIATA %>">Archiviata</option>
                            </c:if>
<%--                             <option value="<%= Constants.SCATOLA_SPEDITA %>">Spedita</option> --%>
                            <option value="= Constants.SCATOLA_SPEDITA %>">Spedita</option>
						</select>
					</div>
				</div>
				<c:if test="${(idTipoScatola == ID_TIPO_SCATOLA_SOSPESI) or (idTipoScatola == ID_TIPO_SCATOLA_ANP)}">
					<div class="col-lg-4 col-md-6">
						<div class="form-group">
							<label>Tipo Scatola</label> 
							<select class="form-control" id="tipoScatolaSearchSOS_ANP">
								<option value="<%= Constants.ID_TIPO_SCATOLA_SOSP %>">Scatola Sospesa</option>
								<option value="<%= Constants.ID_TIPO_SCATOLA_ANP %>">Scatola ANP</option>
							</select>
						</div>
					</div>
				</c:if>
				<c:if test="${(idTipoScatola == ID_TIPO_SCATOLA) or (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE)  or (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)}" >
					<div class="col-lg-4 col-md-6">
						<div class="form-group">
							<label>Identificativo PA</label> 
							<select id="identificativoPASearch" class="form-control is-valid"></select>
					
						</div>
					</div>
					<div class="col-lg-4 col-md-6">
						<div class="form-group">
							<label>Tipologia Istanza</label> 
							 <select id="codiceTipoIstanzaSearch" class="form-control is-valid"> </select>

						</div>
					</div>
				</c:if>
				<div class="col-lg-4 col-md-6">
					<div class="form-group">
						<label>Codice Raccomandata </label> 
						<input class="form-control" id="codiceRaccomandataSearch" onkeypress="return isNumberKey(event)" >
						<!-- 					<p class="help-block">Example block-level help text here.</p> -->
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="form-group">
						<label>Data Accettazione DA</label>
						<div class='input-group date' id='divDataAccDA'>
							<input type='text' class="form-control" id="dataAccettazioneDaSearch" /> 
							<span
								class="input-group-addon"> <span
								class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="form-group">
						<label>Data Accettazione A</label>
						<div class='input-group date' id='divDataAccA'>
							<input type='text' class="form-control" id="dataAccettazioneASearch"/> <span
								class="input-group-addon"> <span
								class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="form-group">
						<label>Data Caricamento DA</label>
						<div class='input-group date' id='divDataCarDA'>
							<input type='text' class="form-control" id="dataCaricamentoDaSearch"/> <span
								class="input-group-addon"> <span
								class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="form-group">
						<label>Data Caricamento A</label>
						<div class='input-group date' id='divDataCarA'>
							<input type='text' class="form-control" id="dataCaricamentoASearch"/> <span
								class="input-group-addon"> <span
								class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="form-group">
						<label>Codice Scatola </label> 
						<input class="form-control" id="codiceScatolaSearch" >
					</div>
				</div>
				<c:if test="${(idTipoScatola == ID_TIPO_SCATOLA) }">
				<div class="col-lg-4 col-md-6">
					<div class="form-group">
						<label>Codice Pacchetto </label> 
						<input class="form-control" id="codicePacchettoSearch">
					</div>
				</div>
				</c:if>

			</div><!-- end row -->
			<div class="row">
				<div class="col-lg-12 col-md-12" style="text-align: center">
					<div class="panel-footer">
                           <button type="button" id='findScatole' class="btn btn-warning btn-sm btnFind">Cerca</button>
                       </div>
                   </div>
			</div>
			<div class="row">
				<%@ include file="../../pages/components/bootrap_error_alerts.jsp"%>
				<%@ include file="../../pages/components/bootrap_success_alerts.jsp"%>
			</div>

          <div class="row"> 
               	<div class="col-lg-12 col-md-12" style="text-align: left"> 
				<button type="button" id="esportaCSV"
					class="btn btn-outline btn-success" data-toggle="tooltip"
					data-placement="top" title="Esporta CSV"
					data-original-title="Esporta CSV">
					<i class="fa fa-file-text-o"> CSV</i>
				</button>
				</div>
		  </div>
			<div class="row">
				<table id="tableScatola" 
                   		 data-toggle="table"
	                   data-toolbar="#toolbar-table"
					   data-side-pagination="server"
	                   data-pagination="true"
	                   data-page-size="10"
	                   data-page-list="[10, 20, 50, 100]"
	                   data-show-refresh="false"
	                   data-show-toggle="false"
	                   data-mobile-responsive="true"
					   data-check-on-init="true"
					   data-click-to-select="true"
	                   data-show-columns="false"                    
	                   data-sort-name="codice_scatola"
	                   data-id-field="object_id"
	                   data-sort-order="desc"
	                   class="table-hover">
						<thead>
							<tr>
								<th data-field="id_scatola" data-visible="false">IdScatola</th>
								<th data-field="stato_scatola" data-visible="false">StatoScatola</th>
								<th data-field="codice_scatola" data-sortable="true" >Codice Scatola</th>
								<th data-field="data_creazione" data-sortable="true" >Data Creazione</th>
								<th data-field="data_chiusura" data-sortable="true" >Data Chiusura</th>
								<th data-field="descrizione_stato" data-sortable="true" >Stato</th>
								<%-- <c:if test="${(idTipoScatola == ID_TIPO_SCATOLA) or (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE)  or (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)}" > --%>
									<th data-field="identificativo_pa" data-sortable="true" data-visible="${(idTipoScatola == ID_TIPO_SCATOLA) or (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE)  or (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)}">Identificativo Pa</th>						
									<th data-field="codice_tipo_istanza" data-sortable="true" data-visible="${(idTipoScatola == ID_TIPO_SCATOLA) or (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE)  or (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)}">Tipologia Istanza</th>	
								<%-- </c:if>			 --%>				
								<th data-field="num_max_pratiche" data-sortable="true" >Num Max Pratiche</th>
								<th data-field="num_pratiche_inserite" data-sortable="true" >Num Pratiche Ins.</th>
								<th data-field="data_accettazione" data-sortable="false" >Data Accettazione</th>
								<th data-field="data_accettazione_up" data-sortable="false" >Data Accettazione UP</th>
								<th data-field="action" style="min-width: 1px"></th>
							</tr>
						</thead>
					</table>
				
				<%-- <table class="table table-striped table-bordered" id="tableScatole">
                	<thead>
						<tr>
							<th>Idscatola</th>
							<th>Codice Stato</th>
							<th>Codice scatola</th>
							<th>Data creazione</th>
							<th>Stato</th>
							<c:if test="${(idTipoScatola == ID_TIPO_SCATOLA) or (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE)  or (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)}" >
								<th>IdentificativoPA</th>
								<th>Tipologia Istanza</th>
							</c:if>
							<th>Num. Max Pratiche</th>
							<th>Num. Pratiche Ins.</th>

							<th>Data Accettazione</th>
							<th>Data Accettazione UP</th>
								<th></th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table> --%>
					
			</div>
		<div id="spinnerContainer" class="spinner"></div>
		</div>
		<%@ include file="../../pages/modals/scatole/printCodScatolaModal.jsp" %>
		
		<%@ include file="../../pages/modals/scatole/apriScatolaModal.jsp" %>
		
		<%@ include file="../../pages/modals/scatole/dettScatolaModal.jsp" %>
		
		<%@ include file="../../pages/modals/scatole/distintaScatolaModal.jsp" %>

		<!-- /#page-wrapper -->
	</div>
</body>
</html>
