@extends('frontEnd.layouts.master')

@section('title')
    Order Confirm
@endsection
@php
    $setting = DB::table('settings')->first();
@endphp
@section('css')
    <link rel="stylesheet" href="{{ asset('frontEnd/css/order-confirm.css') }}">
@endsection
@section('body')
    <section class="order-confirm-section">
        <div class="container order-confirm-container">
            <div class="container-card order-card">
                <div class="order-success-msg">
                    <div class="success-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check icon" width="100"
                            height="100" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                    </div>
                    <div class="success-text">
                        <h2>Order Successfully Placed. </h2>
                    </div>
                </div>
                <div class="order-details">
                    <h2 class="order-details-title">Order Summery</h2>
                    <div class="order-details-content">
                        <ul>
                            <li>
                                <p class="text-1">Invoice number: </p>
                                <p class="text-2"><strong>{{ $order->invoice_id }}</strong></p>
                            </li>
                            <li>
                                <p class="text-1">Date:</p>
                                <p class="text-2"><strong>{{ date('d M y', strtotime($order->order_date)) }}</strong></p>
                            </li>
                            <li>
                                <p class="text-1">Sub Total:</p>
                                <p class="text-2"><strong>{{ $setting->currency_sign }}
                                        {{ number_format($order->subtotal, 2) }}</strong></p>
                            </li>
                            <li>
                                <p class="text-1">Total:</p>
                                <p class="text-2"><strong>{{ $setting->currency_sign }}
                                        {{ number_format($order->total, 2) }}</strong></p>
                            </li>
                            <li>
                                <p class="text-1">Payment method:</p>
                                <p class="text-2"><strong>Cash On Delivery </strong></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
