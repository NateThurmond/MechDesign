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
        
      $('#popoutControl_' + ((parseInt(this.id.substring(5, 6)) + 1)%3)).css('display', 'none');
      $('#popoutControl_' + ((parseInt(this.id.substring(5, 6)) + 2)%3)).css('display', 'none');
      
      if ($('#popoutControl_' + this.id.substring(5, 6)).css('display') == 'none') {
        $('#popoutControl_' + this.id.substring(5, 6)).css('display', 'block');
      }
      else {
        $('#popoutControl_' + this.id.substring(5, 6)).css('display', 'none');
      }
    });

});
