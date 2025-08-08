<div class="modal fade" id="distintaScatolaScartiModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content printable" >       
           <div class="modal-header" style="text-align: center">
                <h4><label id="print_loadLstDettScatola" class="label label-info"></label></h4>
     			
           </div>
	            
         <div class="modal-body" id="printableAreaDettScatolaScarti">
         	<div class="row" style="text-align: center;">
         		<div class="col-md-12 mb-3">
         			<h4><label>Distinta per la scatola:</label>	<span id='print_codiceScatolaScarti'></span></h4>	
         		</div>		 	
         	</div>
           	<div class="row" style="text-align: center;">
           		<div class="col-md-12 mb-3">
         	 		<img src=""  id="imgBcDistintaScatolaScarti" width="300"></img>	
         	 		<hr>	
         	 	</div>						 	
         	</div>       	
				<div class="row">  
				    <div class="col-md-6 mb-3" >
					    <label>Data creazione:</label> <span id='print_dataCreazioneScatolaScarti'></span>
				    </div>

				    <div class="col-md-6 mb-3">
				    	<label>Stato:</label> <span id='print_statoScatolaScarti'></span>					   		    	
				    </div>
				</div>
					<div class="row">  
					    <div class="col-md-6 mb-3">
					    	<label>Identificativo PA:</label> <span id='print_idPAScatolaScarti'></span> 
						   
					    </div>
					    <div class="col-md-6 mb-3">
					    	<label>Tipologia Istanza:</label> <span id='print_tipIstScatolaScarti'></span>
						    		    	
					    </div>
					</div>
				<div class="row">  
				    <div class="col-md-6 mb-3">
				    	<label>Numero pratiche contenute:</label> <span id='print_numPraticheScatolaScarti'></span>					 		    	
				    </div>
					    <div class="col-md-6 mb-3">
					   		 <label>Percentuale completamento:</label> <span id='print_percComplScatolaScarti'></span>				   	
					    </div>
				</div>
				<div class="row"> 
					<div class="col-md-6 mb-3" >
					    <label>Data chiusura:</label> <span id='print_dataChiusuraScatolaScarti'></span>
				    </div> 
				    <div class="col-md-6 mb-3" >
					    <label>Sito Lavorazione:</label> <span id='print_centroDematScatolaScarti'></span>
				    </div>
				</div>    
				<div class="row">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="print_tableDettScatoleScarti">
	                	<thead>
							<tr>
								<th>Pacchetto</th>
								<th>Progr Pacchetto</th><!-- Progr Scatola -->
								<th>Codice Raccomandata</th>					
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
					</div>
				</div>       	
         </div>
         <div class="modal-footer">
		  <button type="button" class="btn btn-primary" id="printDistintaScarti"><i class="glyphicon glyphicon-list-alt"></i> Stampa Distinta</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
   </div>
</div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/distintaScatolaScartiModal.js"></script>