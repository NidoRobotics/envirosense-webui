<?php namespace App\Libraries;

use Symfony\Component\Process\Process;


class Project
{

    public static function update_chipkit_firmware($device, $fw_path, &$out)
    {

        if(!file_exists($fw_path))
        {
            throw new Exception('$fw_path is does not exists');
        }

        //Procesamos el comando
        $command = [
            env('PROJECT_PYTHON_PATH'), //Inteprete de python
            env('PROJECT_CKUPDATER_PATH'), //Ejecutable con ruta absoluta
            '-d', //Activamos la depuracion
            '-m', //Activamos la gestion automagica de supervisor
            $device, //Indicamos el puerto serie al que esta conectado el CK
            $fw_path, //Indicamos el fichero de firmware con ruta absoluta
        ];
        $update_process = new Process($command);
//        $update_process->disableOutput();
        $update_process->setTimeout(300);
        //TODO: esto deberia dar la salida en tiempo real, pero no lo hace, parece un
        //problema de configuracion y creo, que si en lugar de intentar imprimirlo por pantalla
        //lo sacara por socketio o similar si funcionaria :)
        //Lo importante es que el codigo funciona y el comando se llama correctamente :)

//            $update_process->run(function ($type, $buffer) {
//                printf("type:[%s] buffer:[%s]\n",$type, $buffer);
//                if (Process::ERR === $type) {
//                    echo 'ERR > '.$buffer."\n";
//                } else {
//                    echo 'OUT > '.$buffer."\n";
//                }
//            });
            $update_process->run();
            $out = $skuList = explode(PHP_EOL, $update_process->getOutput());
            if($update_process->isSuccessful()){
                return true;
            }
            else
            {
                return false;
            }

    }

    public static function get_chipkit_firmwares()
    {
        $path = storage_path(sprintf('app%1$sckfirmware%1$s*.hex',DIRECTORY_SEPARATOR));
//        dd($path);
        if($files = glob($path))
        {
            return $files;
        }
        else
        {
            return [];
        }
    }

    public static function get_cors()
    {
        try {
            $http_origin = trim($_SERVER['HTTP_REFERER']);
            if ($http_origin == "http://localhost:3000" || $http_origin == "http://local.envirosense.io") {
                return ['Access-Control-Allow-Origin' => $http_origin];
            }
        }catch (Exception $e) {
            Log::error($e);
        }
        finally
        {
            return [];
        }
    }

    public static function gitpull($repo_path, $branch='master', $remote='origin', $reset=true)
    {
        set_time_limit(300);
        $cmds = [];
        $outs = [];
        if($reset) {
            $cmds[] = sprintf("%s -C %s clean -fd 2>&1", env('PROJECT_GIT_PATH'), $repo_path);
            $cmds[] = sprintf("%s -C %s reset --hard HEAD 2>&1", env('PROJECT_GIT_PATH'), $repo_path);
        }
        $cmds[] = sprintf("%s -C %s pull %s %s 2>&1", env('PROJECT_GIT_PATH'), $repo_path, $remote, $branch);
        try
        {
            $pre_commit = self::gitlastcommit(env('WEBUI_PATH'));
            foreach($cmds as $cmd)
            {
                $outs[] = shell_exec($cmd);
            }
            $post_commit = self::gitlastcommit(env('WEBUI_PATH'));
//        dd($cmds,$outs);
            return ['status'=>true,'output'=>$outs,'commands'=>$cmds,'precommit'=>$pre_commit,'postcommit'=>$post_commit];
        }
        catch (RuntimeException $exception) {
            return ['status'=>false,'error'=>$exception->getMessage()];
        }
    }

    public static function gitlastcommit($repo_path)
    {
        $cmd = sprintf('%s -C %s rev-parse --short HEAD 2> /dev/null | sed "s/\(.*\)/@\1/"',env('PROJECT_GIT_PATH'), $repo_path);
        try
        {
            $res = shell_exec($cmd);
            return $res;
            //            return ['status'=>true,'commit'=>$res];
        }
        catch (RuntimeException $exception) {
            return false;
            //            return ['status'=>false,'error'=>$exception->getMessage()];
        }
    }
}
