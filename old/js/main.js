(function() {
	"use strict";
    
    $(window).on('load', function() {
        
        /*--====== Preloader ======--*/
         $('body').delay(100).css({
            'overflow': 'visible'
          });
        $('#page-loader').delay().fadeOut('slow').remove();
        /*--====== End Preloader ======--*/
        
        /*--====== Galery Fillter ======--*/
		// Active Class
		$('.filter_controll li').click(function() {
			$('.filter_controll li').removeClass('active');
			$(this).addClass('active');
		})
		// Portfolio Grid
		var $grid = $('.grid').isotope({
			itemSelector: '.grid_item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid_item'
			}
		})
		// fillter controll
		$('.filter_controll ul>li').click(function() {
			var selector = $(this).attr('data-filter');
			$grid.isotope({
				filter: selector
			});
			return false;
		});
        /*--====== End Galery Fillter ======--*/
    });
    
	$(document).ready(function() {
        
		/*--====== Progress Bar ======--*/
		$(window).on('scroll', function() {
			$(".skills-progress span").each(function() {
				var bottom_of_object = $(this).offset().top + $(this).outerHeight();
				var bottom_of_window = $(window).scrollTop() + $(window).height();
				var myVal = $(this).attr('data-value');
				if (bottom_of_window > bottom_of_object) {
					$(this).css({
						width: myVal
					});
				}
			});
		});
        /*--====== End Progress Bar ======--*/
        
		/*--====== Text Animation ======--*/
		$("header .caption span").typed({
			strings: [" WEB DEVELOPER", "MOBILE DEVELOPER", "UI/UX DEVELOPER"],
			loop: true,
			startDelay: 1e3,
			backDelay: 2e3
		});
        /*--====== End Text Animation ======--*/
        
		/*--====== Scrolling Nav ======--*/
		$('a.page-scroll').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
        /*--====== End Scrolling Nav ======--*/
        
		/*--====== Sticky Nav ======--*/
		$(window).on("scroll", function() {
			var bodyScroll = $(window).scrollTop(),
				navbar = $(".navbar-default");
			if (bodyScroll > 5) {
				navbar.addClass("nav-scroll")
			} else {
				navbar.removeClass("nav-scroll")
			}
		});
		/*--====== End Sticky Nav ======--*/
        
		/*--====== Owl-Carousel ======--*/
		$('.owl-carousel').owlCarousel({
			margin: 20,
			loop: true,
			autoplay: true,
			animateIn: 'bounceIn',
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				1000: {
					items: 1,
					nav: true,
					loop: true
				}
			}
		});
        /*--====== End Owl-Carousel ======--*/
        
		/*--====== Parallax js ======--*/
		if (($(window).width() >= 767)) {
			$('#home').parallax("50%", .5);
		}
        /*--====== End Parallax js ======--*/
        
		/*--====== Counter js ======--*/
		$('.counter').counterUp({
			delay: 10,
			time: 1000
		});
        /*--====== End Counter js ======--*/
	})
}(jQuery));