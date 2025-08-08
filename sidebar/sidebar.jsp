<%@ include file="../../pages/taglibs.jsp" %>
<%@ page import="it.citel.postel.commonLib.constants.MonitorCostants" %>
<div class="navbar-default sidebar" style="width:180px;" role="navigation">
    <div class="sidebar-nav navbar-collapse" style="width:180px;"> 
   	<ul class="nav" id="side-menu" style="width:180px; text-align:left;">
<sec:authorize access="hasAnyRole('SUPERVISORE, SUPERVISORE_CENTRO, OPERATORE_CONFIGURAZIONE')"> 
  <li><a href="#" id="btn-1" data-toggle="collapse" data-target="#submenuConfigurazione" aria-expanded="false"><i class="fa fa-cog fa-fw"></i>CONFIGURAZIONE <b class="caret"></b></a>
	 <ul class="nav collapse" id="submenuConfigurazione" role="menu" aria-labelledby="#btn-1">
		<li><a href="${pageContext.servletContext.contextPath}/configurazione/configurazioneAnagraficaClienti"><i class="fa fa-caret-right" aria-hidden="true"   aria-hidden="true"></i>Anagrafica Clienti</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/configurazione/configurazioneServizio"><i class="fa fa-caret-right" aria-hidden="true" ></i>Servizio</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/configurazione/configurazioneMacroservizio"><i class="fa fa-caret-right" aria-hidden="true" ></i>Macroservizio</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/configurazione/configurazioneIndirizziRestituzione"><i class="fa fa-caret-right" aria-hidden="true" ></i>Indirizzi di Restituzione</a></li>
<%-- 		<li><a href="${pageContext.servletContext.contextPath}/configurazione/configurazioneRestituzione"><i class="fa fa-caret-right" aria-hidden="true" ></i>Restituzione</a></li> --%>
		<sec:authorize access="hasAnyRole('SUPERVISORE')">
			<li><a href="${pageContext.servletContext.contextPath}/configurazione/configurazioneOperatori"><i class="fa fa-caret-right" aria-hidden="true" ></i>Operatori</a></li>
		</sec:authorize>
	 </ul>
  </li>
		</sec:authorize>
   <li><a href="#" id="btn-2" data-toggle="collapse" data-target="#submenuDispacci" aria-expanded="false"><i class="fa fa-archive fa-fw"></i>DISPACCI <b class="caret"></b></a>
 		<ul class="nav collapse" id="submenuDispacci" role="menu" aria-labelledby="btn-2">
	         <li><a href="${pageContext.servletContext.contextPath}/dispacci/dispacciDaPreaccettare"><i class="fa fa-caret-right" aria-hidden="true" ></i>Ricerca</a></li>
		     <li><a href="${pageContext.servletContext.contextPath}/dispacci/preaccettazione"><i class="fa fa-caret-right" aria-hidden="true" ></i>Pre-Accettazione</a></li>
			 <li><a href="${pageContext.servletContext.contextPath}/dispacci/dispacciSospesiInAttesaDiTRK"><i class="fa fa-caret-right" aria-hidden="true" ></i>Sospesi in attesa di TRK</a></li>
			 <li><a href="${pageContext.servletContext.contextPath}/dispacci/dispacciSospesiProntiDaElaborare"><i class="fa fa-caret-right" aria-hidden="true" ></i>Sospesi pronti da elaborare</a></li>
    	</ul>
   </li> 
   
<!--    <li><a href="#" id="btn-3" data-toggle="collapse" data-target="#submenuNormalizzazione" aria-expanded="false"><i class="fa fa-inbox fa-fw"></i>NORMALIZZAZIONE <b class="caret"></b></a> -->
<!-- 	 <ul class="nav collapse" id="submenuNormalizzazione" role="menu" aria-labelledby="btn-3"> -->
<%-- 		<li><a href="${pageContext.servletContext.contextPath}/normalizzazione"><i class="fa fa-caret-right" aria-hidden="true" ></i>Normalizzazione</a></li> --%>
<!-- 	 </ul> -->
<!--   </li> -->
  
