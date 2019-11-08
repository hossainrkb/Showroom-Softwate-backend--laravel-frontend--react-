<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_products', function (Blueprint $table) {
            $table->increments('p_id');
            $table->string("p_unique_id");
            $table->string("p_name");
            $table->bigInteger("p_qty");
            $table->double('p_buy_price', 8, 2);
            $table->double('p_sell_price', 8, 2);
            $table->double('p_w_sell_price', 8, 2);
            $table->double('p_i_sell_price', 8, 2);
            $table->date('p_date');
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
        Schema::dropIfExists('tbl__products');
    }
}
