<?php

namespace App\Services\Envirosense;

use Carbon\Carbon;
use Socket\Raw\Factory;
use Socket\Raw\Exception as SocketRawException;
use Config;

class RPC
{
    protected $connection;
    protected $factory;


    function __construct()
    {
        $this->factory = new Factory();
        $this->remote = sprintf('tcp://%s:%s',env('RPC_HOST'),env('RPC_PORT'));
    }

    private function _query($data,$closeOnFinish=true)
    {
        try
        {
            $this->connection = $this->factory->createClient($this->remote);
            $this->connection->write(json_encode($data));

            //TODO: Tenemos que poner un failsafe, por tiempo o por iteraciones, pero esto si no puede durar
            //para siempre (si no llega el \n) y eso es un problema

            $response = [];
            while (($currentByte = @socket_read($this->connection->getResource(), 1)) !== "\n") {
                $response[] = $currentByte;
            }

            if($closeOnFinish) {
                $this->_close();
            }
            return implode("",$response);
        }
        catch (SocketRawException $e)
        {
            throw $e;
//            return false;
        }
    }


    private function _close()
    {
        $this->connection->close();
        $this->connection = null;
    }

    public function send($action,$data=[])
    {
        $response = $this->_query(['cmd'=>$action,'data'=>$data]);
        if($response = json_decode($response,TRUE))
        {
            if(isset($response['status']))
            {
                if(preg_match('/ok/i',$response['status']))
                {
                    return json_decode($response['data'],TRUE);
                }
            }
        }
        return false;
    }

    function test()
    {
        return 'funciono!';
    }
}
