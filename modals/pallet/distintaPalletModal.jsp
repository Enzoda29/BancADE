<div class="modal fade" id="distintaPalletModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="Modal-header">
				<h3 class="modal-title">Stampa distinta</h3>
			</div>
			<div class="modal-body text-center" id="printBody">
<!-- 				<div class="row"> -->
<!-- 					<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div> -->
<!-- 					<div class="col-md-8 col-xs-8  col-sm-8 col-lg-8 text-center"> -->
<!-- 						<img src="" alt="barcode pallet" id="barcodePallet"/> -->
<!-- 					</div> -->
<!-- 					<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div> -->
<!-- 				</div> -->
<!-- 				<div class="row"> -->
<!-- 					<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div> -->
<!-- 					<div class="col-md-4 col-xs-4  col-sm-4 col-lg-4"> -->
<!-- 						<h4 class="modal-title">Codice Pallet: <span id="codPalletSpan"></span></h4> -->
<!-- 						<h4 class="modal-title">Tipologia posta: <span id="tipoPostaSpan"></span></h4> -->
<!-- 						<h4 class="modal-title">Codice cliente: <span id="codClienteSpan"></span></h4> -->
<!-- 					</div> -->
<!-- 					<div class="col-md-4 col-xs-4  col-sm-4 col-lg-4"> -->
<!-- 						<h4 class="modal-title">Lotto Territoriale: <span id="lottoTerritorialeSpan"></span></h4> -->
<!-- 						<h4 class="modal-title">Nome documento: <span id="nomeDocumentoSpan"></span></h4> -->
<!-- 						<h4 class="modal-title">Tipo Spedizione: <span id="tipoSpedizioneSpan"></span></h4> -->
<!-- 					</div> -->
<!-- 					<div class="col-md-2 col-xs-2  col-sm-2 col-lg-2"></div> -->
<!-- 				</div> -->
<!-- 				<div class="row"> -->
<!-- 					<div class="col-md-12 col-xs-12 col-sm-12 col-lg-12 text-center"> -->
<!-- 						<h4 class="modal-title">Numero Scatole: <span id="numeroScatoleSpan"></span></h4> -->
<!-- 					</div> -->
<!-- 				</div> -->
				<div class="row">
					<table style="text-align:center;width:100%">
						<tr>
							<td colspan="2">
								<img src="" alt="barcode pallet" id="barcodePallet"/>
							</td>
						</tr>
						<tr>
							<td><h4 class="modal-title">Codice Pallet: <span id="codPalletSpan"></span></h4></td>
							<td><h4 class="modal-title">Lotto Territoriale: <span id="lottoTerritorialeSpan"></span></h4></td>
						</tr>
						<tr>
							<td><h4 class="modal-title">Tipologia posta: <span id="tipoPostaSpan"></span></h4></td>
							<td><h4 class="modal-title">Nome documento: <span id="nomeDocumentoSpan"></span></h4></td>
						</tr>
						<tr>
							<td><h4 class="modal-title">Codice cliente: <span id="codClienteSpan"></span></h4></td>
							<td><h4 class="modal-title">Tipo Spedizione: <span id="tipoSpedizioneSpan"></span></h4></td>
						</tr>
					</table>
				</div>
				<div class="row" id="appendingScatole">
					<!-- SCATOLE -->
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" id="stampaDistintaModalBtn" onclick="stampaDistinta()">Stampa</button>
				<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Annulla</button>
			</div>
		</div>
	</div>
</div>