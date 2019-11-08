<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_deposit_type;
use App\Models\Tbl_deposit_history;
use App\Models\Tbl_company;
use DB;
class DepositController extends Controller
{
    //all deposit type
    public function dep_type()
    {
        $dep_type = Tbl_deposit_type::Where('dep_status',0)->get();
        return $dep_type;
    }
    //all deposit type by current date
    public function dep_his_by_today_date()
    {
        $date = date("Y-m-d");
        $dep_his = Tbl_deposit_history::Where("dep_h_date", $date)->get();
        return response()->json($dep_his);
    }
    //Add dep
    public function add_dep(Request $request)
    {
        if ($request->dep_amount == "") {
            return response()->json('Please Enter Deposit Amount');
        } elseif ($request->dep_select_type == "") {
            return response()->json('Please Select Deposit Type');
        } elseif (!is_numeric($request->dep_amount)) {
            return response()->json('Input should be Numeric value');
        } else {
            $company = Tbl_company::Where("comp_id", $request->comp_id)->first();
            $comp_total = $company->comp_amount + $request->dep_amount;
            $date =  date('Y-m-d');
            DB::statement("INSERT INTO `tbl_deposit_histories` ( `dep_h_type`, `dep_h_amount`,  `dep_h_date`)
            VALUES ('$request->dep_select_type', '$request->dep_amount','$date');");
            DB::statement("UPDATE tbl_companies SET tbl_companies.comp_amount = '" . $comp_total . "' where tbl_companies.comp_id = '" .  $request->comp_id . "' "); 
                return response()->json('Deposit added Successfully!');
            
        }
    }

    //todays_deposit
    public function todays_deposit_report()
    {
        $date = date("Y-m_d");
        $todaysSales = DB::table('tbl_deposit_histories')
            ->Where('dep_h_date', $date)
            ->join('tbl_deposit_types', 'tbl_deposit_histories.dep_h_type', '=', 'tbl_deposit_types.dep_id')
            // ->join('tbl_customers', 'tbl_deposit_histories.dep_c_id', '=', 'tbl_customers.c_id')
            //  ->join('tbl_invoices', 'tbl_deposit_histories.dep_in_id', '=', 'tbl_invoices.in_id' )
            ->Where("dep_in_id", 0)

            ->select('tbl_deposit_types.*', 'tbl_deposit_histories.*')
            ->orderBy('tbl_deposit_histories.dep_h_id', 'DESC')
            ->get();
        return response()->json($todaysSales);
    }
    //today_deposit_invoice
    public function todays_deposit_report_invoice()
    {
        $date = date("Y-m_d");
        $todaysSales = DB::table('tbl_deposit_histories')
            ->Where('dep_h_date', $date)
            ->join('tbl_deposit_types', 'tbl_deposit_histories.dep_h_type', '=', 'tbl_deposit_types.dep_id')
            ->join('tbl_customers', 'tbl_deposit_histories.dep_c_id', '=', 'tbl_customers.c_id')
            ->join('tbl_invoices', 'tbl_deposit_histories.dep_in_id', '=', 'tbl_invoices.in_id')
            //->OrWhere("dep_in_id", 0)
            ->select('tbl_deposit_types.*', 'tbl_deposit_histories.*', 'tbl_invoices.*', 'tbl_customers.*')
            ->orderBy('tbl_deposit_histories.dep_h_id', 'DESC')
            ->get();
        return response()->json($todaysSales);
    }

    //alltime_deposit
    public function allTime_deposit_report()
    {
       // $date = date("Y-m_d");
        $alltime = DB::table('tbl_deposit_histories')
           // ->Where('dep_h_date', $date)
            ->join('tbl_deposit_types', 'tbl_deposit_histories.dep_h_type', '=', 'tbl_deposit_types.dep_id')
            // ->join('tbl_customers', 'tbl_deposit_histories.dep_c_id', '=', 'tbl_customers.c_id')
            //  ->join('tbl_invoices', 'tbl_deposit_histories.dep_in_id', '=', 'tbl_invoices.in_id' )
            ->Where("dep_in_id", 0)

            ->select('tbl_deposit_types.*', 'tbl_deposit_histories.*')
            ->orderBy('tbl_deposit_histories.dep_h_id', 'DESC')
            ->get();
        return response()->json($alltime);
    }
    //allTime_deposit_invoice
    public function allTime_deposit_report_invoice()
    {
        //$date = date("Y-m_d");
        $alltimedephistory = DB::table('tbl_deposit_histories')
           // ->Where('dep_h_date', $date)
            ->join('tbl_deposit_types', 'tbl_deposit_histories.dep_h_type', '=', 'tbl_deposit_types.dep_id')
            ->join('tbl_customers', 'tbl_deposit_histories.dep_c_id', '=', 'tbl_customers.c_id')
            ->join('tbl_invoices', 'tbl_deposit_histories.dep_in_id', '=', 'tbl_invoices.in_id')
            //->OrWhere("dep_in_id", 0)
            ->select('tbl_deposit_types.*', 'tbl_deposit_histories.*', 'tbl_invoices.*', 'tbl_customers.*')
            ->orderBy('tbl_deposit_histories.dep_h_id', 'DESC')
            ->get();
        return response()->json($alltimedephistory);
    }
    
}
