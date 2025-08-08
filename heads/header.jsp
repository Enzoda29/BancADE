<%@ include file="../../pages/taglibs.jsp" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/header/header.js"></script>
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="${pageContext.servletContext.contextPath}/">ADE</a>
        </div>
        <!-- /.navbar-header -->
        <ul class="nav navbar-top-links navbar-right">
            <!-- /.dropdown -->
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <i class="fa fa-user fa-fw"></i>
                    <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user min-width">
                    <li><i class="fa fa-user fa-fw"></i>${sessionScope.user.username}</li>
                    <li><i class="fa fa-sitemap fa-fw" aria-hidden="true"></i>Ruolo: ${sessionScope.user.descrProfilo}</li>
                    <li><i class="fa fa-building-o fa-fw" aria-hidden="true"></i>Centro: ${sessionScope.user.codiceCentro}</li>
<%--                     <li><i class="fa fa-desktop fa-fw" aria-hidden="true"></i>Postazione: ${sessionScope.user.descrizionePostazione}</li> --%>
                    <li class="divider"></li>
<!--                     <li> -->
<!--                         <a class="fa fa-wrench" id="modifica"> Modifica Password</a> -->
<!--                         <div id="pannello" class="" style="display:none;"> -->
<!--                             <div class="divider"></div> -->
<!--                             div class="panel-heading">Modifica Password</div> -->
<!--                             <div class="panel-body"> -->
<!--                                 <form method="POST" id="userForm_mod"> -->
<!--                                     <div class="form-group validate-modifica"> -->
<%--                                         <input class="form-control" disabled="disabled" name="username" type="hidden" value="${sessionScope.user.username}" /> --%>
<!--                                     </div> -->
<!--                                     <div class="form-group validate-modifica"> -->
<!--                                         <span>Nuova Password</span> -->
<!--                                         <input id="form-password-update" class="form-control" name="passwordUpdate" type="password" required="true" /> -->
<!--                                         <p class="text-danger" id="passwordUpdate"> </p> -->
<!--                                     </div> -->
<!--                                     <div class="form-group validate-modifica"> -->
<!--                                          <span>Conferma nuova Password</span> -->
<!--                                         <input id="form-password-update-confirm" class="form-control" name="passwordConfirmUpdate" type="password" required="true" /> -->
<!--                                         <p class="text-danger" id="passwordConfirmUpdate"> </p> -->
<!--                                         <p class="text-danger" id="FieldsValueMatch"> </p> -->
<!--                                     </div> -->
<!--                                     <button type="button" id="modificaPassword" class="btn btn-primary btn-sm btn-block login-btn" disabled="disabled">Cambio Password</button> -->
<!--                                 </form> -->
<!--                             </div> -->
<!--                         </div> -->
<!--                     </li> -->
<!--                     <li class="divider"></li> -->
                    <li>
                        <a href="${pageContext.servletContext.contextPath}/j_spring_security_logout">
                            <i class="fa fa-sign-out fa-fw"></i> Logout</a>
                    </li>
                </ul>
                <!-- /.dropdown-user -->
            </li>
            <!-- /.dropdown -->
        </ul>