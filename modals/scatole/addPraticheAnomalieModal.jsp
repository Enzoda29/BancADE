<div class="modal fade" id="addPraticheAnomalieModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">    

            <form id="formAddPratiche_ANM">       
                <div class="modal-header" style="text-align: center">
                    <h4><label id="loadLstAddPratiche_ANM" class="label label-info"></label></h4>
                    <h4><label id="lblWarningAddPratiche_ANM" class="label label-warning"></label></h4>
                    <h3><label>Aggiungi Pratiche Anomlie</label></h3>
                </div>

                <div class="modal-body" style="text-align: center">
                     <div class="row">     
                         <div class="col-md-6 mb-3">
                             <label for="identificativoPA_ANM">Identificativo PA</label>
                             <select id="identificativoPA_ANM" class="form-control is-valid" required></select>
                         </div>
                         <div class="col-md-6 mb-3">
                             <label for="tipoIstanza_ANM">Tipologia Istanza</label>
                             <select id="tipoIstanza_ANM" class="form-control is-valid" required> </select>				      
                         </div> 
                     </div>
					<div class="row" style="margin-top: 15px">  
						<div class="col-md-4 mb-3">
		         	 		<h4 style="font-style: oblique; text-align: left;">Num.Max.Pratiche da inserire: <span class="badge" id="num_max_pratiche_ANM"> </span></h4>
		         		 </div>
                        <div class="col-md-4 mb-3">
	     			 		<h3><input type="text" id="codScatola_ANM" placeholder="Codice Scatola" >
	     			 		<button class='glyphicon glyphicon-play' title='Seleziona scatola' id="btnSelScatola_ANM"></button>	</h3>
                      </div>
                       <div class="col-md-4 mb-3">
		         	 	<h4 style="font-style: oblique; text-align: right;">Num. Pratiche inserite: <span class="label label-primary" id="num_pratiche_ins_ANM">0</span></h4>
		         	 </div>
                    </div>  
                    <div class="row" style="margin-top: 15px">  
                        <div class="col-md-6 mb-3 col-md-offset-3">
                        <h3><input type="text" id="codiceRaccomandata_ANM" placeholder="Codice Raccomandata" onkeypress="return isNumberKey(event)" >
						<button class="glyphicon glyphicon-plus"	id="btnAddCodiceRacc_ANM"></button></h3>
					</div>
					<div class="row" style="margin-top: 15px">  	
						<h4><label id="lblWarningCodRacc_ANM" class="label label-warning"></label>	</h4>
                      </div>
                    </div>  
                    <div class="row" style="margin-top: 15px">
                       	<div class="col-lg-12 alert alert-danger" id="div_error_alert_ANM" style="display: none">
							<button type="button" class="close" onclick="$('#div_error_alert_ANM').hide()">&times;</button>
							<strong>Attenzione!</strong> <span id="danger_msg_ANM"></span>
						</div>
                     </div>
                    <div class="row">
                        <div class="col-lg-12 alert alert-success" id="div_success_alert_ANM" style="display: none">
							<button type="button" class="close" onclick="$('#div_success_alert_ANM').hide()">&times;</button>
							<strong>Success!</strong> <span id="success_msg_ANM"></span>
						</div>
                    </div>		
                   <div class="row" style="text-align: center;">
		         	 <h3><label class="label label-default">Elenco raccomandate selezionate</label></h3>
		           </div>		
                    <div class="row" style="margin-top: 15px">  
                        <div class="col-md-6 mb-3 col-md-offset-3">
                    <table class="table table-condensed table-bordered" id="tableRaccomadata_ANM">
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
		                 	<button type="button" id="submitAddPratiche_ANM" class="btn btn-primary">Inserisci Pratiche</button>   
		                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	                    </div>
                    </div>
                </div>
            </form>   
        </div>
    </div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/addPraticheAnomalieModal.js"></script>