<!--   <li><a href="#" id="btn-3" data-toggle="collapse" data-target="#submenuPlichi" aria-expanded="false"><i class="fa fa-inbox fa-fw"></i>PLICHI <b class="caret"></b></a> -->
<!-- 	 <ul class="nav collapse" id="submenuPlichi" role="menu" aria-labelledby="btn-3"> -->
<%-- 		<li><a href="${pageContext.servletContext.contextPath}/plichi"><i class="fa fa-caret-right" aria-hidden="true" ></i>Ricerca</a></li> --%>
<!-- 	 </ul> -->
<!--   </li> -->
   
  <li><a href="#" id="btn-4" data-toggle="collapse" data-target="#submenuRicerca" aria-expanded="false"><i class="fa fa-inbox fa-fw"></i>SCATOLE<b class="caret"></b></a>
	 <ul class="nav collapse" id="submenuRicerca" role="menu" aria-labelledby="btn-3">
		<li><a href="${pageContext.servletContext.contextPath}/ricerche/scatole"><i class="fa fa-caret-right" aria-hidden="true" ></i>Ricerca</a></li>
	 </ul>

  </li>
		<li><a href="#" id="btn-5" data-toggle="collapse" data-target="#submenuPallette" aria-expanded="false"><i class="fa fa-inbox fa-fw"></i>PALLET<b class="caret"></b></a>
			<ul class="nav collapse" id="submenuPallette" role="menu" aria-labelledby="btn-3">
				<li><a href="${pageContext.servletContext.contextPath}/ricerche/pallet"><i class="fa fa-caret-right" aria-hidden="true" ></i>Ricerca</a></li>
			</ul>

		</li>
  <li><a href="#" id="btn-5" data-toggle="collapse" data-target="#submenuDDT" aria-expanded="false"><i class="fa fa-inbox fa-fw"></i>DDT<b class="caret"></b></a>
	 <ul class="nav collapse" id="submenuDDT" role="menu" aria-labelledby="btn-3">
		<li><a href="${pageContext.servletContext.contextPath}/ddt/ricerca"><i class="fa fa-caret-right" aria-hidden="true" ></i>Ricerca</a></li>
	 </ul>
  </li>


  
  <li><a href="#" id="btn-6" data-toggle="collapse" data-target="#submenuGestioneAnomalie" aria-expanded="false"><i class="fa fa-retweet fa-fw"></i>ANOMALIE <b class="caret"></b></a>
 	<ul class="nav collapse" id="submenuGestioneAnomalie" role="menu" aria-labelledby="btn-4">
		<li><a href="${pageContext.servletContext.contextPath}/gestione/recuperoDocumentiAnomali"><i class="fa fa-caret-right" aria-hidden="true" ></i>Recupero Documenti Anomali</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/gestione/confermaRecuperoDocumentiAnomali"><i class="fa fa-caret-right" aria-hidden="true" ></i>Conferma Recupero Documenti Anomali</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/gestione/listaDistintaPerIlRecupero"><i class="fa fa-caret-right" aria-hidden="true" ></i>Stampa distinta per il recupero</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/scatole/scatoleNonConfDaRiscansionare"><i class="fa fa-caret-right" aria-hidden="true" ></i>Non Conformi Da Elaborare</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/scatole/scatoleAnomalieSanabiliDaRiscansionare"><i class="fa fa-caret-right" aria-hidden="true" ></i>Scatole Anomalie san. da riscansionare </a></li>
