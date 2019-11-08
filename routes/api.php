<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'product'], function () {
    Route::post('/add', 'Backend\ProductController@add_product')->name('product_add');
    Route::post('/qty/update', 'Backend\ProductController@update_product_qty')->name('up_product');
    Route::get('/list', 'Backend\ProductController@product_list')->name('product_list');
    Route::get('/del/{peraMeter}', 'Backend\ProductController@del_product')->name('del_product');
});
Route::group(['prefix' => 'product_log'], function () {
    Route::get('/', 'Backend\ProductLogController@product_stock_log')->name('product_log_stock');
    });
Route::group(['prefix' => 'cart'], function () {
    Route::post('/add', 'Backend\CartController@add_to_cart')->name('cart_add');
    Route::get('/list', 'Backend\CartController@cart_list')->name('cart_list');
});
Route::group(['prefix' => 'saleType'], function () {
    Route::get('/list', 'Backend\SaleController@sale_type')->name('saleType_list');
    Route::get('/{peraMeter}', 'Backend\SaleController@sale_type_by_id')->name('saleType_by_id');
    Route::get('/todays/report', 'Backend\SaleController@todays_sales_report_by_saleDate')->name('saleType_todays');
    Route::get('/allTime/report', 'Backend\SaleController@allTime_sales_report')->name('saleType_allTime');
    Route::get('/regular/report', 'Backend\SaleController@regular_sales_report')->name('saleType_regular');
    Route::get('/wholeSale/report', 'Backend\SaleController@wholeSale_sales_report')->name('saleType_wholeSale');
    Route::get('/installment/report', 'Backend\SaleController@installment_sales_report')->name('saleType_installment');
    Route::get('/dailyinstallment/report', 'Backend\SaleController@daily_installment_sales_report')->name('saleType_daily_installment');
});
Route::group(['prefix' => 'checkout'], function () {
    Route::post('/', 'Backend\OrderController@checkout')->name('checkout');
});
Route::group(['prefix' => 'dep'], function () {
    Route::get('/list', 'Backend\DepositController@dep_type')->name('dep_type');
    Route::post('/history/add', 'Backend\DepositController@add_dep')->name('add_dep');
    Route::get('/history/current/date', 'Backend\DepositController@dep_his_by_today_date')->name('dep_his_date');
    Route::get('/history/today', 'Backend\DepositController@todays_deposit_report')->name('dep_today');
    Route::get('/history/today/invoice', 'Backend\DepositController@todays_deposit_report_invoice')->name('dep_today_invoice');
    Route::get('/history/allTime', 'Backend\DepositController@allTime_deposit_report')->name('dep_allTime');
    Route::get('/history/allTime/invoice', 'Backend\DepositController@allTime_deposit_report_invoice')->name('dep_allTime_invoice');
});
Route::group(['prefix' => 'exp'], function () {
    Route::get('/list', 'Backend\ExpenseController@exp_type')->name('exp_type');
    Route::post('/history/add', 'Backend\ExpenseController@add_exp')->name('add_exp');
    Route::get('/history/current/date', 'Backend\ExpenseController@exp_his_by_today_date')->name('exp_his_date');
    Route::get('/history/today', 'Backend\ExpenseController@todays_expense_report')->name('exp_today');
    Route::get('/history/today/invoice', 'Backend\ExpenseController@todays_expense_report_invoice')->name('exp_today_invoice');
    Route::get('/history/allTime', 'Backend\ExpenseController@allTime_expense_report')->name('exp_allTime');
    Route::get('/history/allTime/invoice', 'Backend\ExpenseController@allTime_expense_report_invoice')->name('exp_allTime_invoice');
});
Route::group(['prefix' => 'company'], function () {
    Route::post('/add', 'Backend\CompanyController@register')->name('comp_add');
    Route::post('/login', 'Backend\CompanyController@com_login')->name('comp_login');
    Route::get('/{peraMeter}', 'Backend\CompanyController@company_by_code')->name('comp_get');
});
Route::group(['prefix' => 'order'], function () {
    Route::post('/add', 'Backend\OrderController@add_order')->name('order_add');
    Route::get('/cart/{peraMeter}', 'Backend\OrderController@order_cart_list')->name('order_cart');
    Route::post('/search', 'Backend\OrderController@order_by_orderId')->name('order_by_orderID_search');
});
Route::group(['prefix' => 'invoice'], function () {
    Route::post('/pay', 'Backend\InvoiceController@make_payment_invoice')->name('invoice_pay');
    Route::post('/discount', 'Backend\InvoiceController@put_discount_invoice')->name('invoice_dis');
    Route::get('/{peraMeter}', 'Backend\InvoiceController@invoice_by_order_code')->name('invoice_order_id');
    Route::get('/id/{peraMeter}', 'Backend\InvoiceController@invoice_by_in_id')->name('invoice_in_id');
});
Route::group(['prefix' => 'customer'], function () {
    Route::get('/{peraMeter}', 'Backend\CustomerController@customer_by_id')->name('customer_by_id');
    Route::post('/search', 'Backend\CustomerController@customer_by_contact')->name('customer_by_contact_search');
    Route::post('/add', 'Backend\CustomerController@add_customer')->name('add_customer');
});
Route::group(['prefix' => 'set_mnthly_ins'], function () {
    Route::post('/', 'Backend\MonthlyInstallmentController@set_mnthly_ins')->name('set_ins');
    Route::get('/get/{peraMeter}', 'Backend\MonthlyInstallmentController@checkInstallment')->name('check_ins');
});


