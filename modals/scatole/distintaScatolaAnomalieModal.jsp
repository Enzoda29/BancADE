<div class="modal fade" id="distintaScatolaAnomalieModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content printable" >       
           <div class="modal-header" style="text-align: center">
                <h4><label id="print_loadLstDettScatola" class="label label-info"></label></h4> 
                <input type="hidden" id="idPacchetto">    			
           </div>
	            
         <div class="modal-body" id="printableAreaDettScatolaAnomalie">
         	<div class="row" style="text-align: center;">
         		<div class="col-md-12 mb-3">
         			<h4><label>Distinta per la scatola:</label>	<span id='print_codiceScatolaAnomalie'></span></h4>	
         		</div>		 	
         	</div>
           	<div class="row" style="text-align: center;">
           		<div class="col-md-12 mb-3">
         	 		<img src=""  id="imgBcDistintaScatolaAnomalie" width="300"></img>	
         	 		<hr>	
         	 	</div>						 	
         	</div>       	
				<div class="row">  
				    <div class="col-md-6 mb-3" >
					    <label>Data creazione:</label> <span id='print_dataCreazioneScatolaAnomalie'></span>
				    </div>

				    <div class="col-md-6 mb-3">
				    	<label>Stato:</label> <span id='print_statoScatolaAnomalie'></span>					   		    	
				    </div>
				</div>
					<div class="row">  
					    <div class="col-md-6 mb-3">
					    	<label>Identificativo PA:</label> <span id='print_idPAScatolaAnomalie'></span> 
						   
					    </div>
					    <div class="col-md-6 mb-3">
					    	<label>Tipologia Istanza:</label> <span id='print_tipIstScatolaAnomalie'></span>
						    		    	
					    </div>
					</div>
				<div class="row">  
				    <div class="col-md-6 mb-3">
				    	<label>Numero pratiche contenute:</label> <span id='print_numPraticheScatolaAnomalie'></span>					 		    	
				    </div>
					    <div class="col-md-6 mb-3">
					   		 <label>Percentuale completamento:</label> <span id='print_percComplScatolaAnomalie'></span>				   	
					    </div>
				</div>
				<div class="row"> 
					<div class="col-md-6 mb-3" >
					    <label>Data chiusura:</label> <span id='print_dataChiusuraScatolaAnomalie'></span>
				    </div> 
				    <div class="col-md-6 mb-3" >
					    <label>Sito Lavorazione:</label> <span id='print_centroDematScatolaAnomalie'></span>
				    </div>
				</div>    
				<div class="row">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="print_tableDettScatoleAnomalie">
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
		  <button type="button" class="btn btn-primary" id="printDistintaAnomalie"><i class="glyphicon glyphicon-list-alt"></i> Stampa Distinta</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
   </div>
</div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/distintaScatolaAnomalieModal.js"></script>