<div class="modal fade" id="dettaglioScatolaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">       
           <div class="modal-header" style="text-align: center">
                <h4><label id="loadLstDettScatola" class="label label-info"></label></h4>
     			<h4><label>Dettaglio per la scatola:</label>	<span id='codiceScatola'></span></h4>
           </div>
	            
         <div class="modal-body">
				<div class="row">  
				    <div class="col-md-6 mb-3" >
					    <label>Data creazione:</label> <span id='dataCreazioneScatola'></span>
				    </div>

				    <div class="col-md-6 mb-3">
				    	<label>Stato:</label> <span id='statoScatola'></span>					   		    	
				    </div>
				</div>
				
				<c:if test="${idTipoScatola == ID_TIPO_SCATOLA || idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE}">
					<div class="row">  
					    <div class="col-md-6 mb-3">
					    	<label>Identificativo PA:</label> <span id='idPAScatola'></span> 
						   
					    </div>
					    <div class="col-md-6 mb-3">
					    	<label>Tipologia Istanza:</label> <span id='tipIstScatola'></span>
						    		    	
					    </div>
					</div>
				</c:if>
				<div class="row">  
				    <div class="col-md-6 mb-3">
				    	<label>Numero pratiche contenute:</label> <span id='numPraticheScatola'></span>					 		    	
				    </div>
				    <c:if test="${idTipoScatola == ID_TIPO_SCATOLA || idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE}">
					    <div class="col-md-6 mb-3">
					   		 <label>Percentuale completamento:</label> <span id='percComplScatola'></span>				   	
					    </div>
				    </c:if>
				</div>
				<div class="row"> 
					<div class="col-md-6 mb-3" >
					    <label>Data chiusura:</label> <span id='dataChiusuraScatola'></span>
				    </div> 
				    <div class="col-md-6 mb-3" >
					    <label>Sito Lavorazione:</label> <span id='centroDematScatola'></span>
				    </div>
				</div>
				<c:if test="${idTipoScatola == ID_TIPO_SCATOLA_SCARTI}">
	                    <div class="row">  
	                       <div class="col-md-6 mb-3">
	                           <label for="num_maxPratiche">Motivazione scarto:</label>
	                           <span id='noteScartoScatola'></span>	
	                          
	                       </div>
	                   </div>      
                   </c:if> 	    
				<div class="row" style="margin-top: 20px" id="rowTableDettScatole">
				  <div class="col-md-12 mb-12">  
				  <c:choose> 
				  	<c:when test="${idTipoScatola == ID_TIPO_SCATOLA_SOSPESI}">
					 	<table class="table table-condensed table-bordered" id="tableDettScatole">
			                	<thead>
									<tr>
										<th>Data</th>									
										<th>Codice Raccomandata</th>					
									</tr>
								</thead>
								<tbody>
			
								</tbody>
							</table>
				 	 </c:when>
				  	<c:otherwise>
				  		<table class="table table-condensed table-bordered" id="tableDettScatole">
		                	<thead>
								<tr>
									<c:if test="${(idTipoScatola == ID_TIPO_SCATOLA)}" >
										<th><input type="checkbox" id="checkAllPacchetto" onclick="checkAllPacchetto();"></th>
									</c:if>
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
				<div class="row" style="margin-top: 20px" id="rowTableDettRaccomandate">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="tableDettRaccomandate">
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
		  <c:if test="${idTipoScatola == ID_TIPO_SCATOLA}">
		  	<button type="button" class="btn btn-primary" id="btnChangeScatola" disabled="disabled"><i class="fa fa-dropbox fa-1x"></i> Cambia Scatola</button>
		  	<button type="button" class="btn btn-primary" id="addPacchetto"><i class="glyphicon glyphicon-inbox"></i> Aggiungi Pacchetto</button>
		  </c:if>
		  <button type="button" class="btn btn-primary" id="btnCambioScatola" style="display: none;"></button>
		  <button type="button" class="btn btn-primary" id="openDistinta"><i class="glyphicon glyphicon-list-alt"></i> Apri Distinta</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>

   </div>
</div>
</div>

<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/dettScatolaModal.js"></script>