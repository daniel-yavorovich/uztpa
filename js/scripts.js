$(function(){
	$('#header-config').hover(function(){
		$(this).find('ul').fadeIn();
	},
	function(){
		$(this).find('ul').fadeOut();
	});

	$( ".toup" ).click(function(){
		$('html, body').animate({scrollTop: 0}, 1000);
	})

	$('.car').click(function(e){
		var menu = $(this).parent().siblings('.dropdown-menu');
		$('.dropdown-menu').not(menu).parents('.dropdown').removeClass('open');
		menu.parents('.dropdown').toggleClass('open')
		// menu.slideToggle();
		return false;
	})
});