window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const modalWindow = () => {

        const activeButSize = document.querySelector('.active_but-size'),
            activeButView = document.querySelector('.active_but-view'),
            imgCardProduct = document.querySelector('.img__card-product'),
            blockContentDescription = document.querySelector('.block-content__description'),
            sizeMin = document.querySelector('.size-min'),
            sizeAverage = document.querySelector('.size-average'),
            ingredient = document.querySelectorAll('.active-ingredient'),
            butLabelSize = document.querySelectorAll('.label-size'),
            butLabel = document.querySelectorAll('.label');

        /* Start
        ------------------------------------------------- */
        const start = () => {
            activeIngredient();    // При клике на кнопку выбора размера пицы и вида теста
            clickButLabel();      // При наведении на ингредиент
        };


        /* При наведении на ингредиент
        ------------------------------------------------- */
        const activeIngredient = () => {
            ingredient.forEach((elem, i) => {
                ingredient[i].addEventListener('click', () => {
                    if (ingredient[i].classList.contains('active-ingredient')) {
                        ingredient[i].classList.remove('active-ingredient');
                        ingredient[i].classList.add('deactive-ingredient');
                    } else {
                        ingredient[i].classList.remove('deactive-ingredient');
                        ingredient[i].classList.add('active-ingredient');
                    }
                });
            });
        };


        /* Меняем положения ползунка
        ------------------------------------------------- */
        const butPos = (elem) => {
            elem.style.left = event.target.offsetLeft + 'px';
        };

        /* Замена текста «диаметр и вес»
        ------------------------------------------------- */
        const replaceTextviewSize = (diameter, weight) => {
            blockContentDescription.textContent = `${ diameter } см, традиционное тесто, ${ weight } г`;
        };

        /* Замена текста «традиционное/тонкое тесто»
        ------------------------------------------------- */
        const replaceTextviewTest = (viewTest) => {
            let stirng = blockContentDescription.textContent;
            blockContentDescription.textContent = stirng.replace(/традиционное|тонкое(?! тесто)/gi, `${ viewTest }`);
        };

        /* Изменение изображения
        ------------------------------------------------- */
        const newImgPizza = (src) => {
            // получаем src изображения пиццы
            let srcImg = imgCardProduct.src;
            // меняем номер изображения в src (01.png на 02.png ...)
            let srcReplace = srcImg.replace(/[1-4](?=.png)/gi, `${ src }`);
            // присваиваем новый номер изображения
            let srcResult = imgCardProduct.src = srcReplace;
        };

        /* Изменения размера изображения пиццы
        ------------------------------------------------- */
        const newSizePizza = size => imgCardProduct.style.width = `${ size }%`;

        /* При клике на кнопку выбора размера пицы и вида теста
        ------------------------------------------------- */
        const clickButLabel = () => {
            butLabel.forEach((elem, i) => {

                butLabel[i].addEventListener('click', (event) => {
                    let target = event.target;

                    /* добавляем класс «active»
                    ------------------------------------------------- */
                    const addRemoveActive = (elem) => {
                        for (let i = 0; i < elem.length; i++) {
                            elem[i].classList.remove('active');
                        }
                        target.classList.toggle('active');
                    };

                    /* Условия
                    ------------------------------------------------- */
                    // при клике на кнопку «маленькая»
                    if (target.classList.contains('size-min')) {
                        butPos(activeButSize);
                        butPos(activeButView);
                        replaceTextviewSize(25, 390);
                        newSizePizza(65);
                        newImgPizza(1);
                        addRemoveActive(butLabelSize);

                        // при клике на кнопку «средняя»
                    } else if (target.classList.contains('size-average')) {
                        if (activeButView.offsetLeft <= 0) {
                            butPos(activeButSize);
                            replaceTextviewSize(30, 590);
                            newSizePizza(85);
                            newImgPizza(2);
                            addRemoveActive(butLabelSize);
                        } else {
                            butPos(activeButSize);
                            replaceTextviewSize(30, 590);
                            newSizePizza(85);
                            newImgPizza(4);
                            addRemoveActive(butLabelSize);
                        }

                        // при клике на кнопку «большая»
                    } else if (target.classList.contains('size-max')) {
                        if (activeButView.offsetLeft <= 0) {
                            butPos(activeButSize);
                            replaceTextviewSize(35, 820);
                            newSizePizza(100);
                            newImgPizza(3);
                            addRemoveActive(butLabelSize);
                        } else {
                            butPos(activeButSize);
                            replaceTextviewSize(35, 820);
                            newSizePizza(100);
                            newImgPizza(4);
                            addRemoveActive(butLabelSize);
                        }

                        /* Условия
                        ------------------------------------------------- */
                        // при клике на кнопку «традиционное»
                    } else if (target.classList.contains('tradition')) {
                        // addRemoveActive(butLabelView);
                        if (sizeMin.classList.contains('active')) {
                            // return
                        } else if (sizeAverage.classList.contains('active')) {
                            butPos(activeButView);
                            replaceTextviewTest('традиционное ');
                            newImgPizza(2);
                        } else {
                            butPos(activeButView);
                            replaceTextviewTest('традиционное ');
                            newImgPizza(3);
                        }

                        // при клике на кнопку «тонкое»
                    } else if (target.classList.contains('thin')) {
                        if (sizeMin.classList.contains('active')) {
                            // return;
                        } else if (sizeAverage.classList.contains('active')) {
                            butPos(activeButView);
                            replaceTextviewTest('тонкое ');
                            newImgPizza(4);
                        } else {
                            butPos(activeButView);
                            replaceTextviewTest('тонкое ');
                            newImgPizza(4);
                        }
                    }

                });

            });
        };

        /* ------------------------------------------------- */
        start();

    };
    modalWindow();

    /* «ЛИПКОЕ» МЕНЮ
    --------------------------------------------------------------- */
    const stickyMenu = () => {

        const mainMenu = document.querySelector('.main-menu'),
            menuLogo = document.querySelector('.menu-logo');


        const animationMenu = (elem, value) => {
            elem.style.cssText = `
				transform: translateX(${ value }px);
				transition: transform .25s ease;
			`;
        };

        let posTopMenu = document.querySelector('.block-main-menu').offsetTop;

        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > posTopMenu) {
                animationMenu(menuLogo, 0);
                animationMenu(mainMenu, 51);
            } else {
                animationMenu(menuLogo, -51);
                animationMenu(mainMenu, 0);
            }
        });

    };
    stickyMenu();

    /* СЛАЙДЕР
    --------------------------------------------------------------- */
    const slider = () => {

        const blockSlider = document.querySelector('.block-slider'),
            blockConrol = document.querySelector('.block-slider-conrol'),
            blockConrolDots = document.querySelector('.block-control-dots'),
            sliderImage = document.querySelectorAll('.slider-image');

        let currentSlide = 0,
            interval;

        /* Точки (Dots) ↓
        ----------------------------------- */
        const dotSlider = () => {
            // Добавляем на стр. нужное кол-во точек ↓
            sliderImage.forEach(() => {
                const dot = document.createElement('div');
                dot.className = 'dot';
                blockConrolDots.appendChild(dot);

                document.querySelectorAll('.dot').forEach((item, i, arr) => {
                    arr[0].classList.add('dot-active');
                });
            });
        };
        dotSlider();

        /* При наведении на стрелки или точки запускаем функ. остановки работы слайдера ↓
        ----------------------------------- */
        const sliderStartStop = (func) => {
            if (event.target.matches('.next') ||
                event.target.matches('.prev') ||
                event.target.matches('.dot')) {
                func();
            }
        };

        blockSlider.addEventListener('mouseover', (event) => sliderStartStop(stopSlider));
        blockSlider.addEventListener('mouseout', (event) => sliderStartStop(startSlider));

        const dot = document.querySelectorAll('.dot');

        /* Добавляем/удаляем класс «active» (класс «active» - активирует показ нового слайда) ↓
        ----------------------------------- */
        const removeClassActive = () => {
            sliderImage[currentSlide].classList.remove('active-slider');
            dot[currentSlide].classList.remove('dot-active');
        };
        const addClassActive = () => {
            sliderImage[currentSlide].classList.add('active-slider');
            dot[currentSlide].classList.add('dot-active');
        };

        /* При клике на стрелки или точки ↓
        ----------------------------------- */
        document.addEventListener('click', (event) => {
            let target = event.target;
            if (event.target.matches('.next')) {
                nextSlider();
            }
            if (event.target.matches('.prev')) {
                prevSlider();
            }
            if (event.target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        removeClassActive(); // ← удаляем класс active
                        currentSlide = index;
                        if (currentSlide >= sliderImage.length) {
                            currentSlide = 0;
                        }
                        addClassActive(); // ← добавдяем класс active
                    }
                });
            }
        });

        /* Функция пролистывания вперед ↓
        ----------------------------- */
        const nextSlider = () => {
            removeClassActive(); // ← удаляем класс active
            currentSlide++;
            if (currentSlide >= sliderImage.length) {
                currentSlide = 0;
            }
            addClassActive(); // ← добавдяем класс active
        };

        /* Функция пролистывания назад ↓
        ----------------------------- */
        const prevSlider = () => {
            removeClassActive(); // ← удаляем класс active
            currentSlide--;
            if (currentSlide <= -1) {
                currentSlide = 2;
            }
            addClassActive(); // ← добавдяем класс active
        };

        /* Автопролистывание ↓
        ----------------------------------- */
        const autoPlaySlider = () => nextSlider();

        /* Запуск слайдера ↓
        -------------------------------------- */
        const startSlider = () => {
            interval = setInterval(autoPlaySlider, 6000);
        };
        startSlider();

        /* Остановка работы слайдера ↓
        -------------------------------------- */
        const stopSlider = () => {
            clearInterval(interval);
        };

    };

    slider();


    /* ОСНОВНОЙ КАТАЛОГ
    --------------------------------------------------------------- */
    const mainCatalog = () => {

        // Функция создания блока товра ↓
        const addBlockProduct = (img, name, description, price) => {

            const blockProduct = document.createElement('div');
            blockProduct.className = 'block-product';
            blockProduct.innerHTML = `
				<div class='product__images'>
					<img class='product__image' src='img/catalog/${ img }.png' alt='пицца'>
				</div>
				<div class='product__name'>${ name }</div>
				<div class='product__description'>
					${ description }
				</div>
				<div class='product__price'>От <span>${ price }</span> ₽</div>
				<div class='product__this-choose'>В корзину</div>
			`;

            return blockProduct;
        };

        const blocksProducts = document.querySelector('.blocks-products'); // ← «Родитель» всех блоков товра

        // Создание блоков товара ↓
        blocksProducts.appendChild(addBlockProduct('product_01', 'Аррива1', 'Цыпленок, томатный соус, сладкий перец, красный лук, моцарелла, острый халапеньо, томаты, соус сальса', 520));
        blocksProducts.appendChild(addBlockProduct('product_02', 'Аррива2', 'Соберите свою пиццу 35 см с двумя разными вкусами', 520));
        blocksProducts.appendChild(addBlockProduct('product_03', 'Аррива3', 'Соберите свою пиццу 35 см с двумя разными вкусами', 520));
        blocksProducts.appendChild(addBlockProduct('product_04', 'Аррива4', 'Соберите свою пиццу 35 см с двумя разными вкусами', 520));

    };
    mainCatalog();

    /* МОДАЛЬНОЕ ОКНО - «КАРТОЧКА ТОВАРА»
    --------------------------------------------------------------- */
    const cardProduct = () => {
        const modalWindow = document.querySelector('.modal-window__card-product'),
            close = document.querySelector('.close');

        // Открываем модальное окно карточки товара
        const openModelWindow = () => {
            modalWindow.style.display = 'flex';
        };

        // закрыть можальное окно
        close.addEventListener('click', () => modalWindow.style.display = 'none');

        // При клике на товар или кнопку выбрать
        const clickEventProduct = () => {
            const blockProduct = document.querySelectorAll('.block-product');

            blockProduct.forEach((item, i) => {
                blockProduct[i].addEventListener('click', (event) => {
                    let target = event.target;
                    console.log(target.className);
                    if (target.className === 'product__image' || target.className === 'product__this-choose') {
                        openModelWindow();
                    }

                });
            });
        };
        clickEventProduct();

    };
    cardProduct();

});