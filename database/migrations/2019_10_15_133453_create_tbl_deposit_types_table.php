<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblDepositTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_deposit_types', function (Blueprint $table) {
            $table->increments('dep_id');
            $table->string("dep_name");
            $table->double("dep_amount", 8, 2)->default(0);
            $table->integer("dep_status")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_deposit_types');
    }
}
