const selectButtons = $('.select-buttons');
const dropdownMenuContainer = $('.dropdown-menu__container');
const dropdownTabs = $('.dropdown-menu__tabs_item');
const serviceTapButton = $('.tap-menu__button')[0];
const appointmentTapButton = $('.tap-menu__button')[3];
const mapTapButton = $('.tap-menu__button')[$('.tap-menu__button').length - 1];
const dropdownTabsBlock = $('.dropdown-menu__tabs');
const dropdownContentBlock = $('.dropdown-menu__content');
const headerBottom = $('.header__bottom');
const popupIphone = $('.popup-iphone');
const popupIphoneFirstAction = $($('.popup-iphone__action')[0]);
const popupIphoneSecondAction = $($('.popup-iphone__action')[1]);
let dropdownFlag = 0;
let appendFlag = 0;
let resizeFlag = 0;
let prependFlag = 0;

const aboutSliderInit = () => {
    $('.about__slider').slick({
        slidesToShow: 1,
        dots: false,
        arrows: false,
        infinite: false,
    })
};
const featuresSliderInit = () => {
    $('.features__slider').slick({
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: false,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                },
            },
            // {
            //     breakpoint: 1400,
            //     settings: "unslick"
            // }
        ]
    });
};
const unitsMenuSliderInit = () => {
    $('.units__menu > ul').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: false,
        variableWidth: true,
        adaptiveHeight: true
    });
};
const unitsMenuSliderChangeTab = () => {
    $('.units__menu > ul').on('afterChange', function (event, slick, currentSlide) {
        const index = $('.units__menu > ul').slick('slickCurrentSlide');
        const prevLink = $('.units__menu-link_active');
        prevLink.removeClass('units__menu-link_active');
        $('.units__menu li')[index].children[0].classList.add('units__menu-link_active');
        $('.units__content-services_active').removeClass('units__content-services_active');
        $('.units__content-services')[index].classList.add('units__content-services_active');
    });
};
const windowDesktopSizeChange = () => {
    $('.units__head .title').html('Отделения &lt;лечебно – диагностического центра&gt;');
    $('.units__emergency-room .title').html(' Взрослый и детский травмпункт &lt;ЛДЦ Завода “Светлана”&gt;');
    $('.appointment__block > .content').addClass(['content_flex', 'content_between']);
    $('.specialists__head .title').html('Специалисты &lt;лечебно – диагностического центра&gt;');
    $('.feedback__head > .title').html('Отзывы &lt;наших клиентов&gt;');
    $('.feedback__position').html('<span class="feedback__position_current">1</span>/' + $('.feedback__item').length);
};

const windowMobileSizeChange = () => {
    $('.units__head .title').html('Отделения ЛДЦ');
    $('.units__emergency-room .title').html('Взрослый и детский травмпункт');
    $('.units__features').append('<a class="btn btn_red_fill">Записаться на прием</a>');
    $('.appointment__block > .content').removeClass(['content_flex', 'content_between']);
    $('.specialists__head .title').html('Специалисты ЛДЦ');
    $('.feedback__head > .title').html('Отзывы');
};

const DropdownOpenButtonHandler = () => {
    $('body').on('click', function (event) {
        if ($(window).width() >= 961) {
            console.log(event.target);
            if ($('.dropdown-menu__open-button').is(event.target) || $('.dropdown-menu__open-button').has(event.target).length !== 0) {
                if (!dropdownMenuContainer.hasClass('dropdown-menu__container_active')) {
                    dropdownMenuContainer.fadeIn(400).addClass('dropdown-menu__container_active');
                    $('body').css({overflow: 'hidden'});
                    $('li.dropdown-menu__open-button').css({
                        height: 'calc(100% - 2px)',
                        borderBottom: '2px solid white'
                    });
                } else {
                    dropdownMenuContainer.fadeOut(400).removeClass('dropdown-menu__container_active');
                    $('body').css({overflow: 'visible'});
                    $('li.dropdown-menu__open-button').attr('style', '');
                }
            } else if (!$('.dropdown-menu').is(event.target) && $('.dropdown-menu').has(event.target).length === 0) { // и не по его дочерним элементам
                dropdownMenuContainer.fadeOut(400).removeClass('dropdown-menu__container_active');
                $('body').css({overflow: 'visible'});
                $('li.dropdown-menu__open-button').attr('style', '');
            }
        } else {
            if ($('.arrow-back').is(event.target)) {
                if (dropdownTabsBlock.attr('style') == 'display: none;' && dropdownContentBlock.attr('style') == '') {
                    dropdownContentBlock.css({
                        display: 'none'
                    });
                    dropdownTabsBlock.attr('style', '');
                    $('.dropdown-menu > .title').html('Услуги');
                } else if (dropdownMenuContainer.hasClass('dropdown-menu__container_active') && headerBottom.attr('style') == 'display: none;') {
                    dropdownMenuContainer.removeClass('dropdown-menu__container_active').addClass('hide').attr('style', '');
                    headerBottom.attr('style', '');
                } else if (dropdownMenuContainer.hasClass('dropdown-menu__container_active') && $(serviceTapButton).hasClass('tap-menu__button_active')) {
                    closeServicesDropdownFromTapMenu();
                }
            }
        }
    })
};

