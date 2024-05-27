$(document).ready(function () {
    // Manage amenities selection
    const objAmenities = {};
    $('input[type="checkbox"]').change(function () {
        if ($(this).prop('checked')) {
            objAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete objAmenities[$(this).attr('data-id')];
        }
        let text = '';
        for (const amenity in objAmenities) {
            text += objAmenities[amenity] + ', ';
        }
        text = text.slice(0, -2); // remove last comma and space
        $('div.amenities h4').text(text);
    });

    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    // Load places dynamically
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5001/api/v1/places_search/',
        data: '{}',
        contentType: 'application/json',
        success: function (data) {
            for (const e of data) {
                $('section.places').append(`
                <article>
                    <div class="title_box">
                        <h2>${e.name}</h2>
                        <div class="price_by_night">$${e.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${e.max_guest} Guest${e.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${e.number_rooms} Bedroom${e.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${e.number_bathrooms} Bathroom${e.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">
                        ${e.description}
                    </div>
                </article>`);
            }
        },
        dataType: 'json'
    });
});
