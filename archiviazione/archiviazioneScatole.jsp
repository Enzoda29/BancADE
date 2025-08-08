<!DOCTYPE html>
<%@ include file="../../pages/taglibs.jsp" %>
<html>
<head>
	<%@ include file="../../pages/heads/head.jsp" %>

	<script	src="${pageContext.servletContext.contextPath}/resources/template/js/archiviazione/scatoleArchivio.js"></script>
	
	
</head>
<style>
#scatoleConformi tbody tr {
	cursor: pointer;
}

.dropdown-menu {
  position:relative;
  width:100%;
  top: 0px !important;
    left: 0px !important;
}

</style>
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
					<h3 class="page-header">Scatole Archiviabili</h3>
				</div>
				<!-- /.col-lg-12 -->
			</div>
			<div class="col-lg-12">
		    <div class="panel panel-default">
		        <div class="panel-heading">
		            Filtro di Ricerca
		        </div>
		        <div class="panel-body">
		            <div class="row">
		
		                <div class="col-lg-4 col-md-6">
		                    <div class="form-group">
		
		                        <label>Identificativo Cliente</label>
		                        <input type="text" class="form-control" id="ricercaIdCliente" placeholder="ricerca con cliente" class="typeahead" value="${idCliente}">
		                    </div>
		                </div>	
		                <div class="col-lg-4 col-md-6 col-md-offset-4">
		                    <div class="form-group">
		
		                        <label>Codice Scatola</label>
		                        <input type="text" class="form-control" id="codiceScatola" placeholder="ricerca con codice scatola" class="typeahead" value="${codiceScatola}">
		                    </div>
		                </div>			
		            </div>		         
		        </div>
		        <!-- /.panel-body -->
		    </div>
		    <!-- /.panel -->
		</div>		
			<table id="scatoleConformi" class="table table-striped table-bordered ">
			        <thead>
			            <tr>
			                <th>Id Macroservizio</th>
			                <th>Codice Cliente</th>
			                <th>Identificativo Cliente</th>
			                <th>Codifica Macroservizio</th>
			                <th>Nome Servizio</th>
			                <th>Totale Scatole da Archiviare</th>
			            </tr>
			        </thead>			 
			  </table>
			<!-- 		</div> -->
					<div id="spinnerContainer" class="spinner"></div>  
		</div>
		<!-- /#page-wrapper -->
	</div>	
	
</body>
</html>
