(function ($) {

  /**
   * Converts the Home Top Banners as jCarousel.
   */
  Drupal.behaviors.globalIcons = {
    attach: function (context, settings) {
      links = $('#block-menu-menu-iconos ul.menu li a');
      $(links).attr('href', '#').click(function(e){
        e.preventDefault();
        return false;
      });
    }
  };

})(jQuery);