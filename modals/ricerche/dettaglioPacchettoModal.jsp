<div class="modal fade" id="dettaglioPacchettoModal"
	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header" style="text-align: center;">
					<h3 class="modal-title">Dettaglio Pacchetto <label  id="title_dett_pacchetto"></label></h3>
				    <h4><label id="loadFields" class="label label-info"></label></h4>
				</div>
				 
				<div class="modal-body">
					<div class="modal-header">
						<h3 class="modal-title" id="title_dett_pratiche">Dettaglio Pratiche</h3>
					</div>
					<div class="row">     
                        <table class="table table-bordered" id="dettaglioPratica">
							<thead>
								<tr>
									<th data-field="codRaccomandata">Codice Raccomandata</th>
									<th data-field="operatore">Operatore</th>
									<th data-field="centroDemat">Centro Demat</th>
									<th data-field="descrizioneStato">Stato</th>				
								</tr>
							</thead>
						</table>
                    </div>   
                    <hr>
					<div class="modal-header">
						<h3 class="modal-title" id="title_dett_pacc_trk">Dettaglio Pacchetto Tracking</h3>
					</div>
					<div class="row">
						<table class="table table-bordered" id="dettaglioPacchettoTrk"
						 data-toolbar="#toolbar-table"
						data-pagination="true" data-page-size="5"
						data-page-list="[5,10, 20, 50, 100]" data-show-refresh="false"
						data-show-toggle="false" data-mobile-responsive="true"
						data-check-on-init="true" data-click-to-select="true"
						data-show-columns="false" data-id-field="object_id"
						class="table-hover" data-toggle="table"	data-sort-name="dataAggiornamento" data-sort-order="desc">
							<thead>
							<tr>	
								<th data-field="codicePacchetto" data-sortable="true">Codice Pacchetto</th>
								<th data-field="dataAggiornamento" data-sortable="true">Data Aggiornamento</th>
								<th data-field="descrizione" data-sortable="true">Descrizione</th>
								<th data-field="nomeFileArchivio" data-sortable="true">Nome File Archivio</th>
								<th data-field="numDocPacchetto" data-sortable="true">Num Doc Pacchetto</th>
								<th data-field="numDocInviati" data-sortable="true">Num Doc Inviati</th>
								<th data-field="descrizioneStato" data-sortable="true">Stato</th>
							</tr>
						</thead>
						</table>
					</div>  

	
				</div>
				<div class="modal-footer" id='dettPacchettoModalFooter'>
					<button type='button' class='btn btn-primary' aria-label='Indietro' id='btnIndietroDettPacchetto' style="display: none">Indietro</button>						
					<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
				</div>
			</div>
	
	</div>
	<div id="spinnerContainerModal" class="spinner"></div>
</div>