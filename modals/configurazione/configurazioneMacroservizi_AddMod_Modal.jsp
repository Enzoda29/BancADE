<div class="modal fade" id="configurazioneMacroservizio_AddMod_Modal"
	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<form id="">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title" id="titleAddMod_Modal"></h3>
				    <h4><label id="loadFields" class="label label-info"></label></h4>
				</div>
				 
				<div class="modal-body">
					<div class="row">     
                          <div class="col-lg-4 col-md-4">
                              <label for="clienti">Cliente: </label>
                              <select id="clienti" class="form-control is-valid" required></select>
                          </div>

                          <div class="col-lg-4 col-md-4">
                              <label for="servizi">Servizio: </label>
                              <select id="servizi" class="form-control is-valid" required> </select>				      
                          </div>
                          
                          <div class="col-lg-4 col-md-4">
                          	  <div>
	                              <label for="codMacroservizio">Codice macroservizio: </label>
	                              <input type="text" id="codMacroservizio" class="form-control is-valid" maxlength="20"/>
                              </div>
                          </div> 
                    </div>
                    <div class="row top-buffer">     
<!--                     <div class="col-lg-4 col-md-4"> --> 

							<div class="modal-body">
								<div class="alert alert-danger" id="div_error_alert_modal"
									style="display: none">
									<strong>Errore! </strong> <span id="danger_msg_modal"></span>
								</div>
								<div class="alert alert-success" role="alert"
									id="div_success_alert_modal" style="display: none">
									<span id="success_msg_modal"></span>
								</div>
							</div>


<!--                           </div> -->
                        </div>     
				</div>
				<div class="modal-footer">
					<button type="button" id="pulisciFiltri" class="btn btn-primary" >Pulisci</button>
					<button type="button" id="verificaAddMS" class="btn btn-primary" >Aggiungi Macroservizio</button>				
					<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
				</div>
			</div>
		</form>
	</div>
	<div id="spinnerContainerModal" class="spinner"></div>
</div>
<script	src="${pageContext.servletContext.contextPath}/resources/template/js/configurazione/configurazioneMacroservizi_Modal.js"></script>