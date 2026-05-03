@extends('frontEnd.layouts.master')

@section('title')
    Project
@endsection

@section('css')
    <style>
        a[disabled="disabled"] {
            pointer-events: none;
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
                                    class="fa fa-chevron-right"></i></a></span> <span>Projects <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">Projects</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section">
        <div class="container">
            <div class="row">
                @if (!empty($projects))
                    @foreach ($projects as $project)
                        <div class="col-md-3 ftco-animate">
                            <div class="project-wrap img d-flex align-items-end" style="background-image:url({{ asset($project->media->path ?? '') }})">
                                <div class="text">
                                    <span>{{ $project->subtitle }}</span>
                                    <h3><a href="">{{ $project->title }}</a></h3>
                                    {{-- <a href="" class="icon d-flex align-items-center justify-content-center"><span class="fa fa-chevron-right"></span></a> --}}
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>
            {{ $projects->links('pagination.paginate') }}
        </div>
    </section>
@endsection
