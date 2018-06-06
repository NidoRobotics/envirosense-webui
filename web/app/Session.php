<?php

namespace App;

use App\Bucket;
use GeoJson\Feature\Feature;
use GeoJson\Feature\FeatureCollection;
use GeoJson\Geometry\Point;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class Session extends Model {

    protected $table = 'sessions';
    public $timestamps = true;
    protected $guarded = ['id'];
    protected $hidden = ['start','end','updated_at','created_at'];

    public static function boot()
    {
        parent::boot();

        Session::creating(function($itm)
        {
            $itm->bucket_id_start = Bucket::getLastBucketId();
        });

        Session::deleting(function($itm)
        {
            if($itm->bucket_id_end > 0)
            {
                \App\Bucket::where('id','>=',$itm->bucket_id_start)->where('id','<=',$itm->bucket_id_end)->delete();
            }
        });
        //TODO: Poner el evento delete borrar los elementos relacionados si existen (buckets entre bucket_id_start y bucket_id_end
    }

    public static function active()
    {
        //TODO: usar bucket_id_end
       return self::where('bucket_id_end',0)->orderBy('created_at','desc')->first();
    }

    public static function endSession($id)
    {
        //Finalizamos la sesion, no verifica que no este uya finalizada!
        $session = Session::find($id);

        $last_id = Bucket::getLastBucketId();
        //Aqui pasa algo raro, como que la id final es mas pequeña que la inicial?
        if($last_id < $session->bucket_id_start)
        {
            $last_id = $session->bucket_id_start;
        }
        return self::where('id',$id)->update(['bucket_id_end'=>$last_id]);
    }

    public static function existsAndRunning($id)
    {
        //Comprobamos si existe y esta funcionando la sesion
        return self::where('id',$id)->where('bucket_id_end',0)->count();
    }

    public function is_running()
    {
        //si no tenemos final (0 o null) esta corriendo
        return (!$this->bucket_id_end);
    }

    public function getBuckets()
    {
        $query = \App\Bucket::where('id','>=',$this->bucket_id_start);
        if(!$this->is_running())
        {
            $query->where('id','<=',$this->bucket_id_end);
        }
        return $query->orderBy('id','asc')->get();
    }

    public function getCsv()
    {
        if($buckets = $this->getBuckets())
        {
            $csv = \League\Csv\Writer::createFromFileObject(new \SplTempFileObject());
            $csv->setDelimiter(';');
            $csv->insertOne(['id','systime','magneticcompass','do','gpscompass','gpssnr','gpssats','lat_h','lat','long_h','long','sg','tds','s','is_valid','ec','gpstime','ph','orp','press','depthtotal','depthtosurface','depthtobottom','watertmp1','watertmp2','watertmp3']);

            //dd($buckets);

            $buckets->each(function($b) use($csv) {
                //dd(count($b->toArray()),count(['id','magneticcompass','do','gpscompass','gpssnr','gpssats','lat_h','lat','long_h','long','sg','tds','s','is_valid','ec','time','ph','orp','press','depthtotal','depthtosurface','depthtobottom','watertmp1','watertmp2','watertmp3']));
                $tmpline = $b->toArray();
                //dd(print_r($tmpline));
                foreach($tmpline as $key=>&$value)
                {
                    if($key == 'time' && $value)
                    {
                        $value = Carbon::createFromTimestampUTC($value)->toIso8601String();
                    }

                    if($key == 'created_at')
                    {
                        $value = (new Carbon($value))->toIso8601String();
                    }

                    if(!$value || $value == -2048)
                    {
                        $value = "-";
                    }
                    //Cambiamos los . por , en los floats, si no el excel no funciona
                    if(is_numeric($value))
                    {
                        $value  = preg_replace('#\.#',',',$value);
                    }
                }
                $csv->insertOne($tmpline);
            });
            //dd($csv->__toString());
            return $csv->__toString();
        }
        return 'NO RECORDS FOUND FOR THIS SESSION';
    }

    public function getGeoJson()
    {
        if($buckets = $this->getBuckets())
        {
            $features = [];
            $excluded_properties = ['lat','long','depthtotal'];

            $buckets->each(function($b) use(&$features,$excluded_properties) {

                $properties = [];
                foreach($b->toArray() as $key=>$value)
                {
                    if(!$value || $value == -2048)
                    {
                        $value = "-";
                    }

                    if($value && !in_array($key,$excluded_properties)) {

                        if($key == 'time')
                        {
                            if($value!='-') {
                                $value = Carbon::createFromTimestampUTC($value)->toIso8601String();
                            }
                            $properties['gpstime'] = $value;
                        }
                        elseif($key == 'created_at')
                        {
                            $value = (new Carbon($value))->toIso8601String();
                            $properties['systime'] = $value;
                        }
                        else
                        {
                            $properties[$key] = $value;
                        }
                    }
                }
                $lat = $b->lat != null ?  (float)$b->lat : 0.0;
                $long = $b->long != null ?  (float)$b->long : 0.0;
                $features[] = new Feature(new Point([(float)$b->long,(float)$b->lat,(float)$b->depthtotal]),$properties);
            });

            $fc = new FeatureCollection($features);

            return json_encode($fc);
        }
        return 'NO RECORDS FOUND FOR THIS SESSION';
    }

}
