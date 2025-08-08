<div class="modal fade" id="associaPalletDDTModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header" style="text-align: center; background-color: #c3e6df;">
				<h3 class="modal-title">
					Pallet Disponibili
				</h3>
			</div>

			<div class="modal-body">
				<div class="modal-header">
					<div class="col-lg-12 col-md-12" style="text-align: center">
						
						<div class="row">
							<div class="col-lg-4 col-md-4">
					<div class="form-group">
						<fieldset>
							<legend>Filtra per Cliente</legend>
							<select id="filtriPerClienteAddPalletCombo" class="form-control"
								multiple size="5">
							</select>
						</fieldset>
					</div>
					<div class="form-group">
						<fieldset>
							<legend>Filtra per Tipologia</legend>
							<select id="filtriPerTipologiaAddPalletCombo" class="form-control"
								multiple size="5">
							</select>
						</fieldset>
					</div>
				</div>
				<div class="col-lg-4 col-md-4">
					<div class="form-group">
						<fieldset>
							<legend>Filtra per Lotto</legend>
							<select id="filtriPerLottoTerritorialeAddPalletCombo" class="form-control"
								multiple size="5">
							</select>
						</fieldset>
					</div>
					<div class="form-group">
						<fieldset>
							<legend>Filtra per Spedizione</legend>
							<select id="filtriPerTipoSpedizioneAddPalletCombo" class="form-control"
								multiple size="5">
							</select>
						</fieldset>
					</div>
				</div>
				<div class="col-lg-4 col-md-4">
					<div class="form-group">
						<fieldset>
							<legend>Filtra per Tipo Prodotto</legend>
							<select id="filtriPerTipoProdottoAddPalletCombo" class="form-control"
								multiple size="5">
							</select>
						</fieldset>
					</div>
					<div class="form-group">
						<fieldset>
							<legend>Filtra per Modello</legend>
							<select id="filtriPerModelloAddPalletCombo" class="form-control"
								multiple size="5">
							</select>
						</fieldset>
					</div>
				</div>
				<div class="col-lg-12 col-md-12 text-center">
					<div class="form-group">
						<button class="btn btn-primary" type="button" id="ricercaPallet">Applica Filtri</button>
					</div>
				</div>
						</div>
						<div class="row">
							<div class="col-lg-12">
								<table id="tableAddPallet" data-toggle="table"
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
											<th data-field="selection" data-checkbox="true">Associa a DDT</th>
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
				<button type="button" class="btn btn-default" id="associaModalBtn">Associa a DDT</button>
				<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
			</div>
		</div>
	</div>
</div>