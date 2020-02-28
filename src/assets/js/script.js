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

    const sliderButtons = $('.select-buttons__button');
    sliderButtons.on('click', function (event) {
        const prevItem = $('.about__item_active');
        const sliderItems = $('.about__item');
        const index = sliderButtons.index(event.currentTarget);
        const sliderItem = sliderItems[index];
        sliderButtons.removeClass('select-buttons__button_active');
        event.currentTarget.classList.add('select-buttons__button_active');
        prevItem.removeClass('about__item_active');
        sliderItem.classList.add('about__item_active');
    });

    // sliderItems.animate({
    //     opacity: 0
    // }, 500, function () {
    //     sliderItems.removeClass('about__item_active');
    //
    // });
});


$(window).scroll(parallaxScrolling);

function parallaxScrolling() {
    var scrolled = $(window).scrollTop();
    $('.layer1').css('top', (0 - (scrolled * .9)) + 'px');
    $('.layer2').css('top', (0 - (scrolled * .7)) + 'px');
    $('.layer3').css('top', (0 - (scrolled * .5)) + 'px');
    $('.layer4').css('top', (0 - (scrolled * .9)) + 'px');

}