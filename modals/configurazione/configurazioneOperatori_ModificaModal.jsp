<div class="modal fade" id="configurazioneOperatoriModificaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h3 id="titleUPD" class="modal-title"></h3>
			</div>
			
			<div class="modal-body">
				<div class="row">
				<div class="col-lg-12"><h4 id="descTitle"></h4></div>
					<h4>
						<label id="loadFields" class="label label-info"></label>
					</h4>
					<form method="post" modelAttribute="userForm"
						action="pageContext.servletContext.contextPath}/configurazione/add/operatore">
						<div class="col-lg-6 col-md-7">
						<input type="hidden" id="typeOperation" value="">
						<input type="hidden" id="ID_OP_UPD" value="">
							<div class="form-group">
								<label>Username</label> <input id="usernameUpd"
									class="form-control" path="username" type="text" />
								<p class="text-danger">
									<errors path="usernameUpd" />
								</p>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<label>Descrizione</label> <input id="descUserUpd"
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
<!-- 							<select id="listProfiliUpd" class="form-control is-valid"></select> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<div class="col-lg-6 col-md-6">
						<div class="form-group">
							<label>Centro Dematerializ.</label>
							<!-- 								<select  class="form-control select-lg" path="centroDemat"> -->
							<!-- 									<options items="listaCentriDemat" /> -->
							<!-- 								</select> -->
							<select id="listCentroDematUpd" class="form-control is-valid"></select>
						</div>
					</div>


				</div>

				<hr>


				<div class="row">
					<div class="col-lg-6 col-md-6">
						<div class="form-group">
							<label>Email</label> <input id="emailUpd" class="form-control"
								path="password" />
							<p class="text-danger">
								<errors path="password" />
							</p>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="form-group">
							<label>Telefono fisso</label> <input id="telfissoUpd"
								class="form-control" path="telfissoUpd" type="text" />
							<p class="text-danger">
								<errors path="passwordConfirm" />
							</p>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="form-group">
							<label>Telefono mobile</label> <input id="telMobileUpd"
								class="form-control" path="telMobileUpd" type="text" />
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
						<div class="alert alert-danger" id="div_error_alert_upd_modal"
							style="display: none">
							<strong>Errore! </strong> <span id="danger_msg_upd_modal"></span>
						</div>
						<div class="alert alert-success" role="alert"
							id="div_success_alert_upd_modal" style="display: none">
							<span id="success_msg_upd_modal"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" id="buttonUpdOperatore" class="btn btn-primary"></button>
				<button type="button" class="btn btn-default" data-dismiss="modal"
					aria-label="Close">Close</button>
			</div>
		</div>
	</div>
</div>
	