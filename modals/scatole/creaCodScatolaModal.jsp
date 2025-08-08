<div class="modal fade" id="creaCodScatolaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">      
         <div class="modal-header" style="text-align: center">        
            <h4 ><b>Codice Scatola:</b> <input id="codice_scatola" readonly="readonly"  style="text-align: center" /></h4>
			<hr>
            <button type="button" id="printCodScatola" class="btn btn-default">Stampa</button>
            <button type="button" id="copyCodScatola" class="btn  btn-default">Copia nella Clipboard</button>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>

   </div>
</div>
<div id="printableArea" style="display: none;" class="printable">
      <h4 ><b>Codice Scatola:</b> <span id="codice_scatolaPrint"></span></h4>
    </div>
</div>    
<script src="${pageContext.servletContext.contextPath}/resources/template/js/scatole/creaCodScatolaModal.js"></script>