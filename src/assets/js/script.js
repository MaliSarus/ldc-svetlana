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
    $('.specialists__slider.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        items:4,
        autoWidth:true,
        stagePadding: 20,
        nav: false,
        dots: false,
        onRefresh: function () {
            $('.specialists__slider.owl-carousel').find('div.owl-item').height('');
        },
        onRefreshed: function () {
            $('.specialists__slider.owl-carousel').find('div.owl-item').height($('.specialists__slider.owl-carousel').height())
        }
    });

    $('.feedback__slider.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        items:2,
        nav: false,
        dots: false,
    });


});