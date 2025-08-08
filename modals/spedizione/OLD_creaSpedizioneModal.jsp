<div class="modal fade" id="creaSpedizioneModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">    

	    <form id="formCreaSpedizione">       
           <div class="modal-header" style="text-align: center">
           		<h3><label>Crea Spedizione:</label></h3>
     			<h4><label id="loadLstCreaSpedizione" class="label label-info"></label></h4>
     			<h4><label id="lblWarningCreaSpedizione" class="label label-warning"></label></h4>
           </div>
	            
         <div class="modal-body" style="text-align: center">
 
         	 	<div class="row">     
         	 		<div class="col-md-6 mb-3">
				      <label for="tipoIstanza">Tipologia Istanza</label>
				      <select id="tipoIstanza" class="form-control is-valid" required> </select>				      
				    </div> 
				    <div class="col-md-6 mb-3">
				    	<label for="identificativoPA">Identificativo PA</label>
				    	<select id="identificativoPA" class="form-control is-valid" required></select>
				    </div>
				</div>
				<div class="row">  
					<div class="col-md-6 mb-3">
				    	<label for="num_maxPratiche">Vettore Spedizione</label>
				    	<select id="vettore" class="form-control is-valid" required></select>
				    </div>
				 	<div class="col-md-6 mb-3">
				    	<label for="num_maxPratiche">Nota</label>
				    	<textarea id="nota" class="form-control noresize" ></textarea>
				    </div>
				</div>
				
				  <div class="row" style="text-align: center;">
		         	 <h3><label class="label label-default">Elenco scatole da selezionare</label></h3>
		         </div>		

				<div class="row">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="tableScatola">
	                	<thead>
							<tr>
								<th>Codice Scatola</th>
								<th>Num Pratiche Inserite</th>
								<th>Data Creazione</th>	
								<th>Data Chiusura</th>	
								<th></th>						
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
					</div>
				</div> 
				 <div class="row" style="text-align: center;">
		         	 <h3><label class="label label-primary">Elenco scatole selezionate</label></h3>
		         </div>
 
				<div class="row">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="tableScatolaSelected">
	                	<thead>
							<tr>
								<th>Codice Scatola</th>
								<th>Num Pratiche Inserite</th>
								<th>Data Creazione</th>	
								<th>Data Chiusura</th>	
								<th></th>						
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
					</div>
				</div>   
				     	
         </div>
         <div class="modal-footer">
			<div class="row">
				 <div class="col-md-12 mb-12" style="text-align: center;"> 
		    		<h4><label id="lblWarningSpedizione" class="label label-warning"></label></h4>
		    	</div>
		    </div>
		    <div class="row">
				 <div class="col-md-12 mb-12" style="text-align: center;"> 
				 <button type="submit" id="submitCreaSpedizione" class="btn btn-primary">Crea Spedizione</button>
		          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          	</div>
		  </div>
        </div>
      </form>   
   </div>
</div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/spedizione/creaSpedizioneModal.js"></script>