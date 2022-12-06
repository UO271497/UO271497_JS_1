"use strict";
class Lector {
    constructor(){
        this.map;
    }

    checkNavegador(){
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) 
        {  
            alert ("Este navegador NO soporta el API File y este programa puede no funcionar correctamente");
        }     
    }

    leerArchivo() { 
        var archivos = document.getElementById("subirArchivos").files;
        var file = archivos[0]
        var map = this.map;

        if (file.name.includes('.GeoJSON')) {
            const lector = new FileReader();
            lector.onload = function (evento) {
                    
                var json = JSON.parse(lector.result);

                $.each(json.features, function(i,item ) {

                    var codigo = item.coordinates; 
                    
                    var lo = parseFloat(codigo[0][0]);
                    var la = parseFloat(codigo[0][1]);
                    
                    var ubicacion = {lat: la, lng: lo};

                    var marker = new google.maps.Marker({
                        position: ubicacion,
                        map: map,
                      });
                });

            }  

            lector.readAsText(file);

        } else {
            alert("El archivo no es GeoJSON");
        }
    }


    createMap(){
        var ubicacion = {lat: 43.36029, lng: -5.84476};
        var map = new google.maps.Map(document.getElementById("map"),{zoom: 9,center:ubicacion});
        this.map = map;

    }
}

var lector = new Lector();