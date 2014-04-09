<?php
/**
 * Returns HTML for a breadcrumb trail.
 */
function tepicnay3_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
    $output = '';

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
    $output .= "</ul>\n\n</div>\n";
    return $output;
  }
}