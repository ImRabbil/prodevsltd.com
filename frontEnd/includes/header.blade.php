@php
    $setting = DB::table('settings')->first();
    $services = App\Models\Service::where('status', 1)->get();
    $categories = App\Models\Category::with('products')->where('status', true)->get();
@endphp
<div class="wrap">
    <div class="container">
        <div class="row justify-content-between">
            <div class="col-12 col-md d-flex align-items-center">

                    @if (isset($setting))
                        @if (!empty($setting->phone))
                            <div class="phone phone_hover">
                                <span class="mailus"><i class="fa fa-phone"></i></span>
                                <a href="tel:01867417944">{{ $setting->phone }}</a>
                            </div>
                        @endif

                        &nbsp;
                        @if (!empty($setting->email))
                            <div class="phone mail_hover">
                                <span class="mailus"><i class="fa fa-envelope-o"></i></span>
                                <a href="mailto:ask@prodevsltd.com">{{ $setting->email }}</a>
                            </div>
                        @endif

                @endif


            </div>
            <div class="col-12 col-md d-flex justify-content-md-end">
                <div class="social-media">
                    <p class="mb-0 d-flex">
                        @if (isset($setting))
                            @if (!empty($setting->facebook))
                                <a href="{{ $setting->facebook }}" target="_blank"
                                    class="d-flex align-items-center justify-content-center"><span
                                        class="fa fa-facebook"><i class="sr-only">Facebook</i></span></a>
                            @endif
                            @if (!empty($setting->twitter))
                                <a href="{{ $setting->twitter }}" target="_blank"
                                    class="d-flex align-items-center justify-content-center"><span
                                        class="fa fa-twitter"><i class="sr-only">Twitter</i></span></a>
                            @endif
                            @if (!empty($setting->linkedin))
                                <a href="{{ $setting->linkedin }}" target="_blank"
                                    class="d-flex align-items-center justify-content-center"><span
                                        class="fa fa-linkedin"><i class="sr-only">Linkedin</i></span></a>
                            @endif
                            @if (!empty($setting->youtube))
                                <a href="{{ $setting->youtube }}" target="_blank"
                                    class="d-flex align-items-center justify-content-center"><span
                                        class="fa fa-youtube"><i class="sr-only">Linkedin</i></span></a>
                            @endif
                            @if (!empty($setting->instagram))
                                <a href="{{ $setting->instagram }}" target="_blank"
                                    class="d-flex align-items-center justify-content-center"><span
                                        class="fa fa-instagram"><i class="sr-only">Linkedin</i></span></a>
                            @endif

                        @endif



                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div class="container">
        @if (!empty($setting->header_logo))
            <a class="navbar-brand" href="{{ route('home') }}"><img height="40px"
                    src="{{ asset($setting->header_logo) }}" alt="{{ $setting->alternate_text }}"></a>
        @endif
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
            aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="fa fa-bars"></span>
        </button>
        <div class="collapse navbar-collapse" id="ftco-nav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item {{ request()->is('/') ? 'active' : '' }}"><a href="{{ route('home') }}"
                        class="nav-link">Home</a></li>
                <li class="nav-item dropdown">
                    <a href="" class="nav-link dropdown-toggle" type="button" id="service-menu"
                        data-toggle="dropdown">Services</a>
                    <div class="dropdown-menu" aria-labelledby="service-menu">
                        @if (!empty($services))
                            @foreach ($services as $item)
                                <a class="dropdown-item"
                                    href="{{ route('service.details', $item->slug) }}">{{ $item->name }}</a>
                            @endforeach
                        @endif
                    </div>
                </li>

                <style>
                    /* Positioning the dropdown-submenu */
                    .dropdown-submenu {
                        position: relative;
                    }

                    .dropdown-submenu > .dropdown-menu {
                        top: -3px;
                        left: 100%;
                        margin-left: 0;
                        margin-right: 0;
                        display: none;
                        border-radius: 0.25rem;
                    }

                    /* Show submenu on hover */
                    .dropdown-submenu:hover > .dropdown-menu {
                        display: block;
                    }

                    /* Hover style */
                    .dropdown-menu a:hover {
                        background-color: #f8f9fa;
                        color: #000;
                    }
                </style>
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" id="product-menu" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        Products
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="product-menu">
                        @foreach ($categories as $category)
                            <li class="dropdown-submenu">
                                @if (!empty($category->products) && count($category->products) > 0)
                                    <a class="dropdown-item" href="{{ route('products.list', $category->slug )}}">
                                        {{ $category->name }}
                                    </a>
                                    {{-- <ul class="dropdown-menu">
                                        @foreach ($category->products as $product)
                                            <li>
                                                <a class="dropdown-item" href="{{ route('product.details', $product->slug) }}">
                                                    {{ $product->name }}
                                                </a>
                                            </li>
                                        @endforeach
                                    </ul> --}}
                                @endif
                            </li>
                        @endforeach
                    </ul>
                </li>

                <li class="nav-item {{ request()->is('career*') ? 'active' : '' }}"><a href="{{ route('career') }}"
                        class="nav-link">Career</a></li>
                <li class="nav-item {{ request()->is('contact-us') ? 'active' : '' }}"><a
                        href="{{ route('contact.us') }}" class="nav-link">Contact</a></li>
                <li
                    class="nav-item {{ request()->is('blog') ? 'active' : (request()->is('blog-details*') ? 'active' : '') }}">
                    <a href="{{ route('blogs') }}" class="nav-link">Blog</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

