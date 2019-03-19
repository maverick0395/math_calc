var current_fs, next_fs, previous_fs;
var a_cols, a_rows, b_rows, b_cols;
var allow2next = (element) => {
  current_fs = $(element).parent();
  next_fs = current_fs.next();

  next_fs.show();
  current_fs.hide();

}

$('.next').click(function() {

});

$('select').click(function() {
  if ($('p').is('.speech')) {
    $('p.speech').detach();
  }
})

$('.compute-size').click(function() {
  a_cols = $('.matrixA_selection_cols :selected').val();
  a_rows = $('.matrixA_selection_rows :selected').val();
  b_rows = $('.matrixB_selection_rows :selected').val();
  b_cols = $('.matrixB_selection_cols :selected').val();

  if ($('.matrixA_selection_cols :selected').val() !== $('.matrixB_selection_rows :selected').val() ) {
    $('#first_fs').append('<p class="speech">Количество колонок первой матрицы должно соответствовать количеству строк второй матрицы</p>')
    if (is($('.rows'))) {
      $('.rows').detach();
    }
    return;
  }
  allow2next(this);

  for (var i = 0; i < a_rows; i++) {
      $('#second_fs #labelB').before(`<div  class='rows a_row a${i+1}'></div>`);
  }
  for (var j = 0; j < a_cols; j++) {
    $('.a_row').append(`<input class='cols a_col position_a${j+1} cell' type='text' name='a_element${j+1}'>`);
  }
  for (var i = 0; i < b_rows; i++) {
    $('#second_fs .previous').before(`<div class='rows b_row b${i+1}'></div>`);
  }
  for (var j = 0; j < b_cols; j++) {
    $('.b_row').append(`<input class='cols b_col position_b${j+1} cell' type='text' name='b_element${j+1}'>`);
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

$('.process-data').click(function() {
  var m_array = []
  for (var i = 0; i < a_rows; i++) {
    m_array[i] = [];
    for (var j = 0; j < a_cols; j++)
    {
      m_array[i][j] = $(`.a${i+1} .position_a${j+1}`).val();
    }
  }
  alert(m_array);
  if (isNaN($('.cell').val())) {
    alert($('.b3 .position_b2').val());
    return;
  }

  allow2next(this);
});
