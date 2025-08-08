<div class="modal fade" id="configurazioneIndririRest_ModificaModal" style="overflow-y:auto; tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">      
         <div class="modal-header">
         <h3 class="modal-title" id="titleModal"></h3>

         </div>
         
         <div class="modal-body">

            <input type="hidden" id="idDelivery" />
            
            <div class="row">
	          	  <div class="col-lg-12 col-md-6">
	            	<h4 class="modal-title" id="subTitleModal"></h4>
	            </div>
	        </div>
	        <br>
            
			<form>
                    <div class="row">   
                          <div class="col-lg-6 col-md-4">
                          	  <div>
	                              <label for="intestatarioUpdModal">Intestatario: </label>
	                              <input type="text" id="intestatarioUpdModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          <div class="col-lg-6 col-md-4">
                          	  <div>
	                              <label for="referenteUpdModal">Referente: </label>
	                              <input type="text" id="referenteUpdModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          
                          </div>
                          <hr>
                           <div class="row">
                            <div class="col-lg-4 col-md-4">
                          	  <div>
	                              <label for="aliasIndUpdModal">Alias Indirizzo: </label>
	                              <input type="text" id="aliasIndUpdModal" class="form-control is-valid" required /> 				      
                          	  </div>
                          </div>
                          <div class="col-lg-8 col-md-4">
                          	  <div>
	                              <label for="indirizzoUpdModal">Indirizzo: </label>
	                              <input type="text" id="indirizzoUpdModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          <div class="col-lg-2 col-md-4">
                          	  <div>
	                              <label for="capUpdModal">CAP: </label>
	                              <input type="text" id="capUpdModal" class="form-control is-valid" maxlength='5' oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />				      
                          	  </div>
                          </div>
                          <div class="col-lg-6 col-md-2">
                          	  <div>
	                              <label for="cittaUpdModal">Citta': </label>
	                              <input type="text" id="cittaUpdModal" class="form-control is-valid" required />				      
                          	  </div>
                          </div>
                          <div class="col-lg-2 col-md-4">
                          	  <div>
	                              <label for="provinciaUpdModal">Provincia: </label>
	                              <input type="text" id="provinciaUpdModal" class="form-control is-valid" required maxlength='2' style="text-transform:uppercase;" onkeypress="return /[a-z]/i.test(event.key)" />				      
                          	  </div>
                          </div>
                          
                          <div class="col-lg-2 col-md-4">
                          	  <div>
	                              <label for="codNazUpdModal">Codice Nazione: </label>
	                              <input type="text" id="codNazUpdModal" class="form-control is-valid" required maxlength='3' style="text-transform:uppercase;" onkeypress="return /[a-z]/i.test(event.key)" />				      
                          	  </div>
                          </div>
                          </div>
                          <hr>
                           <div class="row">
	                           <div class="col-lg-5 col-md-4">
	                          	  <div>
		                              <label for="emailUpdModal">Email: </label>
		                              <input type="email" id="emailUpdModal" class="form-control is-valid" required />				      
	                          	  </div>
	                          </div>
	                          
	                          <div class="col-lg-3 col-md-4">
	                          	  <div>
		                              <label for="telefonoUpdModal">Telefono: </label>
		                              <input type="tel" id="telefonoUpdModal" class="form-control is-valid" required />				      
	                          	  </div>
	                          </div>
                          
                          </div>
                          
                          </form>
                   <div class="row"><br></div>       
  				 <div class="row">
			  		<div class="col-lg-12 col-md-6">
					<div class="alert alert-danger" id="div_error_alert_modal"
						style="display: none">
						<strong>Errore! </strong> <span id="danger_msg_modal"></span>
					</div>
					<div class="alert alert-success" role="alert" id="div_success_alert_modal"
						style="display: none">
						<span id="success_msg_modal"></span>
					</div>
					</div>
		  		
  </div>
		  		
		  			
			</div>
			<div class="modal-footer">
            <button type="button" class="btn btn-primary" id="confermaCancella">Elimina</button>
            <button type="button" class="btn btn-primary" id="confermaAggiorna">Aggiorna</button>
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
           </div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/configurazione/configurazioneDelivery_Modal.js"></script>