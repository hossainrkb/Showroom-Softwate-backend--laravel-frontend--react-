<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_customer;

class CustomerController extends Controller
{
    //customer by id
    public function customer_by_id($peraMeter)
    {
        $customer = Tbl_customer::Where("c_id", $peraMeter)->first();
        return response()->json($customer);
    }
    //customer by contact
    public function customer_by_contact(Request $request)
    {
        if ($request->cus_contact == "") {
            return response()->json('At first enter contact number');
        }
        else{
        $customer = Tbl_customer::Where("c_contact", $request->cus_contact)->first();
        return response()->json($customer);
    }
    }
    //Add product
    public function add_customer(Request $request)
    {
        if ($request->c_name == "") {
            return response()->json('Customer Name can not be empty');
        }
       
        elseif (!(preg_match('/[A-Za-z]/', $request->c_name))) {
            return response()->json('Customer Name should be String');
        } elseif ($request->c_contact == "") {
            return response()->json('Please Enter Customer Contact');
        }  else {
            $checkCode = Tbl_customer::Where("c_unique_id", "C" . $request->c_code)->first();
            if ($checkCode) {
                return response()->json('This Customer had already added!');
            } else {
                $check_contact = Tbl_customer::Where("c_contact", $request->c_contact)->first();
                if($check_contact){
                    return response()->json('This Contact Number had already added!');
                }
                else{
                    $Customer = new Tbl_customer;
                    $Customer->c_unique_id = "C" . $request->c_code;
                    $Customer->c_name = $request->c_name;
                    $Customer->c_contact = $request->c_contact;
                    $Customer->c_status = 1;
                    $Customer->save();
                    return response()->json('Customer added Successfully!');
                }
                
            }
        }
    }
}
