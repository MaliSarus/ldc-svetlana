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
    const headerPrimaryMenu = $('.header__primary-menu');
    const headerPrimaryMenuItems = headerPrimaryMenu.find('li');
    const dropdownMenuContainer = $('.dropdown-menu__container');
    $(headerPrimaryMenuItems[1]).on('click', function () {
        dropdownMenuContainer.fadeIn(400).addClass('dropdown-menu__container_active');
        $('body').css({overflow:'hidden'})
    });
    dropdownMenuContainer.on('click',function (event) {
        if(event.target.classList.contains('dropdown-menu__container_active')){
            $(event.target).fadeOut(400).removeClass('dropdown-menu__container_active');
            $('body').css({overflow:'visible'})
        }
    });



    const appointmentPhoneInput = $('input[name="phone"]');
    const appointmentNameInput = $('input[name="customerName"]');
    const appointmentConfident = $('.appointment__form label[for="confident"] #confident');
    const appointmentSubmitButton = $('.appointment__form button[type="submit"]');
    const popUpClose = $('.popup-close-button');
    const popUp = $('.popup');
    popUpClose.on('click',function () {
        popUp.hide();
        $('body').css({
            overflow: 'visible'
        });
        $('.appointment__form').unbind('submit').submit();
    });

    appointmentSubmitButton.on('click', function (event) {
        if(appointmentNameInput.val() == '') {
            appointmentNameInput.css({
                borderColor: '#E84E2C',
                color: '#E84E2C'
            });
            $('label[for="customerName"]').css({
                color: '#E84E2C'
            }).html('Введите имя');
            event.preventDefault();
        }

        if (appointmentPhoneInput.val() == '') {
            appointmentPhoneInput.css({
                borderColor: '#E84E2C',
                color: '#E84E2C'
            });
            $('label[for="phone"]').css({
                color: '#E84E2C'
            }).html('Введите телефон');
            event.preventDefault();
        }
        if(!appointmentConfident.prop("checked")){
            appointmentConfident.css({
                borderColor: '#E84E2C'
            });
            $('.appointment__form label[for="confident"] small').css({
                color: '#E84E2C'
            })
        }
        if(appointmentConfident.prop('checked') && appointmentPhoneInput.val() !== '' && appointmentNameInput.val() !== ''){
            event.preventDefault();
            popUp.show();
            popUp.css({
                display:'flex'
            });
            $('body').css({
                overflow:'hidden'
            })
        }
    });

    appointmentPhoneInput.on('focus', function () {
        setTimeout(function () {
            appointmentPhoneInput.inputmask({
                "mask": "+7-(999)-999-9999",
                showMaskOnHover: false,
                showMaskOnFocus: true,
                'onincomplete': function () {
                    appointmentPhoneInput.inputmask("remove")
                }
            });
        }, 300)
    });
    const dropdownTabs =  $('.dropdown-menu__tabs_item')
    dropdownTabs.on('click', function (event) {
        event.preventDefault();
        const index = dropdownTabs.index(event.currentTarget);
        const prevLink = $('.dropdown-menu__tabs_item_active');
        prevLink.removeClass('dropdown-menu__tabs_item_active');
        $(dropdownTabs[index]).addClass('dropdown-menu__tabs_item_active');
        const dropdownContents = $('.dropdown-menu__item');
        $('.dropdown-menu__item_active').removeClass('dropdown-menu__item_active');
        $(dropdownContents[index]).addClass('dropdown-menu__item_active');
    });


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