<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_orders', function (Blueprint $table) {
            $table->increments('o_id');
            $table->string("o_code");
            $table->integer("o_sale_type_id");
            $table->integer("o_customer_id");
            $table->double("o_total", 8 ,2);
            $table->date("o_date")->nullable();
            $table->tinyInteger("o_status")->default(0);
            $table->Integer("o_com_id")->nullable();
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
        Schema::dropIfExists('tbl_orders');
    }
}
