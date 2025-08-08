<div class="modal fade" id="barcodeModale" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" style="width: 1200px;top:150px;" role="document">
      <div class="modal-content">
<!--           <div class="modal-header"> -->
         	<input type="hidden" id="codPacchetto" name ="codPacchetto">
<!--  		</div>  -->
		
<!--  		   <div class="row">
                <div class="col-lg-12"> -->
                     <div class="panel panel-default"> 
                        <div class="panel-heading">
                           DISTINTA
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
 <!--                           <div class="table-responsive"> -->
					       <div id="printableArea" class="printable">
                                <table style="border:0px" id="barcode_normalizzazione" >
                                   	 <!--  <thead></thead> -->
									 <tbody>
									 	<tr><td id="imgBc" align="center" colspan="4">
									 	<!-- 	<img src=""  id="imgBc" width="300"></img>	 -->							 	
									 	</td></tr>
										<tr><td>&nbsp;</td></tr>
										<tr><td>&nbsp;</td></tr>
										<tr>
											<td><b>Numero Buste:</b> <input type="text" id="numero_buste" name ="numero_buste" readonly="readonly" class="form-control-plaintext" style="border: 0px;"></td>
											<td><b>Identificativo PA:</b> <input type="text" id="id_pa" name ="id_pa" readonly="readonly" class="form-control-plaintext" style="border: 0px;"></td>
											<td><b>Tipologia Pratica:</b> <input type="text" id="tipo_pra" name ="tipo_pra" readonly="readonly" class="form-control-plaintext" style="border: 0px;"></td>
											<td><b>Data Creazione:</b> <input type="text" id="dt_crea" name ="dt_crea" readonly="readonly" class="form-control-plaintext" style="border: 0px;"></td>
										</tr>
										<tr><td>&nbsp;</td></tr>
										<tr><td>&nbsp;</td></tr>
									</tbody>  
								</table>
                                <table class="table table-bordered" id="barcode_riepilogo" >
                                   	 <thead><tr>
											<th>Codice Raccomandata </th>
											<th>Data Accettazione</th>
											</tr>
									</thead>
								</table>
					       </div>
                          <!--  </div> -->
                            <!-- /.table-responsive -->
						   <div class="modal-footer"  style="text-align:center">
						        <button type="button" class="btn btn-primary" id="stampaBarcode">Stampa</button>
						        <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
						   </div>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
		</div>
   </div>
   
<!--  </div>
</div>-->

<script
   src="${pageContext.servletContext.contextPath}/resources/template/js/normalizzazione/barcodePacchettoModal.js"></script>