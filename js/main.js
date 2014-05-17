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
                }
            });
        }
        else {
            $("#main").hide();
            $("#nuevo_residuo").fadeIn("slow");
        }

    });
});




