<div class="modal fade" id="dettaglioPlicoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header" style="text-align: center; background-color: #c3e6df;">
				<h3 class="modal-title">
					Dettaglio Plico <label id="title_dett_plico"></label>
				</h3>
			</div>

			<div class="modal-body">
				<div class="modal-header">
					<div class="col-lg-12 col-md-12" style="text-align: center">
						
						<div class="row">
							<div class="col-lg-3">
								<h5 class="modal-title">
									<span>Codice Plico: <b id="title_cod_plico"></b></span>
								</h5>
							</div>
							<div class="col-lg-3">
								<h5 class="modal-title">
									<span>Tipo Prodotto:<b id="title_tipo_prod"></b></span> 
								</h5>
							</div>
							<!--
							<div class="col-lg-3">
								<h5 class="modal-title">
									<span>Stato Plico: <b id="title_stato_plico"></b></span>
								</h5>
							</div>
							-->
							<div class="col-lg-3">
								<h5 class="modal-title">
									<span>Totale Documenti: <b id="title_tot_doc"></b></span>
								</h5>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-12">
								<table id="tableDettDocs" class="table table-hover" style="text-align:center">
									<thead>
										<tr>
											<th>Codice Oggetto</th>
											<th>Stato Documento</th>
											<th>Data Scansione</th>
											<th>Posizione in Scatola</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
			</div>
		</div>
	</div>

	<div id="spinnerContainerModal" class="spinner"></div>
</div>