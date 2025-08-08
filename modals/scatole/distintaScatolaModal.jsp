<div class="modal fade" id="distintaScatolaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content printable" >       
           <div class="modal-header" style="text-align: center">
                <h4><label id="print_loadLstDettScatola" class="label label-info"></label></h4>
     			
           </div>
	            
         <div class="modal-body" id="printableAreaDettScatola">
         	<div class="row" style="text-align: center;">
         		<div class="col-md-12 mb-3">
         			<h4><label>Distinta per la scatola:</label>	<span id='print_codiceScatola'></span></h4>	
         		</div>		 	
         	</div>
           	<div class="row" style="text-align: center;">
           		<div class="col-md-12 mb-3">
         	 		<img src=""  id="imgBcDistintaScatola" width="300"></img>	
         	 		<hr>	
         	 	</div>						 	
         	</div>       	
				<div class="row">  
				    <div class="col-md-6 mb-3" >
					    <label>Data creazione:</label> <span id='print_dataCreazioneScatola'></span>
				    </div>

				    <div class="col-md-6 mb-3">
				    	<label>Stato:</label> <span id='print_statoScatola'></span>					   		    	
				    </div>
				</div>
				<c:if test="${idTipoScatola == ID_TIPO_SCATOLA}">
					<div class="row">  
					    <div class="col-md-6 mb-3">
					    	<label>Identificativo PA:</label> <span id='print_idPAScatola'></span> 
						   
					    </div>
					    <div class="col-md-6 mb-3">
					    	<label>Tipologia Istanza:</label> <span id='print_tipIstScatola'></span>
						    		    	
					    </div>
					</div>
				</c:if>
				<div class="row">  
				    <div class="col-md-6 mb-3">
				    	<label>Numero pratiche contenute:</label> <span id='print_numPraticheScatola'></span>					 		    	
				    </div>
				    <c:if test="${idTipoScatola == ID_TIPO_SCATOLA}">
					    <div class="col-md-6 mb-3">
					   		 <label>Percentuale completamento:</label> <span id='print_percComplScatola'></span>				   	
					    </div>
				    </c:if>
				</div>
				<div class="row"> 
					<div class="col-md-6 mb-3" >
					    <label>Data chiusura:</label> <span id='print_dataChiusuraScatola'></span>
				    </div> 
				    <div class="col-md-6 mb-3" >
					    <label>Sito Lavorazione:</label> <span id='print_centroDematScatola'></span>
				    </div>
				</div>    
				<div class="row" id="print_rowTableDettScatole">
				  <div class="col-md-12 mb-12">  
				  <c:choose> 
				  	<c:when test="${idTipoScatola == ID_TIPO_SCATOLA_SOSPESI}">
					 	<table class="table table-condensed table-bordered" id="print_tableDettScatole">
			                	<thead>
									<tr>
										<th>Codice Raccomandata</th>
										<th>Data</th>						
									</tr>
								</thead>
								<tbody>
			
								</tbody>
							</table>
				 	 </c:when>
				  	<c:otherwise>
				  		<table class="table table-condensed table-bordered" id="print_tableDettScatole">
		                	<thead>
								<tr>
									<th>Pacchetto</th>
									<th>Progr Pacchetto</th> <!-- Progr Scatola -->
									<th>Codice Raccomandata</th>
									<th>Data Accettazione</th>
									<th>Data Accettazione_UP</th>
									<th>Codice Identificativo</th>								
								</tr>
							</thead>
							<tbody>
		
							</tbody>
						</table>
				  	</c:otherwise>						
					</c:choose>					
					</div>
				</div> 
				<div class="row" style="margin-top: 20px" id="print_rowTableDettRaccomandate">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="print_tableDettRaccomandate">
	                	<thead>
							<tr>
								<th>Codice_Raccomandata</th>					
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
						</div>
				</div>         	
         </div>
         <div class="modal-footer">
		  <button type="button" class="btn btn-primary" id="printDistinta"><i class="glyphicon glyphicon-list-alt"></i> Stampa Distinta</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
   </div>
</div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/distintaScatolaModal.js"></script>