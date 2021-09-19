// Загрузка ДОМ-дерева
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.button-russia-js').classList.add('filter__button_active');
    getData(document.querySelector('.button-russia-js'))
    }
);

// Загрузка данных из JSON
let result;
async function getData (button) {
    
        // GET-запрос
        if (button.dataset.click == '0') {
        // Путь к файлу JSON
            const file = "json/companies.json";
            let response = await fetch(file, {
                method: "GET"
            });
            if (response.ok) {
                result = await response.json();
                loadData(result, button);
                // loadDataForMap(result, button);
                readySpoilers(button);
                // Меняем значение, чтобы больше не шла загрузка
                button.dataset.click = '1';
            } else {
                alert("Ошибка");
            }
        }
}

// Функция подгрузки HTML-элементов
function loadData (data, button) {

    // Для России
    if (button.classList.contains('button-russia-js')) {
        const rus = document.querySelector('.filter__country_russia');

        // Создаем элементы карточек офисов
        data.russia.forEach(function(item) {
            const city = item.city;
            const offices = item.offices;
    
            let cityStart = `<div class="filter__office office">
                                <button class="filter__spoiler">${city}</button>
                                <div class="office__container">
                                    <div class="office__height">`;
    
            let cityBody = '';
            offices.forEach(function (item) {
                cityBody += `<div class="office__body" data-latitude="${item.latitude}" data-longitude="${item.longitude}">
                                <p class="office__name">Офис <span>${item.name}</span></p>
                                <p class="office__owner">${item.owner}</p>
                                <div class="office__phone">
                                    <a href="tel:+79999999999" class="office__number office__number-1">${item.tel1}</a>
                                    <a href="tel:+79999999999" class="office__number office__number-2">${item.tel2}</a>
                                </div>
                                <p class="office__mail">${item.mail}</p>
                            </div>`;
            });
    
            let cityEnd = `</div>
                        </div>
                    </div>`;
    
            let cityItem = '';
            cityItem += cityStart;
            cityItem += cityBody;
            cityItem += cityEnd;

            // Добавляем элементы в блок России
            rus.insertAdjacentHTML('beforeend', cityItem);
        });

        // Функция, которая вешает слушатели клика по карточке-офиса
        clickCompany(button);
        
    } 
    // Для Белоруссии
    else if (button.classList.contains('button-belarus-js')) {
        const bel = document.querySelector('.filter__country_belarus');

        // Создаем элементы карточек офисов
        data.belarus.forEach(function(item) {
            const city = item.city;
            const offices = item.offices;
    
            let cityStart = `<div class="filter__office office">
                                <button class="filter__spoiler">${city}</button>
                                <div class="office__container">
                                    <div class="office__height">`;
    
            let cityBody = '';
            offices.forEach(function (item) {
                cityBody += `<div class="office__body" data-latitude="${item.latitude}" data-longitude="${item.longitude}">
                                <p class="office__name">Офис <span>${item.name}</span></p>
                                <p class="office__owner">${item.owner}</p>
                                <div class="office__phone">
                                    <a href="tel:+79999999999" class="office__number office__number-1">${item.tel1}</a>
                                    <a href="tel:+79999999999" class="office__number office__number-2">${item.tel2}</a>
                                </div>
                                <p class="office__mail">${item.mail}</p>
                            </div>`;
            });
    
            let cityEnd = `</div>
                        </div>
                    </div>`;
    
            let cityItem = '';
            cityItem += cityStart;
            cityItem += cityBody;
            cityItem += cityEnd;

            // Добавляем элементы в блок Белоруссии
            bel.insertAdjacentHTML('beforeend', cityItem);
        });

        // Функция, которая вешает слушатели клика по карточке-офиса
        clickCompany(button);
    }
}

// Навешиваем событие клика на кнопку-Страну в фильтре
const rusBtn = document.querySelector('.button-russia-js');
const belBtn = document.querySelector('.button-belarus-js');
const rus = document.querySelector('.filter__country_russia');
const bel = document.querySelector('.filter__country_belarus');

rusBtn.addEventListener('click', (e) => {showRusCities(e.target)});
belBtn.addEventListener('click', (e) => {showBelCities(e.target)});

// Функции переключения
function showRusCities (button) {

    rusBtn.classList.add('filter__button_active');
    belBtn.classList.remove('filter__button_active');

    rus.style.display = 'block';
    bel.style.display = 'none';

    // Добавление меток России и центрирование
    myMap.setCenter([56.85915767819505,60.61065444860028]);
    myMap.setZoom(4);
    loadDataForMapRus(result);
    
    // Удаление меток Белоруссии
    arrClusterersBel.forEach(function(el) {
        myMap.geoObjects.remove(el);
    });

    // Получение данных из JSON-файла, но в данной функции получения не будет, так как для России данные получены при загрузке страницы
    getData(button);

}

