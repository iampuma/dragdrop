/**
 * @file
 * Contains javascript functionality for the dragdrop module.
 */
(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.dragdrop = {
    attach: function (context, settings) {
      var blocks = {removed: []};
      var containers = [];
      var selectors = '';
      if (localStorage.getItem('dragdrop-blocks')) {
        blocks = JSON.parse(localStorage.getItem('dragdrop-blocks'));
      }
      $.each(Drupal.settings.dragdrop.containers, function(i, container) {
        containers[i] = document.querySelector(container);
        selectors += container + ' > *,';
      });

      // Initialize dragdrop.
      dragula(containers, {
          //removeOnSpill: true,
          invalid: function (el, handle) {
            return !$(handle).hasClass('drag-handle');
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
          localStorage.setItem('dragdrop-blocks', JSON.stringify(blocks));
        })
        .on('remove', function (el, container) {
          // Keep the dropped blocks in the array as well.
          if (blocks['removed'] == undefined) {
            blocks['removed'] = {};
          }
          blocks['removed'][$(el).attr('id')] = $(el).attr('id');
          localStorage.setItem('dragdrop-blocks', JSON.stringify(blocks));
        });

      $(selectors).each(function(i) {
        $(this).prepend("<span class='drag-handle'></span>");
      });

      // Rearrange all blocks.
      if (blocks !== undefined) {
        $.each(blocks, function(region, column) {
          if (region != 'removed') {
            // Put every block in the correct place in its region.
            $.each(column, function(j, value) {
              $('.'+region.split(' ').join('.')).append($('#'+value));
            });
          } else {
            // Hide every dropped block and add a class.
            $.each(column, function(j, value) {
              $('#'+value).hide().addClass('dropped');
            });
          }
        });
      }

      $('.drag-gear').click(function() {
        $('.dropped').show();
      });
    }
  };
})(jQuery, Drupal, this, this.document);
