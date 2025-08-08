
<!-- <div class="modal fade" id="accettazioneModale_1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLongTitle">Accettazione Materialità</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Vuoi procedere all'accettazione della materialità?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
        <button type="button" class="btn btn-primary" id="proseguiAccettazione">Prosegui</button>
      </div>
    </div>
  </div>
</div> -->

<div class="modal fade" id="accettazioneModale_NOPREADV" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLongTitle">Errore Accettazione Materialità</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Non è stato trovato nessun Preadvising per questa raccomandata, Per sospendere la pratica cliccare sul tasto Inserisci in Sospesi altrimenti Annulla
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
        <button type="button" class="btn btn-primary" id="proseguiAccettazioneNOPREADV">Inserisci in Sospesi</button>
      </div>
    </div>
  </div>
</div>

<script
	src="${pageContext.servletContext.contextPath}/resources/template/js/accettazione/modaleAccettazione.js"></script>