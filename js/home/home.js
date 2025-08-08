$(document).ready(
		function() {
			function Timer(fn, t) {
				var timerObj = setInterval(fn, t);

				this.stop = function() {
					if (timerObj) {
						clearInterval(timerObj);
						timerObj = null;
					}
					return this;
				}

		
				this.start = function() {
					if (!timerObj) {
						this.stop();
						timerObj = setInterval(fn, t);
					}
					return this;
				}


				this.reset = function(newT) {
					t = newT;
					return this.stop().start();
				}
			}
			var timer = new Timer(function() {
				updateAlerting();
			}, 60 * 5000);

			$("#refresh").click(function() {
				console.log('refresh');
				updateAlerting();
				timer.reset(60 * 5000);
			});

			function updateAlerting() {
				console.log('updateAlerting start');
				var centroDemat = $("input[name=centrodemat]").val();
				var uri = contextPath
						+ "/monitoraggio/dataTableAlerting.json?&centroDemat="
						+ centroDemat;
				console.log('URI.. -> ' + uri);
				$('#alerting').bootstrapTable('refresh', {
					url : uri
				});

			}
			
			 $('#alerting').on( 'dblclick', 'tbody tr', function (event) {
			 	$(this).addClass('highlight').siblings().removeClass('highlight');  
				var dettaglioAlertingModal = $("#dettaglioAlertingModal");
//		        var idAlerting = $(this).find('td:first-child').text();
		    	var url = contextPath + '/monitoraggio/alerting/dettaglio';
		    	var index = 0;
		    	table.clear().draw(false);
		    	$('#alerting th')
				.each(function() {
					var id = $(this).attr("data-field");				
					if (id == 'CODICE_OGGETTO') {
						index = $(this).index();
					}
				});
		    	var codiciOggetto = $(this).find('td').eq(index).text().split(',');
		    	var arr = [];
		    	for (var i = 0; i < codiciOggetto.length; i++) {
		    	    arr.push({
		    	    	CODICE_OGGETTO: codiciOggetto[i],
		    	    });
		    	    table.row.add( [
	    	    		codiciOggetto[i]    
						 ] ).draw(false);
		    	}
		    	
//                $('#dettaglioAlerting').bootstrapTable('load', arr);
		    	dettaglioAlertingModal.modal('show');
		    	
		    } );
			 
			 
			  $("#esportaCSV").click(function() {
				var queryString = '';		
				var centroDemat = $("input[name=centrodemat]").val() === '' ? '': queryString+= 'centroDemat='+$("input[name=centrodemat]").val() +'&';
				  queryString+= 'typeExport=ALERTING';				  
				  document.location.href = contextPath+ "/download/csv?"+queryString;
			  });
			  
			  function title(){
				  var title = "Report_DETTAGLIONOTIFICHE_";
				  var date = new Date($.now())
				  var y = date.getFullYear();
				  var d = date.getDate();
				  var mo = date.getMonth()+ 1;  
				  var h = date.getHours();
				  var m = date.getMinutes();
				  var s = date.getSeconds();
				  var finale = title+y+"-"+mo+"-"+d+" "+h+"_"+m+"_"+s; 
				  return finale;
			  }
			  
			  table = $('#dettaglioAlerting').DataTable({
					 dom: 'Bfrtip',
					 searching: false,
					 info: false,
					 buttons: [
					       {
					    	    title: 		title(),
				                extend:    'csvHtml5',
				                text:      '<i class="fa fa-file-text-o"></i> CSV',
				                titleAttr: 'CSV',
				                className: 'btn btn-outline btn-xs btn-success csv',
				                init: function(api, node, config) {
				                    $(node).removeClass('dt-button')
				                    $(node).removeClass('buttons-csv')
				                    $(node).removeClass('buttons-html5')		        
				                 }
				            },
				        ],
				    "drawCallback": function () {
				            $('.dataTables_paginate > .pagination').addClass('pagination-sm');
				            $('.dataTables_paginate').css("text-align","center");
				        },
				    "pageLength": 5,
					"columnDefs" : [ {
						"targets" : [ 0 ],
						"visible" : true,
						"className": "text-center",
					} ],
					"language": {
			            "lengthMenu": "Mostra MENU record per pagina",
			            "zeroRecords": "Non sono stati trovati record",
			            "infoEmpty": "Non ci sono record",
			            "infoFiltered": "(Filtrati da MAX record totali)",
			            "paginate": {
			                "first":      "Primo",
			                "last":       "Ultimo",
			                "next":       "Prossimo",
			                "previous":   "Precedente"
			            }
			        }				
				});
			  
		
		});
