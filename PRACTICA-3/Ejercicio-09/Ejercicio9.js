'use strict'
class Meteo {
  constructor() {
    this.apikey = '36c364af2a40885bf1dd3f3cae53a103'
    this.ciudad = ''
    this.url = ''
    this.tipo = '&mode=xml'
    this.unidades = '&units=metric'
    this.idioma = '&lang=es'
    this.correcto = '¡Todo correcto! XML recibido'
  }
  cargarDatos(ciudad) {
    this.ciudad = ciudad
    this.url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      this.ciudad +
      this.tipo +
      this.unidades +
      this.idioma +
      '&APPID=' +
      this.apikey
    $.ajax({
      dataType: 'xml',
      url: this.url,
      method: 'GET',
      success: function (datos) {
        //Presentación del archivo XML en modo texto
        $('h5').text(new XMLSerializer().serializeToString(datos))

        //Extracción de los datos contenidos en el XML

        var temperatura = $('temperature', datos).attr('value')
        var temperaturaMin = $('temperature', datos).attr('min')
        var temperaturaMax = $('temperature', datos).attr('max')
        var humedad = $('humidity', datos).attr('value')
        var presion = $('pressure', datos).attr('value')
        var velocidadViento = $('speed', datos).attr('value')
        var nombreViento = $('speed', datos).attr('name')
        var direccionViento = $('direction', datos).attr('value')
        var codigoViento = $('direction', datos).attr('code')
        var nombreDireccionViento = $('direction', datos).attr('name')
        var nubosidad = $('clouds', datos).attr('value')
        var nombreNubosidad = $('clouds', datos).attr('name')
        var visibilidad = $('visibility', datos).attr('value')
        var precipitacionMode = $('precipitation', datos).attr('mode')
        var descripcion = $('weather', datos).attr('value')
        var icono = $('weather', datos).attr('icon')
        var longitud              = $('coord',datos).attr("lon");
        var latitud               = $('coord',datos).attr("lat");
        var pais                  = $('country',datos).text();
        var minutosZonaHoraria    = new Date().getTimezoneOffset();
        //PresentaciÃ³n de los datos contenidos en xml

        //var iconW = '01d'
        var icon = 'https://openweathermap.org/img/wn/' + icono + '@2x.png'
        var stringDatos =
          '<img src=' +
          icon +
          ' alt= "Imagen sobre la condición térmica"></img>'
          var ubi = '#img' + ciudad
          $(ubi).html(stringDatos)
          stringDatos = "";

          stringDatos += "<li><strong>Datos del lugar</strong></li>";
          stringDatos += "<li>Región: " + ciudad + "</li>";
          stringDatos += "<li>País: " + pais + "</li>";
          stringDatos += "<li>Latitud: " + latitud + "</li>";
          stringDatos += "<li>Longitud: " + longitud + "</li>";
                        

          stringDatos += "<li><strong>Temperatura</strong></li>";
          stringDatos += "<li>Temperatura : " + temperatura + " grados celsius</li>";
          stringDatos += "<li>Tempratura maxima: " + temperaturaMax + " grados celsius </li>";
          stringDatos += "<li>Tempratura minima: " + temperaturaMin + " grados celsius </li>";

          stringDatos += "<li><strong>Viento</strong></li>";
          stringDatos += "<li>Viento : " + velocidadViento + " metros/segundo</li>";
          stringDatos += "<li>Dirección viento: " + direccionViento + " grados </li>";
          stringDatos += "<li>Descripción: " + nombreViento + "</li>";

          stringDatos += "<li><strong>Nubes</strong></li>";
          stringDatos += "<li>Nubosidad: " + nubosidad + "%</li>";
                        
          stringDatos += "<li><strong>Otros</strong></li>";
          stringDatos += "<li>Visibilidad (km): " + visibilidad + "</li>";
          stringDatos += "<li>Zona Horaria " + minutosZonaHoraria/60+ "</li>";
          stringDatos += "<li>Presion " + presion+ " milibares</li>";
          stringDatos += "<li>Humedad " +humedad+ "%</li>";

        ubi = '#' + ciudad
        $(ubi).html(stringDatos)
      },
      error: function () {
        //alert("We can not obtain XML");
      },
    })
  }
}

var meteo = new Meteo()

/* Ejemplo de XML recibido de http://openweathermap.org
<?xml version="1.0" encoding="UTF-8"?>
<current>
    <city id="3114711" name="Oviedo">
        <coord lon="-5.84" lat="43.36"/>
        <country>ES</country>
        <sun rise="2017-11-19T07:23:01" set="2017-11-19T16:54:35"/>
    </city>
    <temperature value="10" min="10" max="10" unit="metric"/>
    <humidity value="81" unit="%"/>
    <pressure value="1023" unit="hPa"/>
    <wind>
        <speed value="2.6" name="Light breeze"/>
        <gusts/>
        <direction value="160" code="SSE" name="South-southeast"/>
    </wind>
    <clouds value="0" name="clear sky"/>
    <visibility value="10000"/>
    <precipitation mode="no"/>
    <weather number="800" value="cielo claro" icon="01n"/>
    <lastupdate value="2017-11-19T22:30:00"/>
</current>
 */