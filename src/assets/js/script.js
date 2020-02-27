$(window).ready(function () {
    // $('.specialists__slider').slick({
    //     infinite: true,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     dots: false,
    //     arrows:false,
    //     adaptiveHeight: true
    // });
    //
    // $('.specialists__control-panel .arrows__arrow-left').on('click',function () {
    //     $('.specialists__slider').slick('slickPrev');
    // });
    //
    // $('.specialists__control-panel .arrows__arrow-right').on('click',function () {
    //     $('.specialists__slider').slick('slickNext');
    // });
    const specOwl = $('.specialists__slider.owl-carousel');
    specOwl.owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        nav: false,
        dots: false,
    });

    $('.specialists__control-panel .arrows .arrows__arrow-left').on('click', function () {
        specOwl.trigger('prev.owl.carousel');
    });
    $('.specialists__control-panel .arrows .arrows__arrow-right').on('click', function () {
        specOwl.trigger('next.owl.carousel');
    });

    const feedOwl = $('.feedback__slider.owl-carousel');

    feedOwl.owlCarousel({
        loop: true,
        margin: 20,
        items: 2,
        nav: false,
        dots: false,
    });

    $('.feedback__control-panel .arrows .arrows__arrow-left').on('click', function () {
        feedOwl.trigger('prev.owl.carousel');
    });
    $('.feedback__control-panel .arrows .arrows__arrow-right').on('click', function () {
        feedOwl.trigger('next.owl.carousel');
    });


});

$(window).scroll(parallaxScrolling);

function parallaxScrolling() {
    var scrolled = $(window).scrollTop();
    $('.layer1').css('top', (0 - (scrolled * .9)) + 'px');
    $('.layer2').css('top', (0 - (scrolled * .66)) + 'px');
    $('.layer3').css('top', (0 - (scrolled * .33)) + 'px');
}