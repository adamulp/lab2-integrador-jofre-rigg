
$(document).ready(function() {
let isMouseDown = false;
let currentStartDate = new Date();

function getMonthName(mes = null) {
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    if(mes == null){
        mes = new Date();
        mes = mes.getMonth();
    }
    return monthNames[mes];
}

// Function to update the h1 text content
function updateMonth(fecha = null) {
    const h1Element = document.getElementById('mes-de-la-semana-visible');
    if(fecha != null){
        h1Element.textContent = getMonthName(fecha.getMonth());
    } else {
        h1Element.textContent = getMonthName();
    }
}

// Initial update
updateMonth();

    // Function to generate date numbers for the current week
    function getCurrentWeekDates(startDate) {
        const startOfWeek = new Date(startDate);
        const dayOfWeek = startOfWeek.getDay(); // 0 (Sunday) to 6 (Saturday)
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust to start on Monday

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            weekDates.push(date.getDate());
        }
        return weekDates;
    }

    // Function to update the date numbers in the calendar grid
    function updateWeekDates(startDate) {
        const weekDates = getCurrentWeekDates(startDate);
        $('.calendar-grid .date-number').each(function(index) {
            $(this).text(weekDates[index]);
        });
    }

    // Set initial date numbers for the current week
    updateWeekDates(currentStartDate);

    // Event listener for next week button
    $('#nextWeek').click(function() {
        currentStartDate.setDate(currentStartDate.getDate() + 7);
        updateWeekDates(currentStartDate);
        updateMonth(currentStartDate);
    });

    // Event listener for previous week button
    $('#prevWeek').click(function() {
        currentStartDate.setDate(currentStartDate.getDate() - 7);
        updateWeekDates(currentStartDate);
        updateMonth(currentStartDate);
    });

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
