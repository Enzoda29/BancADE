<div class="modal fade" id="configurazioneRangeRaccModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <form id="formRangeRacc">    
	      <div class="modal-content">      
	         <div class="modal-header" style="text-align: center">
	         	<h4><label id="load" class="label label-info"></label></h4>
	            <h4><label id="lblWarning" class="label label-warning"></label></h4>
	         </div>
	         <div class="modal-body" style="text-align: center">
	            <input type="hidden" id="tipo" />
				<table style="border:0px;width:100%">
	            <tbody><tr>
	            <td style="text-align: center"><h4><b>Codice Raccomandata DA:</b> </h4></td> 
	            <td style="text-align: left"><h4><input id="codiceRaccDA" onkeypress="return isNumberKey(event)"  required></h4><h4></h4></td>    
	            </tr>
	            <tr>           
	            <td style="text-align: center"><h4><b>Codice Raccomandata A:</b> </h4></td>
	            <td style="text-align: left"><h4><input id="codiceRaccA" onkeypress="return isNumberKey(event)"  required></h4><h4></h4></td>        
	            </tr>
				</tbody></table>                        
			</div>
			<div class="modal-footer" style="text-align: center">
	            <button type="submit" id="azione" class="btn btn-primary">OK</button>
	            <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
	         </div>
	  	 </div>
   </form>
  </div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/configurazione/configurazioneRangeRaccModal.js"></script>