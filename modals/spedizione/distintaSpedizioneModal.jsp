<div class="modal fade" id="distintaSpedizioneModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content printable" >       
           <div class="modal-header" style="text-align: center">
                <h4><label id="print_loadLstDettSpedizione" class="label label-info"></label></h4>
     			
           </div>
	            
         <div class="modal-body" id="printableAreaDettScatola">
         	<div class="row" style="text-align: center;">
         		<div class="col-md-12 mb-3">
         			<h4><label>Distinta per la LdV</label>	<span id='print_codiceLdV'></span></h4>	
         		</div>		 	
         	</div>
           	<div class="row" style="text-align: center;">
           		<div class="col-md-12 mb-3">
         	 		<img src=""  id="imgBcDistintaSpedizione" width="300"></img>	
         	 		<hr>	
         	 	</div>						 	
         	</div>       	
				<div class="row">  
				    <div class="col-md-6 mb-3" >
					    <label>Data creazione:</label> <span id='print_dataCreazioneDistinta'></span>
				    </div>

				    <div class="col-md-6 mb-3">
				    	<label>Operatore:</label> <span id='print_operatoreDistinta'></span>					   		    	
				    </div>
				</div>
				
				<div class="row" style="text-align: center;">
				  <div class="col-md-12 mb-6" style="text-align: center;">  
				  <h5><label>Elenco scatole</label></h5>	
					<table class="table table-condensed table-bordered" id="print_tableDettScatole">
	                	<thead>
							<tr>
								<th>Codice_Scatola</th>		
								<th>Data_Chiusura</th>						
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
					</div>
				</div>       	
         </div>
         <div class="modal-footer">
		  <button type="button" class="btn btn-primary" id="printDistintaSpedizione"><i class="glyphicon glyphicon-list-alt"></i> Stampa Distinta</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
   </div>
</div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/spedizione/distintaSpedizioneModal.js"></script>