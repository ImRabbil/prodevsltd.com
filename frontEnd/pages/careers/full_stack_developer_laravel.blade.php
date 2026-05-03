@extends('frontEnd.layouts.master')

@section('title')
    Full-Stack Developer (Laravel)
@endsection

@section('body')
    <section class="hero-wrap hero-wrap-2" style="background-image: url({{ asset('frontEnd/images/bg-4.jpg') }});">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end">
                <div class="col-md-12 ftco-animate pb-5">
                    <p class="breadcrumbs"><span class="mr-2"><a href="{{ route('home') }}">Home <i
                                    class="fa fa-chevron-right"></i></a></span> <span>Career <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">{{ $career->title }}</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section">
        <div class="container">
            <div class="row career-details">
                <div class="col-12 mb-5">
                    <img width="100%" src="{{ asset('frontEnd/images/career/full-stack-developer-laravel.jpg') }}" alt="Full-Stack Developer (Laravel) - Pro Devs">
                </div>

                <div class="col-12">
                    <h3 class="job-title"> Full-Stack Developer (Laravel)</h3>
                    <p><b>Vacancy: </b> {{ $career->vacancy }}</p>
                    <p><b>Job Responsibilities: </b></p>
                    <div>
                        {!! $career->job_responsibilities !!}
                    </div>
                    <p><b>Technical Requirements:</b></p>
                    <div>
                        {!! $career->technical_requirement !!}
                    </div>

                    <p><b>Educational Requirements:</b></p>
                    <div>
                        {!! $career->educational_requirement !!}
                    </div>
                    <p><b>Experience: </b> {{ $career->experience }}</p>
                    <p><b>Job Nature: </b> {{ $career->job_nature }}</p>
                    <p><b>Job Location: </b> {{ $career->job_location }}</p>
                    <p><b>Salary Range: </b> {{ $career->salary_range }}</p>
                    <p><b>Working Days: </b> {{ $career->working_days }}</p>
                    <p><b>Working Hours: </b> {{ $career->working_hours }}</p>

                    <p><b>Compensation & Other Benefits:</b></p>
                    <div>
                        {!! $career->compensation_other_benefit !!}
                    </div>

                    <p><b>For Apply:</b></p>
                    <p>
                        {{ $career->for_apply_instruction }}
                    </p>

                    <p><b>Deadline:</b> {{ date('d M Y', strtotime($career->deadline)) }}</p>
                </div>

            </div>
        </div>
    </section>
@endsection
