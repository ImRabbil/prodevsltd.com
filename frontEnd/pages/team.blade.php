@extends('frontEnd.layouts.master')

@section('title')
    Team
@endsection

@section('body')
    <section class="hero-wrap hero-wrap-2" style="background-image: url({{ asset('frontEnd/images/bg-4.jpg') }});">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end">
                <div class="col-md-9 ftco-animate">
                    <p class="breadcrumbs"><span class="mr-2"><a href="{{ route('home') }}">Home <i
                                    class="fa fa-chevron-right"></i></a></span> <span>Team <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">Team</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section">
        <div class="container">
            <div class="row no-gutters pb-5 justify-content-between">
                <div class="col-md-7 col-lg-6 heading-section ftco-animate">
                    <span class="subheading">Meet The Team</span>
                    <h2 class="mb-4">Professional <br>Creative Team Members</h2>
                </div>
                {{-- <div class="col-md-3 col-lg-2 d-flex align-items-center">
                    <a href="#" class="btn-custom">View All Members <span class="fa fa-chevron-right"></span></a>
                </div> --}}
            </div>
        </div>
        <div class="container">
            <div class="row">
                @if (!empty($teams))
                    @foreach ($teams as $item)
                        <div class="col-md-3 col-12 mb-4">
                            <div class="card" style="border: unset;">
                                <div class="card-body p-0">
                                    <img width="100%" style="border-top-right-radius: 10px;border-top-left-radius: 10px;" src="{{ asset($item->media->path ?? '') }}" alt="{{ $item->media->alt_text ?? '' }}">
                                </div>
                                <div class="card-header text-center" style="height: 110px; background: #1f1f1f;border-bottom-right-radius: 10px;border-bottom-left-radius: 10px; padding: 20px 15px;">
                                    <h5 class="devs_name">{{ $item->name }}</h5>
                                    <span class="position">{{ $item->designation }}</span>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
    </section>
@endsection
