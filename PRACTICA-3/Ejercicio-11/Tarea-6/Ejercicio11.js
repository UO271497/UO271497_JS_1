'use strict'
class DatosCiudad {
    constructor() {
        this.apikeyMeteo = '36c364af2a40885bf1dd3f3cae53a103';
        this.ciudad = '';
        this.url = '';
        this.urlGoogle = '';
        this.correcto = '¡Todo correcto! JSON recibido';
        this.tipo = '&mode=json';
        this.unidades = '&units=metric';
        this.idioma = '&lang=es';
        this.long = 0;
        this.lat = 0;
        this.apikeyFotos = '7c1a15430ff528ce6e5381c2bd428ca3';
        this.apiGoogle = "AIzaSyCvIyQoGv5V7xXmfbhwZEtUFk88vTJjgzU";
        let map;
    }

    cargarDatosMeteoByCiudad() {
        this.ciudad = $('#buscador').val();
        this.url =
            'http://api.openweathermap.org/data/2.5/weather?q=' +
            this.ciudad +
            this.tipo +
            this.unidades +
            this.idioma +
            '&APPID=' +
            this.apikeyMeteo;
            var self =  this;

        $.ajax({
            dataType: 'json',
            url: this.url,
            method: 'GET',
            success: function(datos) {
                $('pre').text(JSON.stringify(datos, null, 2))

                //PresentaciÃ³n de los datos contenidos en JSON

                var code = datos.weather;
                var iconW = '';

                $.each(code[0], function(i, item) {
                    iconW = item;
                })

                self.lat = datos.coord.lat;
                self.long = datos.coord.lon;

                console.log(self.lat);

                var icon = 'http://openweathermap.org/img/wn/' + iconW + '@2x.png';
                var stringDatos = "<img src=" + icon + " alt= \"Imagen sobre la condición térmica\"></img>";

                var ubi = '#imgCiudad';
                $(ubi).html(stringDatos);
                stringDatos = "";

                stringDatos += "<li>Datos del lugar</li>";
                stringDatos += "<li>Región: " + datos.name + "</li>";
                    stringDatos += "<li>País: " + datos.sys.country + "</li>";
                    stringDatos += "<li>Latitud: " + datos.coord.lat + "</li>";
                    stringDatos += "<li>Longitud: " + datos.coord.lon + "</li>";
                    stringDatos += "<li>Descripcion: " + datos.weather.description + "</li>";
                    stringDatos += "<li>Estacion: " + datos.base.stations + "</li>";
                    

                    stringDatos += "<li>Temperatura</li>";
                    stringDatos += "<li>Temperatura (F): " + datos.main.temp + "</li>";
                    stringDatos += "<li>Sensacion Termica: " + datos.main.feels_like + "</li>";
                    stringDatos += "<li>Tempratura maxima (F): " + datos.main.temp_max + "</li>";
                    stringDatos += "<li>Tempratura minima (F): " + datos.main.temp_min + "</li>";

                    stringDatos += "<li>Viento</li>";
                    stringDatos += "<li>Viento (m/h): " + datos.wind.speed + "</li>";
                    stringDatos += "<li>Grado de viento: " + datos.wind.deg + "</li>";
                    stringDatos += "<li>Grado de viento: " + datos.wind.gust + "</li>";

                    stringDatos += "<li>Nubes</li>";
                    stringDatos += "<li>Nubes: " + datos.clouds.all + "</li>";

                    stringDatos += "<li>Otros</li>";
                    stringDatos += "<li>Visibilidad (km): " + datos.visibility + "</li>";
                    stringDatos += "<li>Zona Horaria " + datos.timezone+ "</li>";
                    stringDatos += "<li>Presion " + datos.main.pressure+ "</li>";
                    stringDatos += "<li>Humedad " + datos.main.humidity+ "</li>";

                var ubi = '#' + 'ciudadMeteo';
                $(ubi).html(stringDatos);
                self.getMapaEstaticoGoogle();
            },
            error: function() {
                alert('We can not obtain JSON');
            },
        })

    }

    getMapaEstaticoGoogle(){
        console.log(this.lat);
        var ubicacion=document.getElementById("mapa");
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.lat + "," + this.long;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.lat + "," + this.long;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML = "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
    }
    


    cargarFotos() {
        this.ciudad = $('#buscador').val();
        var flickrAPI =
            'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
            this.apikeyFotos +
            '&tags=' +
            this.ciudad +
            '&format=json&nojsoncallback=1';
        $.ajax({
            dataType: 'json',
            url: flickrAPI,
            method: 'GET',
            success: function(data) {
                $('#fotos')
                    .find('img')
                    .each(function(i) {
                        $(this).remove();
                    })

                $.each(data.photos.photo, function(i, item) {
                    var source =
                        'https://live.staticflickr.com/' +
                        item.server +
                        '/' +
                        item.id +
                        '_' +
                        item.secret +
                        '.jpg';
                    $('<img>').attr('src', source).appendTo('#fotos')
                    if (i === 20) {
                        return false;
                    }
                })
            },
            error: function() {
                alert(
                    'Este no es un lugar conocido, por favor, realice la búsqueda de nuevo',
                );
            },
        })
    }

    cargarDatos() {
        this.cargarDatosMeteoByCiudad();
        this.cargarFotos();
        //this.getMapaEstaticoGoogle();
        
        /** 
        // Create the script tag, set the appropriate attributes
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCvIyQoGv5V7xXmfbhwZEtUFk88vTJjgzU&callback=initMap';
        script.async = true;

        // Append the 'script' element to 'head'
        document.head.appendChild(script);
        */

    }
}

var datos = new DatosCiudad()