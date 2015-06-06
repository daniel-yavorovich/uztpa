$(function(){
	$('#header-config').hover(function(){
		$(this).find('ul').stop().fadeToggle();
	});

	// Прокрутка вверх
	$( ".toup" ).click(function(){
		$('html, body').animate({scrollTop: 0}, 1000);
	})

	// Открытие подменю на моб версии
	$('.car').click(function(e){
		var menu = $(this).parent().siblings('.dropdown-menu');
		$('.dropdown-menu').not(menu).parents('.dropdown').removeClass('open');
		menu.parents('.dropdown').toggleClass('open')
		return false;
	})

	// bg с html
	$('[data-bg]').each(function(){
		// var src = 'url('+$(this).attr('data-bg')+')';
		var src = ''+$(this).attr('data-bg');
		if (src === 'transparent' || src.slice(0,1) === '#') $(this).css('background-color', src)
		else{
			$(this).css('background-image', 'url('+src+')');
			if ($(this).attr('data-pos')) {
				$(this).css('background-position', $(this).attr('data-pos')+' bottom');
			};
		}
	});

	// fancybox видео
	if($(".fancybox_video").length>0){			
		$(".fancybox_video").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}

	if ($(".fancybox").length>0) {
		$(".fancybox").fancybox({
			padding:0
		});
	};

	//form
	$('.input-wrap input').keyup(function(){
		if ($(this).val() != '') {
			$(this).parent().addClass('corect');
		}
		else{
			$(this).parent().removeClass('corect');
		}
	});

	//factory
	$('.factory-block a.section-link').hover(function(){		
		var section = $(this).attr('data-section')
		$('.object').find('#'+section).attr('data-hov','active');
	},function(){
		var section = $(this).attr('data-section')
		$('.object').find('#'+section).attr('data-hov','diss');
	})
	$('.sm-section').hover(function(){
		$(this).addClass("active")
	})
	$('.sm-section').click(function(){
		var sId = $(this).attr('id');
		$.fancybox.open([
			{
				href: '#'+sId+'p',
				padding:0,
				closeBtn:false,
				maxWidth:486,
				helpers : {
	        overlay : {
	          css : {
	            'background' : 'rgba(27, 54, 100, 0.8)'
		        }
			    }
		    }
			}
		])
	})
	$('.popup-close').click(function(){
		$.fancybox.close()
	})
	$(window).resize(function(){
		if($(window).width() < (768-17))	{
			$.fancybox.close()			
		}
	})
	 var maxHeight = 0;
        $('.page-preview').each(function(){
          if ( $(this).height() > maxHeight ){
            maxHeight = $(this).height();
          }
        });
        $('.page-preview').height(maxHeight);
    $(window).resize(function(){
        var maxHeight = 0;
        $('.page-preview').each(function(){
         $(this).css('height','auto');
          if ( $(this).height() > maxHeight ){
            maxHeight = $(this).height();
          }
        });
        $('.page-preview').height(maxHeight);
    });
});