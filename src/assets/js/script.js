window.onload = function () {
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

    const currentSlide = $('.about__item').index($('.about__item_active'));
    const sliderButtons = $('.select-buttons__button');

    sliderButtons[currentSlide].classList.add('select-buttons__button_active');

    sliderButtons.on('click', function (event) {
        sliderButtons.removeClass('select-buttons__button_active');
        const prevItem = $('.about__item_active');
        const sliderItems = $('.about__item');
        const index = sliderButtons.index(event.currentTarget);
        const sliderItem = sliderItems[index];
        sliderButtons.removeClass('select-buttons__button_active');
        event.currentTarget.classList.add('select-buttons__button_active');
        prevItem.addClass('about__item_deactivate');
        setTimeout(function () {
            prevItem.removeClass('about__item_deactivate');
            prevItem.removeClass('about__item_active');
            sliderItem.classList.add('about__item_active');
        }, 900);
    });

    $('.header__search-form-field').focus(function () {
        $(this).css({
            backgroundColor: 'white',
            color: 'black'
        });
        $('.header__search-form').css({
            backgroundColor: 'white'
        });
        $('.header__search-form-button').css({
            filter: 'sepia(10) saturate(52.5) hue-rotate(179deg) saturate(76.5) contrast(64.5) grayscale(0.35) hue-rotate(335deg)'
        })
    });

    $('.units__menu li').on('click', function (event) {
        event.preventDefault();
        const index = $('.units__menu li').index(event.currentTarget);
        const prevLink = $('.units__menu-link_active');
        prevLink.removeClass('units__menu-link_active');
        $('.units__menu li')[index].children[0].classList.add('units__menu-link_active');
        $('.units__content-services_active').removeClass('units__content-services_active');
        $('.units__content-services')[index].classList.add('units__content-services_active');
    });
};

$(document).ready(function () {
    $('input[name="phone"]').on('focus', function () {
        setTimeout(function () {
            $('input[name="phone"]').inputmask({
                "mask": "+7-(999)-999-9999",
                showMaskOnHover: false,
                showMaskOnFocus: true,
                'onincomplete': function () {
                    $('input[name="phone"]').inputmask("remove")
                }
            });
        }, 300)
    });

    const popUpClose = $('.popup-close-button');
    popUpClose.on('click',function () {
        $('.popup').hide();
    });


    const customerNameInput = $('input[name="customerName"]');
    customerNameInput.on('input', () => {
        customerNameInput.val(customerNameInput.val().replace(/[^а-я]/, ''));
    });

    $('.feedback__item-content').on('focus',function (event) {
       event.currentTarget.classList.add('feedback__item-content_unhide');
    });

    // $('.feedback__item-content').on('blur',function (event) {
    //    // event.currentTarget.classList.remove('feedback__item-content_unhide');
    //     console.log('Blur')
    // });

    const hamburger = $('.hamburger');
    // On click
    hamburger.on("click", function () {
        hamburger.toggleClass("is-active");
        // Do something else, like open/close menu
    });
});

$(window).scroll(parallaxScrolling);

function parallaxScrolling() {
    var scrolled = $(window).scrollTop();
    $('.layer1').css('top', (0 - (scrolled * .9)) + 'px');
    $('.layer2').css('top', (0 - (scrolled * .7)) + 'px');
    $('.layer3').css('top', (0 - (scrolled * .5)) + 'px');
    $('.layer4').css('top', (0 - (scrolled * .9)) + 'px');

}