<?php

/**
 * Implements hook_preprocess_html().
 */
function tepicnay3_preprocess_html(&$variables) {
  $class = array();
  if ( isset($variables['page']['sidebar_first']) && isset($variables['page']['sidebar_second']) ) {
    $class[] = 'sidebar-both-present sidebars-present';
  } else if ( isset($variables['page']['sidebar_first']) ) {
    $class[] = 'sidebar-first-present sidebars-present';
  } else if ( isset($variables['page']['sidebar_second']) ) {
    $class[] = 'sidebar-second-present sidebars-present';
  } else {
    $class[] = 'no-sidebars';
  }
  
  foreach($class as $class_item) {
    $variables['classes_array'][] = $class_item;
  }
}
