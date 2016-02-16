$.fn.inView=function(){var n=$(window);obj=$(this);var o=n.scrollTop(),t=n.scrollTop()+n.height(),i=obj.offset().top+20;return t>=i&&i>=o?!0:!1};
$.fn.exists=function(){return $(this).length>0?!0:!1};
Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
  return jQuery.inArray(e, this)
}),
  function() {
  var e, t, r;
  r = '<div class="pseudo-select" data-target="{{target}}">\n <div class="selected">\n        <span class="pseudo-val">{{selected}}</span>\n      <i class="icomoon-arrow-down"></i>\n    </div>\n    <ul>\n      {{#each options}}\n         <li data-pseudo-option="{{value}}">{{option}}</li>\n        {{/each}}\n </ul>\n</div>', t = Handlebars.compile(r), e = {
    initItem: function(r) {
      var o, a, i = r.attr("data-id"),
          n = r.closest(".item-" + i),
          s = jQuery(n).find("select.single-option-selector");
      return jQuery(".pseudo-select", n).remove(), a = 0, s.each(function() {
        var e;
        return jQuery(this).attr("data-no-pseudo") ? void 0 : (e = {
          target: "pseudotarget" + a,
          options: []
        }, jQuery(this).attr("data-pseudo-select", e.target), jQuery(this).children("option").each(function() {
          return e.options.push({
            value: jQuery(this).val(),
            option: jQuery(this).text()
          })
        }), e.selected = jQuery(this).find(":selected").text(), jQuery(this).after(t(e)), a += 1, jQuery(this).hide())
      }), jQuery(".pseudo-select", n).unbind("click"), jQuery(".pseudo-select", n).click(function() {
        return jQuery(".pseudo-select", n).not(this).each(function() {
          return jQuery(this).children("ul").slideUp("fast"), jQuery(this).children(".selected").removeClass("focus")
        }), jQuery(this).children("ul").slideToggle("fast"), jQuery(this).children(".selected").toggleClass("focus")
      }), jQuery("[data-pseudo-option]", n).click(function() {
        var e, t;
        return e = jQuery(this).parent().parent(), t = e.data("target"), jQuery("select[data-pseudo-select='" + t + "']", n).val(jQuery(this).data("pseudo-option")).trigger("change"), jQuery(e).children(".selected").children(".pseudo-val").html(jQuery(this).html())
      }), o = function(t) {
        return e = jQuery(".pseudo-select", n), e.is(t.target) || 0 !== e.has(t.target).length ? void 0 : (jQuery(e).children(".selected").removeClass("focus"), jQuery(e).children("ul").slideUp("fast"))
      }, jQuery(document).mousedown(function(e) {
        return o(e)
      }), jQuery(document).bind("touchend", function(e) {
        return o(e)
      })
    },
    initProduct: function() {
      var r, o, a = jQuery("#product"),
          i = jQuery(a).find("select.single-option-selector");
      return jQuery(".pseudo-select", a).remove(), o = 0, i.each(function() {
        var e;
        return jQuery(this).attr("data-no-pseudo") ? void 0 : (e = {
          target: "pseudotarget" + o,
          options: []
        }, jQuery(this).attr("data-pseudo-select", e.target), jQuery(this).children("option").each(function() {
          return e.options.push({
            value: jQuery(this).val(),
            option: jQuery(this).text()
          })
        }), e.selected = jQuery(this).find(":selected").text(), jQuery(this).after(t(e)), o += 1, jQuery(this).hide())
      }), jQuery(".pseudo-select", a).unbind("click"), jQuery(".pseudo-select", a).click(function() {
        return jQuery(".pseudo-select", a).not(this).each(function() {
          return jQuery(this).children("ul").slideUp("fast"), jQuery(this).children(".selected").removeClass("focus")
        }), jQuery(this).children("ul").slideToggle("fast"), jQuery(this).children(".selected").toggleClass("focus")
      }), jQuery("[data-pseudo-option]", a).click(function() {
        var e, t;
        return e = jQuery(this).parent().parent(), t = e.data("target"), jQuery("select[data-pseudo-select='" + t + "']", a).val(jQuery(this).data("pseudo-option")).trigger("change"), jQuery(e).children(".selected").children(".pseudo-val").html(jQuery(this).html())
      }), r = function(t) {
        return e = jQuery(".pseudo-select", a), e.is(t.target) || 0 !== e.has(t.target).length ? void 0 : (jQuery(e).children(".selected").removeClass("focus"), jQuery(e).children("ul").slideUp("fast"))
      }, jQuery(document).mousedown(function(e) {
        return r(e)
      }), jQuery(document).bind("touchend", function(e) {
        return r(e)
      })
    }
  }, window.roar_pseudo = e, $(window).resize(function() {
    roar.handleSticky(), roar.detectOptions(), roar.mockupCaptionSlider(), roar.mockupCaptionVideo(), roar.mockupStaticBlock()
  }), $(window).scroll(function() {
    roar.handleSticky()
  }), jQuery(document).ready(function(e) {
    roar.isMobile() ? (roar.touch = !0, roar.clickEv = "touchstart", e("body").addClass("touch"), navigator.userAgent.match(/iPhone/i) ? e("body").addClass("iphone") : navigator.userAgent.match(/iPod/i) && e("body").addClass("ipod")) : e("body").addClass("notouch"), roar.init();

    //Fill a template with a Shopify product
    $.fn.fillWithShopifyProduct = function(){
      return $(this).each(function(){
        //Which prod we gettin' & where we puttin' it?
        var handle = $(this).data('fill-with-product');
        var $replaceTarget = $(this).find('script[type="text/template"]');
        var template = $replaceTarget.html();
        //Fetch data!
        $.getJSON('/products/' + handle + '.json', function(data){
          var product = data.product;
          //Flat vals first
          for(var key in product) {
            template = template.replace(new RegExp('\\[' + key + '\\]', 'ig'), product[key]);
          }
          //Images, e.g. "[img:compact]"
          var lastDot = product.image.src.lastIndexOf('.');
          template = template.replace(/\[img:([a-z]*)\]/ig, product.image.src.slice(0, lastDot) + '_$1' + product.image.src.slice(lastDot));
          //Actual insertion
          $replaceTarget.replaceWith(template);
        });
      });
    };
    $('[data-fill-with-product]').fillWithShopifyProduct();
  })
}.call(this);
var modalCloseButton = '<a class="close-modal" href="#" data-modal-close><i class="icon-pa-close-x"></i></a>',
    removeModalTimeoutID = -1;
