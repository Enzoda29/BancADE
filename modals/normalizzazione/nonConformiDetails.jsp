<div class="modal fade" id="nonConformiDetailsModal" tabindex="-1"
	role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="row">
				<div class="col-lg-12">
					<div class="panel panel-primary">
						<div class="panel-heading"><h1>Dettaglio Non Conformi</h1></div>
						<!-- /.panel-heading -->
						<div class="panel-body">
							<form role="form">
								<div class="form-group">
	                                <label>Codice scatola: </label><span id="lbl_codice_scatola"></span>	                               
	                            </div>
	                            <div class="form-group">
	                                <label>Tipo scatola: </label><span id="lbl_tipo_scatola"></span>                              
	                            </div>
	                            <div class="form-group">
	                                <label>N. Documenti: </label><span id="lbl_numero_doc"></span>	                               
	                            </div>
							</form>
							<div class="row">
								<table id="tab_dettaglio_non_conf" class="table table-striped table-bordered dataTable no-footer" style="width:100%">
								<thead >
										<tr>								
											<th>Codice Oggetto</th>
											<th>Posizione in Scatola</th>
											<th>Data Inserimento</th>	
										</tr>
									</thead>								
								</table>
							</div>
						</div>
						<!-- /.panel-body -->
						<div class="modal-footer">
							<button class="btn btn-default" data-dismiss="modal">Annulla</button>
							<button class="btn btn-primary" id="close_scatola" title="chiudi scatola" >Chiudi Scatola</button>
						</div>
					</div>
					<!-- /.panel -->
				</div>

			</div>
		</div>
	</div>
</div>


<style>
.table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td,
	.table>tbody>tr>td, .table>tfoot>tr>td {
	padding: 5px !important;	
}
</style>