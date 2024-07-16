// Случайное число
function randomNumber(min, max) { 
    return Math.round(Math.random() * (max - min)) + min
}

// Кнопка вращения колеса
$("#wheel-spin").on("click tap", () => {
    $("#wheel-spin").attr("disabled", true).html("Подождите")

    let gift = randomNumber(0, gifts.length - 1)

    localStorage.fortune_spin = JSON.stringify(gifts[gift])
    spinFortuneWheel(gift + 1)
})

function spinFortuneWheel(giftId) {
    const numberOfSpins = _numberOfSpins // Количество вращений перед выпадением приза
    const rotationDuration = _rotationDuration // Длительность вращения (в секундах)

    // Скрываем кнопки "Крутить" и "Призы"
    $(".wheel__buttons").css({"opacity": "0"})
    
    $(".wheel-section").addClass("spin") // Ставим больше отступ снизу колеса
    $("body").addClass("no-scroll") // Отключаем прокрутку страницы
    $("#wheel").get(0).scrollIntoView({behavior: 'smooth'})  // Фиксируем экран на колесе

    // Отключаем медленное вращение
    clearInterval(wheelRotationIntervalId)

    const gift = giftId - 1 // Номер секции выигранного подарка
    const giftDeg = 360 / gifts.length // Ширина сектора с подарком
    const selectedGiftDeg = gift * giftDeg // Градусы поворота на выбранный подарок
    const numberOfSpinsDeg = numberOfSpins * 360 // Градусы для поворота всего колеса несколько раз
    const marginDeg = randomNumber(-((giftDeg - 2) / 2), ((giftDeg - 2) / 2)) // Отступ от краев сектора
    const rotationCompensation = wheelRotationDeg % 360 // Компенсация для отсчета градусов с нуля

    // Изначальный поворот
    // - Компенсация
    // + Несколько полных оборотов
    // + Градусы для поворота на награду
    // + Дополнительное вращение для неточного наведения
    const rotateDeg = wheelRotationDeg - rotationCompensation + numberOfSpinsDeg + selectedGiftDeg + marginDeg

    // Сохраняем градусы поворота
    localStorage.fortune_rotateDeg = rotateDeg

    // Вращение колеса
    $("#wheel-canvas").css({
        "transform": `rotate(-${rotateDeg}deg)`,
        "transition": `transform ${rotationDuration}s cubic-bezier(0.1, 0, 0.25, 1)`,
    })

    // Через 1 секунду после остановки прокрутка до секции с призом
    setTimeout(() => {
        // Отображаем секции с подарком и каталог курсов
        showGift(true)
    }, (rotationDuration + 1) * 1000)
}


// Функция прокрутки и отображения секций с призом и курсов
function showGift(doScroll) {
    let spin = JSON.parse(localStorage.fortune_spin) // Парсим данные о вращении

    $(".win__gift-name").text(spin.prize) // Заменяем текст на название приза
    // $("#win-promocode").text(spin.spin_gift) // Заменяем 
    $("#win-link").attr("href", spin.spin_message)

    // Копирование промокода
    $("#win-promocode").on("click tap", () => {
        if ($("#win-promocode").text() !== "Скопировано") {
            let tempText = $("#win-promocode").text()
            navigator.clipboard.writeText(tempText)
            $("#win-promocode").text("Скопировано")
            setTimeout(() => {
                $("#win-promocode").text(tempText)
            }, 2000)
        }
    })

    // Отображаем секцию с призом
    $("#win").show()
    setTimeout(() => $("#win").css({"opacity": "1"}), 10)

    // Отображаем секцию с курсами
    $("#catalog").show()
    setTimeout(() => $("#catalog").css({"opacity": "1"}), 10)

    $(".wheel__buttons").remove() // Удаляем кнопки под колесом

    // Отображаем надпись "Сделано студентами PS"
    $("#made-by-students").show()

    // Если нужно прокрутить страницу до секции
    if (doScroll) {
        $("#win").get(0).scrollIntoView({behavior: 'smooth'}) // Прокручиваем до секции с призом
        $("body").removeClass("no-scroll") // Возвращаем прокрутку страницы
    }
}

// Если пользователь крутил колесо
if (localStorage.fortune_spin) {
    // Отключаем плавное появление
    $("#win").css({"transition": "0s all"})
    $("#catalog").css({"transition": "0s all"})

    // Отображаем приз, но не прокручиваем страницу на сектор
    showGift(false)

    // Вращение колеса
    $("#wheel-canvas").css({
        "transform": `rotate(-${localStorage.fortune_rotateDeg}deg)`,
        "transition": `transform ${0}s cubic-bezier(0.1, 0, 0.25, 1)`,
    })
}