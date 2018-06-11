<?php

use Symfony\Component\Process\Process;



/*
Fichero de rutas web de envirosense-webui

MDPS (miguel@blackmesa.es) 2016-2018

NOTA:
Esta webui SOLO puede obtener datos de la DB, no se deben realizar guardados de datos ni ningun tipo de omdificacion en
la DB, este tipo de acciones debe realizarse siempre por medio de las funciones que expone el socket.io de envirosense-core
No cumplir con esta directiva implicara inconsistencia en los datos y cosas terribles sucederan en las entrañas del sistema.
*/
$app->group(['prefix' => 'api'], function () use ($app) {
    //Operaciones sobre la sesion actual/futura
    $app->group(['prefix' => 'session'], function () use ($app) {
        //Indica si existe o no una sesion activa, si existe devuelve el objeto
        $app->get('active', function ()    {
            $response = ['status'=>false];
            if($activeSession = \App\Session::active())
            {
                $response['status'] = true;
                $response['session'] = $activeSession->toArray();
            }
            return response()->json($response,200,App\Libraries\Project::get_cors());
        });

        //Iniciar sesion
        $app->post('start', function (\Illuminate\Http\Request $request)    {
            throw new Exception('MDPS: Metodo start POST esta deprecated, usar metodo start socket.io en su lugar, ver vista main.blade.php');
        });
        //Terminar sesion
        $app->post('end', function (\Illuminate\Http\Request $request)    {
            throw new Exception('MDPS: Metodo end POST esta deprecated, usar metodo end socket.io en su lugar, ver vista main.blade.php');
        });

        $app->post('delete', function (\Illuminate\Http\Request $request)    {
            throw new Exception('MDPS: Metodo delete POST esta deprecated, usar metodo delete socket.io en su lugar, ver vista main.blade.php');
        });

        $app->post('data', function (\Illuminate\Http\Request $request)    {
            $id = $request->input('id');
            if($id && ($session = \App\Session::where('id',$id)->first()))
            {
                $buckets = $session->getBuckets();
                return response()->json(['status'=>true,'session'=>$session->toArray(),'buckets'=>$buckets->toArray()],200,App\Libraries\Project::get_cors());
            }
            return response()->json(['status'=>false],200,App\Libraries\Project::get_cors());
        });

        $app->get('download/{id}', function ($id)    {

            set_time_limit(300);
            ini_set('memory_limit', '128M');

            if (!ini_get("auto_detect_line_endings")) {
                ini_set("auto_detect_line_endings", '1');
            }

            if($id && ($session = \App\Session::where('id',$id)->first()))
            {
                $fname = sprintf('%s-envirosense-data.csv',\Illuminate\Support\Str::slug($session->title));
                $fpath = storage_path().'/'.$fname;
                file_put_contents($fpath,$session->getCsv());
                return response()->download($fpath,$fname,['Content-type' => 'text/csv'])->deleteFileAfterSend(true);
            }
            return response()->json(['status'=>false],200,App\Libraries\Project::get_cors());
        });

        $app->get('geojson/{id}', function ($id)    {

            set_time_limit(300);
            ini_set('memory_limit', '128M');

            if (!ini_get("auto_detect_line_endings")) {
                ini_set("auto_detect_line_endings", '1');
            }

            if($id && ($session = \App\Session::where('id',$id)->first()))
            {
                $fname = sprintf('%s-envirosense-geojson.json',\Illuminate\Support\Str::slug($session->title));
                $fpath = storage_path().'/'.$fname;
                file_put_contents($fpath,$session->getGeoJson());
                return response()->download($fpath,$fname,['Content-type' => 'application/geo+json'])->deleteFileAfterSend(true);
            }
            return response()->json(['status'=>false],200,App\Libraries\Project::get_cors());
        });
    });

    //Listado de sesiones
    $app->get('sessions', function () {
        return response()->json(['status'=>true,'sessions'=>\App\Session::where('bucket_id_end','>',0)->orderBy('id','desc')->get()->toArray()],200,App\Libraries\Project::get_cors());
    });
});

$app->get('oldmain', function () use ($app) {
    return view('main');
});

$app->get('historial', function () use ($app) {

    $sesiones = \App\Session::where('bucket_id_end','>',0)->orderBy('id','desc')->get();
    return view('sessions',['sesiones'=>$sesiones]);
});

$app->get('restarter/{action}', function ($action) use ($app) {
    set_time_limit(30);
    $valid_actions = ['start','stop','restart','status'];
    if(!in_array($action,$valid_actions))
    {
        return response()->json(['status'=>false, 'error'=>'Invalid action parameter'],200,App\Libraries\Project::get_cors());
    }
    //http://symfony.com/doc/current/components/process.html
    $command = [
        env('PROJECT_PYTHON_PATH'), //Inteprete de python
        env('PROJECT_RESTARTER_PATH'), //Ejecutable con ruta absoluta
        $action,
    ];
    $restart_process = new Process($command);
    //$restart_process->disableOutput();
    $restart_process->setTimeout(30);
    try
    {
        $restart_process->run();
        if($restart_process->isSuccessful())
        {
            return response()->json(['status'=>true, 'output'=>$restart_process->getOutput()],200,App\Libraries\Project::get_cors());
        }
        else
        {
            return response()->json(['status'=>false, 'output'=>$restart_process->getOutput()],200,App\Libraries\Project::get_cors());
        }
    }
    catch (RuntimeException $exception) {
        return response()->json(['status'=>false, 'error'=>$exception->getMessage()],200,App\Libraries\Project::get_cors());
    }
});

$app->get('test', function () use ($app) {
    set_time_limit(600);
    //http://symfony.com/doc/current/components/process.html
    $command = [
        env('PROJECT_PYTHON_PATH'), //Inteprete de python
        env('PROJECT_CKUPDATER_PATH'), //Ejecutable con ruta absoluta
        '-d', //Activamos la depuracion
        '-m', //Activamos la gestion automagica de supervisor
        '/dev/ttyAMA0', //Indicamos el puerto serie al que esta conectado el CK
        '/home/pi/Envirosense.1.0.0.BL.05062018.hex', //Indicamos el fichero de firmware con ruta absoluta
    ];
    $update_process = new Process($command);
    $update_process->disableOutput();
    $update_process->setTimeout(300);
    //TODO: esto deberia dar la salida en tiempo real, pero no lo hace, parece un
    //problema de configuracion y creo, que si en lugar de intentar imprimirlo por pantalla
    //lo sacara por socketio o similar si funcionaria :)
    //Lo importante es que el codigo funciona y el comando se llama correctamente :)
    try
    {
        $update_process->run(function ($type, $buffer) {
            printf("type:[%s] buffer:[%s]\n",$type, $buffer);
            if (Process::ERR === $type) {
                echo 'ERR > '.$buffer."\n";
            } else {
                echo 'OUT > '.$buffer."\n";
            }
        });
    }
    catch (RuntimeException $exception) {
        echo $exception->getMessage();
    }
});

$app->get('configuracion', 'ConfigurationController@index');
$app->post('configuracion/ckupdate', 'ConfigurationController@ckupdate');

$app->get('/', function () use ($app) {
    return view('dashboard');
});
