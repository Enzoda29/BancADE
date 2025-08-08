<div class="modal fade" id="distintaDDTModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="Modal-header">
				<h3 class="modal-title">Stampa distinta</h3>
			</div>
			<div class="modal-body" id="printBody">
<!-- 				<div class="row"> -->
<!-- 					<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div> -->
<!-- 					<div class="col-md-8 col-xs-8  col-sm-8 col-lg-8 text-center"> -->
<!-- 						<img src="" alt="barcode ddt" id="barcodeDDT"/> -->
<!-- 					</div> -->
<!-- 					<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div> -->
<!-- 				</div> -->
<!-- 				<div class="row"> -->
<!-- 					<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div> -->
<!-- 					<div class="col-md-4 col-xs-4  col-sm-4 col-lg-4"> -->
<!-- 						<h4 class="modal-title">Numero DDT: <span id="numeroDDT"></span></h4> -->
<!-- 						<h4 class="modal-title">N. pallet: <span id="numeroPallet"></span></h4> -->
<!-- 					</div> -->
<!-- 					<div class="col-md-4 col-xs-4  col-sm-4 col-lg-4"> -->
<!-- 						<h4 class="modal-title">Data DDT :<span id="dataDDT"></span></h4> -->
<!-- 						<h4 class="modal-title">N. tot. scatole :<span id="numeroScatole"></span></h4> -->
<!-- 					</div> -->
<!-- 					<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div> -->
<!-- 				</div> -->

				<div class="row">
					<table style="text-align:center;width:100%">
						<tr>
							<td colspan="2">
								<img src="" alt="barcode ddt" id="barcodeDDT"/>
							</td>
						</tr>
						<tr>
							<td><h4 class="modal-title">Numero DDT: <span id="numeroDDT"></span></h4></td>
							<td><h4 class="modal-title">Data DDT :<span id="dataDDT"></span></h4></td>
						</tr>
						<tr>
							<td><h4 class="modal-title">N. pallet: <span id="numeroPallet"></span></h4></td>
							<td><h4 class="modal-title">N. tot. scatole :<span id="numeroScatole"></span></h4></td>
						</tr>
					</table>
				</div>	
				<div class="row" id="appendingPallets">
					<!-- PALLET E SCATOLE -->
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" id="stampaDistintaModalBtn">Stampa</button>
				<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Annulla</button>
			</div>
		</div>
	</div>
</div>