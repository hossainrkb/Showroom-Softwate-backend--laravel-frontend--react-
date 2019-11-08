<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
class ProductLogController extends Controller
{
    //cart your order list
    public function product_stock_log()
    {
        $product_log = DB::table('tbl_product_stock_logs')
            ->join('tbl_products', 'tbl_product_stock_logs.ps_p_id', '=', 'tbl_products.p_id')
            ->select('tbl_products.*', 'tbl_product_stock_logs.*')
            ->get();
        return $product_log;
    }
}
