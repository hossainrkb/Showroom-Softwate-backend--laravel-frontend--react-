<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tbl_company;
use Illuminate\Support\Facades\Crypt;
//


class CompanyController extends Controller
{

    //Hola login

    public function com_login(Request $re)
    {
        if ($re->com_log_email == NULL) {
            return response()->json('yyy');
        } elseif ($re->com_log_pass == "") {
            return response()->json('Password field can not be empty');
        } else {
             $com_email = Tbl_company::Where('comp_email', $re->com_log_email)->first();
        if ($com_email) {
            if (Crypt::decryptString($com_email['comp_password']) == $re->com_log_pass) {
                if ($com_email['comp_status'] == 1) {
                    return response()->json($com_email);
                    } else {
                    return response()->json('Company is not active yet');
                    }
            } else {
                return response()->json('Password didn"t match');
            }
        } else {
            return response()->json('Email not found');
        }
        }

       
    }

    //register comapny
    public function register(Request $request)
    {
        if ($request->com_code == "") {
            return response()->json('Company code is empty');
        } elseif ($request->com_title == "") {
            return response()->json('Title can not be empty');
        } elseif ($request->com_phone == "") {
            return response()->json('Please enter contact number');
        } elseif ($request->com_email == "") {
            return response()->json('Please Enter email address');
        } elseif ($request->com_pass == "") {
            return response()->json('Password field can not be empty');
        } else {
       

       // $mo_code = substr($re->d_number, 0, 3);
        $company = new Tbl_company;
       // $operator = Moperator::Where('mo_code', $mo_code)->first();
        $email = Tbl_company::Where('comp_email', $request->com_email)->first();
      //  if ($operator) {
            $phone = Tbl_company::Where('comp_phone', $request->com_phone)->first();
            if (!$email) {
                if (!$phone) {
                    $com_code = "CM".$request->com_code;
                    //  $company->d_user_id= "D".$userkey;
                    $code = Tbl_company::Where('comp_code', $com_code)->first();
                    if (!$code) {
                        $company->comp_code = $com_code;
                        $company->comp_title = $request->com_title;
                        $company->comp_phone = $request->com_phone;
                        $company->comp_email = $request->com_email;
                        $company->comp_password =  Crypt::encryptString($request->com_pass);
                        $company->comp_amount = 0;
                        $company->comp_status = 1;
                       
                       // $company->code = $re->code;

                        // $company = company::Where('email', $re->d_email)->first();
                       // $hola = array(
                         //   'code'     =>  $re->code,
                         //   'email'     =>  $re->d_email,

                       // );
                        //$company->code = SendCode::sendCode($company->phone);

                        // $admin->notify(new VerifyAdminRegistration($admin));
                      //  Mail::send('company_verify', $hola, function ($message) use ($hola) {
                            //$this->hola=$hola;
                        //    $message->to($hola['email']);
                         //   $message->subject('Verify your Email company!');

                            //$message->attach('Click here to Confirm .. ', $admin);
                            // $message->markdown('holaemails', ['token' => $admin['remember_token']]);
                            // $code = $admin["remember_token"];
                            // return view('holaemails', compact('code'));
                       // });
                        $company->save();
                    } else {
                        return response()->json('This Company has already been added');
                    }
                } else {
                    return response()->json('This Contact number has already been added');
                }
            } else {
                return response()->json('This E-mail address has already been added');
            }
            // } else {
            //   session()->flash('error', 'Contact number is not valid!');
            //    return redirect()->route('company.register');
            //  }



            return response()->json("Company Registered Successfully");
    }
    }

    //get by code 
    public function company_by_code($peraMeter)
    {
        $comp = Tbl_company::Where("comp_code", $peraMeter)->first();
        return response()->json($comp);
    }
}
