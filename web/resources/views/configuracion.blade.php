<!DOCTYPE html>
<html lang="es">
<head>
    <title>Envirosense - Configuración</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
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
                    <p class="help-block">
                    envirosense-core esta corriendo en el sistema.
                    </p>
                    <button type="submit" class="btn btn-info">
                        Parar
                    </button>
                    <button type="submit" class="btn btn-info">
                        Iniciar
                    </button>
                    <button type="submit" class="btn btn-info">
                        Reiniciar
                    </button>
                    {{--<p class="help-block">--}}
                    {{--Example block-level help text here.--}}
                    {{--</p>--}}
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Actualizar firmware envirosense-chipkit</h3>
                </div>
                <div class="panel-body">
                    <form role="form" class="form">
                        <div class="form-group">
                            <label for="exampleInputEmail1">
                                Puerto serie
                            </label>
                            <input type="text" class="form-control" id="device" value="/tty/AMA0"/>
                        </div>
                        <div class="form-group">

                            <label for="exampleInputFile">
                                Firmware:
                            </label>
                            <input type="file" id="firmware" />
                            {{--<p class="help-block">--}}
                                {{--Example block-level help text here.--}}
                            {{--</p>--}}
                        </div>
                        <button type="submit" class="btn btn-info">
                            Procesar
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
                        <button type="submit" class="btn btn-info">
                            Procesar
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
                    <h3 class="panel-title">Actualizar envirosense-webui</h3>
                </div>
                <div class="panel-body">
                    <button type="submit" class="btn btn-info">
                        Procesar
                    </button>
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
    {{--<div class="row table-responsive">--}}
        {{--<table class="table table-striped">--}}
            {{--<tr>--}}
                {{--<th>ID</th>--}}
                {{--<th>Nombre</th>--}}
                {{--<th>Fecha</th>--}}
                {{--<th>Puntos</th>--}}
                {{--<th width="30%">Acciones</th>--}}
            {{--</tr>--}}
                {{--@foreach($sesiones as $s)--}}
                {{--<tr>--}}
                    {{--<td>{{$s->id}}</td>--}}
                    {{--<td>{{$s->title}}</td>--}}
                    {{--<td>{{$s->created_at->format('d/m/Y H:i')}}</td>--}}
                    {{--<td>{{1+($s->bucket_id_end - $s->bucket_id_start)}}</td>--}}
                    {{--<td>--}}
                        {{--<div class="btn-group" role="group">--}}
                            {{--<a type="button" class="btn btn-default" href="/api/session/download/{{$s->id}}"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> CSV</a>--}}
                            {{--<a type="button" class="btn btn-default" href="/api/session/geojson/{{$s->id}}"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> GeoJSON</a>--}}
                            {{--<a type="button" class="btn btn-default" disabled><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Eliminar</a>--}}
                        {{--</div>--}}
                    {{--</td>--}}
                {{--</tr>--}}
                {{--@endforeach--}}
        {{--</table>--}}
    {{--</div>--}}
</div>

</body>
</html>
