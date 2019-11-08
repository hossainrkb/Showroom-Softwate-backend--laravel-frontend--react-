<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_carts', function (Blueprint $table) {
            $table->increments('cart_id');
            $table->integer('product_id');
            $table->string('order_code')->default(0);
            $table->integer('qty');
            $table->integer('com_id')->nullable();
            $table->date('cart_date')->nullable();
            $table->tinyInteger('cart_status')->default(0);
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
        Schema::dropIfExists('tbl__carts');
    }
}
