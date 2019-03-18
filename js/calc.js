var current_fs, next_fs, previous_fs;



$('.next').click(function() {

  current_fs = $(this).parent();
  next_fs = current_fs.next();

  next_fs.show();
  current_fs.hide();
});

/* $('.compute-size').click(function() {
  for (var i = 0; i < a_rows; i++) {
    $('#elem h3').after(`<div class='a_row ${i+1}'></div>`);
    }
  for (var i = 0; i < a_cols; i++) {
    $('.a_row').append(`<input class='a_col ${i+1}' type='text' name='element'`)
  }); */

  $('.compute-size').click(function() {
    var a_cols = $('.matrixA_selection_cols :selected').val();
    var a_rows = $('.matrixA_selection_rows :selected').val();
    var b_rows = $('.matrixB_selection_rows :selected').val();
    var b_cols = $('.matrixB_selection_cols :selected').val();

    for (var i = 0; i < a_rows; i++) {
      $('#elem #labelB').before(`<div  class='rows a_row a${i+1}'></div>`);
    }
    for (var j = 0; j < a_cols; j++) {
      $('.a_row').append(`<input class='cols a_col position_b${j+1}' type='text' name='a_element${j+1}' value='${j+1}'>`);
    }
    for (var i = 0; i < b_rows; i++) {
      $('#elem .previous').before(`<div class='rows b_row b${i+1}'></div>`);
    }
    for (var j = 0; j < b_cols; j++) {
      $('.b_row').append(`<input class='cols b_col position_b${j+1}' type='text' name='b_element${j+1}' value='${j+1}'>`);
    }

  });
$('.delete-size').click(function() {
  $('.rows').detach();
});
$('.previous').click(function () {
  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  previous_fs.show();
  current_fs.hide();
});
