$(document).on("ready", function () {
    var residuos = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 5,
        prefetch: {
            url: 'fakes/residuos.json',
            filter: function (list) {
                return $.map(list, function (residuo) { return { name: residuo.label, id: residuo.ID }; });
            }
        }
    });
    residuos.initialize();
    $('#residuo').typeahead(null, {
        name: 'residuos',
        displayKey: 'name',
        source: residuos.ttAdapter()
    }).bind('typeahead:selected', function (obj, selected, name) {
        id = selected.id;
    });
    $('.twitter-typeahead').css("display", "block");
    $("#form_residuos").submit(function (event) {
        event.preventDefault();
        if (id) {
            $.ajax({
                url: "http://reciclario.com.ar/?p=" + id + "&json=1",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (response) {
                    $("#main").hide();
                    $("#residuo_description").fadeIn("slow");
                    console.log(response.post); // server response
                    $("#nombre_prod").text(response.post.title);
                    $("#img_prod").attr('src', response.post.attachments[0]['images']['medium']['url']);
                    $("#description").html(response.post.excerpt);
                    $("#description").append('<a href="' + response.post.url + '">Ver mas >></a>');
                    if (response.post.type == "compostable" || response.post.type == "reciclable") {
                        $("#camapana").fadeIn('slow');
                        $.get("/fakes/campanas.json").success(function (campanas) {
                            var subarray = new Array();
                            var suLat = '';
                            var suLon = '';
                            function gps(location) {
                                if (typeof (Number.prototype.toRad) === "undefined") {
                                    Number.prototype.toRad = function () {
                                        return this * Math.PI / 180;
                                    }
                                }
                            }

                            navigator.geolocation.getCurrentPosition(gps);

                            var html = '';
                            suLat = location.coords.latitude;
                            suLon = location.coords.longitude;

                            for (var i = 0; i < campanas.length; i++) {
                                var object = campanas[i];
                                var sube = subarray[i];

                                var lat1 = location.coords.latitude;
                                var lat2 = parseFloat(object["lat"]);
                                var lon1 = location.coords.longitude;
                                var lon2 = parseFloat(object["long"]);

                                var R = 6371; // km
                                var dLat = (lat2 - lat1).toRad();
                                var dLon = (lon2 - lon1).toRad();
                                var lat1 = lat1.toRad();
                                var lat2 = lat2.toRad();

                                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
                                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                var d = R * c;
                                var dist = parseFloat(d);
                                if (d < 15) {
                                    subarray[i] = [dist, object["calle"], object["altura"], parseFloat(object["lat"]), parseFloat(object["long"])];
                                }
                            }
                            subarray.sort(function (a, b) {
                                if (a[0] > b[0])
                                    return 1;
                                if (a[0] < b[0])
                                    return -1;
                                // a must be equal to b
                                return 0;
                            });
                            for (var i = 0; i < subarray.length; i++) {
                                var object = subarray[i];
                                var posicion = object[0].toString();
                                html += '<div class="listado-item"><div class="distancia">' + '<a href="maps://maps.google.com/?daddr=' + suLat + ',' + suLon + '&saddr=' + object[3] + ',' + object[4] + '&dirflg=w">' + posicion.substr(0, posicion.indexOf('.') + 2) + 'km' + '</a>' + '</div>' + '<h2>' + object[1] + '</h2>' + 'Nro' + object[2] + '</div>';
                                document.getElementById('listado').innerHTML = html;
                            }
                        });
                    }
                }
            });
        }
        else {
            $("#main").hide();
            $("#nuevo_residuo").fadeIn("slow");
        }

    });
});




