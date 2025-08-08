<%@ page import="it.citel.postel.commonLib.constants.ServiziCostants"%>
<div class="modal fade" id="configurazioneServizioModal" tabindex="-1"
	role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title" id="titleAddMod_Modal">Configurazioni Servizi</h3>
				    <h4><label id="loadFieldsModal" class="label label-info"></label></h4>
				</div>
				 
				<div class="modal-body">
					<div class="row">     
                          <div class="col-lg-6 col-md-4" style="padding-left: 30px;">
                              <label for="clientiModal">Cliente: </label>
                              <select id="clientiModal" class="form-control is-valid" required></select>
                          </div>
                          <div id="listaFiltriServizi" class="col-lg-12">
                          	<!-- popolamento da tabella cs_servizi -->
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
					<button type="button" id="buttonConfiguraServizio" class="btn btn-primary" >Configura Servizio</button>				
					<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
				</div>
			</div>
	</div>
	<div id="spinnerContainerModal" class="spinner"></div>
</div>
<script
	src="${pageContext.servletContext.contextPath}/resources/template/js/configurazione/configurazioneServizioModal.js"></script>