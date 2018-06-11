/**
 * Created by mdps on 08/06/2018.
 */

//Inicializaciones
var socketio_url = $( "body" ).data( "socketio" );
var socketio_path = $( "body" ).data( "socketio-path" );
var socket = io.connect("http://192.168.2.10:8000",{path: socketio_path});

//Este evento se produce cunado el envirosense-core saca un bucket de datos
//Los buckets pueden estar "completos" o "incompletos"
var lastime = 0;
socket.on('action', function (data) {
    console.log(Math.floor(Date.now() / 1000) - lastime, data);
    lastime = Math.floor(Date.now() / 1000)
});

$( document ).ready(function() {

    console.log("document_ready")

    //Generacion de evento para iniciar sesion, envirosense-core capturara este evento de socket.io
    //e iniciara una sesion con el titulo pasado como parametro, si no se pasa titulo, se asignara
    //uno por defecto en el lado de pyrhon (envirosense-core)
    $('#startsession').on("click", function(e){
        console.log("startsession click")
        // socket.emit('start_session', {title: 'Session con socketio'},function (data) {
        socket.emit('start_session' ,function (data) {
            // #Datos de la sesion iniciada
            console.log("start_session")
            console.log(data)
        });
        e.preventDefault();
    });

    //Evento de finalizacion de sesion, no tiene que enviar ningun parametro, devuelve
    $('#endsession').on("click",function(e){
        e.preventDefault();
        console.log("startsession click")
        socket.emit('end_session',  function (data) {
            // #Datos de la sesion iniciada
            console.log("end_session")
            console.log(data)

        });

    });

// $('#deletesession').click(function(e){
//     socket.emit('delete_session', 'ID_DE_SESION', function (data) {
//         // #Datos de la sesion iniciada
//         console.log("delete_session")
//         console.log(data)
//     });
//     e.preventDefault();
// });
});





