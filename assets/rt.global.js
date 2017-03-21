function removeWishlist(event){
  "undefined" != typeof event && event.preventDefault();
  var a = $(this),
      i = a.closest('.item');
  var o = a.closest("form");

  $.ajax({
    type: "POST",
    url: "/contact",
    data: o.serialize(),
    beforeSend: function() {
      $("body").addClass("is_loading")
    },
    success: function() {
      $("body").removeClass("is_loading"), i.fadeOut(1e3)
    },
    error: function(i) {
      var e = '#error-modal',
          r = jQuery(e),
          a = $.parseJSON(t.responseText);

      r.find('.title').html(a.message);
      r.find('.message').html(a.description);

      setTimeout(function () {
        roar.showThemeCtl(e);
        jQuery("body").removeClass("is_loading");
        roar.timeout = setTimeout(function() {
          roar.closeThemeModal();
        }, 5e3);
      }, 500);
    }
  })
}

function addToWishlist(event) {
  "undefined" != typeof event && event.preventDefault();
  var a = $(this);
  a.closest(".product_item").addClass("is_loading");
  var o = a.closest("form");

  $.ajax({
    type: "POST",
    url: "/contact",
    async: !0,
    data: o.serialize(),
    cache: !1,
    success: function(t) {
      var p = a.closest('.product');
      var e = '#wishlist-modal',
          r = jQuery(e);

      r.find('.product-link').attr('href', p.find('.product-title a').attr('href'));
      r.find('.product-img').attr('src', p.find('.product-image img').attr('src')).attr('alt', p.find('.product-title a').text());
      r.find('.product-title .product-link').text(p.find('.product-title a').text());
      a.removeClass('add-to-wishlist').attr('title', a.attr('data-added')).find('i').removeClass('icon-pa-heart').addClass('icon-pa-heart-full');

      setTimeout(function () {
        roar.showThemeModal(e);
        $(".product_item").removeClass("is_loading");
        roar.timeout = setTimeout(function() {
          roar.closeThemeModal();
        }, 5e3);
      }, 500);
    },
    error: function(t) {
      var e = '#error-modal',
          r = jQuery(e),
          a = $.parseJSON(t.responseText);

      r.find('.title').html(a.message);
      r.find('.message').html(a.description);

      setTimeout(function () {
        roar.showThemeModal(e);
        $(".product_item").removeClass("is_loading");
        roar.timeout = setTimeout(function() {
          roar.closeThemeModal();
        }, 5e3);
      }, 500);
    }
  })
}

function notifyCart(t) {
  if (window.ajax_add_to_cart) $("#cart-loading").addClass("is_loading"), $(".product .product-wait").hide(), $(".cart-sidebar").toggleClass("opened"), $("html,body").toggleClass("cart-opened");
  else {
    var a = $("#umbrella"),
        o = (a.offset().top, a.offset().left, $(t));
    $("body").append(o), $(o).hide(), $(o).fadeIn("slow", "easeInOutExpo", function() {
      var t = $(this).offset().top,
          a = $(this).offset().left;
      $(this).css({
        margin: 0,
        left: a,
        top: t,
        position: "absolute"
      }).delay(2e3).animate({
        top: 0,
        left: "auto",
        right: 0,
        opacity: 1
      }, 3e3, "easeInOutExpo", function() {
        $(this).remove(), $(".product .product-wait").hide(), window.location = "/cart"
      })
    })
  }
}

function notifyCartFail(t) {
  var a = $(".cart-menu-icon"),
      o = (a.offset().top, a.offset().left, $(t));
  $("body").append(o), $(o).hide(), $(o).fadeIn("slow", "easeInOutExpo", function() {
    var t = $(this).offset().top,
        a = $(this).offset().left;
    $(this).css({
      margin: 0,
      left: a,
      top: t,
      position: "absolute"
    }).delay(2e3).animate({
      top: 0,
      left: "auto",
      right: 0,
      opacity: 1
    }, 3e3, "easeInOutExpo", function() {
      $(this).remove()
    })
  })
}

function addToCart(t) {
  "undefined" != typeof t && t.preventDefault(), $("#cart-loading").addClass("is_loading");
  var a = $(this);
  a.closest(".product_item").addClass("is_loading");
  var o = a.parents("form");
  if (0 == o.serialize().length) {
    var e = a.parents(".product-information");
    o = e.find("form.product-actions")
  }
  $.ajax({
    type: "POST",
    url: "/cart/add.js",
    async: !0,
    data: o.serialize(),
    dataType: "json",
    error: addToCartFail,
    success: addToCartSuccess,
    cache: !1
  })
}

function addToCartSuccess() {
  $.ajax({
    type: "GET",
    url: "/cart.js",
    async: !0,
    cache: !1,
    dataType: "json"
  }), $(".product_item").removeClass("is_loading");
  var t = '<div class="popupaddcart">Item added to Cart!</div>';
  notifyCart(t), Shopify.getCart(function(t) {
    Shopify.updateCartInfo(t, "cart-info")
  }), jQuery(".quantity").val(1).trigger("blur")
}

function addToCartFail(t) {
  var a = $.parseJSON(t.responseText),
      o = '<div class="popupaddcart">' + a.description + "</div>";
  $(".product_item").removeClass(".is_loading"), notifyCartFail(o), jQuery(".quantity").val(1).trigger("blur")
}

function searchPlaceholder() {
  Modernizr.input.placeholder || ($("#top-search-input").focus(function() {
    var t = $(this);
    t.val() == t.attr("placeholder") && (t.val(""), t.removeClass("placeholder"))
  }).blur(function() {
    var t = $(this);
    ("" == t.val() || t.val() == t.attr("placeholder")) && (t.addClass("placeholder"), t.val(t.attr("placeholder")))
  }).blur(), $("[placeholder]").parents("form").submit(function() {
    $(this).find("[placeholder]").each(function() {
      var t = $(this);
      t.val() == t.attr("placeholder") && t.val("")
    })
  }))
}! function(t) {
  function a() {}
  for (var o, e = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","); o = e.pop();) t[o] = t[o] || a
    }(function() {
  try {
    return console.log(), window.console
  } catch (t) {
    return window.console = {}
  }
}());
var GLOBAL = {
  common: {
    init: function() {
      $("html").removeClass("no-js").addClass("js"), searchPlaceholder(), $("body").on("click", ".add-to-cart", addToCart), $("body").on("click", ".add-to-wishlist", addToWishlist), $("body").on("click", ".remove-wishlist", removeWishlist)
    }
  },
  templateIndex: {
    init: function() {}
  },
  templateProduct: {
    init: function() {}
  },
  templateCart: {
    init: function() {}
  }
},
    UTIL = {
      fire: function(t, a, o) {
        var e = GLOBAL;
        a = void 0 === a ? "init" : a, "" !== t && e[t] && "function" == typeof e[t][a] && e[t][a](o)
      },
      loadEvents: function() {
        var t = document.body.id;
        UTIL.fire("common"), $.each(document.body.className.split(/\s+/), function(a, o) {
          UTIL.fire(o), UTIL.fire(o, t)
        })
      }
    };
$(document).ready(UTIL.loadEvents);

// new UISearch( document.getElementById( 'sb-search' ) );