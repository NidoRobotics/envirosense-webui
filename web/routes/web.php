<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
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
            return response()->json($response,200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
        });

        //Iniciar sesion
        //parametro nombre
        $app->post('start', function (\Illuminate\Http\Request $request)    {

            $name = $request->input('name','NONAME');

            //dd($name);

            $response = ['status'=>false];
            if($activeSession = \App\Session::active())
            {
                $response['status'] = true;
                $response['is_new'] = false;
                $response['session'] = $activeSession->toArray();
            }
            else
            {
                //TODO: Los id de bucket!!!!
                $newSession = \App\Session::create(['title'=>$name]);
                if($newSession)
                {
                    $response['status'] = true;
                    $response['is_new'] = true;
                    $response['session'] = $newSession->toArray();
                }
            }
            return response()->json($response,200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
        });

        //Terminar sesion
        //parametro id de sesion
        $app->post('end', function (\Illuminate\Http\Request $request)    {
            $id = $request->input('id');
            $res = false;
            if($id && \App\Session::existsAndRunning($id))
            {
                \App\Session::endSession($id);
                $res = true;
            }
            return response()->json(['status'=>$res],200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
        });

        $app->post('data', function (\Illuminate\Http\Request $request)    {
            $id = $request->input('id');
            if($id && ($session = \App\Session::where('id',$id)->first()))
            {
                $buckets = $session->getBuckets();
                return response()->json(['status'=>true,'session'=>$session->toArray(),'buckets'=>$buckets->toArray()],200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
            }
            return response()->json(['status'=>false],200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
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
            return response()->json(['status'=>false],200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
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
            return response()->json(['status'=>false],200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
        });

        $app->post('delete', function (\Illuminate\Http\Request $request)    {
            $id = $request->input('id');
            if($id && ($session = \App\Session::where('id',$id)->first()))
            {
                $session->delete();
                return response()->json(['status'=>true]);
            }
            return response()->json(['status'=>false],200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
        });
    });



    //Listado de sesiones
    $app->get('sessions', function () {
        //return response()->json(['status'=>true,'sessions'=>\App\Session::where('bucket_id_end','>',0)->orderBy('id','desc')->get()->toArray()]);
        return response()->json(['status'=>true,'sessions'=>\App\Session::where('bucket_id_end','>',0)->orderBy('id','desc')->get()->toArray()],200,['Access-Control-Allow-Origin'=>'http://localhost:3000']);
    });
});

$app->get('oldmain', function () use ($app) {
    return view('main');
});

$app->get('sesiones', function () use ($app) {

    $sesiones = \App\Session::where('bucket_id_end','>',0)->orderBy('id','desc')->get();
    return view('sessions',['sesiones'=>$sesiones]);
});

$app->get('/', function () use ($app) {
    return view('dashboard');
});
