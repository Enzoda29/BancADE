<div class="modal fade" id="dettaglioSpedizioneModal" tabindex="-1"
	role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-content modal-dialog modal-dialog-centered modal-lg"
		role="document">
		<div class="modal-header" id="modalHeader">
			<h5 class="modal-title">DETTAGLIO SPEDIZIONE</h5>
		</div>
		<div class="modal-body" id="modalBody">
			<div class="row">
				<div class="col-lg-3">
					<label>ID Spedizione :</label><input type="text" value=""
						name="spedizioneId" id="spedizioneId" readonly/>
				</div>
<!-- 				<div class="col-lg-3"> -->
<!-- 					<label>ID Aggregato :</label><input type="text" value="" -->
<!-- 						name="aggregatoId" id="aggregatoId" readonly/> -->
<!-- 				</div> -->
				<div class="col-lg-3">
					<label>Lettera di vettura :</label><input type="text" value=""
						name="letteraDiVettura" id="letteraDiVettura" readonly/>
				</div>
				<div class="col-lg-3">
					<label>Nome vettore :</label><input type="text" value=""
						name="nomeVettore" id="nomeVettore" readonly/>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<table class="table"
						style="width: 100% !important" id="tableEsitoRicercaSpedizioni">
						<thead>
							<tr>
								<th>Stato SDA</th>
<!-- 								<th>Aggregato</th> -->
								<th>Descrizione</th>
								<th>Data</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<hr>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-6">
					<label>Stato spedizione :</label> <select id="statoSpedizione">
						<option value="100">Creata</option>
						<option value="200">Prelevata</option>
						<option value="300" disabled>Consegnata</option>
					</select>
				</div>
				<div class="col-lg-6">
					<label>Data ritiro stabilimento :</label> <input type="text"
						id="dataRitiro" />
				</div>
			</div>
			<div class="row">
				<div class="col-lg-6"></div>
				<div class="col-lg-6">
					<label>Note :</label> <textArea id="note" rows="4" cols="50" style="resize:none;"></textArea>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-8"></div>
				<div class="col-lg-4">
					<button type="button" class="btn btn-primary" id="aggiorna">Aggiorna spedizione</button>
					<button type="button" class="btn btn-primary" id="chiudi" data-dismiss="modal">Chiudi</button>
				</div>
			</div>
		</div>
	</div>
</div>
<script
	src="${pageContext.servletContext.contextPath}/resources/template/js/restituzioneMaterialita/modalDettaglioSpedizioni.js"></script>