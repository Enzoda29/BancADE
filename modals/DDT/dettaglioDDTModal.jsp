<div class="modal fade" id="dettaglioDDTModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header" style="text-align: center; background-color: #c3e6df;">
				<h3 class="modal-title">
					Dettaglio DDT <label id="title_dett_plico"></label>
				</h3>
			</div>

			<div class="modal-body">
				<div class="modal-header">
					<div class="col-lg-12 col-md-12" style="text-align: center">
						
						<div class="row">
							<div class="col-lg-3">
								<h5 class="modal-title">
									<span>Codice DDT: <b id="title_cod_DDT"></b></span>
								</h5>
							</div>
							<div class="col-lg-3">
								<h5 class="modal-title">
									<span>Totale Pallet: <b id="title_tot_pallet"></b></span>
								</h5>
							</div>
							<input type="hidden" id="ddtId" />
						</div>
						<div class="row">
							<div class="col-lg-12">
								<table id="tableDettDDT" data-toggle="table"
									data-toolbar="#toolbar-table" data-side-pagination="server"
									data-pagination="true" data-page-size="10"
									data-page-list="[5,10,20,50,100]" data-show-refresh="false"
									data-show-toggle="false" data-mobile-responsive="true"
									data-check-on-init="false" data-click-to-select="true"
									data-show-columns="false" data-sort-name="CODICE_PALLET"
									data-id-field="object_id" data-sort-order="desc"
									data-show-fullscreen="false" data-maintain-meta-data="false"
									class="table">
									<thead>
										<tr>
											<th data-field="CODICE_PALLET">Codice Pallet</th>
											<th data-field="CODICE_CLIENTE">Codice Cliente</th>
											<th data-field="TIPO_PRODOTTO">Tipo Prodotto</th>
											<th data-field="LOTTO_TERRITORIALE">Lotto Territoriale</th>
											<th data-field="TIPO_SPEDIZIONE">Tipo Spedizione</th>
											<th data-field="MODELLO">Modello</th>
											<th data-field="TIPO_POSTA">Tipo Posta</th>
											<th data-field="TOTALE_SCATOLE">Totale Scatole</th>
											<th data-field="PESO_NETTO">Peso Netto (Kg)</th>
											<th data-field="DATA_CREAZIONE">Data Creazione</th>
											<th data-field="PALLET_ID" data-show="false">Pallet id</th>
											<th data-field="selection" data-checkbox="true">Disassocia da DDT</th>
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
				<button type="button" class="btn btn-default" id="dissassociaModalBtn">Disassocia da DDT</button>
				<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
			</div>
		</div>
	</div>
</div>