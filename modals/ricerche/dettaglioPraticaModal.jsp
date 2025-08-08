<div class="modal fade" id="dettaglioPraticaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">       
           <div class="modal-header" style="text-align: center;background-color: #bad4b5;">
                <h4><label id="loadLstDettScatola" class="label label-info"></label></h4>
     			<h4><label>Dettaglio per la pratica:</label>	<span id='codiceRaccomandataDett'></span></h4>
           </div>
	            
         <div class="modal-body">
				<div class="row">  
				    <div class="col-md-6 mb-3" >
					    <label>Stato:</label> <span id='statoDett'></span>
				    </div>

				    <div class="col-md-6 mb-3">
				    	<label>Data accettazione:</label> <span id='dataAccettazioneDett'></span>					   		    	
				    </div>
				</div>
				
				<div class="row">  
				    <div class="col-md-6 mb-3">
				    	<label>IdentificativoPA:</label> <span id='idPADett'></span>					 		    	
				    </div>
				    <div class="col-md-6 mb-3">
				    	<label>Tipologia Istanza:</label> <span id='tipIstanzaDett'></span>					 		    	
				    </div>

				</div>
				<div class="row"> 
					<div class="col-md-6 mb-3" >
					    <label>Data accettazione UP:</label> <span id='dataAccettazioneUPDett'></span>
				    </div> 
				    <div class="col-md-6 mb-3" >
					    <label>Casellario:</label> <span id='casellarioDett'></span>
				    </div>
				</div>   
				
				<div class="modal-header">
						<h3 class="modal-title" id="title_dett_pacc_trk">Dettaglio Pratica Tracking</h3>
				</div>
				<div class="row">
					<table class="table table-bordered" id="dettaglioPraticaTrk"
							 data-toolbar="#toolbar-table"
							data-pagination="true" data-page-size="5"
							data-page-list="[5,10, 20, 50, 100]" data-show-refresh="false"
							data-show-toggle="false" data-mobile-responsive="true"
							data-check-on-init="true" data-click-to-select="true"
							data-show-columns="false" data-id-field="object_id"
							class="table-hover" data-toggle="table"	data-sort-name="dataAsString" data-sort-order="desc">
						<thead>
						<tr>
							<th data-field="statoPratica" data-sortable="true" >Stato</th>
							<th data-field="dataAsString" data-sortable="true" >Data</th>
							<th data-field="descrizione" data-sortable="true" >Descrizione</th>
							<th data-field="operatore" data-sortable="true" >Operatore</th>
						</tr>
					</thead>
					</table>
				</div>   
				
         </div>
		<div class="modal-footer">
		  <button type='button' class='btn btn-primary' aria-label='Indietro' id='btnIndietroDettPratica'>Indietro</button>	
          <button type="button" class="btn btn-default" id='btnCloseDettPratica'>Close</button>
        </div>

   </div>
</div>
</div>

<script src="${pageContext.servletContext.contextPath}/resources/template/js/ricerche/ricerca_pratica/dettPraticaModal.js"></script>