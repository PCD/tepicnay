(function ($) {
  Drupal.behaviors.registroMedicoMaps = {
    attach: function(context, settings){
      var bsMap, bsMarker, bsInfoWindow, bsMarkerUsed;
      bsMarkerUsed = 0;
      /*$(document).ready(function(event){
        createMap();
        $('#edit-estado').change(function(){
          $('#edit-estado-tid').val($(this).val());
        });
        $('#edit-calle, #edit-colonia, #edit-ciudad, #edit-codigo-postal, #edit-estado, #edit-consultorio' + 
        ', #edit-telefono, #edit-correo, #edit-celular').change(function(){
          updateMap();
        });
      }); // Ends Document Ready*/
      
      function validateAddress() {
        if ( $.trim($('#edit-calle').val()) == '' ) {
          alert('Escribe la Calle y Número de tu Consultorio o lugar donde ofreces tus servicios.');
          $('#edit-calle').focus();
          return false;
        }
        
        if ( $.trim($('#edit-ciudad').val()) == '' ) {
          alert('Escribe la Ciudad donde se encuentra tu Consultorio o lugar donde ofreces tus servicios.');
          $('#edit-ciudad').focus();
          return false;
        }
        
        if ( $('#edit-estado').val() < 1 ) {
          alert('Selecciona el Estado donde se encuentra tu Consultorio o lugar donde ofreces tus servicios.');
          $('#edit-estado').focus();
          return false;
        }
        
        return true;
      }
      
      function showMap() {
        codeAddress();
        $('#edit-mapa').slideDown('fast');
      }
      
      function createMap() {
        // Maps
        var myZoom = 8;
        var myMarkerIsDraggable = true;
        var myCoordsLenght = 6;
        
        
        var defaultLat = 19.422606;
        var defaultLng = -99.133632;
        //$('#edit-latitude').val(defaultLat);
        //$('#edit-longitude').val(defaultLng);
        
        // creates the map
        // zooms
        // centers the map
        // sets the map’s type
        bsMap = new google.maps.Map(document.getElementById('edit-map-js'), {
          zoom: myZoom,
          center: new google.maps.LatLng(defaultLat, defaultLng),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        bsInfoWindow = new google.maps.InfoWindow({
          content: "<div id='infoWindow'>\n<div><strong>Mi Consultorio</strong></div></div>\n"
        });
        
        // creates a draggable marker to the given coords
        bsMarker = new google.maps.Marker({
          position: new google.maps.LatLng(defaultLat, defaultLng),
          draggable: myMarkerIsDraggable
        });
        
        google.maps.event.addListener(bsMarker, 'click', function(){
          bsInfoWindow.open(bsMap, bsMarker);
        });
        
        // adds a listener to the marker
        // gets the coords when drag event ends
        // then updates the input with the new coords
        google.maps.event.addListener(bsMarker, 'dragend', function(evt){
          bsMarkerUsed = 1;
          document.getElementById('edit-latitude').value = evt.latLng.lat().toFixed(myCoordsLenght);
          document.getElementById('edit-longitude').value = evt.latLng.lng().toFixed(myCoordsLenght);
        });
        
        // centers the map on markers coords
        bsMap.setCenter(bsMarker.position);

        // adds the marker on the map
        bsMarker.setMap(bsMap);
      }
      
      function updateMap() {
        geocoder = new google.maps.Geocoder();
        // Get Address
        var addressArray = [];
        var myZoom = 8;
        var contentString = "<div id='infoWindow'>\n";
        // Consultorio
        var consultorioTitle = '';
        if ( $.trim($('#edit-consultorio').val()) != '' ) {
          contentString += "<div><strong>" + $('#edit-consultorio').val() + "</strong></div>\n";
          consultorioTitle = $('#edit-consultorio').val();
        } else {
          contentString += "<div><strong>Mi Consultorio</strong></div>\n";
          consultorioTitle = 'Mi Consultorio';
        }
        contentString += "<p>\n";
        contentArray = [];
        var calle_colonia = '';
        // Calle y Numero
        if ( $.trim($('#edit-calle').val()) != '' ) {
          addressArray.push($.trim($('#edit-calle').val()));
          myZoom += 2;
          calle_colonia += $('#edit-calle').val();
        }
        // Colonia
        if ( $.trim($('#edit-colonia').val()) != '' ) {
          addressArray.push($.trim($('#edit-colonia').val()));
          myZoom += 2;
          calle_colonia += ' ' + $('#edit-colonia').val();
          calle_colonia = $.trim(calle_colonia);
        }
        if ( $.trim(calle_colonia) != '' ) {
          contentArray.push($.trim(calle_colonia));
        }
        // Ciudad
        var ciudad_estado = '';
        if ( $.trim($('#edit-ciudad').val()) != '' ) {
          addressArray.push($.trim($('#edit-ciudad').val()));
          myZoom += 1;
          ciudad_estado += $.trim($('#edit-ciudad').val());
        }
        // Estado
        if ( $('#edit-estado').val() > 0 ) {
          estado_text = $('#edit-estado option:selected').text();
          ciudad_estado += ' ' + estado_text;
          ciudad_estado = $.trim(ciudad_estado);
          myZoom += 1;
          // Codigo Postal
          if ( $.trim($('#edit-codigo-postal').val()) != '' ) {
            estado_text += ' ' + $.trim($('#edit-codigo-postal').val());
            ciudad_estado += ', ' + $.trim($('#edit-codigo-postal').val());
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
        if ( $.trim($('#edit-telefono').val()) ) {
          contentString += "<div><strong>Teléfono:</strong> " + $('#edit-telefono').val() + "</div>\n";
        }
        // CellPhone
        if ( $.trim($('#edit-celular').val()) ) {
          contentString += "<div><strong>Celular:</strong> " + $('#edit-celular').val() + "</div>\n";
        }
        // Mail
        if ( $.trim($('#edit-correo').val()) ) {
          contentString += "<div><strong>Correo:</strong> " + $('#edit-correo').val() + "</div>\n";
        }
        contentString += "</div>\n";
        bsInfoWindow.setContent(contentString);
        address = addressArray.join(', ');

        bsMarker.setTitle(consultorioTitle);
        if ( bsMarkerUsed == 0 ) {
          geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
              bsMap.setCenter(results[0].geometry.location);
              bsMarker.setPosition(results[0].geometry.location);
              bsMap.setZoom(myZoom);
              
              // Update values
              $('#edit-latitude').val(results[0].geometry.location.jb);
              $('#edit-longitude').val(results[0].geometry.location.kb);
            } else {
              //alert("Geocode was not successful for the following reason: " + status);
              return false;
            }
          });
        } else {
          bsMap.setZoom(myZoom);
        }
      }

    }
  } 
})(jQuery);