
"use strict";
class GeoLocalizacion {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.setPosicion.bind(this), this.verErrores.bind(this));
    }

    setPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    getPosicion(elemento){
        var ubicacion=document.getElementById(elemento);
        var datos='<h2> Mi geolocalización</h2>'; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        ubicacion.innerHTML = datos;
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("La petición de geolocalización ha sido denegada");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La información de geolocalización no se encuentra disponible");
            break;
        case error.TIMEOUT:
            alert("La petición ha caducado");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ha ocurrido un error desconocido");
            break;
        }
    }
}
var miPosicion = new GeoLocalizacion();