@extends('frontEnd.layouts.master')

@section('title')
    Blog
@endsection
@section('body')
    <section class="hero-wrap hero-wrap-2" style="background-image: url({{ asset('frontEnd/images/bg-4.jpg') }});">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end">
                <div class="col-md-9 ftco-animate">
                    <p class="breadcrumbs"><span class="mr-2"><a href="{{ route('home') }}">Home <i
                                    class="fa fa-chevron-right"></i></a></span> <span>Blogs <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">Blogs</h1>
                </div>
            </div>
        </div>
    </section>

    <section class="ftco-section blog-page">
        <div class="container">
            <div class="row">
                @foreach ($blogs as $item)
                    <div class="col-md-4 mb-4">
                        <div class="card  b_card">
                            <div class="blog_image">
                                <a href="{{ route('blogs.details', $item->slug) }}">
                                    <img src="{{ asset($item->media->path ?? '') }}" alt="{{ $item->media->alt_text ?? '' }}">
                                </a>
                            </div>
                            <div class="text p-3">
                                <div class="header_text ">
                                    <div class="cat">
                                        @foreach ($item->get_categories as $category)
                                            <span class="badge bg-dark">{{ $category->name }}</span>
                                        @endforeach
                                    </div>
                                    <div class="icon">
                                        {{-- <span><i class="fa fa-user my-2"></i>
                                            @if (!empty($item->get_created_by))
                                                {{ $item->get_created_by->name }}
                                            @endif
                                        </span> --}}
                                        <span><i class="fa fa-calendar"></i>
                                            {{ date('d M Y', strtotime($item->created_at)) }}</span>
                                    </div>

                                </div>
                                <div class="title_text">
                                    <a href="{{ route('blogs.details', $item->slug) }}"> {{ $item->title }}</a>

                                </div>
                                <div class="description text-wrap">
                                    {!! $item->description !!}
                                </div>
                                <div class="custom_button" style="margin-bottom: 15px">
                                    <a href="{{ route('blogs.details', $item->slug) }}">See More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection
@section('js')
@endsection
