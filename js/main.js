$(document).on("ready", function () {
    $.get("/fakes/residuos.json").success(function (residuos) {
        $( "#residuo" ).autocomplete({
            minLength: 2,
            source: residuos,
            focus: function( event, ui ) {
                $("#residuo").val(ui.item.label);
                return false;
            },
            select: function( event, ui ) {
                $( "#residuo" ).val( ui.item.label );
                $("#residuo-id").val(ui.item.post_type);
                $( "#residuos-description" ).html( ui.item.post_type );
                return false;
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
              .append("<a>" + item.label + "<br>" + item.post_type + "</a>")
              .appendTo( ul );
        };
    });
});
