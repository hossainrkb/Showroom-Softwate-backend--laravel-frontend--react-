<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_sell_type;
use App\Models\Tbl_invoice;
use DB;
class SaleController extends Controller
{
    //all sale type
    public function sale_type()
    {
        $sale = Tbl_sell_type::all();
        return $sale;
    }
    public function sale_type_by_id($peraMeter)
    {
        $saleType = Tbl_sell_type::Where("st_id",$peraMeter)->first();
        return response()->json($saleType->st_name);
    }
    
    public function todays_sales_report_by_saleDate()
    {
        $date = date("Y-m_d");
        $todaysSales = DB::table('tbl_invoices')
            ->Where('in_date', $date)
            ->join('tbl_customers', 'tbl_invoices.in_c_id', '=', 'tbl_customers.c_id')
            ->join('tbl_sell_types', 'tbl_invoices.in_st_id', '=', 'tbl_sell_types.st_id')
            ->select('tbl_invoices.*', 'tbl_customers.c_contact', 'tbl_sell_types.st_name')
            ->orderBy('tbl_invoices.in_id', 'DESC')
            ->get();
        return response()->json($todaysSales);
    }
    public function installment_sales_report()
    {
        $date = date("Y-m_d");
        $todaysSales = DB::table('tbl_invoices')
            ->Where('in_st_id',3)
            ->join('tbl_customers', 'tbl_invoices.in_c_id', '=', 'tbl_customers.c_id')
            ->join('tbl_sell_types', 'tbl_invoices.in_st_id', '=', 'tbl_sell_types.st_id')
            ->select('tbl_invoices.*', 'tbl_customers.c_contact', 'tbl_customers.c_name', 'tbl_sell_types.st_name')
            ->orderBy('tbl_invoices.in_id', 'DESC')
            ->get();
        return response()->json($todaysSales);
    }
    public function daily_installment_sales_report()
    {
        $date = date("Y-m_d");
        $dailyInsSales = DB::table('tbl_mnthly_installments')
            ->Where('mnth_ins_date', $date)
            ->join('tbl_invoices', 'tbl_invoices.in_id', '=', 'tbl_mnthly_installments.mnth_ins_invo_id')
            ->join('tbl_customers', 'tbl_customers.c_id', '=', 'tbl_invoices.in_c_id')
            ->select('tbl_invoices.*', 'tbl_customers.*', 'tbl_mnthly_installments.*')
            ->orderBy('tbl_mnthly_installments.mnth_ins_id', 'DESC')
            ->get();
        return response()->json($dailyInsSales);
    }
    public function regular_sales_report()
    {
        $date = date("Y-m_d");
        $todaysSales = DB::table('tbl_invoices')
            ->Where('in_st_id',1)
            ->join('tbl_customers', 'tbl_invoices.in_c_id', '=', 'tbl_customers.c_id')
            ->join('tbl_sell_types', 'tbl_invoices.in_st_id', '=', 'tbl_sell_types.st_id')
            ->select('tbl_invoices.*', 'tbl_customers.c_contact', 'tbl_customers.c_name', 'tbl_sell_types.st_name')
            ->orderBy('tbl_invoices.in_id', 'DESC')
            ->get();
        return response()->json($todaysSales);
    }
    public function wholeSale_sales_report()
    {
        $date = date("Y-m_d");
        $todaysSales = DB::table('tbl_invoices')
            ->Where('in_st_id',2)
            ->join('tbl_customers', 'tbl_invoices.in_c_id', '=', 'tbl_customers.c_id')
            ->join('tbl_sell_types', 'tbl_invoices.in_st_id', '=', 'tbl_sell_types.st_id')
            ->select('tbl_invoices.*', 'tbl_customers.c_contact', 'tbl_customers.c_name', 'tbl_sell_types.st_name')
            ->orderBy('tbl_invoices.in_id', 'DESC')
            ->get();
        return response()->json($todaysSales);
    }
    public function allTime_sales_report()
    {
        $allTimeSale = DB::table('tbl_invoices')
            ->join('tbl_customers', 'tbl_invoices.in_c_id', '=', 'tbl_customers.c_id')
            ->join('tbl_sell_types', 'tbl_invoices.in_st_id', '=', 'tbl_sell_types.st_id')
            ->select('tbl_invoices.*', 'tbl_customers.c_contact', 'tbl_sell_types.st_name')
            ->orderBy('tbl_invoices.in_id', 'DESC')
            ->get();
        return response()->json($allTimeSale);
    }
}
