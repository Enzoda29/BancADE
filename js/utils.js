
function ajaxCallGet(url, parameters, successCallback, errorCallback) {	
	console.log('ajaxCallGet url -> '+url);
	$.ajax({
		type : 'GET',
		url : url,
		data : parameters,		
		success : successCallback,
		error : errorCallback
	});
}