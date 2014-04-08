(function ($) {

  /**
   * Converts the Home Top Banners as jCarousel.
   */
  Drupal.behaviors.tepicnay3HomeTopBanners = {
    attach: function (context, settings) {
      var jcarousel = $('#block-views-banners-carrucel-block .item-list').jcarousel({
        scroll: 1, 
        auto: 4, 
        animation: 'slow', 
        wrap: 'circular',
      });
    }
  };

})(jQuery);