
<div class="modal fade" id="configurazioneOperatoriAggiungiModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">

<!-- <div class="modal fade" id="configurazioneOperatoriAggiungiModal" -->
<!-- 	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" -->
<!-- 	aria-hidden="true"> -->
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title">Aggiungi Operatore</h3>
			</div>

			<div class="modal-body">
				<div class="row">
					<h4>
						<label id="loadFields" class="label label-info"></label>
					</h4>
					<form method="post" modelAttribute="userForm"
						action="pageContext.servletContext.contextPath}/configurazione/add/operatore">
						<div class="col-lg-6 col-md-7">
							<div class="form-group">
								<label>Username</label> <input id="usernameAdd"
									class="form-control" path="username" type="text" />
								<p class="text-danger">
									<errors path="usernameAdd" />
								</p>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<label>Descrizione</label> <input id="descUserAdd"
									class="form-control" path="username" type="text" />
								<p class="text-danger">
									<errors path="" />
								</p>
							</div>
						</div>
				</div>
				<hr>
				<div class="row">
<!-- 					<div class="col-lg-6 col-md-6"> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label>Profilo</label> -->
<!-- 															<select  class="form-control select-lg" path="profilo"> -->
<!-- 																<options items="listaProfili" /> -->
<!-- 															</select> -->
<!-- 							<select id="listProfiliAdd" class="form-control is-valid"></select> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<div class="col-lg-6 col-md-6">
						<div class="form-group">
							<label>Centro Dematerializ.</label>
							<!-- 								<select  class="form-control select-lg" path="centroDemat"> -->
							<!-- 									<options items="listaCentriDemat" /> -->
							<!-- 								</select> -->
							<select id="listCentroDematAdd" class="form-control is-valid"></select>
						</div>
					</div>


				</div>

				<hr>


				<div class="row">
					<div class="col-lg-6 col-md-6">
						<div class="form-group">
							<label>Email</label> <input id="emailAdd" class="form-control"
								path="password" />
							<p class="text-danger">
								<errors path="password" />
							</p>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="form-group">
							<label>Telefono fisso</label> <input id="telfissoAdd"
								class="form-control" path="telfissoAdd" type="text" />
							<p class="text-danger">
								<errors path="passwordConfirm" />
							</p>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="form-group">
							<label>Telefono mobile</label> <input id="telMobileAdd"
								class="form-control" path="telMobileAdd" type="text" />
							<p class="text-danger">
								<errors path="passwordConfirm" />
							</p>
						</div>
					</div>
				</div>






				<!-- 				<div class="row"> -->
				<!-- 					<div class="col-lg-4 col-md-6"> -->
				<!-- 						<input class="btn btn-primary btn-lg btn-block login-btn" -->
				<!-- 							name="submit" type="submit" value="Salva" /> -->
				<!-- 					</div> -->
				<!-- 				</div> -->
				</form>
				<div class="row top-buffer">

					<div class="modal-body">
						<div class="alert alert-danger" id="div_error_alert_add_modal"
							style="display: none">
							<strong>Errore! </strong> <span id="danger_msg_add_modal"></span>
						</div>
						<div class="alert alert-success" role="alert"
							id="div_success_alert_add_modal" style="display: none">
							<span id="success_msg_add_modal"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" id="buttonAddOperatore"
					class="btn btn-primary">Aggiungi Operatore</button>
				<button type="button" class="btn btn-default" data-dismiss="modal"
					aria-label="Close">Close</button>
			</div>
		</div>
	</div>
</div>
