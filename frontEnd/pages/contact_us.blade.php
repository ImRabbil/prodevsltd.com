@extends('frontEnd.layouts.master')

@section('title')
    Contact Us
@endsection
@php
    $setting = DB::table('settings')->first();
@endphp
@section('css')
@endsection

@section('body')
    <section class="hero-wrap hero-wrap-2" style="background-image: url({{ asset('frontEnd/images/bg-4.jpg') }});">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end">
                <div class="col-md-9 ftco-animate">
                    <p class="breadcrumbs"><span class="mr-2"><a href="{{ route('home') }}">Home <i
                                    class="fa fa-chevron-right"></i></a></span> <span>Contact Us <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">Contact us</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="wrapper">
                        <div class="row no-gutters">
                            <div class="col-md-7 d-flex align-items-stretch">
                                <div class="contact-wrap w-100 p-md-5 p-4 section-loader-wrapper">
                                    <div class="section-loader" id="contact-loader">
                                        <div class="loader-spinner"></div>
                                    </div>
                                    <h3 class="mb-3">Get in touch</h3>

                                    <form id="contactForm" action="{{ route('contact') }}" method="post"
                                          enctype="multipart/form-data">
                                        @csrf
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="name" id="name"
                                                           autocomplete="off" placeholder="Name *">
                                                    <span class="text-danger name_error" style="color: red"></span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input type="number" class="form-control" name="phone" id="phone"
                                                           autocomplete="off" placeholder="Phone *">
                                                    <span class="text-danger phone_error" style="color: red"></span>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input type="email" class="form-control" name="email" id="email"
                                                           autocomplete="off" placeholder="Email (Optional)">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="subject" id="subject"
                                                           autocomplete="off" placeholder="Subject *">
                                                    <span class="text-danger subject_error" style="color: red"></span>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <textarea name="message" class="form-control" id="message" cols="30" rows="7" placeholder="Message *"></textarea>
                                                    <span class="text-danger message_error" style="color: red"></span>
                                                </div>

                                            </div>
                                            <div class="col-md-12 mb-3">
                                                <span class="text-danger g-recaptcha-response_error" style="color: red"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="submit" value="Send Message"
                                                           class="btn btn-primary font-weight">
                                                    <div class="submitting"></div>
                                                    <div id="success-message"
                                                         style="display: none;margin: 10px 0;color: #10a460 !important;line-height: 20px;"></div>
                                                </div>

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-5 d-flex align-items-stretch">
                                <div class="info-wrap bg-darken w-100 p-lg-5 p-4">
                                    <h3 class="mb-4 mt-md-4">Contact us</h3>
                                    <div class="dbox w-100 d-flex align-items-start">
                                        <div class="icon d-flex align-items-center justify-content-center">
                                            <span class="fa fa-map-marker"></span>
                                        </div>
                                        <div class="text pl-3">
                                            @if (!empty($setting->address))
                                                <p>{{ $setting->address }}</p>
                                            @endif

                                        </div>
                                    </div>
                                    <div class="dbox w-100 d-flex align-items-center">
                                        <div class="icon d-flex align-items-center justify-content-center">
                                            <span class="fa fa-phone"></span>
                                        </div>
                                        <div class="text pl-3">

                                            @if (!empty($setting->phone))
                                                <p><a href="tel:01867417944">{{ $setting->phone }}</a>
                                                </p>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="dbox w-100 d-flex align-items-center">
                                        <div class="icon d-flex align-items-center justify-content-center">
                                            <span class="fa fa-paper-plane"></span>
                                        </div>
                                        <div class="text pl-3">
                                            @if (!empty($setting->email))
                                                <p><a href="mailto:ask@prodevsltd.com">{{ $setting->email }}</a>
                                                </p>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="dbox w-100 d-flex align-items-center">
                                        <ul class="ftco-footer-social list-unstyled mt-md-4">
                                            @if (!empty($setting->facebook))
                                                <li class="ftco-animate"><a href="{{ $setting->facebook }}"
                                                                            target="_blank"><span class="fa fa-facebook"></span></a></li>
                                            @endif
                                            @if (!empty($setting->twitter))
                                                <li class="ftco-animate"><a href="{{ $setting->twitter }}"><span
                                                            class="fa fa-twitter"></span></a></li>
                                            @endif
                                            @if (!empty($setting->linkedin))
                                                <li class="ftco-animate"><a href="{{ $setting->linkedin }}"><span
                                                            class="fa fa-linkedin"></span></a></li>
                                            @endif
                                            @if (!empty($setting->youtube))
                                                <li class="ftco-animate"><a href="{{ $setting->youtube }}"><span
                                                            class="fa fa-youtube"></span></a></li>
                                            @endif
                                            @if (!empty($setting->instagram))
                                                <li class="ftco-animate"><a href="{{ $setting->instagram }}"><span
                                                            class="fa fa-instagram"></span></a></li>
                                            @endif
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 mt-5">
                    <div class="bg-white map">
                        @if (!empty($setting->map))
                            {!! $setting->map !!}
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
@section('js')
    <script>
        $(document).ready(function () {
            $('#contactForm').on('submit', function (e) {
                e.preventDefault();
                var $submitBtn = $(this).find('input[type="submit"]');
                var $loader = $('#contact-loader');
                
                // Clear previous messages
                $('span.text-danger').text('');
                $('#success-message').hide().text('');
                
                $loader.addClass('active');
                $submitBtn.prop('disabled', true).val('Sending...');
                grecaptcha.ready(function() {
                    grecaptcha.execute('{{ env('RECAPTCHA_SITE_KEY') }}', {action: 'contact'}).then(function(token) {
                        var formData = new FormData(document.getElementById('contactForm'));
                        formData.append('g-recaptcha-response', token);
                        $.ajax({
                            url: $('#contactForm').attr('action'),
                            type: $('#contactForm').attr('method'),
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                $loader.removeClass('active');
                                $submitBtn.prop('disabled', false).val('Send Message');
                                if (data.res_status == 1) {
                                    $('#success-message').text(
                                        'We have received your request. Our concern team will contact you soon. Thank you.').fadeIn();
                                    $('#contactForm')[0].reset();
                                } else {
                                    if (typeof data.error === 'object') {
                                        $.each(data.error, function (prefix, val) {
                                            $('span.' + prefix + '_error').text(val[0]).show();
                                        });
                                    } else {
                                        // Handle string error (e.g. exception message)
                                        $('.g-recaptcha-response_error').text(data.error || 'An unexpected error occurred.').show();
                                    }
                                }
                            },
                            error: function (error) {
                                $loader.removeClass('active');
                                $submitBtn.prop('disabled', false).val('Send Message');
                                console.error('Contact error:', error);
                            }
                        });
                    });
                });
            });

        });
    </script>
@endsection