function showBelCities (button) {

    belBtn.classList.add('filter__button_active');
    rusBtn.classList.remove('filter__button_active');

    bel.style.display = 'block';
    rus.style.display = 'none';

    // Добавление меток Белоруссии и центрирование
    loadDataForMapBel(result);
    myMap.setCenter([53.030311499413585,27.536313628287807]);
    myMap.setZoom(7);

    // Удаление меток России
    arrClusterersRus.forEach(function(el) {
        myMap.geoObjects.remove(el);
    });

    // Получение данных из JSON-файла для Белоруссии
    getData(button);
    
}

// Функция навешивания лисенеров для спойлеров
function readySpoilers (button) {

    if (button.classList.contains('button-russia-js')) {
        const spoilers1 = document.querySelectorAll('.filter__country_russia .filter__spoiler');
        spoilers1.forEach(function (spoilers) {
            spoilers.addEventListener('click', (e) => {showCity(e.target)})
        });  
    }
    if (button.classList.contains('button-belarus-js')) {
        const spoilers2 = document.querySelectorAll('.filter__country_belarus .filter__spoiler');
        spoilers2.forEach(function (spoilers) {
            spoilers.addEventListener('click', (e) => {showCity(e.target)})
        });  
    }
    
}

// Функция раскрытия/закрытия спойлеров, реализован аккордеон
function showCity (spoiler) {

    let citiesArr;
    let country;
    let spoilerOffices;
    let height;
    let spoilers;

    spoilers = document.querySelectorAll('.filter__spoiler');
    spoilerOffices = spoiler.nextElementSibling;
    height = spoilerOffices.querySelector('.office__height').offsetHeight;


    if (!spoilerOffices.classList.contains('open')) {

        // Массив всех городов, закрываем все спойлеры
        country = spoiler.closest('.filter__country');
        citiesArr = country.querySelectorAll('.office__container');
        citiesArr.forEach(function (element) {
            element.classList.remove('open');
            element.style.height = 0 + 'px';
            element.pointerEvents = 'none';
        });
        spoilers.forEach(function (element) {
            element.classList.remove('filter__spoiler_active');
        });
        
        // Раскрываем нужный спойлер
        spoilerOffices.classList.add('open');
        spoiler.classList.add('filter__spoiler_active');
        spoilerOffices.style.height = height + 'px';
        spoilerOffices.pointerEvents = 'unset';
        spoilerOffices.cursor = 'pointer';
        console.log(spoilerOffices);

    } else {
        // Закрываем спойлер при втором нажатии
        spoilerOffices.classList.remove('open');
        spoiler.classList.remove('filter__spoiler_active');
        spoilerOffices.style.height = 0 + 'px';
        spoilerOffices.pointerEvents = 'none';
    }
    
}

// Подключение API яндекс карт
ymaps.ready(init);

// Переменные, которые используем глобально
let myMap;
let arrPlacemarks = [];
let arrClusterersRus = [];
let arrClusterersBel = [];
let clusterer;

function init(){
    // Создание карты
    myMap = new ymaps.Map("map", {
        center: [56.85915767819505,60.61065444860028],
        zoom: 4,
        behaviors: ["drag"]
    });

    // Запуск функции загрузки данных для России
    loadDataForMapRus(result);
}

// Функция загрузки и размещения меток, кластеров для России
function loadDataForMapRus (data) {
        
        data.russia.forEach(function(item) {
            let arrPlacemarks = [];
            // Стили метки
            var circleLayoutShadow = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"></div>');
            arrPlacemarks = item.offices.map(function (metka) {
                var circleLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"></div>');
                return new ymaps.Placemark(
                    [metka.latitude,metka.longitude], {
                        balloonContent: `<div class="office__body-map">
                                            <p class="office__name-map">Офис <span>${metka.name}</span></p>
                                            <p class="office__owner-map">${metka.owner}</p>
                                            <div class="office__phone-map">
                                                <a href="tel:+79999999999" class="office__number-map">${metka.tel1}</a>
                                                <a href="tel:+79999999999" class="office__number-map">${metka.tel2}</a>
                                            </div>
                                            <p class="office__mail-map">${metka.mail}</p>
                                        </div>`
                    }, {
                        hideIconOnBalloonOpen: false,
                        iconLayout: circleLayout,
                        iconOffset: [-11, -12],
                        // Описываем фигуру активной области "Круг".
                        iconShape: {
                            type: 'Circle',
                            // Круг описывается в виде центра и радиуса
                            coordinates: [10, 10],
                            radius: 12
                        }
                    }
                );

            });

            // Пока функция для теста
            // arrPlacemarks.forEach(function(el) {
            //     console.log("событие клика");
            //     el.events.add('click', function () {
            //         alert('О, событие!');
            //         el.properties.set({
            //             iconLayout: circleLayoutShadow
            //         });
            //     });
            // });

            // Создаем кластеры
            var circleLayoutCluster = ymaps.templateLayoutFactory.createClass(`<div class="cluster_layout_container"><div class='cluster_content'>${arrPlacemarks.length}</div></div>`);
            clusterer = new ymaps.Clusterer({
                clusterIconLayout: circleLayoutCluster,
                iconOffset: [-16, -16],
                // Описываем фигуру активной области "Круг".
                clusterIconShape: {
                    type: 'Circle',
                    // Круг описывается в виде центра и радиуса
                    coordinates: [16, 16],
                    radius: 16
                }
            });
            
            myMap.geoObjects.add(clusterer);
            clusterer.add(arrPlacemarks);
            // Пушим кластеры в массив, чтобы потом кластеры можно было удалить
            arrClusterersRus.push(clusterer);
        });
}