<%--  		<li><a href="${pageContext.servletContext.contextPath}/gestione/scartiCaptiva"><i class="fa fa-caret-right" aria-hidden="true" ></i>Elenco Scarti Captiva</a></li> --%>
 	</ul>
  </li>
  
			 
  <li><a href="#" id="btn-7" data-toggle="collapse" data-target="#submenuCodOggetto" aria-expanded="false"><i class="fa fa-search fa-fw"></i>MATERIALITA'<b class="caret"></b></a>
 	<ul class="nav collapse" id="submenuCodOggetto" role="menu" aria-labelledby="btn-6">
		<li><a href="${pageContext.servletContext.contextPath}/materialita/ricercaMaterialita"><i class="fa fa-caret-right" aria-hidden="true" ></i>Ricerca - Posta Descritta</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/materialita/ricercaMaterialitaIndescr"><i class="fa fa-caret-right" aria-hidden="true" ></i>Ricerca - Posta Indescritta</a></li>
  </ul>
  </li>
  
   <li><a href="#" id="btn-8" data-toggle="collapse" data-target="#submenuRestituzioneMaterialita" aria-expanded="false"><i class="fa fa-truck fa-fw"></i>RESTITUZIONE'<b class="caret"></b></a>
	 <ul class="nav collapse" id="submenuRestituzioneMaterialita" role="menu" aria-labelledby="btn-8">
		<li><a href="${pageContext.servletContext.contextPath}/restMaterialita/ddtSpedizioni"><i class="fa fa-caret-right" aria-hidden="true" ></i>Associazione DDT a Spedizione</a></li>
<%-- 		<li><a href="${pageContext.servletContext.contextPath}/restMaterialita/scatoleConformi"><i class="fa fa-caret-right" aria-hidden="true" ></i>Scatole conformi</a></li> --%>
		<li><a href="${pageContext.servletContext.contextPath}/restMaterialita/spedizioneDDT"><i class="fa fa-caret-right" aria-hidden="true" ></i>Spedizione DDT</a></li>
<%-- 		<li><a href="${pageContext.servletContext.contextPath}/restMaterialita/spedizioneScatoleConformi"><i class="fa fa-caret-right" aria-hidden="true" ></i>Spedizione Scatole Conformi</a></li> --%>
		<li><a href="${pageContext.servletContext.contextPath}/restMaterialita/ricercaSpedizioni"><i class="fa fa-caret-right" aria-hidden="true" ></i>Ricerca Spedizioni</a></li>
		<li><a href="${pageContext.servletContext.contextPath}/restMaterialita/scatoleDiAnomalie"><i class="fa fa-caret-right" aria-hidden="true" ></i>Scatole di Anomalie</a></li>
	 </ul>
  </li>
<!--    <li><a href="#" id="btn-9" data-toggle="collapse" data-target="#submenuArchivioMaterialita" aria-expanded="false"><i class="fa fa-file-archive-o fa-fw"></i>ARCHIVIAZIONE<b class="caret"></b></a> -->
<!-- 	 <ul class="nav collapse" id="submenuArchivioMaterialita" role="menu" aria-labelledby="btn-8"> -->
<%-- 		<li><a href="${pageContext.servletContext.contextPath}/archiviazione"><i class="fa fa-caret-right" aria-hidden="true" ></i>Scatole archiviabili</a></li>		 --%>
<!-- 	 </ul> -->
<!--   </li> -->
  
  <li><a href="#" id="btn-10" data-toggle="collapse" data-target="#submenuMonitor" aria-expanded="false"><i class="fa fa-desktop fa-fw"></i>MONITOR DESCRITTA<b class="caret"></b></a>
		<ul class="nav collapse" id="submenuMonitor" role="menu" aria-labelledby="btn-7">
		  <li><a href="#" onclick="monitorDiCarico_window(1)"><i class="fa fa-caret-right" aria-hidden="true" ></i>Carico</a></li>
		  <li>
		  	<a href="#" id="btn-7-1" data-toggle="collapse" data-target="#submenuSLA" aria-expanded="false"><i class="fa fa-caret-down"></i>SLA</a>
		  	<ul class="nav collapse" id="submenuSLA" role="menu" aria-labelledby="btn-7-1">
