<div class="modal fade" id="statiPlicoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header" style="text-align: center; background-color: #c3e6df;">
				<h3 class="modal-title">
					Dettagli Stati relativi al <label id="title_stati_plico"></label>
				</h3>
			</div>

			<div class="modal-body">
				<div class="modal-header">
					<div class="col-lg-12 col-md-12" style="text-align: center">
						<table id="tableStatiPlico" 
							data-toggle="table"
							data-toolbar="#toolbar-table" 
							data-side-pagination="server"
							data-pagination="true" 
							data-page-size="10"
							data-page-list="[5,10,20,50,100]" 
							data-show-refresh="false"
							data-show-toggle="false" 
							data-mobile-responsive="true"
							data-check-on-init="false" 
							data-click-to-select="true"
							data-show-columns="false" 
							data-sort-name="STATO"
							data-id-field="object_id" 
							data-sort-order="desc"
							data-show-fullscreen="false" 
							data-maintain-meta-data="false"
							class="table">
								<thead>
									<tr>
										<th data-field="STATO" data-sortable="true" label="">STATO</th>
										<th data-field="NOME_OPERATORE" data-sortable="true" label="">NOME_OPERATORE</th>
										<th data-field="NOME_POSTAZIONE" data-sortable="true" label="">NOME_POSTAZIONE</th>
										<th data-field="DATA_STATO" data-sortable="true" label="">DATA_STATO</th>
									</tr>
								</thead>
							</table>
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