<div class="modal fade" id="addPacchettoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">    

	    <form id="formDettScatola">       
           <div class="modal-header" style="text-align: center">
                 <h3><label id="loadLstAddPacchetto" class="label label-info"></label></h3>
     			 <h3><label>Inserimento pacchetto per la scatola:</label> <span id='spanCodiceScatolaPacchetto'></span>
     			 	<div id="divCodScaPacchetto">
	     			 	<input type="text" id="codScatolaPacchetto" placeholder="Codice Scatola" >
	     			 	<button class='glyphicon glyphicon-play' title='Seleziona scatola' id="btnSelScatola"></button>	
     			 	</div>
						 </h3>
     			<div class="row">
		         	<div class="col-md-6 mb-3">
		         	 	<h4 style="font-style: oblique; text-align: left;">Num.Max.Pratiche da inserire: <span class="badge" id="num_max_pratiche"> </span></h4>
		         	 </div>
		         	 <div class="col-md-6 mb-3">
		         	 	<h4 style="font-style: oblique; text-align: right;">Num. Pratiche inserite: <span class="label label-primary" id="num_pratiche_ins">0</span></h4>
		         	 </div>
		         </div>		
           </div>
	            
         <div class="modal-body">
         		<div class="row">
         			<div class="col-md-12 mb-12">  
			         	 <h3>
			         	 	<input type="text" id="codPacchetto" placeholder="Codice Pacchetto" >		         	 
			         	 	<button class='glyphicon glyphicon-plus' title='Inserisci Pacchetto' id="btnCodPacchetto"></button>
			         	 </h3>
		         	 </div>
		         </div>		         		
	         	<div class="row">
					 <div class="col-md-12 mb-12" style="text-align: center;"> 
			    		<h4><label id="lblErrorPacchetto" class="label label-danger"></label></h4>
			    		<h4><label id="lblOKPacchetto" class="label label-success"></label></h4>
			    	</div>
			    </div>
         
		        
				 <div class="row" style="text-align: center;">
		         	 <h3><label class="label label-primary">Elenco pacchetti selezionati</label></h3>
		         </div>
 
				<div class="row">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="tablePacchettoSelected">
	                	<thead>
							<tr>
								<th>Pacchetto</th>
								<th>Stato</th>
								<th>Descrizione</th>
								<th>Numero Doc</th>	
								<th></th>						
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
					</div>
				</div>     
				<div id='divPaccDaScegliere'>
				 <div class="row" style="text-align: center;">
		         	 <h3><label class="label label-default">Elenco pacchetti da scegliere</label></h3>
		         </div>		

				<div class="row">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="tablePacchetto">
	                	<thead>
							<tr>
								<th>Pacchetto</th>
								<th>Stato</th>
								<th>Descrizione</th>
								<th>Numero Doc</th>	
								<th></th>						
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
					</div>
				</div> 
				</div>  	
         </div>
		<div class="modal-footer">
			<div class="row">
				 <div class="col-md-12 mb-12" style="text-align: center;"> 
		    		<h4><label id="lblWarningPacchetto" class="label label-warning"></label></h4>
		    	</div>
		    </div>
		    <div class="row">
				 <div class="col-md-12 mb-12" style="text-align: center;"> 
				  <button type="button" class="btn btn-primary" id="insPacchetto">Inserisci</button>
		          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          	</div>
		  </div>
        </div>
      </form>   
   </div>
</div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/addPacchettoModal.js"></script>