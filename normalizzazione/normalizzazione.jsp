<%@ include file="../../pages/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%-- 	<%@ page import="it.citel.postel.commonLib.constants.DispacciCostants" %> --%>
<%@ include file="../../pages/heads/head.jsp"%>
<link href="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/css/bootstrap-toggle.min.css" rel="stylesheet" />
<script src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/bootstrap-toggle.min.js"></script>
<%-- 	<script	src="${pageContext.servletContext.contextPath}/resources/template/js/dispacci/dispacciDaPreaccettare.js"></script> --%>
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
					<h3 class="page-header">Normalizzazione</h3>
				</div>
				<!-- /.col-lg-12 -->
			</div>
			<div class="row">
				<div class="col-lg-6 col-md-12" style="text-align: center;">
					<div class="row col-lg-6">
						<div class="input-group">
							<input id="codiceOggettoSearch" type="text" class="form-control input-sm" placeholder="Inserisci Codice Oggetto"> <span
								class="input-group-btn">
								<button ctype="button" class="btn btn-primary btn-sm" id="cercaOggetto">Invia</button>
							</span>
						</div>
					</div>
					<div class="row col-lg-12">&nbsp;</div>
					<div class="row col-lg-12">
						<div class="alert alert-danger" id="div_error" style="display: none">
							<span id="alert_msg"></span>
						</div>
						<div class="alert alert-info" id="div_info" style="display: none">
							<span id="info_msg"></span>
						</div>
					</div>
				</div>
				<div class="col-lg-3 col-md-12">
					<div class="panel panel-warning" id="scatolaNC">
						<div class="panel-heading">
							<h3 class="panel-title">Non Conformi</h3>
						</div>
						<div class="panel-body">
							<p>
								Scatola: <b id="codiceScatolaNC"></b>
							</p>
							<p>
								Numero Documenti: <b id="numeroDocumentiNC" class="badge"></b>
							</p>
							<p>
								<button type="button" class="btn btn-primary btn-sm" id="dettaglioNC">Dettaglio</button>
							</p>
						</div>
					</div>
				</div>
				<div class="col-lg-3 col-md-12">
					<div class="panel panel-warning" id="scatolaANC">
						<div class="panel-heading">
							<h3 class="panel-title">Anomalie Non Conformi</h3>
						</div>
						<div class="panel-body">
							<p>
								Scatola: <b id="codiceScatolaANC"></b>
							</p>
							<p>
								Numero Documenti: <b id="numeroDocumentiANC" class="badge"></b>
							</p>
							<p>
								<button ctype="button" class="btn btn-primary btn-sm" id="dettaglioANC">Dettaglio</button>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div id="caselle"></div>
			</div>
			<div id="spinnerContainer" class="spinner"></div> 
			<script src="${pageContext.servletContext.contextPath}/resources/template/js/normalizzazione/normalizzazione.js"></script>
			<script src="${pageContext.servletContext.contextPath}/resources/template/js/ricerche/ricerca_scatola/ricerca_scatola.js"></script>
			<%@ include file="../../pages/modals/ricerche/dettaglioScatolaModal.jsp"%>
			<%@ include file="../../pages/modals/normalizzazione/tipoProdottoModal.jsp"%>
			<%@ include file="../../pages/modals/normalizzazione/confermaNonConformeModal.jsp"%>
			<%@ include file="../../pages/modals/normalizzazione/casellarioDetails.jsp"%>
			<%@ include file="../../pages/modals/normalizzazione/nonConformiDetails.jsp"%>
			<!-- /#page-wrapper -->
		</div>
</body>
</html>
