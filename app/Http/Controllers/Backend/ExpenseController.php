<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_expense_type;
use App\Models\Tbl_expense_history;
use App\Models\Tbl_company;
use DB;
class ExpenseController extends Controller
{
    //all deposit type by current date
    public function exp_his_by_today_date()
    {
        $date = date("Y-m-d");
        $exp_his = Tbl_expense_history::Where("exp_h_date", $date)->get();
        return response()->json($exp_his);
    }
    //todays_expense
    public function todays_expense_report()
    {
        $date = date("Y-m_d");
        $todaysSales = DB::table('tbl_expense_histories')
            ->Where('exp_h_date', $date)
            ->join('tbl_expense_types', 'tbl_expense_histories.exp_h_type', '=', 'tbl_expense_types.exp_id')
           // ->join('tbl_customers', 'tbl_expense_histories.exp_c_id', '=', 'tbl_customers.c_id')
         //  ->join('tbl_invoices', 'tbl_expense_histories.exp_in_id', '=', 'tbl_invoices.in_id' )
          ->Where("exp_in_id", 0)
       
            ->select( 'tbl_expense_types.*', 'tbl_expense_histories.*')
            ->orderBy('tbl_expense_histories.exp_h_id', 'DESC')
            ->get();
        return response()->json($todaysSales);
    }
    public function todays_expense_report_invoice()
    {
        $date = date("Y-m_d");
        $todaysSales = DB::table('tbl_expense_histories')
            ->Where('exp_h_date', $date)
            ->join('tbl_expense_types', 'tbl_expense_histories.exp_h_type', '=', 'tbl_expense_types.exp_id')
            ->join('tbl_customers', 'tbl_expense_histories.exp_c_id', '=', 'tbl_customers.c_id')
           ->join('tbl_invoices', 'tbl_expense_histories.exp_in_id', '=', 'tbl_invoices.in_id' )
       //->OrWhere("exp_in_id", 0)
            ->select( 'tbl_expense_types.*', 'tbl_expense_histories.*', 'tbl_invoices.*', 'tbl_customers.*')
            ->orderBy('tbl_expense_histories.exp_h_id', 'DESC')
            ->get();
        return response()->json($todaysSales);
    }
    //all expense history
    public function exp_history()
    {
        $exp_his = Tbl_expense_history::all();
        return $exp_his;
    }
    //all expense type
    public function exp_type()
    {
        $exp_type = Tbl_expense_type::Where("exp_status", 2)->get();
        return $exp_type;
    }
    //Add exp
    public function add_exp(Request $request)
    {
        if ($request->exp_amount == "") {
            return response()->json('Please Enter Expense Amount');
        } elseif ($request->exp_select_type == "") {
            return response()->json('Please Select Expense Type');
        } elseif (!is_numeric($request->exp_amount)) {
            return response()->json('Input should be Numeric value');
        } else {
            $company = Tbl_company::Where("comp_id", $request->comp_id)->first();
            $comp_total = $company->comp_amount - $request->exp_amount;
            $date = date("Y-m-d");
            DB::statement("INSERT INTO `tbl_expense_histories` ( `exp_h_type`, `exp_h_amount`, `exp_h_date`)
            VALUES ('$request->exp_select_type', '$request->exp_amount','$date');");
            DB::statement("UPDATE tbl_companies SET tbl_companies.comp_amount = '" . $comp_total . "' where tbl_companies.comp_id = '" .  $request->comp_id . "' ");
            return response()->json('Expense added Successfully!');
        }
    }

    //alltime_expense
    public function allTime_expense_report()
    {
        //$date = date("Y-m_d");
        $allTimeSales = DB::table('tbl_expense_histories')
           // ->Where('exp_h_date', $date)
            ->join('tbl_expense_types', 'tbl_expense_histories.exp_h_type', '=', 'tbl_expense_types.exp_id')
            // ->join('tbl_customers', 'tbl_expense_histories.exp_c_id', '=', 'tbl_customers.c_id')
            //  ->join('tbl_invoices', 'tbl_expense_histories.exp_in_id', '=', 'tbl_invoices.in_id' )
            ->Where("exp_in_id", 0)

            ->select('tbl_expense_types.*', 'tbl_expense_histories.*')
            ->orderBy('tbl_expense_histories.exp_h_id', 'DESC')
            ->get();
        return response()->json($allTimeSales);
    }
    //alltime_expense_invoice
    public function allTime_expense_report_invoice()
    {
        //$date = date("Y-m_d");
        $allTimeSales = DB::table('tbl_expense_histories')
            //->Where('exp_h_date', $date)
            ->join('tbl_expense_types', 'tbl_expense_histories.exp_h_type', '=', 'tbl_expense_types.exp_id')
            ->join('tbl_customers', 'tbl_expense_histories.exp_c_id', '=', 'tbl_customers.c_id')
            ->join('tbl_invoices', 'tbl_expense_histories.exp_in_id', '=', 'tbl_invoices.in_id')
            //->OrWhere("exp_in_id", 0)
            ->select('tbl_expense_types.*', 'tbl_expense_histories.*', 'tbl_invoices.*', 'tbl_customers.*')
            ->orderBy('tbl_expense_histories.exp_h_id', 'DESC')
            ->get();
        return response()->json($allTimeSales);
    }
}
