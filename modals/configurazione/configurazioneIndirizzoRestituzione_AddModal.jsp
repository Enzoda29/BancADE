<div class="modal fade" id="configurazioneIndirizzoRestituzione_AddModal" style="overflow-y:auto; "tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">      
         <div class="modal-header">
         		<h3 class="modal-title">Aggiungi nuovo indirizzo di restituzione</h3>
         </div>
            
         <div class="modal-body">
         <div class="row">
         <h4><label id="loadFields_addModal" class="label label-info"></label></h4>
         </div>
					<div class="row">     
                          <div class="col-lg-4 col-md-4 col-md-offset-4">
                              <label for="clienti">Cliente: </label>
                              <select id="lstclientiAddModal" class="form-control is-valid" required></select>
                          </div>
                    </div>
                    <hr>
				<form>
                    <div class="row">   
                          <div class="col-lg-6 col-md-4">
                          	  <div>
	                              <label for="intestatarioAddModal">Intestatario: </label>
	                              <input type="text" id="intestatarioAddModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          <div class="col-lg-6 col-md-4">
                          	  <div>
	                              <label for="referenteAddModal">Referente: </label>
	                              <input type="text" id="referenteAddModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          
                          </div>
                          <hr>
                           <div class="row">
                            <div class="col-lg-4 col-md-4">
                          	  <div>
	                              <label for="aliasIndAddModal">Alias Indirizzo: </label>
	                              <input type="text" id="aliasIndAddModal" class="form-control is-valid" required /> 				      
                          	  </div>
                          </div>
                          <div class="col-lg-8 col-md-4">
                          	  <div>
	                              <label for="indirizzoAddModal">Indirizzo: </label>
	                              <input type="text" id="indirizzoAddModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          <div class="col-lg-2 col-md-4">
                          	  <div>
	                              <label for="capAddModal">CAP: </label>
	                              <input type="text" id="capAddModal" class="form-control is-valid" maxlength='5' oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />				      
                          	  </div>
                          </div>
                          <div class="col-lg-6 col-md-2">
                          	  <div>
	                              <label for="cittaAddModal">Citta': </label>
	                              <input type="text" id="cittaAddModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          <div class="col-lg-2 col-md-4">
                          	  <div>
	                              <label for="provinciaAddModal">Provincia: </label>
	                              <input type="text" id="provinciaAddModal" class="form-control is-valid" required maxlength='2' style="text-transform:uppercase;" onkeypress="return /[a-z]/i.test(event.key)" />				      
                          	  </div>
                          </div>
                          
                          <div class="col-lg-2 col-md-4">
                          	  <div>
	                              <label for="codNazAddModal">Codice Nazione: </label>
	                              <input type="text" id="codNazAddModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          </div>
                          <hr>
                           <div class="row">
	                           <div class="col-lg-3 col-md-4 col-md-offset-2" >
	                          	  <div>
		                              <label for="emailAddModal">Email: </label>
		                              <input type="email" id="emailAddModal" class="form-control is-valid" />				      
	                          	  </div>
	                          </div>
	                          
	                          <div class="col-lg-3 col-md-4 col-md-offset-2">
	                          	  <div>
		                              <label for="telefonoAddModal">Telefono: </label>
		                              <input type="tel" id="telefonoAddModal" class="form-control is-valid" />				      
	                          	  </div>
	                          </div>
                          
                          </div>
                          
                          </form>
                    
                    					
                    <div class="row top-buffer">     
<!--                     <div class="col-lg-4 col-md-4"> --> 

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


<!--                           </div> -->
                        </div>     
				</div>
			<div class="modal-footer">
			<button type="submit" id="azioneAddModal" class="btn btn-primary">Inserisci</button>
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
            </div>
            
            
            </div>
            

			
   </div>
  </div>

<script src="${pageContext.servletContext.contextPath}/resources/template/js/configurazione/configurazioneIndirizzoRestituzione_AddModal.js"></script>