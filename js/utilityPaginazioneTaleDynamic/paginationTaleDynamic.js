


/*
 * la funzione restituisce un json parametrizzato per la paginazione delle tabelle di botstrapTable
 * 
 * tatal = totale delle righe da paginare
 * rows = map contenente i dati
 * column = map contenente le colonne da mappare con la rows
 */

function createTable(total, rows, column){
	/*
	 *  public static String buildTable(long total,  List<?> obj) {
    	log.debug("buildTable for "+total+" records");  
    	String json = Constants.NO_ROW_FOUND_TABLE;    
        if (obj != null && !obj.isEmpty()) {          
        	json = "{ \"total\": " + total + ", \"sidePagination\": \"server\", " + 
					 " \"rows\": " + buildRows(obj) + " }";
	 */
	
	
	/*rows":[  
      {  
         "Tipologia":"Materialita' Non Conforme",
         "Data Chiusura":"01/06/2020 11:38:42",
         "Data Fine Data Entry":"-",
         */
	
	
	
	
	for(var i in rows){
	    var sequenceColumns = i; ///000,0001 ...
	    var valore = rows[sequenceColumns];
	    	
	    var tr_temp;
	        $.each(valore, function(index, value) {
		    	var columnDataField = index;
		    	var columnTitle = value;
		    	tr_temp = "<th data-field=\"" + columnDataField + "\" data-sortable=\"true\">" + columnTitle + "</th>";
		    	console.log(tr_temp);
		    	arrayColumn.push(columnDataField);
	        });
	        tr = tr + tr_temp.toString();
	}
	var json = "{ \"total\": " + total + ", \"sidePagination\": \"server\", \"rows\": [] }";
	return json;
	
}