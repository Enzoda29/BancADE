<div class="modal fade" id="configurazioneAnagraficaCliModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="modal-header">
      		<h3 id="titoloModal">Dettaglio Cliente:</h3>
            <input type="hidden" id="tipo" />
            <input type="hidden" id="idAnagr" />
          </div>
            <div class="modal-body">
            <form>
            <div class="form-group">
    			<label for="codiceModal">Codice:</label>
    			<input class="form-control" id="codiceModal" placeholder="Inserisci codice cliente" 
    				    onkeydown="upperCaseF(this)" maxlength="8">
  			</div>
            <div class="form-group">
    			<label for="identificativoModal">Identificativo:</label>
    			<input class="form-control" id="identificativoModal" placeholder="Inserisci identificativo cliente" 						onkeydown="upperCaseF(this)">
  			</div>
            <div class="form-group">
    			<label for="descrizioneModal">Descrizione:</label>
    			<input class="form-control" id="descrizioneModal" placeholder="Inserisci descrizione cliente" 						onkeydown="upperCaseF(this)">
  			</div>
            </form>
            
            <div class="row">
			<div class="col-lg-10 col-lg-10" id="modalMessage">
						<%@ include file="../../../pages/components/bootrap_error_alerts.jsp"%>
						<%@ include file="../../../pages/components/bootrap_success_alerts.jsp"%>
        	</div>
            </div>
        	</div>
            <div class="modal-footer">
					<button type="button" id="azione" class="btn btn-primary" >Aggiungi Macroservizio</button>				
					<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
			</div>
            
   </div>
  </div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/configurazione/configurazioneAnagraficaCliModal.js"></script>