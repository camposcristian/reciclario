/*
var cache = {};
	
	$("#buscar_track").autocomplete({
		minLength : 2,
		source : function(request, response) {
			var term = request.term;
			
			if ( term in cache) {
				response(cache[term]);
				return;
			}

			$.getJSON("https://spotifyapps.contenidos-digitales.com/axe/app.php/search/track/", request, function(data, status, xhr) {
				cache[term] = data;
				response(data);
			});
		},
		select : function(event, ui) {
			$('#seltrack').val(ui.item.id);
		}
	});
*/
﻿$(document).on("ready", function () {
    $.get("/fakes/residuos.json").success(function (residuos) {
        $( "#residuo" ).autocomplete({
            minLength: 2,
            source: residuos,
            focus: function( event, ui ) {
                $("#residuo").val(ui.item.post_title);
                return false;
            },
            select: function( event, ui ) {
                $( "#residuo" ).val( ui.item.post_title );
                $( "#residuo-id" ).val( ui.item.value );
                $( "#residuos-description" ).html( ui.item.post_type );
                return false;
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
              .append("<a>" + item.post_title + "<br>" + item.post_type + "</a>")
              .appendTo( ul );
        };
    });
});
>>>>>>> 10738db71579c6f927a3c57058666e7c9ad8796a
