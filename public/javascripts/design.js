$(document).ready(function() {
	
	$('.sideBarLink').click(function() {
		$('#mechSelector').toggle('.showHide');	
	});

    $('.selectMech').click(function() {
		$.get("/design/" + this.id, function(data) {
			
			if (data != null) {
				$('#mechDetails_oid').val(data['_id']);
				$('#mechDetails_Name').val(data['mechName']);
				$('#mechDetails_Weight').html(data['weight']);
				$('#mechDetails_Speed').html(data['speed']);
			}
			
			$('#mechSelector').css('display', 'none');	
		});
	});
	
	// Load the first mech from the list on page load
	$('.selectMech:first').click();
	
	$('#mechDetails_save').click(function() {
		
		mechJSON = {_id: $("input[name='_id']").val(),
		weight: $("p[name='weight']").html(),
		speed: $("p[name='speed']").html(),
		mechName: $("input[name='mechName']").val() };
		
		saveMechBool = true;
		for (var key in mechJSON) {
			if (mechJSON[key] == "") {
				saveMechBool = false;
			}
		}
		
		if (saveMechBool) {
			$.get("/design/mechName/" + mechJSON.mechName, function(data) {	
				if ((data != null) && (data != "")) {
					if (confirm("There is a already a mech by this name, would you like to save over this mech?")) {
						saveMech("save", mechJSON);
					}
				}
				else {
					saveMech("saveNew", mechJSON);
				}
			});
		}
		else {    alert("Some fields are missing. Please make sure that all fields are filled in.");    }
		
	});
	
});


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
		}
	});
}