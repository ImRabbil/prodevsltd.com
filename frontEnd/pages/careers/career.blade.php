 @extends('frontEnd.layouts.master')
@section('title')
    Career
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
                    <p class="breadcrumbs">
                        <span class="mr-2"><a href="{{ route('home') }}">Home
                        <i class="fa fa-chevron-right"></i></a></span> <span>Career
                        <i class="fa fa-chevron-right"></i></span>
                    </p>
                    <h1 class="mb-0 bread">Career</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section">
        <div class="container">
            @if ($careers)
                @foreach ($careers as $item)
                    <div class="row career mb-3">
                        <div class="col-12">
                            <div class="card">
                                <?php
                                $deadline = \Carbon\Carbon::parse($item->deadline)->format('Y-m-d');
                                $currentDate = \Carbon\Carbon::now()->format('Y-m-d');
                                ?>
                                <div class="card-body">
                                    @if ($deadline <= $currentDate)
                                        <span class="badge badge-danger">Closed</span>
                                    @else
                                        <span class="badge badge-success">Open</span>
                                    @endif
                                    <a @if ($deadline <= $currentDate) disabled="disabled" @endif
                                        href="{{ route('career.full_stack_developer_laravel', $item->slug) }}">
                                        <h4 class="job-title"><b style="color: black">Job Title:</b> {{ $item->title }}
                                        </h4>
                                    </a>
                                    <p><b>Vacancy: </b> {{ $item->vacancy }}</p>
                                    <p><b>Experience: </b> {{ $item->experience }}</p>
                                    <p><b>Job Nature: </b> {{ $item->job_nature }}</p>
                                    <p><b>Location: </b> {{ $item->job_location }}</p>
                                    <a href="{{ route('career.full_stack_developer_laravel', $item->slug) }}"
                                        class="btn btn-primary mt-md-4 fw-bold @if ($deadline <= $currentDate) disabled @endif">View
                                        Details & Apply</a>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </section>
@endsection




