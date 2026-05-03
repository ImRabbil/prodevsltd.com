@extends('frontEnd.layouts.master')
@php
    $setting = DB::table('settings')->first();
@endphp
@section('title')
    Home
@endsection
@section('css')
    {{--<style>
        .ftco-services .container svg {
            color: black !important;
            height: 50px !important;
            width: 50px !important;
            stroke-width: 0.8px !important;
        }
    </style>--}}
@endsection

@section('body')

    {{-- slider section --}}
    <section class="hero-wrap">
        <div class="home-slider owl-carousel js-fullheight">
            @if (!empty($sliders))
                @foreach ($sliders as $slider)
                    <div class="slider-item js-fullheight" style="background-image:url({{ asset('/') }}frontEnd/images/bg-1.jpg);">
                        <div class="overlay"></div>
                        <div class="container">
                            <div
                                class="row d-flex no-gutters slider-text js-fullheight align-items-center justify-content-between align-items-stretch">
                                <div class="col-md-5 col-12 ftco-animate d-flex align-items-center justify-content-start">
                                    <div class="text w-100 banner-img">
                                        <img src="{{ asset( $slider->media->path ?? '') }}" alt="{{ $slider->media->alt_text ?? '' }}">
                                    </div>
                                </div>
                                <div class="col-md-5 ftco-animate d-flex align-items-center justify-content-end">
                                    <div class="text w-100 banner-text">
                                        <h2>{{ $slider->name }}</h2>
                                        <p class="mb-4">{{ $slider->description }}</p>
                                        <p><a href="#" class="btn btn-primary">Get Started</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>

    </section>
    {{-- service section --}}
    <section class="ftco-section ftco-services">
        <div class="container">
            <div class="row">
                <div class="col-md-6 d-flex align-self-stretch ftco-animate">
                    <div class="pb-4 heading-section heading-section-white">
                        <h2 class="mb-3">Services</h2>
                        <p class="mb-4">Customer service should not be a department. It should be the entire company</p>
                    </div>
                </div>
                @if (!empty($services))
                    @foreach ($services as $item)
                        <div class="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div class="services active">
                                <div class="d-flex justify-content-center">
                                    <div class="icon d-flex">
                                        {!! $item->icon !!}
                                    </div>
                                </div>
                                <div class="media-body text-center">
                                    <h3 class="heading mb-3">{{ $item->name }}</h3>
                                </div>
                                <a href="{{ route('service.details', $item->slug) }}"
                                   class="btn-custom d-flex align-items-center justify-content-center"><span
                                        class="fa fa-chevron-right"></span></a>
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
    </section>

    {{-- about us  section --}}
    <section class="ftco-section ftco-about ftco-no-pt ftco-no-pb img">
        <div class="container">
            <div class="row d-flex">
                <div class="col-md-12 about-intro">
                    <div class="row d-flex">
                        <div class="col-md-6 d-flex align-items-stretch">
                            <div class="img d-flex align-items-center align-self-stretch justify-content-center"
                                 style="background-image:url({{ asset('/') }}frontEnd/images/about-us-bg.jpg);">
                            </div>
                        </div>
                        <div class="col-md-6 pl-md-5 py-5">
                            <div class="row justify-content-start pb-3 pt-md-5">
                                <div class="col-md-12 heading-section ftco-animate">
                                    <span class="subheading">We are</span>
                                    <h1 class="mb-4">Professional Software, Digital and IT Solutions Company</h1>
                                    <p>Pro Devs Ltd. is a digital transformation consultancy and software development company that
                                        provides cutting edge software engineering solutions,
                                        helping companies and enterprise clients untangle complex issues that always emerge
                                        during their digital evolution journey. Since 2022
                                        we have been a visionary and a reliable software engineering partner for companies &
                                        brands.</p>
                                    <div class="year-stablish d-flex">
                                        <div class="icon2 d-flex align-items-center justify-content-center"><span
                                                class="flaticon-light-bulb"></span></div>
                                        <div class="text pl-4">
                                            @if (!empty($setting->established_date))
                                                @php
                                                    $date = date('Y-m-d H:i:s', strtotime($setting->established_date));
                                                    $years = date('Y') - date('Y', strtotime($date));
                                                @endphp
                                                <strong class="number" data-number="{{ $years ?? 0 }}">0</strong>
                                            @endif
                                            <span>Year Of<br> Experienced</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- company details section --}}
    <section class="ftco-section ftco-counter img" id="section-counter"
             style="background-image: url({{ asset('/') }}frontEnd/images/stat.jpg);">
        <div class="overlay"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-3 d-flex counter-wrap ftco-animate">
                    <div class="block-18 d-flex align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center"><span
                                class="flaticon-file"></span></div>
                        <div class="text pl-3">
                            @if ($setting)
                                <strong class="number" data-number="{{ $setting->completed_project }}">0</strong>
                                <span>Project Completed</span>
                            @endif

                        </div>
                    </div>
                </div>
                <div class="col-md-3 d-flex counter-wrap ftco-animate">
                    <div class="block-18 d-flex align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center"><span
                                class="flaticon-waiter"></span></div>
                        <div class="text pl-3">
                            @if ($setting)
                                <strong class="number" data-number="{{ $setting->team_member }}">0</strong>
                                <span>Team Members</span>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-md-3 d-flex counter-wrap ftco-animate">
                    <div class="block-18 d-flex align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center"><span
                                class="flaticon-customer-service"></span></div>
                        <div class="text pl-3">
                            @if ($setting)
                                <strong class="number" data-number="{{ $setting->service }}">0</strong>
                                <span>Service Provide</span>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-md-3 d-flex counter-wrap ftco-animate">
                    <div class="block-18 d-flex align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center"><span
                                class="flaticon-good-review"></span></div>
                        <div class="text pl-3">
                            @if ($setting)
                                <strong class="number" data-number="{{ $setting->clients }}">0</strong>
                                <span>Happy Clients</span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {{-- project section --}}
    <section class="ftco-section ftco-portfolio">
        <div class="overlay"></div>
        <div class="container">
            <div class="row justify-content-between pb-5">
                <div class="col-md-6 col-lg-6 heading-section heading-section-white ftco-animate">
                    <span class="subheading">Portfolio</span>
                    <h2 class="mb-4">Our Recent <br>Projects</h2>
                </div>
                <div class="col-md-4 col-lg-3 d-flex align-items-center justify-content-end">
                    <a href="{{ route('all.projects') }}" class="btn-custom">View All Projects <span class="fa fa-chevron-right"></span></a>
                </div>
            </div>
            <div class="row">
                @if (!empty($projects))
                    @foreach ($projects as $project)
                        <div class="col-md-4 ftco-animate">
                            <div class="project-wrap img d-flex align-items-end" style="background-image:url({{ asset($project->media->path ?? '') }})">
                                <div class="text">
                                    <span>{{ $project->subtitle }}</span>
                                    <h3><a href="{{ $project->url ?? 'javascript:void(0)' }}">{{ $project->title }}</a></h3>
                                    <a href="{{ $project->url ?? 'javascript:void(0)' }}" class="icon d-flex align-items-center justify-content-center"><span class="fa fa-chevron-right"></span></a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
    </section>

    {{-- Pricing plan section --}}
    {{-- <section class="pricing-plan">
        <div class="custom-container">
            <div class="pricing-plan-content">
                <div class="pricing-heading">
                    <h5 class="text-center">Pricing Plan</h5>
                </div>
                <!-- <div class="pricing-sub-heading">
                    <h5 class="text-center">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</h5>
                </div> -->
                <div class="row">
                    @foreach ($pricing_plans as $pricing_plan)
                        <div class="col-md-4 col-12 mb-3">
                            <div class="pricing-card">
                                <div class="heading">
                                    <h5>{{ $pricing_plan->heading }}</h5>
                                </div>
                                <div class="pricing">
                                    @if ($pricing_plan->discount_price > 0)
                                        <h5 class="mb-1">{{ $setting ? $setting->currency_sign : '' }}
                                            {{ number_format($pricing_plan->discount_price, 2) }}</h5>
                                        <h5 class="old-price">
                                            {{ $setting ? $setting->currency_sign : '' }}
                                            {{ number_format($pricing_plan->regular_price, 2) }}</h5>
                                    @else
                                        <h5>{{ $setting ? $setting->currency_sign : '' }}
                                            {{ number_format($pricing_plan->regular_price, 2) }}</h5>
                                    @endif
                                </div>
                                <div class="sub-heading">
                                    <p>{{ $pricing_plan->sub_heading }}</p>
                                </div>
                                <div class="features">
                                    <ul>
                                        @foreach (json_decode($pricing_plan->features, true) as $feature)
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-check">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 12l5 5l10 -10" />
                                                </svg>
                                                <span>{{ $feature }}</span>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                                <div class="action">
                                    <a href="{{ route('checkout', $pricing_plan->slug) }}" class="get-started-button">Get Started</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section> --}}

    {{-- Testimonial section --}}
    <section class="ftco-section testimony-section ftco-no-pt bg-light">
        <div class="overlay"></div>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-7 heading-section ftco-animate">
                    <span class="subheading">Testimonial</span>
                    <h2 class="mb-4">Clients Say <br>About Our Works</h2>
                </div>
            </div>
        </div>
        <div class="container-fluid px-lg-5">
            <div class="row ftco-animate">
                <div class="col-md-12">
                    <div class="carousel-testimony owl-carousel">
                        @if (!empty($testimonials))
                            @foreach ($testimonials as $item)
                                <div class="item">
                                    <div class="testimony-wrap py-4">
                                        <div class="text">
                                            <p class="mb-4 testimony_text">{{ $item->message }}</p>
                                            <div class="d-flex align-items-center">
                                                <div class="user-img" style="background-image:url({{ asset($item->media->path ?? '') }})">
                                                </div>
                                                <div class="pl-3">
                                                    <p class="star">
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                    </p>
                                                    <p class="name">{{ $item->name }}</p>
                                                    <span class="position" style="text-transform: capitalize;font-size: 14px">
                                                        <img style="display: inline-block;width: 20px"
                                                            src="{{ asset($item->flag) }}" alt="{{ $item->media->alt_text ?? '' }}">
                                                        &nbsp;&nbsp;{{ $item->country }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- client section --}}
    <section class="ftco-section client-section ftco-no-pb">
        <div class="overlay"></div>
        <div class="container">
            <div class="row pb-4">
                <div class="col-md-7 heading-section ftco-animate">
                    <span class="subheading">Clients</span>
                    <h2 class="mb-4">Our Valuable <br>Clients</h2>
                </div>
            </div>
        </div>
        <div class="container px-lg-5">
            <div class="row ftco-animate">
                <div class="col-md-12">
                    <div class="carousel-clients owl-carousel">
                        @if (!empty($clients) && count($clients) > 0)
                            @foreach ($clients->chunk(3) as $chunk)
                                <div class="item">
                                    @foreach($chunk as $item)
                                    <div class="client-img-wrap">
                                        <img src="{{ asset($item->media->path ?? '') }}" alt="{{ $item->media->alt_text ?? '' }}">
                                    </div>
                                    @endforeach
                                </div>
                            @endforeach
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>

@endsection
