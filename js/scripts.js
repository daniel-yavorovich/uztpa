$(function(){
	$('#header-config').hover(function(){
		$(this).find('ul').slideDown();
	},
	function(){
		$(this).find('ul').slideUp();
	});
	// $(window).resize(function(){
	// 	// setTimeout(function(){
	// 		$('#header-config').css({'float':'none','float':'right'});
	// 	// },3000);
		
	// });

	$('.car').click(function(e){
		e.stopPropagation();
		$('.dropdown-menu').slideUp();
		$(this).parent().siblings('.dropdown-menu').slideToggle();
	})
});