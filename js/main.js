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
