function hideSplash(){$.mobile.changePage("#pageLogin","pop")}function errorGrupal(){navigator.notification.alert("No se encontraron creaciones de tipo grupal!",alertGrupal,"Grupal","Ok")}function alertGrupal(){console.log("Has pulsado Ok")}$(function(){setTimeout(hideSplash,4900)});var app={initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:function(){app.receivedEvent("deviceready")},receivedEvent:function(e){var n=document.getElementById(e),t=n.querySelector(".listening"),i=n.querySelector(".received");t.setAttribute("style","display:none;"),i.setAttribute("style","display:block;"),console.log("Received Event: "+e)}};