"use strict";
class JQuery {
	constructor(){
	}
    ocultarP(){
        $("p").hide();
    }
    mostrarP(){
        $("p").show();
    }
    ocultarTabla(){
        $("table").hide();
    }
    mostrarTabla(){
        $("table").show();
    }
    ocultarLista(){
        $("ul").hide();
    }
    mostrarLista(){
        $("ul").show();
    }
    modificarFooter(){
        var texto = $("#campoAutor").val();
        $("#autor").text(texto);

        var textoD = $("#campoDescripcion").val();
        $("#descripcion").text(textoD);
    }
    añadirparrafo(){
        var texto = "<p>" + $("#campoParrafo").val() + "</p>";
        $("#parrafo").after(texto);
    }
    añadirlista(){
        var texto = "<li>" + $("#campoLista").val() + "</li>";
        $("#primerelemento").before(texto);
    }
    añadirtabla(){
        var texto = "<th>" + $("#campoTablaInput").val()+ "</th>";
        $("ultimath").after(texto);
    }
    eliminarparrafos(){
        $("#parrafoSection").remove();
    }
    eliminartabla(){
        $("#tabla").remove();
    }
    eliminarlista(){
        $("#lista").remove();
    }
    mostrarhtmlinfo(){
        var texto = ""
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            var nombre = $(this).get(0).tagName;
            var valor =  $(this).get(0);
            texto += "Etiqueta padre: <"  + etiquetaPadre + "> elemento: <" + nombre +"> ||\n";
        });
        $("#infoPadres").text(texto);
    }
    sumarColum(){
        $("table").each(function() {
            var cont=0;
                $(this).find('th').each(function(i) {
                cont++;
                });
            $("#sumadoColum").text(cont);
        });
    }
    sumarFilas(){
        $("table").each(function() {
            var cont = 0;
            $(this).find('tr').each(function(i) {
                  cont++;
            });
            $("#sumarFi").text(cont);
        });
    }
}
    
var query = new JQuery();

