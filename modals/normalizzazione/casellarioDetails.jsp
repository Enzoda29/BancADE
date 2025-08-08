<div class="modal fade" id="casellarioDetailsModal" tabindex="-1"
	role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="row">
				<div class="col-lg-12">
					<div class="panel panel-primary">
						<div class="panel-heading"><h1>Dettaglio Casellario</h1></div>
						<!-- /.panel-heading -->
						<div class="panel-body">
							<div class="row">
								<div class="col-lg-4">
									 <label>Cliente : </label><span id="lbl_dettCas_cliente"></span>
								</div>
								<div class="col-lg-4">
									<label>Prodotto : </label><span id="lbl_dettCas_prodotto"></span>
								</div>
								<div class="col-lg-4">
									<label>Totale Doc : </label><span id="lbl_dettCas_totale"></span>
								</div>
							</div>
							<div class="row">
								<table id="tab_dettaglio_casellario" class="table table-striped table-bordered dataTable no-footer" style="width:100%">
								<thead >
										<tr>								 
<!-- 											<th>Nome Casellario</th> -->
<!-- 											<th>Cliente</th> -->
<!-- 											<th>Prodotto</th> -->
<!-- 											<th>Totale Doc</th> -->
											<th>Codice Oggetto</th>
											<th>Data Normalizzazione</th>
											<th><input type="checkbox" id="c_selAll"></input></th>
										</tr>
									</thead>								
								</table>
							</div>
						</div>
						<!-- /.panel-body -->
						<div class="modal-footer">
							<button class="btn btn-default" data-dismiss="modal">Annulla</button>
							<button class="btn btn-primary" id="associa_plico" title="associa a plico di scansione" >Associa</button>
							<button class="btn btn-primary" id="rimuovi_documenti" title="rimuovi dal casellario" >Rimuovi</button>
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