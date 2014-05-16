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