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
		if (src === 'transparent' || src.slice(0,1) === '#')
			$(this).css('background-color', src)
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
	$(document).on('keyup', '.input-wrap input', function(){
		if ($(this).val() != '') {
			$(this).parent().addClass('corect');
			$(this).css('border-color', '');
			$(this).parent().find('.incorect-span').remove();
		}
		else{
			$(this).parent().removeClass('corect');
		}
	});

	$(document).on('submit', 'form', function(){
		var form = $(this),
		formH = form.height(),
		formCont = form.html(),
		error = true,
		data = form.serialize();
		form.find('input.imp').each(function(){
			if ($(this).val() == '') {
				$(this).css('border-color', '#ff4242');
				if ($(this).parent().find('.incorect-span').length == 0) {
					$(this).parent().append('<span class="incorect-span">Заполните поле</div>')
				};
				error = false;
			};
		});
		if (error == true) {
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: data,
				beforeSend: function(){
					form.find('button[type=submit]').attr('disabled', true)
				},
				success: function(resp){
					form.height(formH).html('<div class="succ-mess"><p>Запрос успешно отправлен!<span>Мы свяжемся с Вами в удобное для Вас время</span></p></div>');
					form.css('padding-top', (formH-175)/2);
				},
				error: function (xhr, ajaxOptions, thrownError) { 
		            alert(xhr.status); 
		            alert(thrownError); 
		        },
		        complete: function(){
		        	setTimeout(function(){
		        		form.find('.succ-mess').remove();
		        		form.css('padding-top', '');
						form.height('').html(formCont).find('.input-wrap').removeClass('corect');
						
		        	},5000);
				}   
			});
		};
		return false;
	});
	
	//ровняем иконки на странице среды
	$('.sreda-block-wrap img').css('top', ($('.sreda-block-wrap').height() - $('.sreda-block-wrap img').height())/2);

	// разворот карты
	$(document).on('click', '.mapfull', function(){
		var map = $(this).parent();
		if (!map.hasClass('full')) {
			map.css({'position':'fixed','height': 'auto'}).addClass('full');
			$('body').css('overflow', 'hidden');
		}
		else{
			map.css({'position': 'relative', 'height': ''}).removeClass('full');
			$('body').css('overflow', '');
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
		$(this).attr('data-hov','active');
	},function(){
		$(this).attr('data-hov','diss');
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
	if($(window).width() > (768-17)){
		$('.left-sidebar').css('height',$('.right-col').height()-40)
	}else{
		$('.left-sidebar').css('height','auto')		
	}
	$(window).resize(function(){
		if($(window).width() < (768-17))	{
			$.fancybox.close()
		}
		if($(window).width() > (768-17)){
			$('.left-sidebar').css('height',$('.right-col').height()-40)
		}else{
			$('.left-sidebar').css('height','auto')		
		}
	})
        if($(window).width() > (768-17)){
		 			var maxHeight = 0;
	        $('.page-preview').each(function(){
	          if ( $(this).height() > maxHeight ){
	            maxHeight = $(this).height();
	          }
	        });
	        $('.page-preview').height(maxHeight);

	        var maxHeight = 0;
	        $('.new-preview-grid-2').each(function(){
	          if ( $(this).height() > maxHeight ){
	            maxHeight = $(this).height();
	          }
	        });
	        $('.new-preview-grid-2').height(maxHeight);
	        var maxHeight = 0;
	        $('.new-preview-grid-3').each(function(){
	          if ( $(this).height() > maxHeight ){
	            maxHeight = $(this).height();
	          }
	        });
	        $('.new-preview-grid-3').height(maxHeight);        	
        }else{
        	$('.new-preview-grid-2').css('height','auto');
        	$('.new-preview-grid-3').css('height','auto');
        	$('.page-preview').css('height','auto');
        }
    $(window).resize(function(){
        var maxHeight = 0;
        $('.page-preview').each(function(){
         $(this).css('height','auto');
          if ( $(this).height() > maxHeight ){
            maxHeight = $(this).height();
          }
        });
        $('.page-preview').height(maxHeight);

        var maxHeight = 0;
        $('.new-preview-grid-2').each(function(){
         $(this).css('height','auto');
          if ( $(this).height() > maxHeight ){
            maxHeight = $(this).height();
          }
        });
        $('.new-preview-grid-2').height(maxHeight);

        var maxHeight = 0;
        $('.new-preview-grid-3').each(function(){
         $(this).css('height','auto');
          if ( $(this).height() > maxHeight ){
            maxHeight = $(this).height();
          }
        });
        $('.new-preview-grid-3').height(maxHeight);

        $('.sreda-block-wrap img').css('top', ($('.sreda-block-wrap').height() - $('.sreda-block-wrap img').height())/2);
    });
    
});