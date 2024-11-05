$(document).ready(function() {
let isMouseDown = false;

// Highlight entire day column
$('.day-header').click(function() {
    var index = $(this).index();
    var isHighlighted = $('.calendar-grid .row').first().children().eq(index).hasClass('highlighted');
    $('.calendar-grid .row').each(function() {
    if (isHighlighted) {
        $(this).children().eq(index).removeClass('highlighted');
    } else {
        $(this).children().eq(index).addClass('highlighted');
    }
    });
});

// Highlight entire hour-long row
$('.hora-header').click(function() {
    var row = $(this).parent();
    if (row.children().not('.highlighted').length === 0) {
    row.children().removeClass('highlighted');
    } else {
    row.children().addClass('highlighted');
    }
});

// Contiguous grid highlighting
$('.hora-col').mousedown(function() {
    isMouseDown = true;
    $(this).toggleClass('highlighted');
    return false; // prevent text selection
}).mouseover(function() {
    if (isMouseDown) {
    $(this).toggleClass('highlighted');
    }
});

$(document).mouseup(function() {
    isMouseDown = false;
});

// Prevent selection of headers and first column
$('.hora-header, .day-header').mousedown(function(event) {
    event.stopPropagation();
});
});