<%-- 			  <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_DISPACCI%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Dispacci</a></li> --%>
<%-- 			  <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_ANO_NON_CONFORME%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Anomalie Non Conformi</a></li> --%>
<%-- 		      <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_RESTIT_MATERIALITA%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Restituzione materialità</a></li> --%>
		    	<li><a href="#" onclick="monitorSLA_window(5)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Lavorazione</a></li>
		    	<li><a href="#" onclick="monitorSLA_window(6)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Restituzione</a></li>
		    </ul>
		  </li>
 		</ul>
  </li>
  
  <li><a href="#" id="btn-10" data-toggle="collapse" data-target="#submenuMonitorIndescritta" aria-expanded="false"><i class="fa fa-desktop fa-fw"></i>MONITOR INDESCRITTA<b class="caret"></b></a>
		<ul class="nav collapse" id="submenuMonitorIndescritta" role="menu" aria-labelledby="btn-7">
		  <li><a href="#" onclick="monitorDiCarico_window(10)"><i class="fa fa-caret-right" aria-hidden="true" ></i>Carico</a></li>
<!-- 		  <li> -->
<!-- 		  	<a href="#" id="btn-7-1" data-toggle="collapse" data-target="#submenuSLA" aria-expanded="false"><i class="fa fa-caret-down"></i>SLA</a> -->
<!-- 		  	<ul class="nav collapse" id="submenuSLA" role="menu" aria-labelledby="btn-7-1"> -->
<%-- 			  <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_DISPACCI%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Dispacci</a></li> --%>
<%-- 			  <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_ANO_NON_CONFORME%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Anomalie Non Conformi</a></li> --%>
<%-- 		      <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_RESTIT_MATERIALITA%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Restituzione materialità</a></li> --%>
<!-- 		    </ul> -->
<!-- 		  </li> -->
<li>
		  	<a href="#" id="btn-7-1" data-toggle="collapse" data-target="#submenuSLA" aria-expanded="false"><i class="fa fa-caret-down"></i>SLA</a>
		  	<ul class="nav collapse" id="submenuSLA" role="menu" aria-labelledby="btn-7-1">
<%-- 			  <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_DISPACCI%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Dispacci</a></li> --%>
<%-- 			  <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_ANO_NON_CONFORME%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Anomalie Non Conformi</a></li> --%>
<%-- 		      <li><a href="#" onclick="monitorSLA_window(<%=MonitorCostants.MONITOR_SLA_RESTIT_MATERIALITA%>)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Restituzione materialità</a></li> --%>
		    	<li><a href="#" onclick="monitorSLA_window(11)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Lavorazione</a></li>
		    	<li><a href="#" onclick="monitorSLA_window(12)"><i class="fa fa-angle-right" aria-hidden="true" ></i>Restituzione</a></li>
		    </ul>
		  </li>
 		</ul>
  </li>
  
   <li><a href="${pageContext.servletContext.contextPath}/accounting/showAccounting"><i class="fa fa-archive fa-fw"></i>ACCOUNTING</a></li>
  
   </ul>
    </div>
    <!-- /.sidebar-collapse -->
</div>
<script type="text/javascript">
function monitorDiCarico_window( isIndescritta ){
	var url = contextPath+"/monitoraggio/monitorDiCarico?tipoMonitor="+isIndescritta;
	var params = [
	    'height='+screen.height,
	    'width='+screen.width,
	    'isIndescritta='+isIndescritta
	];
  window.open(url, 'monitoraggio', params, false);
}

function monitorSLA_window(tipoMonitor){
	var url = contextPath+"/monitoraggio/monitorSLA?tipoMonitor="+tipoMonitor;
	var params = [
	    'height='+screen.height,
	    'width='+screen.width
	];
  window.open(url, 'monitoraggioSLA', params, false);
}

function monitorScatole_window(){
	var url = contextPath+"/monitoraggio/monitorScatole";
	var params = [
	    'height='+screen.height,
	    'width='+screen.width
	];
  window.open(url, 'monitoraggioSLA', params, false);
}

</script>