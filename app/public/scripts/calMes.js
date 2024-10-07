$(document).ready(function() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    let isMouseDown = false;
    let startDate = null;
    let endDate = null;
    let startColumn = null;
    let endColumn = null;

    // Set default values for selects
    $('#month-select').val(currentMonth);
    $('#year-select').val(currentYear);

    // Function to get current week dates
    function getCurrentWeekDates(startDate) {
        const weekDates = [];
        const currentDate = new Date(startDate);
        
        // Adjust to get the Monday of the current week
        const day = currentDate.getDay();
        const diff = (day === 0 ? -6 : 1) - day; // Adjust when day is Sunday
        currentDate.setDate(currentDate.getDate() + diff);
        
        for (let i = 0; i < 7; i++) {
            weekDates.push(new Date(currentDate).getDate());
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return weekDates;
    }

    // Function to update week dates
    function updateWeekDates(startDate) {
        const weekDates = getCurrentWeekDates(startDate);
        $('.calendar-grid .date-number').each(function(index) {
            if (weekDates[index] !== undefined) {
                $(this).text(weekDates[index]);
            }
        });
    }

    // Function to open the week view for a specific date
    function openWeekView(date) {
        updateWeekDates(date);
        // Scroll to the weekly calendar section
        // $('html, body').animate({
        //     scrollTop: $('.cal-contenedor-semanal').offset().top
        // }, 500);
    }

    // Function to generate the calendar for a given month and year
    function generateCalendar(year, month) {
        $('#calendar-dates').empty(); // Clear previous calendar cells

        const firstDayOfMonth = new Date(year, month, 1);
        const firstDayWeekIndex = (firstDayOfMonth.getDay() + 6) % 7; // Adjust to start week on Monday
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add blank cells for days before the first day of the month
        for (let i = 0; i < firstDayWeekIndex; i++) {
            $('#calendar-dates').append('<div></div>');
        }

        // Generate days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateDiv = $('<div>')
                .addClass('calendar-date')
                .attr('data-date', day)
                .text(day);

            // Highlight today if it's the current month and year
            if (year === currentYear && month === currentMonth && day === currentDay) {
                dateDiv.addClass('highlighted');
            }

            $('#calendar-dates').append(dateDiv);
        }

        // Attach double-click event to open week view
        $('.calendar-date').off('dblclick').dblclick(function() {
            const selectedDay = $(this).data('date');
            openWeekView(new Date(year, month, selectedDay));
        });
    }

    // Function to highlight specific dates
    function highlightDates(dateNumbers) {
        dateNumbers.forEach(function(date) {
            $(`.calendar-date[data-date="${date}"]`).addClass('highlighted');
        });
    }

    // Generate calendar on page load for current year and month
    generateCalendar(currentYear, currentMonth);

    // Update calendar when month or year changes
    $('#month-select, #year-select').change(function() {
        const selectedYear = parseInt($('#year-select').val());
        const selectedMonth = parseInt($('#month-select').val());
        generateCalendar(selectedYear, selectedMonth);
    });

    // Handle "Hoy" button click
    $('#hoy-btn').click(function() {
        $('#month-select').val(currentMonth);
        $('#year-select').val(currentYear);
        generateCalendar(currentYear, currentMonth);
        openWeekView(today);
    });

    // Mouse events for highlighting contiguous days
    $('#calendar-dates').on('mousedown', '.calendar-date', function(e) {
        isMouseDown = true;
        startDate = $(this).data('date');
        endDate = startDate;
        highlightRange(startDate, endDate);
        return false; // prevent text selection
    });

    $('#calendar-dates').on('mouseover', '.calendar-date', function(e) {
        if (isMouseDown) {
            endDate = $(this).data('date');
            highlightRange(startDate, endDate);
        }
    });

    $(document).mouseup(function() {
        isMouseDown = false;
    });

    function highlightRange(start, end) {
        $('.calendar-date').removeClass('highlighted');
        const min = Math.min(start, end);
        const max = Math.max(start, end);
        for (let i = min; i <= max; i++) {
            $(`.calendar-date[data-date="${i}"]`).addClass('highlighted');
        }
    }

        // Event listener for cal-mes-day-header
    $('.cal-mes-day-header').on('mousedown', function(e) {
        isMouseDown = true;
        startColumn = $(this).index();
        endColumn = startColumn;
        highlightColumn(startColumn);
        return false; // prevent text selection
    });

    $('.cal-mes-day-header').on('mouseover', function(e) {
        if (isMouseDown) {
            estaColumna = $(this).index();
            highlightColumn(estaColumna);
        }
    });

    
        function highlightColumn(column) {
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

});