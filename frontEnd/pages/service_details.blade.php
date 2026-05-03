 @extends('frontEnd.layouts.master')

 @section('title')
     Service Details
 @endsection
 @section('meta')
 <meta name="title" content="{{ $service_details->meta_title ?? null }}" />
 <meta name="description" content="{{ $service_details->meta_description ?? null }}" />
 {{-- <meta name="keywords" content="{{ $service_details->keywords ?? null }}" /> --}}
 @endsection

 @section('css')
     <style>
         .active {
             background: #1f1f1f !important;
             color: #fcbb15 !important;
         }
     </style>
 @endsection

 @section('body')
     <section class="hero-wrap hero-wrap-2" style="background-image: url({{ asset('frontEnd/images/bg-4.jpg') }});">
         <div class="overlay"></div>
         <div class="container">
             <div class="row no-gutters slider-text align-items-end">
                 <div class="col-md-9 ftco-animate">
                     <p class="breadcrumbs"><span class="mr-2"><a href="{{ route('home') }}">Home <i
                                     class="fa fa-chevron-right"></i></a></span> <span>Service Details <i
                                 class="fa fa-chevron-right"></i></span></p>
                     <h1 class="mb-0 bread">{{ $service_details->name }}</h1>
                 </div>
             </div>
         </div>
     </section>


     <section class="ftco-section">
         <div class="container">
             <div class="row justify-content-center">
                 <div class="col-md-12">
                     <div class="row">
                         <div class="col-md-8">
                             <div class="image">
                                 <img src="{{ asset($service_details->media->path ?? '') }}" alt="{{ $service_details->media->alt_text ?? '' }}">
                             </div>
                             <div class="text">
                                 <h3 class="mt-3">{{ $service_details->name }}</h3>
                                 {!! $service_details->description !!}
                             </div>
                         </div>
                         <div class="col-md-4">

                             <div class="row">
                                 {{-- <div class="col-md-12 mb-3">
                                    <div class="card custom_card">
                                        <h4>Search</h4>
                                        <form action="" class="form">
                                            <input type="text" name="" class="form-control"
                                                placeholder="Search here...">
                                            <button>

                                                <i class="fa fa-search" aria-hidden="true"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div> --}}
                                 <div class="col-md-12">
                                     <div class="card custom_card">
                                         <ul>
                                             @foreach ($services as $item)
                                                 <li><a class="{{ $item->id == $service_details->id ? 'active' : '' }}"
                                                         href="{{ route('service.details', $item->slug) }}">{{ $item->name }}</a>
                                                 </li>
                                             @endforeach

                                         </ul>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>


             </div>
         </div>
     </section>
 @endsection
