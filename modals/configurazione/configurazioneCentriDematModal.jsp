<div class="modal fade" id="configurazioneCentroDematModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">      
         <div class="modal-header">
            <input type="hidden" id="tipo" />
            <input type="hidden" id="idCentro" />
            <form>
            <div class="form-group">
    			<label for="codiceCentroModal">CODICE CENTRO:</label>
    			<input class="form-control" id="codiceCentroModal" placeholder="Immetti il codice" onkeydown="upperCaseF(this)">
  			</div>
            <div class="form-group">
    			<label for="departmentModal">DEPARTMENT:</label>
    			<input class="form-control" id="departmentModal" placeholder="Immetti il department" onkeydown="upperCaseF(this)">
  			</div>
            <div class="form-group">
    			<label for="descrizioneModal">DESCRIZIONE:</label>
    			<input type="email" class="form-control" id="descrizioneModal" aria-describedby="descrizioneHelp" placeholder="Immetti la descrizione" onkeydown="upperCaseF(this)">
  			</div>
            <div class="form-group">
    			<label for="localitaModal">LOCALITA':</label>
    			<input class="form-control" id="localitaModal" placeholder="Immetti la località" onkeydown="upperCaseF(this)">
  			</div>
            </form>
			<hr>
            <button type="button" id="azione" class="btn btn-default">OK</button>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>

   </div>
  </div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/configurazione/configurazioneCentriDematModal.js"></script>