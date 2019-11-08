<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblMnthlyInstallmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_mnthly_installments', function (Blueprint $table) {
            $table->increments('mnth_ins_id');
            $table->string("mnth_ins_unique_id");
            $table->integer("mnth_ins_invo_id");
            $table->double("mnth_ins_payment",8,2);
            $table->date("mnth_ins_date");
            $table->tinyInteger("mnth_ins_status")->default(0);
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
        Schema::dropIfExists('tbl_mnthly_installments');
    }
}
