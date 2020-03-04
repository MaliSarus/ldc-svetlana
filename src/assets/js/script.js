// ТУТ ОБРАБОТКА СЛАЙДЕРОВ И ЧТО С НИМИ СВЯЗАНО
window.onload = function () {
    const specOwl = $('.specialists__slider.owl-carousel');
    specOwl.owlCarousel({
        loop: true,
        margin: 20,
        item: 1,
        nav: false,
        dots: false,
        responsive: {
            // breakpoint from 0 up
            576: {
                items: 1,
            },
            // breakpoint from 1400 up
            1300: {
                items: 4,
            }
        }
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
    let sliderFlag = 0;

    sliderButtons.on('click', function (event) {
        if (sliderFlag == 0) {
            sliderButtons.removeClass('select-buttons__button_active');
            const prevItem = $('.about__item_active');
            const sliderItems = $('.about__item');
            const index = sliderButtons.index(event.currentTarget);
            const sliderItem = sliderItems[index];
            sliderButtons.removeClass('select-buttons__button_active');
            event.currentTarget.classList.add('select-buttons__button_active');
            prevItem.addClass('about__item_deactivate');
            sliderFlag = 1;
            setTimeout(function () {
                prevItem.removeClass('about__item_deactivate');
                prevItem.removeClass('about__item_active');
                sliderItem.classList.add('about__item_active');
                sliderFlag = 0
            }, 900);
        }
    });

    const headerSearchField = $('.header__search-form-field');

    headerSearchField.on('focus', function () {
        $('.header__search-form').addClass('header__search-form_focus');
    });

    headerSearchField.on('blur', function () {
        $('.header__search-form').removeClass('header__search-form_focus');
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

//ТУПО ОБРАБОТКА СОБЫТИЙ

$(document).ready(function () {
    const headerPrimaryMenu = $('.header__primary-menu');
    const headerPrimaryMenuItems = headerPrimaryMenu.find('li');
    const dropdownMenuContainer = $('.dropdown-menu__container');
    //ВЫПАДАЮЩЕЕ МЕНЮ В ХЭДЕРЕ
    $(headerPrimaryMenuItems[1]).on('click', function () {
        dropdownMenuContainer.fadeIn(400).addClass('dropdown-menu__container_active');
        $('body').css({overflow: 'hidden'})
    });
    dropdownMenuContainer.on('click', function (event) {
        if (event.target.classList.contains('dropdown-menu__container_active')) {
            $(event.target).fadeOut(400).removeClass('dropdown-menu__container_active');
            $('body').css({overflow: 'visible'})
        }
    });


    const appointmentPhoneInput = $('input[name="phone"]');
    const appointmentNameInput = $('input[name="customerName"]');
    const appointmentConfident = $('.appointment__form label[for="confident"] #confident');
    const appointmentSubmitButton = $('.appointment__form button[type="submit"]');
    const popUpClose = $('.popup-close-button');
    const popUp = $('.popup');
    //ПОП АП ОКНО
    popUpClose.on('click', function () {
        popUp.hide();
        $('body').css({
            overflow: 'visible'
        });
        $('.appointment__form').unbind('submit').submit();
    });
    //ОБРАБОТКА ФОРМЫ ЗАПИСИ
    appointmentSubmitButton.on('click', function (event) {
        if (appointmentNameInput.val() == '') {
            appointmentNameInput.css({
                borderColor: '#E84E2C',
                color: '#E84E2C'
            });
            $('label[for="customerName"]').css({
                color: '#E84E2C'
            }).html('Введите имя');
            event.preventDefault();
        }

        if (!Inputmask.isValid(appointmentPhoneInput.val(),"+7-(999)-999-9999")) {
            appointmentPhoneInput.css({
                borderColor: '#E84E2C',
                color: '#E84E2C'
            });
            $('label[for="phone"]').css({
                color: '#E84E2C'
            }).html('Введите телефон');
            event.preventDefault();
        }
        if (!appointmentConfident.prop("checked")) {
            event.preventDefault();
            appointmentConfident.css({
                borderColor: '#E84E2C'
            });
            $('.appointment__form label[for="confident"] small').css({
                color: '#E84E2C'
            })
        }
        if (appointmentConfident.prop('checked') && Inputmask.isValid(appointmentPhoneInput.val(),"+7-(999)-999-9999") && appointmentNameInput.val() !== '') {
            event.preventDefault();
            popUp.show();
            popUp.css({
                display: 'flex'
            });
            $('body').css({
                overflow: 'hidden'
            })
        }
    });

    $('.appointment__form .appointment__input-wrapper > input').on('input', function (event) {
        if ($(event.target).val() !== '') {
            $(event.target).attr('style', '');
            $(event.target).siblings('label').attr('style', '');
            $('.appointment__form').bind('submit')
        } else {
            $(event.target).css({
                borderColor: '#E84E2C',
                color: '#E84E2C'
            });
            $(event.target).siblings('label').css({
                color: '#E84E2C'
            });

        }
        if(!Inputmask.isValid(appointmentPhoneInput.val(),"+7-(999)-999-9999")){
            appointmentPhoneInput.css({
                borderColor: '#E84E2C',
                color: '#E84E2C'
            });
            appointmentPhoneInput.siblings('label').css({
                color: '#E84E2C'
            });
            $('.appointment__form').unbind('submit')
        }
    });

    appointmentConfident.change(function () {
        if (!this.checked) {
            $(this).css({
                borderColor: '#E84E2C',
            });
            $('.appointment__form label[for="confident"] small').css({
                color: '#E84E2C',
            })
        } else {
            $(this).attr('style', '');
            $('.appointment__form label[for="confident"] small').attr('style', '');
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
    //Вкладки на выпадающем меню хэдера
    const dropdownTabs = $('.dropdown-menu__tabs_item')
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

    //Блоки с отзывами
    const feedbackContent = $('.feedback__item-content');
    $(document).on('click', '.feedback__item-content', function (event) {
        console.log(event.target);
        if ($(this).hasClass('feedback__item-content_unhide')) {
            $(this).removeClass('feedback__item-content_unhide');
        } else {
            $(this).addClass('feedback__item-content_unhide');
        }
    });
    feedbackContent.on('blur', function () {
        $(this).removeClass('feedback__item-content_unhide');
    });

    //Кнопка для раскрытия меню в мобайле
    const hamburger = $('.hamburger');
    // On click
    hamburger.on("click", function () {
        hamburger.toggleClass("is-active");
        // Do something else, like open/close menu
    });
});

//Паралакс квадратиков
$(window).scroll(parallaxScrolling);

function parallaxScrolling() {
    var scrolled = $(window).scrollTop();
    $('.layer1').css('top', (0 - (scrolled * .9)) + 'px');
    $('.layer2').css('top', (0 - (scrolled * .7)) + 'px');
    $('.layer3').css('top', (0 - (scrolled * .5)) + 'px');
    $('.layer4').css('top', (0 - (scrolled * .9)) + 'px');

}