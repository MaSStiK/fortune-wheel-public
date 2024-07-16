// Кнопка "Участвую" в блоке Home, прокручивает страницу до блока регистрации
$("#goto-registration").on("click tap", () => {
    $("#registration").get(0).scrollIntoView({behavior: 'smooth'})
})

// Кнопка "Призы" в блоке header, прокручивает страницу до блока с подарками
$("#header-goto-gifts").on("click tap", () => {
    $("#gifts").get(0).scrollIntoView({behavior: 'smooth'})
})


// Кнопка "Перейти к колесу" в блоке registration, прокручивает страницу до колеса
$("#goto-wheel").on("click tap", () => {
    $("#wheel").get(0).scrollIntoView({behavior: 'smooth'})
})


// Кнопка "Призы" в блоке Wheel, прокручивает страницу до блока с подарками
$("#goto-gifts").on("click tap", () => {
    $("#gifts").get(0).scrollIntoView({behavior: 'smooth'})
})

// При нажатии на заблокированную кнопку "Крутить" прокручивает на регистрацию
$(".wheel-spin-overlap").on("click tap", () => {
    $("#registration").get(0).scrollIntoView({behavior: 'smooth'})
})

// При нажатии на заблокированную кнопку "Крутить" прокручивает на регистрацию
$(".header-container__logo").on("click tap", () => {
    window.open("https://productstar.ru", "_blank")
})