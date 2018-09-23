<!DOCTYPE html>
<html lang="es">
<head>
    <title>Envirosense - Configuración</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/envirosense-config.js"></script>

    <style>
        table tr td:last-child {
            text-align: right;
        }

    </style>
</head>
<body>

<nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top" style="background: #041b25;border-bottom: 2px solid #0f5370;">
    <a class="navbar-brand" href="/">Envirosense v{{env('PROJECT_VERSION')}} - Configuración</a>
</nav>

<div class="container">
    <div class="row">

        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">envirosense-core</h3>
                </div>
                <div class="panel-body">
                    <p class="help-block" id="envirosense_status_label">
                    {{--envirosense-core esta corriendo en el sistema.--}}
                    </p>
                    <button id="envirosense_stop_btn" type="submit" class="btn btn-warning">
                        Parar
                    </button>
                    <button id="envirosense_start_btn" type="submit" class="btn btn-success">
                        Iniciar
                    </button>
                    <button id="envirosense_restart_btn" type="submit" class="btn btn-info">
                        Reiniciar
                    </button>
                    {{--<button id="envirosense_status_btn" type="submit" class="btn btn-default">--}}
                        {{--Obtener estado--}}
                    {{--</button>--}}
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Actualizar firmware envirosense-chipkit</h3>
                </div>
                <div class="panel-body">
                    <p class="help-block" id="firmwareupdate_status_label"></p>
                    <form id="ckupdatefrm" role="form" class="form" enctype="multipart/form-data" method="post">
                        <div class="form-group">
                            <label for="device">
                                Puerto serie
                            </label>
                            <input type="text" class="form-control" id="device"  name="device" value="/dev/ttyAMA0"/>
                        </div>
                        <div class="form-group">

                            <label for="firmware">
                                Firmware:
                            </label>
                            <input type="file" name="firmware" id="firmware" />
                            {{--<p class="help-block">--}}
                                {{--Example block-level help text here.--}}
                            {{--</p>--}}
                        </div>
                        <button type="submit" class="btn btn-success">
                            Iniciar
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Actualizar envirosense-core</h3>
                </div>
                <div class="panel-body">
                        <button type="submit" class="btn btn-success" disabled>
                            Iniciar
                        </button>
                    {{--<p class="help-block">--}}
                    {{--Example block-level help text here.--}}
                    {{--</p>--}}
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Actualizar envirosense-webui ({{\App\Libraries\Project::gitlastcommit(env('WEBUI_PATH'))}})</h3>
                </div>
                <div class="panel-body">
                    <p class="help-block">
                        <strong>GitHub:</strong> {{env('WEBUI_GITHUB_URL')}}
                    </p>
                    <p class="help-block" id="webuiupdate_status_label">Pulse el botón iniciar para actualizar de la rama <strong>{{env('WEBUI_BRANCH')}}</strong></p>
                    <form id="webuiupdatefrm" role="form" class="form" enctype="multipart/form-data" method="post">
                        <button type="submit" class="btn btn-success">
                            Iniciar
                        </button>
                    </form>
                    {{--<p class="help-block">--}}
                    {{--Example block-level help text here.--}}
                    {{--</p>--}}
                </div>
            </div>
        </div>

    </div>
    <div class="row">
        <div class="text-center"><a type="button" class="btn btn-default" href="/">Volver</a></div>
    </div>
</div>

</body>
</html>
