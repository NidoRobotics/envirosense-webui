<?php namespace App\Libraries;

class Project
{
    public static function get_cors()
    {
        $http_origin = trim($_SERVER['HTTP_ORIGIN']);
        if ($http_origin == "http://localhost:3000" || $http_origin == "http://local.envirosense.io" )
        {
            return ['Access-Control-Allow-Origin'=>$http_origin];
        }
        else
            return [];
    }
}
