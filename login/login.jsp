si te l'ho inviato<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page session="false"%>
<html>
	<head>
		<title>Login</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=10" />
        
        <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" type="text/css" href="resources/bootstrap/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/custom-style.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/custom-login-style.css" />
		
		<!-- FormValidation CSS file -->
		<link rel="stylesheet" href="resources/bootstrap/plugin/formvalidation/css/formValidation.css" type="text/css">
		
		<script type="text/javascript" src="resources/js/jquery-1.11.3.min.js"></script>
		<script src="resources/bootstrap/js/bootstrap.min.js"></script>
		<script src="resources/bootstrap/js/bootstrap-filestyle.js"></script>
		
		<!-- Modernizr -->
		<script src="resources/js/modernizr.custom.js"></script>
		
		<!-- SU QUESTO FILE PUO' ESSERE AGGIUNTO TUTTO IL CODICE JS CUSTOM -->
		<script src="resources/js/custom-script-login.js"></script>
		<script src="resources/js/jquery.placeholder.js"></script>
		
		<!-- FormValidation plugin and the class supports validating Bootstrap form -->
		<script src="resources/bootstrap/plugin/formvalidation/js/formValidation.min.js"></script>
		<script src="resources/bootstrap/plugin/formvalidation/js/framework/bootstrap.min.js"></script>
		<script src="resources/bootstrap/plugin/formvalidation/js/language/it_IT.js"></script>
		
		<!-- respond.js per IE8 -->
		<!--[if lt IE 9]>
		<script src="resources/js/respond.min.js"></script>
		<![endif]-->
    </head>
    
    <body>
    
	    <c:url var="urlHome" value="/home" />
		<c:url var="urlChangePassword" value="/change-password" />
		<c:url var="urlResetPassword" value="/reset-password" />
    
        <div class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand"><img height="20" alt="Brand" src="resources/images/brand/postel_logo.gif"></a>
                </div>
                <div class="collapse navbar-collapse" id="navbar-ex-collapse">
                    <ul class="nav navbar-nav navbar-right"></ul>
                </div>
            </div>
        </div>

		<div class="section">
			<div class="container">
				<div class="row">
					<div class="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
						<c:if test="${not empty error}">
							<c:if test="${error eq 'account-expired'}">
								<div class="alert alert-danger text-center">
									<strong>Account Scaduto</strong>, contattare l'assistenza.
								</div>
							</c:if>
							<c:if test="${error eq 'bad-credentials'}">
								<div class="alert alert-danger text-center">
									<strong>Login Failed!!!</strong> Username o Password errata.
								</div>
							</c:if>
							<c:if test="${error eq 'credentials-no-found'}">
								<div class="alert alert-danger text-center">
									<strong>Login Failed!!!</strong> Username o Password errata.
								</div>
							</c:if>
							<c:if test="${error eq 'disabled'}">
								<div class="alert alert-danger text-center">
									<strong>Account Disabilitato</strong>, contattare l'assistenza.
								</div>
							</c:if>
							<c:if test="${error eq 'locked'}">
								<div class="alert alert-danger text-center">
									<strong>Account Bloccato</strong>, contattare l'assistenza.
								</div>
							</c:if>
							<c:if test="${error eq 'credentials-expired'}">
								<div class="alert alert-danger text-center">
									<strong>Primo Accesso/Password scaduta!!</strong><br>è
									necessario cambiare la password prima di procedere.
								</div>
							</c:if>
							<c:if test="${error eq 'internal-server-error'}">
								<div class="alert alert-danger text-center">
									<strong>Internal Server Error!!</strong><br>non è stato
									possibile connettersi al repository.
								</div>
							</c:if>
							<c:if test="${error eq 'unauthorized'}">
								<div class="alert alert-danger text-center">
									<strong>Unauthorized!!</strong><br>non sei autorizzato ad
									accedere al repository.
								</div>
							</c:if>
							<c:if test="${error eq 'connect-exception'}">
								<div class="alert alert-danger text-center">
									<strong>Connection Error!!</strong><br>non è stato
									possibile connettersi al repository.
								</div>
							</c:if>
						</c:if>
	
						<c:if test="${not empty changePassword}">
							<c:if test="${changePassword eq 'ok'}">
								<div class="alert alert-success text-center">
									<strong>${changePasswordReturnMessage}</strong>
								</div>
							</c:if>
							<c:if test="${changePassword eq 'ko'}">
								<div class="alert alert-danger text-center">
									<strong>${changePasswordReturnMessage}</strong>
								</div>
							</c:if>
						</c:if>
						<c:if test="${not empty resetPassword}">
							<c:if test="${resetPassword eq 'ok'}">
								<div class="alert alert-success text-center">
									<strong>${resetPasswordReturnMessage}</strong>
								</div>
							</c:if>
							<c:if test="${resetPassword eq 'ko'}">
								<div class="alert alert-danger text-center">
									<strong>${resetPasswordReturnMessage}</strong>
								</div>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
		</div>

		<div class="login-body">
		    <article class="container-login center-block">
				<section>
					<ul id="top-bar" class="nav nav-tabs nav-justified" role="tablist">
						<li role="login-access" class="active"><a href="${pageContext.request.contextPath}/login?type=Accedi ai servizi" aria-controls="login" role="tab" data-target="login-access">Accedi ai servizi</a></li>
						<li role="modifica-password" ><a href="${pageContext.request.contextPath}/login?type=Modifica Password" aria-controls="modifica-password" role="tab" data-target="modifica-password">Modifica Password</a></li>
					</ul>
					<div id="id-tab-content" class="tab-content tabs-login col-lg-12 col-md-12 col-sm-12 cols-xs-12">
						
						<div role="tabpanel" class="tab-pane active fade in" id="login-access">
							
							<div id="form-olvidado">
								<h2><i class="glyphicon glyphicon-log-in"></i> Accesso</h2>
								<form id="form-login" method="post" accept-charset="utf-8" autocomplete="on" class="form-horizontal" action="<c:url value='j_spring_security_check'/>" role="form" >
									<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
									
									<div class="form-group input-group">
										<label for="login" class="sr-only">Username</label>
										<span class="input-group-addon"> <i class="glyphicon glyphicon-user"></i> </span> 
										<input type="text" class="form-control" name="j_username" placeholder="Inserisci il tuo username" autofocus autocomplete="on"/>
									</div>
									
									<div class="form-group input-group"s">
										<label for="password" class="sr-only">Password</label>
										<span class="input-group-addon">
		            						<i class="glyphicon glyphicon-lock"></i>
		          						</span>
										<input type="password" class="form-control" name="j_password" placeholder="Inserisci la tua password" autocomplete="on"/>
									</div>
									<br/>
									<div class="form-group ">				
										<button type="submit" name="log-me-in" id="submit" tabindex="5" class="btn btn-lg btn-primary btn-custom">Entra</button>
									</div>
		          					 <p class="help-block">
		            					<a class="pull-right" href="#" id="olvidado">Reset password</a>
		          					</p>
								</form>
							</div>
							
							<div style="display: none;" id="form-olvidado">
								<h4><i class="glyphicon glyphicon-log-in"></i> Reset Password</h4>
								<form accept-charset="UTF-8" action="${urlResetPassword}" role="form" id="login-recordar" method="post" modelAttribute="resetPasswordForm">
									<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
									<fieldset>
										<span class="help-block"> Inserisci l'indirizzo email che usi per il login. 
											<br> Verrà inviata una email contenente una password temporanea.
										</span>
										<br>
										<div class="form-group input-group">
											<span class="input-group-addon"> @ </span> 
											<input class="form-control" placeholder="Email" name="email" type="email" required>
										</div>
										<button type="submit" class="btn btn-primary btn-block btn-custom" id="btn-olvidado">Continua</button>
										<p class="help-block">
											<a class="" href="#" id="acceso">Accedi ai servizi</a>
										</p>
									</fieldset>
								</form>
							</div>
						</div>
		
						<div role="tabpanel" class="tab-pane fade in" id="modifica-password" >
							<h2><i class="glyphicon glyphicon-log-in"></i> Modifica</h2>
							<h4>La password deve rispettare i seguenti parametri:</h4>
							<h5>
								<ul>
									<li>Lunghezza minima 8 caratteri.</li>
									<li>Almeno un carattere Maiuscolo.</li>
									<li>Almeno un carattere Minuscolo.</li>
									<li>Almeno un carattere Numerico.</li>
									<li>Almeno un carattere Speciale <br> (~!@#$%^&*_-+=`|\(){}[]:;"'<>,.?/) </li>
									<!-- <li>Non deve contenere parte dello username.</li> -->
								</ul>
							</h5>
							<br>
							
							<form id="form-change-password" method="post" accept-charset="utf-8" autocomplete="off" class="form-horizontal" action="${urlChangePassword}" role="form" modelAttribute="changePasswordForm" >
								<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
								
								<div class="form-group input-group">
									<label for="text" class="sr-only">Username</label>
									<span class="input-group-addon"> @ </span> 
									<input type="text" class="form-control" name="username" placeholder="Username" tabindex="2" autocomplete="off" autofocus/>
									<!-- <div class="help-block with-errors"></div> -->
								</div>
								
								<div class="form-group input-group">
									<label for="password" class="sr-only">Vecchia Password</label>
									<span class="input-group-addon">
	            						<i class="glyphicon glyphicon-lock"></i>
	          						</span>
									<input type="password" class="form-control" name="oldPassword" placeholder="Vecchia Password" tabindex="2" autocomplete="off" />
									<!-- <div class="help-block with-errors"></div> -->
								</div>
								
								<div class="form-group input-group">
									<label for="password" class="sr-only">Nuova Password</label>
									<span class="input-group-addon">
	            						<i class="glyphicon glyphicon-lock"></i>
	          						</span>
									<input type="password" 
										
										class="form-control" 
										name="newPassword" 
										id="inputPassword" 
										placeholder="Nuova Password" 
										
										data-fv-regexp="true"
	                					data-fv-regexp-regexp="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*_\\:;+=,.?`|\(){}/><]).)"
	               	 					data-fv-regexp-message="La password non rispecchia i parametri di sicurezza."
										
										tabindex="2" 
										autocomplete="off" 
										/>
										
								</div>
								
								<div class="form-group input-group">
									<label for="password" class="sr-only">Conferma Password</label>
									<span class="input-group-addon">
	            						<i class="glyphicon glyphicon-lock"></i>
	          						</span>
									<input type="password" 
											class="form-control" 
											name="confirmPassword" 
											placeholder="Conferma Password" 
											
											data-fv-identical="true"
	                						data-fv-identical-field="newPassword"
	                						data-fv-identical-message="La password non corrisponde"
									
											tabindex="3" 
											autocomplete="off" 
											/>
								</div>
								
								<br/>
								<div class="form-group ">				
									<button type="submit" tabindex="5" class="btn btn-lg btn-primary btn-custom">Modifica</button>
								</div>
							</form>
						</div>
					</div>
					
					<div class="clearfix"><br /></div>
					<br />
				</section>
			</article>
		</div>
		
		<script type="text/javascript">
			$(document).ready(function() {
			    $('#login-recordar').formValidation({
			        framework: 'bootstrap',
			        icon: {
			            valid: 'glyphicon glyphicon-ok',
			            invalid: 'glyphicon glyphicon-remove',
			            validating: 'glyphicon glyphicon-refresh'
			        },
			        locale: 'it_IT',
			        fields: {
			        	email: {
			                validators: {
			                    notEmpty: {
			                        message: 'Inserisci il tuo indirizzo email.'
			                    }
			                }
			            }
			        }
			    });
			    
			    $('#form-change-password').formValidation({
			        framework: 'bootstrap',
			        icon: {
			            valid: 'glyphicon glyphicon-ok',
			            invalid: 'glyphicon glyphicon-remove',
			            validating: 'glyphicon glyphicon-refresh'
			        },
			        locale: 'it_IT',
			        fields: {
			        	username: {
			                validators: {
			                	notEmpty: {
			                        message: 'Inserisci il tuo username.'
			                    }
			                }
			            },
			            oldPassword: {
			                validators: {
			                	notEmpty: {
			                        message: 'La password è necessaria e non può essere vuota.'
			                    },
			                    /* securePassword: {
			                        message: 'La password non è valida.'
			                    } */
			                    stringLength: {
			                        min: 8,
			                        message: 'La password deve contenere almeno 8 caratteri.'
		                    	}
			                }
			            },
			            newPassword: {
			                validators: {
			                	notEmpty: {
			                        message: 'Inserisci la nuova password.'
			                    },
					        	stringLength: {
			                        min: 8,
			                        message: 'La password deve contenere almeno 8 caratteri.'
		                    	}
			                }
			            },
			            confirmPassword: {
			                validators: {
			                	notEmpty: {
			                        message: 'Conferma la password.'
			                    },
			                	stringLength: {
			                        min: 8,
			                        message: 'La password deve contenere almeno 8 caratteri.'
			                   }
			                }
			            }
			        }
			    });
			});
		</script>

		<footer class="footer-custom section text-left">
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<h1>Postel S.p.A.</h1>
						<p>P. IVA. 05692591000</p>
						<img src="resources/images/brand/gruppoposte_footer_logo.gif" class="img-responsive">
					</div>
				</div>
			</div>
		</footer>
	</body>

</html>