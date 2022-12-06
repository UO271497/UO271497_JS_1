// 107-objetoMapaDinamicoGoogle.js
// Versión 2.0 18/noviembre/2018. Juan Manuel Cueva Lovelle. Universidad de Oviedo
//Version 2.1 23/10/2021 
var mapaDinamicoGoogle = new Object();
function initMap(){
    var oviedo = {lat: 43.3672702, lng: -5.8502461};
    var mapaOviedo = new google.maps.Map(document.getElementById('mapa'),{zoom: 8,center:oviedo});
    var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
}
mapaDinamicoGoogle.initMap = initMap;