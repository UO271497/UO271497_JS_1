'use strict'
class Gasolina {
  constructor() {
  }

  precioEuropa() {
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://gas-price.p.rapidapi.com/europeanCountries",
      "method": "GET",
      "headers": {
        "X-RapidAPI-Key": "b4027b1953mshec5b76af7451021p177597jsn5b12f7a87b13",
        "X-RapidAPI-Host": "gas-price.p.rapidapi.com"
      }
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      if(response.success===true){
        var stringDatos = "";
       response.results.forEach(element => {
        stringDatos += "<li>País: "+element.country+" precio: "+element.gasoline+" €</li>";
       });
       $(paisesEuropeos).html(stringDatos);
      }
      
    });
  }
  
  precioEspaña(){

    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://gas-price.p.rapidapi.com/europeanCountries",
      "method": "GET",
      "headers": {
        "X-RapidAPI-Key": "b4027b1953mshec5b76af7451021p177597jsn5b12f7a87b13",
        "X-RapidAPI-Host": "gas-price.p.rapidapi.com"
      }
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      if(response.success===true){
       response.results.forEach(element => {
        if(element.country=="Spain"){
          $(precioEspaña).html(" Precio: "+element.gasoline+" €");
        }
       });
      }
    });
  }

  precioProvincia() {
    var api =
      'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';
    var media=0;
    var contador=0;
    $.ajax({
      dataType: 'json',
      url: api,
      method: 'GET',
      success: function (data) {
        $.each(data.ListaEESSPrecio, function (i,item) {
          if(item.Provincia.includes($("#provincia").val())&&item["Precio Gasolina 95 E5"]!= ""){
            media+=parseFloat((item["Precio Gasolina 95 E5"]).replace(',','.'));
            contador++;
          }
        })
       
        $(precioProvincia).html(" Precio: "+(Math.round(media/contador * 1000) / 1000)+" €");
      },
      error: function () {
        alert('We can not obtain JSON')
      },
    })
  }

  media() {
  var api =
    'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';
  var media=0;
  var contador=0;
  $.ajax({
    dataType: 'json',
    url: api,
    method: 'GET',
    success: function (data) {
      $.each(data.ListaEESSPrecio, function (i,item) {
        if(item["Precio Gasolina 95 E5"]!= ""){
          media+=parseFloat((item["Precio Gasolina 95 E5"]).replace(',','.'));
          contador++;
        }
      })
     
      $(precioMedio).html(" Precio: "+(Math.round(media/contador * 1000) / 1000)+" €");
    },
    error: function () {
      alert('We can not obtain JSON')
    },
  })
  }
}


var gasolina = new Gasolina();

