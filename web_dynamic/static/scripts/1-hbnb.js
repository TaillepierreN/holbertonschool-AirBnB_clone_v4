$(document).ready(function () {
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
});

$(document).ready(function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
