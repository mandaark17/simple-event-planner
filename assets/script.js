// Display the current day at the top of the calendar
function displayCurrentDay() {
  var currentDate = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").text(currentDate);
}

// Create time blocks for hours
function createTimeBlocks() {
  var currentHour = moment().hour();

  // Using for loop to make html elements
  for (var hour = 9; hour <= 17; hour++) {
    var timeBlockEl = $("<div>").addClass("time-block row");
    var hourEl = $("<div>").addClass("hour col-md-1 ").text(formatHour(hour));
    var textAreaEl = $("<textarea>").addClass(getTimeBlockClass(hour, currentHour)).attr("data-hour", hour);
    var saveBtnEl = $("<button>").addClass("saveBtn col-md-1").html('<i class="fas fa-save">Save</i>');

    timeBlockEl.append(hourEl, textAreaEl, saveBtnEl);
    $(".container").append(timeBlockEl);
  }
}

// Format the hour for display, used moment.js documentation
function formatHour(hour) {
  return moment(hour, "H").format("hA"); 
}

// Get the appropriate class for a time block based on the current hour
function getTimeBlockClass(hour, currentHour) {
  if (hour < currentHour) {
    return "past";
  } else if (hour === currentHour) {
    return "present";
  } else {
    return "future";
  }
}

// Save the event text in local storage
function saveEvent(hour, text) {
  localStorage.setItem("event_" + hour, text);
}

// Saved events from local storage
function loadEvents() {
  $(".time-block").each(function () {
    var hour = $(this).find("textarea").attr("data-hour");
    var savedEvent = localStorage.getItem("event_" + hour);
    if (savedEvent) {
      $(this).find("textarea").val(savedEvent);
    }
  });
}

// Event listener for save button clicks
$(".container").on("click", ".saveBtn", function () {
  var hour = $(this).siblings("textarea").attr("data-hour");
  var text = $(this).siblings("textarea").val();
  saveEvent(hour, text);
});

// Initial setup
$(document).ready(function () {
  displayCurrentDay();
  createTimeBlocks();
  loadEvents();
});
