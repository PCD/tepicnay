(function ($) {

  /**
   * Converts the Home Top Banners as jCarousel.
   */
  Drupal.behaviors.globalMobileMenu = {
    attach: function (context, settings) {
      // Toggle Menu
      toggleMenuClick();
      
      // Copy Categories.
      mobileCategories();
    }
  };
  
  /**
   * Toggle Menu.
   */
  function toggleMenuClick() {
    $('#menu-mobile .menu-open-btn').click(function(e){
      $('body').addClass('mobile-menu-open').removeClass('mobile-menu-closed');
      event.preventDefault();
    });
    
    $('#menu-mobile .menu-close-btn').click(function(e){
      $('body').addClass('mobile-menu-closed').removeClass('mobile-menu-open');
      event.preventDefault();
    });
  }
  
  /**
   * Set Up Categories for Menu.
   */
  function mobileCategories() {
    if ( $('#block-views-categorias-block').length == 0 ) {
      return;
    }
    
    categories = $('#block-views-categorias-block .view-categorias .item-list').clone();
    $(categories).removeAttr('class').attr('id', 'mobile-categories');
    $('.l-region--header').append(categories);
  }

})(jQuery);