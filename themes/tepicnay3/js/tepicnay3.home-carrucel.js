(function ($) {

/**
 * Converts the Home Top Banners as jCarousel.
 */
Drupal.behaviors.tepicnay3HomeCarrucel = {
  attach: function (context, settings) {
    if ( jQuery.browser.mobile == true ) {
      $(window).load(setCarrucelWidth).resize(setCarrucelWidth, reloadCarrucel);
    }
    setupCarrucel();
  }
};

/**
 * Adjust the Carrucel Width.
 */
function setCarrucelWidth() {
  window_width = parseInt($(window).width(), 10);
  picture_width = Math.min(window_width, 480);
  picture_height = picture_width/480*240;
  $('#block-views-banners-carrucel-block').width(window_width).height(picture_height);
  $('#block-views-banners-carrucel-block .views-row').width(window_width).height(picture_height);
  $('#block-views-banners-carrucel-block .jcarousel-item').width(window_width).height(picture_height);
  $('#block-views-banners-carrucel-block .views-row .field--name-field-image img').width(picture_width);
  $('#block-views-banners-carrucel-block .jcarousel-item .field--name-field-image img').width(picture_width);
  llength =  $('#block-views-banners-carrucel-block .jcarousel-item').length;
  wwidth = (llength*window_width) + 100;
  $('#block-views-banners-carrucel-block .jcarousel-list').width(wwidth);
}

/**
 * Setup Carrucel.
 */
function setupCarrucel() {
  $('#block-views-banners-carrucel-block .views-row').show();
  var jcarousel = $('#block-views-banners-carrucel-block .item-list').jcarousel({
    scroll: 1, 
    auto: 4, 
    animation: 'slow', 
    wrap: 'circular', 
    itemVisibleInCallback: {
      onBeforeAnimation: function() {
        if ( jQuery.browser.mobile == true ) {
          setCarrucelWidth();
        }
      }
    }
  });
}

/**
 * Reload Carrucel.
 */
function reloadCarrucel() {
  $('#block-views-banners-carrucel-block .item-list').jcarousel('unlock');
  $('#block-views-banners-carrucel-block .item-list').jcarousel('reset', {
    scroll: 1, 
    auto: 4, 
    animation: 'slow', 
    wrap: 'circular', 
    itemVisibleInCallback: {
      onBeforeAnimation: function() {
        setCarrucelWidth();
      }
    }
  });

  /*$('#block-views-banners-carrucel-block .item-list').jcarousel('reload', {
    scroll: 1, 
    auto: 4, 
    animation: 'slow', 
    wrap: 'circular', 
    itemVisibleInCallback: {
      onBeforeAnimation: function() {
        setCarrucelWidth();
      }
    }
  });*/
}

})(jQuery);