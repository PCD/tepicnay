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
}

function tepicnay3_preprocess_page_node_type(&$variables, $type) {
  switch($type) {
    case 'negocio':

      break;
  }
}

function tepicnay3_preprocess_page_nid(&$variables) {
  
}