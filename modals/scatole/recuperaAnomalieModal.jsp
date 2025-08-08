<div class="modal fade" id="distintaRecuperaAnomalieModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content printable" >       
           <div class="modal-header" style="text-align: center">
	
           </div>
	            
         <div class="modal-body" id="printableAreaRecuperaAnomalie">
         	<div class="row" style="text-align: center;">
         		<div class="col-md-12 mb-3">
         			<h4><label>Distinta anomalie da recuperare</h4>	
         		</div>		 	
         	</div>
   
				<div class="row">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="print_tableRecuperaAnomalie">
	                	<thead>
							<tr>
								<th>Codice Scatola</th>
								<th>Codice Pacchetto</th> 
								<th>Progr. Pacchetto</th><!-- Progr. Scatola -->
								<th>Raccomandata</th>
								<th>Data Accettazione</th>
								<th>Identificativo PA</th>
								<th>Tipologia Istanza</th>										
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
					</div>
				</div>       	
         </div>
         <div class="modal-footer">
		  <button type="button" class="btn btn-primary" id="printDistintaRecuperaAnomalie"><i class="glyphicon glyphicon-list-alt"></i> Stampa Distinta</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
   </div>
</div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/recuperaAnomalieModal.js"></script>