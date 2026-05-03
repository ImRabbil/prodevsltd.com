 @extends('frontEnd.layouts.master')
 @php
     $setting = DB::table('settings')->first();
 @endphp
 @section('title')
     Products
 @endsection
 @section('css')
    <style>
        .product-item {
            background: #fff;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            height: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(0, 0, 0, 0.03);
            position: relative;
        }

        .product-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .product-image-container {
            position: relative;
            width: 100%;
            padding-top: 100%; /* 1:1 Aspect Ratio */
            overflow: hidden;
            background: #f8f9fa;
        }

        .product-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: top;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
            /* filter: brightness(0.8); */
        }

        .product-item:hover .product-image {
            transform: scale(1.1);
        }

        .product-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(26, 26, 26, 0.4);
            backdrop-filter: blur(4px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: all 0.4s ease;
            gap: 15px;
            padding: 20px;
        }

        .product-item:hover .product-overlay {
            opacity: 1;
        }

        .btn-custom {
            padding: 10px 25px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            text-decoration: none;
            width: 160px;
            text-align: center;
            display: inline-block;
        }

        .btn-details {
            background: #fcbb15;
            color: #1a1a1a;
            border: 2px solid #fcbb15;
        }

        .btn-details:hover {
            background: transparent;
            color: #fff;
            border-color: #fff;
        }

        .btn-demo {
            background: transparent;
            color: #fff;
            border: 2px solid #fff;
        }

        .btn-demo:hover {
            background: #fff;
            color: #1a1a1a;
        }

        .product-content {
            padding: 25px 20px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            text-align: center;
            background: #ebebeb;
        }

        .product-category {
            display: block;
            font-size: 11px;
            text-transform: uppercase;
            color: #fc1515;
            letter-spacing: 2px;
            margin-bottom: 8px;
            font-weight: 700;
        }

        .product-name {
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: 700;
            line-height: 1.4;
        }

        .product-name a {
            color: #1a1a1a;
            transition: color 0.3s ease;
            text-decoration: none;
        }

        .product-item:hover .product-name a {
            color: #fcbb15;
        }

        .product-footer {
            margin-top: auto;
            padding-top: 15px;
            border-top: 1px solid #f0f0f0;
        }

        .view-link {
            color: #1a1a1a;
            font-weight: 600;
            font-size: 13px;
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .view-link i {
            margin-left: 5px;
            transition: transform 0.3s ease;
        }

        .view-link:hover {
            color: #fcbb15;
        }

        .view-link:hover i {
            transform: translateX(5px);
        }

        /* Badge for new items or specific tags */
        .product-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #fcbb15;
            color: #1a1a1a;
            padding: 5px 12px;
            border-radius: 50px;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            z-index: 10;
            box-shadow: 0 4px 10px rgba(252, 187, 21, 0.3);
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
                                    class="fa fa-chevron-right"></i></a></span> <span>Products <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">{{ $category->name }}</h1>
                </div>
            </div>
        </div>
    </section>

    <section class="ftco-section ftco-portfolio">
        <div class="container">
            <div class="row">
                @if (!empty($products))
                    @foreach ($products as $product)
                        <div class="col-md-3 col-sm-6 mb-5">
                            <div class="product-item">
                                <!-- <span class="product-badge">New</span> -->
                                <div class="product-image-container">
                                    <div class="product-image" style="background-image:url({{ asset($product->media->path ?? 'frontEnd/images/placeholder.jpg') }})"></div>
                                    <div class="product-overlay">
                                        <a href="{{ route('product.details', $product->slug) }}" class="btn-custom btn-details">Details</a>
                                        @if($product->url)
                                            <a href="{{ $product->url }}" target="_blank" class="btn-custom btn-demo">Live Demo</a>
                                        @endif
                                    </div>
                                </div>
                                <div class="product-content">
                                    <span class="product-category">{{ $category->name }}</span>
                                    <h3 class="product-name">
                                        <a href="{{ route('product.details', $product->slug) }}">{{ $product->name }}</a>
                                    </h3>
                                    <div class="product-footer">
                                        <a href="{{ route('product.details', $product->slug) }}" class="view-link">View Product <i class="fa fa-long-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="col-12 text-center py-5">
                        <h3 class="text-muted">No products found in this category.</h3>
                    </div>
                @endif
            </div>
        </div>
    </section>


 @endsection
