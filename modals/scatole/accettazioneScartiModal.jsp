<div class="modal fade" id="accettazioneScartiModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">    

            <form id="formAccettazioneScarti">       
                <div class="modal-header" style="text-align: center">
                    <h4><label id="loadLstAccettazioneScarti" class="label label-info"></label></h4>
                    <h4><label id="lblWarningAccettazioneScarti" class="label label-warning"></label></h4>
                    <h3><label>Accettazione Scarti</label></h3>
                </div>

                <div class="modal-body" style="text-align: center">
                     <div class="row">     
                         <div class="col-md-6 mb-3">
                             <label for="identificativoPA">Identificativo PA</label>
                             <select id="identificativoPA" class="form-control is-valid" required></select>
                         </div>
                         <div class="col-md-6 mb-3">
                             <label for="tipoIstanza">Tipologia Istanza</label>
                             <select id="tipoIstanza" class="form-control is-valid" required> </select>				      
                         </div> 
                     </div>
                    <div class="row" style="margin-top: 15px">  
                        <div class="col-md-6 mb-3 col-md-offset-3">
                        <input type="text" class="form-control is-valid" id="codiceRaccomandata" placeholder="Inserisci Codice Raccomandata" onkeypress="return isNumberKey(event)" >
						<button class="btn btn-warning btn-sm"	id="btnAddCodiceRacc">Aggiungi</button>
						<h4><label id="lblWarningCodRacc" class="label label-warning"></label>	</h4>
                      </div>
                    </div>  
                    <div class="row" style="margin-top: 15px">
                       	<div class="col-lg-12 alert alert-danger" id="div_error_alert_ACC_SCARTI" style="display: none">
							<button type="button" class="close" onclick="$('#div_error_alert_ACC_SCARTI').hide()">&times;</button>
							<strong>Attenzione!</strong> <span id="danger_msg_ACC_SCARTI"></span>
						</div>
                     </div>
                    <div class="row">
                        <div class="col-lg-12 alert alert-success" id="div_success_alert_ACC_SCARTI" style="display: none">
							<button type="button" class="close" onclick="$('#div_success_alert_ACC_SCARTI').hide()">&times;</button>
							<strong>Success!</strong> <span id="success_msg_ACC_SCARTI"></span>
						</div>
                    </div>		
                   <div class="row" style="text-align: center;">
		         	 <h3><label class="label label-default">Elenco raccomandate selezionate</label></h3>
		           </div>		
                    <div class="row" style="margin-top: 15px">  
                        <div class="col-md-6 mb-3 col-md-offset-3">
                    <table class="table table-condensed table-bordered" id="tableRaccomadata">
	                	<thead>
							<tr>
								<th>Codice Raccomandata</th>	
								<th></th>									
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>   
					</div>               
                </div>
                <div class="modal-footer">
                	<div class="row">
	                	<div class="col-md-12 mb-12" style="text-align: center;">
		                 	<button type="button" id="submitAccettazione" class="btn btn-primary">GeneraPacchettoScarti</button>   
		                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	                    </div>
                    </div>
                </div>
            </form>   
        </div>
    </div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/accettazioneScartiModal.js"></script>