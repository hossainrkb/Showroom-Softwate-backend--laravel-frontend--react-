<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_invoice;
use App\Models\Tbl_company;
use App\Models\Tbl_sell_type;
use App\Models\Tbl_customer;
use DB;

class InvoiceController extends Controller
{
    //get invoice by_ order_id
    public function invoice_by_order_code($peraMeter)
    {
        $invoice = Tbl_invoice::Where("in_o_code", $peraMeter)->first();
        return response()->json($invoice);
    }
    //get invoice by_ invoice_id
    public function invoice_by_in_id($peraMeter)
    {
        $invoice_id = Tbl_invoice::Where("in_id", $peraMeter)->first();
        return response()->json($invoice_id);
    }
    //make payment
    public function make_payment_invoice(Request $request)
    {
        if ($request->make_pay == "") {
            return response()->json('You should pay at first');
        }
        elseif (!is_numeric($request->make_pay)) {
            return response()->json('Input should be Numeric value');
        }
       else{
            $invoice = Tbl_invoice::Where("in_id", $request->in_id)->first();
            $total = $invoice->in_paid + $request->make_pay;
            DB::statement("UPDATE tbl_invoices SET tbl_invoices.in_paid = '" . $total . "' where tbl_invoices.in_id = '" .  $request->in_id . "' ");
            $company = Tbl_company::Where("comp_id", $request->comp_id)->first();
            $comp_total = $company->comp_amount + $request->make_pay;
            //
            $st = Tbl_sell_type::Where("st_id", $request->in_s_type)->first();
            $total_paid = $st->st_total_paid + $request->make_pay;
            DB::statement("UPDATE `tbl_sell_types` SET `st_total_paid` = '" . $total_paid . "' WHERE `tbl_sell_types`.`st_id` = '" . $request->in_s_type . "' ");
            //
            //customer add his transaction
            $get_customer = Tbl_customer::Where("c_id", $request->in_c_id)->first();
            $set_total_paid = $get_customer->c_total_paid + $request->make_pay;
            DB::statement("UPDATE `tbl_customers` SET `c_total_paid` = '" . $set_total_paid . "'  WHERE c_id = '" . $request->in_c_id . "' ");
                
             // 
            $date = date("Y-m_d");
            DB::statement("UPDATE tbl_companies SET tbl_companies.comp_amount = '" . $comp_total . "' where tbl_companies.comp_id = '" .  $request->comp_id . "' ");
            DB::statement("INSERT INTO `tbl_deposit_histories` ( `dep_h_type`, `dep_h_amount`, `dep_c_id`, `dep_in_id`, `dep_h_date`)
            VALUES ('1', '$request->make_pay', '$request->in_c_id', '$request->in_id','$date');");
            $ckinvoice = Tbl_invoice::Where("in_id", $request->in_id)->first();
            $sub = $ckinvoice->in_subtotal - $ckinvoice->in_discount;
            $odd = $sub- $ckinvoice->in_paid;
            if($odd == 0){
                DB::statement("UPDATE tbl_mnthly_installments SET tbl_mnthly_installments.mnth_ins_status = '2' where tbl_mnthly_installments.mnth_ins_invo_id = '" .   $request->in_id . "' ");
            }
            return response()->json("Payment has successfully Done");
       }
    }
    //put discount
    public function put_discount_invoice(Request $request)
    {
        if ($request->put_dis == "") {
            return response()->json('You should drop discount amount at first');
        } elseif (!is_numeric($request->put_dis)) {
            return response()->json('Input should be Numeric value');
        }
       else{
            $invoice = Tbl_invoice::Where("in_id", $request->in_id)->first();
            $total = $invoice->in_discount + $request->put_dis;
            DB::statement("UPDATE tbl_invoices SET tbl_invoices.in_discount = '" . $total . "' where tbl_invoices.in_id = '" .  $request->in_id . "' ");
            $company = Tbl_company::Where("comp_id", $request->comp_id)->first();
            $comp_total = $company->comp_amount - $request->put_dis;
            //
            $st = Tbl_sell_type::Where("st_id", $request->in_s_type)->first();
            $total_dis = $st->st_total_discount + $request->put_dis;
            DB::statement("UPDATE `tbl_sell_types` SET `st_total_discount` = '" . $total_dis . "' WHERE `tbl_sell_types`.`st_id` = '" . $request->in_s_type . "' ");
            // 
            //customer add his transaction
            $get_customer = Tbl_customer::Where("c_id", $request->in_c_id)->first();
            $set_total_discount = $get_customer->c_total_discount + $request->put_dis;
            DB::statement("UPDATE `tbl_customers` SET `c_total_discount` = '" . $set_total_discount . "'  WHERE c_id = '" . $request->in_c_id . "' ");
              //
            $date = date("Y-m_d");
            DB::statement("UPDATE tbl_companies SET tbl_companies.comp_amount = '" . $comp_total . "' where tbl_companies.comp_id = '" .  $request->comp_id . "' ");
            DB::statement("INSERT INTO `tbl_expense_histories` ( `exp_h_type`, `exp_h_amount`, `exp_c_id`, `exp_in_id`, `exp_h_date`)
            VALUES ('1', '$request->put_dis', '$request->in_c_id', '$request->in_id','$date');");
               
            return response()->json("Discount successfully done");
       }
    }
}
