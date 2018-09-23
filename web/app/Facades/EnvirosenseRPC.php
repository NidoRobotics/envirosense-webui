<?php namespace App\Facades;

class EnvirosenseRPC extends \Illuminate\Support\Facades\Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() { return \App\Services\Envirosense\RPC::class; }
}
