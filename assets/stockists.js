$('.stockistType').on('click', function(event) {
  $('.vendors').addClass('hidden')
  target = $(this).data('target')
  $(target).removeClass('hidden')
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
  $('#inStoreVendors').removeClass('hidden');
  $('#onlineVendors').addClass('hidden');
  $('#mensVendors').addClass('hidden');
} else if (window.location.href.indexOf('#mens') > -1) {
  $('#mensVendors').removeClass('hidden');
  $('#inStoreVendors').addClass('hidden');
  $('#onlineVendors').addClass('hidden');
} else {
  $('#onlineVendors').removeClass('hidden');
  $('#mensVendors').addClass('hidden');
  $('#inStoreVendors').addClass('hidden');
}

$('.regionToggle').click(function(){
  $('.in-store-vendors').addClass('hidden')
})

function renderOnlineVendors(){
  $.each($($('#instore-vendor-data table')[0]).find('tbody tr'), function(k,v){
    link = $($(v).find('td')[0]).html()
    img = $($($(v).find('td')[1]).html()).addClass('vendor')
    $vendor = $('<div class="vendor-container"></div>')
    $linkContainer = $('<a href="' + link + '" target="_blank">')
    $linkContainer.append($('<div class="overlay"></div>'))
    $linkContainer.append(img)
    $vendor.append($linkContainer)
    $('#onlineVendors').append($vendor)
  })
  $('.icon_spinner2').remove()
}

function renderMensVendors(){
  $.each($($('#instore-vendor-data table')[1]).find('tbody tr'), function(k,v){
    link = $($(v).find('td')[0]).html()
    img = $($($(v).find('td')[1]).html()).addClass('vendor')
    $vendor = $('<div class="vendor-container"></div>')
    $linkContainer = $('<a href="' + link + '" target="_blank">')
    $linkContainer.append($('<div class="overlay"></div>'))
    $linkContainer.append(img)
    $vendor.append($linkContainer)
    $('#mensVendors').append($vendor)
  })
  $('.icon_spinner2').remove()
}

function jsonifyTable(){
  var countryAry = $($('#instore-vendor-data table')[2]).find('tbody tr').get().map(function(row) {
    countryId = $($(row).find('td')[0]).html().toLowerCase().replaceAll(' ', '-')
    return countryId
  })
  jsonData = {}
  var countryData =  $(countryAry.getUnique()).each(function(index, countryId){
    jsonData[countryId] = []
  })
  $($('#instore-vendor-data table')[2]).find('tbody tr').each(function(index,row) {
    rowData = {}
    rowData['country'] = $($(row).find('td')[0]).html()
    countryId  = $($(row).find('td')[0]).html().toLowerCase().replaceAll(' ', '-')
    rowData['line1'] = $($(row).find('td')[1]).html()
    rowData['line2'] = $($(row).find('td')[2]).html()
    rowData['line3'] = $($(row).find('td')[3]).html()
    rowData['line4'] = $($(row).find('td')[4]).html()
    rowData['line5'] = $($(row).find('td')[5]).html()
    rowData['line6'] = $($(row).find('td')[6]).html()
    jsonData[countryId].push(rowData)
  });
  return jsonData
}

function renderVendors(){
  data = jsonifyTable()
  $.each(data,function(country,countryAry) {
    $countryDiv = $("<div id='" + country + "' class='hidden in-store in-store-vendors'></div>")
    $countryDiv.append("<h2>" + countryAry[0]['country'] + "</h2>")
    $storesDiv = $("<div class='stores'></div>")
    $.each(countryAry,function(index,vendorData){
      $vendorDiv = $("<div class='store'></div>")
      $vendorDiv.append("<h2>"+ vendorData['line1'] +"</h2>")
      $vendorDiv.append("<h3><a href='" + vendorData['line6']+ "' target='_blank'>"+ vendorData['line2'] +"</a></h3>")
      $vendorDiv.append("<p>"+ vendorData['line3'] +"</p>")
      $vendorDiv.append("<p>"+ vendorData['line4'] +"</p>")
      $vendorDiv.append("<p>"+ vendorData['line5'] +"</p>")
      $storesDiv.append($vendorDiv)
    })
    $countryDiv.append($storesDiv)
    $('#countryData').append($countryDiv)
  })
}


Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

$(document).ready(function(){
  $(".icon_spinner2").show()
  renderOnlineVendors()
  renderVendors();
  renderMensVendors();
})