$(function(){
    logout_user();
    verDinamicas();
    verMentores();
});


//:::::::::::::::::::::::::::::::::::: funcion que valida los datos del login :::::::::::::::::::::::::::::::
var id_user, userLogin, cantidadCreaciones = 5;
function login(){
    
    $("#errorUsuario").html("");

    //Barra de progreso
    $.mobile.loading( 'show', {
        text: 'Cargando',
        textVisible: true,
        theme: 'c',
        html: ""
    });

    // recolecta los valores que inserto el usuario
    var datosUsuario = $("#username").val();
    var datosPassword = $("#password").val();

    archivoValidacion = "http://www.apps.laconexioncreadora.com/php/login.php?jsoncallback=?";
    $.getJSON( archivoValidacion, { username:datosUsuario ,password:datosPassword})
    .done(function(respuestaServer) {

        if(respuestaServer.validacion === "ok"){

            id_user = respuestaServer.id;

            userLogin = respuestaServer.username;

            creaciones_ususario(respuestaServer.id);

            membresia_usuario(respuestaServer.username);

            $.mobile.changePage("#pageCategorias", { transition: "slideup"});

        }else{

        $("#errorUsuario").html("Usuario o contraseña incorrectos!");
        //Barra de progreso
        $.mobile.loading( 'hide');

        // errorLogin();
        }

    });
    return false;
}

// //:::::::::::::::::::: Aca se imprime todas las creaciones :::::::::::::::::::::::::::::
function creaciones_ususario() {

    $.ajax({
            type: "POST",
            url:"http://www.apps.laconexioncreadora.com/php/conexion_creacion.php",
            success:function(result){
            contC = 0;
            $("#contenidoCreaciones").html("");
            for(i=0; i < result.length; i++) {
                if(id_user === result[i].user_id) {
                        $( '<a href="#pageInfoCreaciones" onclick="verCreacion('+i+')" data-transition="slideup"><div class="creaciones"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" class="fondoOscuro imagenCreacion"></div><div class="ui-block-b"><p class="tituloCreacion">'+result[i].name+'</p><span class="autorCreacion">'+result[i].nameCreador+'</span><p class="tipoCreacion">'+result[i].nameTypeDinamica+' | '+result[i].creation_date+'</p><p class="estadisticasCreacion">'+result[i].nameTypeCreacion+'</p></div></div></div></a>' ).appendTo( '#contenidoCreaciones');
                        contC++;
                }
                resultadosCreaciones[i] = result[i];
            }
            $('#cantCreaciones').html(contC);
            }

   });
} /*end creaciones*/


function registrarse() {
    var ref = window.open('http://www.laconexioncreadora.com/registrarse/', '_blank', 'location=yes');
}

function reset_password(){
    var ref = window.open('http://www.laconexioncreadora.com/mi-cuenta/lost-password/', '_blank', 'location=yes');
}

function browser_app(page){
    var ref = window.open(page, '_blank', 'location=yes');  
}

function logout_user() {
    $("#username").val("");
    $("#password").val("");
    $.mobile.changePage( "#pageLogin", { transition: "slideup"});
}

function page_tienda(){
    var ref = window.open('http://www.laconexioncreadora.com/tienda/', '_blank', 'location=yes');
}

/*::::::::::::::::::::::::::. FOOTER :::::::::::::::::::::::::::.*/
$(function(){
    $('.footer').html('<div data-role="navbar"><ul><li><a href="#pageDinamicas"><img src="img/dinamicas.png" alt="img dinamicas" width="35"><p class="text-center titulos-footer">Dinámicas</p></a></li><li><a href="#pageCreaciones"><img src="img/creaciones.png" alt="img creaciones" width="35"><p class="text-center titulos-footer">Creaciones</p></a></li><li><a href="#pageMentores"><img src="img/mentores.png" alt="img mentores" width="35"><p class="text-center titulos-footer">Mentores</p></a></li></ul></div>');
});


  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::  peticiones al archivo conexion_dinamica.php ::::::::::::::::::::::::::::://

var url = "http://www.apps.laconexioncreadora.com/media/";
var resultadosDinamicas = [];
var usuariosDinamica = [];
var contD, i, j, dinamica_id, intentos = 1;

