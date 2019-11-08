<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_invoices', function (Blueprint $table) {
            $table->increments('in_id');
            $table->integer('in_c_id');
            $table->string('in_o_code');
            $table->integer('in_st_id');
            $table->double('in_subtotal', 8 ,2)->default(0);
            $table->double('in_discount', 8 ,2)->default(0);
            $table->double('in_total', 8 ,2)->default(0);
            $table->double('in_paid', 8 ,2)->default(0);
            $table->double('in_due', 8 ,2)->default(0);
            $table->tinyInteger('in_status')->default(1);
            $table->Integer('in_com_id')->default(0);
            $table->date('in_date');
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
        Schema::dropIfExists('tbl_invoices');
    }
}
