<?php

/**
 * @file
 * Template overrides as well as (pre-)process and alter hooks for the
 * TepicNay theme.
 */


/**
 * Implements hook_form_id_alter.
 */
function tepicnay3_form_search_block_form_alter(&$form, &$form_state, $form_id) {
  $form['search_block_form']['#attributes']['placeholder'] = t('Enter keywords for search');
}