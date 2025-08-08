
$(document).ready(function(){
	$('#form-password-update,#form-password-update-confirm').keyup(function() {
		var empty=true;
		if (($('#form-password-update').val().length != 0)&&($('#form-password-update-confirm').val().length != 0)) {
			empty = false;
			$('#FieldsValueMatch').text('');
		}
		if($('#form-password-update').val().length == 0){
			$('#passwordUpdate').text('');
			$('#FieldsValueMatch').text('');
		}
		if($('#form-password-update-confirm').val().length == 0){
			$('#passwordConfirmUpdate').text('');
			$('#FieldsValueMatch').text('');
		}
		if (empty) {
			$('#modificaPassword').attr('disabled', 'disabled');
		} else {
			$('#modificaPassword').removeAttr('disabled');
		}
	});	

	$('#modifica').on('click', function(event) {
		$('#pannello').toggle('show');
		$('.dropdown-menu').click(function(e) {
			e.stopPropagation();
		});
	});
	$("#modificaPassword").click(function () {	
		var username = $('[name="username"]').val();
		var passwordConfirmUpdate = $('[name="passwordConfirmUpdate"]').val();
		var passwordUpdate = $('[name="passwordUpdate"]').val();
		var userForm = 
		{
				"username": username,
				"passwordUpdate": passwordUpdate,
				"passwordConfirmUpdate": passwordConfirmUpdate,
		};
		console.log(JSON.stringify(userForm));
		var url = contextPath  + '/configurazione/updatePassword/operatore';
		$.ajax({
			type : 'POST',
			url : url,	
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(userForm),
			success: function(result){
				console.log('result: '+result);
				console.log('result: '+result.success);
				if(result.success){
					alert('password modificata correttamente');
					location.reload();
				}else{
					if(result.errors.length>0){
						for(var i =0 ; i<result.errors.length ;i++){
							console.log('field :'+result.errors[i].field+' message: '+result.errors[i].defaultMessage)	
							$('#'+result.errors[i].field).text(result.errors[i].defaultMessage);
							if(result.errors[i].code==('FieldsValueMatch')){
								$('#'+result.errors[i].code).text(result.errors[i].defaultMessage);
							}
						}
					}
				}
			},
			error:function(xhr,error, result){
				console.log('result: '+result);
				console.log('error: '+error);
				console.log('xhr: '+xhr);
			}
		});
	});
});
