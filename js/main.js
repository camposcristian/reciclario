$(document).on("ready", function () {
    
    //http://api.reciclario.com.ar/residuos
    $.get("/fakes/residuos.json").success(function (residuos) {
        $( "#residuo" ).autocomplete({
            minLength: 2,
            source: residuos,
            focus: function( event, ui ) {
                $("#residuo").val(ui.item.label);
                return false;
            },
            select: function( event, ui ) {
                $("#residuo").val( ui.item.label );
                $("#residuo-id").val(ui.item.post_type);
                $("#residuos-description").html( ui.item.post_type );
                return false;
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
              .append("<a>" + item.label + " <span>" + item.post_type + "</span></a>")
              .appendTo( ul );
        };
    });

    $("#form_residuos").submit(function( event ) {
      event.preventDefault();

      var residuo = $("#residuo").val();
      var residuo_id = $("#residuo-id").val();

      console.log("nombre: ", residuo, "id", residuo_id);

      if (residuo_id == "reciclable") {

        $("#main").toggle("fade");
        $("#residuo_description").toggle("fade");

      }

    });

});
