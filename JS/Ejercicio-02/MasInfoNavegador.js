document.write('<section>');
document.write('<h2>Otros datos del navegador</h2>');

document.write('<p>Versión: ');
document.write(infoNavegador.version);
document.write('</p>');
document.write('<p>Plataforma: ');
document.write(infoNavegador.plataforma);
document.write('</p>');
document.write('<p>Vendedor: ');
document.write(infoNavegador.vendedor);
document.write('</p>');
document.write('<p>Agente: ');
document.write(infoNavegador.agente);
document.write('</p>');
document.write('<p>Java activo: ');
document.write(infoNavegador.javaActivo);
document.write('</p>');
document.write('<p>Num Plugins: ');
document.write(infoNavegador.plugins);
document.write('</p>');
for (i=0; i<infoNavegador.plugins.length;i++){
    document.write("<p>Plugin["+i+"]= "+infoNavegador.plugins[i].name+"</p>");
}
document.write('<p>app Code Name: ');
document.write(infoNavegador.appCodeName);
document.write('</p>');
document.write('<p>app On Line: ');
document.write(infoNavegador.onLine);
document.write('</p>');
document.write('<p>app cookie Enabled: ');
document.write(infoNavegador.cookieEnabled);
document.write('</p>');


if (navigator.geolocation){
    document.write("<p>Geolocalización disponible en este navegador</p>");
}
else {
    document.write("<p>Geolocalización no disponible en este navegador</p>");
}

if (navigator.pdfViewer){
    document.write("<p>Pdf viewer disponible en este navegador</p>");
}
else {
    document.write("<p>Pdf viewer no disponible en este navegador</p>");
}
document.write('<p>WebDriver: ');
document.write(infoNavegador.webDriver);
document.write('</p>');


document.write('</section>');