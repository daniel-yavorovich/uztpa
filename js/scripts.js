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
				url: ".",
				data: data,
				beforeSend: function(){
					form.find('button[type=submit]').attr('disabled', true)
				},
				success: function(resp){
					if(form.hasClass('.send-resume')){
						main_text = '<div class="succ-mess"><p>Резюме успешно отправлено!<span>Мы свяжемся с Вами в ближайшее время</span></p></div>'
					}else{
						main_text = '<div class="succ-mess"><p>Запрос успешно отправлен!<span>Мы свяжемся с Вами в удобное для Вас время</span></p></div>'
					}
					form.height(formH).html(main_text);
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

	//формирование запроса


	$('.pagination a').click(function(e){
		if ($('#sort').length > 0) {
			e.preventDefault();
			var thisUrl = document.location.href.split("/"),
			link = $(this),
			page = link.attr('href').slice(1),
			thisUrl = thisUrl[thisUrl.length-1],
			string = '?order_by=-date';
		
			if (link.parent().hasClass('active')) {
				return false;
			};

			if (thisUrl.indexOf('order_by') != -1) {
				thisUrl = thisUrl.split("?");
				thisUrl = ((thisUrl[thisUrl.length-1].split("&"))[0]).split("=");
				var order_by = thisUrl[thisUrl.length-1];
				string = '?order_by=' + order_by + '&'+page;
			}
			else{
				string += '&'+page;
			};
			
			window.history.pushState('', ''+$('title').text(), ''+string);
			window.location.reload();
		}else{
			e.preventDefault();
			var link = $(this),
			page = link.attr('href');

			if (link.parent().hasClass('active')) {
				return false;
			};

			window.history.pushState('', ''+$('title').text(), ''+page);
			window.location.reload();
		}
	});

	$("#sort").change(function(){
		if ($('.pagination').length > 0) {
			var order_by = $(this).val(),
			string = '?order_by=' + order_by;
			window.history.pushState('', ''+$('title').text(), ''+string);
			window.location.reload();
		};
	});

	// квадрат партнер
	function kvad (){
		$('.owl-carousel').trigger('update.owl.carousel');
		$('owl-item').each(function(){
			$(this).find('.partner-img-wrap').height($(this).width()).width($(this).width());
		});
		$('.partner-img-wrap').each(function(){
			// $(this).width($(this).parent().width())
			$(this).height($(this).outerWidth());
			$(this).find('img').css('margin-top',($(this).height()-$(this).find('img').height())/2)
		});
		
	}
	

	if ($('.owl-carousel').length > 0) {
		$('.owl-carousel').owlCarousel({
		    loop:true,
		    margin:10,
		    nav:true,
		    navText:false,
		    callbacks: true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:2
		        },
		        1000:{
		            items:3
		        }
		    }
		})
	};

	//factory
	$('.factory-block .section-link').hover(function(){		
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
	$('.popup-close, .fancybox-close').click(function(){
		$.fancybox.close()
	})

	$(".modal-form-link").fancybox({
		maxWidth	: 500,
		maxHeight	: 640,
		minWidth: 200,
		fitToView	: false,
		height : 480,
		autoSize	: true,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		closeBtn: true,
		wrapCSS: 'modal-form-wrap'
	});

	//левое меню в биллбоард
	if($(window).width() > (767-17)){
		$('.left-sidebar').css('height',$('.right-col').height()-40)
		if($('.billboard .left-nav')){
			$('.left-sidebar .widget').prepend($('.billboard .left-nav'));
		}
	}else{
		$('.left-sidebar').css('height','auto')
		if($('.left-sidebar .widget .left-nav')){
			$('.billboard h1').after($('.left-sidebar .widget .left-nav'));
		}
	}
	$(window).resize(function(){
		if($(window).width() < (767-17))	{
			$.fancybox.close()
		}
		if($(window).width() > (767-17)){
			$('.left-sidebar').css('height',$('.right-col').height()-40)
			if($('.billboard .left-nav')){
				$('.left-sidebar .widget').prepend($('.billboard .left-nav'));
			}
		}else{
			$('.left-sidebar').css('height','auto')
			if($('.left-sidebar .widget .left-nav')){
				$('.billboard h1').after($('.left-sidebar .widget .left-nav'));
			}
		}

		kvad();
	})
		//галереи

  addOnload(function(){
  	kvad();
		$('.new-preview-grid-2 .file').each(function(){
			var filetype = $(this).text();
			var fileClass = filetype.replace(/[.]/,"");
			$(this).addClass(fileClass)
			var fromTop = $(this).parent().find('img').height();
		
			$(this).css('top',fromTop+15-45);
		})
    if($(window).width() > (767-17)){
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
  });   	
  $(window).resize(function(){
  	$('.new-preview-grid-2 .file').each(function(){
			var fromTop = $(this).parent().find('img').height();			
			$(this).css('top',fromTop+15-45);
		})
    var maxHeight = 0;
    $('.page-preview').each(function(){
     $(this).css('height','auto');
      if ( $(this).height() > maxHeight ){
        maxHeight = $(this).height();
      }
    });
    $('.page-preview').height(maxHeight);
    kvad();
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
  function addOnload(callback) {
	    if ( "undefined" != typeof(window.attachEvent) ) {
	        return window.attachEvent("onload", callback);
	    }
	    else if ( window.addEventListener ){
	        return window.addEventListener("load", callback, false);
	    }
	}

	var numGallery = $('a.gallery').length;
	var i = 0;
	var nums = 1;
	while (i < numGallery){
		$('a.gallery').eq(i).attr('rel','gallery'+nums)
		i++
		nums++
	}
	$('a.gallery').each(function(){
		var sumPhoto = $(this).find('img').length-1
		var firstPhoto = $(this).find('img').eq(1).attr('src');
		$(this).attr('href',firstPhoto);
		var i = 1;
		while (i < sumPhoto){
			var photoSrc = $(this).find('img').eq(sumPhoto-i+1).attr('src');
			var photoLink = "<a class='gallery' href='"+photoSrc+"' rel='"+$(this).attr('rel')+"'></a>"
			$('footer').after(photoLink)
			i++
		}
		$(this).find('.cam').before("<span class='num'></span>")
		$(this).find('.num').text((sumPhoto)+" фото")
	})
	$('a.gallery').fancybox({
		maxWidth: '90%',
		helpers	: {
			title	: {
				type: 'outside'
			},
			thumbs	: {
				width	: 90,
				height	: 60
			}
		}
	});
	$('a.video').fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		maxWidth: '90%'
	});


	//отправка резюме

});
function getName (str){
  if (str.lastIndexOf('\\')){
      var i = str.lastIndexOf('\\')+1;
  }
  else{
      var i = str.lastIndexOf('/')+1;
  }						
  var filename = str.slice(i);			
  var uploaded = document.getElementById("file-form-text");
  uploaded.innerHTML = filename;
}
// function fancyPopup() {
//             // Declare some variables.
//             var el = "";
//             var posterPath = "";
//             var replacement = "";
//             var videoTag = "";
//             var fancyBoxId = "";
//             var posterPath = "";
//             var videoTitle = "";
 
//             // Loop over each video tag.
//             $("video").each(function () {
//                 // Reset the variables to empty.
//                 el = "";
//                 posterPath = "";
//                 replacement = "";
//                 videoTag = "";
//                 fancyBoxId = "";
//                 posterPath = "";
//                 videoTitle = "";

//                 // Get a reference to the current object.
//                 el = $(this);

//                 // Set some values we'll use shortly.
//                 fancyBoxId = this.id + "_fancyBox";
//                 videoTag = el.parent().html();      // This gets the current video tag and stores it.
//                 posterPath = el.attr("poster");
//                 videoTitle = "Play Video " + this.id;

                
//                 // Concatenate the linked image that will take the place of the <video> tag.
//                 replacement = "<a title='" + videoTitle + "' id='" + fancyBoxId + "' href='javascript:;'><img src='" +
//                     posterPath + "' class='img-link'/></a>"

//                 // Replace the parent of the current element with the linked image HTML.
//                 el.parent().replaceWith(replacement);

//                 /*
//                 Now attach a Fancybox to this item and set its attributes. 
                   
//                 This entire function acts as an onClick handler for the object to
//                 which it's attached (hence the "end click function" comment).
//                 */
//                 $("[id=" + fancyBoxId + "]").fancybox(
//                 {
//                     'content': videoTag,
//                     'title': videoTitle,
//                     'autoDimensions': true,
//                     'padding': 5,
//                     'showCloseButton': true,
//                     'enableEscapeButton': true,
//                     'titlePosition': 'outside',
//                 }); // end click function
//             });
//         }
