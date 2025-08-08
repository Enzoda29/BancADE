<div class="modal fade" id="apriScatolaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">    

            <form id="formApriScatola">       
                <div class="modal-header" style="text-align: center">
                    <h4><label id="loadLstApriScatola" class="label label-info"></label></h4>
                    <h4><label id="lblWarningApriScatola" class="label label-warning"></label></h4>
                    <h3><label>Apri scatola</label></h3>
                </div>

                <div class="modal-body" style="text-align: center">
                    <c:if test="${(idTipoScatola == ID_TIPO_SCATOLA) or (idTipoScatola == ID_TIPO_SCATOLA_ANOMALIE) or (idTipoScatola == ID_TIPO_SCATOLA_SCARTI)}">
                        <div class="row">     
                            <div class="col-md-6 mb-3">
                                <label for="identificativoPA">Identificativo PA</label>
                                <select id="identificativoPA" class="form-control is-valid" required></select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="tipoIstanza">Tipologia Istanza</label>
                                <select id="tipoIstanza" class="form-control is-valid" required> </select>				      
                            </div> 
                        </div>
                    </c:if>
                    <div class="row">  
                        <div class="col-md-6 mb-3">
                            <label for="num_maxPratiche">Numero MAX pratiche</label>
                            <input type="text" class="form-control is-valid" disabled="disabled" id="num_maxPratiche" placeholder="Numero MAX pratiche" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="codScatola">Codice Scatola</label>
                            <input type="text" class="form-control is-valid" id="codScatola" readonly  placeholder="Codice Scatola" required maxlength="13">
                        </div>
                    </div>
                    <c:if test="${idTipoScatola == ID_TIPO_SCATOLA_SCARTI}">
	                    <div class="row">  
	                       <div class="col-md-6 mb-3">
	                           <label for="noteScarto">Motivazione scarto</label>
	                           <textarea  class="form-control is-valid" id="noteScarto" placeholder="Motivazione scarto" required maxlength="500"></textarea>
	                       </div>
	                   </div>      
                   </c:if> 	
                </div>
                <div class="modal-footer">
                	<div class="row">
	                	<div class="col-md-12 mb-12" style="text-align: center;">
		                 	<button type="submit" id="submitApriScatola" class="btn btn-primary">Apri Scatola</button>   
		                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	                    </div>
                    </div>
                </div>
            </form>   
        </div>
    </div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/apriScatolaModal.js"></script>