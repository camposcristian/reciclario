$(document).on("ready", function () {
    var residuos = new Bloodhound({
        datumTokenizer: function (d) {
            return d;
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 5,
        prefetch: {
            url: 'fakes/residuos.json',
            filter: function (list) {
                return $.map(list, function (residuo) { return { name: residuo.label, id: residuo.ID, reciclable: residuo.post_type }; });
            }
        }
    });
    residuos.initialize();
    $('#residuo').typeahead(null, {
        name: 'residuos',
        valueKey: 'reciclable',
        displayKey: 'name',
        source: residuos.ttAdapter()
    }).bind('typeahead:selected', function (obj, selected, name) {
        residuos.get('a', function (suggestions) {
            $.each(suggestions, function (index, item) {
                console.log(item);
            });
        });
    });


    $("#form_residuos").submit(function( event ) {
      event.preventDefault();

      var residuo = $("#residuo").val();
      var residuo_id = $("#residuo-id").val();

      console.log("nombre: ", residuo, "id", residuo_id);

      if (residuo_id == "reciclable") {

        $("#main").toggle("fade");
        $("#residuo_description").toggle("fade");

      };

    });

});
