<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_customer;
use App\Models\Tbl_order;
use App\Models\Tbl_cart;
use App\Models\Tbl_sell_type;
use DB;

class OrderController extends Controller
{
    //cart your order list
    public function order_cart_list($peraMeter)
    {

        $cart = DB::table('tbl_carts')
            ->Where('order_code', $peraMeter )
            ->join('tbl_products', 'tbl_carts.product_id', '=', 'tbl_products.p_id')
            ->select('tbl_carts.*', 'tbl_products.p_name', 'tbl_products.p_buy_price')
            ->get();
        return $cart;
    }
    //checkout
    public function checkout(Request $request)
    {

        if ($request->st_select == null) {
            return response()->json('You should select any Type of Sale');
        } 
        elseif($request->c_contact == null){
            return response()->json('Please Enter Customer Contact');
        }
        else {
            $checkCustomer = Tbl_customer::Where("c_contact", $request->c_contact)
                ->first();

            if ($checkCustomer) {
                    //update quantity increase
                    DB::statement("UPDATE tbl_customers SET  tbl_customers.c_contact = '" . $request->c_contact . "' where tbl_customers.c_id = '" . $checkCustomer->c_id . "' ");
                    return response()->json($checkCustomer);
               
            } else {
             /*
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
             */
            }
        }
    }
    //order
    public function add_order(Request $request)
    {

        if ($request->selectType_id == null) {
            return response()->json('Select order Type');
        } 
        elseif($request->customer_id == null){
            return response()->json('Select Customer id');
        }
        elseif($request->order_total == null){
            return response()->json('Enter order total');
        }
        else {
            $checkOrder = Tbl_order::Where("o_code", $request->o_code)
                ->first();

            if ($checkOrder) {
                return response()->json("Order already Submitted");
               
            } else {
                    $code = "O".$request->o_code;
                    $date = date('Y-m-d');
                    
                    DB::statement("INSERT INTO `tbl_orders` ( `o_code`, `o_sale_type_id`, `o_customer_id`, `o_total`, `o_date`, `o_status`, `o_com_id`)
                     VALUES ('$code', '$request->selectType_id', '$request->customer_id', '$request->order_total', '$date', '1', '1');");
                DB::statement("UPDATE `tbl_carts` SET `order_code` = '".$code. "', `cart_status` = '0' WHERE `tbl_carts`.`order_code` = '0' ");
                //////////////
                DB::statement("INSERT INTO `tbl_invoices` ( `in_c_id`, `in_o_code`, `in_st_id`, `in_subtotal`, `in_discount`, `in_total`, `in_paid`, `in_due`, `in_status`, `in_com_id`,`in_date`)
                     VALUES ('$request->customer_id', '$code', '$request->selectType_id', '$request->order_total', '0', '0', '0','0','1','1','$date');");

                // $st=DB::statement("SELECT * FROM `tbl_sell_types` WHERE st_id = '". $request->selectType_id."' ");
                $st = Tbl_sell_type::Where("st_id",$request->selectType_id)->first();
             $total_order= $st->st_total_order + $request->order_total;
             $total_invo= $st->st_total_invoice + 1;
                DB::statement("UPDATE `tbl_sell_types` SET `st_total_order` = '" . $total_order . "' , `st_total_invoice` = '" . $total_invo . "' WHERE `tbl_sell_types`.`st_id` = '". $request->selectType_id."' ");
               //customer add his transaction
                $get_customer = Tbl_customer::Where("c_id",$request->customer_id)->first();
                $set_total_order= $get_customer->c_total_order + $request->order_total;
                DB::statement("UPDATE `tbl_customers` SET `c_total_order` = '" . $set_total_order . "'  WHERE c_id = '". $request->customer_id."' ");
               
                     $getOrder = Tbl_order::Where("o_code", $code)->first();
                    
                    return response()->json($getOrder);
               // $total_order->save();
             
            }
        }
    }

    //order by orderid search
    public function order_by_orderId(Request $request)
    {
        if ($request->order_id == "") {
            return response()->json('At first enter order ID');
        } else {
            $order  = DB::table('tbl_orders')
                ->Where('o_code', $request->order_id)
                ->join('tbl_sell_types', 'tbl_orders.o_sale_type_id', '=', 'tbl_sell_types.st_id')
                ->join('tbl_customers', 'tbl_orders.o_customer_id', '=', 'tbl_customers.c_id')
                ->select('tbl_orders.*', 'tbl_sell_types.*', 'tbl_customers.*')
                ->first();
            return response()->json($order);
        }
    }
}
