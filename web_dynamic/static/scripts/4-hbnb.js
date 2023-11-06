/* script that checks if a checkbox is checked */
$(document).ready(function () {
  const amenitiesId = {};

  // Function to make a POST request to places_search
  function searchPlaces () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenitiesId) }),
      success: function (data) {
        $('section.places').empty();
        for (const place of data) {
          const article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div> 
            <div class="description">
              ${place.description}
            </div>
          </article>
          `;
          $('section.places').append(article);
        }
      }
    });
  }

  // Checkboxes click event handler
  $('INPUT[type="checkbox"]').click(function () {
    if ($(this).prop('checked')) {
      amenitiesId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenitiesId[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenitiesId).join(', '));
  });

  // Button click event handler
  $('button').click(function () {
    searchPlaces();
  });

  searchPlaces();

  // API status check
  $.get('http://0.0.0.0:5001/api/v1/status/', data => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