// Функция загрузки и размещения меток, кластеров для Белоруссии
function loadDataForMapBel (data) {

        data.belarus.forEach(function(item) {
            let arrPlacemarks = [];
            // Стили метки
            arrPlacemarks = item.offices.map(function (metka) {
                var circleLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"></div>');
                return new ymaps.Placemark(
                    [metka.latitude,metka.longitude], {
                        balloonContent: `<div class="office__body-map">
                                            <p class="office__name-map">Офис <span>${metka.name}</span></p>
                                            <p class="office__owner-map">${metka.owner}</p>
                                            <div class="office__phone-map">
                                                <a href="tel:+79999999999" class="office__number-map">${metka.tel1}</a>
                                                <a href="tel:+79999999999" class="office__number-map">${metka.tel2}</a>
                                            </div>
                                            <p class="office__mail-map">${metka.mail}</p>
                                        </div>`
                    }, {
                        hideIconOnBalloonOpen: false,
                        shadow: true,
                        iconLayout: circleLayout,
                        iconOffset: [-11, -12],
                        // Описываем фигуру активной области "Круг".
                        iconShape: {
                            type: 'Circle',
                            // Круг описывается в виде центра и радиуса
                            coordinates: [10, 10],
                            radius: 12
                        }
                    }
                );
            });

            // Пока функция для теста
            // arrPlacemarks.forEach(function(el) {
            //     console.log("событие клика");
            //     el.events.add('click', function () {
            //         alert('О, событие!');
            //     });
            // });

            // Создаем кластеры
            var circleLayoutCluster = ymaps.templateLayoutFactory.createClass(`<div class="cluster_layout_container"><div class='cluster_content'>${arrPlacemarks.length}</div></div>`);
            var clusterer = new ymaps.Clusterer({
                clusterIconLayout: circleLayoutCluster,
                iconOffset: [-16, -16],
                // Описываем фигуру активной области "Круг".
                clusterIconShape: {
                    type: 'Circle',
                    // Круг описывается в виде центра и радиуса
                    coordinates: [16, 16],
                    radius: 16
                }
            });
            myMap.geoObjects.add(clusterer);
            clusterer.add(arrPlacemarks);
            // Пушим кластеры в массив, чтобы потом кластеры можно было удалить
            arrClusterersBel.push(clusterer);
        });
    // }
}

// Функция нажатия по офисам на панели с перемещением к офису
function clickCompany (button) {

    // Оттдельно навешиваем слушатели на карточки-офисы России и Болоруссии
    if (button.classList.contains('button-russia-js')) {
        let companiesRus = document.querySelectorAll('.filter__country_russia .office__body');
        companiesRus.forEach(function(company) {
            company.addEventListener('click', (e) => {toPlacemark(e.target.closest('.office__body'))});
        });
    }
    if (button.classList.contains('button-belarus-js')) {
        let companiesBel = document.querySelectorAll('.filter__country_belarus .office__body');
        console.log(companiesBel);
        companiesBel.forEach(function(company) {
            company.addEventListener('click', (e) => {toPlacemark(e.target.closest('.office__body'))});
        });
    }
    
    // Функция перехода к нужной метке
    function toPlacemark (company) {

        myMap.setCenter([company.dataset.latitude,company.dataset.longitude]);
        myMap.setZoom(15);

        // Раскрываем балон при нажатии на офис в фильтре
        myMap.balloon.open([company.dataset.latitude,company.dataset.longitude], 
            `<div class="office__body-map">
                <p class="office__name-map">Офис <span>${company.querySelector('.office__name span').innerHTML}</span></p>
                <p class="office__owner-map">${company.querySelector('.office__owner').innerHTML}</p>
                <div class="office__phone-map">
                    <a href="tel:+79999999999" class="office__number-map">${company.querySelector('.office__number-1').innerHTML}</a>
                    <a href="tel:+79999999999" class="office__number-map">${company.querySelector('.office__number-2').innerHTML}</a>
                </div>
                <p class="office__mail-map">${company.querySelector('.office__mail').innerHTML}</p>
            </div>`, 
    {
        // Тень
        shadow: true
    });
    }
}