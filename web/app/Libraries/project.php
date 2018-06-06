<?php namespace App\Libraries;



class Project
{
    public static function get_cors()
    {
        try {
            $http_origin = trim($_SERVER['HTTP_REFERER']);
            if ($http_origin == "http://localhost:3000" || $http_origin == "http://local.envirosense.io/") {
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
}
