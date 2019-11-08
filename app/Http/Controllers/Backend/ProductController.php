<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_product;
use DB;
class ProductController extends Controller
{
    public function product_list(){
        $product = Tbl_product::OrderBy("p_id","DESC")->get();
        return $product;
    }
    //delete product
    public function del_product($peraMeter){
        DB::statement("DELETE FROM tbl_products WHERE p_id = '".$peraMeter."' ");
        return response()->json("Product has successfully removed");
    }
    //update quantity
    public function update_product_qty(Request $request)
    {
        if ($request->up_qty == "") {
            return response()->json('You should drop quantity first !');
        } elseif (!is_numeric($request->up_qty)) {
            return response()->json('Input should be Numeric value');
        } else {
            $date = date("Y-m_d");
            $product = Tbl_product::Where("p_id", $request->up_id)->first();
            $total = $product->p_qty + $request->up_qty;
            DB::statement("UPDATE tbl_products SET tbl_products.p_qty = '" . $total . "' where tbl_products.p_id = '" .  $request->up_id . "' ");
            DB::statement("INSERT INTO `tbl_product_stock_logs` ( `ps_p_id`, `ps_up_qty`, `ps_date`, `ps_com`)
            VALUES ('$request->up_id', '$request->up_qty', '$date', '1');");
           
            return response()->json("Product qunatity has successfully updated");
        }
    }
    //Add product
    public function add_product(Request $request)
    { 
        if ($request->p_name == "") {
            return response()->json('Product Name can not be empty');
        }
        elseif ($request->p_qty == "") {
            return response()->json('Please Enter Quantity');
        }
        elseif ($request->p_b_price == "") {
            return response()->json('Please Enter Product Buy price');
        }
        elseif ($request->p_s_price == "") {
            return response()->json('Please Enter Product Sell price');
        }
        elseif ($request->p_w == "") {
            return response()->json('Please Enter Product Wholesell price');
        }
        elseif ($request->p_i == "") {
            return response()->json('Please Enter Product Installment price');
        }
        else{
            $checkProduct = Tbl_product::Where("p_unique_id", "P".$request->p_code)->first();
            if ($checkProduct) {
                return response()->json('This Product had already added!');
            } else {
                $Product = new Tbl_product;
                $Product->p_unique_id = "P".$request->p_code;
                $Product->p_name = $request->p_name;
                $Product->p_qty = $request->p_qty;
                $Product->p_buy_price = $request->p_b_price;
                $Product->p_sell_price = $request->p_s_price;
                $Product->p_w_sell_price = $request->p_w;
                $Product->p_i_sell_price = $request->p_i;
                $Product->p_date = date('Y-m-d');
              
                $Product->save();
                return response()->json('Product added Successfully!');
            }
        }

       
       
    }
}
