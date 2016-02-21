<?php
/**
 * @file
 * Contains the admin settings form of the drag drop module.
 */

/**
 * Settings form for drag drop.
 */
function dragdrop_settings_form() {
  $form['dragdrop_containers'] = array(
    '#type' => 'textarea',
    '#title' => t('Containers'),
    '#description' => t('A CSS class or id of a container which contains draggable blocks (e.g. <b>.region-sidebar-first</b>). Multiple containers can be used by defining each on a new line.'),
    '#default_value' => variable_get('dragdrop_containers'),
  );

  return system_settings_form($form);
}
