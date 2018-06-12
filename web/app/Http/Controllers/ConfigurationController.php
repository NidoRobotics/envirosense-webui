<?php
/**
 * User: mdps
 * Date: 08/06/2018
 */
namespace App\Http\Controllers;

use App\Libraries\Project;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;

class ConfigurationController extends Controller
{
    public function index()
    {
        return view('configuracion');//,['sesiones'=>$sesiones]);
    }

    public function coreupdate()
    {
        return 'update core';
    }

    public function webuiupdate()
    {
        return 'update webui';
    }

    public function ckupdate(Request $request)
    {
        set_time_limit(600);
        //dd($request->all());
//        Storage::
        $this->validate($request, [
            'device' => 'required',
            'firmware' => 'required|file'
        ]);

        //movemos el fichero a una localizacion conocida
        $request->file('firmware')->move(storage_path('app'), 'envirosense-ck-firmware.hex');
        $device  = $request->input('device');

        //Procesamos el comando
        $command = [
            env('PROJECT_PYTHON_PATH'), //Inteprete de python
            env('PROJECT_CKUPDATER_PATH'), //Ejecutable con ruta absoluta
            '-d', //Activamos la depuracion
            '-m', //Activamos la gestion automagica de supervisor
            $device, //Indicamos el puerto serie al que esta conectado el CK
            storage_path('app/envirosense-ck-firmware.hex'), //Indicamos el fichero de firmware con ruta absoluta
        ];
        $update_process = new Process($command);
//        $update_process->disableOutput();
        $update_process->setTimeout(300);
        //TODO: esto deberia dar la salida en tiempo real, pero no lo hace, parece un
        //problema de configuracion y creo, que si en lugar de intentar imprimirlo por pantalla
        //lo sacara por socketio o similar si funcionaria :)
        //Lo importante es que el codigo funciona y el comando se llama correctamente :)
        try
        {
//            $update_process->run(function ($type, $buffer) {
//                printf("type:[%s] buffer:[%s]\n",$type, $buffer);
//                if (Process::ERR === $type) {
//                    echo 'ERR > '.$buffer."\n";
//                } else {
//                    echo 'OUT > '.$buffer."\n";
//                }
//            });
            $update_process->run();
            if($update_process->isSuccessful()){
                return response()->json(['status'=>true,'output'=>$update_process->getOutput()],200,Project::get_cors());
            }
            else
            {
                return response()->json(['status'=>false,'output'=>$update_process->getOutput()],200,Project::get_cors());
            }
        }
        catch (RuntimeException $exception) {
            return response()->json(['status'=>false,'error'=>$exception->getMessage()],200,Project::get_cors());
        }
    }
}
