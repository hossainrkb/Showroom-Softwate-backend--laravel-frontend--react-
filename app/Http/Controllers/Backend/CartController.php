<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_cart;
use App\Models\Tbl_product;
use DB;
class CartController extends Controller
{
    public function cart_list(){
        
        $cart = DB::table('tbl_carts')
            
            ->Where('cart_status',1)
            ->Where('order_code',"0")
            ->join('tbl_products', 'tbl_carts.product_id', '=', 'tbl_products.p_id')
            ->select('tbl_carts.*', 'tbl_products.p_name', 'tbl_products.p_buy_price')
            ->get();
            return $cart; 
        
    }
    //Add To cart
    public function add_to_cart(Request $request)
    {
      
        if ($request->p_select == null) {
            return response()->json('You should select any product from list');
        } elseif ($request->p_select_qty == null) {
            return response()->json('Please Enter Product Quantity');
         }
         elseif(!is_numeric($request->p_select_qty)){
            return response()->json('Input type should be numeric value');
         }
         else {
            $checkProduct = Tbl_cart::Where("product_id",$request->p_select)
            ->Where('cart_status', 1)
            ->Where('order_code', 0)
            ->first();
           
            if ($checkProduct) {
                $product_qty = Tbl_product::Where("p_id", $checkProduct->product_id)->first();
                if($product_qty->p_qty >= $request->p_select_qty){
                    //update quantity increase
                    $quantity_add = $checkProduct->qty + $request->p_select_qty;
                    $checkProduct->qty = $quantity_add;
                    $product_qty_minus = $product_qty->p_qty - $request->p_select_qty;
                    DB::statement("UPDATE tbl_carts SET tbl_carts.qty = '" . $quantity_add . "' where tbl_carts.cart_id = '" . $checkProduct->cart_id . "' ");
                    DB::statement("UPDATE tbl_products SET tbl_products.p_qty = '" . $product_qty_minus . "' where tbl_products.p_id = '" . $product_qty->p_id . "' ");
                    return response()->json("Product added to Cart");
                }
                else{
                    return response()->json("Product quantity is out of range!");
                }
            
                
            } else {
                $product_qty = Tbl_product::Where("p_id", $request->p_select)->first();
                if ($product_qty->p_qty >= $request->p_select_qty) {
                    $Cart = new Tbl_cart;
                    $Cart->product_id = $request->p_select;
                    $Cart->qty = $request->p_select_qty;
                    $Cart->com_id = 1;
                    $Cart->cart_status = 1;
                    $Cart->cart_date = date('Y-m-d');
                    $Cart->save();
                    $product_qty_minus = $product_qty->p_qty - $request->p_select_qty;
                    DB::statement("UPDATE tbl_products SET tbl_products.p_qty = '" . $product_qty_minus . "' where tbl_products.p_id = '" . $product_qty->p_id . "' ");
                   
                    return response()->json('Product Added to Cart Successfully!');
                } else {
                    return response()->json("Product quantity is out of range!");
                }
                
            }
        }
    }
}
