"use strict";
class Meteo {
    constructor(){
        this.apikey = "36c364af2a40885bf1dd3f3cae53a103";
        this.ciudad = "";
        this.url = "";
        this.correcto = "¡Todo correcto! JSON recibido";
        this.tipo = "&mode=json";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
    }

    cargarDatos(ciudad){
        this.ciudad = ciudad;
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    $("pre").text(JSON.stringify(datos, null, 2));
                
                    //PresentaciÃ³n de los datos contenidos en JSON
                    
                    var code = datos.weather;
                    var iconW = "";

                    $.each(code[0], function (i, item) {
                      iconW = item;
                    })  

                    const valor = console.log(datos.name);

                    var icon = "https://openweathermap.org/img/wn/"+iconW+"@2x.png";
                    var stringDatos = "<img src=" + icon + " alt= \"Imagen sobre la condición térmica\"></img>";

                    var ubi = '#img' + ciudad;
                    $(ubi).html(stringDatos);
                    stringDatos = "";

                    stringDatos += "<li><strong>Datos del lugar</strong></li>";
                    stringDatos += "<li>Región: " + datos.name + "</li>";
                        stringDatos += "<li>País: " + datos.sys.country + "</li>";
                        stringDatos += "<li>Latitud: " + datos.coord.lat + "</li>";
                        stringDatos += "<li>Longitud: " + datos.coord.lon + "</li>";
                        

                        stringDatos += "<li><strong>Temperatura</strong></li>";
                        stringDatos += "<li>Temperatura : " + datos.main.temp + " grados celsius</li>";
                        stringDatos += "<li>Sensacion Termica: " + datos.main.feels_like + " grados celsius </li>";
                        stringDatos += "<li>Tempratura maxima: " + datos.main.temp_max + " grados celsius </li>";
                        stringDatos += "<li>Tempratura minima: " + datos.main.temp_min + " grados celsius </li>";

                        stringDatos += "<li><strong>Viento</strong></li>";
                        stringDatos += "<li>Viento : " + datos.wind.speed + " metros/segundo</li>";
                        stringDatos += "<li>Grado de viento: " + datos.wind.deg + "grados </li>";

                        stringDatos += "<li><strong>Nubes</strong></li>";
                        stringDatos += "<li>Nubosidad: " + datos.clouds.all + "%</li>";

                        stringDatos += "<li><strong>Otros</strong></li>";
                        stringDatos += "<li>Visibilidad (km): " + datos.visibility + "</li>";
                        stringDatos += "<li>Zona Horaria " + datos.timezone+ "</li>";
                        stringDatos += "<li>Presion " + datos.main.pressure+ " milibares</li>";
                        stringDatos += "<li>Humedad " + datos.main.humidity+ "%</li>";

                    
                    var ubi = "#" + ciudad;
                    $(ubi).html(stringDatos);
                },
            error:function(){
                alert("We can not obtain JSON");
                }
        });
    }

    verJSON(ciudad){
      this.ciudad = ciudad;
      this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "&APPID=" + this.apikey;
      document.write(this.url);
      document.write("<h2>JSON</h2>")
      var str = JSON.stringify(datos, null, 2);
      document.write("<pre>" + str + "</pre>");
  }
}

var meteo = new Meteo();

