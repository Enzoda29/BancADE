<div class="modal fade" id="configurazioneIstanzaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">      
         <div class="modal-header" style="text-align: center">
            <input type="hidden" id="tipo" />
            <input type="hidden" id="idIstanza" />
			<table style="border:0px;width:100%">
            <tbody>
            <tr>
            <td style="text-align: center"><h4><b>Codice Istanza:</b> </h4></td> 
            <td style="text-align: left"><h4><input id="codiceIstanzaModal"></h4><h4></h4></td>    
            </tr>
            <tr>
            <td style="text-align: center"><h4><b>Codice Tipo Istanza:</b> </h4></td> 
            <td style="text-align: left"><h4><input id="codiceTipoIstanzaModal"></h4><h4></h4></td>    
            </tr>
            <tr>           
            <td style="text-align: center"><h4><b>Descrizione:</b> </h4></td>
            <td style="text-align: left"><h4><input id="descrizioneModal"></h4><h4></h4></td>        
            </tr>
			</tbody></table>                        
			<hr>
            <button type="button" id="azione" class="btn btn-default">OK</button>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>

   </div>
  </div>
</div>
<script src="${pageContext.servletContext.contextPath}/resources/template/js/configurazione/configurazioneIstanzaModal.js"></script>