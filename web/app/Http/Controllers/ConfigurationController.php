<?php
/**
 * User: mdps
 * Date: 08/06/2018
 */
namespace App\Http\Controllers;

use App\Libraries\Project;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use EnvirosenseRPC;

class ConfigurationController extends Controller
{
    public function index()
    {
        //Get the chipkit pi local firmware versions
        $ckfw = Project::get_chipkit_firmwares();
        $ckcurrentversion = EnvirosenseRPC::send("get_ck_version");
//        dd($ckcurrentversion);
        return view('configuracion',['ckfw'=>$ckfw, 'currentversion'=>$ckcurrentversion]);//,['sesiones'=>$sesiones]);
    }

    public function coreupdate()
    {
        return 'update core';
    }

    public function webuiupdate()
    {
        $res = Project::gitpull(env('WEBUI_PATH'),env('WEBUI_BRANCH'));
        if($res['status'])
        {
            $response = ['status'=>true,'from'=>$res['precommit'],'to'=>$res['postcommit'],'eq'=>($res['precommit']==$res['postcommit']?true:false)];
        }
        return response()->json($response,200,Project::get_cors());
//        return 'update webui';
    }

    public function ckupdate(Request $request)
    {
        set_time_limit(600);
        //dd($request->all());
//        Storage::
        $this->validate($request, [
            'device' => 'required',
            'firmware' => 'file'
        ]);

        //Eliminamos posibles restos de otra actualizacion
        if(file_exists(storage_path('app/envirosense-ck-firmware.hex')))
        {
            @unlink(storage_path('app/envirosense-ck-firmware.hex'));
        }

        //movemos el fichero a una localizacion conocida
        $device = $request->input('device');
        if($request->input('localfw',FALSE))
        {
            //TODO: control de errores
            @copy($request->input('local_fw_path'),storage_path('app/envirosense-ck-firmware.hex'));
        }
        else
        {
            $request->file('firmware')->move(storage_path('app'), 'envirosense-ck-firmware.hex');
        }

        try
        {
            $out = ""; //Refactorizar
            if(Project::update_chipkit_firmware($device,storage_path('app/envirosense-ck-firmware.hex'),$out))
            {
                return response()->json(['status'=>true,'output'=>$out],200,Project::get_cors());
            }
            else
            {
                return response()->json(['status'=>false,'output'=>$out],200,Project::get_cors());
            }
        }
        catch (RuntimeException $exception) {
            return response()->json(['status'=>false,'error'=>$exception->getMessage()],200,Project::get_cors());
        }
    }
}
