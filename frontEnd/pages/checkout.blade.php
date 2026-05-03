@extends('frontEnd.layouts.master')

@section('title')
    Checkout
@endsection
@php
    $setting = DB::table('settings')->first();
@endphp

@section('body')
    <section class="hero-wrap hero-wrap-2" style="background-image: url({{ asset('frontEnd/images/bg-4.jpg') }});">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end">
                <div class="col-md-9 ftco-animate">
                    <p class="breadcrumbs"><span class="mr-2"><a href="{{ route('home') }}">Home <i
                                    class="fa fa-chevron-right"></i></a></span> <span>Checkout <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">Checkout</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <form action="{{ route('order.place') }}" method="POST">
                        @csrf
                        <div class="row">
                            <div class="col-12 form-section checkout-form mt-5">
                                <div class="form-row">
                                    <div class="col-md-8 col-12 contact-wrap wrapper p-md-5 p-4">
                                        <div class="form-header checkout-header">
                                            <h3 class="mb-3">Shipping Info</h3>
                                        </div>
                                        <div class="form-content">
                                            <div class="row">
                                                <div class="col-12 mb-4">
                                                    <input type="hidden" name="pricing_plan_id"
                                                        value="{{ $plan->id }}">
                                                    <input type="hidden" name="product_id"
                                                        value="{{ $plan->get_product->id }}">
                                                    <input type="hidden" name="pricing_plan_heading"
                                                        value="{{ $plan->heading }}">
                                                    <input type="hidden" name="subtotal"
                                                        value="{{ $plan->discount_price > 0 ? $plan->discount_price : $plan->regular_price }}">
                                                    <input type="hidden" name="total"
                                                        value="{{ $plan->discount_price > 0 ? $plan->discount_price : $plan->regular_price }}">
                                                    <input type="text" name="customer_name" id="customer_name"
                                                        class="form-control" placeholder="Full name *" required>
                                                    @error('customer_name')
                                                        <span style="color: red!important">{{ $message }}</span>
                                                    @enderror
                                                </div>
                                                <div class="col-md-6 col-12 mb-4">
                                                    <input type="number" name="customer_phone" id="customer_phone"
                                                        class="form-control" placeholder="Phone number *" required>
                                                    @error('customer_phone')
                                                        <span style="color: red!important">{{ $message }}</span>
                                                    @enderror
                                                </div>
                                                <div class="col-md-6 col-12 mb-4">
                                                    <input type="email" name="customer_email" id="customer_email"
                                                        class="form-control" placeholder="Email address">
                                                    @error('customer_email')
                                                        <span style="color: red!important">{{ $message }}</span>
                                                    @enderror
                                                </div>
                                                <div class="col-12 mb-4">
                                                    <textarea name="customer_address" id="customer_address" cols="30" placeholder="Full address *" rows="2"
                                                        class="form-control"></textarea>
                                                    @error('customer_address')
                                                        <span style="color: red!important">{{ $message }}</span>
                                                    @enderror
                                                </div>
                                                <div class="col-12 mb-4">
                                                    <textarea name="customer_note" id="customer_note" cols="30" placeholder="Note" rows="5"
                                                        class="form-control" required></textarea>
                                                    @error('customer_note')
                                                        <span style="color: red!important">{{ $message }}</span>
                                                    @enderror
                                                </div>
                                                <div class="col-12 mb-4">
                                                    <div class="form-group">
                                                        <input type="submit" value="Place Order"
                                                            class="btn btn-primary font-weight">
                                                        <div class="submitting"></div>
                                                        <div id="success-message"
                                                            style="display: none;margin: 10px 0;color: #10a460 !important;line-height: 20px;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-12">
                                        <div class="order-summery-card">
                                            <h5 class="title">Order Summery</h5>
                                            @if ($plan)
                                                <div class="plan-item">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="col-6">
                                                            <h5 class="plan-title">{{ $plan->heading }}</h5>
                                                            <h6 class="plan-subtitle">{{ $plan->sub_heading }}</h6>
                                                        </div>
                                                        <div class="col-6">
                                                            <h5 class="plan-price">
                                                                {{ $setting->currency_sign }} {{ number_format($plan->discount_price > 0 ? $plan->discount_price : $plan->regular_price, 2) }}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr>
                                                <div class="plan-pricing">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="col-6">
                                                            <h5 class="title">Subtotal</h5>
                                                        </div>
                                                        <div class="col-6">
                                                            <h5 class="plan-price">
                                                                {{ $setting->currency_sign }} {{ number_format($plan->discount_price > 0 ? $plan->discount_price : $plan->regular_price, 2) }}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="col-6">
                                                            <h5 class="title">Total</h5>
                                                        </div>
                                                        <div class="col-6">
                                                            <h5 class="plan-price">
                                                                {{ $setting->currency_sign }} {{ number_format($plan->discount_price > 0 ? $plan->discount_price : $plan->regular_price, 2) }}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endif
                                        </div>
                                        {{-- <div class="col-12 mt-5">
                                            <button type="submit" class="w-100 place-order-button">Place Order</button>
                                        </div> --}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
