/**
 * @file
 * Contains javascript functionality for the draggable blocks module.
 */
(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.draggable_blocks = {
    attach: function (context, settings) {
      var blocks = {};
      var containers = [];
      var selectors = '';
      if (localStorage.getItem('draggable-blocks')) {
        blocks = JSON.parse(localStorage.getItem('draggable-blocks'));
      }
      $.each(Drupal.settings.draggable_blocks.containers, function(i, container) {
        containers[i] = document.querySelector(container);
        selectors += container + ' > *,';
      });

      // Initialize draggable-blocks.
      dragula(containers, {
          invalid: function (el, handle) {
            return !$(handle).hasClass('gu-handle');
          },
        })
        .on('drop', function (el, container) {
          blocks = {};
          // Keep an array of the order of each block in its region.
          $(selectors).each(function(i) {
            var region = $(this).parent().attr('class');
            if (blocks[region] == undefined) {
              blocks[region] = [];
            }
            if (!$(this).hasClass('dropped')) {
              blocks[region].push($(this).attr('id'));
            }
          });
          localStorage.setItem('draggable-blocks', JSON.stringify(blocks));
        });

      $(selectors).each(function(i) {
        $(this).prepend("<span class='gu-handle'></span>");
      });

      // Rearrange all blocks.
      if (blocks !== undefined) {
        $.each(blocks, function(region, column) {
          // Put every block in the correct place in its region.
          $.each(column, function(j, value) {
            $('.'+region.split(' ').join('.')).append($('#'+value));
          });
        });
      }
    }
  };
})(jQuery, Drupal, this, this.document);
