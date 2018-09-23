<?php namespace App\Libraries;



class Project
{
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
//                $outs[] = shell_exec($cmd);
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
