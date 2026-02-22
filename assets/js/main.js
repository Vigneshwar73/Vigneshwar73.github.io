/**
* Single-page portfolio: smooth scroll, theme toggle, scroll-spy
*/
!(function($) {
  "use strict";

  // Smooth scroll for same-page anchor links (CSS scroll-behavior + scroll-margin handle the rest)
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    var href = $(this).attr('href');
    if (href && href.indexOf('#') === 0 && href.length > 1) {
      var target = $(href);
      if (target.length) {
        e.preventDefault();
        target[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $(this).closest('li').addClass('active');
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    }
  });

  // Scroll-spy: set active nav item based on scroll position
  function updateActiveSection() {
    var scrollTop = $(window).scrollTop();
    var headerH = $('#header').outerHeight();
    $('section[id]').each(function() {
      var top = $(this).offset().top - headerH - 30;
      var bottom = top + $(this).outerHeight();
      if (scrollTop >= top && scrollTop < bottom) {
        var id = $(this).attr('id');
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu a[href="#' + id + '"], .mobile-nav a[href="#' + id + '"]').parent('li').addClass('active');
        return false;
      }
    });
  }
  $(window).on('scroll', updateActiveSection);
  $(window).on('load', updateActiveSection);
  if (window.location.hash) {
    var $target = $(window.location.hash);
    if ($target.length) $target[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Theme toggle (light / dark)
  var themeKey = 'portfolio-theme';
  function getStoredTheme() {
    try { return localStorage.getItem(themeKey) || 'dark'; } catch (e) { return 'dark'; }
  }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(themeKey, theme); } catch (e) {}
  }
  document.documentElement.setAttribute('data-theme', getStoredTheme());
  $(document).on('click', '#theme-toggle', function() {
    var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(next);
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

})(jQuery);