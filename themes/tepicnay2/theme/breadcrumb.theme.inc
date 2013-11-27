<?php
/**
 * Returns HTML for a breadcrumb trail.
 */
function tepicnay2_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  
  //bs_breadcrumb_node_alter($breadcrumb);

  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    // Override Drupal core breadcrumb item imploding (no arrow).
    $output .= "<div class=\"breadcrumb-wrapper\">\n";
    $output .= "<ul class=\"breadcrumb\">\n";
    $list_items = array();
    $total = count($breadcrumb);
    foreach($breadcrumb as $i => $item) {
      if ( $i == ($total-1) ) {
        $class = 'class="last"';
      } else if ( $i == 0 ) {
        $class = 'class="first"';
      }
      $output .= "<li {$class}>{$item}</li>\n";
      if ( $i != ($total-1) ) {
        $output .= "<li class=\"separator\">»</li>\n";
      }
    }
    $output .= "</ul>\n<div class=\"tail\"><div>&nbsp;</div></div>\n</div>\n";
    return $output;
  }
}