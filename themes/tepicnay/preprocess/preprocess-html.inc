<?php
/**
 * 
 */
function tepicnay_alpha_preprocess_html(&$vars) {
  if ( arg(0) == 'node' && 
    (arg(1) == 'add' && arg(2) == 'negocio' && is_null(arg(3))) || 
    (intval(arg(1)) > 0 && arg(2) == 'edit' && is_null(arg(3))) 
  ) {
    tepicnay_styles_for_perfil($vars);
  }
}

function tepicnay_styles_for_perfil(&$vars) {
  // Map
  //$map_key = 'AIzaSyAgBNx4n3RoX0OTgQeCuNtjeIkDMAyRSf4';
  if ( isset($_SERVER['HTTPS']) ) {
    $map_script = "https://maps.googleapis.com/maps/api/js?sensor=false";
  } else {
    $map_script = "http://maps.googleapis.com/maps/api/js?sensor=false";
  }
  drupal_add_js($map_script, 'external');
  drupal_add_js(drupal_get_path('theme', 'tepicnay') . '/js/negocioForm.js');
  drupal_add_css(drupal_get_path('module', 'colorbox') . '/styles/default/colorbox_style.css');
}
