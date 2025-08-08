<%@ include file="../../pages/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="../../pages/heads/head.jsp"%>
<link href="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/css/bootstrap-toggle.min.css" rel="stylesheet" />
<script src="${pageContext.servletContext.contextPath}/resources/template/vendor/bootstrap/js/bootstrap-toggle.min.js"></script>
</head>
<body>
	
	<!-- Navigation -->
	<nav class="navbar navbar-default navbar-static-top navbar-custom" role="navigation" style="margin-bottom: 0"> <%@ include
		file="../../pages/heads/header.jsp"%> <!-- /.navbar-top-links --> <%@ include file="../../pages/sidebar/sidebar.jsp"%>
		<!-- /.navbar-static-side --> </nav>
	
	<div id="wrapper">
	
		<div id="page-wrapper">
			<div class="row">
				<div class="col-lg-12">
					<div class="alert alert-danger">
							Funzionalità non abilitata per questo centro di dematerializzazione.
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>