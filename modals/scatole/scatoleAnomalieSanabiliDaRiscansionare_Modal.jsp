<div class="modal fade" id="ASRModal"
	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true"  role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">CONFERMA RI-SCANSIONE SCATOLA</h4>
      </div>
      <div class="modal-body">
				<div class="modal-body">
					<h5>
						Confermi di aver ri-scansionato la scatola <b
							id="identificativoScatolaPrint"></b>?
					</h5>
				</div>

				<div >
					<div class="col-lg-12 alert alert-danger" id="div_error_alert"
						style="display: none">
						<strong>Errore! </strong> <span id="danger_msg"></span>
					</div>
				</div>
				<div >
					<div class="col-lg-12 alert alert-success" role="alert"
						id="div_success_alert" style="display: none">
						<span id="success_msg"></span>
					</div>
				</div>
				<div class="row"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="conferma">Conferma</button>
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal">Chiudi</button>

				</div>
			</div>
  </div>
</div>