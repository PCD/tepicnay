<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

function tepicnay_breadcrumb(&$vars) {
  if ( empty($vars['breadcrumb'])) {
    return '';
  }
  $breadcrumb = $vars['breadcrumb'];
  if ( tepicnay_find_url($_GET['q'], array('directorio', 'taxonomy/term')) ) {
    if ( $_GET['q'] == 'directorio' ) {
      $breadcrumb[] = 'Directorio';
    } else {
      $breadcrumb[] = $breadcrumb[1];
      $breadcrumb[1] = l('Directorio', 'directorio');
    }
  } else if ( arg(0) == 'node' && intval(arg(1)) > 0 ) {
    $nid = arg(1);
    $node = node_load($nid);
    if ( $node->type == 'negocio' ) {
      $last = (count($breadcrumb)-1);
      $breadcrumb[] = $breadcrumb[$last];
      $breadcrumb[$last] = $breadcrumb[$last-1];
      $breadcrumb[$last-1] = l('Directorio', 'directorio');
    }
  }

  $output = "<h2 class=\"element-invisible\">\n" . t('You are here') . "</h2>\n";
  $output .= "<div class=\"breadcrumb\">\n";

  // Add items
  $count = count($breadcrumb);
  $breadcrumb[$count-1] = "<span>" . $breadcrumb[$count-1] . "</span>";
  $breadcrumb2 = array();
  foreach($breadcrumb as $i => $crumb) {
    $odd = $i%2==0?'even':'odd';
    $order = $i==0?' home':($i==($count-1)?' last':'');
    $class = "item {$odd}{$order}";
    $breadcrumb2[] = "<div class=\"{$class}\">{$crumb}</div>";
  }
  $output .= implode('<div class="separator">&raquo;</div>', $breadcrumb2);
  $output .= '</div>';
  
  return $output;
}

function tepicnay_find_url($url, $urls) {
  $urls = array('taxonomy/term', 'negocios');
  foreach($urls as $item) {
    $length = strlen($item);

    if ( $item == substr($url, 0, $length)) {
      return TRUE;
    }
  }
  return FALSE;
}