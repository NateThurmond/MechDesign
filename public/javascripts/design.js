$(document).ready(function() {
	
	$('.sideBarLink').click(function() {
		$('#mechSelector').toggle('.showHide');	
	});

    $('.selectMech').click(function() {
		$.get("/design/" + this.id, function(data) {
			
			console.log(data);
			
			if (data != null) {
				$('#mechDetails_Name').html(data['mechName']);
				$('#mechDetails_Weight').html("Weight: " + data['weight']);
				$('#mechDetails_Speed').html("Speed: " + data['speed']);
				$('#mechDetails_PriWeapon').html("Primary Weapon: " + data['weapon1']);
			}
			
			$('#mechSelector').css('display', 'none');	
		});
	});
	
	$('.selectMech:first').click();
});