function verDinamicas() {

             $.ajax({
                type: "POST",
                    url: "http://www.apps.laconexioncreadora.com/php/conexion_dinamica.php",
                success:function(result){
                    $("#contenidoDinamicas").html(" ");
                    contD = 0;
                    for(i=0; i < result.length; i++) {
                        cantUsuarios(result[i].id, i);
                        if(result[i].favorito == 1){
                            $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+result[i].image+'" class="fondoOscuro imagenDinamica"></div><div class="ui-block-b"><p><img src="img/estrella.png" width="17"><span class="tituloDinamica">'+result[i].title+'</span></p><span class="autorDinamica">'+result[i].name+'</span><p class="tipoDinamica">'+result[i].nametype+' - '+result[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+result[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                        }
                        resultadosDinamicas[i] = result[i];
                        contD++;
                    }

                    for(i=0; i < result.length; i++){
                        if (result[i].favorito == 0) {
                            $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+result[i].image+'" class="fondoOscuro imagenDinamica"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+result[i].title+'</span></p><span class="autorDinamica">'+result[i].name+'</span><p class="tipoDinamica">'+result[i].nametype+' - '+result[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+result[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                        }
                    }
                    $('#cantDinamicas').html(contD);
                }

            });

}


// Aca se trae la cantidad de usuarios por dinámica
function cantUsuarios(id_dinam, i) {
        var valor = {
            "id_dinam": id_dinam
        };

        $.ajax({ //funcion de ajax
            data: valor,
            url: "http://www.apps.laconexioncreadora.com/php/cant_usuarios_dinamicas.php",
            type: 'POST',

            success: function(respuesta) {  //recibimos la respuesta del servidor
                usuariosDinamica[i] = respuesta;
                $("#cantidadUsuarios"+i).html(respuesta);
            }
        });
    }


// Aca se trae la membresia que tiene el usuario en wordpress
function membresia_usuario(username) {
        var valor = {
            "username": username
        };

        $.ajax({ //funcion de ajax
            data: valor,
            url: "http://www.apps.laconexioncreadora.com/php/membresia_user.php",
            type: 'POST',

            success: function(respuesta) {  //recibimos la respuesta del servidor
                console.log(respuesta);

                switch(respuesta){
                    case 1:
                            cantidadCreaciones = 200;
                            console.log("Premium");
                            console.log(cantidadCreaciones);
                            break;
                    case 2:
                            cantidadCreaciones = 50;
                            console.log("Avanzado");
                            console.log(cantidadCreaciones);
                            break;
                    default:
                            cantidadCreaciones = 5;
                            console.log("Free");
                            console.log(cantidadCreaciones);
                }

            }

        });
    }

//:::::::::::::::::::::::::::::::::::::::::::::::: boton aleatorio :::::::::::::::::::::::::::::::::::::


$(function(){

        $("#btnDinamicaAleatoria").click(function() {

            $(this).toggleClass('verdeOscuro');
            $("#btnDescripcionDinamica").removeClass('verdeOscuro');
            $("#btnObjetivosDinamica").removeClass('verdeOscuro');
            $("#btnNombreDinamica").removeClass('verdeOscuro');
            $("#btnDinamicasRecientes").removeClass('verdeOscuro');
            $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
            $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
            $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
            $("#btnDinamicasGrupal").removeClass('verdeOscuro');
            $("#btnDinamicasIndividual").removeClass('verdeOscuro');

            var dinamicaAleatorio =  Math.round(Math.random()*contD);
            verDinamica(dinamicaAleatorio);

            sliderImagenes();
            // $.mobile.changePage("#pageInfoDinamica", { transition: "slideup"});

        });

});




        //:::::::::::::::::::::::::::::::::::::::::::::::::::: BUSCAR POR :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        //:::::::::::::::::::::::::::::::::: Funcion para mostrar las dinamicas por descripcion :::::::::::::::::

$(function(){

        $("#btnDescripcionDinamica").click(function() {

            if($(this).css("background-color") === "rgb(55, 234, 193)"){

                    $(this).addClass('verdeOscuro');

                    $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
                    $("#btnObjetivosDinamica").removeClass('verdeOscuro');
                    $("#btnNombreDinamica").removeClass('verdeOscuro');
                    $("#btnDinamicasRecientes").removeClass('verdeOscuro');
                    $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
                    $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
                    $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
                    $("#btnDinamicasGrupal").removeClass('verdeOscuro');
                    $("#btnDinamicasIndividual").removeClass('verdeOscuro');

                        var valor = {
                            "descr": $("#filtroDinamicas").val()
                        };

                        $.ajax({
                            data: valor,

                            url: "http://www.apps.laconexioncreadora.com/php/descrp_dinamicas.php",
                            type: 'POST',

                            success: function(respuesta) {

                                $("#contenidoDinamicas").html(" ");
                                for(j = 0; j < respuesta.length; j++) {

                                    for(i = 0; i < resultadosDinamicas.length; i++) {
                                                    if(resultadosDinamicas[i].descripcion === respuesta[j].descripcion ) {
                                                                if  (resultadosDinamicas[i].favorito == 1){
                                                                    $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                                    cantUsuarios(resultadosDinamicas[i].id, i);
                                                                } else {
                                                                    $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                                    cantUsuarios(resultadosDinamicas[i].id, i);
                                                                }
                                                    }

                                        }


                                }
                            }
                        });


            } else {

                $(this).removeClass('verdeOscuro');

                verDinamicas();

            }



        });


});


        //:::::::::::::::::::::::::::::::::: Funcion para mostrar las dinamicas por objetivos :::::::::::::::::
$(function(){

        $("#btnObjetivosDinamica").click(function() {

            if($(this).css("background-color") === "rgb(55, 234, 193)"){


                $(this).addClass('verdeOscuro');
                $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
                $("#btnDescripcionDinamica").removeClass('verdeOscuro');
                $("#btnNombreDinamica").removeClass('verdeOscuro');
                $("#btnDinamicasRecientes").removeClass('verdeOscuro');
                $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
                $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
                $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
                $("#btnDinamicasGrupal").removeClass('verdeOscuro');
                $("#btnDinamicasIndividual").removeClass('verdeOscuro');

                    var valor = {
                        "descr": $("#filtroDinamicas").val()
                    };

                    $.ajax({
                        data: valor,

                        url: "http://www.apps.laconexioncreadora.com/php/objetivos_dinamicas.php",
                        type: 'POST',

                        success: function(respuesta) {
                            $("#contenidoDinamicas").html(" ");
                            for(j = 0; j < respuesta.length; j++) {

                                for(i = 0; i < resultadosDinamicas.length; i++) {

                                                if(resultadosDinamicas[i].objetivos === respuesta[j].objetivos ) {
                                                            if  (resultadosDinamicas[i].favorito == 1){
                                                                $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                                cantUsuarios(resultadosDinamicas[i].id, i);
                                                            } else {
                                                                $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                                cantUsuarios(resultadosDinamicas[i].id, i);
                                                            }
                                                }

                                    }


                            }
                        }
                    });



            } else {

                    $(this).removeClass('verdeOscuro');

                    verDinamicas();
            }



        });


});


        //:::::::::::::::::::::::::::::::::: Funcion para mostrar las dinamicas por nombre :::::::::::::::::
$(function(){

        $("#btnNombreDinamica").click(function(){


        if($(this).css("background-color") === "rgb(55, 234, 193)") {

                $(this).addClass('verdeOscuro');
                
                $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
                $("#btnDescripcionDinamica").removeClass('verdeOscuro');
                $("#btnObjetivosDinamica").removeClass('verdeOscuro');
                $("#btnDinamicasRecientes").removeClass('verdeOscuro');
                $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
                $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
                $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
                $("#btnDinamicasGrupal").removeClass('verdeOscuro');
                $("#btnDinamicasIndividual").removeClass('verdeOscuro');

                    var valor = {
                        "descr": $("#filtroDinamicas").val()
                    };

                    $.ajax({
                        data: valor,

                        url: "http://www.apps.laconexioncreadora.com/php/nombres_dinamicas.php",
                        type: 'POST',

                        success: function(respuesta) {
                            $("#contenidoDinamicas").html(" ");
                            for(j = 0; j < respuesta.length; j++) {

                                for(i = 0; i < resultadosDinamicas.length; i++) {

                                                if(resultadosDinamicas[i].title === respuesta[j].titulo) {
                                                            if  (resultadosDinamicas[i].favorito == 1){
                                                                $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                                cantUsuarios(resultadosDinamicas[i].id, i);
                                                            } else {
                                                                $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                                cantUsuarios(resultadosDinamicas[i].id, i);
                                                            }
                                                }

                                    }


                            }
                        }
                    });


            } else {

                    $("#btnNombreDinamica").removeClass('verdeOscuro');

                    verDinamicas();
            }

        });           
});


        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::   ORDENAR POR ::::::::::::::::::::::::::::::::::::::::::::::::::::

        //:::::::::::::::::::::::::::::::::::::: Funcion ordenar por fecha cuando se oprima el boton "recientes"
$(function(){


    $("#btnDinamicasRecientes").click(function() {

        if($(this).css("background-color") === "rgb(55, 234, 193)"){

            $(this).addClass("verdeOscuro");

            $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
            $("#btnDescripcionDinamica").removeClass('verdeOscuro');
            $("#btnObjetivosDinamica").removeClass('verdeOscuro');
            $("#btnNombreDinamica").removeClass('verdeOscuro');
            $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
            $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
            $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
            $("#btnDinamicasGrupal").removeClass('verdeOscuro');
            $("#btnDinamicasIndividual").removeClass('verdeOscuro');

            $.ajax({
                type: "POST",
                url:"http://www.apps.laconexioncreadora.com/php/conexion_dinamica_order_desc.php",
                success:function(result){
                    $("#contenidoDinamicas").html("");
                    for(i=0; i < resultadosDinamicas.length; i++) {
                        cantUsuarios(resultadosDinamicas[i].id, i);
                        resultadosDinamicas[i] = result[i];
                        if(result[i].favorito == 1) {
                            $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+result[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+result[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+result[i].name+'</span><p class="tipoDinamica">'+result[i].nametype+' - '+result[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+result[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');

                        } else {
                            $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a "><img src="'+url+result[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+result[i].title+'</span></p><span class="autorDinamica">'+result[i].name+'</span><p class="tipoDinamica">'+result[i].nametype+' - '+result[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+result[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                        }
                    }
                }

            });


        } else {

            $(this).removeClass("verdeOscuro");

            verDinamicas();
        }


    });

});


        //:::::::::::::::::::::::::::::::::::::: Funcion para ordenar las dinamicas por "Inspiradora"
$(function(){

        $("#btnDinamicasInspiradoras").click(function() {

            if($(this).css("background-color") === "rgb(55, 234, 193)"){

                $(this).addClass('verdeOscuro');
                $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
                $("#btnDescripcionDinamica").removeClass('verdeOscuro');
                $("#btnObjetivosDinamica").removeClass('verdeOscuro');
                $("#btnNombreDinamica").removeClass('verdeOscuro');
                $("#btnDinamicasRecientes").removeClass('verdeOscuro');
                $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
                $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
                $("#btnDinamicasGrupal").removeClass('verdeOscuro');
                $("#btnDinamicasIndividual").removeClass('verdeOscuro');

                $.ajax({
                    type: "POST",
                    url:"http://www.apps.laconexioncreadora.com/php/calificacion_dinamicas.php",
                    success:function(result){
                        $('#contenidoDinamicas').html(' ');

                        for(j=0; j < result.length; j++) {
                            for(i = 0; i < resultadosDinamicas.length; i++) {
                                    if (resultadosDinamicas[i].id === result[j].dinamica && result[j].calificacion == 1) {
                                            if(resultadosDinamicas[i].favorito == 1) {
                                                $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                cantUsuarios(resultadosDinamicas[i].id, i);
                                            } else {
                                                $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a "><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                cantUsuarios(resultadosDinamicas[i].id, i);
                                            }
                                        }
                                }
                        }
                    }

                });

            } else {

                    $(this).removeClass('verdeOscuro');

                    verDinamicas();

            }


        });

});



        //:::::::::::::::::::::::::::::::::::::: Funcion para ordenar las dinamicas por "Práctica"
$(function(){

        $("#btnDinamicasPracitcas").click(function() {

            if($(this).css("background-color") === "rgb(55, 234, 193)"){

                    $(this).addClass('verdeOscuro');
                    $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
                    $("#btnDescripcionDinamica").removeClass('verdeOscuro');
                    $("#btnObjetivosDinamica").removeClass('verdeOscuro');
                    $("#btnNombreDinamica").removeClass('verdeOscuro');
                    $("#btnDinamicasRecientes").removeClass('verdeOscuro');
                    $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
                    $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
                    $("#btnDinamicasGrupal").removeClass('verdeOscuro');
                    $("#btnDinamicasIndividual").removeClass('verdeOscuro');


                    $.ajax({
                        type: "POST",
                        url:"http://www.apps.laconexioncreadora.com/php/calificacion_dinamicas.php",
                        success:function(result){
                            $('#contenidoDinamicas').html(' ');

                            for(j=0; j < result.length; j++) {
                                for(i = 0; i < resultadosDinamicas.length; i++) {
                                        if (resultadosDinamicas[i].id === result[j].dinamica && result[j].calificacion == 2) {
                                                if(resultadosDinamicas[i].favorito == 1) {
                                                    $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                    cantUsuarios(resultadosDinamicas[i].id, i);
                                                } else {
                                                    $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a "><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                    cantUsuarios(resultadosDinamicas[i].id, i);
                                                }
                                            }
                                    }
                            }
                        }

                    });

            } else {

                    $(this).removeClass('verdeOscuro');

                    verDinamicas();

            }


        });

});


        //:::::::::::::::::::::::::::::::::::::: Funcion para ordenar las dinamicas por "Genial"
$(function(){

        $("#btnDinaimcasGeniales").click(function() {

            if($(this).css("background-color") === "rgb(55, 234, 193)"){

                        $(this).addClass('verdeOscuro');
                        $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
                        $("#btnDescripcionDinamica").removeClass('verdeOscuro');
                        $("#btnObjetivosDinamica").removeClass('verdeOscuro');
                        $("#btnNombreDinamica").removeClass('verdeOscuro');
                        $("#btnDinamicasRecientes").removeClass('verdeOscuro');
                        $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
                        $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
                        $("#btnDinamicasGrupal").removeClass('verdeOscuro');
                        $("#btnDinamicasIndividual").removeClass('verdeOscuro');


                        $.ajax({
                            type: "POST",
                            url:"http://www.apps.laconexioncreadora.com/php/calificacion_dinamicas.php",
                            success:function(result){
                                $('#contenidoDinamicas').html(' ');

                                for(j=0; j < result.length; j++) {
                                    for(i = 0; i < resultadosDinamicas.length; i++) {
                                            if (resultadosDinamicas[i].id === result[j].dinamica && result[j].calificacion == 3) {
                                                    if(resultadosDinamicas[i].favorito == 1) {
                                                        $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                        cantUsuarios(resultadosDinamicas[i].id, i);
                                                    } else {
                                                        $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a "><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                        cantUsuarios(resultadosDinamicas[i].id, i);
                                                    }
                                                }
                                        }
                                }
                            }

                        });

            } else {

                    $(this).removeClass('verdeOscuro');

                    verDinamicas();

            }

        });

});



        //:::::::::::::::::::::::::::::::::: Funcion para mostrar las dinamicas por grupal :::::::::::::::::
$(function(){

        $("#btnDinamicasGrupal").click(function() {

            if($(this).css("background-color") === "rgb(55, 234, 193)"){

                    $(this).addClass('verdeOscuro');
                    $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
                    $("#btnDescripcionDinamica").removeClass('verdeOscuro');
                    $("#btnObjetivosDinamica").removeClass('verdeOscuro');
                    $("#btnNombreDinamica").removeClass('verdeOscuro');
                    $("#btnDinamicasRecientes").removeClass('verdeOscuro');
                    $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
                    $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
                    $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
                    $("#btnDinamicasIndividual").removeClass('verdeOscuro');

                    $.ajax({

                        type: "POST",
                        url: "http://www.apps.laconexioncreadora.com/php/conexion_dinamica.php",
                        success:function(result){
                            $("#contenidoDinamicas").html(" ");
                            for(i=0; i < result.length; i++) {
                                if(result[i].nametype === "Grupal") {
                                    if(result[i].favorito == 1) {
                                            $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+result[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+result[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+result[i].name+'</span><p class="tipoDinamica">'+result[i].nametype+' - '+result[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+result[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                            cantUsuarios(resultadosDinamicas[i].id, i);
                                        } else {
                                            $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a "><img src="'+url+result[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+result[i].title+'</span></p><span class="autorDinamica">'+result[i].name+'</span><p class="tipoDinamica">'+result[i].nametype+' - '+result[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+result[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                            cantUsuarios(resultadosDinamicas[i].id, i);
                                        }
                                    resultadosDinamicas[i] = result[i];
                                }
                            }
                        }

                    });

            } else {

                $(this).removeClass('verdeOscuro');

                verDinamicas();

            }

        });

});



                //:::::::::::::::::::::::::::::::::: Funcion para mostrar las dinamicas por Individual :::::::::::::::::
$(function(){

                $("#btnDinamicasIndividual").click(function() {

                if($(this).css("background-color") === "rgb(55, 234, 193)"){

                        $(this).addClass('verdeOscuro');

                        $("#btnDinamicaAleatoria").removeClass('verdeOscuro');
                        $("#btnDescripcionDinamica").removeClass('verdeOscuro');
                        $("#btnObjetivosDinamica").removeClass('verdeOscuro');
                        $("#btnNombreDinamica").removeClass('verdeOscuro');
                        $("#btnDinamicasRecientes").removeClass('verdeOscuro');
                        $("#btnDinamicasInspiradoras").removeClass('verdeOscuro');
                        $("#btnDinamicasPracitcas").removeClass('verdeOscuro');
                        $("#btnDinaimcasGeniales").removeClass('verdeOscuro');
                        $("#btnDinamicasGrupal").removeClass('verdeOscuro');

                            $.ajax({
                                type: "POST",
                                url: "http://www.apps.laconexioncreadora.com/php/conexion_dinamica.php",
                                success:function(result){
                                    $('#contenidoDinamicas').html(' ');
                                    for(i=0; i < result.length; i++) {
                                        if(result[i].nametype === "Individual") {
                                            if(result[i].favorito === "1") {
                                                    $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a"><img src="'+url+result[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+result[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+result[i].name+'</span><p class="tipoDinamica">'+result[i].nametype+' - '+result[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+result[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                    cantUsuarios(resultadosDinamicas[i].id, i);
                                                } else {
                                                    $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a "><img src="'+url+result[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+result[i].title+'</span></p><span class="autorDinamica">'+result[i].name+'</span><p class="tipoDinamica">'+result[i].nametype+' - '+result[i].nameTypeUser+'</p><p class="estadisticasDinamica"><span id="cantidadUsuarios'+i+'"></span> usuarios | '+result[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#contenidoDinamicas');
                                                    cantUsuarios(resultadosDinamicas[i].id, i);
                                                }
                                                resultadosDinamicas[i] = result[i];
                                        }
                                    }
                                }

                            });

                } else {

                        $(this).removeClass('verdeOscuro');

                        verDinamicas();

                }

                });

});


function verDinamica(posicion) {
    $("#imgDinamica").attr("src", url+resultadosDinamicas[posicion].image);
    $("#imageDinamicaAmpliada").attr("src", url+resultadosDinamicas[posicion].image);
    $('#tituloInfoDinamica').html(resultadosDinamicas[posicion].title);
    $('#nombreInfoCreador').html(resultadosDinamicas[posicion].name);
    $('#tipoInfoDinamica').html(resultadosDinamicas[posicion].nametype);
    $('#tipoInfoUsuario').html(resultadosDinamicas[posicion].nameTypeUser);
    $('#duracionDinamica').html(resultadosDinamicas[posicion].duration);
    $('#votosDinamica').html(resultadosDinamicas[posicion].hits);
    $('#descripcionDinamica').html(resultadosDinamicas[posicion].descripcion);
    $('#objetivosDinamica').html(resultadosDinamicas[posicion].objetivos);
    $('#resultadosDinamicas').html(resultadosDinamicas[posicion].resultados);
    dinamica_id = resultadosDinamicas[posicion].id;
}


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::...        Slider de Imagenes  ::::::::::::::::::::::::::::::::::

function sliderImagenes(){

    //Barra de progreso
    $.mobile.loading( 'show', {
        text: 'Cargando',
        textVisible: true,
        theme: 'c',
        html: ""
    });

    var valor = {
            "dinamica_id": dinamica_id
        };

     $.ajax({
         data: valor,
        url: "http://www.apps.laconexioncreadora.com/php/sliderImagenes.php",
        type: "POST",

        success:function(result){
            $(".fotorama").html(" ");
            var cantImgSlider = result.length;
            $(".swiper-wrapper").html("");

            for(i = 0; i < result.length; i++) {

                if(i+1 == cantImgSlider) {
                    swiper.appendSlide('<div class="swiper-slide"><img src="'+result[i].imagen+'" class="imgSlider" onClick="pageNuevaCreacion();"></div>');

                } else {
                    swiper.appendSlide('<div class="swiper-slide"><img src="'+result[i].imagen+'" class="imgSlider"></div>');
                }
            }
            if(i == 0) {
                pageNuevaCreacion();
            } else {
                pageSlider();
            }
        }

    });

}

function pageNuevaCreacion(){
    $("#nombreCreacion").val("");
    $("#descripCreacion").val("");
    $("#expCreacion").val("");
    $("#imgCamara1").attr("src", "");
    $("#imgCamara2").attr("src", "");
    $("#imgCamara3").attr("src", "");
    $("#imgCamara4").attr("src", "");
    cantImage = 1;

    $.mobile.loading('hide');

    $("#btnDinamicaAleatoria").removeClass("verdeOscuro");

    $.mobile.changePage("#pageNuevaCreacion", { transition: "slideup"});
}

function pageSlider() {

    $(".fotorama__img").attr("src", "");

    $.mobile.loading('hide');

    $("#btnDinamicaAleatoria").removeClass("verdeOscuro");

    $.mobile.changePage( "#pageSlider", { transition: "slideup"});
}

function calificarDinamica(num) {

    if (intentos == 1) {
            $("#btnCalificar" + num).css("background-color", "rgb(3, 164, 144)");
            var num = num;
            var dinamica_calif = dinamica_id;

            intentos++;

            $.ajax({
                data: ({num: num, dinamica_id: dinamica_calif}),
                url: "http://www.apps.laconexioncreadora.com/php/calificar_dinamica.php",
                type: 'POST',

            });
        }
}




//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::..... CREACIONES :::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var resultadosCreaciones = [];
var contC, tipoCreacion, id_creacion;

            //:::::::::::::::::::::::::::::::::::::::::::::.. BUSCAR POR ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            //:::::::::::::::::::::::::::::::::: Funcion para mostrar las creaciones por descripción :::::::::::::::::
$(function(){

                $("#btnDescripcionCreacion").click(function() {

                    if($(this).css("background-color") === "rgb(55, 234, 193)"){

                            $(this).addClass('verdeOscuro');
                            $("#btnObjetivoCreacion").removeClass('verdeOscuro');
                            $("#btnNombreCreacion").removeClass('verdeOscuro');
                            $("#btnTagsCreacion").removeClass('verdeOscuro');
                            $("#btnRecientesCreacion").removeClass('verdeOscuro');
                            $("#btnCreacionGrupal").removeClass('verdeOscuro');
                            $("#btnCreacionIndividual").removeClass('verdeOscuro');

                            var valor = {
                            "descr": $("#filtroCreaciones").val(),
                            "id_user": id_user
                            };

                            $.ajax({
                                data: valor,

                                url: "http://www.apps.laconexioncreadora.com/php/descrp_creacion.php",
                                type: 'POST',

                                success: function(respuesta) {

                                    $("#contenidoCreaciones").html("");

                                    for(i = 0; i < contC; i++){

                                            for(j = 0; j < respuesta.length; j++) {

                                                if(resultadosCreaciones[i].descripcion === respuesta[j].descripcion){

                                                        if(id_user === resultadosCreaciones[i].user_id) {

                                                                $( '<a href="#pageInfoCreaciones" onclick="verCreacion('+i+')" data-transition="slideup"><div class="creaciones"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+resultadosCreaciones[i].image+'" class="fondoOscuro imagenCreacion"></div><div class="ui-block-b"><p class="tituloCreacion">'+resultadosCreaciones[i].name+'</p><span class="autorCreacion">'+resultadosCreaciones[i].nameCreador+'</span><p class="tipoCreacion">'+resultadosCreaciones[i].nameTypeDinamica+' | '+resultadosCreaciones[i].creation_date+'</p><p class="estadisticasCreacion">'+resultadosCreaciones[i].nameTypeCreacion+'</p></div></div></div></a>' ).appendTo( '#contenidoCreaciones');
                                                        
                                                        }
                                                }
                                            }
                                        }


                                }
                            });

                    } else {

                            $(this).removeClass('verdeOscuro');

                            creaciones_ususario();

                    }

                });

});                




            //:::::::::::::::::::::::::::::::::: Funcion para mostrar las creaciones por nombre :::::::::::::::::

$(function(){

                $("#btnNombreCreacion").click(function() {

                    if($(this).css("background-color") === "rgb(55, 234, 193)"){

                            $(this).addClass('verdeOscuro');
                            $("#btnObjetivoCreacion").removeClass('verdeOscuro');
                            $("#btnDescripcionCreacion").removeClass('verdeOscuro');
                            $("#btnTagsCreacion").removeClass('verdeOscuro');
                            $("#btnRecientesCreacion").removeClass('verdeOscuro');
                            $("#btnCreacionGrupal").removeClass('verdeOscuro');
                            $("#btnCreacionIndividual").removeClass('verdeOscuro');

                            var valor = {
                            "descr": $("#filtroCreaciones").val()
                            };

                            $.ajax({
                                data: valor,

                                url: "http://www.apps.laconexioncreadora.com/php/nombres_creaciones.php",
                                type: 'POST',

                                success: function(respuesta) {
                                $("#contenidoCreaciones").html(" ");

                                    for(j = 0; j < respuesta.length; j++){
                                            for(i = 0; i < contC; i++) {
                                                    if(resultadosCreaciones[i].name === respuesta[j].nombre){
                                                            if(id_user === resultadosCreaciones[i].user_id) {
                                                                    $( '<a href="#pageInfoCreaciones" onclick="verCreacion('+i+')" data-transition="slideup"><div class="creaciones"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+resultadosCreaciones[i].image+'" class="fondoOscuro imagenCreacion"></div><div class="ui-block-b"><p class="tituloCreacion">'+resultadosCreaciones[i].name+'</p><span class="autorCreacion">'+resultadosCreaciones[i].nameCreador+'</span><p class="tipoCreacion">'+resultadosCreaciones[i].nameTypeDinamica+' | '+resultadosCreaciones[i].creation_date+'</p><p class="estadisticasCreacion">'+resultadosCreaciones[i].nameTypeCreacion+'</p></div></div></div></a>' ).appendTo( '#contenidoCreaciones');
                                                            }
                                                        }

                                                }
                                        }


                                }
                            });

                    } else {

                            $(this).removeClass('verdeOscuro');

                            creaciones_ususario();

                    }

                });

});



            //::::::::::::::::::::::::::::::::::::::::::::::::: ORDENAR POR :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            //:::::::::::::::::::::::::::::::::::::: Funcion ordenar por fecha cuando se oprima el boton "recientes"
$(function(){

            $("#btnRecientesCreacion").click(function() {

                    if($(this).css("background-color") === "rgb(55, 234, 193)") {

                            $(this).addClass('verdeOscuro');
                            $("#btnObjetivoCreacion").removeClass('verdeOscuro');
                            $("#btnDescripcionCreacion").removeClass('verdeOscuro');
                            $("#btnTagsCreacion").removeClass('verdeOscuro');
                            $("#btnNombreCreacion").removeClass('verdeOscuro');
                            $("#btnCreacionGrupal").removeClass('verdeOscuro');
                            $("#btnCreacionIndividual").removeClass('verdeOscuro');

                            var valor = {
                            "id_user": id_user
                            };


                                $.ajax({

                                    data: valor,

                                    type: "POST",

                                    url:"http://www.apps.laconexioncreadora.com/php/conexion_creacion_order.php",
                                    success:function(result){
                                        $("#contenidoCreaciones").html("");
                                        for(i=0; i < result.length; i++) {
                                            if(id_user === result[i].user_id) {

                                                    $( '<a href="#pageInfoCreaciones" onclick="verCreacion('+i+')" data-transition="slideup"><div class="creaciones"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img creaciones" class="fondoOscuro imagenCreacion"></div><div class="ui-block-b"><p class="tituloCreacion">'+result[i].name+'</p><span class="autorCreacion">'+result[i].nameCreador+'</span><p class="tipoCreacion">'+result[i].nameTypeDinamica+' | '+result[i].creation_date+'</p><p class="estadisticasCreacion">'+result[i].nameTypeCreacion+'</p></div></div></div></a>' ).appendTo( '#contenidoCreaciones');
                                            }
                                            resultadosCreaciones[i] = result[i];
                                        }
                                     }

                                });

                    } else {

                            $(this).removeClass('verdeOscuro');

                            creaciones_ususario();

                    }

         });

});


         //:::::::::::::::::::::::::::::::::::::: Funcion ordenar por fecha cuando se oprima el boton "Grupal"
        // $("#btnCreacionGrupal").click(function() {

        //         $(this).toggleClass('verdeOscuro');
        //         $("#btnObjetivoCreacion").removeClass('verdeOscuro');
        //         $("#btnDescripcionCreacion").removeClass('verdeOscuro');
        //         $("#btnTagsCreacion").removeClass('verdeOscuro');
        //         $("#btnNombreCreacion").removeClass('verdeOscuro');
        //         $("#btnRecientesCreacion").removeClass('verdeOscuro');
        //         $("#btnCreacionIndividual").removeClass('verdeOscuro');

        //     $.ajax({
        //         type: "POST",
        //         url:"http://www.apps.laconexioncreadora.com/php/conexion_creacion.php",
        //         success:function(result){
        //             $("#contenidoCreaciones").html("");
        //             var conTipoCreacion = 0;
        //             for(i=0; i < result.length; i++) {
        //                 if (result[i].nameTypeDinamica === "Grupal") {
        //                     if(id_user === result[i].user_id) {
        //                         $( '<a href="#pageInfoCreaciones" onclick="verCreacion('+i+')"><div class="creaciones" data-transition="slideup"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img creaciones" width="100" class="fondoOscuro"></div><div class="ui-block-b"><p class="tituloCreacion">'+result[i].name+'</p><span class="autorCreacion">'+result[i].nameCreador+'</span><p class="tipoCreacion">'+result[i].nameTypeDinamica+' | '+result[i].creation_date+'</p><p class="estadisticasCreacion">'+result[i].nameTypeCreacion+'</p></div></div></div></a>' ).appendTo( '#contenidoCreaciones');
        //                     }
        //                     conTipoCreacion++;
        //                 }
        //                 resultadosCreaciones[i] = result[i];
        //             }

        //             //Si no hay creaciones grupales muesra una alerta
        //             if(conTipoCreacion === 0) {
        //                 errorGrupal();
        //             }
        //         }

        //     });
        // });


        //  //:::::::::::::::::::::::::::::::::::::: Funcion ordenar por fecha cuando se oprima el boton "Individual"
        // $("#btnCreacionIndividual").click(function() {

        //         $(this).toggleClass('verdeOscuro');
        //         $("#btnObjetivoCreacion").removeClass('verdeOscuro');
        //         $("#btnDescripcionCreacion").removeClass('verdeOscuro');
        //         $("#btnTagsCreacion").removeClass('verdeOscuro');
        //         $("#btnNombreCreacion").removeClass('verdeOscuro');
        //         $("#btnRecientesCreacion").removeClass('verdeOscuro');
        //         $("#btnCreacionGrupal").removeClass('verdeOscuro');

        //     $.ajax({
        //         type: "POST",
        //         url:"http://www.apps.laconexioncreadora.com/php/conexion_creacion.php",
        //         success:function(result){
        //             $("#contenidoCreaciones").html("");
        //             for(i=0; i < result.length; i++) {
        //                 if (result[i].nameTypeDinamica === "Individual") {
        //                     if(id_user === result[i].user_id) {
        //                         $( '<a href="#pageInfoCreaciones" onclick="verCreacion('+i+')"><div class="creaciones" data-transition="slideup"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img creaciones" width="100" class="fondoOscuro"></div><div class="ui-block-b"><p class="tituloCreacion">'+result[i].name+'</p><span class="autorCreacion">'+result[i].nameCreador+'</span><p class="tipoCreacion">'+result[i].nameTypeDinamica+' | '+result[i].creation_date+'</p><p class="estadisticasCreacion">'+result[i].nameTypeCreacion+'</p></div></div></div></a>' ).appendTo( '#contenidoCreaciones');
        //                     }
        //                 }
        //                 resultadosCreaciones[i] = result[i];
        //             }
        //         }

        //     });
        // });

function verCreacion(index) {

    $("#imgCreacion").attr("src", url+resultadosCreaciones[index].image);
    $("#imagenAmpliadaCreacion").attr("src", url+resultadosCreaciones[index].image);

    $('#tituloInfoCreacion').html(resultadosCreaciones[index].name);
    $('#nombreInfCreador').html(resultadosCreaciones[index].nameCreador);
    $('#tipoInfoCreacion').html(resultadosCreaciones[index].nameTypeDinamica);
    $('#estadisticasInfoCreacion').html(resultadosCreaciones[index].nameTypeCreacion);
    $('#fechaCreacion').html(resultadosCreaciones[index].creation_date);

    $("#img1").attr("src", "");
    $("#img2").attr("src", "");
    $("#img3").attr("src", "");

    $("#img1").show();
    $("#img2").show();
    $("#img3").show();


    if(resultadosCreaciones[index].img1 != "img/creacion/" && resultadosCreaciones[index].img1 != "") {
        $("#img1").attr("src", url+resultadosCreaciones[index].img1);
    } else {
        $("#img1").hide();
    }

    if(resultadosCreaciones[index].img2 != "img/creacion/" && resultadosCreaciones[index].img2 != "") {
        $("#img2").attr("src", url+resultadosCreaciones[index].img2);
    } else {
        $("#img2").hide();
    }

    if(resultadosCreaciones[index].img3 != "img/creacion/" && resultadosCreaciones[index].img3 != "") {
        $("#img3").attr("src", url+resultadosCreaciones[index].img3);
    } else {
        $("#img3").hide();
    }


    $("#image1").attr("src", url+resultadosCreaciones[index].img1);
    $("#image2").attr("src", url+resultadosCreaciones[index].img2);
    $("#image3").attr("src", url+resultadosCreaciones[index].img3);

    $('#descripcionCreacion').html(resultadosCreaciones[index].descripcion);
    $('#explicacionCreacion').html(resultadosCreaciones[index].explicacion);

    id_creacion = resultadosCreaciones[index].id;
    }




$(function() {
    $("#btnBorrarCreacion").click(function() {

        //Barra de progreso
        $.mobile.loading( 'show', {
            text: 'Cargando',
            textVisible: true,
            theme: 'c',
            html: ""
        });

        var creacion = id_creacion;

        $.ajax({type: "POST",

            url: "http://www.apps.laconexioncreadora.com/php/eliminar_creacion.php",
            data: ({id_creacion: creacion}),
            cache: false,
            dataType: "text",

            success: function(data){
                creaciones_ususario();
                verDinamicas();

                $.mobile.loading( 'hide');

                alert(data);

                $.mobile.changePage( "#pageCreaciones", { transition: "slideup"});
            }
        });

    });
});




        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::. MENTORES :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::  peticiones al archivo conexion_cocreador.php ::::::::::::::::::::::::::::://

var resultadosMentores = [], dinamicasMentor = [], votosMentor = [];
var contM = 0, numeroMayor = 0, totalVotos = 0;

function verMentores() {

            $.ajax({
                type: "POST",
                url: "http://www.apps.laconexioncreadora.com/php/conexion_cocreador.php",
                success:function(result){

                        $("#contenedorMentores").html("");

                        for(i=0; i < result.length; i++) {
                            resultadosMentores[i] = result[i];


                            if  (result[i].favorito == 1) {
                                        $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+result[i].name+' <img src="img/estrella.png" alt="" width="17"></p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                        cantDinamicas(result[i].id, i);
                                        cantVotos(result[i].id, i);
                                    }
                                contM++;
                            }
                            for(i = 0; i < result.length; i++) {

                                    if(result[i].favorito == 0) {
                                        $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+result[i].name+'</p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                        cantDinamicas(result[i].id, i);
                                        cantVotos(result[i].id, i);
                                    }
                                }
                            $('#cantMentores').html(contM);
                             }

                });

}            



// Aca se trae la contidad de dinamicas por mentor
function cantDinamicas(id_mentor, i) {
        var valor = {
            "id_mentor": id_mentor
        };

        $.ajax({ //funcion de ajax
            data: valor,
            url: "http://www.apps.laconexioncreadora.com/php/cant_dinamicas.php",
            type: 'POST',

            success: function(respuesta) {  //recibimos la respuesta del servidor
            $("#catidadDinamicas"+i).html(respuesta);

            dinamicasMentor[i] = respuesta;

            if(numeroMayor < respuesta) {
                numeroMayor = respuesta;
                }

            }
        });
    }




// Aca se trae la contidad de votos que tiene cada mentor
function cantVotos(id_mentor, i) {
        var valor = {
            "id_mentor": id_mentor
        };

        $.ajax({ //funcion de ajax
            data: valor,
            url: "http://www.apps.laconexioncreadora.com/php/cant_hits.php",
            type: 'POST',

            success: function(respuesta) {  //recibimos la respuesta del servidor
            $("#cantidadHits"+i).html(respuesta);

            votosMentor[i] = parseInt(respuesta);

            if(totalVotos < parseInt(respuesta)){
                totalVotos = parseInt(respuesta);
                }
            }

        });
    }



                //:::::::::::::::::::::::::::::::::::::::::::::::::::::::: BUSCAR POR ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


            //:::::::::::::::::::::::::::::::::: Funcion para mostrar los mentores por Descripción :::::::::::::::::

$(function(){

                $("#btnDescripcionMentor").click(function() {

                    if($(this).css("background-color") === "rgb(55, 234, 193)"){

                            $(this).addClass('verdeOscuro');
                            $("#btnNombreMentor").removeClass('verdeOscuro');
                            $("#btnDinamicasMentor").removeClass('verdeOscuro');
                            $("#btnPopularMentor").removeClass('verdeOscuro');
                            $("#btnMentoresRecientes").removeClass('verdeOscuro');

                            var valor = {
                            "descr": $("#filtroMentores").val()
                            };

                            $.ajax({
                                data: valor,

                                url: "http://www.apps.laconexioncreadora.com/php/descrp_mentor.php",
                                type: 'POST',

                                success: function(respuesta) {
                                    $("#contenedorMentores").html("");

                                    for(j = 0; j < respuesta.length; j++){
                                            for(i = 0; i < resultadosMentores.length; i++) {

                                                    if(resultadosMentores[i].perfil === respuesta[j].perfil){

                                                            if  (resultadosMentores[i].favorito == 1) {
                                                                    $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+resultadosMentores[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+resultadosMentores[i].name+' <img src="img/estrella.png" alt="" width="17"></p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                                                    cantDinamicas(resultadosMentores[i].id, i);
                                                                    cantVotos(resultadosMentores[i].id, i);
                                                            } else {
                                                                    $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+resultadosMentores[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+resultadosMentores[i].name+'</p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                                                    cantDinamicas(resultadosMentores[i].id, i);
                                                                    cantVotos(resultadosMentores[i].id, i);
                                                            }
                                                        }

                                                }
                                        }


                                }
                            });

                    } else {

                            $(this).removeClass('verdeOscuro');

                            verMentores();

                    }


                });

});




            //:::::::::::::::::::::::::::::::::: Funcion para mostrar los mentores por nombre :::::::::::::::::

$(function(){

        $("#btnNombreMentor").click(function() {

            if($(this).css("background-color") === "rgb(55, 234, 193)"){

                    $(this).addClass('verdeOscuro');
                    $("#btnDescripcionMentor").removeClass('verdeOscuro');
                    $("#btnDinamicasMentor").removeClass('verdeOscuro');
                    $("#btnPopularMentor").removeClass('verdeOscuro');
                    $("#btnMentoresRecientes").removeClass('verdeOscuro');

                    var valor = {
                    "descr": $("#filtroMentores").val()
                    };

                    $.ajax({
                        data: valor,

                        url: "http://www.apps.laconexioncreadora.com/php/nombres_mentores.php",
                        type: 'POST',

                        success: function(respuesta) {
                            $("#contenedorMentores").html(" ");

                            for(j = 0; j < respuesta.length; j++){
                                    for(i = 0; i < resultadosMentores.length; i++) {

                                            if(resultadosMentores[i].name === respuesta[j].nombre){
                                                    if  (resultadosMentores[i].favorito == 1) {
                                                            $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+resultadosMentores[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+resultadosMentores[i].name+' <img src="img/estrella.png" alt="" width="17"></p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                                            cantDinamicas(resultadosMentores[i].id, i);
                                                            cantVotos(resultadosMentores[i].id, i);
                                                    } else {
                                                            $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+resultadosMentores[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+resultadosMentores[i].name+'</p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                                            cantDinamicas(resultadosMentores[i].id, i);
                                                            cantVotos(resultadosMentores[i].id, i);
                                                    }
                                                }

                                        }
                                }


                        }
                    });

            } else {

                    $(this).removeClass('verdeOscuro');

                    verMentores();

            }

        });

});




                //:::::::::::::::::::::::::::::::::::::::::::::::::::::::: ORDENAR POR ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


                //:::::::::::::::::::::::::::::::::::::: Funcion ordenar por cantidad de dinámicas cuando se oprima el boton "Dinámicas"

$(function(){

                $("#btnDinamicasMentor").click(function() {

                    if($(this).css("background-color") === "rgb(55, 234, 193)"){

                        $(this).addClass('verdeOscuro');
                        $("#btnDescripcionMentor").removeClass('verdeOscuro');
                        $("#btnNombreMentor").removeClass('verdeOscuro');
                        $("#btnPopularMentor").removeClass('verdeOscuro');
                        $("#btnMentoresRecientes").removeClass('verdeOscuro');

                        $.ajax({
                            type: "POST",
                            url: "http://www.apps.laconexioncreadora.com/php/conexion_cocreador.php",
                            success:function(result){
                                $('#contenedorMentores').html(' ');
                                for(i=0; i < dinamicasMentor.length; i++) {

                                    if(dinamicasMentor[i] <= numeroMayor) {
                                            if(result[i].favorito == 1) {
                                                $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+result[i].name+' <img src="img/estrella.png" alt="" width="17"></p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                                cantDinamicas(result[i].id, i);
                                                cantVotos(result[i].id, i);
                                            } else {
                                                $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+result[i].name+'</p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                                cantDinamicas(result[i].id, i);
                                                cantVotos(result[i].id, i);
                                                numeroMayor--;
                                            }
                                        }
                                    resultadosMentores[i] = result[i];
                                }
                            }

                        });

                    } else {

                            $(this).removeClass('verdeOscuro');

                            verMentores();
                    }

            });

});




                            //:::::::::::::::::::::::::::::::::::::: Funcion ordenar por cantidad de votos cuando se oprima el boton "popular"

$(function(){

                        $("#btnPopularMentor").click(function() {

                            if($(this).css("background-color") === "rgb(55, 234, 193)"){

                                    $(this).addClass('verdeOscuro');
                                    $("#btnDescripcionMentor").removeClass('verdeOscuro');
                                    $("#btnNombreMentor").removeClass('verdeOscuro');
                                    $("#btnDinamicasMentor").removeClass('verdeOscuro');
                                    $("#btnMentoresRecientes").removeClass('verdeOscuro');

                                    $.ajax({
                                        type: "POST",
                                        url: "http://www.apps.laconexioncreadora.com/php/conexion_cocreador.php",
                                        success:function(result){
                                             $('#contenedorMentores').html(' ');

                                             for(i=0; i < votosMentor.length; i++) {

                                                if(votosMentor[i] <= totalVotos) {

                                                        if(result[i].favorito == 1) {
                                                            $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+result[i].name+' <img src="img/estrella.png" alt="" width="17"></p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                                            cantDinamicas(result[i].id, i);
                                                            cantVotos(result[i].id, i);
                                                        } else {
                                                            $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+result[i].name+'</p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                                            cantDinamicas(result[i].id, i);
                                                            cantVotos(result[i].id, i);
                                                        }
                                                        totalVotos--;
                                                    }
                                                resultadosMentores[i] = result[i];
                                             }
                                        }

                                    });

                            } else {

                                    $(this).removeClass('verdeOscuro');

                                    verMentores();

                            }

                    });

});






                //:::::::::::::::::::::::::::::::::::::: Funcion ordenar por fecha cuando se oprima el boton "recientes"
$(function(){

                $("#btnMentoresRecientes").click(function() {

                    if($(this).css("background-color") === "rgb(55, 234, 193)"){

                        $(this).addClass('verdeOscuro');
                        $("#btnDescripcionMentor").removeClass('verdeOscuro');
                        $("#btnNombreMentor").removeClass('verdeOscuro');
                        $("#btnDinamicasMentor").removeClass('verdeOscuro');
                        $("#btnPopularMentor").removeClass('verdeOscuro');

                        $.ajax({
                            type: "POST",
                            url:"http://www.apps.laconexioncreadora.com/php/conexion_cocreador_desc.php",
                            success:function(result){
                                $('#contenedorMentores').html(' ');
                                for(i=0; i < result.length; i++) {
                                    if(result[i].favorito == 1) {
                                        $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+result[i].name+' <img src="img/estrella.png" alt="" width="17"></p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                        cantDinamicas(result[i].id, i);
                                        cantVotos(result[i].id, i);
                                    } else {
                                        $( '<a href="#" onClick="verMentor('+i+')" data-transition="slideup"><div class="mentores"><div class="ui-grid-a"><div class="ui-block-a text-left"><img src="http://www.apps.laconexioncreadora.com/media/'+result[i].image+'" alt="img mentores" class="fondoOscuro fotoMentor"></div><div class="ui-block-b"><div><p class="nombreMentor">'+result[i].name+'</p></div><br><div><p class="estadisticaMentor"><span id="catidadDinamicas'+i+'"></span> dinamicas | <span id="cantidadHits'+i+'"></span> voto(s)</p></div></div></div></div></a>' ).appendTo( '#contenedorMentores');
                                        cantDinamicas(result[i].id, i);
                                        cantVotos(result[i].id, i);

                                    }
                                    resultadosMentores[i] = result[i];
                                }
                            }

                        });

                    } else {

                            $(this).removeClass('verdeOscuro');

                            verMentores();

                    }

            });

});



function verMentor(posicion) {

        //Barra de progreso
        $.mobile.loading( 'show', {
            text: 'Cargando',
            textVisible: true,
            theme: 'c',
            html: ""
        });

        $("#redesSocialesMentores").html("");

        $("#imgMentor").attr("src", url+resultadosMentores[posicion].image);
        $("#imagenApliadaMentor").attr("src", url+resultadosMentores[posicion].image);

        $('#nombreInfoMentor').html(resultadosMentores[posicion].name);
        $('#perfilMentor').html(resultadosMentores[posicion].perfil);

        $( '#redesSocialesMentores').html('<a href="'+resultadosMentores[posicion].facebook+'"><img src="img/facebook.jpg" alt="img facebook" id="imgFacebookMentor" class="iconosSocialesGris"></a><a href="'+resultadosMentores[posicion].twitter+'"><img src="img/twitter.jpg" alt="img twitter" id="imgTwitterMentor" class="iconosSocialesGris"></a><a href="'+resultadosMentores[posicion].linkedin+'"><img src="img/In.jpg" alt="img in" id="imgInMentor" class="iconosSocialesGris"></a><a href="'+resultadosMentores[posicion].website+'"><img src="img/web.png" alt="img Web" id="imgWebMentor" class="iconosSocialesGris"></a>');

        //Redes sociales Mentores
        if(resultadosMentores[posicion].facebook) {
            $("#imgFacebookMentor").removeClass("iconosSocialesGris");
        }

        if(resultadosMentores[posicion].twitter) {
            $("#imgTwitterMentor").removeClass("iconosSocialesGris");
        }

        if(resultadosMentores[posicion].linkedin) {
            $("#imgInMentor").removeClass("iconosSocialesGris");
        }

        if(resultadosMentores[posicion].website) {
            $("#imgWebMentor").removeClass("iconosSocialesGris");
        }


        $('#dinamicasMentor').html('');
        for (var i=0; i<contD; i++) {
            if(resultadosMentores[posicion].id == resultadosDinamicas[i].author_id) {
                if(resultadosDinamicas[i].favorito == 1){
                    $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a "><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span><img src="img/estrella.png" alt="" width="17"></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica">'+usuariosDinamica[i]+' usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#dinamicasMentor');
                }
                } else {
                        $( '' ).appendTo( '#dinamicasMentor');
                    }
        }
        for (i=0; i<contD; i++) {
            if(resultadosMentores[posicion].id == resultadosDinamicas[i].author_id) {
                if(resultadosDinamicas[i].favorito == 0){
                    $( '<a href="#pageInfoDinamica" onclick="verDinamica('+i+')" data-transition="slideup"><div class="dinamicas text-left"><div class="ui-grid-a"><div class="ui-block-a "><img src="'+url+resultadosDinamicas[i].image+'" alt="img dinamicas" width="90" class="fondoOscuro"></div><div class="ui-block-b"><p><span class="tituloDinamica">'+resultadosDinamicas[i].title+'</span></p><span class="autorDinamica">'+resultadosDinamicas[i].name+'</span><p class="tipoDinamica">'+resultadosDinamicas[i].nametype+' - '+resultadosDinamicas[i].nameTypeUser+'</p><p class="estadisticasDinamica">'+usuariosDinamica[i]+' usuarios | '+resultadosDinamicas[i].hits+' votos</p></div></div></div></a>' ).appendTo( '#dinamicasMentor');
                }
                } else {
                        $( '' ).appendTo( '#dinamicasMentor');
                    }
        }


        //Barra de progreso
        $.mobile.loading('hide');

        $.mobile.changePage( "#pageInfoMentor", { transition: "slideup"});


    }


/***************    Obtener foto desde la camara    ****************************************************/

    var nameImage = [];
    var cantImage = 1;

    function hacerFoto(){
        if(cantImage <5){
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 60,
                    allowEdit: true,
                    targetWidth: 250,
                    targetHeight: 250,
                    correctOrientation: true,
                    saveToPhotoAlbum: true,
                    encodingType: Camera.EncodingType.JPEG,
                    destinationType: Camera.DestinationType.FILE_URI });
            } else {
                $("#mensajeCantFotos").html("solo puedes adjuntar máximo 4 fotos");
                cantImage = 1;
                }
    }

    function onSuccess(imageURI) {
        var image = document.getElementById('imgCamara' + cantImage);
        image.src = imageURI;
        subirImagen(imageURI);
        cantImage++;
    }

    function onFail(message) {
        alert(message);
    }

    function subirImagen(fileURL) {
        var options = new FileUploadOptions();
        options.fileKey = "imagen";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        nameImage[cantImage] = options.fileName;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("http://www.apps.laconexioncreadora.com/php/prueba.php"), uploadSuccess, uploadFail, options);
    }

    function uploadSuccess(r) {
        //alert("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
/*      var image = document.getElementById('foto' + cantImage);
        image.src = r.response;*/
    }

    function uploadFail(error) {
        alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
    }



//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::   INICIO BOTONES TAGS NUEVA CREACION ::::::::::::::::::::::::::::::::::::::..

/*********************************  TIPO  DE CREACION   ********************************/


function cambioColor(num){
    var numBtn = num;
    $("#btnTipo"+numBtn).toggleClass('verdeOscuro');
    for(i=0; i<6; i++) {
        if(i != numBtn) {
            $("#btnTipo"+i).removeClass('verdeOscuro');
        }
    }
}



/**********************         TAGS            *******************/

function colorTags(num){
    $("#btnTag"+num).toggleClass('verdeOscuro');
}


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::   FIN BOTONES TAGS NUEVA CREACION ::::::::::::::::::::::::::::::::::::::


//Boton previsualizar
$(function () {
     $("#btnPrevisualizar").click(function() {

         if($('#nombreCreacion').val() === '') {
            $("#mensajeError").html("Por favor ingrese un nombre para la creación");
         } else if ( $('#descripCreacion').val() === '') {
            $("#mensajeError").html("Por favor ingrese una descripción");
         } else if ($("#imgCamara1").attr("src") == "") {
            $("#mensajeError").html("adjunte por lo menos una foto");
         } else {
            $("#tituloNuevaCreacion").html($('#nombreCreacion').val());

            for(i = 1; i < 6; i++) {
                if($("#btnTipo"+i).css("background-color") == "rgb(3, 164, 144)"){
                    $("#tipoNuevaCreacion").html($("#btnTipo"+i).html());
                    tipoCreacion = $("#btnTipo"+i).val();
                    }
                }

            $("#descNuevaCreacion").html($('#descripCreacion').val());
            $("#explicNuevaCreacion").html($('#expCreacion').val());

             for(i = 1; i < 9; i++) {
                if($("#btnTag"+i).css("background-color") == "rgb(3, 164, 144)") {
                    $("#tag"+i).html($("#btnTag"+i).html());
                    }

                 }

            for(i = 1; i <= 4; i++){
                    $("#foto"+i).attr("src", $("#imgCamara"+i).attr("src"));
                    $("#foto"+i).css("height", "45px");
                }

            $.mobile.changePage( "#Pageprevisulizacion", { transition: "slideup", role: "dialog"});

            $("#mensajeCantFotos").html(" ");
            $("#mensajeError").html(" ");
        }
    });
});



//Script Ajax para enviar los datos a la base de datos mysql
$(function() {
    $("#enviardatos").click(function() {

        $("#limiteCreaciones").html("");

    membresia_usuario(userLogin);

        //Barra de progreso
        $.mobile.loading( 'show', {
            text: 'Cargando',
            textVisible: true,
            theme: 'c',
            html: ""
        });

        if(contC < cantidadCreaciones) {

                var tituloNuevaCreacion = $("#tituloNuevaCreacion").html();
                var tipoNuevaCreacion = tipoCreacion;
                var descNuevaCreacion = $("#descNuevaCreacion").html();
                var explicNuevaCreacion = $("#explicNuevaCreacion").html();

                var nameImg1 =  nameImage[1];
                var nameImg2 =  nameImage[2];
                var nameImg3 =  nameImage[3];
                var nameImg4 =  nameImage[4];

                var foto1 = nameImg1;
                var foto2 = nameImg2;
                var foto3 = nameImg3;
                var foto4 = nameImg4;

                var id = id_user;
                var dinamica = dinamica_id;

                 $.ajax({type: "POST",
                        url: "http://www.apps.laconexioncreadora.com/php/insertar.php",
                        data: ({tituloNuevaCreacion: tituloNuevaCreacion, tipoCreacion: tipoNuevaCreacion, descNuevaCreacion: descNuevaCreacion, explicNuevaCreacion: explicNuevaCreacion, nameImg1: foto1, nameImg2: foto2, nameImg3: foto3, nameImg4: foto4, id_user: id, dinamica_id: dinamica}),
                        cache: false,
                        dataType: "text",
                        success: function(data){

                    creaciones_ususario();
                    verDinamicas();

                                $.mobile.loading( 'hide');

                                alert(data);
                    // datosEnviados();
                    $.mobile.changePage( "#pageCreaciones", { transition: "slideup"});
                    }
                });


        } else {

                $.mobile.loading( 'hide');

                $("#limiteCreaciones").html('<p id="errorCreacion">Se ha alcanzado el máximo permitido de creaciones. Para guardar más creaciones obtenga una membresía</p><p id="parradoUrl"><a href="#" id="urlTienda" onClick="page_tienda();">Obterner membresía</a></p>');

        }


    });
});