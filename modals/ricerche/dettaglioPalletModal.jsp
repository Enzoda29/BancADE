<script src="${pageContext.servletContext.contextPath}/resources/template/js/ricerche/ricerca_pallette/dettaglioPalletModal.js"></script>
<%@ page import="it.citel.postel.commonLib.constants.ScatolaCostants" %>
<div class="modal fade" id="dettaglioPalletModal"
	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true" style="overflow-y:auto !important">
	<div class="modal-dialog-dettaglioPallet modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header" style="text-align: center; background-color: #c3e6df;">
					<h3 class="modal-title">Dettaglio Pallet <label id="title_dett_pallet"></label></h3>
				</div>
				 
				<div class="modal-body">
						<div class="modal-header">
						<div class="col-lg-10 col-md-12" style="text-align: left">
							<h3 class="modal-title" >
									<span style="margin-right: 20px;">Codice Pallet: <b id="title_cod_pallet"></b></span>
							</h3>
							<h4 class="modal-title" >
								<span style="margin-right: 50px;">Stato: <b id="title_stato_pallet"></b> </span>
								<span style="margin-right: 50px;">Cliente: <b id="title_id_cliente"></b> </span>
								<span style="margin-right: 50px;">Lotto territoriale: <b id="title_lotto_territoriale"></b> </span>
								<span style="margin-right: 50px;">Tipo documento: <b id="title_tipo_documento"></b> </span>
								<span style="margin-right: 50px;">Totale scatole: <b id="title_totale_scatole"></b> </span>
							</h4>
						</div>
						<div class="col-lg-2 col-md-12" style="text-align: center" id="divAggiungiScatola">
							<div class="col-lg-12">
								<button type="button" id="aggiungiScatola" style="folat:rigth;margin-bottom: 10px;">Aggiungi scatola</button>
								<input type="text" id="aggScatolaInputModal" maxlength="10"/>
							</div>
						</div>
						
						</div>
						<div class="modal-body" >
						<table id="tablePalletScatola" 
							data-toggle="table"
							data-toolbar="#toolbar-table" 
							data-side-pagination="server"
							data-pagination="true" 
							data-page-size="10"
							data-page-list="[5,10]" 
							data-show-refresh="false"
							data-show-toggle="false" 
							data-mobile-responsive="true"
							data-check-on-init="false" 
							data-click-to-select="true"
							data-show-columns="false" 
							data-id-field="<%= ScatolaCostants.JSON_RICERCA_ID_SCATOLA %>" 
							data-id-field="object_id" 
							data-sort-order="desc"
							data-show-fullscreen="false" 
							data-maintain-meta-data="false"
							data-sort-name="CODICE_PALLET"
							class="table table-bordered">
							
							
<!-- 						<table class="table table-bordered" id="tablePalletScatola" -->
<!-- 							data-toolbar="#toolbar-table"   -->
<!-- 							data-mobile-responsive="false" data-check-on-init="true" -->
<!-- 							data-click-to-select="true" data-show-columns="false" -->
<%-- 							data-id-field="<%= ScatolaCostants.JSON_RICERCA_ID_SCATOLA %>" data-toggle="table"> --%>
							<thead>
								<tr>
<!-- 									<th data-field="COD_SCATOLA">Codice Scatola</th> -->
<!-- 									<th data-field="TIPO_SCATOLA">Tipo Scatola</th> -->
<!-- 									<th data-field="STATO_SCATOLA">Stato Scatola</th> -->
<!-- 									<th data-field="MACROSERVIZIO">Macroservizio</th> -->
<!-- 									<th data-field="OPERATORE">Operatore</th> -->
<!-- 									<th data-field="NUM_DOCUMENTI">Numero Documenti</th> -->
<!-- 									<th data-field="PESO_NETTO">Peso Netto</th> -->
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_ID_SCATOLA %>" data-sortable="true" >ID Scatola</th>
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_IDENTIFICATIVO_CLIENTE %>" data-sortable="true" >Codice Cliente</th>
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_CODICE_SCATOLA %>" data-sortable="true" >Codice Scatola</th>
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_TIPOLOGIA %>" data-sortable="true" >Tipologia</th>
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_STATO %>" data-sortable="true" aligne="center">Stato</th>
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_TIPOLOGIA_DOCUMENTI %>" >Tipologia Documenti</th>
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_TOTALE_ANOMALIE %>" data-sortable="true" >Totale Anomalie</th>
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_DATA_CHIUSURA %>" data-sortable="true" >Data Chiusura</th>
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_DATA_FINE_DATA_ENTRY %>" data-sortable="true" >Data Fine Data Entry</th>						
								<th data-field="<%= ScatolaCostants.JSON_RICERCA_LDV_COD_RACC %>" data-sortable="true" >LDV Codice Racc.</th>
								<th data-field="BUTTONS" data-sortable="false">Azioni</th>
								</tr>
							</thead>
						</table>
					</div>   
				</div>
				<div class="modal-footer">	
					<button type="button" class="btn btn-default" aria-label="Chiudi pallet" id="chiudiPalletButton">Chiudi Pallet</button>
					<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
				</div>
			</div>
	</div>

	<div id="spinnerContainerModal" class="spinner"></div>
</div>