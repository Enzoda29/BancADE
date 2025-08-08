<!DOCTYPE html>
<%@ include file="../../pages/taglibs.jsp" %>
<html>
<head>
	<%@ include file="../../pages/heads/head.jsp" %>

	<script	src="${pageContext.servletContext.contextPath}/resources/template/js/archiviazione/scatoleArchivioDettaglio.js"></script>
	
	
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

.history-back{
	cursor:pointer;
	
}
.history-back:hover{
	color:#078dbf;
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
			<input type="hidden" id="macroservizio_client_id" value="${macroservizio_client_id}" />
			<div class="row">
				<div class="col-lg-12">
					<h3 class="page-header">
						Scatole Archiviabili <i class="fa fa-arrow-right" aria-hidden="true"></i>
						Macroservizio Id Cliente: <span class="" style="color: #078dbf;">${macroservizio_client_id}</span>
					</h3>
				</div>
				<!-- /.col-lg-12 -->
			</div>
			<div class="col-lg-12">
			    <div class="panel panel-default" >
			        <div class="panel-heading">
			            Filtro di Ricerca
			        </div>
			        <div class="panel-body">
			            <div class="row">
			
			                <div class="col-lg-4 col-md-6">
			                    <div class="form-group">
			
			                        <label>Nome Documento</label>
			                        <select class="form-control" id="nomeDocumento">
                                		                        		
                            		</select>
			                    </div>
			                </div>
			                 <div class="col-lg-4 col-md-6">
			                    <div class="form-group">
			
			                        <label>Aggregato ID</label>
			                        <select class="form-control" id="aggregato">
                                		                        		
                            		</select>
			                    </div>
			                </div>		
			            </div>		         
			        </div>
			        <!-- /.panel-body -->
			    </div>
			    <!-- /.panel -->
			</div>	
			<div class="row">
				<div class="col-sm-2">
					<i class="fa fa-arrow-circle-o-left fa-4x history-back" aria-hidden="true" onclick="historyBack('${idCliente}','${codiceScatola}')"></i>
				</div>
			</div>
			<table id="dettaglio_scatole_archiviabili" class="table table-striped table-bordered ">
			        <thead>
			            <tr>
			                <th>AGGREGATO ID</th>
			                <th>CODICE SCATOLA</th>
			                <th>NOME DOCUMENTO</th>			                
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
