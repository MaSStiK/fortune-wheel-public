// let gifts // Глобальный массив с данными

let gifts = [ // глобальный массив с данными
    {
        "color": "#A2FF76",
        "image_url": "./web/assets/gifts/7.png",
        "prize": "Бесплатная карьерно-коучинговая консультация"
    },
    {
        "color": "#BBFF75",
        "image_url": "./web/assets/gifts/2.png",
        "prize": "Скидка на покупку любого курса - 75%"
    },
    {
        "color": "#CFFF74",
        "image_url": "./web/assets/gifts/3.png",
        "prize": "Скидка на покупку любого курса - 70%"
    },
    {
        "color": "#DDFF73",
        "image_url": "./web/assets/gifts/4.png",
        "prize": "Промокод на 2 мини-курса ProductStar на выбор"
    },
    {
        "color": "#C2EEA3",
        "image_url": "./web/assets/gifts/5.png",
        "prize": "«Подписка РБК Pro» на 1 месяц"
    },
    {
        "color": "#B0E9B1",
        "image_url": "./web/assets/gifts/6.png",
        "prize": "Скидка на покупку любого курса - 65%"
    },
    {
        "color": "#8ADFD2",
        "image_url": "./web/assets/gifts/1.png",
        "prize": "Промокод на 1 мини-курс ProductStar на выбор"
    },
    {
        "color": "#63D4F3",
        "image_url": "./web/assets/gifts/8.png",
        "prize": "Гайд “Как не создать очередной бесполезный продукт” "
    }
]

// Отрисовываем секцию с подарками
renderGiftsSection()

// Отрисовываем колесо
renderFortuneWheel()


// Рендер секции и призами
function renderGiftsSection() {
    for (let gift of gifts) {
        $(".gifts__container").append(`
            <div class="gifts__gift">
                <img class="gifts__gift-image" src="${gift.image_url}" alt="gift">
                <p class="gifts__gift-text">${gift.prize}</p>
            </div>
        `)
    }
}