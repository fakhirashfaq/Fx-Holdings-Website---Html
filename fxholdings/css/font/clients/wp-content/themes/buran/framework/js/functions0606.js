jQuery.noConflict()(function ($) {
	"use strict";
	
	 if($(window).width() < 767){
		 $(".primary-menu > li > a").on("click", function (event) {
			if ($(this).parents('li').find($("ul")).children().length > 0) {
				event.preventDefault();
			}
		});
		$( "#open_mobile_menu" ).on( "click", function() {
			$('body').toggleClass('active_mobile');
		 	$('#open_mobile_menu .fa').toggleClass('fa-bars fa-close');
		 });
		 $( ".menu_overlay" ).on( "click", function() {
				$('body').toggleClass('active_mobile');
				$('#open_mobile_menu .fa').toggleClass('fa-bars fa-close');
		 });
		
		
	 }
	
	$('#main-area').css('margin-top', $('#header').outerHeight());
	var stickyNavTop = $('#header').offset().top;
	var stickyNavTopp = stickyNavTop + $('#header').outerHeight();
	$(window).scroll(function () {
		if ($(this).scrollTop() > stickyNavTopp) {
			$('#header').addClass('oi_sticky');
		} else {
			$('#header').removeClass('oi_sticky');
		}
	});

	$('body.page-template-portfolio').css('min-height', $(window).outerHeight());
	$('.insert_after_portfolio').insertAfter('.potfolio_container_holder');

	$('.menu_overlay').click(function (e) {
		e.preventDefault();
		$('body').toggleClass('mobile_open');
	});
	/*END ---- MENU*/
	/*************************************/
	//Ajax Portfolio Shortcode
	if ($('#oi_current_image_shortcode').length) {
		$('#oi_current_image_shortcode').height($(window).outerHeight() - $('#middle-header').outerHeight() - 70);
		$('#oi_next_image_shortcode').height($(window).outerHeight() - $('#middle-header').outerHeight() - 70);
		$('#oi_c_h').height($(window).outerHeight() - $('#middle-header').outerHeight() - 70);
		$('#oi_current_image_shortcode').parents('.vc_column-inner').css('padding', 0);
	}

	$('.oi_crea_a').click(function (e) {
		var first = $('.oi_creative_p_content').attr('data-first');
		var last = $('.oi_creative_p_content').attr('data-last');
		var tags = $('.oi_creative_p_content').attr('data-tags');
		if ($('#oi_current_image_shortcode').length) {
			var img = $('#oi_current_image_shortcode').css('background-image');
			img = img.replace('url("', '"').replace(')', '');
		} else {
			var img = $('#oi_current_image').attr('style');
		}
		var id = $(this).attr('data-id');

		$('.oi_creative_p_content').animate({
			'opacity': 0
		}, 300);

		$.get(
			oi_theme.ajax_url, {
				'action': 'union_ajax_request_c',
				'id': id.toString(),
				'first': first.toString(),
				'last': last.toString(),
				'tags': tags
			},
			function (result, status) {
				$(result.new_posts).imagesLoaded(function () {
					$('#oi_current_image_shortcode').css('background-image', 'url(' + img + ')');
					$('#oi_next_image_shortcode').css('background-image', 'url("' + result.new_posts.url + '")');

					$('.oi_prev_c_p').attr('data-id', result.new_posts.prev);
					$('.oi_next_c_p').attr('data-id', result.new_posts.next);
					$('.oi_c_title a').html(result.new_posts.title);
					$('.oi_c_cats').html(result.new_posts.cat);
					$('.oi_c_title a').attr('href', result.new_posts.details);
					$('.oi_c_title a').attr('data-id', result.new_posts.cur);
					$('.oi_c_details').attr('data-id', result.new_posts.cur);
					$('#oi_next_image_shortcode').animate({
						'opacity': 1
					}, 600);
					setTimeout(function () {
						$('#oi_current_image_shortcode').css('background-image', 'url("' + result.new_posts.url + '")')
					}, 560);
					setTimeout(function () {
						$('#oi_next_image_shortcode').animate({
							'opacity': 0
						}, 100)
					}, 800);
					setTimeout(function () {
						$('.oi_creative_p_content').animate({
							'opacity': 1
						}, 400)
					}, 860);


				});
			},
			"json"
		);
		e.preventDefault();
	});


	$('a[data-rel^=lightcase]').lightcase();
	$('.woocommerce-product-gallery__wrapper a').attr('data-rel', 'lightcase:gallery');
	$('.woocommerce-product-gallery__wrapper a').lightcase();
	lightcase.resize();
	
	
	jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if ((oldValue >= max) && (max!='') ) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });

});
