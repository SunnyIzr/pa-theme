$('.stockists-hero-img a').on('click', function(event) {
  $('.stockists-hero-img a').toggleClass('active');
  $('.vendors').toggleClass('hidden');
});



$('div.list-group a').on('click', function(event) {
  // This is the js code for targeting the generated id that will be put on hidden divs containing different countries.  For the time being this will just unhide the united states div dummy data.
  // console.log('hi')
  // $("#" + event.target.innerHTML.replace(/\s+/g, '')).toggleClass('hidden');
  country = $(this).data('country')
  $(country).toggleClass('hidden');
});

$('div.country').on('click', function(event) {
  // $("#" + event.target.innerHTML.replace(/\s+/g, '')).toggleClass('hidden');
  country = $(this).data('country')
  $(country).toggleClass('hidden');
});

// js quirks:
// Clicking on stockists link toggles showing div, even if it's not the current target

if ( window.location.href.indexOf('#in-store') > -1 ){
  $('.stockists-hero-img a').toggleClass('active');
  $('.vendors.in-store').removeClass('hidden');
} else {
  $('.vendors.online-vendors').removeClass('hidden');
}