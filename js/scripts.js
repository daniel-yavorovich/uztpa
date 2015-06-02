$(function(){
	$('#header-config').hover(function(){
		$(this).find('ul').slideDown();
	},
	function(){
		$(this).find('ul').slideUp();
	});
});