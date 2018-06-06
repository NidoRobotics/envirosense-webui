<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSessionsTable extends Migration {

	public function up()
	{
		Schema::create('sessions', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('title');
			$table->integer('start')->unsigned()->default(0);
			$table->integer('end')->unsigned()->default(0);
			$table->integer('bucket_id_start')->unsigned()->default(0);
			$table->integer('bucket_id_end')->unsigned()->default(0);
		});
	}

	public function down()
	{
		Schema::drop('sessions');
	}
}