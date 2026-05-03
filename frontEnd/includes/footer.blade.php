@php
    $setting = DB::table('settings')->first();
    $services = DB::table('services')->where('status', 1)->get();
    $products = DB::table('products')->where([ 'status' => 1, 'is_footer' => true ])->get();
    $productCategories = DB::table('categories')->where('status', 1)->get();
@endphp
<section class="ftco-intro ftco-section ftco-no-pb">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <div class="img"
                     style="background-image: url({{ asset('/') }}frontEnd/images/newsletter-bg-1.jpg);">
                    <div class="overlay"></div>
                    <h2>Subscribe Newsletter</h2>
                    <p>Sign Up to our Newsletter and get our latest updates</p>
                    <div class="row justify-content-center">
                        <div class="col-md-6 section-loader-wrapper">
                            <div class="section-loader" id="newsletter-loader">
                                <div class="loader-spinner"></div>
                            </div>

                            <form id="newsletter" action="{{ route('newsletter') }}" class="subscribe-form"
                                  method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="form-group d-flex mb-2">
                                    <input type="email" class="form-control" name="email" autocomplete="off"
                                           placeholder="Enter email address">
                                    <input type="submit" value="Subscribe" class="submit px-3"> <br>
                                </div>

                                <div class="form-group d-flex mb-2">
                                    <div class="success-message"
                                         style="color:green;margin-bottom:10px;text-align: justify;"></div>
                                    <span class="text-danger email_error" style="color: red"> </span>
                                </div>

                                <div class="form-group d-flex">
                                    <span class="text-danger  g-recaptcha-response_error" style="color: red"></span>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<footer class="ftco-footer">
    <div class="container">
        <div class="row mb-2">
            <div class="col-sm-12 col-md-3">
                <div class="ftco-footer-widget mb-4">
                    <h2 class="ftco-heading-2 logo">
                        @if (!empty($setting->footer_logo))
                            <a href="{{route('home')}}">
                                <img src="{{ asset($setting->footer_logo) }}" class="img-fluid" alt="{{ $setting->alternate_text }}">
                            </a>
                        @endif
                    </h2>
                    <div class="block-23 mb-3">
                        <ul>
                            @if (!empty($setting->address))
                                <li>
                                    <span class="icon fa fa-map-marker"></span><span
                                        class="text">{{ $setting->address }}</span>
                                </li>
                            @endif
                            @if (!empty($setting->phone))
                                <li><a href="tel:01867417944"><span class="icon fa fa-phone"></span><span
                                            class="text">{{ $setting->phone }}</span></a></li>
                            @endif
                            @if (!empty($setting->email))
                                <li><a href="mailto:ask@prodevsltd.com"><span
                                            class="icon fa fa-paper-plane"></span><span
                                            class="text"><span>{{ $setting->email }}</span></span></a>
                                </li>
                            @endif

                        </ul>
                    </div>
                    <ul class="ftco-footer-social list-unstyled mt-md-5">
                        @if (!empty($setting->facebook))
                            <li class="ftco-animate"><a href="{{ $setting->facebook }}" target="_blank">
                                <span class="fa fa-facebook"></span>
                            </a></li>
                        @endif
                        @if (!empty($setting->twitter))
                            <li class="ftco-animate"><a href="{{ $setting->twitter }}" target="_blank"><span
                                        class="fa fa-twitter"></span></a></li>
                        @endif
                        @if (!empty($setting->linkedin))
                            <li class="ftco-animate"><a href="{{ $setting->linkedin }}" target="_blank"><span
                                        class="fa fa-linkedin"></span></a></li>
                        @endif
                        @if (!empty($setting->youtube))
                            <li class="ftco-animate"><a href="{{ $setting->youtube }}" target="_blank"><span
                                        class="fa fa-youtube"></span></a></li>
                        @endif
                        @if (!empty($setting->instagram))
                            <li class="ftco-animate"><a href="{{ $setting->instagram }}" target="_blank"><span
                                        class="fa fa-instagram"></span></a></li>
                        @endif
                    </ul>
                </div>
            </div>
            <div class="col-sm-12 col-md">
                <div class="ftco-footer-widget mb-4 ml-md-4">
                    <h2 class="ftco-heading-2">Info</h2>
                    <ul class="list-unstyled">
                        <li><a href="{{ route('about.us') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                                About
                                Us</a>
                        </li>
                        <li><a href="{{ route('contact.us') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                                Contact
                                Us</a></li>
                        <li><a href="{{ route('terms.and.conditions') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                                Terms & Conditions</a></li>
                        <li><a href="{{ route('privacy.policy') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                                Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-12 col-md">
                <div class="ftco-footer-widget mb-4 ml-md-4">
                    <h2 class="ftco-heading-2">Important Links</h2>
                    <ul class="list-unstyled">
                        <li><a href="{{ route('career') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                                Career</a>
                        </li>
                        <li><a href="{{ route('blogs') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                                Blog</a></li>
                        <li><a href="{{ route('all.projects') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                                </span>Projects</a></li>
                        <li><a href="{{ route('team') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                                Team</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-12 col-md">
                <div class="ftco-footer-widget mb-4">
                    <h2 class="ftco-heading-2">Services</h2>
                    <ul class="list-unstyled">
                        @if (!empty($services))
                            @foreach ($services as $item)
                                <li><a href="{{ route('service.details', $item->slug) }}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                             class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M9 6l6 6l-6 6"/>
                                        </svg> {{ $item->name }}</a>
                                </li>
                            @endforeach
                        @endif
                    </ul>
                </div>
            </div>
            <div class="col-sm-12 col-md">
                <div class="ftco-footer-widget mb-4">
                    <h2 class="ftco-heading-2">Product Categories</h2>
                    <ul class="list-unstyled">
                        @foreach ($productCategories as $category)
                            <li><a href="{{ route('products.list', $category->slug) }}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                         stroke-linecap="round" stroke-linejoin="round" class="icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M9 6l6 6l-6 6"/>
                                    </svg> {{ $category->name }}</a></li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid px-0 py-3 bg-black">
        <div class="container">
            <div class="row">
                <div class="col-md-12 d-md-flex d-sm-block text-center justify-content-between">
                    <p class="mb-0" style="color: rgba(255,255,255,.5);">
                        Copyright &copy; 2022 -
                        <script>
                            document.write(new Date().getFullYear());
                        </script>
                        All Rights Reserved By <a href="https://prodevsltd.com">Pro Devs Ltd.</a>
                    </p>

                    <p class="mb-0" style="color: rgba(255,255,255,.5);">Developed with <i class="fa fa-heart"
                                                                                           style="color: red"></i> By <a href="https://prodevsltd.com">Pro Devs Ltd. Team</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</footer>
