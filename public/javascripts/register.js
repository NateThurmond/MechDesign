$(document).ready(function() {
	
	$("#registerSubmit").click(function() {
		
		var newUser = {
			userName: $('#registerUserName').val(),
			userEmail: $('#registerEmail').val(),
			userPass: $('#registerPass').val(),
			userPassConfirm: $('#registerPassConfirm').val(),
		};
		
		if (processRegisterErrors(newUser) == true) {
            console.log('user is good');
			registerUser(newUser);
        }
	});
	
	$('#login').click(function() {
		var user = {
			userName: $('#registerUserName').val(),
			userPass: $('#registerPass').val()
		};
		
		if ((user.userName != "") && (user.userPass != "")) {
            login(user);
        }
		else {
			prompt('Username and pass cannot be blank');
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
		}
	});
}

function login(user) {
	$.ajax({
		url:"/register/login",
		type:"POST",
		data:JSON.stringify(user),
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(response){
			alert(response);
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


function saveMech(saveString, mechJSON) {
	$.ajax({
		url:"/design/" + saveString,
		type:"POST",
		data:JSON.stringify(mechJSON),
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(response){
			alert(response);
			
			if (response.indexOf("Created new mech") >= 0) {
				window.open("/design", "_self");
			}
			if (response.indexOf("Mech Details Saved") >= 0) {
				$('.selectMech').each(function() {
					if ($(this).html() == mechJSON.mechName) {
						
						$(this).next().html("Speed: " + mechJSON.speed
							+ " Weight: " + mechJSON.weight + " Primary Weapon:");
					}
				});
			}
		}
	});
}

function deleteMech(mechID) {
	$.ajax({
		url:"/design/removeMech/" + mechID,
		type:"POST",
		success: function(response){
			alert(response);
			
			if (response.indexOf("Mech Deleted") >= 0) {
				window.open("/design", "_self");
			}
		}
	});
}