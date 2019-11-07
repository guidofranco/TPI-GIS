import set_layout from "./layout.js";

var layers, layers_to_show, view, map, wmsSource, mousePositionControl;

set_layout();

layers = ['Actividades agropecuarias', 'Actividades económicas', 'Complejos de energía', 'Construcciones turísticas', 'Edificios de salud',
'Edificios de seguridad', 'Edificios de deporte y esparcimiento', 'Edificios de educación', 'Edificios ferroviarios', 'Edificios públicos',
'Edificios religiosos', 'Estructuras portuarias', 'Infraestructura aeroportuaria', 'Infraestructura hidrográfica', 'Localidades', 'Marcas y señales',
'Obra portuaria', 'Obra de comunicación', 'Otras edificaciones', 'Puente red vial', 'Puntos de alturas topográficas', 'Puntos del terreno',
'Salvado de obstáculo', 'Señalizaciones', 'Curso de agua', 'Curvas de nivel', 'Líneas de conducción', 'Límite político administrativo', 'Muro embalse', 
'Red ferroviaria', 'Red vial', 'Vías secundarias', 'Ejido', 'Espejo de agua', 'Isla', 'País límites', 'Provincias', 'Suelo congelado',  'Suelo consolidado',
'Suelo costero', 'Suelo hidromorfo', 'Suelo no consolidado', 'Vegetación arbórea', 'Vegetación arbustiva', 'Vegetación cultivos', 'Vegetación hidrófila',
'Vegetación suelo desnudo'];

layers_to_show =[
  new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "https://wms.ign.gob.ar/geoserver/wms",
      params: {
        LAYERS: "ign:provincia",
        VERSION: "1.1.1"
      }
    })
  })
];

layers.forEach(function(value) {
  let layer = new ol.layer.Image({
    title: value,
    visible: false,
    source: new ol.source.ImageWMS({
        url: URL_OGC,
        params: {
            LAYERS: value,
        }
    })
  });
  layers_to_show.push(layer);
});

mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: "EPSG:4326",
  undefinedHTML: "&nbsp;"
})

view = new ol.View({
  projection: 'EPSG:4326',
  center: [-60, -38.5],
  zoom: 5
});

map = new ol.Map({
  controls: ol.control.defaults().extend([mousePositionControl]),
  target: 'map',
  layers: layers_to_show,
  view: view
});

// Listado de capas y sus leyendas
layers.forEach(
    function(value, index){
        var a_layer = layers_to_show[index+1];
        wmsSource = new ol.source.ImageWMS({
          url: URL_OGC,
          params: {"LAYERS": value},
          ratio: 1,
          serverType: "geoserver"
        });

        //Checkbox
        var checkbox = document.createElement("input");
        var check_layer_id = "check_layer_" + index;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", check_layer_id);
        document.getElementById("layerspanel").insertAdjacentElement("beforeend", checkbox);

        //Nombre de la capa
        var label = document.createElement("label");
        label.setAttribute("for", check_layer_id);
        label.setAttribute("style", "margin-left:3px;");
        label.innerHTML = layers[index];
        document.getElementById(check_layer_id).insertAdjacentElement("afterend", label);

        //Leyenda
        document.getElementById("layerspanel").insertAdjacentHTML("beforeend", `
        <button class="btn btn-light" type="button" data-toggle="collapse" data-target=${"#legend_"+index} style="margin:5px; padding:0px 5px;">
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="collapse" id=${"legend_"+index}>
          <img src=${wmsSource.getLegendUrl(map.getView().getResolution())}>
        </div>
        <br>
        `);

        //Visibilidad de las capas
        checkbox.addEventListener("change",
          function () {
            let checked = this.checked;
            if (checked !== a_layer.getVisible()) {
                a_layer.setVisible(checked);

                // A la última capa puesta como visible se la toma como fuente de las próximas consultas
                if (checked) {
                  wmsSource = new ol.source.ImageWMS({
                    url: URL_OGC,
                    params: {'LAYERS': value},
                    serverType: 'geoserver',
                    crossOrigin: 'anonymous'
                  });
                }
                else {wmsSource=null;}
            }
          }
        );
        a_layer.on("change:visible",
            function() {
                var visible = this.getVisible();
                if (visible !== checkbox.checked){
                    checkbox.checked=visible;
                }
            })
    }

);


//Función de consultas
map.on('singleclick', function(evt) {
  var viewResolution = (view.getResolution());
  if (wmsSource) {
    // Si se seleccionó una capa, al hacer click se muestra el infopanel
    w2ui['inner_layout'].show('bottom', false)

    // Consulta a la última capa seleccionada
    var url = wmsSource.getFeatureInfoUrl(
      evt.coordinate,
      viewResolution,
      'EPSG:4326',
      {'INFO_FORMAT': 'text/html'}
    );
    if (url) {
      fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (html) {
        document.getElementById('infopanel').innerHTML = html;
      });
    }
    
  }else {
    // Si no hay una fuente se oculta el infopanel
    w2ui['inner_layout'].hide('bottom', false)
  }
});