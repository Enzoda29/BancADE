<div class="modal fade" id="accettaScatolaSospesiModal" tabindex="-1"
	role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">


				<div class="modal-header" style="text-align: center">
					<h4>
						<label id="loadLstAccSospesi" class="label label-info"></label>
					</h4>
					<h4>
						<label id="lblWarningAccSospesi" class="label label-warning"></label>
					</h4>
					<h3>
						<label>Accettazione scatola sospesi</label>
					</h3>
				</div>

				<div class="modal-body" style="text-align: center">

					<div class="row">
						<div class="col-md-4 col-md-offset-4">
							<label for="codiceScatolaSOS">Inserire Codice Scatola</label>
							 <input	type="text" class="form-control is-valid" id="codiceScatolaSOS"
								placeholder="Codice Scatola SOS" maxlength="10" size="10"
								required>
							<button class="btn btn-warning btn-sm" id="checkAccettaSospesi">Invia</button>
						</div>
					</div>

					<div id="rowCodiceRaccomandata" style="display: none">
						<div class="row" style="margin-top: 15px">
							<div class="col-md-6 col-md-offset-3">
								<h3>
									<label class="label label-default">Scatola Selezionata:	<span id='lblScatolaSelected'></span></label>
								</h3>
								<input type="text" class="form-control is-valid" id="codiceRaccomandata" placeholder="Inserisci Codice Raccomandata" onkeypress="return isNumberKey(event)" >
								<button class="btn btn-warning btn-sm"	id="btnAddCodiceRaccomandata">Aggiungi</button>
								<h4><label id="lblWarningCodRacc" class="label label-warning"></label>	</h4>
							</div>
						</div>
					</div>
	                    <div class="row" style="margin-top: 15px">
	                        	<div class="col-lg-12 alert alert-danger" id="div_error_alert_SCATOLA_SOSPESI" style="display: none">
									<button type="button" class="close" onclick="$('#div_error_alert_SCATOLA_SOSPESI').hide()">&times;</button>
									<strong>Attenzione!</strong> <span id="danger_msg_SCATOLA_SOSPESI"></span>
								</div>
	                     </div>
	                    <div class="row">
	                        <div class="col-lg-12 alert alert-success" id="div_success_alert_SCATOLA_SOSPESI" style="display: none">
								<button type="button" class="close" onclick="$('#div_success_alert_SCATOLA_SOSPESI').hide()">&times;</button>
								<strong>Success!</strong> <span id="success_msg_SCATOLA_SOSPESI"></span>
							</div>
	                    </div>						

					 <div class="row" id="rowCasellari">  </div>
	                 <div class="row" id="rowScatoleANP">  </div>
				</div>
				<div class="modal-footer">
					<div class="row">
						<div class="col-md-12 mb-12" >
							<!-- <button type="button" id="submitAccettaSospesi" class="btn btn-primary">Accetta</button> -->
							<button type="button" id="closeAccettaSospesi" class="btn btn-default">Close</button>
						</div>
					</div>
				</div>

		</div>
		<div id="appendTo"></div>
	</div>
</div>
<div id="Warning" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered" style="
    position: relative;
    top: 12rem;
    width: 50%;
">
    
        <!-- Modal content-->
        <div class="modal-content">
        <div class="modal-header">
                	<h4 class="modal-title">Attenzione</h4>
        </div>
            <div class="modal-body">
                <p id="closeMsg"></p>
                <div class="modal-footer">
					<div class="row">
						<div class="col-md-12 mb-12" >
                			<!-- <button type="button" id="confirmClose" class="btn btn-primary" >Conferma accettazione</button> -->
                			<button type="button" id="suspendClose" class="btn btn-secondary" data-dismiss="modal" >Si</button>
                			<button type="button" id="cancelClose" class="btn btn-primary" data-dismiss="modal" >Torna indietro</button>
                		</div>
                	 </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script	src="${pageContext.servletContext.contextPath}/resources/template/js/accettazione/modaleAccettazione.js"></script>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/accettaScatolaSospesiModal.js"></script>