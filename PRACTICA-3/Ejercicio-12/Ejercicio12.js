"use strict";
class Lector {
    constructor(){
        this.error = false;
    }

    checkNavegador(){
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) 
        {  
            alert ("Este navegador NO soporta el API File y este programa puede no funcionar correctamente");
        }     
    }

    checkExtensionArchivo(){
        if(this.error){
            alert("Error: La esxtension de algunos de los archivos no es compatible");
        }   
    }

    leerArchivo(file, fileNum) { 
    //Solamente toma un archivo
    var texto = document.getElementById("contenidos");
    var toAdd = "<h3> Archivo número " + fileNum + " </h3>";
    toAdd += "<p> Nombre del archivo: " + file.name + " </p>";
    toAdd += "<p> Tamaño del archivo: " + file.size + " bytes </p>";
    toAdd += "<p> Tipo del archivo: " + file.type + " </p>";
    toAdd += "<p> Fecha de la última modificación: " + file.lastModifiedDate + " </p>";
    toAdd += "<p> Contenido del archivo de texto: </p> <p id=\"textContent"+ fileNum +"\"> </p>";


    //Solamente admite archivos de tipo texto
    var tipoTexto = /text.*/;
    var tipoXml = /xml.*/;
    var tipoJson = /json.*/;

    if (file.type.match(tipoTexto) || file.type.match(tipoXml) || file.type.match(tipoJson)) 
       {
            var lector = new FileReader();
                lector.onload = function (evento) {
                //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                //La propiedad "result" es donde se almacena el contenido del archivo
                //Esta propiedad solamente es válida cuando se termina la operación de lectura
                document.getElementById("textContent" + fileNum).innerText = lector.result;
            }  
            lector.readAsText(file);
        }
    else {
        this.error=true;
        } 
        
    texto.innerHTML = texto.innerHTML + toAdd;
    }

    leerArchivos() {

        this.error= false;

        var archivos = document.getElementById("subirArchivos").files,
            nArchivos = archivos.length;
        
        document.getElementById("contenidos").innerHTML = "<h2>Resultados</h2>";
        
        for (var i = 0; i < nArchivos; i++) {
            this.leerArchivo(archivos[i], i);
        }

        this.checkExtensionArchivo();

    }

}

var lector = new Lector();