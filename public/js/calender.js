document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid", "timeGrid", "list", "multimonth"],
    // Add your events and other options here
  });

  calendar.render();
});
