<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTblExpenseHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_expense_histories', function (Blueprint $table) {
            $table->increments('exp_h_id');
            $table->integer('exp_h_type');
            $table->double('exp_h_amount', 8, 2)->default(0);
            $table->integer('exp_c_id')->default(0);
            $table->integer('exp_in_id')->default(0);
            $table->date('exp_h_date');
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
        Schema::dropIfExists('tbl__expense_histories');
    }
}
