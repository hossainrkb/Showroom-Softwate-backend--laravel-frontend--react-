<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_customers', function (Blueprint $table) {
            $table->increments('c_id');
            $table->string("c_unique_id");
            $table->string("c_name");
            $table->string("c_contact");
            $table->string("c_nid")->nullable();
            $table->double("c_total_order", 10,2)->default(0);
            $table->double("c_total_discount", 10,2)->default(0);
            $table->double("c_total_paid", 10,2)->default(0);
            $table->string("c_address")->nullable();
            $table->tinyInteger("c_status")->default(0);
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
        Schema::dropIfExists('tbl_customers');
    }
}
