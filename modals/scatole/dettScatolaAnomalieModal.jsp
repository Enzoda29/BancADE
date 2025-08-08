<div class="modal fade" id="dettScatolaAnomalieModal" tabindex="-1"
	role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header" style="text-align: center">
				<h4>
					<label id="loadLstDettScatolaAnomalie" class="label label-info"></label>
				</h4>
				<h4>
					<label>Dettaglio Anomalie per la scatola:</label> <span	id='codiceScatolaAnomalie'></span>
				</h4>
			</div>

			<div class="modal-body">
				<div class="row">
					<div class="col-md-6 mb-3">
						<label>Data creazione:</label> <span
							id='dataCreazioneScatolaAnomalie'></span>
					</div>

					<div class="col-md-6 mb-3">
						<label>Stato:</label> <span id='statoScatolaAnomalie'></span>
					</div>
				</div>

				<div class="row">
					<div class="col-md-6 mb-3">
						<label>Identificativo PA:</label> <span id='idPAScatolaAnomalie'></span>

					</div>
					<div class="col-md-6 mb-3">
						<label>Tipologia Istanza:</label> <span id='tipIstScatolaAnomalie'></span>

					</div>
				</div>

				<div class="row">
					<div class="col-md-6 mb-3">
						<label>Numero pratiche contenute:</label> <span
							id='numPraticheScatolaAnomalie'></span>
					</div>

					<div class="col-md-6 mb-3">
						<label>Percentuale completamento:</label> <span
							id='percComplScatolaAnomalie'></span>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6 mb-3">
						<label>Data chiusura:</label> <span
							id='dataChiusuraScatolaAnomalie'></span>
					</div>
					<div class="col-md-6 mb-3">
						<label>Sito Lavorazione:</label> <span
							id='centroDematScatolaAnomalie'></span>
					</div>
				</div>
				<div id="divPraticheAnomalie" style="display: none">
					<div class="row">
	         			<div class="col-md-12 mb-12">  
				         	 <h3>
				         	 	<input type="text" id="codRaccomandataDettAnom" placeholder="Codice Raccomandata" onkeypress="return isNumberKey(event)">		         	 
				         	 	<button class='glyphicon glyphicon-plus' title='Inserisci Raccomandata' id="btnCodRaccomandataDettAnom"></button>
				         	 </h3>
			         	 </div>
			         </div>
                    <div class="row" style="margin-top: 15px">
                       	<div class="col-lg-12 alert alert-danger" id="div_error_alert_DETT_SCA_ANOM" style="display: none">
							<button type="button" class="close" onclick="$('#div_error_alert_DETT_SCA_ANOM').hide()">&times;</button>
							<strong>Attenzione!</strong> <span id="danger_msg_DETT_SCA_ANOM"></span>
						</div>
                    </div>					
					<div class="row" style="text-align: center;">
						<h3>
							<label class="label label-default">Elenco pratiche
								anomale inserite nella scatola</label>
						</h3>
					</div>
					<div class="row">
						<div class="col-md-12 mb-12">
							<table class="table table-condensed table-bordered"
								id="tablePraticheScatoleAnomalie">
								<thead>
									<tr>
										<th>Pacchetto</th>
										<th>Progr Pacchetto</th>
										<!-- Progr Scatola -->
										<th>Codice_Raccomandata</th>
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
								id="tablePraticheScatoleAnomalie_Selected">
								<thead>
									<tr>
										<th>Pacchetto</th>
										<th>Progr_Pacchetto</th><!-- Progr Scatola -->
										<th>Codice_Raccomandata</th>
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
									id="num_max_pratiche_anomalie"> </span>
							</h4>
						</div>
						<div class="col-md-6 mb-3">
							<h4 style="font-style: oblique; text-align: right;">
								Num. Pratiche inserite: <span class="label label-primary"
									id="num_pratiche_ins_ANM">0</span>
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<div class="row">
					<div class="col-md-12 mb-12" style="text-align: center;">
						<h4>
							<label id="lblWarningDettAnomalie" class="label label-warning"></label>
						</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 mb-12" style="text-align: center;">
						<button type="button" class="btn btn-primary" id="btnInsAnomalie" style="display: none;"><i class='glyphicon glyphicon-folder-close'></i> Inserisci Pratiche in Scatola</button>
						<button type="button" class="btn btn-primary" id="btnCambioScatolaAnomalie" style="display: none;"></button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/dettScatolaAnomalieModal.js"></script>