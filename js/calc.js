var current_fs, next_fs, previous_fs;
var a_cols, a_rows, b_rows, b_cols;
var allow2next = (element) => {
  current_fs = $(element).parent();
  next_fs = current_fs.next();

  next_fs.show();
  current_fs.hide();
};

var allow2previous = (element) => {
  current_fs = $(element).parent();
  previous_fs = $(element).parent().prev();

  previous_fs.show();
  current_fs.hide();
}

var form_matrix = (rows, cols, which_row, which_col) => {
  var m_array = []
  for (var i = 0; i < which_row; i++) {
    m_array[i] = [];
    for (var j = 0; j < which_col; j++)
    {
      if ($(`${rows}${i+1} ${cols}${j+1}`).val() === '') {
        return;
      }
       m_array[i][j] = Number($(`${rows}${i+1} ${cols}${j+1}`).val());
    }
  }
    return m_array;
};

var multiplyMatrix = (A,B) => {
  var rowsA = A.length, colsA = A[0].length,
      rowsB = B.length, colsB = B[0].length,
      C = [];

  for (var i = 0; i < rowsA; i++) C[i] = [];
  for (var k = 0; k < colsB; k++) {
    for (var i = 0; i < rowsA; i++) {
      var t = 0;
      for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
      C[i][k] = t;
    }
  }
  return C;
}

var display_step = (A,B) => {
  var rowsA = A.length, colsA = A[0].length,
      rowsB = B.length, colsB = B[0].length,
      C = [];

  for (var i = 0; i < rowsA; i++) C[i] = [];
  for (var k = 0; k < colsB; k++) {
    for (var i = 0; i < rowsA; i++) {
      var t = [];
      for (var j = 0; j < rowsB; j++) t.push(`(${A[i][j]} * ${B[j][k]})`);
      var jt = t.join('+');

      C[i][k] = jt;
    }
  }
  return C;
}

var determinateMatrix = (A) => {
  var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[i] = [];
       for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[i][i]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[i][i];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][i];
          B[j][i] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return B[N-1][N-1];
    else return -B[N-1][N-1];
}

var show_det = (determinant) => {
  $(`.finalTitle`).after(`<div class='final_value'>${determinant}</div>`)
}

var create_m_table = (matrix, type) => {
  $(`#3 .${type}Title`).after(`<table class='${type}_result ${type}Table'></table>`);
  for (var i = 0; i < matrix.length; i++) {
    $(`.${type}_result`).append(`<tr class='${type}_t_raw${i+1}'><tr>`);
    for (var j = 0; j < matrix[0].length; j++) {
      $(`.${type}_t_raw${i+1}`).append(`<td>${matrix[i][j]}</td>`)
    }
  }
}

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
    $('.a_row').append(`<input class='cols a_col position_a${j+1} cell' type='number' name='a_element${j+1}'>`);
  }
  for (var i = 0; i < b_rows; i++) {
    $('#second_fs .previous').before(`<div class='rows b_row b${i+1}'></div>`);
  }
  for (var j = 0; j < b_cols; j++) {
    $('.b_row').append(`<input class='cols b_col position_b${j+1} cell' type='number' name='b_element${j+1}'>`);
  }
});

$('.compute-size-det').click(function() {
  d_cols = $('.matrixA_selection :selected').val();
  d_rows = $('.matrixA_selection :selected').val();

  allow2next(this);

  for (var i = 0; i < d_rows; i++) {
      $('#second_fs #labelA').after(`<div  class='rows d_row d${i+1}'></div>`);
  }
  for (var j = 0; j < d_cols; j++) {
    $('.d_row').append(`<input class='cols d_col position_d${j+1} cell' type='number' name='a_element${j+1}'>`);
  }
});

$('.delete-size').click(function() {
  $('.rows').detach();
  allow2previous(this);
});


$('.delete_calc').click(function () {
  $('.final_result').detach();
  $('.step_result').detach();
  allow2previous(this);
});

$('.process-data').click(function() {

  var matrix_A = form_matrix('.a', '.position_a', a_rows, a_cols);
  var matrix_B = form_matrix('.b', '.position_b', b_rows, b_cols);
  if (matrix_A === undefined || matrix_B === undefined) {
      return;
  }
  allow2next(this);
  var step_C = display_step(matrix_A, matrix_B);
  var matrix_C = multiplyMatrix(matrix_A, matrix_B);
  create_m_table(step_C, 'step');
  create_m_table(matrix_C, 'final');
});

$('.process-data-det').click(function() {

  var matrix_D = form_matrix('.d', '.position_d', d_rows, d_cols);
  if (matrix_D === undefined) {
      return;
  }
  allow2next(this);

  var det = determinateMatrix(matrix_D);
  show_det(det);
});
$('.delete_calc_det').click(function () {
  $('.final_value').detach();
  allow2previous(this);
});
