<div class="modal fade" id="dettScatolaScartiModal" tabindex="-1"
	role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header" style="text-align: center">
				<h4>
					<label id="loadLstDettScatolaScarti" class="label label-info"></label>
				</h4>
				<h4>
					<label>Dettaglio Scarti per la scatola:</label> <span	id='codiceScatolaScarti'></span>
				</h4>
			</div>

			<div class="modal-body">
				<div class="row">
					<div class="col-md-6 mb-3">
						<label>Data creazione:</label> <span
							id='dataCreazioneScatolaScarti'></span>
					</div>

					<div class="col-md-6 mb-3">
						<label>Stato:</label> <span id='statoScatolaScarti'></span>
					</div>
				</div>

				<div class="row">
					<div class="col-md-6 mb-3">
						<label>Identificativo PA:</label> <span id='idPAScatolaScarti'></span>

					</div>
					<div class="col-md-6 mb-3">
						<label>Tipologia Istanza:</label> <span id='tipIstScatolaScarti'></span>

					</div>
				</div>

				<div class="row">
					<div class="col-md-6 mb-3">
						<label>Numero pratiche contenute:</label> <span
							id='numPraticheScatolaScarti'></span>
					</div>

					<div class="col-md-6 mb-3">
						<label>Percentuale completamento:</label> <span
							id='percComplScatolaScarti'></span>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6 mb-3">
						<label>Data chiusura:</label> <span
							id='dataChiusuraScatolaScarti'></span>
					</div>
					<div class="col-md-6 mb-3">
						<label>Sito Lavorazione:</label> <span
							id='centroDematScatolaScarti'></span>
					</div>
				</div>
                 <div class="row">  
                    <div class="col-md-6 mb-3">
                        <label for="num_maxPratiche">Motivazione scarto:</label>
                        <span id='noteScatolaScarti'></span>	
                       
                    </div>
                  </div>
				<div id="divPraticheScarti" style="display: none">
					<div class="row" style="text-align: center;">
						<h3>
							<label class="label label-default">Elenco pratiche da selezionare</label>
						</h3>
					</div>
					<div class="row">
						<div class="col-md-12 mb-12">
							<table class="table table-condensed table-bordered"
								id="tablePraticheScatoleScarti">
								<thead>
									<tr>
										<th>Pacchetto</th>
										<th>Progr Pacchetto</th>
										<!-- Progr Scatola -->
										<th>Codice Raccomandata</th>
										<th>Codice Scatola</th>
										<th>Stato Scatola</th>
										<th></th>
									</tr>
								</thead>
								<tbody>

								</tbody>
							</table>
						</div>
					</div>
					<div class="row" style="text-align: center;">
						<h3>
							<label class="label label-primary">Elenco pratiche
								selezionate da associare alla scatola</label>
						</h3>
					</div>
					<div class="row">
						<div class="col-md-12 mb-12">
							<table class="table table-condensed table-bordered"
								id="tablePraticheScatoleScarti_Selected">
								<thead>
									<tr>
										<th>Pacchetto</th>
										<th>Progr Pacchetto</th><!-- Progr Scatola -->
										<th>Codice Raccomandata</th>
										<th>Codice Scatola</th>
										<th>Stato Scatola</th>
										<th></th>
									</tr>
								</thead>
								<tbody>

								</tbody>
							</table>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6 mb-3">
							<h4 style="font-style: oblique; text-align: left;">
								Num.Max.Pratiche da inserire: <span class="badge"
									id="num_max_pratiche_scarti"> </span>
							</h4>
						</div>
						<div class="col-md-6 mb-3">
							<h4 style="font-style: oblique; text-align: right;">
								Num. Pratiche inserite: <span class="label label-primary"
									id="num_pratiche_scarti_ins">0</span>
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<div class="row">
					<div class="col-md-12 mb-12" style="text-align: center;">
						<h4>
							<label id="lblWarningDettScarti" class="label label-warning"></label>
						</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 mb-12" style="text-align: center;">
						<button type="button" class="btn btn-primary" id="btnInsScarti" style="display: none;"><i class='glyphicon glyphicon-folder-close'></i> Inserisci Pratiche in Scatola</button>
						<button type="button" class="btn btn-primary" id="btnCambioScatolaScarti" style="display: none;"></button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/dettScatolaScartiModal.js"></script>