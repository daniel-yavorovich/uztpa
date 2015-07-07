$(function(){
	$('#header-config').hover(function(){
		$(this).find('ul').stop().fadeToggle();
	});

	// Прокрутка вверх
	$( ".toup" ).click(function(){
		$('html, body').animate({scrollTop: 0}, 1000);
	})
	$('.histori-acord .panel-title').click(function(){
		
			$('html, body').animate({scrollTop: 0}, 1000);
		

	});
	if($('select').length>0){
		$('select').styler();	
	}
	
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

	$(document).on('click', 'button[type=submit]', function(){
		var form = $(this).parents('form'),
		formH = form.height(),
		formCont = form.html(),
		error = true,
		email = true;
		if ($('#partner_request_form').length > 0) {
			var url = "/about/partners/";
		}
		else{
			var url = ".";
		}
		// data = form.serialize();
		form.find('input.imp').each(function(){
			if ($(this).val() == '') {
				$(this).css('border-color', '#ff4242');
				if ($(this).parent().find('.incorect-span').length == 0) {
					$(this).parent().append('<span class="incorect-span">Заполните поле</div>')
				};
				error = false;
			};
		});
		form.find('input.email').each(function(){
			if ($(this).val().indexOf('@') == -1){
				$(this).css('border-color', '#ff4242');
				if ($(this).parent().find('.incorect-span').length == 0) {
					$(this).parent().append('<span class="incorect-span">Некоректный email</div>')
				};
				email = false;
			}
		})
		if (error == true && email == true) {
			form.ajaxForm({
				type: "POST",
				url: url,
				beforeSubmit : function(){
					form.find('button[type=submit]').attr('disabled', true)
				},
				success : function(){
					if(form.hasClass('.send-resume')){
						main_text = '<div class="succ-mess"><p>Резюме успешно отправлено!<span>Мы свяжемся с Вами в ближайшее время</span></p></div>'
					}else{
						main_text = '<div class="succ-mess"><p>Запрос успешно отправлен!<span>Мы свяжемся с Вами в удобное для Вас время</span></p></div>'
					}
					form.height(formH).html(main_text);
					form.css('padding-top', (formH-175)/2);
					setTimeout(function(){
		        		form.find('.succ-mess').remove();
		        		$.fancybox.close();
		        		form.css('padding-top', '');
						form.height('').html(formCont).find('.input-wrap').removeClass('corect');
						form.find('#file-form-text').text('Прикрепить резюме');
		        	},5000);
				},
				error: function (xhr, ajaxOptions, thrownError) { 
		            alert(xhr.status); 
		            alert(thrownError); 
		        }
			});
		}
		else{
			return false;
		}
		
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
		$('.partner-img-wrap').each(function(){
			$(this).height(0);
			$(this).height($(this).parent().width())
			$(this).find('img').css('margin-top',($(this).height()-$(this).find('img').height())/2)
		});
		$('.service-img-wrap').width($('.service-block').width());
	}

	$('#accordion').on('shown.bs.collapse', function () {
	  	setTimeout(function(){
	  		$('.vertical-hr').each(function(){
				$(this).height($(this).siblings('.dost-block-content').height());
			});
	  	});
	})
	
	// vertical-hr
	$('.vertical-hr').height($('.vertical-hr').parents('.dost-block').height());

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
	$($('.sm-section').get().reverse()).each(function(){
		var sId = $(this).attr('id');
		$('footer').after("<a href='#"+sId+"p' class='section-link' rel='section-rgoup'></a>")
	})
	$('a.section-link').fancybox({
		closeBtn:false
	});
	$('.sm-section').click(function(){
		var sId = $(this).attr('id');
		// console.log('#'+sId+'p')
		$('a[href="#'+sId+'p"]').click();
		// $.fancybox.open([
		// 	{
		// 		href: '#'+sId+'p',
		// 		padding:0,
		// 		closeBtn:false,
		// 		maxWidth:486,
		// 		helpers : {
	 //        overlay : {
	 //          css : {
	 //            'background' : 'rgba(27, 54, 100, 0.8)'
		//         }
		// 	    }
		//     }
		// 	}
		// ])
	})
	$('.popup-close, .fancybox-close').click(function(){
		$.fancybox.close()
	})	
	if($(window).width() >767-17){
		$('.factory-block').nextAll().hide();
	}else{
		$('.factory-block').nextAll().show();
	}
	if ($(".modal-form-link").length > 0) {
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
	};

	

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
		// if($(window).width() < (767-17))	{
		// 	$.fancybox.close()
		// }
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
		$('.vertical-hr').each(function(){
			$(this).height($(this).siblings('.dost-block-content').height());
		});
		
		// kvad();
	})
		//галереи

  addOnload(function(){
  	$('.gallery-block .publishing .banner-block img').each(function(){
			$(this).css('margin-left',$(this).width/2*(-1))
		})
  	//картинка делаи по центру
		$('.detail-img-wrap img').each(function(){
			var mrTop = ($(this).parent().height() - $(this).height())/2;
			$(this).css({'margin-top':mrTop})
		})
		//выравниивание деталей
		var maxHeight = 0;
    $('.detail').each(function(){
      if ( $(this).height() > maxHeight ){
        maxHeight = $(this).height();
      }
    });
    $('.detail').height(maxHeight);
		
  	if($(window).width() > (767-17)){
	  	$('.slider-nav').css('margin-top',$('.slider-nav').height()/(-1)-5);
		}else{
			$('.slider-nav').css('margin-top',0);
		}
  	kvad();
		$('.new-preview-grid-2 .file').each(function(){
			var filetype = $(this).text();
			var fileClass = filetype.replace(/[.]/,"");
			$(this).addClass(fileClass)
			var fromTop = $(this).parent().find('img').outerHeight();		
			$(this).css('top',fromTop-24);
		})
		$('.new-preview-grid-3 .file').each(function(){
			var filetype = $(this).text();
			var fileClass = filetype.replace(/[.]/,"");
			$(this).addClass(fileClass)
			var fromTop = $(this).parent().find('img').outerHeight();
		
			$(this).css('top',fromTop-24);
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
  $(window).on('resize',function(){
  	$('.gallery-block .publishing .banner-block img').each(function(){
			$(this).css('margin-left',$(this).width/2*(-1))
		})
  	kvad();
  	if($(window).width() > (767-17)){
	  	$('.slider-nav').css('margin-top',$('.slider-nav').height()/(-1)-5);
		}else{
			$('.slider-nav').css('margin-top',0);
		}
  	if($(window).width() >423){
			$('.factory-block').nextAll().hide();

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
		}else{
			$('.factory-block').nextAll().show();
			$('.page-preview').css('height','auto');    
			$('.new-preview-grid-2').css('height','auto');
			$('.new-preview-grid-3').css('height','auto');
		}
		setTimeout(function(){
	  	$('.new-preview-grid-2 .file').each(function(){
				var fromTop = $(this).parent().find('img').outerHeight();			
				$(this).css('top',fromTop-24);
			})
			$('.new-preview-grid-3 .file').each(function(){
				var fromTop = $(this).parent().find('img').outerHeight();			
				$(this).css('top',fromTop-24);
			})
		},200)

		var maxHeight = 0;
    $('.detail').each(function(){
    	$(this).css('height','auto');
      if ( $(this).height() > maxHeight ){
        maxHeight = $(this).height();
      }
    });
    $('.detail').height(maxHeight);

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
	var i = 0;
	var count = 0;
	var allVid = $('a.video').length;
	while(i < allVid){
		count++
		$('a.video').eq(i).attr('href','#video'+count);
		$('a.video').eq(i).find('video').attr('id','video'+count);
		i++;
	}	
	$('a.video').fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		maxWidth: '80%'
	});
	$('a.video').click(function(){
		if($(this).find('video').attr('id').slice(-4) == "open"){
			$(this).find('video').attr('id').slice(-4)
		}
		var videoId = $(this).find('video').attr('id');
		setTimeout(function(){
			$('.fancybox-inner video').attr('id',videoId+"open")
			var thisVidId = $('.fancybox-inner video').attr('id')
			var video = document.getElementById(thisVidId);
			video.play();
		},300)
	})

	//слайдер в биллбоарде
	if ($('.slider-top').length > 0) {
		$('.slider-top').slick({
			slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  cssEase: 'ease',
	  	asNavFor: '.slider-nav',
	  	waitForAnimate: false
	  });
	  $('.slider-nav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.slider-top',
	  	centerMode: true,
	  	centerPadding: 0,
		  arrows: false,
		});
		$('.slider-top').slick('slickGoTo',0)
		$('.slider-top').find('.slide-top').each(function(){
			if($(this).attr('data-slick-index') == 0){
				var src = ''+$(this).find('img').attr('src');
				$('.billboard').css({'background-image':'url('+src+')','backgroud-position':' center center'});
			}
		})
	};
	
	$('.slider-nav .nav-item').click(function(){
		var slideNum = $(this).attr('data-slick-index');
		$('.slider-top').slick('slickGoTo',slideNum)
		$('.slider-top').find('.slide-top').each(function(){
			if($(this).attr('data-slick-index') == slideNum){
				var src = ''+$(this).find('img').attr('src');
				$('.billboard').css({'background-image':'url('+src+')','backgroud-position':' center center'});
			}
		})
	})

	//попапы в сервисах
	$('.sidebar .services li>a').each(function(){
		if($(this).next('p')){
			var link = $(this).attr('href');
			var title = $(this).text();
			var text = $(this).next('p').text();
	    var content = '<div class="services-popup"><span></span><h5>'+title+'</h5><p>'+text+'</p></div>';
	    $(this).next().remove();
	    $(this).after(content);
		}
	})
	$('.sidebar .services li>a').click(function(e){
		e.preventDefault();
		if($(this).parent().find('.services-popup').is(':hidden')){
			$('.sidebar .services').find('.services-popup').fadeOut();			
		}
		$(this).next('.services-popup').fadeToggle();
	})
	$('.services-popup span').click(function(){
		$('.sidebar .services').find('.services-popup').fadeOut();
	})
	if($('.clarify-order').length>0){
		$('.clarify-order').fancybox({
			minHeight: 500,
			maxWidth: '88%',
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none',
			closeBtn: true,
			wrapCSS: 'modal-form-wrap'
		});		
	}
	if($("#time-range").length>0){
		$("#time-range").ionRangeSlider({
	    grid: true,
	    values: ["Утро","Обед", "Вечер", "Сейчас"],
	    hide_min_max: true,
    	hide_from_to: true
		});
	}
	if($('input[type="tel"]').length>0){
		$('input[type="tel"]').mask("+7 999 999-99-99");		
	}
	$('.gallery-block .publishing .banner-block').hover(function(){
		var imgSrc = $(this).find('img').attr('src').slice(0, -4)+"_hover.png";
		console.log(imgSrc)
		$(this).find('img').attr('src',imgSrc)
	},function(){		
		var imgSrc = $(this).find('img').attr('src').slice(0, -10)+".png";		
		$(this).find('img').attr('src',imgSrc)
	})


	//схема
	// $('.shema-content img').each(function(){
	// 	var marTop = ($(this).parent().outerHeight()-$(this).outerHeight())/2
	// 	$(this).css({
	// 		'margin-top':marTop
	// 	})
	// })

	if($('.details-block a').find('img').length>0){
		$('.details-block a').fancybox();
	}

	var allShema = $('.shema-content').length;
	$('.shema-content').hide();
	$('.shema-content').eq(0).show();
	for(var i=0;i < allShema;i++){
		$('.shema-content').eq(i).attr('data-num',i)
		$('.shema .radio>input').eq(i).attr('data-num',i)
	}
	$('.shema .radio>input').click(function(){
		// $('.shema-content').hide();
		var num = $(this).attr('data-num');
		$('.shema-content').each(function(){
			$(this).hide();
			if($(this).attr('data-num') == num){
				$(this).fadeIn();
				console.log($(this).attr('data-num'))
			}
		})
	})

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
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(a.length<o.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a)},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
