<div class="modal fade" id="normalizzazioneModale_1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      	<input type="hidden" id="id_casellario" name ="id_casellario">
      	<input type="hidden" id="stato_casellario" name ="stato_casellario">
         <div class="modal-header">
            <h4><b>Casellario:</b> <span id="modal-header_casellario"></span></h4>
            <h4><b>Identificativo PA:</b>  <span id="modal-identificativo_pa"></span></h4>
            <h4><b>Tipologia istanza:</b> <span id="descr_tipo_istanza"></span></h4>
            <button type="button" id="handleColumnCheckBox" class="btn btn-default">Prendi in Carico</button>
            <button type="button" id="normalizza" class="btn btn-outline btn-primary hidden">Normalizza</button>
            </button>
         </div>
         <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                           Riepilogo
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div >
                                <table class="table table-striped" id="riepilogo_normalizzazione" style="width: 100%">
                                   	 <thead>
										<tr>
											<th style="min-width:20px;"><input type="checkbox" id="checkAll"></th>
											<th>Codice Raccomandata</th>
											<th>Data Accettazione</th>
											<th>Data Accettazione_UP</th>
											<th>Codice Frazionario</th>
										</tr>
									</thead>
									 <tbody>										
									</tbody>  
								</table>
                            </div>
                            <!-- /.table-responsive -->
                        </div>
                        <!-- /.panel-body -->
                        <div class="modal-footer">
                                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    <!-- /.panel -->
                </div>
       
			
		</div>
   </div>
</div>
</div>
<script
   src="${pageContext.servletContext.contextPath}/resources/template/js/normalizzazione/modaleNormalizzazione.js"></script>