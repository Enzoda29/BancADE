<%@ page import="it.citel.postel.commonLib.constants.PalletConstants"%>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/ricerche/ricerca_pallette/creaPalletModal.js"></script>
<div class="modal fade" id="creaPalletModal"
	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog-dettaglioPallet modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header" style="text-align: center; background-color: #c3e6df;">
					<h3 class="modal-title">Crea Pallet <label id="title_dett_pallet"></label></h3>
				</div>
				 
				<div class="modal-body">
						<div class="modal-header">
						<div class="col-lg-12 col-md-12" style="text-align: center">
							<input type="text" id="codScatolaCreaModal" maxlength="10"/>
							<button class="btn btn-primary" type="button" id="creaPalletModalButton">Crea Pallet</button>
						</div>
						
						</div>
						<div class="modal-body" >
						<h3 class="modal-title" >
							<span>Pallet aperti</span>
						</h3>
						<table id="tablePalletModal" data-toggle="table"
					data-toolbar="#toolbar-table" data-side-pagination="server"
					data-pagination="true" data-page-size="10"
					data-page-list="[5,10,20,50,100]" data-show-refresh="false"
					data-show-toggle="false" data-mobile-responsive="true"
					data-check-on-init="false" data-click-to-select="true"
					data-show-columns="false" data-sort-name="<%=PalletConstants.CODICE_PALLET.fieldDB()%>"
					data-id-field="object_id" data-sort-order="desc"
					data-show-fullscreen="false" data-maintain-meta-data="false"
					class="table">
					<thead>
						<tr>
							<th data-field="<%=PalletConstants.IDENTIFICATIVO_CLIENTE.dataField()%>"><%=PalletConstants.IDENTIFICATIVO_CLIENTE.columnHTML()%></th>
							<th data-field="<%=PalletConstants.CODICE_PALLET.dataField()%>"><%=PalletConstants.CODICE_PALLET.columnHTML()%></th>
							<th data-field="<%=PalletConstants.STATO_PALLET.dataField()%>"><%=PalletConstants.STATO_PALLET.columnHTML()%></th>
							<th data-field="<%=PalletConstants.NOME_DOCUMENTO.dataField()%>"><%=PalletConstants.NOME_DOCUMENTO.columnHTML()%></th>							  
							<th data-field="<%=PalletConstants.LOTTO_TERRITORIALE.dataField()%>"><%=PalletConstants.LOTTO_TERRITORIALE.columnHTML()%></th>							  
							<th	data-field="<%=PalletConstants.TIPO_SPEDIZIONE_DOC.dataField()%>"><%=PalletConstants.TIPO_SPEDIZIONE_DOC.columnHTML()%></th>
							<th data-field="<%=PalletConstants.TIPO_POSTA.dataField()%>"><%=PalletConstants.TIPO_POSTA.columnHTML()%></th>
							<th	data-field="<%=PalletConstants.TOTALE_SCATOLE_INSERITE.dataField()%>"><%=PalletConstants.TOTALE_SCATOLE_INSERITE.columnHTML()%></th>
							<th	data-field="<%=PalletConstants.PESO_NETTO_PALLET_G.dataField()%>"><%=PalletConstants.PESO_NETTO_PALLET_G.columnHTML()%></th>
							<th	data-field="<%=PalletConstants.DESCR_TIPO_PALLET.dataField()%>"><%=PalletConstants.DESCR_TIPO_PALLET.columnHTML()%></th>
							<th data-field="<%=PalletConstants.CODICE_DDT.dataField()%>"><%=PalletConstants.CODICE_DDT.columnHTML()%></th>							 
							<th data-field="<%=PalletConstants.PROGRESSIVO_DDT.dataField()%>"><%=PalletConstants.PROGRESSIVO_DDT.columnHTML()%></th>
							<th	data-field="<%=PalletConstants.DATA_INSERIMENTO.dataField()%>"><%=PalletConstants.DATA_INSERIMENTO.columnHTML()%></th>
							<th	data-field="<%=PalletConstants.DATA_AGGIORNAMENTO.dataField()%>"><%=PalletConstants.DATA_AGGIORNAMENTO.columnHTML()%></th>
							<th	data-field="<%=PalletConstants.DESCR_CENTRO_DEMAT.dataField()%>"><%=PalletConstants.DESCR_CENTRO_DEMAT.columnHTML()%></th>
							<th data-field="<%=PalletConstants.USERNAME.dataField()%>"><%=PalletConstants.USERNAME.columnHTML()%></th>
							<th data-field="BUTTONS"></th>
						</tr>
					</thead>
				</table>
					</div>   
				</div>
				<div class="modal-footer">	
					<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
				</div>
			</div>	
<%-- 				<%@ include file="dettaglioPacchettoModal.jsp"%> --%>
<%-- 				<%@ include file="dettaglioPraticaModal.jsp"%> --%>
	</div>

	<div id="spinnerContainerModal" class="spinner"></div>
</div>