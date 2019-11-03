var my_layers = ['veg_hidrofila', 'edif_depor_y_esparcimiento', 'complejo_de_energia_ene', 'salvado_de_obstaculo', 'pais_lim', 'sue_congelado', 'actividades_agropecuarias', 'líneas_de_conducción_ene', 'edificio_de_seguridad_ips', 'puntos_de_alturas_topograficas', 'sue_consolidado', 'limite_politico_administrativo_lim', 'isla', 'otras_edificaciones', 'localidades', 'espejo_de_agua_hid', 'obra_portuaria', 'red_ferroviaria', 'vias_secundarias', 'edif_educacion', 'curvas_de_nivel', 'red_vial', 'señalizaciones', 'veg_arborea', 'edificios_ferroviarios', 'sue_costero', 'sue_hidromorfologico', 'infraestructura_hidro', 'marcas_y_señales', 'veg_arbustiva', 'edificio_de_salud_ips', 'provincias', 'obra_de_comunicación', 'edif_construcciones_turisticas', 'puente_red_vial_puntos', 'curso_de_agua_hid', 'edificio_publico_ips', 'muro_embalse', 'sue_no_consolidado', 'infraestructura_aeroportuaria_punto', 'estructuras_portuarias', 'edif_religiosos', 'actividades_economicas', 'veg_suelo_desnudo', 'ejido', 'puntos_del_terreno', 'veg_cultivos'];

var layers_to_show =[
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

my_layers.forEach(function(value) {
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
    layers_to_show.push(layer)
})


var map = new ol.Map({
    target: 'map',
    layers: layers_to_show,
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [-60, -38.5],
        zoom: 5})
    });

my_layers.forEach(
    function(value, index){
        var checkbox = document.createElement("input");
        var label_for_input = document.createElement("label");
        var check_layer_id = "check_layer_" + index;
        var labels = document.getElementsByTagName("label");
        
        var a_layer = layers_to_show[index+1];

        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", check_layer_id)
        label_for_input.setAttribute("for", check_layer_id);
        document.getElementById("panel").insertAdjacentElement("beforeend", checkbox);
        document.getElementById(check_layer_id).insertAdjacentElement("afterend", label_for_input);
        labels[labels.length - 1].innerHTML = value;
        document.getElementById("panel").appendChild(document.createElement("br"));

        //visibilidad de las capas
        
        checkbox.addEventListener("change",
            function () {
                var checked = this.checked;
                if (checked !== a_layer.getVisible()) {
                    a_layer.setVisible(checked)
                }
            });
        a_layer.on("change:visible",
            function() {
                var visible = this.getVisible();
                if (visible !== checkbox.checked){
                    checkbox.checked=visible;
                }
            })
    }

);
