$(document).ready(function() {
	
	$('#login').click(function() {
		var user = {
			userName: $('#loginUserName').val(),
			userPass: $('#loginPass').val()
		};
		
		if ((user.userName != "") && (user.userPass != "")) {
            login(user);
        }
		else {
			alert('Username and pass cannot be blank');
		}
	});
	
	$('#logout').click(function() {
		console.log('logging out');
		logout();
		location.reload();
	});
	
	$('#showRegister').click(function() {
		$('#registerBox').toggleClass('showHide');	
	});
	
});

function login(user) {
	$.ajax({
		url:"/register/login",
		type:"POST",
		data:JSON.stringify(user),
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(response){
			if (response == "Log in successful") {
				location.reload();
            }
			else {
				alert(response);
			}
		}
	});
}

function logout() {
	$.ajax({
		url:"/register/logout",
		type:"POST",
		contentType:"application/json; charset=utf-8",
		dataType:"json"
	});
}

