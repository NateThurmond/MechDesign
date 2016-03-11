$(document).ready(function() {

    $('.headerLink').hover(
	function() {
	    $(this).css('color', 'red');
	},
	function() {
	    $(this).css('color', 'white');
	}
    );
	
	// Check to see if user is logged in and hide or show relevant sections
	if (document.cookie.indexOf("userName") >= 0) {

		$('#welcomeHideShow').addClass('showHide');
		$('#loginBox').removeClass('showHide');
	}
	else {
		$('#welcomeHideShow').removeClass('showHide');
		$('#loginBox').addClass('showHide');
	}

});
