<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblDepositHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_deposit_histories', function (Blueprint $table) {
            $table->increments('dep_h_id');
            $table->integer('dep_h_type');
            $table->double('dep_h_amount', 8, 2)->default(0);
            $table->integer('dep_c_id')->default(0);
            $table->integer('dep_in_id')->default(0);
            $table->date('dep_h_date');
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
        Schema::dropIfExists('tbl_deposit_histories');
    }
}