const mobileDropdownOpenButtonHandler = () => {
    $('.dropdown-menu__open-button').on('click', '.with-arrow', function (event) {
        dropdownMenuContainer.removeClass('hide');
        $('.header__bottom').css({display: 'none'});
        $('.dropdown-menu__content').css({display: 'none'});
        if (prependFlag == 0) {
            $('.dropdown-menu').prepend('<h2 class="title">Услуги</h2>');
            $('.dropdown-menu').prepend('<img class="arrow-back" width="20px" height="15px" src="./assets/img/dropdown-menu/arrow-back.svg">');
            prependFlag = 1;
        }
        dropdownMenuContainer.fadeIn(400).addClass('dropdown-menu__container_active');
    });
};

const onReadyMobileMediaChange = () => {
    $('.appointment__block > .content').removeClass(['content_flex', 'content_between']);
    $('.units__head .title').html('Отделения ЛДЦ');
    $('.units__emergency-room .title').html('Взрослый и детский травмпункт');
    $('.specialists__head .title').html('Специалисты ЛДЦ');
    $('.feedback__head > .title').html('Отзывы');
    $('.dropdown-menu__open-button').append('<div class="with-arrow"></div>');
    dropdownTabs.append('<div class="with-arrow"></div>');

    $('.dropdown-menu__open-button').off('click');
};

const closeServicesDropdownFromTapMenu = () => {
    $(serviceTapButton).removeClass('tap-menu__button_active');
    $('body').children().removeClass('hide');
    dropdownMenuContainer.addClass('hide');
    $('.dropdown-menu__content').attr('style', '');
    dropdownMenuContainer.removeClass('dropdown-menu__container_active');
    dropdownMenuContainer.attr('style', '');
    dropdownContentBlock.attr('style', '');
};

//Действия при изменении размеров окна

$(window).on('resize', function () {
    if ($(window).width() > 1399) {
        if (resizeFlag == 0) {
            windowDesktopSizeChange();
            //ВЫПАДАЮЩЕЕ МЕНЮ В ХЭДЕРЕ
            resizeFlag = 1;
        }
    } else {
        const specSliderWidth = $('.specialists__slider > .slick-list').width();
        if (specSliderWidth < 325) {
            $('.specialists__doctor').css({
                width: specSliderWidth + 'px'
            });
        }
        if (resizeFlag == 1) {
            windowMobileSizeChange();
            resizeFlag = 0;
        }
    }


    if ($(window).width() >= 961 && appendFlag == 0) {
        selectButtons.appendTo('.about__slider');
        $('.with-arrow').detach();
        $('.units__features > a.btn.btn_red_fill').remove();
        appendFlag = 1;
    } else if ($(window).width() < 961 && appendFlag == 1) {
        $('.dropdown-menu__open-button').append('<div class="with-arrow"></div>');
        dropdownTabs.append('<div class="with-arrow"></div>');
        $('.units__features').append('<a class="btn btn_red_fill">Записаться на прием</a>');
        appendFlag = 0;
    }

    if ($(window).width() > 960 && dropdownFlag == 0) {
        $('.dropdown-menu__open-button').off('click');
        dropdownFlag = 1;
    } else if ($(window).width() <= 960 && dropdownFlag == 1) {
        $('.dropdown-menu__open-button').off('click');
        mobileDropdownOpenButtonHandler();
        dropdownFlag = 0;
    }

    if ($(window).width() > 576) {
        $('.features__slider').filter('.slick-initialized').slick("unslick");
    } else if (!$('.features__slider').hasClass('slick-initialized')) {
        featuresSliderInit();
        $('.features__slider').slick('setPosition');
    }

    if ($(window).width() > 1399) {
        $('.about__slider').filter('.slick-initialized').slick("unslick");
    } else if (!$('.about__slider').hasClass('slick-initialized')) {
        aboutSliderInit();
        $('.about__slider').slick('setPosition');
    }

    if ($(window).width() > 1130) {
        $('.units__menu > ul').filter('.slick-initialized').slick("unslick");
    } else if (!$('.units__menu > ul').hasClass('slick-initialized')) {
        unitsMenuSliderInit();
        $('.units__menu > ul').slick('setPosition');
    }

});


