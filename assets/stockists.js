$('.stockists-hero-img a').on('click', function(event) {
  $('.stockists-hero-img a').toggleClass('active');
  $('.vendors').toggleClass('hidden');
});

$('div.list-group').on('click', function(event) {
  // This is the js code for targeting the generated id that will be put on hidden divs containing different countries.  For the time being this will just unhide the united states div dummy data.

  // $("#" + event.target.innerHTML.replace(/\s+/g, '')).toggleClass('hidden');
  $('#UNITEDSTATES').toggleClass('hidden');
});

$('div.country').on('click', function(event) {
  // $("#" + event.target.innerHTML.replace(/\s+/g, '')).toggleClass('hidden');
  $('#UNITEDSTATES').toggleClass('hidden');
});

// js quirks:
// Clicking on stockists link toggles showing div, even if it's not the current target