$(document).ready(function() {

	resizeWindow();

    $('.headerLink').hover(
	function() {
	    $(this).css('color', '#D65C33');
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
	
	$(window).resize(function() {
		resizeWindow();
	});

});

function resizeWindow() {
	var docHeight = $(document).height();
	var mainContentHeight = $('#mainContent').height();
	var windowHeight = $(window).height();
	
	if (windowHeight > 900) {
		$('#mainContent').height((windowHeight - 200));
		$('#sideBar').height((windowHeight - 200));
	}
	else {
		$('#mainContent').height("80%");
		$('#sideBar').height((windowHeight - 200));
	}
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function createCookie(name, value, seconds) {
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}