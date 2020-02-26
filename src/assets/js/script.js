$(window).ready(function () {
    $('.specialists__slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows:false
    });

    $('.specialists__arrow-left').on('click',function () {
        $('.specialists__slider').slick('slickPrev');
    });

    $('.specialists__arrow-right').on('click',function () {
        $('.specialists__slider').slick('slickNext');
    });
});