$(document).ready(function() {

// hover в header nav	
	$('.header-top-line nav ul li').hover(function() {
		$(this).find('.first-drop').fadeIn(500);
	}, function() {
		$(this).find('.first-drop').fadeOut(500);
	});

	$('.header-top-line nav ul li .first-drop li').hover(function() {
		$(this).find('.second-drop').fadeIn(500);
	}, function() {
		$(this).find('.second-drop').fadeOut(500);
	})

	// запуск header каруселі
		$('.header-carousel').owlCarousel({
		loop: true,
		smartSpeed: 700,
		nav: true,
		dots: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		items: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		autoplayTimeout: 5000
	});

	// hover в блоці why_we
	$('.why_me-flex-container .why_me-flex-container-item').hover(function() {
		$(this).find('.first').fadeOut(50);
		$(this).find('.second').css('transform', 'scale(1,1)');

	}, function() {
		$(this).find('.second').css('transform', 'scale(0,0)');
		$(this).find('.first').fadeIn(200);
	});

	// запуск каруселі our_products
	$('.our_products-carousel').owlCarousel({
		loop: true,
		dots: true,
		smartSpeed: 700,
		items: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		autoplayTimeout: 10000,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			564: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 3
				
			}
		}
	});	

	// код для навбар - випадання меню
	$('.navbars .drop > li').hover(function() {
		$(this).find('.first-drop').slideToggle(500);
	}, function() {
		$(this).find('.first-drop').slideToggle(500);
	});


	$('.navbars .drop > li .first-drop > li').hover(function() {
		$(this).find('.second-drop').slideToggle(500);			
	}, function() {
		$(this).find('.second-drop').slideToggle(500);
	});

	// опрацьовуємо клік на fa-bars
	$('.header .header-top-line .header-hamburger i').click(function() {
		$('.navbars').slideToggle(500);
	});

	$('.navbars ul li a').click(function() {
		$('.navbars').slideToggle(500);
	})
	
	// опрацьовуємо скролл до розділів сайту

	$(".header .header-top-line nav ul li a").mPageScroll2id();
	$(".header .header-top-line .logo a").mPageScroll2id();
	$(".navbars ul li a").mPageScroll2id();


	// опрацьовуємо заповнення навичок (шкала)
	$(".about_us .about_us-details .skills .skills-int").addClass('hidden_my').viewportChecker({
		classToAdd: 'visible_my animated fadeIn',
		offset: '5%',
		repeat: false
	}); 

	// збільшення count при скролі (%)
	var show = true; //для одноразового спрацювання
	var countbox = "#counts"; //враппер
	$(window).on("scroll load resize", function(){

		if(!show) return false;

		var w_top = $(window).scrollTop();
		var e_top = $(countbox).offset().top;

		var w_height = $(window).height();
		var d_height = $(document).height();

		var e_height = $(countbox).outerHeight();

		if(w_top +300 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
			$(".goal").spincrement({
				thousandSeparator: "",
				duration: 2500
			});

			show = false;
		}
	});


	// анімація для блоку why we при скрол
	$('.why_me .h2, .footer-header').addClass('hidden_my').viewportChecker({
		classToAdd: 'visible_my animated fadeInUp',
		offset: '5%',
		repeat: false
	}); 

	// resize вікна, адаптивність гамбургера, при width > 1023 - завжди none
	$(window).resize(function() {
		if ( $(window).width() > 1023) {
			$('.navbars').slideUp();
		}
	});

});