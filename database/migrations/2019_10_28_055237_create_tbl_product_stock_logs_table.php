<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblProductStockLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_product_stock_logs', function (Blueprint $table) {
            $table->increments('ps_id');
            $table->integer("ps_p_id");
            $table->integer("ps_up_qty");
            $table->date("ps_date");
            $table->integer("ps_com");
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
        Schema::dropIfExists('tbl_product_stock_logs');
    }
}
