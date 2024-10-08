class CalMes {
    constructor() {
        this.today = new Date();
        this.currentYear = this.today.getFullYear();
        this.currentMonth = this.today.getMonth();
        this.currentDay = this.today.getDate();
        this.isMouseDown = false;
        this.startDate = null;
        this.endDate = null;
        this.selectedWeekStartDate = null;
        this.selectedWeekEndDate = null;
        this.startColumn = null;
        this.endColumn = null;
        this.init();
    }

    highlightColumn(column) {
        let allHighlighted = true;
        $('.calendar-date').each(function() {
        if ($(this).index() % 7 === column) {
            if (!$(this).hasClass('highlighted')) {
            allHighlighted = false;
            }
        }
        });

        $('.calendar-date').each(function() {
        if ($(this).index() % 7 === column) {
            if (allHighlighted) {
            $(this).removeClass('highlighted');
            } else {
            $(this).addClass('highlighted');
            }
        }
        });
    }

    getMonthName(mes) {
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return monthNames[mes];
    }

    updateSemanaMonth(mes) {
        const h1Element = document.getElementById('mes-de-la-semana-visible');
        h1Element.textContent = this.getMonthName(mes) + ' ' + this.currentYear;
    }

    generateCalendar(year, month) {
        $('#calendar-dates').empty();
        const firstDayOfMonth = new Date(year, month, 1);
        const firstDayWeekIndex = (firstDayOfMonth.getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayWeekIndex; i++) {
            $('#calendar-dates').append('<div></div>');
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateDiv = $('<div>').addClass('calendar-date').attr('data-date', day).text(day);
            if (year === this.currentYear && month === this.currentMonth && day === this.currentDay) {
                dateDiv.addClass('highlighted');
            }
            $('#calendar-dates').append(dateDiv);
        }

        $('.calendar-date').off('dblclick').dblclick((event) => {
            const selectedDay = $(event.target).data('date');
            const selectedDate = new Date(year, month, selectedDay);
            calSemana.currentStartDate = selectedDate;
            calSemana.openWeekView(selectedDate);
        });
    }

    highlightRange(start, end) {
        $('.calendar-date').removeClass('highlighted');
        const min = Math.min(start, end);
        const max = Math.max(start, end);
        for (let i = min; i <= max; i++) {
            $(`.calendar-date[data-date="${i}"]`).addClass('highlighted');
        }
    }

    init() {
        this.generateCalendar(this.currentYear, this.currentMonth);

        $('#month-select, #year-select').change(() => {
            const selectedYear = parseInt($('#year-select').val());
            const selectedMonth = parseInt($('#month-select').val());
            this.generateCalendar(selectedYear, selectedMonth);
        });

        // Handle mouse down for date range selection
        $('#calendar-dates').on('mousedown', '.calendar-date', (event) => {
            this.isMouseDown = true;
            this.startDate = $(event.target).data('date');
            this.endDate = this.startDate;
            this.highlightRange(this.startDate, this.endDate);
            return false;
        });

        // Handle mouse over for extending the selection range
        $('#calendar-dates').on('mouseover', '.calendar-date', (event) => {
            if (this.isMouseDown) {
                this.endDate = $(event.target).data('date');
                this.highlightRange(this.startDate, this.endDate);
            }
        });

        $(document).mouseup(() => {
            this.isMouseDown = false;
        });
    }
}


