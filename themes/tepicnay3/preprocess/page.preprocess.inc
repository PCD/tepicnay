<?php

/**
 * Implements hook_preprocess_page().
 */
function tepicnay3_preprocess_page(&$variables) {
  // You can use preprocess hooks to modify the variables before they are passed
  // to the theme function or template file.
  if ( arg(0) == 'node' && intval(arg(1)) > 0 && is_null(arg(2)) ) {
    $type = $variables['node']->type;
    $variables['theme_hook_suggestions'][] = "page__node__{$type}";
    tepicnay3_preprocess_page_node_type($variables, $type);
    
    // JS for specific Nodes
    tepicnay3_preprocess_page_nid($variables);
  }
  
  // Add Menu for Mobile
  tepicnay3_preprocess_page_menu_mobile($variables);
}

function tepicnay3_preprocess_page_node_type(&$variables, $type) {
  switch($type) {
    case 'negocio':

      break;
  }
}

function tepicnay3_preprocess_page_nid(&$variables) {
  
}

function tepicnay3_preprocess_page_menu_mobile(&$variables) {
  $header = &$variables['page']['header'];
  $close = t('Close');
  $menu_mobil = array(
    '#type' => 'markup', 
    '#markup' => "<div id=\"menu-mobile\" class=\"mobile\">
      <a class=\"menu-open-btn\" href=\"#\">Menu</a>
      <a class=\"menu-close-btn\" href=\"#\">{$close}</a>
    </div>\n", 
  );
  array_unshift($header, $menu_mobil);
}