var roar = {
  timeout: null,
  touch: !1,
  clickEv: "click",
  init: function() {
    roar.megaMenu(), roar.mockupCaptionVideo(), roar.mockupStaticBlock(), roar.handleSocialSharing(), roar.detectOptions(), roar.callbackImagesLoaded(), roar.handleTooltip(), roar.handleCountdown(), roar.handleTabs(), roar.handleSearch(), roar.handleSliding(), roar.callbackSearchMobile(), roar.buildProductItem(), roar.closeThemeModalEvents(), roar.handleCart(), roar.handleMenuMobile(), roar.handleCartSidebar(), roar.handleSlideshow(), roar.handleMap(), roar.handleEffects(), roar.handleScrollToTop(), roar.handleSmoothScroll(), roar.mapFilters(), roar.handlVideo(), roar.productThumbnails(), fakewaffle.responsiveTabs(["xs"])
  },
  productThumbnails: function(){
    $(document).on('click', '.product-gallery .thumbnails .thumbnail', function(e){
      e.preventDefault();
      var $photoCont = $(this).closest('.product-gallery');
      var $imgToChange = $photoCont.find('.main img.main-img');
      if($(this).data('src') != $imgToChange.attr('src')){
        $imgToChange.attr('src', $(this).attr('data-src'));
      }
    });
  },
  mockupStaticBlock: function(){
    if(jQuery('.static-surround').length){
      var list = jQuery('.static-surround').find('[data-size]');
      list.each(function(){
        var $this = jQuery(this);
        if (roar.getWidthBrowser() < 1200) {
          var g_font = window.general_font_size,
              font = $this.data('size'),
              bottom = $this.data('bottom'),
              width = roar.getWidthBrowser(),
              font1 = font * width / 1200;
          g_font > font1 && (font1 = g_font), $this.css({
            "font-size": font1
          })
        } else {
          var font = $this.data('size');
          $this.css({
            "font-size": font
          })
        }
      });
    }
  },
  megaMenu: function() {
    jQuery(".mega-menu").on("hover", ".item", function() {
      jQuery(".mega-menu .item").removeClass("hover"), jQuery(this).addClass("hover")
    })
  },
  handlVideo: function() {
    var e = jQuery(".responsive-video iframe");
    e.each(function() {
      jQuery(this).removeAttr("height").removeAttr("width")
    }), jQuery(".responsive-video").fitVids({
      customSelector: "iframe[src^='https://w.soundcloud.com'], iframe[src^='http://myviiids.com']"
    })
  },
  affixProduct: function() {
    function e() {
      var e = jQuery("#product");
      if (e.length) {
        var t = e.offset().left + e.outerWidth() - jQuery(".product-sidebar").outerWidth(),
            r = e.offset().top,
            o = e.outerHeight(!0),
            a = r + o,
            i = jQuery(".product-sidebar").outerHeight(!0),
            n = jQuery("#header").outerHeight(!0);
        jQuery("#phantom").length && (n = jQuery("#phantom").outerHeight(!0));
        var s = jQuery(window).scrollTop(),
            l = s + i;
        r > s ? jQuery(".product-sidebar").removeClass("affix").removeClass("affix-bottom") : s >= r && a > l ? jQuery(".product-sidebar").removeClass("affix-bottom").addClass("affix").css("top", 0).css("left", t) : l >= a && jQuery(".product-sidebar").removeClass("affix").addClass("affix-bottom").attr("style", "").css("top", a - i - n)
      }
    }
    jQuery(window).scroll(function() {
      e()
    }), jQuery(window).resize(function() {
      e()
    }), e()
  },
  handleSocialSharing: function() {
    if (jQuery(".sharing-bubble").length) {
      var e = jQuery(".sharing-bubble"),
          t = e.outerWidth();
      e.css("width", t).removeClass("fixed").addClass("absolute")
    }
  },
  subPrice: function(e, t) {
    var r = jQuery(e).closest(".item-" + t),
        o = jQuery(".cart-qty .quantity", r).val() || 1;
    o = parseInt(("" + o).replace(/[^0-9]/g, ""));
    var a = jQuery(".price-btn .sub_price", r).attr("data-price");
    a = parseInt(("" + a).replace(/[^0-9]/g, ""));
    var i = o * a;
    jQuery(".price-btn .sub_price", r).html(Shopify.formatMoney(i, window.money_format)), window.show_multiple_currencies && currenciesCallbackSpecial(".item-" + t + " span.money")
  },
  modifyQty: function(e, t, r) {
    var o = jQuery(e).closest(".qty"),
        a = jQuery(".quantity", o).val() || 1;
    return a = parseInt(("" + a).replace(/[^0-9]/g, "")), 1 > a + t || isNaN(a) ? !1 : (jQuery(".quantity", o).val(a + t), void(r && roar.subPrice(e, r)))
  },
  showThemeGallery: function(e, t, r) {
    jQuery(t).addClass("is_loading"), jQuery("#theme-gallery").remove();
    for (var o = jQuery(['<div id="theme-gallery" class="theme-modal">', '<div class="theme-gallery">', '<div class="theme-viewport swiper-container">', '<div class="theme-images swiper-wrapper">', "</div>", "</div>", '<div class="swiper-scrollbar"></div>', '<div class="theme-thumbs"></div>', "</div>", "</div>"].join("")).appendTo(jQuery("body")), a = o.find(".theme-images"), i = 0; i < e.length; i++) r != e[i] && jQuery('<div class="theme-img swiper-slide"/>').append(jQuery("<img/>").attr("src", e[i])).appendTo(a);
    o.find(".theme-images").clone().attr("class", "theme-thumbs-inner").appendTo(o.find(".theme-thumbs")).find(".theme-img").removeClass("swiper-slide").find("img").wrap('<a href="#"/>'), o.imagesLoaded(function() {
      roar.showThemeModal(o);
      var e = jQuery("#theme-gallery .swiper-container");
      jQuery(window).off(".themeGalleryResize").on("doThemeGalleryResizeCheck.themeGalleryResize resize.themeGalleryResize", function() {
        var t = e.parent().height();
        e.height(t), e.find("img").height(t)
      }).trigger("doThemeGalleryResizeCheck");
      var r = {
        mode: "horizontal",
        loop: !1,
        slidesPerView: "auto",
        slidesPerViewFit: !1,
        resizeReInit: !0,
        cssWidthAndHeight: !0,
        calculateHeight: !1,
        freeMode: !0,
        freeModeFluid: !0,
        scrollContainer: !0,
        grabCursor: !0,
        createPagination: !1
      };
      jQuery("html").hasClass("ie8") || jQuery.extend(r, {
        scrollbar: {
          container: ".swiper-scrollbar",
          draggable: !1,
          hide: !1,
          snapOnRelease: !0
        }
      });
      var a = e.swiper(r);
      jQuery("#theme-gallery .theme-thumbs").on("click", "a", function() {
        return a.swipeTo(jQuery(this).parent().index(), 1e3), !1
      }), jQuery(t).removeClass("is_loading")
    })
  },
  showThemeModal: function(e) {
    roar.closeThemeModal(!0), jQuery(".theme-modal.temp").remove();
    var t = jQuery(e);
    t.appendTo("body").addClass("reveal").find(".modal-actions").remove(), t.prepend('<div class="modal-actions">' + modalCloseButton + "</div>"), roar.isPageScrollin() && jQuery("#page, #site-control").css("padding-right", jQuery.scrollBarWidth()), jQuery("body").addClass("modal-active")
  },
  closeThemeModal: function() {
    clearTimeout(roar.timeout);
    jQuery("a[data-modal-toggle].active").removeClass("active"), jQuery(".theme-modal.reveal").removeClass("reveal").addClass("unreveal"), jQuery("body").removeClass("modal-active")
  },
  closeThemeModalEvents: function() {
    jQuery(document).on("click", "body:not(.modal-active) a[data-modal-toggle]", function(e) {
      e.preventDefault();
      var t = jQuery(jQuery(this).data("modal-toggle")).removeClass("unreveal").addClass("reveal");
      t.find(":input[type=text]:visible:first").focus(), jQuery(this).addClass("active"), roar.isPageScrollin() && jQuery("body").css("padding-right", jQuery.scrollBarWidth()), jQuery("body").addClass("modal-active")
    }).on("keyup", function(e) {
      27 == e.which && roar.closeThemeModal()
    }), jQuery(document).on("click", "body.modal-active a[data-modal-close]", function(e) {
      e.preventDefault(), roar.closeThemeModal()
    }), jQuery(document).on("click", ".theme-modal", function(e) {
      e.target == this && (e.preventDefault(), roar.closeThemeModal(), jQuery(this).trigger("reset-modal"))
    }), jQuery(document).on("click", "body.modal-active a[data-modal-toggle]", function(e) {
      e.preventDefault(), roar.closeThemeModal(), jQuery(this).click()
    }), jQuery(document).on("click", "a[data-modal-target]", function(e) {
      e.preventDefault(), roar.showThemeModal($('<div class="theme-modal temp"/>').append($('<div class="inner"/>').html(jQuery(jQuery(this).data("modal-target")).wrapInner('<div class="container"/>').html())))
    })
  },
  isPageScrollin: function() {
    return jQuery("#page").outerHeight() > jQuery(window).height()
  },
  handleCart: function() {
    jQuery("#module-content").on("click", ".cart-toggle", function(e) {
      var t = jQuery(this),
          r = t.attr("data-once");
      if ("false" != r) {
        var o, a, i, n;
        return n = t.closest(".product_item"), a = n.find(".cart"), i = n.find(".wrap"), o = n.find(".btns"), jQuery(".product_item").not(n).each(function() {
          return jQuery(this).removeClass("border")
        }), jQuery(".cart").not(a).each(function() {
          return jQuery(this).removeClass("show")
        }), jQuery(".btns").not(o).each(function() {
          return jQuery(this).removeClass("hidden")
        }), jQuery(".wrap").each(function() {
          return jQuery(this).css({
            height: "auto"
          })
        }), a.hasClass("show") || i.css({
          height: "" + (a.outerHeight() + 2) + "px"
        }), n.toggleClass("border"), a.toggleClass("show"), o.toggleClass("hidden"), e.preventDefault()
      }
      var s = t.attr("data-id"),
          l = t.closest(".item-" + s),
          c = jQuery(".product-select", l).attr("data-id"),
          d = t.attr("data-handle"),
          u = t.closest(".product_item").find(".icon_spinner2");
      u.show(), jQuery.getJSON("/products/" + d + ".js", function(r) {
        t.attr("data-once", "true");
        var o = function(e) {
          if (e) jQuery(".price-btn", l).prop("disabled", !1).fadeTo(200, 1), jQuery(".price-btn .del", l).html("Add to cart"), e.available ? (jQuery(".cart-qty", l).show(), jQuery(".cart-out", l).hide()) : (jQuery(".cart-qty", l).hide(), jQuery(".cart-out", l).show()), jQuery(".price-val", l).html(e.compare_at_price > e.price ? '<span class="price">' + Shopify.formatMoney(e.price, window.money_format) + '</span><del class="price_compare">' + Shopify.formatMoney(e.compare_at_price, window.money_format) + "</del>" : '<span class="price">' + Shopify.formatMoney(e.price, window.money_format) + "</span>");
          else {
            jQuery(".price-val", l).empty(), jQuery(".price-btn", l).prop("disabled", !0).fadeTo(200, .5);
            var r = e ? "Sold out" : "Unavailable";
            jQuery(".price-btn .del", l).html('<span class="sold_out">' + r + "</span>")
          }
          jQuery(".price-btn .sub_price", l).attr("data-price", e.price).html(Shopify.formatMoney(e.price, window.money_format)), roar.subPrice(t, s), roar_pseudo.initItem(t), jQuery(".form-cart.show").parent().css({
            height: "" + jQuery(".form-cart.show").outerHeight() + "px"
          }), window.show_multiple_currencies && currenciesCallbackSpecial(".item-" + s + " span.money")
        };
        new Shopify.OptionSelectors("product-select-" + c, {
          product: r,
          onVariantSelected: o
        }), 1 == r.options.length && jQuery(".product-variants .selector-wrapper:eq(0)", l).prepend("<label>" + r.options[0].name + "</label>"), u.hide();
        var a, i, n, d;
        return d = t.closest(".product_item"), i = d.find(".cart"), n = d.find(".wrap"), a = d.find(".btns"), jQuery(".product_item").not(d).each(function() {
          return jQuery(this).removeClass("border")
        }), jQuery(".cart").not(i).each(function() {
          return jQuery(this).removeClass("show")
        }), jQuery(".btns").not(a).each(function() {
          return jQuery(this).removeClass("hidden")
        }), jQuery(".wrap").each(function() {
          return jQuery(this).css({
            height: "auto"
          })
        }), i.hasClass("show") || n.css({
          height: "" + (i.outerHeight() + 2) + "px"
        }), d.toggleClass("border"), i.toggleClass("show"), a.toggleClass("hidden"), e.preventDefault()
      })
    })
  },
  handleSortby: function() {
    "undefined" != typeof window.sortby_default && window.sortby_default && (jQuery(".advanced-sortby .field").removeClass("active"), jQuery(".advanced-sortby .fields").find("[data-sort='" + window.sortby_default + "']").addClass("active"))
  },
  mapSingleFilter: function() {
    jQuery("#module-content").on("click", ".advanced-filter .field", function(e) {
      var t = jQuery(this),
          r = t.data("handle"),
          o = [];
      if (Shopify.queryParams.constraint && (o = Shopify.queryParams.constraint.split("+")), !window.enable_filter_multiple_choice && !t.hasClass("active")) {
        var a = t.parents(".advanced-filter").find(".active");
        a.length > 0 && a.each(function() {
          var e = jQuery(this).data("handle");
          if (jQuery(this).removeClass("active"), e) {
            var t = o.indexOf(e);
            t >= 0 && o.splice(t, 1)
          }
        })
      }
      if (r) {
        var i = o.indexOf(r);
        0 > i ? (o.push(r), t.addClass("active")) : (o.splice(i, 1), t.removeClass("active"))
      }
      o.length ? Shopify.queryParams.constraint = o.join("+") : delete Shopify.queryParams.constraint, roar.filterAjaxClick(), e.preventDefault()
    })
  },
  mapSingleCollection: function() {
    jQuery("#module-content").on("click", ".advanced-collection .field", function(e) {
      var t = jQuery(this);
      t.hasClass("active") || (delete Shopify.queryParams.page, delete Shopify.queryParams.constraint, delete Shopify.queryParams.q, delete Shopify.queryParams.sort_by, roar.filterAjaxClick(t.attr("href")), jQuery(".advanced-collection .field").removeClass("active"), t.addClass("active")), e.preventDefault()
    })
  },
  mapSingleSortby: function() {
    roar.handleSortby(), jQuery("#module-content").on("click", ".advanced-sortby .field", function(e) {
      var t = jQuery(this),
          r = t.data("sort");
      t.hasClass("active") || (Shopify.queryParams.sort_by = r, roar.filterAjaxClick(), jQuery(".advanced-sortby .field").removeClass("active"), t.addClass("active")), e.preventDefault()
    })
  },
  mapSinglePagination: function() {
    jQuery("#module-content").on("click", ".advanced-pagination a", function(e) {
      var t = jQuery(this);
      delete Shopify.queryParams.page, delete Shopify.queryParams.constraint, delete Shopify.queryParams.q, delete Shopify.queryParams.sort_by, roar.filterAjaxClick(t.attr("href")), e.preventDefault()
    })
  },
  mapFilters: function() {
    roar.handleGridList(), roar.handleFilters(), roar.mapSingleFilter(), roar.mapSingleCollection(), roar.mapSingleSortby(), roar.mapSinglePagination()
  },
  filterCreateUrl: function(e) {
    var t = jQuery.param(Shopify.queryParams).replace(/%2B/g, "+");
    return e ? "" != t ? e + "?" + t : e : location.pathname + "?" + t
  },
  filterAjaxClick: function(e) {
    delete Shopify.queryParams.page;
    var t = roar.filterCreateUrl(e);
    roar.filterGetContent(t)
  },
  filterGetContent: function(e) {
    jQuery.ajax({
      type: "get",
      url: e,
      beforeSend: function() {
        jQuery(".icon_spinner").show()
      },
      success: function(t) {
        var r = t.match("<title>(.*?)</title>")[1];
        jQuery("#filters").empty().html(jQuery(t).find("#filters").html()), jQuery(".filters-bar").empty().html(jQuery(t).find(".filters-bar").html()), jQuery("#sandBox").empty().html(jQuery(t).find("#sandBox").html()), jQuery(".advanced-pagination").empty().html(jQuery(t).find(".advanced-pagination").html()), jQuery("#breadcrumb").empty().html(jQuery(t).find("#breadcrumb").html()), jQuery(".infinite_scoll").length && jQuery(t).find(".infinite_scoll").length && (jQuery(".infinite_scoll").removeClass("invisible").empty().html(jQuery(t).find(".infinite_scoll").html()), pInfScrMore = !0), History.pushState({
          param: Shopify.queryParams
        }, r, e), roar.buildProductItem(), setTimeout(function() {
          jQuery("html,body").animate({
            scrollTop: jQuery("#module-content .filter_wrap").offset().top - jQuery("#phantom").outerHeight() - 61
          }, 500, "swing")
        }, 100), jQuery(".icon_spinner").hide()
      },
      error: function() {
        jQuery(".icon_spinner").hide()
      }
    })
  },
  handleFilters: function() {
    jQuery("#page").click(function(e) {
      jQuery(e.target).closest("#filters").length > 0 || (jQuery("body").hasClass("filter-opened") && jQuery("#filters").css("min-height") == "100%") && (jQuery(".filter-controller").removeClass("is_filter"), jQuery("html,body").removeClass("filter-opened"))
    }), jQuery("#filters").on("click", ".filter_close", function(e) {
      e.stopPropagation(), jQuery(".filter-controller").removeClass("is_filter"), jQuery("html,body").removeClass("filter-opened")
    }), jQuery(".filter-controller").click(function(e) {
      e.stopPropagation();
      var t = jQuery(this),
          r = jQuery("body");
      t.hasClass("is_filter") ? (r.removeClass("filter-opened"), t.removeClass("is_filter"), t.children("span").text(t.attr("data-show"))) : (r.addClass("filter-opened"), t.addClass("is_filter"), t.children("span").text(t.attr("data-hide")))
    })
  },
  getHeightOfProductCase: function() {
    var e;
    return jQuery("#sandBox").hasClass("list") ? (e = jQuery(".product_item .displayed").parent().height(), e = e < window.list_height ? window.list_height : e) : (e = jQuery(".product_item").first().height(), e = e < window.grid_height ? window.grid_height : e), e
  },
  buildProductItem: function() {
    jQuery("select.product-select").each(function(e) {
      var t = new Date,
          r = t.getTime() + e;
      jQuery(this).attr("id", "product-select-" + r).attr("data-id", r)
    })
  },
  createVariantsSwatch: function(e, t) {
    var r = new Array;
    if (window.swatch_size && r.push("Size"), window.swatch_color && (r.push("Color"), r.push("Colour")), r.length > 0) {
      var o = ".png",
          a = !1,
          n = !1,
          s = 0,
          l = window.asset_url.substring(0, window.asset_url.lastIndexOf("?"));
      for (i = 0; i < e.options.length; i++) {
        var c = "";
        if (c = "object" == typeof e.options[i] ? e.options[i].name : e.options[i], a = !1, n = !1, r.indexOf(c) > -1) {
          a = !0, s = i;
          var d = c.toLowerCase();
          if (/color|colour/i.test(d) && (n = !0), a) {
            var u = "";
            u += '<div class="swatch ' + d + ' clearfix" data-option-index="' + s + '">', u += '<div class="header"><span>' + c + "</span></div>";
            var h = new Array;
            for (j = 0; j < e.variants.length; j++) {
              var p = e.variants[j],
                  y = p.options[s],
                  m = roar.convertToSlug(y),
                  f = "swatch-" + s + "-" + m;
              h.indexOf(y) < 0 && (u += '<div data-value="' + y + '" class="swatch-element ' + (n ? "color" : "") + m + (p.available ? " available " : " soldout ") + '">', n && (u += '<div class="tooltip">' + y + "</div>"), u += '<input id="' + f + '" type="radio" name="option-' + s + '" value="' + y + '"' + (0 == j ? " checked " : "") + (p.available ? "" : " disabled") + "/>", n ? (u += '<label for="' + f + '" style="background-color:' + m + "; background-image: url(" + l + m + o + ')">', u += '<img class="crossed-out" src="' + l + 'soldout.png" />', u += "</label>") : (u += '<label for="' + f + '">' + y, u += '<img class="crossed-out" src="' + l + 'soldout.png" />', u += "</label>"), u += "</div>", h.push(y))
            }
            u += "</div>", t.find(".variants-wrapper > select").after(u), t.find(".swatch :radio").change(function() {
              var e = jQuery(this).closest(".swatch").attr("data-option-index"),
                  t = jQuery(this).val();
              jQuery(this).closest("form").find(".single-option-selector").eq(e).val(t).trigger("change")
            })
          }
        }
      }
    }
  },
  convertToSlug: function(e) {
    return e.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
  },
  isMobile: function() {
    var e = navigator.userAgent.toLowerCase();
    return Modernizr.touch || e.match(/(iphone|ipod|ipad)/) || e.match(/(android)/) || e.match(/(iemobile)/) || e.match(/iphone/i) || e.match(/ipad/i) || e.match(/ipod/i) || e.match(/blackberry/i) || e.match(/bada/i) || e.match(/windows phone/i) || e.match(/webOS/i) ? !0 : !1
  },
  getWidthBrowser: function() {
    var e;
    return "number" == typeof window.innerWidth ? e = window.innerWidth : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? e = document.documentElement.clientWidth : document.body && (document.body.clientWidth || document.body.clientHeight) && (e = document.body.clientWidth), e
  },
  getHeightBrowser: function() {
    var e;
    return "number" == typeof window.innerHeight ? e = window.innerHeight : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? e = document.documentElement.clientHeight : document.body && (document.body.clientWidth || document.body.clientHeight) && (e = document.body.clientHeight), e
  },
  handleEffects: function(){
    var r = $(".animated:not(.shown)");

    if (r.exists()) {
      setTimeout(function () {
        roar.loadingEffects();
      }, 100);

      $(window).on("scroll", function() {
        roar.loadingEffects();
      });
    };
  },
  loadingEffects: function(){
    var r = $(".animated:not(.shown)");

    if (!r.exists()) return;
    roar.precessEffects(r);
  },
  precessEffects: function($atoms){
    var k = 0;

    $atoms.each(function () {
      var $this = $(this);
      if($("html.touch").length > 0){
        if (!$this.hasClass("shown") && !$this.hasClass("animation-triggered")) {
          $this.addClass("animation-triggered");
          setTimeout(function () {
            if ($this.hasClass("animation-triggered")) {
              $this.removeClass("animation-triggered").addClass("shown");
            };
          }, 200);
        };
      }else{
        if (!$this.hasClass("shown") && !$this.hasClass("animation-triggered") && $this.inView()) {
          $this.addClass("animation-triggered");
          k++;
          setTimeout(function () {
            if ($this.hasClass("animation-triggered")) {
              $this.removeClass("animation-triggered").addClass("shown");
            };
          }, 100 * k);
        };
      }
    });
  },
  handleFocus: function() {
    jQuery(".form-focus input").focus(function() {
      jQuery(this).parents(".form-focus").addClass("focus")
    }).blur(function() {
      jQuery(this).parents(".form-focus").removeClass("focus")
    })
  },
  handleBoxLogin: function() {
    jQuery("#loginBox input").focus(function() {
      jQuery(this).parents("#loginBox").addClass("focus")
    }).blur(function() {
      jQuery(this).parents("#loginBox").removeClass("focus")
    })
  },
  handleScrollToTop: function() {
    function e(e) {
      var t = jQuery("#scroll-top");
      t.removeClass("off on"), t.addClass("on" == e ? "on" : "off")
    }
    jQuery(window).scroll(function() {
      var t = jQuery(this).scrollTop(),
          r = jQuery(this).height();
      if (t > 0) var o = t + r / 2;
      else var o = 1;
      e(1e3 > o ? "off" : "on")
    }), jQuery("#scroll-top").click(function(e) {
      e.preventDefault(), jQuery("html,body").animate({
        scrollTop: 0
      }, 800, "swing")
    })
  },
  handleTooltip: function() {
    jQuery(".btooltip").length && jQuery(".btooltip").tooltip()
  },
  handleTabs: function() {
    jQuery("body").on("click", ".nav-tabs a", function(e) {
      e.preventDefault(), jQuery(this).tab("show")
    })
  },
  getRandomInt: function(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e
  },
  mockupCaptionVideo: function() {
    if (jQuery("#home-video").length) {
      if (roar.getWidthBrowser() < 1200) {
        var e = window.general_font_size,
            t = window.video_heading_size,
            r = window.video_caption_size,
            o = roar.getWidthBrowser(),
            a = t * o / 1200,
            i = r * o / 1200;
        e > a && (a = e), e > i && (i = e), jQuery("#home-video .video_caption").css({
          "font-size": i
        }), jQuery("#home-video .video_heading").css({
          "font-size": a
        })
      } else {
        var t = window.video_heading_size,
            r = window.video_caption_size;
        jQuery("#home-video .video_caption").css({
          "font-size": r
        }), jQuery("#home-video .video_heading").css({
          "font-size": t
        })
      }
      var n = jQuery("#home-video").height() / 2,
          s = jQuery("#home-video .video_width").height(),
          l = n - s / 2;
      jQuery("#home-video .video_width").css({
        top: l,
        opacity: 1
      })
    }
  },
  mockupCaptionSlider: function() {
    if (window.show_slideshow && jQuery("#home-slider").length) {
      var e = roar.getWidthBrowser(),
          t = 30;
      jQuery("#home-slider .caption-content").each(1200 > e ? function() {
        var r = jQuery(this).data("min"),
            o = jQuery(this).data("max"),
            a = o * e / 1200,
            i = t * e / 1200;
        r > a && (a = r), jQuery(this).css({
          "font-size": a,
          "padding-bottom": i
        })
      } : function() {
        var e = jQuery(this).data("max");
        jQuery(this).css({
          "font-size": e,
          "padding-bottom": t
        })
      });
      var r = jQuery("#home-slider").height() / 2;
      jQuery("#home-slider .slide-caption").each(function() {
        var t = jQuery(this).data("position");
        if (1 == t) {
          var o = jQuery(this).data("left"),
              a = jQuery(this).data("top"),
              i = jQuery(this).data("right"),
              n = jQuery(this).data("bottom"),
              s = jQuery(this).data("width"),
              l = jQuery(this).data("align");
          "undefined" == typeof a && (a = "auto"), "undefined" == typeof n && (n = "auto"), "undefined" == typeof o && (o = "auto"), "undefined" == typeof i && (i = "auto"), 1200 > e && ("auto" != o && (o = o * e / 1200), "auto" != a && (a = a * e / 1200), "auto" != i && (i = i * e / 1200), "auto" != n && (n = n * e / 1200), s = s * e / 1200), jQuery(this).css({
            top: a,
            left: o,
            bottom: n,
            right: i,
            "max-width": s,
            "text-align": l,
            display: "inline-block",
            opacity: 1,
            width: "auto",
            "line-height": 1
          })
        } else {
          var c = jQuery(this).height(),
              d = r - c / 2;
          jQuery(this).css({
            top: d,
            opacity: 1
          })
        }
      })
    }
  },
  handleSlideshow: function() {
    window.show_slideshow && jQuery("#home-slider").length && (jQuery("#home-slider").flexslider({
      animation: "fade",
      prevText: "",
      nextText: "",
      slideshowSpeed: window.slideshow_interval,
      slideshow: window.slideshow_auto,
      controlNav: !1,
      start: function() {
        jQuery("body").removeClass("loading")
      }
    }), imagesLoaded("#home-slider", function() {
      roar.mockupCaptionSlider()
    }))
  },
  handleMap: function() {
    jQuery("#contact_map").length && jQuery().gMap && jQuery("#contact_map").gMap({
      zoom: window.contact_zoom,
      scrollwheel: window.contact_scroll,
      maptype: window.contact_type,
      markers: [{
        address: window.contact_address,
        html: "_address",
        icon: {
          image: window.contact_icon,
          iconsize: [188, 68],
          iconanchor: [0, 68]
        }
      }]
    })
  },
  handleGridList: function() {
    jQuery("#catSelectGrid").on(roar.clickEv, function() {
      jQuery("body").removeClass("cat-list"), jQuery("#catSelectList").removeClass("active"), jQuery(this).addClass("active")
    }), jQuery("#catSelectList").on(roar.clickEv, function() {
      jQuery("body").addClass("cat-list"), jQuery("#catSelectGrid").removeClass("active"), jQuery(this).addClass("active")
    })
  },
  handleSticky: function() {
    if (!jQuery("body").hasClass("templateProduct") && jQuery("#header").hasClass("sticky")) {
      var e = jQuery("#phantom").outerHeight(),
          t = jQuery(window).scrollTop();
      if (t > e + 20 ) {
        jQuery("#header").addClass("on")
      } else jQuery("#header").removeClass("on")
    }
  },
  handleCartSidebar: function() {
    jQuery(".cart-controller").click(function(e) {
      e.stopPropagation(), jQuery(".cart-sidebar").toggleClass("opened"), jQuery("html,body").toggleClass("cart-opened")
    }), jQuery("#page").click(function() {
      jQuery(".cart-sidebar").removeClass("opened"), jQuery("html,body").removeClass("cart-opened")
    })
  },
  handleMenuMobile: function() {
    jQuery("#page").click(function() {
      jQuery(".menu-mobile").removeClass("opened"), jQuery("html,body").removeClass("menu-opened")
    }), jQuery("[data-toggle=offcanvas]").click(function(e) {
      e.stopPropagation(), jQuery(".menu-mobile").toggleClass("opened"), jQuery("html,body").toggleClass("menu-opened")
    }), jQuery(".is-mobile .menu-mobile .mobile_nav .expand").click(function() {
      var e = jQuery(this).parents(".parent_submenu").first();
      e.hasClass("is_open") ? e.removeClass("is_open") : e.addClass("is_open"), e.find(".dropdown_menu").first().slideToggle()
    })
  },
  handleSearch: function() {
    jQuery(".site-search-toggle").click(function() {
      var e = jQuery("#header");
      e.hasClass("is_search") ? e.removeClass("is_search") : (e.addClass("is_search"), jQuery("#input-ajax").focus())
    }), jQuery(".site-search-trigger").click(function() {
      jQuery(".search-menu-icon .site-search-toggle").trigger("click")
    })
  },
  handleSliding: function() {
    jQuery(".sb-toggle-wrapper").click(function() {
      var e = jQuery("#slidingbar-area");
      e.hasClass("is_sliding") ? e.removeClass("is_sliding") : e.addClass("is_sliding"), jQuery("#slidingbar").slideToggle()
    })
  },
  callbackSearchMobile: function() {
    var e = jQuery(".is-mobile .is-mobile-search .fa-search"),
        t = jQuery(".is-mobile .is-mobile-search .fa-times"),
        r = jQuery(".is-mobile .is-mobile-search .input-search"),
        o = jQuery(".is-mobile .is-mobile-search");
    e.click(function() {
      o.addClass("on"), r.focus()
    }), r.click(function() {
      return !1
    }), t.click(function() {
      o.removeClass("on")
    })
  },
  handleCountdown: function() {
    jQuery(".count_holder_big").each(function() {
      var e = jQuery(this).find(".count_holder_small");
      jQuery(this).hover(function() {
        e.addClass("hover").appendTo("body")
      }, function() {
        e.removeClass("hover").appendTo(this)
      }).mousemove(function(t) {
        var r = t.pageX + 60,
            o = t.pageY - 50,
            a = e.width(),
            i = e.height(),
            n = jQuery(window).width() - (r + a);
        jQuery(window).height() - (o + i), 50 > n && (r = t.pageX - a - 60), e.css({
          left: r,
          top: o
        })
      })
    })
  },
  handleSmoothScroll: function() {
    jQuery("body").on("click", ".smoothscroll", function(e) {
      e.preventDefault();
      var t = jQuery(this).attr("href");
      jQuery(t).trigger("click"), setTimeout(function() {
        jQuery("html,body").animate({
          scrollTop: jQuery("#product-reviews").offset().top - 60
        }, 800, "swing")
      }, 300)
    })
  },
  notifyIE7Users: function() {
    if (jQuery("html").hasClass("ie7") || jQuery("html").hasClass("ie7"))
      if (window.notify_ie7_page) jQuery.ajax({
        type: "GET",
        url: "pages/" + window.notify_ie7_page,
        beforeSend: function() {},
        success: function(e) {
          var t = jQuery(e).find("#col-main > .page > .page_content");
          jQuery("body").html(t.html()).show()
        },
        dataType: "html"
      });
      else {
        var e = "<h1>Unsupported Browser</h1>";
        jQuery("body").html(e).show()
      }
  },
  detectOptions: function() {
    roar.getWidthBrowser() < 992 ? jQuery("#product-header-first").is(":empty") && jQuery("#product-header").detach().appendTo("#product-header-first") : jQuery("#product-header-first").is(":empty") || jQuery("#product-header").detach().appendTo("#product-header-last")
  },
  callbackImagesLoaded: function() {
    jQuery(".featured-collections-child").length && jQuery(".featured-collections-child").owlCarousel({
      navigation: !0,
      pagination: !1,
      mouseDrag: !1,
      items: 2,
      itemsDesktop: [1199, 2],
      itemsDesktopSmall: [991, 3],
      itemsTablet: [767, 2],
      itemsTabletSmall: [480, 2],
      itemsMobile: !1,
      scrollPerPage: !0,
      navigationText: ['<span class="btn"><i class="icomoon-arrow-left"></i></span>', '<span class="btn"><i class="icomoon-arrow-right"></i></span>']
    }), jQuery("#special-offers").length && jQuery("#special-offers").owlCarousel({
      navigation: !0,
      pagination: !1,
      mouseDrag: !1,
      items: 3,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [991, 3],
      itemsTablet: [767, 2],
      itemsTabletSmall: [480, 1],
      itemsMobile: !1,
      scrollPerPage: !1,
      navigationText: ['<i class="icomoon-arrow-left"></i>', '<i class="icomoon-arrow-right"></i>']
    }), jQuery("#sidebar .featured-products").length && jQuery("#sidebar .featured-products").owlCarousel({
      navigation: !0,
      pagination: !1,
      mouseDrag: !1,
      items: 1,
      itemsDesktop: [1199, 1],
      itemsDesktopSmall: [991, 1],
      itemsTablet: [767, 1],
      itemsTabletSmall: [480, 1],
      itemsMobile: !1,
      scrollPerPage: !1,
      navigationText: ['<i class="icomoon-arrow-left"></i>', '<i class="icomoon-arrow-right"></i>']
    })
  }
};