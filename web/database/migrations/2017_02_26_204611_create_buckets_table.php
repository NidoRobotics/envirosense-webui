<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBucketsTable extends Migration {

	public function up()
	{
		Schema::create('buckets', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->float('magneticcompass')->nullable()->default(null);
			$table->float('do')->nullable()->default(null);
			$table->float('gpscompass')->nullable()->default(null);
			$table->integer('gpssnr')->nullable()->default(null);
			$table->float('gpssats')->nullable()->default(null);
			$table->string('lat_h')->nullable()->default(null);
			$table->decimal('lat', 11,8)->nullable()->default(null);
			$table->string('long_h')->nullable()->default(null);
			$table->decimal('long', 11,8)->nullable()->default(null);
			$table->float('sg')->nullable()->default(null);
			$table->float('tds')->nullable()->default(null);
			$table->float('s')->nullable()->default(null);
			$table->boolean('is_valid')->default(false);
			$table->float('ec')->nullable()->default(null);
			$table->integer('time')->unsigned()->nullable()->default(null);
			$table->float('ph')->nullable()->default(null);
			$table->float('orp')->nullable()->default(null);
			$table->float('press')->nullable()->default(null);
			$table->float('depthtotal')->nullable()->default(null);
			$table->float('depthtosurface')->nullable()->default(null);
			$table->float('depthtobottom')->nullable()->default(null);
			$table->float('watertmp1')->nullable()->default(null);
			$table->float('watertmp2')->nullable()->default(null);
			$table->float('watertmp3')->nullable()->default(null);
			//El campo fullbucket dfeberia estar aqui
		});
	}

	public function down()
	{
		Schema::drop('buckets');
	}
}