// Обработка событий при полной загрузки страницы
window.onload = function () {


    $('.about__slider').on('destroy', function () {
        console.log('destroy');
    });
    //Слайдер специалистов и кнопки слайдера специалистов
    const specSlick = $('.specialists__slider');
    specSlick.slick({
        infinite: true,
        arrows: false,
        dots: false,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },

        ]
    });
    $('.specialists__control-panel .arrows .arrows__arrow-left').on('click', function () {
        specSlick.slick('slickPrev');
    });
    $('.specialists__control-panel .arrows .arrows__arrow-right').on('click', function () {
        specSlick.slick('slickNext');
    });

    //Сладер отзывов и кнопки сладера отзывов
    const feedSlick = $('.feedback__slider');
    feedSlick.slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false
                },
            },
            {
                breakpoint: 961,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false
                },
            }
        ]
    });
    $('.feedback__control-panel .arrows .arrows__arrow-left').on('click', function () {
        feedSlick.slick('slickPrev');
    });
    $('.feedback__control-panel .arrows .arrows__arrow-right').on('click', function () {
        feedSlick.slick('slickNext');
    });


    //Основной слайдер (анимации и тд)
    const aboutSliderCurrentSlide = $('.about__item').index($('.about__item_active'));
    const sliderButtons = $('.select-buttons__button');
    sliderButtons[aboutSliderCurrentSlide].classList.add('select-buttons__button_active');
    let sliderFlag = 0;
    sliderButtons.on('click', function (event) {
        const index = sliderButtons.index(event.currentTarget);
        if ($(window).width() >= 1400) {
            if (sliderFlag == 0) {
                sliderButtons.removeClass('select-buttons__button_active');
                const prevItem = $('.about__item_active');
                const sliderItems = $('.about__item');
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
        } else {
            $('.about__slider').slick('slickGoTo', index, false);
            sliderButtons.removeClass('select-buttons__button_active');
            event.currentTarget.classList.add('select-buttons__button_active');
        }
    });

    //Изменение поля поиска
    const headerSearchField = $('.header__search-form-field');
    headerSearchField.on('focus', function () {
        $('.header__search-form').addClass('header__search-form_focus');
    });
    headerSearchField.on('blur', function () {
        $('.header__search-form').removeClass('header__search-form_focus');
    });

    //Изменения табов в блоках отделений
    $('.units__menu li').on('click', function (event) {
        event.preventDefault();
        const index = $('.units__menu li').index(event.currentTarget);
        const prevLink = $('.units__menu-link_active');
        prevLink.removeClass('units__menu-link_active');
        $('.units__menu li')[index].children[0].classList.add('units__menu-link_active');
        $('.units__content-services_active').removeClass('units__content-services_active');
        $('.units__content-services')[index].classList.add('units__content-services_active');
    });

    //Действия со слайдерами в момент загрузки экрана маленького размера или большого размера
    if (window.matchMedia('screen and (max-width: 1400px)').matches) {
        selectButtons.detach();
        aboutSliderInit();
        featuresSliderInit();
        unitsMenuSliderInit();
        const specSliderWidth = $('.specialists__slider > .slick-list').width();
        if (specSliderWidth < 325) {
            $('.specialists__doctor').css({
                maxWidth: specSliderWidth + 'px'
            });
        }
        $('.feedback__position').html('<span class="feedback__position_current">1</span>/' + $('.feedback__item').length);
    } else {
        $('.about__slider').filter('.slick-initialized').slick("unslick");
        $('.units__menu > ul').filter('.slick-initialized').slick("unslick");
    }

    if (window.matchMedia('screen and (min-width: 577px)').matches) {
        $('.features__slider').filter('.slick-initialized').slick("unslick");
    }

    if ($('.units__menu > .slick-initialized')) {
        unitsMenuSliderChangeTab()
    }

    if ($('.feedback__slider.slick-initialized')) {
        $('.feedback__slider').on('afterChange', function (event, slick, currentSlide) {
            $('.feedback__position_current').html($('.feedback__slider').slick('slickCurrentSlide') + 1);
        });
    }

    if (window.matchMedia('screen and (min-width: 960px)').matches) {
        selectButtons.appendTo('.about__slider')
    } else {
        selectButtons.detach();
    }
};


