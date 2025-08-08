<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<div class="modal fade" id="accettazioneModale_1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLongTitle">Preaccettazione Dispaccio</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Vuoi procedere con la preaccettazione del dispaccio?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
        <button type="button" class="btn btn-primary" id="proseguiPreaccettazione">Prosegui</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="accettazioneModale_NOPREADV" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLongTitle">Errore Preaccettazione Dispaccio</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Non è stato trovato nessun Dispaccio con questo codice. Per sospendere il dispaccio cliccare sul tasto Inserisci in Sospesi altrimenti Annulla
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
        <button type="button" class="btn btn-primary" id="proseguiSospensione">Inserisci in Sospesi</button>
      </div>
      
    </div>
  </div>
</div>


<div class="modal fade" id="accettazioneModale_Message" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLongTitle">Errore Preaccettazione Dispaccio</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <span id="accettazioneModale_Message_messaggio">
       
       </span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="accettazioneModale_Sospesi" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog  modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLongTitle">Preaccettazione Dispaccio</h3>
<!--         <button type="button" class="close" data-dismiss="modal" aria-label="Close"> -->
<!--           <span aria-hidden="true">&times;</span> -->
<!--         </button> -->
      </div>
      <div class="modal-body">
				<div class="row">
					<div class="col-md-12">

						<h4 id="accettazioneModale_Message_messaggio">Il Dispaccio
							risulta gia' presente nella lista dei sospesi.</h4>
					</div>
				</div>
				<div class="row"><br></div>
				<div class="row">  
					    <div class="col-md-6 mb-3">
					    	<label>Codice Dispaccio:</label> <span id='codiceDispaccio'></span> 
						   
					    </div>
					    <div class="col-md-6 mb-3">
					    	<label>Data Inserimento:</label> <span id='dataInserimento'></span>
						    		    	
					    </div>
					    <div class="col-md-6 mb-3">
					    	<label>Operatore:</label> <span id='operatore'></span>
						    		    	
					    </div>
					    <div class="col-md-6 mb-3">
					    	<label>Postazione:</label> <span id='postazione'></span>
						    		    	
					    </div>
					</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
      </div>
    </div>
  </div>
</div>
<div class="row" style="margin-top: 15px">
	                        	<div class="col-lg-12 alert alert-danger" id="div_error_alert_PREACCETTAZION" style="display: none">
									<button type="button" class="close" onclick="$('#div_error_alert_PREACCETTAZION').hide()">&times;</button>
									<strong>Attenzione!</strong> <span id="danger_msg_PREACCETTAZIONE"></span>
								</div>
	                     </div>
	                     <div class="row">
	                        <div class="col-lg-12 alert alert-success" id="div_success_alert_PREACCETTAZIONE" style="display: none">
								<button type="button" class="close" onclick="$('#div_success_alert_PREACCETTAZIONE').hide()">&times;</button>
								<strong>Successo!</strong> <span id="success_msg_PREACCETTAZIONE"></span>
							</div>
	                    </div>	
	                    
	                  
<script
	src="${pageContext.servletContext.contextPath}/resources/template/js/preaccettazione/modaleAccettazione.js"></script>