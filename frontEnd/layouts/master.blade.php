<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LLVF13CFL1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-LLVF13CFL1');
    </script>
    @php
        $setting = DB::table('settings')->first();
    @endphp

    {{-- <title>{{ env('APP_NAME') }} | @yield('title')</title>
    @if (request()->is('/'))
        <meta name="title" content="{{ $setting->meta_title ?? null }}"/>
        <meta name="description" content="{{ $setting->meta_description ?? null }}"/>
        <meta name="keywords" content="{{ $setting->meta_keywords ?? null }}"/>
    @else
        @yield('meta')
    @endif
    <meta name="robots" content="index, follow"/> --}}

    {!! $seotags ?? '' !!}
	{!! $breadcrumbs ?? '' !!}
	{!! $jsonld ?? '' !!}

    {{-- Favicon --}}
    @if (!empty($setting->favicon))
        <link rel="icon" href="{{ asset($setting->favicon) }}">
    @endif

    <link rel="stylesheet" href="{{ asset('frontEnd/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('frontEnd/css/animate.css') }}">
    <link rel="stylesheet" href="{{ asset('frontEnd/css/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('frontEnd/css/owl.theme.default.min.css') }}">
    <link rel="stylesheet" href="{{ asset('frontEnd/css/magnific-popup.css') }}">
    <link rel="stylesheet" href="{{ asset('frontEnd/css/flaticon.css') }}">
    <link rel="stylesheet" href="{{ asset('frontEnd/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('frontEnd/css/custom.css') }}">
    {!! htmlScriptTagJsApi() !!}
    @yield('css')
    <meta name="google-site-verification" content="gs8W2OYpp_gofQDjqrEiHuch9V2t05zUYqaOzq5UiV4"/>
</head>

<body>
@include('frontEnd.includes.header')

@yield('body')
@include('frontEnd.includes.footer')
@include('frontEnd.includes.social-button')

{{-- <a style="-webkit-appearance: none;" target="_blank" type="button" id="live_chat_btn"
   href="https://api.whatsapp.com/send?phone=8801867417944">
    <img class="wapp_chat" src="{{ asset('frontEnd/images/wapp_logo.png') }}" alt="Whats App Chat">
</a> --}}

<div id="ftco-loader" class="show fullscreen">
    <svg class="circular" width="48px" height="48px">
        <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4"
                stroke="#eeeeee"/>
        <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4"
                stroke-miterlimit="10" stroke="#F96D00"/>
    </svg>
</div>
</body>
<script src="{{ asset('frontEnd/js/jquery.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/jquery-migrate-3.0.1.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/popper.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/jquery.easing.1.3.js') }}"></script>
<script src="{{ asset('frontEnd/js/jquery.waypoints.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/jquery.stellar.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/owl.carousel.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/jquery.magnific-popup.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/jquery.animateNumber.min.js') }}"></script>
<script src="{{ asset('frontEnd/js/scrollax.min.js') }}"></script>
{{-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&amp;sensor=false"></script>
<script src="{{asset('frontEnd/js/google-map.js')}}"></script> --}}
<script src="{{ asset('frontEnd/js/main.js') }}"></script>
@yield('js')
<script src="https://www.google.com/recaptcha/api.js?render={{ env('RECAPTCHA_SITE_KEY') }}"></script>
<style>.grecaptcha-badge{ display: none!important }</style>
<script>
    $(document).ready(function () {
        $('#newsletter').on('submit', function (e) {
            e.preventDefault();
            var $submitBtn = $(this).find('input[type="submit"]');
            var $loader = $('#newsletter-loader');
            
            // Clear messages
            $('.success-message').text('').hide();
            $('.email_error').text('').hide();
            $('.g-recaptcha-response_error').text('').hide();
            
            $submitBtn.prop('disabled', true).val('Submitting...');
            $loader.addClass('active');

            grecaptcha.ready(function() {
                grecaptcha.execute('{{ env('RECAPTCHA_SITE_KEY') }}', {action: 'newsletter'}).then(function(token) {
                    var formData = new FormData(document.getElementById('newsletter'));
                    formData.append('g-recaptcha-response', token);
                    $.ajax({
                        url: $('#newsletter').attr('action'),
                        type: $('#newsletter').attr('method'),
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            $submitBtn.prop('disabled', false).val('Subscribe');
                            $loader.removeClass('active');
                            if (data.res_status == 1) {
                                $('.success-message').text('Thanks for your subscription!').fadeIn();
                                $('#newsletter')[0].reset();
                            } else {
                                if (typeof data.error === 'object') {
                                    $.each(data.error, function (prefix, val) {
                                        $('span.' + prefix + '_error').text(val[0]).show();
                                    });
                                } else {
                                    // Handle string error (e.g. exception message)
                                    $('.email_error').text(data.error || 'An unexpected error occurred.').show();
                                }
                            }
                        },
                        error: function (error) {
                            $submitBtn.prop('disabled', false).val('Subscribe');
                            $loader.removeClass('active');
                            console.error('Newsletter error:', error);
                        }
                    });
                });
            });
        });

        // Mobile dropdown fix
        $('.dropdown-toggle').on('click touchstart', function(e) {
            if ($(window).width() >= 768) return; // let Bootstrap handle on desktop
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            var $menu = $this.next('.dropdown-menu');
            var $parent = $this.parent('.dropdown');
            if ($parent.hasClass('show')) {
                $parent.removeClass('show');
                $menu.removeClass('show');
                $this.attr('aria-expanded', 'false');
            } else {
                $('.dropdown').removeClass('show');
                $('.dropdown-menu').removeClass('show');
                $('.dropdown-toggle').attr('aria-expanded', 'false');
                $parent.addClass('show');
                $menu.addClass('show');
                $this.attr('aria-expanded', 'true');
            }
        });
    });
</script>

</html>
