<div class="modal fade" id="stampaScatolaModal"
	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog-dettaglioScatola modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header" style="text-align: center; background-color: #c3e6df;">
					<h3 class="modal-title">Dettaglio Scatola <label id="title_print_dett_scat"></label></h3>
<!-- 				    <h4><label id="loadFields" class="label label-info"></label></h4> -->
				</div>
				 
				<div class="modal-body" id="printBody">
						<div class="modal-header">
						<div class="col-lg-12 col-md-12">
							<div class="row">
								<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div>
								<div class="col-md-8 col-xs-8  col-sm-8 col-lg-8 text-center">
									<img src="" alt="barcode scatola" id="barcodeScatola" style="display: block;margin-left: auto;margin-right: auto;"/>
								</div>
								<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div>
							</div>
						</div>
						<div class="col-lg-12 col-md-12" style="text-align: center">
							<h3 class="modal-title" >
									<span style="margin-right: 20px;">Identificativo: <b id="title_print_cod_scat_gme"></b></span>
									<span style="margin-right: 20px;">Codice: <b id="title_print_cod_scat"></b></span>
									<span style="margin-right: 20px;">Numero: <b id="title_print_???">000001</b></span>
							</h3>
							<h4 class="modal-title" >Stato: <b id="title_print_stato_scatola"></b> </h4>
							<h4 class="modal-title" >Stato esteso: <b id="title_print_stato_scatola_esteso"></b> </h4>
							<h4 class="modal-title" >
								<span style="margin-right: 50px;">Cliente: <b id="title_print_cliente"></b> </span>
								<span style="margin-right: 50px;">Tipo documento: <b id="title_print_tipo_documento"></b> </span>
								<span style="margin-right: 50px;">Tipo spedizione: <b id="title_print_tipo_spedizione"></b> </span>
							</h4>
							<h4 class="modal-title">
								<span style="margin-right: 50px;">Lotto Territoriale: <b id="title_print_lotto_territoriale"></b> </span>
								<span style="margin-right: 50px;">Totale documenti: <b id="title_print_totale_documenti"></b> </span>
								<span style="margin-right: 50px;">Totale mazzette: <b id="title_print_totale_mazzette"></b> </span>
							</h4>
						</div>
						</div>
						<div class="modal-body" >
						<table class="table table-bordered" id="tableDettaglioStampaScatola"
							data-toolbar="#toolbar-table"  
							data-mobile-responsive="false" data-check-on-init="true"
							data-click-to-select="true" data-show-columns="false"
							data-id-field="object_id" data-toggle="table">
							<thead>
								<tr>

								</tr>
							</thead>
						</table>
					</div>   
				</div>
				<div class="modal-footer">	
					<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
				</div>
			</div>	
				<%@ include file="dettaglioPacchettoModal.jsp"%>
				<%@ include file="dettaglioPraticaModal.jsp"%>
	</div>

	<div id="spinnerContainerModal" class="spinner"></div>
</div>