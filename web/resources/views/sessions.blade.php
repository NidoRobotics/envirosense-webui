<!DOCTYPE html>
<html lang="es">
<head>
    <title>Envirosense - Sesiones</title>
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
    <a class="navbar-brand" href="/">Envirosense {{env('PROJECT_VERSION')}} - Sesiones</a>
</nav>

<div class="container">
    <div class="row table-responsive">
        <table class="table table-striped">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Puntos</th>
                <th width="30%">Acciones</th>
            </tr>
                @foreach($sesiones as $s)
                <tr>
                    <td>{{$s->id}}</td>
                    <td>{{$s->title}}</td>
                    <td>{{$s->created_at->format('d/m/Y H:i')}}</td>
                    <td>{{$s->bucket_id_end - $s->bucket_id_start}}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <a type="button" class="btn btn-default" href="/api/session/download/{{$s->id}}"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> CSV</a>
                            <a type="button" class="btn btn-default" href="/api/session/geojson/{{$s->id}}"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> GeoJSON</a>
                            <a type="button" class="btn btn-default" disabled><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Eliminar</a>
                        </div>
                    </td>
                </tr>
                @endforeach
        </table>
        <div class="text-center"><a type="button" class="btn btn-default" href="/">Volver</a></div>
    </div>
</div>

</body>
</html>
