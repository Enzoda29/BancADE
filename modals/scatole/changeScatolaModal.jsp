<div class="modal fade" id="changeScatolaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">    

	    <form id="formChangeScatola">       
           <div class="modal-header" style="text-align: center">
                 <h3><label id="loadScatolaChange" class="label label-info"></label></h3>
     			 <h3><label>Selezionare nuova scatola per i seguenti pacchetti</label></h3>
     			 <h3><label id='lblPacchettiSelected'></label></h3>
           </div>
	            
         <div class="modal-body">
   			 	<h3><input type="text" id="codScatolaChange" placeholder="Codice Scatola" >
   			 	<button class='glyphicon glyphicon-play' title='Seleziona scatola' id="btnSelScatolaChange"></button>
   			 	</h3>	
         		         		
	         	<div class="row">
					 <div class="col-md-12 mb-12" style="text-align: center;"> 
			    		<h4><label id="lblOKScatolaChange" class="label label-success"></label></h4>
			    	</div>
			    </div>  
			     <div class="row" style="margin-top: 15px">
                   	<div class="col-lg-12 alert alert-danger" id="div_error_alert_CHANGE_SCA" style="display: none">
					<button type="button" class="close" onclick="$('#div_error_alert_CHANGE_SCA').hide()">&times;</button>
					<strong>Attenzione!</strong> <span id="danger_msg_CHANGE_SCA"></span>
					</div>
             	</div>       
		       
				<div class="row">
				  <div class="col-md-12 mb-12">  
					<table class="table table-condensed table-bordered" id="tableScatolaChange">
	                	<thead>
							<tr>
								<th>Idscatola</th>
								<th>Codice Scatola</th>
								<th>Data creazione</th>
								<th>Identificativo PA</th>
								<th>Tipologia Istanza</th>	
								<th>Num. Max Pratiche</th>
								<th>Num. Pratiche Ins.</th>						
							</tr>
						</thead>
						<tbody>
	
						</tbody>
					</table>
					</div>
				</div>   
				
				 
				 <div class="row" style="text-align: left;">
		         	 <h3><label class="label label-warning">Scatola attuale:</label> <span id="lblScatolaAttuale"></span></h3>
		         	
		         </div>
		       	 <div class="row" style="text-align: left;">
		         	 <h3><label class="label label-success">Nuova Scatola:</label> <span id="lblScatolaNuova"></span></h3>
		         	  
		         </div>
   
				
         </div>
		<div class="modal-footer">

		    <div class="row">
				 <div class="col-md-12 mb-12" style="text-align: center;"> 
				  <button type="button" class="btn btn-primary" id="btnSubmitChangeScatola">Cambia Scatola</button>
		          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          	</div>
		  </div>
        </div>
      </form>   
   </div>
</div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/changeScatolaModal.js"></script>