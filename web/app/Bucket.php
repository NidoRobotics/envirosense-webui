<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bucket extends Model {

    protected $table = 'buckets';
    public $timestamps = true;
    //protected $guarded = ['id'];
    protected $hidden = ['updated_at'];

    public static function getLastBucketId()
    {
        //TODO: usar bucket_id_end
        if($bkt =self::orderBy('id','desc')->first())
        {
            return $bkt->id;
        }
        return 0;
    }
}
