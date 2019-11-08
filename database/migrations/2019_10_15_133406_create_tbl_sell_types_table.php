<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblSellTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_sell_types', function (Blueprint $table) {
            $table->increments('st_id');
            $table->string('st_name');
            $table->integer('st_total_invoice')->nullable();
            $table->double('st_total_order', 8, 2)->nullable();
            $table->double('st_total_discount', 8, 2)->nullable();
            $table->double('st_total_paid', 8, 2)->nullable();
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
        Schema::dropIfExists('tbl__sell_types');
    }
}
