$(document).ready(function() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    // Set default values for selects
    $('#month-select').val(currentMonth);
    $('#year-select').val(currentYear);

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

        // Attach click event to highlight dates
        $('.calendar-date').off('click').click(function() {
            $(this).toggleClass('highlighted');
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

    // Function to highlight specific dates
    function highlightDates(dateNumbers) {
        dateNumbers.forEach(function(date) {
            $(`.calendar-date[data-date="${date}"]`).addClass('highlighted');
        });
    }

    // Example usage: Highlighting the 5th, 10th, and 15th of the month
    // highlightDates([5, 10, 15]);
});
