@extends('frontEnd.layouts.master')

@section('title')
    Blog Details
@endsection
@section('meta')
    <meta name="title" content="{{ $blog->meta_title ?? null }}"/>
    <meta name="description" content="{{ $blog->meta_description ?? null }}"/>
@endsection
@section('body')
    <section class="hero-wrap hero-wrap-2" style="background-image: url({{ asset('frontEnd/images/bg-4.jpg') }});">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end">
                <div class="col-md-9 ftco-animate">
                    <p class="breadcrumbs"><span class="mr-2"><a href="{{ route('home') }}">Home <i
                                    class="fa fa-chevron-right"></i></a></span> <span>Blog Details <i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">{{ $blog->title }}</h1>
                </div>
            </div>
        </div>
    </section>

    <section class="ftco-section">
        <div class="container">
            <div class="row">
                <div class="col-md-8 mb-4">
                    <div class="">
                        <div class="d_title_text">
                            {{ $blog->title }}
                        </div>
                        <div class="d_blog_image">
                            <img src="{{ asset($blog->media->path ?? '') }}" alt="{{ $blog->media->alt_text ?? '' }}">
                        </div>
                        <div class="d_text">
                            <div class="d_header_text d-flex justify-content-between ">
                                <span>
                                    @if (!empty($blog->get_categories))
                                        @foreach ($blog->get_categories as $category)
                                            <span class="badge bg-dark"
                                                  style="color:#fff;padding: .25rem .45rem;font-weight: 600;border-radius: .25rem;font-size:0.75em">{{ $category->name }}</span>
                                        @endforeach
                                    @endif
                                </span>
                                <span><i class="fa fa-calendar"></i>
                                    {{ date('d M Y', strtotime($blog->created_at)) }}</span></span>
                                <div class="d-flex align-items-center">
                                    <ul class="ftco-footer-social list-unstyled mt-md-5">
                                        <li><a href="javascript:void(0)" class="social-button"
                                               data-url="{{ route('blogs.details', $blog->slug) }}"
                                               id="facebook-share"><span class="fa fa-facebook"></span></a></li>
                                        <li><a href="javascript:void(0)" class="social-button"
                                               data-url="{{ route('blogs.details', $blog->slug) }}"
                                               id="twitter-share"><span class="fa fa-twitter"></span></a></li>
                                        <li><a href="javascript:void(0)" class="social-button"
                                               data-url="{{ route('blogs.details', $blog->slug) }}"
                                               id="linkedin-share"><span class="fa fa-linkedin"></span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="d_description text-wrap m-0">
                                {!! $blog->description !!}
                            </div>
                            <div><b>Tags: </b>
                                @foreach ($blog->get_tags as $tag)
                                    <span class="badge bg-dark"
                                          style="color:#fff;padding: .25rem .45rem;font-weight: 600;border-radius: .25rem;font-size:0.75em">
                                        {{ $tag->name }}</span>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card d_card custom-card" style="border:none;margin-top: 0;">
                                <div class="custom_container">
                                    <ul class="category-ul">
                                        @foreach ($categories as $item)
                                            <li><a href=""
                                                   class="{{ in_array($item->id, $category_array) ? 'active' : 'fgf' }}">{{ $item->name }}</a>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="card d_card custom-card">
                                <div class="card-header custom-header">
                                    Recent Blog
                                </div>
                                <div class="custom_container_r">
                                    @foreach ($blogs as $key => $item_blog)
                                        <div class="item">
                                            <div class="row">
                                                <div class="col-md-5 pr-0">
                                                    <div class="blog_image">
                                                        <img src="{{ asset($item_blog->media->path ?? '') }}" alt="{{ $item_blog->media->alt_text ?? '' }}">
                                                    </div>
                                                </div>
                                                <div class="col-md-7">
                                                    <div class="text test">
                                                        <div class="title_text">
                                                            <a href="{{ route('blogs.details', $item_blog->slug) }}">
                                                                {{ $item_blog->title }}</a>
                                                        </div>
                                                    </div>
                                                    <div class="create_date">
                                                        {{ date('d M Y', strtotime($item_blog->created_at)) }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            @if (empty($loop->last))
                                                <hr>
                                            @endif
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('js')
    {{-- <script>
    $(document).ready(function() {
        $('#facebook-share').click(function() {
            window.open('{{ $facebookShareUrl }}', '_blank');
        });

        $('#twitter-share').click(function() {
            window.open('{{ $twitterShareUrl }}', '_blank');
        });
    });
</script> --}}
    <script>
        $(document).ready(function () {
            $("#facebook-share").on("click", function () {
                var link = encodeURIComponent($(this).data('url'));
                var left = (window.screen.width / 2) - (800 / 2);
                var top = (window.screen.height / 2) - (600 / 2);
                var top = (window.screen.height / 2) - (600 / 2);
                var fbpopup = window.open("https://www.facebook.com/sharer/sharer.php?u=" + link, "pop",
                    "width=800, height=600, scrollbars=no, top=" + top + ", left=" + left + "");
                return false;
            });

            $("#twitter-share").on("click", function () {
                var link = encodeURIComponent($(this).data('url'));
                var left = (window.screen.width / 2) - (800 / 2);
                var top = (window.screen.height / 2) - (600 / 2);
                var fbpopup = window.open("http://twitter.com/intent/tweet?" + link, "pop",
                    "width=800, height=600, scrollbars=no, top=" + top + ", left=" + left + "");
                return false;
            });

            $("#linkedin-share").on("click", function () {
                var link = encodeURIComponent($(this).data('url'));
                var left = (window.screen.width / 2) - (800 / 2);
                var top = (window.screen.height / 2) - (600 / 2);
                var fbpopup = window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + link,
                    "pop", "width=800, height=600, scrollbars=no, top=" + top + ", left=" + left + "");
                return false;
            });
        });
    </script>
@endsection
