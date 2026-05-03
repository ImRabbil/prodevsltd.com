@extends('frontEnd.layouts.master')

@section('title') About Us @endsection

@section('body')
    <section class="hero-wrap hero-wrap-2" style="background-image: url({{asset('frontEnd/images/bg-4.jpg')}});">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end">
                <div class="col-md-9 ftco-animate">
                    <p class="breadcrumbs"><span class="mr-2">
                        <a href="{{route('home')}}">Home <i class="fa fa-chevron-right"></i></a></span> <span>About Us
                            <i class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">About Us</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    {!! DB::table('page_settings')->first()->about_us !!}
                </div>
            </div>
        </div>
    </section>
@endsection
