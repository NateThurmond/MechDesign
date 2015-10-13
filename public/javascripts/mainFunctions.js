$(document).ready(function() {

    $('.headerLink').hover(
	function() {
	    $(this).css('color', 'red');
	},
	function() {
	    $(this).css('color', 'white');
	}
    );
	
	$('.sideBarLink').click(function() {
		$('#mechSelector').toggle('.showHide');	
	});

});
