<div class="modal fade" id="dettaglioScatolaModal"
	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog-dettaglioScatola modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header" style="text-align: center; background-color: #c3e6df;">
					<h3 class="modal-title">Dettaglio Scatola <label id="title_dett_scat"></label></h3>
<!-- 				    <h4><label id="loadFields" class="label label-info"></label></h4> -->
				</div>
				 
				<div class="modal-body">
						<div class="modal-header">
						<div class="col-lg-10 col-md-12" style="text-align: left">
							<h3 class="modal-title" >
									<span style="margin-right: 20px;">Identificativo: <b id="title_cod_scat_gme"></b></span>
									<span style="margin-right: 20px;">Codice: <b id="title_cod_scat"></b></span>
									<span style="margin-right: 20px;">Numero: <b id="title_???">000001</b></span>
							</h3>
							<h4 class="modal-title" >Stato: <b id="title_stato_scatola"></b> </h4>
							<h4 class="modal-title" >Stato esteso: <b id="title_stato_scatola_esteso"></b> </h4>
							<h4 class="modal-title" >
								<span style="margin-right: 50px;">Cliente: <b id="title_cliente"></b> </span>
								<span style="margin-right: 50px;">Tipo documento: <b id="title_tipo_documento"></b> </span>
								<span style="margin-right: 50px;">Tipo spedizione: <b id="title_tipo_spedizione"></b> </span>
								<span style="margin-right: 50px;">Codice pallet: <b id="title_codice_pallet"></b> </span>
							</h4>
							<h4 class="modal-title">
								<span style="margin-right: 50px;">Lotto Territoriale: <b id="title_lotto_territoriale"></b> </span>
								<span style="margin-right: 50px;">Totale documenti: <b id="title_totale_documenti"></b> </span>
								<span style="margin-right: 50px;">Totale mazzette: <b id="title_totale_mazzette"></b> </span>
							</h4>
						</div>
						<div class="col-lg-2 col-md-12" style="text-align: center">
							<div class="col-lg-12">
								<button class="btn btn-primary" type="button" id="stampaPdfDistinta" style="folat:rigth;margin-bottom: 10px;">Stampa distinta</button>
							</div>
<!-- 							<div class="col-lg-12"> -->
<!-- 								<button class="btn btn-primary" type="button" id="scaricaPdfDistinta" style="folat:rigth;margin-bottom: 10px;">Scarica distinta</button> -->
<!-- 							</div> -->
							<div class="col-lg-12">
								<button type="button" id="esportaCSV2"
									class="btn btn-outline btn-success" data-toggle="tooltip"
									data-placement="top" title="Esporta CSV"
									data-original-title="Esporta CSV">
								<i class="fa fa-file-text-o"> Export CSV</i>
								</button>
							</div>
						</div>
						
						</div>
						<div class="modal-body" >
						<table class="table table-bordered" id="tableDettaglioScatola"
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