jQuery(document).ready(function($){
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
    $('.is-mega').bind('mouseenter',function() {
      $(this).addClass('hover');
    });
    $('.is-mega iframe').bind('hover',function() {
      $(this).parents(".is-mega").addClass('hover');
    });
    $(".is-mega").bind('mouseleave',function() {
      $(this).removeClass('hover');
    });
  }
});