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


    });

    //conexion con API de reciclario.com.ar para buscar la info de un material por ID
      var id = 606;
      $.ajax({
          url: "http://reciclario.com.ar/?p="+id+"&json=1",
          jsonp: "callback",
          dataType: "jsonp",
          success: function( response ) {
              console.log( response.post ); // server response
              $("#nombre_prod").text(response.post.title);
              $("#img_prod").attr('src', response.post.attachments[0]['images']['medium']['url']);
              $("#description").html(response.post.excerpt);
              $("#description").append('<a href="'+response.post.url+'">Ver más »</a>');
          }
      });

});
