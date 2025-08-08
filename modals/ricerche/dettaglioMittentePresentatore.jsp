<div class="modal fade" id="dettaglioMittentePresentatore"
	tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title">Dettaglio <label class="modal-title" id="titleMittPres" /></h3>
				    <h4><label id="loadFields" class="label label-info"></label></h4>
				</div>
				 
				<div class="modal-body">
					<div class="row">     
                          <div class="col-lg-4 col-md-4">
                              <label for="cognome">Cognome</label>
                              <input type="text" id="cognome" readonly="readonly"></select>
                          </div>
                          <div class="col-lg-4 col-md-4">
                              <label for="nome">Nome</label>
                              <input type="text" id="nome" readonly="readonly"> </select>				      
                          </div> 
                          <div class="col-lg-4 col-md-4">
                              <label for="sesso">Sesso</label>
                              <input type="text" id="sesso" size="5" readonly="readonly"> </select>				      
                          </div> 
                    </div>
                    <div class="row top-buffer">     
                          <div class="col-lg-4 col-md-4">
                              <label for="ragione_sociale">Ragione Sociale</label>
                              <input type="text" id="ragione_sociale" readonly="readonly"></select>
                          </div>
                          <div class="col-lg-4 col-md-4">
                              <label for="pIVA">Partita IVA</label>
                              <input type="text" id="pIVA" readonly="readonly"> </select>	
                          </div>

                    </div>
                    <div class="row top-buffer"> 
                         <div class="col-lg-4 col-md-4">
							 <label for="data_nascita">Data nascita</label>
                              <input type="text"  id="data_nascita" readonly="readonly">
                         </div>    
                    	 <div class="col-lg-4 col-md-4">
                              <label for="comune_nascita">Comune Nascita</label>
                              <input  id="comune_nascita" type="text" readonly="readonly">                                    
                          </div> 

                          <div class="col-lg-4 col-md-4">
                              <label for="codice_fiscale">Codice Fiscale</label>		
                              <input type="text"  id="codice_fiscale" readonly="readonly">	      
                          </div> 
                    </div>                    
                     <div class="row top-buffer">     
						 <div class="col-lg-6 col-md-6">
                              <label for="indirizzo">Indirizzo</label>
                              <input type="text" id="indirizzo" size="50" readonly="readonly">
                          </div>                     
                          <div class="col-lg-6 col-md-6">
                              <label for="comune">Comune</label>    
                          	  <input type="text"  id="comune" size="50" readonly="readonly">                         
                          </div>
                    </div>
                     <div class="row top-buffer">     						 
                          <div class="col-lg-3 col-md-3">
                              <label for="cap">Cap</label>    
                          	  <input type="text"  id="cap" size="5" readonly="readonly">                         
                          </div>                         

                          <div class="col-lg-3 col-md-3">
                              <label for="prov">PROV</label>
                               <input type="text" id="prov" size="10" readonly="readonly">

                          </div> 
                    </div>

                    <div class="row top-buffer">
                          <div class="col-lg-4 col-md-4">
                              <label for="email">Email</label>
                              <input type="text" id="email" size="30" readonly="readonly"> </select>	
                          </div>

                          <div class="col-lg-4 col-md-4">
                              <label for="cellulare">Cellulare</label>
                              <input type="text" id="cellulare"  readonly="readonly">		      
                          </div> 
                          <div class="col-lg-4 col-md-4">
                              <label for="telefono">Telefono</label>
                              <input type="text" id="telefono" readonly="readonly">							      
                          </div> 
                          
                    </div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
				</div>
			</div>
	</div>
	<div id="spinnerContainerModal" class="spinner"></div>
</div>
<script	src="${pageContext.servletContext.contextPath}/resources/template/js/ricerche/ricerca_preadvising/dettaglioMittentePresentatore.js"></script>