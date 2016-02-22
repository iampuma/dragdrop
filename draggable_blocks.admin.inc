<?php
/**
 * @file
 * Contains the admin settings form of the draggable blocks module.
 */

/**
 * Settings form for draggable blocks.
 */
function draggable_blocks_settings_form() {
  $form['draggable_blocks_containers'] = array(
    '#type' => 'textarea',
    '#title' => t('Containers'),
    '#description' => t('A CSS class or id of a container which contains draggable blocks (e.g. <b>.region-sidebar-first</b>). Multiple containers can be used by defining each on a new line.'),
    '#default_value' => variable_get('draggable_blocks_containers'),
  );

  return system_settings_form($form);
}
