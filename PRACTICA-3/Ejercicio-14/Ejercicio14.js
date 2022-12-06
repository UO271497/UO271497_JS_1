'use strict'
class canvanizador {
	constructor(){
		this.canvas=document.getElementById("canvas");
		this.ctx =  this.canvas.getContext("2d");

		this.rect =  this.canvas.getBoundingClientRect();
		this.x =0;
		this.y = 0;
		this.dibujando  = false;
		this.color = "black";
		this.grossor = 1;
		this.actualizar();
		}
	
	actualizar(){
		self=this;
		document.addEventListener("mousedown", function (e)
			{
				self.x = e.clientX - self.rect.left;
				self.y = e.clientY - self.rect.top;
				self.dibujando = true;
			});
	  
	  document.addEventListener("mousemove", function (e)
		{
		  if (self.dibujando === true)
			{
				self.dibujar(self.x, self.y, e.clientX - self.rect.left, e.clientY - self.rect.top);
				self.x =  e.clientX - self.rect.left;
				self.y = e.clientY - self.rect.top;
			}
		});
	  
	  document.addEventListener("mouseup", function (e)
		{
		  if (self.dibujando === true)
			{
				self.dibujar(self.x, self.y, e.clientX - self.rect.left, e.clientY - self.rect.top);
				self.x = 0;
				self.y = 0;
				self.dibujando = false;
			}
		});
	}
	actualizarImagen(imagen){
		var self=this;
		imagen.onload = function(){
			self.ctx.clearRect(0, 0,800,600);
			self.ctx.drawImage(imagen, 0, 0,800,600);
		  }
	}
	defColor(c){
		this.color = c;
	}
	defGrossor(c){
		this.grossor = c;
	}
	dibujar(x1,y1,x2,y2){
		this.ctx.beginPath();
		this.ctx.strokeStyle=this.color;
		this.ctx.lineWidth=this.grossor;
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
		this.ctx.closePath();
	}
}
"use strict";
class Ciudad {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
		this.dato ="";
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    getMapaEstaticoGoogle(){
        var ubicacion=document.getElementById("mapa");
		this.latitud = document.getElementById("Lat").value;
		this.longitude = document.getElementById("Long").value;
        
		var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitude;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitude;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        this.dato  = "<img src=\" "+this.imagenMapa+"\" id=\"cogible\" draggable=\"true\"  alt=\"mapa estático google\" />";
		ubicacion.innerHTML = this.dato;
    }
	getMapaEstaticoGoogleDefault(){
		var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.getLatitud() + "," + this.getLongitud();
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.getLatitud() + "," + this.getLongitud();
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
		var ima = new Image();
		ima.src = this.imagenMapa;
		ima.alt = "mapa estático google";
		ima.id = "cogible";
		ima.draggable = "true";

		can.actualizarImagen(ima);
    }
}
"use strict";
class dragDrop{
	constructor (){
    }
	allowDrop(ev) {
		ev.preventDefault();
	  }
	  
	drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
	  }
	  
	drop(ev) {
		ev.dataTransfer.getData("text");
		var someimage = document.getElementById("sect2");
		var myimg = someimage.getElementsByTagName('img')[0];
		var mysrc = myimg.src;
		var img =  new Image();
		img.src = mysrc;
		can.actualizarImagen(img);
	  }
}

var can =  new canvanizador();
var mapaa =  new Ciudad();
var dropeador =  new dragDrop();
