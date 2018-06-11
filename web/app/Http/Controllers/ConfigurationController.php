<?php
/**
 * User: mdps
 * Date: 08/06/2018
 */
namespace App\Http\Controllers;


class ConfigurationController extends Controller
{
    public function index()
    {
        return view('configuracion');//,['sesiones'=>$sesiones]);
    }
}
