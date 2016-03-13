$(document).ready(function() {
	
	$("#registerSubmit").click(function() {
		
		var newUser = {
			userName: $('#registerUserName').val(),
			userEmail: $('#registerEmail').val(),
			userPass: $('#registerPass').val(),
			userPassConfirm: $('#registerPassConfirm').val(),
		};
		
		if (processRegisterErrors(newUser) == true) {
			registerUser(newUser);
        }
	});
	
	// Code to show or hide the registerBox based on document click
	$('body').click(function(event) {
		
		if ((["registerBox", "showRegister"].indexOf(event.target.id) == -1) &&
			($('#' + event.target.id).parent().attr('id') != "registerBox")) {
				$('#registerBox').removeClass('showHide');
        }
		else {
			$('#registerBox').addClass('showHide');
		}
	});
});


function registerUser(newUser) {
	$.ajax({
		url:"/register/register",
		type:"POST",
		data:JSON.stringify(newUser),
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(response){
			alert(response);
			login(newUser);
		}
	});
}

function processRegisterErrors(newUser) {
	
	var NoErrors = true;
	
    if (newUser['userName'] == "") {
        $('#regErrorUserName').html('UserName cannot be blank');
		NoErrors = false;
    }
	if (newUser['userPass'] == "") {
        $('#regErrorPass').html('Password cannot be blank');
		NoErrors = false;
    }
	if (newUser['userPass'] != newUser['userPassConfirm']) {
        $('#regErrorPassConfirm').html('Password fields do not match');
		NoErrors = false;
    }
	
	// TODO - Add check for existing user
	
	setTimeout(function () {
		$('.registerError').each(function() {
			$(this).html('');
		});	
	}, 8000);
	
	return NoErrors;
}
