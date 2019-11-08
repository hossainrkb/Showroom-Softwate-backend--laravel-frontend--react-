<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_mnthly_installment;
use App\Models\Tbl_invoice;
use DB;
class MonthlyInstallmentController extends Controller
{
    //check instalment added or not 
    public function checkInstallment($peraMeter)
    {
        $checkIns = Tbl_mnthly_installment::Where("mnth_ins_invo_id", $peraMeter)->first();
        return response()->json($checkIns);
    }
    //make monthly installment fee
    public function set_mnthly_ins(Request $request)
    {
        if ($request->payment == "") {
            return response()->json('You should set installment first');
        } elseif (!is_numeric($request->payment)) {
            return response()->json('Input should be Numeric value');
        } else {
            $check_installment = Tbl_mnthly_installment::Where("mnth_ins_invo_id", $request->invo_id)->first();
            $invoice = Tbl_invoice::Where("in_id", $request->invo_id)->first();
            if($check_installment){
                return response()->json("This invoice Installment fee has already set");
           }
           elseif($request->holaTotal < $request->payment){
                return response()->json("Installment should have less than or equal total");
           }
           elseif($request->holaTotal == $invoice->in_paid){
                return response()->json("Your Installment has Finished");
           }
           else{
                $date = date("Y-m_d");
                DB::statement("INSERT INTO `tbl_mnthly_installments` ( `mnth_ins_unique_id`, `mnth_ins_invo_id`, `mnth_ins_payment`, `mnth_ins_date`,`mnth_ins_status`)
            VALUES ('$request->mnth_ins_code', '$request->invo_id', '$request->payment','$date','1');");
                return response()->json("Set Installment Has Successfully Done");
           }
            
        }
    }
}
