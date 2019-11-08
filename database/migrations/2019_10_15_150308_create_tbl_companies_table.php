<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_companies', function (Blueprint $table) {
            $table->increments('comp_id');
            $table->string("comp_code");
            $table->string("comp_title");
            $table->string("comp_phone");
            $table->string("comp_email");
            $table->string("comp_password");
            $table->double("comp_amount", 8, 2);
            $table->tinyInteger("comp_status");
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
        Schema::dropIfExists('tbl__companies');
    }
}
