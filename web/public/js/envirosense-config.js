/**
 * Created by mdps on 08/06/2018.
 */
// envirosense_status_label
// envirosense_stop_btn
// envirosense_start_btn
// envirosense_restart_btn
// envirosense_status_btn

var endpoint = '/restarter/';

var call_restarter = function(action){
    $("#envirosense_status_label").html("envirosense-core status: cargando...");
    $.get('/restarter/'+action, function (data) {
        $("#envirosense_status_label").html(data.output);
        // console.log(data);
    })
    .fail(function() {
        $("#envirosense_status_label").html("Error doing command...");
    });
};

$( document ).ready(function() {
    //firmwareupdate_status_label
    $("#ckupdatefrm").on("submit", function(e){
        e.preventDefault();
        console.log("ckupdatefrm on submit")
        $("#firmwareupdate_status_label").html("Actualizando firmware, por favor no cierre la ventana hasta terminar.");
        var formData = new FormData(document.getElementById("ckupdatefrm"));
        // console.log(formData)
        $.ajax({
            url: "/configuracion/ckupdate",
            type: "post",
            dataType: "json",
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
            .done(function(res){
                // console.log(res)
                // console.log(res.status)
                if(res.status == true)
                {
                    $("#firmwareupdate_status_label").html("envirosense-chipkit: Firmware actualizado con exito");
                }
                else
                {
                    $("#firmwareupdate_status_label").html("envirosense-chipkit: Error actualizando firmware");
                }
            })
            .fail(function(){
                $("#firmwareupdate_status_label").html("envirosense-chipkit: Error en la petición");
                console.log("error en la peticion");
            });
    });

    //START
    $('#envirosense_start_btn').on("click", function (e) {
        call_restarter('start');
        e.preventDefault();
    });

    //STOP
    $('#envirosense_stop_btn').on("click", function (e) {
        call_restarter('stop');
        e.preventDefault();
    });

    //RESTART
    $('#envirosense_restart_btn').on("click", function (e) {
        call_restarter('restart');
        e.preventDefault();
    });

    //STATUS
    // $('#envirosense_status_btn').on("click", function (e) {
    //     call_restarter('status');
    //     e.preventDefault();
    // });

    call_restarter('status');
});

