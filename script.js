/**
 * @file
 * Contains javascript functionality for the dashboard module.
 */
(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.dashboard = {
    attach: function (context, settings) {
      var blocks = {removed: []};
      if (localStorage.getItem('dashboard-blocks')) {
        blocks = JSON.parse(localStorage.getItem('dashboard-blocks'));
      }

      // Initialize dashboard.
      dragula([document.querySelector('.region-content-after'), document.querySelector('.region-content-after-side')], {
          // TODO: We could extend with the ability to remove blocks, but than
          // we also have to make the functionality to add the blocks again.
          //removeOnSpill: true,
        })
        .on('drop', function (el, container) {
          blocks = {};
          // Keep an array of the order of each block in its region.
          $('.region-content-after > div, .region-content-after-side > div').each(function(i) {
            var region = $(this).parent().attr('class');
            if (blocks[region] == undefined) {
              blocks[region] = [];
            }
            blocks[region].push($(this).attr('id'));
          });
          localStorage.setItem('dashboard-blocks', JSON.stringify(blocks));
        })
        .on('remove', function (el, container) {
          // Keep the dropped blocks in the array as well.
          if (blocks['removed'] == undefined) {
            blocks['removed'] = {};
          }
          blocks['removed'][$(el).attr('id')] = $(el).attr('id');
          localStorage.setItem('dashboard-blocks', JSON.stringify(blocks));
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

    }
  };
})(jQuery, Drupal, this, this.document);
