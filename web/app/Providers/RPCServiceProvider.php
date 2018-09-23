<?php

namespace App\Providers;

//use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use App\Services\Envirosense\RPC;

class RPCServiceProvider extends ServiceProvider
{
    protected $defer = true;

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
//    public function boot()
//    {
//
//    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(RPC::class, function ($app) {
            return new RPC();
        });



    }

    public function provides()
    {
        return [RPC::class];
    }
}
