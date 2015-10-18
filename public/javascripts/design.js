$(document).ready(function() {

    $('.selectMech').click(function() {
		$.get("/design/" + this.id, function(data) {
			
			console.log(data);
			
			if (data != null) {
				// Do something with this mech
			}
		});
	});

});
