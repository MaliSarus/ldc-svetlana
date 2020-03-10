// ТУТ ОБРАБОТКА СЛАЙДЕРОВ И ЧТО С НИМИ СВЯЗАНО
window.onload = function () {
    const specSlick = $('.specialists__slider');
    specSlick.slick({
        infinite: true,
        arrows: false,
        dots: false,
        variableWidth: true,
        // centerMode: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll:1,
                    infinite: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                },
            }
        ]
    });

    $('.specialists__control-panel .arrows .arrows__arrow-left').on('click', function () {
        specSlick.slick('slickPrev');
    });
    $('.specialists__control-panel .arrows .arrows__arrow-right').on('click', function () {
        specSlick.slick('slickNext');
    });

    const feedSlick = $('.feedback__slider');

    feedSlick.slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots:false,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
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

    //Действия со слайдерами в момент загрузки экрана маленького размера
    if (window.matchMedia('screen and (max-width: 1000px)').matches) {
        selectButtons.detach();
        $('.about__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            infinite: false
        });
        $('.features__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            infinite: false,
            variableWidth: true,
            adaptiveHeight: true
        });
        $('.units__menu > ul').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            infinite: false,
            variableWidth: true,
            adaptiveHeight: true
        });
        const specSliderWidth = $('.specialists__slider > .slick-list').width();
        if(specSliderWidth < 325){
            $('.specialists__doctor').css({
                maxWidth: specSliderWidth + 'px'
            });
        }
        $('.feedback__position').html('<span class="feedback__position_current">1</span>/' + $('.feedback__item').length);
    } else {
        $('.about__slider').filter('.slick-initialized').slick("unslick");
        $('.features__slider').filter('.slick-initialized').slick("unslick");
    }

    if ($('.units__menu > .slick-initialized')) {
        $('.units__menu > ul').on('afterChange', function (event, slick, currentSlide) {
            const index = $('.units__menu > ul').slick('slickCurrentSlide');
            const prevLink = $('.units__menu-link_active');
            prevLink.removeClass('units__menu-link_active');
            $('.units__menu li')[index].children[0].classList.add('units__menu-link_active');
            $('.units__content-services_active').removeClass('units__content-services_active');
            $('.units__content-services')[index].classList.add('units__content-services_active');
        });
    }

    if ($('.feedback__slider.slick-initialized')) {
        $('.feedback__slider').on('afterChange', function (event, slick, currentSlide) {
            $('.feedback__position_current').html($('.feedback__slider').slick('slickCurrentSlide') + 1);
        });
    }
};

const selectButtons = $('.select-buttons');
let resizeFlag = 0;

$(window).on('resize', function () {
    if ($(window).width() > 576) {
        if (resizeFlag == 0) {
            $('.about__slider').filter('.slick-initialized').slick("unslick");
            $('.features__slider').filter('.slick-initialized').slick("unslick");
            $('.units__menu > ul').filter('.slick-initialized').slick("unslick");
            selectButtons.appendTo('.about__slider');
            $('.units__head .title').html('Отделения &lt;лечебно – диагностического центра&gt;');
            $('.units__emergency-room .title').html(' Взрослый и детский травмпункт &lt;ЛДЦ Завода “Светлана”&gt;');
            $('.units__features > a.btn.btn_red_fill').remove();
            $('.appointment__block > .content').addClass(['content_flex','content_between']);
            $('.specialists__head .title').html('Специалисты &lt;лечебно – диагностического центра&gt;');
            $('.feedback__head > .title').html('Отзывы &lt;наших клиентов&gt;');
            $('.feedback__position').html('<span class="feedback__position_current">1</span>/' + $('.feedback__item').length);
            resizeFlag = 1;
        }
    } else {
        const specSliderWidth = $('.specialists__slider > .slick-list').width();
        if(specSliderWidth < 325){
            $('.specialists__doctor').css({
                width: specSliderWidth + 'px'
            });
        }
        if (resizeFlag == 1) {
            selectButtons.detach();
            $('.about__slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                infinite: false
            });
            $('.about__slider').slick('setPosition');
            $('.features__slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                infinite: false,
                variableWidth: true,
                adaptiveHeight: true
            });
            $('.features__slider').slick('setPosition');
            $('.units__menu > ul').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                infinite: false,
                variableWidth: true,
                adaptiveHeight: true
            });
            $('.units__menu > ul').slick('setPosition');
            $('.units__head .title').html('Отделения ЛДЦ');
            $('.units__emergency-room .title').html('Взрослый и детский травмпункт');
            $('.units__features').append('<a class="btn btn_red_fill" href="#form-for-date">Записаться на прием</a>');
            $('.appointment__block > .content').removeClass(['content_flex','content_between']);
            $('.specialists__head .title').html('Специалисты ЛДЦ');
            $('.feedback__head > .title').html('Отзывы');
            resizeFlag = 0;
        }

        // $('.about__slider').slick('setPosition');
    }
});


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
            $('.appointment__form label[for="confident"] small').css({
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

    if (window.matchMedia('screen and (max-width: 1000px)').matches) {
        $('.units__features').append('<a class="btn btn_red_fill" href="#form-for-date">Записаться на прием</a>');
        $('.appointment__block > .content').removeClass(['content_flex','content_between']);
        $('.units__head .title').html('Отделения ЛДЦ');
        $('.units__emergency-room .title').html('Взрослый и детский травмпункт');
        $('.specialists__head .title').html('Специалисты ЛДЦ');
        $('.feedback__head > .title').html('Отзывы');
    } else {
    }
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