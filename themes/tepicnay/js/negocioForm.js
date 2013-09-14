(function ($) {
  Drupal.behaviors.negocioForm = {
    attach: function(context, settings){
      prepareAddress();
      addEmptyMaps();
      createMap();
    }
  }
  
  // Some variables
  var bsMap, bsMarker, bsInfoWindow, bsMarkerUsed, bsContentString;
  bsMarkerUsed = 0;
  
  /**
   * Add Google Map to Container
   */
  function createMap() {
    //getAddress();
    // Maps
    var myMarkerIsDraggable = true;
    var myCoordsLenght = 10;
    var bsZoom = 14;
    
    // Default Text
    bsContentString = "<strong>Mi Negocio</strong>";

    var defaultLat = $('#gmap-data-latitude').val();
    var defaultLng = $('#gmap-data-longitude').val();
    
    bsMap = new google.maps.Map(document.getElementById('gMapContainer'), {
      zoom: bsZoom,
      center: new google.maps.LatLng(defaultLat, defaultLng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    bsInfoWindow = new google.maps.InfoWindow({
      content: bsContentString
    });
    
    bsMarker = new google.maps.Marker({
      position: new google.maps.LatLng(defaultLat, defaultLng),
      draggable: myMarkerIsDraggable
    });
    
    google.maps.event.addListener(bsMarker, 'click', function(){
      bsInfoWindow.open(bsMap, bsMarker);
    });
    
    google.maps.event.addListener(bsMarker, 'dragend', function(evt){
      bsMarkerUsed = 1;
      document.getElementById('gmap-data-latitude').value = evt.latLng.lat().toFixed(myCoordsLenght);
      document.getElementById('gmap-data-longitude').value = evt.latLng.lng().toFixed(myCoordsLenght);
    });
    
    bsMap.setCenter(bsMarker.position);
    
    bsMarker.setMap(bsMap);
  }
  
  /**
   * Get the address out of the Address fields.
   */
  function getAddress(obj) {
    // Get Address
    var addressArray = [];
    var myZoom = 8;
    var contentString = "<div id='infoWindow'>\n";
    // Consultorio
    var consultorioTitle = '';
    name_field = $(obj).find('input.name-block');
    if ( $.trim($(name_field).val()) != '' ) {
      contentString += "<div><strong>" + $(name_field).val() + "</strong></div>\n";
      consultorioTitle = $(name_field).val();
    } else {
      contentString += "<div><strong>Mi Negocio</strong></div>\n";
      consultorioTitle = 'Mi Negocio';
    }
    contentString += "<p>\n";
    contentArray = [];
    var calle_colonia = '';
    // Calle y Numero
    calle_field = $(obj).find('input.thoroughfare');
    if ( $.trim($(calle_field).val()) != '' ) {
      addressArray.push($.trim($(calle_field).val()));
      myZoom += 2;
      calle_colonia += $(calle_field).val();
    }
    // Colonia
    colonia_field = $(obj).find('input.premise');
    if ( $.trim($(colonia_field).val()) != '' ) {
      addressArray.push($.trim($(colonia_field).val()));
      myZoom += 2;
      calle_colonia += ' ' + $(colonia_field).val();
      calle_colonia = $.trim(calle_colonia);
    }
    if ( $.trim(calle_colonia) != '' ) {
      contentArray.push($.trim(calle_colonia));
    }
    // Ciudad
    var ciudad_estado = '';
    ciudad_field = $(obj).find('input.locality');
    if ( $.trim($(ciudad_field).val()) != '' ) {
      addressArray.push($.trim($(ciudad_field).val()));
      myZoom += 1;
      ciudad_estado += $.trim($(ciudad_field).val());
    }
    // Estado
    estado_field = $(obj).find('input.state');
    if ( $.trim($(estado_field).val()) != '' ) {
      estado_text = $(estado_field).val();
      ciudad_estado += ' ' + estado_text;
      ciudad_estado = $.trim(ciudad_estado);
      myZoom += 1;
      // Codigo Postal
      codigo_field = $(obj).find('input.postal-code');
      if ( $.trim($(codigo_field).val()) != '' ) {
        estado_text += ' ' + $.trim($(codigo_field).val());
        ciudad_estado += ', ' + $.trim($(codigo_field).val());
        myZoom += 2;
      }
      addressArray.push(estado_text);
    }
    if ( $.trim(ciudad_estado) != '' ) {
      contentArray.push(ciudad_estado);
    }
    contentString += contentArray.join("<br/>\n");
    contentString += "</p>\n";
    // Phone
    /*if ( $.trim($('#edit-telefono').val()) ) {
      contentString += "<div><strong>Teléfono:</strong> " + $('#edit-telefono').val() + "</div>\n";
    }*/
    // CellPhone
    /*if ( $.trim($('#edit-celular').val()) ) {
      contentString += "<div><strong>Celular:</strong> " + $('#edit-celular').val() + "</div>\n";
    }*/
    // Mail
    /*if ( $.trim($('#edit-correo').val()) ) {
      contentString += "<div><strong>Correo:</strong> " + $('#edit-correo').val() + "</div>\n";
    }*/
    contentString += "</div>\n";
    bsZoom = myZoom;
    bsContentString = contentString;
    bsAddress = addressArray.join(', ');
    bsConsultorioTitle = consultorioTitle;
  }
  
  function updateMap(obj) {
    getAddress(obj);
    bsInfoWindow.setContent(bsContentString);
    bsMarker.setTitle(bsConsultorioTitle);
    geocoder = new google.maps.Geocoder();
    if ( bsMarkerUsed == 0 ) {
      geocoder.geocode( { 'address': bsAddress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
          bsMap.setCenter(results[0].geometry.location);
          bsMarker.setPosition(results[0].geometry.location);
          bsMap.setZoom(bsZoom);
          
          // Update values
          $('#gmap-data-latitude').val(results[0].geometry.location.jb);
          $('#gmap-data-longitude').val(results[0].geometry.location.kb);
        } else {
          //alert("Geocode was not successful for the following reason: " + status);
          return false;
        }
      });
    } else {
      bsMap.setCenter(new google.maps.LatLng($('#gmap-data-latitude').val(), $('#gmap-data-longitude').val()));
      bsMarker.setPosition(new google.maps.LatLng($('#gmap-data-latitude').val(), $('#gmap-data-longitude').val()));
      bsMap.setZoom(bsZoom);
    }
  }
  
  /**
   * Add Empty Map.
   */
  function addEmptyMaps() {
    // Add Maps Container
    $('#field-direccion-add-more-wrapper').append('<div id="gMapContainer"></div>');
    mapDataHtml = '<div id="gMapData">';
    mapDataHtml += '<input type="text" id="gmap-data-latitude" value="21.5041651" /> ';
    mapDataHtml += '<input type="text" id="gmap-data-longitude" value="-104.8945887" />';
    mapDataHtml += '</div>';
    mapDataHtml += '</div>';
    $('#field-direccion-add-more-wrapper').append(mapDataHtml);
    
    // Add Map Opener Links
    $('#field-direccion-values tr.draggable').each(function(index){
      $(this).find('.fieldset-wrapper').append(addEmptyMapItem(index));
    });
    
    // Add Click Event Definir Mapa
    $('#field-direccion-values tr.draggable a.openMapa').click(function(event){
      index = $(this).attr('data-index');
      obj = $(this).parent().parent().parent().parent().parent().parent().parent();
      if ( validateAddress(obj) == true ) {
        $.colorbox({
          inline: true, 
          href: '#gMapContainer', 
          innerWidth: '500px', 
          innerHeight: '300px', 
          opacity: '0.3', 
          onComplete: function() {
            google.maps.event.trigger(bsMap, 'resize');
            bsMarkerUsed = 0;
            updateMap(obj);
          }, 
          onCleanup: function() {
            updateGeoPoints(obj, index);
          }
        });
      }
      event.preventDefault();
    });
  }
  
  /**
   * Validates an address fields.
   */
  function validateAddress(obj) {
    calle_field = $(obj).find('input.thoroughfare');
    if ( $.trim($(calle_field).val()) == '' ) {
      alert('Escribe la Calle y Número del Negocio.');
      $(calle_field).focus();
      return false;
    }
    
    city_field = $(obj).find('input.locality');
    if ( $.trim($(city_field).val()) == '' ) {
      alert('Escribe la Ciudad donde se encuentra el Negocio.');
      $(city_field).focus();
      return false;
    }
    
    estado_field = $(obj).find('input.state');
    if ( $.trim($(estado_field).val()) == '' ) {
      alert('Escribe el Estado donde se encuentra tu Negocio.');
      $(estado_field).focus();
      return false;
    }
    
    return true;
  }

  /**
   * Update GeoPoints on fields.
   */
  function updateGeoPoints(obj, index) {
    // Grab Lat & Lon
    lat = $('#gmap-data-latitude').val();
    lon = $('#gmap-data-longitude').val();
    
    // Who to affect.
    geofields = $('#field-geo-location-values tr.draggable:eq(' + index + ')');
    
    // Paste stuff
    $(geofields).find('textarea.geofield_wkt').val('POINT (' + lon + ' ' + lat + ')');
    $(geofields).find('input.geofield_geo_type').val('point');
    $(geofields).find('input.geofield_lat').val(lat);
    $(geofields).find('input.geofield_lon').val(lon);
    $(geofields).find('input.geofield_left').val(lon);
    $(geofields).find('input.geofield_right').val(lon);
    $(geofields).find('input.geofield_bottom').val(lat);
    $(geofields).find('input.geofield_top').val(lat);
  }
  /**
   * Prepare Address Fields
   */
  function prepareAddress() {
    // Hide non used Address.
    checkAddressEmpty();
    
    // Add Add more button.
    $('#field-direccion-add-more-wrapper').append('<a href="#" id="addAddressBtn" class="tepic-button"><span><span>Agregar</span></span></a>');
    
    // Click
    $('#addAddressBtn').click(function(event){
      count = $('#field-direccion-values tr.hidden').length;
      $('#field-direccion-values tr.hidden:first').hide().removeClass('hidden').fadeIn('fast');
      if ( count == 1 ) {
        $(this).hide();
      }
      event.preventDefault();
    });
  }
  
  /**
   * Add Empty Map Item
   */
  function addEmptyMapItem(index) {
    html = '<div class="map-control">';
    html += '<div class="map-links">';
    html += '<a href="#" data-index="' + index + '" class="tepic-button small openMapa"><span><span>Definir Mapa</span></span></a>';
    html += '</div>';
    html += '</div>';
    return html;
  }
  
  /**
   * Check all the address in a negocio form and mark them as empty for further hiding.
   */
  function checkAddressEmpty() {
    // Mark as Empty
    $('#field-direccion-values tr.draggable').each(function(){
      // Check if empty
      if ( isAddressEmpty(this) ) {
        $(this).addClass('empty hidden');
      }
    });
    
    // Hide empty ones after first.
    count = $('#field-direccion-values tr.empty').length;
    if ( count == 10 ) {
      $('#field-direccion-values tr.empty:first').show().removeClass('hidden');
    }
  }
  
  /**
   * Check if an address row is empty.
   * @param OBJECT row The address row.
   * @return BOOL TRUE or FALSE.
   */
  function isAddressEmpty(row) {
    // Full name
    value = $.trim($(row).find('input.name-block').val());
    if ( value != '' ) {
      return false;
    }
    // Address 1
    value = $.trim($(row).find('input.thoroughfare').val());
    if ( value != '' ) {
      return false;
    }
    // Address 2
    value = $.trim($(row).find('input.premise').val());
    if ( value != '' ) {
      return false;
    }
    // Postal Code
    value = $.trim($(row).find('input.postal-code').val());
    if ( value != '' ) {
      return false;
    }
    // Locality
    value = $.trim($(row).find('input.locality').val());
    if ( value != '' ) {
      return false;
    }
    // State
    value = $.trim($(row).find('input.state').val());
    if ( value != '' ) {
      return false;
    }
    return true;
  }
})(jQuery);