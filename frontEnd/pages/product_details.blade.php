 @extends('frontEnd.layouts.master')
@php
    $setting = DB::table('settings')->first();
@endphp
 @section('title')
     Product Details
 @endsection
 @section('css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/css/lightgallery-bundle.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"/>
     <style>
        .custom_card .active {
            background: #fcbb15 !important;
            color: #1a1a1a !important;
        }

         /* Premium Discount Form Design */
        .discount-form-card {
            border: 1px solid #f0f0f0;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
            margin: 20px auto;
            background: #fff;
            max-width: 700px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .discount-form-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        }

        .discount-form-header {
            background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
            padding: 20px 15px;
            text-align: center;
            position: relative;
        }

        .discount-form-header h4 {
            color: #fcbb15;
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .discount-form-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: #fcbb15;
            border-radius: 2px 2px 0 0;
        }

        .discount-form-header p {
            color: #ccc;
            font-size: 14px;
            margin-bottom: 0;
            font-weight: 400;
        }

        .discount-form-body {
            padding: 15px 30px; 
        }

        .form-group-custom {
            margin-bottom: 25px;
            position: relative;
        }

        .form-group-custom i {
            position: absolute;
            left: 20px;
            top: 18px;
            color: #bbb;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .form-group-custom .form-control {
            height: 55px;
            padding-left: 55px;
            border: 2px solid #f5f5f5;
            border-radius: 12px;
            font-size: 15px;
            color: #333;
            transition: all 0.3s ease;
            background: #fafafa;
        }

        .form-group-custom .form-control:focus {
            border-color: #fcbb15;
            box-shadow: 0 0 0 4px rgba(252, 187, 21, 0.15);
            background: #fff;
            outline: none;
        }

        .form-group-custom .form-control:focus + i {
            color: #fcbb15;
            transform: scale(1.1);
        }

        .form-group-custom textarea.form-control {
            height: 120px;
            padding-top: 18px;
            resize: none;
        }

        .btn-send-now {
            background: #fcbb15;
            color: #1a1a1a;
            border: none;
            height: 55px;
            border-radius: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            width: 100%;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 20px rgba(252, 187, 21, 0.2);
            position: relative;
            overflow: hidden;
        }

        .btn-send-now:hover {
            background: #1a1a1a;
            color: #fcbb15;
            transform: scale(1.02);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .btn-send-now:active {
            transform: translateY(0);
        }
        
        #success-message {
            background: #d4edda;
            color: #155724;
            padding: 12px;
            border-radius: 8px;
            font-size: 13px;
            border: 1px solid #c3e6cb;
        }

        /* SYNCED GALLERY DESIGN */
        .product-gallery-container {
            margin-bottom: 30px;
        }

        /* Main Slider */
        .slider-for {
            position: relative;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            margin-bottom: 15px;
        }

        .slider-for .item {
            position: relative;
            outline: none;
            background: #fff;
            aspect-ratio: 4 / 3;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .slider-for .item img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            border-radius: 12px;
        }

        /* Top-right Expand Icon */
        .lg-trigger {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0,0,0,0.4);
            color: #fff;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 8px;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }

        .lg-trigger:hover {
            background: #fcbb15;
            color: #000;
        }

        /* Thumb Slider */
        .slider-nav {
            margin: 0 -5px;
        }

        .slider-nav .item {
            padding: 0 5px;
            outline: none;
            cursor: pointer;
        }

        .slider-nav .item .thumb-box {
            border: 2px solid #eee;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            aspect-ratio: 1;
            opacity: 0.6;
            margin: 5px;
        }

        .slider-nav .item .thumb-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .slider-nav .slick-current .thumb-box {
            border-color: #fcbb15;
            box-shadow: 0 5px 15px rgba(252, 187, 21, 0.3);
            opacity: 1;
            transform: scale(1.05);
        }

        /* Make main slider items look clickable */
        .slider-for .item {
            cursor: zoom-in;
        }

        /* Make main slider items look clickable */
        .slider-for .item {
            cursor: zoom-in;
        }

        /* Custom Slick Arrows over the main image */
        .product-gallery-container .slick-prev,
        .product-gallery-container .slick-next {
            z-index: 11;
            width: 40px;
            height: 40px;
            background: rgba(0,0,0,0.6);
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        .product-gallery-container .slick-prev { left: 15px; }
        .product-gallery-container .slick-next { right: 15px; }
        
        .product-gallery-container .slick-prev:hover,
        .product-gallery-container .slick-next:hover {
            background: #fcbb15;
        }

        .product-gallery-container .slick-prev:before,
        .product-gallery-container .slick-next:before {
            font-family: 'FontAwesome';
            font-size: 18px;
            color: white;
            line-height: 40px;
        }
        .product-gallery-container .slick-prev:before { content: "\f104"; }
        .product-gallery-container .slick-next:before { content: "\f105"; }

        /* Disable Arrows at Ends (Manual) */
        .product-gallery-container .hide-arrow {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }

        @media (max-width: 768px) {
            .lg-trigger { width: 35px; height: 35px; line-height: 35px; top: 10px; right: 10px; }
            .discount-form-card {
                width: 100% !important;
                margin: 30px 0;
                border-radius: 0;
                box-shadow: none;
                border-left: none;
                border-right: none;
            }
            .discount-form-body {
                padding: 30px 20px;
            }
            .discount-form-header h4 {
                font-size: 20px;
            }
        }

        /* Premium CTA Section V2 Design */
        .cta-section-v2 {
            position: relative;
            padding: 40px 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            text-align: center;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .cta-section-v2::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85));
            z-index: 1;
        }

        .cta-section-v2 .auto-container {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 1140px;
            padding: 0 20px;
            margin: 0 auto;
        }

        .cta-section-v2 .content-box {
            max-width: 800px;
            margin: 0 auto;
        }

        .cta-section-v2 h2 {
            font-size: 24px;
            color: #fcbb15;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 10px;
            letter-spacing: 2px;
            line-height: 1.2;
        }

        .cta-section-v2 p {
            font-size: 18px;
            color: #fff;
            margin-bottom: 40px;
            line-height: 1.6;
            font-weight: 400;
            opacity: 0.9;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .cta-section-v2 .btn-box a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: auto;
            min-width: 200px;
            padding: 0 40px;
            text-decoration: none;
            background: #fcbb15;
            color: #1a1a1a;
            border: none;
            height: 55px;
            border-radius: 12px;
            font-weight: 800;
        }

        @media (max-width: 768px) {
            .cta-section-v2 { padding: 80px 0; background-attachment: scroll; }
            .cta-section-v2 h2 { font-size: 32px; }
            .cta-section-v2 p { font-size: 16px; padding: 0 10px; }
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
                                    class="fa fa-chevron-right"></i></a></span> <span>Product Details <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">{{ $product->name }}</h1>
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
                            @php
                                $allGalleryImages = $product->gallery ?? [];
                                if(!empty($product->media->path)) {
                                    // Ensure featured image is first
                                    if(!in_array($product->media->path, $allGalleryImages)) {
                                        array_unshift($allGalleryImages, $product->media->path);
                                    }
                                }
                                $totalImages = count($allGalleryImages);
                            @endphp

                            @if($totalImages > 0)
                                <div class="product-gallery-container">
                                    <!-- Main Slider -->
                                    <div class="slider-for">
                                        @foreach($allGalleryImages as $galleryImg)
                                            <div class="item lg-trigger-container">
                                                <img src="{{ asset($galleryImg) }}" alt="{{ $product->name }}">
                                                <div class="lg-trigger">
                                                    <i class="fa fa-expand"></i>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>

                                    <!-- Thumbnail Slider -->
                                    <div class="slider-nav">
                                        @foreach($allGalleryImages as $galleryImg)
                                            <div class="item">
                                                <div class="thumb-box">
                                                    <img src="{{ asset($galleryImg) }}" alt="Thumbnail">
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>

                                    <!-- Hidden Lightgallery items for integration -->
                                    <div id="lightgallery" style="display:none">
                                        @foreach($allGalleryImages as $galleryImg)
                                            <a href="{{ asset($galleryImg) }}" data-lg-size="1600-1200">
                                                <img src="{{ asset($galleryImg) }}" />
                                            </a>
                                        @endforeach
                                    </div>
                                </div>
                            @endif

                        <div class="text">
                            <h3 class="mt-4">{{ $product->name }}</h3>
                            {!! $product->description !!}
                        </div>

                        <hr>

                        <!--Discount Form-->
                        <div class="discount-form-card section-loader-wrapper">
                            <!-- Section Loader -->
                            <div class="section-loader" id="product-contact-loader">
                                <div class="loader-spinner"></div>
                            </div>

                            <div class="discount-form-header">
                                <h4>Ask for Admin Demo</h4>
                                <p>Please submit this form for admin demo, we will contact you soon.</p>
                            </div>
                            <div class="discount-form-body">
                                <!--Comment Form-->
                                <form id="discountForm" method="post" action="{{ route('contact') }}">
                                    @csrf
                                    <input type="hidden" name="type" value="product">
                                    <input type="hidden" name="subject" value="{{ $product->name }}">
                                    
                                    <div class="form-group-custom">
                                        <input type="text" name="name" class="form-control" placeholder="Full Name" required="">
                                        <i class="fa fa-user"></i>
                                        <span class="text-danger name_error" style="color: red; font-size: 12px; display: block; margin-top: 5px;"></span>
                                    </div>

                                    <div class="form-group-custom">
                                        <input type="email" name="email" class="form-control" placeholder="Email Address" required="">
                                        <i class="fa fa-envelope"></i>
                                        <span class="text-danger email_error" style="color: red; font-size: 12px; display: block; margin-top: 5px;"></span>
                                    </div>

                                    <div class="form-group-custom">
                                        <input type="text" name="phone" class="form-control" placeholder="Phone Number" required="">
                                        <i class="fa fa-phone"></i>
                                        <span class="text-danger phone_error" style="color: red; font-size: 12px; display: block; margin-top: 5px;"></span>
                                    </div>

                                    <div class="form-group-custom">
                                        <textarea name="message" class="form-control" placeholder="Ask any product reletaed question here."></textarea>
                                        <i class="fa fa-pencil"></i>
                                        <span class="text-danger message_error" style="color: red; font-size: 12px; display: block; margin-top: 5px;"></span>
                                    </div>

                                    <div class="text-center">
                                        <button class="btn-send-now" type="submit">Send Message</button>
                                        <div class="mt-2 text-center">
                                            <span class="text-danger g-recaptcha-response_error" style="color: red; font-size: 12px; display: block;"></span>
                                        </div>
                                        <div id="success-message" style="display: none; margin-top: 20px;"></div>
                                    </div>
                                </form>
                            </div>
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
                                        <div class="card-header-premium">
                                            <h4>Our Products</h4>
                                        </div>
                                        <ul>
                                            @foreach ($products as $item)
                                                <li>
                                                    <a class="{{ $item->id == $product->id ? 'active' : '' }}" href="{{ route('product.details', $item->slug) }}">
                                                        {{ Str::limit($item->name, 200) }}
                                                    </a>
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

    <section class="cta-section-v2" style="background-image: url({{ asset('frontEnd/images/bg-4.jpg') }});">
        <div class="auto-container">
            <div class="content-box">
                <h2>Get A Quote</h2>
                <p>Ready to get started? Contact us today for a free consultation and let's bring your vision to life.</p>
                <div class="btn-box">
                    <a href="{{ route('contact.us') }}">Contact Us</a>
                </div>
            </div>
        </div>
    </section>

    @if (count($product->pricingPlans) > 0)
    <section class="pricing-plan">
        <div class="custom-container">
            <div class="pricing-plan-content">
                <div class="pricing-heading">
                    <h5 class="text-center">Pricing Plan</h5>
                </div>
                <!-- <div class="pricing-sub-heading">
                    <h5 class="text-center">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</h5>
                </div> -->
                <div class="row">
                    @foreach ($product->pricingPlans as $pricing_plan)
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
    </section>
    @endif
 @endsection

  @section('js')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/lightgallery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/plugins/zoom/lg-zoom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/plugins/thumbnail/lg-thumbnail.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
    <script>
        $(document).ready(function() {
            const $sliderFor = $('.slider-for');
            const $sliderNav = $('.slider-nav');
            const totalSlides = {{ $totalImages }};

            // Main Slider
            $sliderFor.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: '.slider-nav',
                infinite: true,
                speed: 500,
                cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
            });

            // Arrow visibility management
            function updateArrows(currentSlide) {
                if (currentSlide === 0) {
                    $('.slick-prev').addClass('hide-arrow');
                } else {
                    $('.slick-prev').removeClass('hide-arrow');
                }
                
                if (currentSlide === totalSlides - 1) {
                    $('.slick-next').addClass('hide-arrow');
                } else {
                    $('.slick-next').removeClass('hide-arrow');
                }
            }

            // Initialize arrow visibility
            updateArrows(0);

            // Update arrows on slide change
            $sliderFor.on('afterChange', function(event, slick, currentSlide) {
                updateArrows(currentSlide);
            });

            // Thumbnail Slider
            $sliderNav.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                centerMode: true,
                centerPadding: '0px',
                focusOnSelect: true,
                infinite: true,
                speed: 500,
                cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 5,
                            centerMode: true
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            centerMode: true
                        }
                    }
                ]
            });

            // Initialize LightGallery (for expansion)
            const lgContainer = document.getElementById('lightgallery');
            let dynamicGallery = null;
            if (lgContainer) {
                dynamicGallery = lightGallery(lgContainer, {
                    plugins: [lgZoom, lgThumbnail],
                    speed: 500,
                    thumbnail: true,
                    mobileSettings: {
                        controls: true,
                        showCloseIcon: true,
                        download: false
                    }
                });
            }

            // Expansion Trigger (Entire item is now clickable)
            $(document).on('click', '.lg-trigger-container', function(e) {
                e.preventDefault();
                const currentSlide = $sliderFor.slick('slickCurrentSlide');
                
                if (dynamicGallery) {
                    dynamicGallery.openGallery(currentSlide);
                }
            });

            // Discount Form Submission with reCAPTCHA
            $('#discountForm').on('submit', function(e) {
                e.preventDefault();
                var $form = $(this);
                var $submitBtn = $form.find('button[type="submit"]');
                var originalBtnText = $submitBtn.text();
                
                // Clear previous errors
                $('.text-danger').text('');
                $('#success-message').hide().text('');
                $('#product-contact-loader').addClass('active');

                $submitBtn.prop('disabled', true).text('Sending...');

                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.ready(function() {
                        grecaptcha.execute('{{ env('RECAPTCHA_SITE_KEY') }}', {
                            action: 'contact'
                        }).then(function(token) {
                            submitFormData($form, $submitBtn, originalBtnText, token);
                        });
                    });
                } else {
                    submitFormData($form, $submitBtn, originalBtnText, null);
                }
            });

            function submitFormData($form, $submitBtn, originalBtnText, captchaToken) {
                var formData = new FormData($form[0]);
                if (captchaToken) {
                    formData.append('g-recaptcha-response', captchaToken);
                }

                $.ajax({
                    url: $form.attr('action'),
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        $('#product-contact-loader').removeClass('active');
                        $submitBtn.prop('disabled', false).text(originalBtnText);
                        if (data.res_status == 1) {
                            $('#success-message').text('Message sent successfully! We will contact you soon.').fadeIn().addClass('alert alert-success');
                            $form[0].reset();
                            setTimeout(function() {
                                $('#success-message').fadeOut();
                            }, 5000);
                        } else {
                            if (typeof data.error === 'object') {
                                $.each(data.error, function(prefix, val) {
                                    $form.find('span.' + prefix + '_error').text(val[0]);
                                });
                            } else {
                                // Handle string error (e.g. exception message)
                                $('.g-recaptcha-response_error').text(data.error || 'An unexpected error occurred.').show();
                            }
                        }
                    },
                    error: function(xhr) {
                        $('#product-contact-loader').removeClass('active');
                        $submitBtn.prop('disabled', false).text(originalBtnText);
                        alert('Something went wrong. Please try again later.');
                    }
                });
            }
        });
     </script>
 @endsection