//Обработка событий после загрузки страницы
$(document).ready(function () {
    //Переменные для работы с формой
    const appointmentPhoneInput = $('.appointment__phone');
    const appointmentNameInput = $('.appointment__customerName');
    const appointmentConfident = $('.appointment__confident');
    const appointmentSubmitButton = $('.appointment__form .btn[type="submit"]');
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
            $('label[for="customerName"], label[for="popup-customerName"]').css({
                color: '#E84E2C'
            }).html('Введите имя');
            event.preventDefault();
        }

        if (!Inputmask.isValid(appointmentPhoneInput.val(), "+7-(999)-999-9999")) {
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
            $('.confident-label small').css({
                color: '#E84E2C'
            })
        }
        if (appointmentConfident.prop('checked') && Inputmask.isValid(appointmentPhoneInput.val(), "+7-(999)-999-9999") && appointmentNameInput.val() !== '') {
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
        if (!Inputmask.isValid(appointmentPhoneInput.val(), "+7-(999)-999-9999")) {
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

    appointmentPhoneInput.on('keyup', function (event) {
        if (typeof(event.originalEvent) != 'undefined') {
            appointmentPhoneInput.each(function (index) {
               if(index == appointmentPhoneInput.index(event.target)){
                   console.log(index);
               }
               else{
                   $(this).val($(this).val() + event.originalEvent.key)
               }
            })
        }

    });

    appointmentNameInput.on('input', function (event) {
        $(appointmentNameInput[0]).val($(event.currentTarget).val().replace(/[^А-Яа-я]/, ''));
        $(appointmentNameInput[1]).val($(event.currentTarget).val().replace(/[^А-Яа-я]/, ''));

    });

    appointmentConfident.change(function (event) {
        $(appointmentConfident[0]).prop('checked', $(event.currentTarget).prop('checked'));
        $(appointmentConfident[1]).prop('checked', $(event.currentTarget).prop('checked'));
        $(event.currentTarget).prop('checked');
        if (!this.checked) {
            $(this).css({
                borderColor: '#E84E2C',
            });
            $('.confident-label small').css({
                color: '#E84E2C',
            })
        } else {
            $(this).attr('style', '');
            $('.confident-label small').attr('style', '');
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


    //Кнопка назад
    // $('body').on('click', '.arrow-back', function () {
    //     if (dropdownTabsBlock.attr('style') == 'display: none;' && dropdownContentBlock.attr('style') == '') {
    //         dropdownContentBlock.css({
    //             display: 'none'
    //         });
    //         dropdownTabsBlock.attr('style', '');
    //         $('.dropdown-menu > .title').html('Услуги');
    //     } else if (dropdownMenuContainer.hasClass('dropdown-menu__container_active') && headerBottom.attr('style') == 'display: none;') {
    //         dropdownMenuContainer.removeClass('dropdown-menu__container_active').addClass('hide').attr('style', '');
    //         headerBottom.attr('style', '');
    //     } else if (dropdownMenuContainer.hasClass('dropdown-menu__container_active') && $(serviceTapButton).hasClass('tap-menu__button_active')) {
    //         closeServicesDropdownFromTapMenu();
    //     }
    // });

    //Вкладки на выпадающем меню хэдера
    $('.dropdown-menu__tabs_item').on('click', '.with-arrow', function (event) {
        const index = dropdownTabs.index($(event.target).parent());
        const prevLink = $('.dropdown-menu__tabs_item_active');
        prevLink.removeClass('dropdown-menu__tabs_item_active');
        $(dropdownTabs[index]).addClass('dropdown-menu__tabs_item_active');
        const dropdownContents = $('.dropdown-menu__item');
        $('.dropdown-menu__item_active').removeClass('dropdown-menu__item_active');
        $(dropdownContents[index]).addClass('dropdown-menu__item_active');
        $('.dropdown-menu__content').attr('style', '');
        $('.dropdown-menu__tabs').css({
            display: 'none'
        });
        $('.dropdown-menu').children('.title').html($('.dropdown-menu__tabs_item_active').children().html())
    });

    dropdownTabs.on('click', function (event) {
        if ($(window).width() < 960) {
        } else {
            event.preventDefault();
            const index = dropdownTabs.index(event.currentTarget);
            const prevLink = $('.dropdown-menu__tabs_item_active');
            prevLink.removeClass('dropdown-menu__tabs_item_active');
            $(dropdownTabs[index]).addClass('dropdown-menu__tabs_item_active');
            const dropdownContents = $('.dropdown-menu__item');
            $('.dropdown-menu__item_active').removeClass('dropdown-menu__item_active');
            $(dropdownContents[index]).addClass('dropdown-menu__item_active');
        }
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
    hamburger.on("click", function () {
        hamburger.toggleClass("is-active");
        $('.header__bottom').toggleClass('header__bottom_active');
        $('body').children().toggleClass('hide');
        $('.header').removeClass('hide');
        if (dropdownMenuContainer.attr('style') != 'display: none;') {
            dropdownMenuContainer.css({display: 'none'});
            dropdownContentBlock.attr('style', '');
            dropdownTabsBlock.attr('style', '');
            headerBottom.attr('style', '');
        }
    });

    DropdownOpenButtonHandler();

    //Обработка кнопки услуги в нижнем меню
    $(serviceTapButton).on('click', function () {
        if (!dropdownMenuContainer.hasClass('dropdown-menu__container_active')) {
            $(serviceTapButton).addClass('tap-menu__button_active');
            $('body').children().addClass('hide');
            $('.header').removeClass('hide');
            dropdownMenuContainer.removeClass('hide');
            $('.dropdown-menu__content').css({display: 'none'});
            dropdownMenuContainer.addClass('dropdown-menu__container_active');
            dropdownMenuContainer.css({
                display: 'block'
            });
            dropdownContentBlock.css({
                display: 'none'
            });

            if (prependFlag == 0) {
                $('.dropdown-menu').prepend('<h2 class="title">Услуги</h2>');
                $('.dropdown-menu').prepend('<img class="arrow-back" width="20px" height="15px" src="./assets/img/dropdown-menu/arrow-back.svg">');
                prependFlag = 1;
            }
        } else {
            closeServicesDropdownFromTapMenu();
        }

    });

    //Обработка кнопки записи в нижнем меню
    $(appointmentTapButton).on('click', function () {
        if (!popupIphone.hasClass('popup-iphone_active')) {
            $(appointmentTapButton).addClass('tap-menu__button_active');
            popupIphone.fadeIn(500).addClass('popup-iphone_active');
            popupIphoneFirstAction.html('Записаться');
            popupIphoneSecondAction.html('Вызов +7 (812) 627-02-03');
            $('body').css({
                overflow: 'hidden'
            })
        }
    });

    $(mapTapButton).on('click', function () {
        if (!popupIphone.hasClass('popup-iphone_active')) {
            $(appointmentTapButton).addClass('tap-menu__button_active');
            popupIphone.fadeIn(500).addClass('popup-iphone_active');
            popupIphoneFirstAction.html('Контакты');
            popupIphoneSecondAction.html('Проложить маршрут');

            $('body').css({
                overflow: 'hidden'
            })
        }
    });

    popupIphoneFirstAction.on('click', function () {
        if ($(this).html() == 'Записаться') {
            $('.appointment_popup').addClass('appointment_popup_active');
            $('.popup-iphone__actions').fadeOut();
        }
    });

    popupIphone.on('click', '.popup-iphone__cancel', function () {
        if ($('.appointment_popup').hasClass('appointment_popup_active')) {
            $('.appointment_popup').removeClass('appointment_popup_active');
            $('.popup-iphone__actions').fadeIn();
        } else if (popupIphone.hasClass('popup-iphone_active')) {
            popupIphone.fadeOut(500, function () {
                popupIphone.removeClass('popup-iphone_active');
            });
            $(appointmentTapButton).removeClass('tap-menu__button_active');
            $('body').css({
                overflow: 'visible'
            })
        }

    });

    //Обработка медиа запроса
    if (window.matchMedia('screen and (max-width: 960px)').matches) {
        onReadyMobileMediaChange();
        $('.units__features').append('<a class="btn btn_red_fill">Записаться на прием</a>');
        appendFlag = 0;
    } else {
        selectButtons.appendTo('.about__slider');
        // $('body').off('click');
        $('.units__features > a.btn.btn_red_fill').remove();
        appendFlag = 1;
    }

    $(".btn_red_fill").click(function () {
        $('body, html').animate({
            scrollTop: $(".appointment__block").offset().top - 54
        }, 1);
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