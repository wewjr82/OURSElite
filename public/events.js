document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth", // or 'timeGridWeek', 'timeGridDay', etc.
    events: [
      // Your events data will go here
      {
        title: "Event 1",
        start: "2024-04-20",
        end: "2024-04-22",
      },
      {
        title: "Event 2",
        start: "2024-04-25",
        end: "2024-04-27",
      },
      // Add more events as needed
    ],
  });

  calendar.render();
});