class CalSemana {
    highlightSelectedWeek(startDate) {
        const startOfWeek = new Date(startDate);
        startOfWeek.setDate(startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        $('.calendar-date').removeClass('highlighted');
        $('.calendar-date').each((index, element) => {
            const date = parseInt($(element).data('date'));
            if (date >= startOfWeek.getDate() && date <= endOfWeek.getDate()) {
                $(element).addClass('highlighted');
            }
        });
    }
    constructor() {
        this.currentStartDate = new Date();
        this.isMouseDown = false;
        this.init();
    }

    getMonthName(mes = null) {
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return mes == null ? monthNames[new Date().getMonth()] : monthNames[mes];
    }

    getCurrentWeekDates(startDate) {
        const startOfWeek = new Date(startDate);
        const dayOfWeek = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - ((dayOfWeek + 6) % 7));

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            weekDates.push(date.getDate());
        }
        return weekDates;
    }

    updateSemanaMonth() {
        const h1Element = document.getElementById('mes-de-la-semana-visible');
        let startOfWeek = new Date(this.currentStartDate);
        startOfWeek.setDate(startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7));

        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const lunesMonth = startOfWeek.getMonth();
        const domingoMonth = endOfWeek.getMonth();
    
        if (lunesMonth !== domingoMonth) {
            let mes1 = this.getMonthName(lunesMonth).substring(0, 3);
            let mes2 = this.getMonthName(domingoMonth).substring(0, 3);
            h1Element.textContent = mes1 + " - " + mes2 + " " + startOfWeek.getFullYear();
        } else {
            h1Element.textContent = `${this.getMonthName(lunesMonth)} ${startOfWeek.getFullYear()}`;
        }
    }

    openWeekView(date) {
        this.currentStartDate = date;
        this.updateWeekDates(date);
        this.updateSemanaMonth();
        this.highlightSelectedWeek(date);
    }

    updateWeekDates(startDate) {
        const weekDates = this.getCurrentWeekDates(startDate);
        $('.calendar-grid .date-number').each((index, element) => {
            $(element).text(weekDates[index]);
        });
        this.highlightSelectedWeek(startDate);
    }

    init() {
        this.updateSemanaMonth();
        this.updateWeekDates(this.currentStartDate);
        this.highlightSelectedWeek(this.currentStartDate);

        $('#nextWeek').click(() => {
            this.currentStartDate.setDate(this.currentStartDate.getDate() + 7);
            this.updateWeekDates(this.currentStartDate);
            this.updateSemanaMonth();
        });
        
        $('#prevWeek').click(() => {
            this.currentStartDate.setDate(this.currentStartDate.getDate() - 7);
            this.updateWeekDates(this.currentStartDate);
            this.updateSemanaMonth();
        });
    }
}

$(document).ready(() => {
    window.calMes = new CalMes();
    window.calSemana = new CalSemana();
    $('#month-select').val(calMes.currentMonth);
    $('#year-select').val(calMes.currentYear);
    calMes.generateCalendar(calMes.currentYear, calMes.currentMonth);

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

    // FIXED: Event listener for cal-mes-day-header (calMes)
    // Issue: Clicking on a column header does not select a column.
    $('.cal-mes-day-header').on('mousedown', function(e) {
        isMouseDown = true;
        startColumn = $(this).index();
        endColumn = startColumn;
        window.calMes.highlightColumn(startColumn);
        return false; // prevent text selection
    });
    // FIXED: Event listener for cal-mes-day-header (calMes)
    // Issue: Highlighting a column isn't possible, so extending the selection to another column isn't either.
    $('.cal-mes-day-header').on('mouseover', function(e) {
        if (isMouseDown) {
            estaColumna = $(this).index();
            window.calMes.highlightColumn(estaColumna);
        }
    });
/*-------------- broken event handlers --------------------------------*/

    // Constants for broken event handlers
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    let isMouseDown = false;

    // FIXME: Prevent selection of headers and first column (calSemana)
    // Issue: Headers and first column are highlighted when clicked
    $('.hora-header, .day-header').mousedown(function(event) {
        event.stopPropagation();
        return false;
    });

/*-------------- End of broken event handlers --------------------------------*/


    // FIXED: Handle "Hoy" button click (calMes, needs constants above)
    // Issue: The "Hoy" button highlights the current week instead of the current day on the monthly calendar
    $('#hoy-btn').click(function() {
        // Set the dropdowns to the current month and year
        $('#month-select').val(currentMonth);
        $('#year-select').val(currentYear);
    
        // Generate the calendar for the current month and year
        window.calMes.generateCalendar(currentYear, currentMonth);
    
        // Clear all highlighted elements before highlighting today
        $('.calendar-date').removeClass('highlighted');
    
        // Highlight only today in the monthly view
        const todayDate = today.getDate();
        $(`.calendar-date[data-date="${todayDate}"]`).addClass('highlighted');

        window.calSemana.openWeekView(today);
    });
    




    $(document).mouseup(function() {
        isMouseDown = false;
    });
});
