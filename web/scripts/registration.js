// Функция отображения ошибки (ДЛЯ ВСЕХ ФОРМ)
function setFormError(form, error, buttonText="Отправить") {
    $(`${form} button[type=submit`).attr("disabled", true).html("Подождите") // Блокируем кнопку
    $(`${form} .form-error`).text(error).show() // Отображаем ошибку формы
    setTimeout(() => {
        $(`${form} button[type=submit`).removeAttr("disabled").html(buttonText) // Разблокируем кнопку через 5 секунд
    }, 2000)
}


// Маска ввода номера телефона
const phoneMask = IMask($("#form-phone")[0], {mask: "+0(000)000-00-00"})

// Поле name, удаление лишних пробелов
$("#form-name").on("change", () => {
    $("#form-name").val($("#form-name").val().replace(/ +/g, " ").trim())
})

// Поле email, удаление всех пробелов
$("#form-email").on("change", () => {
    $("#form-email").val($("#form-email").val().replaceAll(" ", "").trim())
})

// Автоматические скрытие ошибки при обновлении инпутов
$(".registration__form input").on("input", () => {
    $(".form-error").hide()
})

$(".registration__form").submit((event) => {
    event.preventDefault() // Отключение базового перехода
    $(".form-error").hide() // Прячем ошибку
    
    // Получаем поля из фомы
    const formData = new FormData($(".registration__form")[0])
    const formName = formData.get("name").trim()
    const formPhone = phoneMask.unmaskedValue.trim()
    const formEmail = formData.get("email").trim()
    const formPolicy = formData.get("policy")

    // Если поле имя не заполнено
    if (!formName.length) {
        setFormError(".registration__form", "Вы не заполнили поле имя!", "Зарегистрироваться")
        return
    }
    // Проверка максимальной длины имени
    if (formName.length > 50) {
        setFormError(".registration__form", "Длина имени не может превышать 50 символов!", "Зарегистрироваться")
        return
    }

    // Проверка поля Номер телефона на регулярном выражении (является ли значение числом) или не равен 11 символам
    let rePhone = /^-?\d+$/
    if (!rePhone.test(formPhone) || formPhone.length !== 11) {
        setFormError(".registration__form", "Неверный формат номера телефона!", "Зарегистрироваться")
        return
    }

    // Проверка поля Почты на регулярном выражении
    let reEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    if (!reEmail.test(formEmail)) {
        setFormError(".registration__form", "Неверный формат email!", "Зарегистрироваться")
        return
    }

    // Если поле почты не заполнено
    if (!formEmail.length) {
        setFormError(".registration__form", "Вы не заполнили поле email!", "Зарегистрироваться")
        return
    }

    // Проверка максимальной длины почты
    if (formEmail.length > 50) {
        setFormError(".registration__form", "Длина email не может превышать 50 символов!", "Зарегистрироваться")
        return
    }

    // Проверка галочки политики конфиденциальности
    if (!formPolicy) {
        setFormError(".registration__form", "Вы не поставили галочку!", "Зарегистрироваться")
        return
    }


    // Если все проверки прошло - отключаем кнопку и ждем ответа от сервера
    $("#registration-submit").attr("disabled", true).html("Подождите")

    // Сохраняем информацию
    localStorage.fortune_userName = formName
    localStorage.fortune_userPhone = formPhone,
    localStorage.fortune_userEmail = formEmail

    // Отображаем блок с сообщением что пользователь зарегистрировался 
    showRegistrationDone()
    $("body").removeClass("phone-no-scroll") // Убираем отключение прокрутки
})


// Отобразить блок об успешной регистрации
function showRegistrationDone() {
    $("#open-phone-registration").remove() // Удаляем мобильную кнопку "Зарегистрироваться"
    $(".registration__form-wrapper").remove() // Удаляем мобильное окно регистрации
    $(".registration__done").show() // Показываем блок об успешной регистрации
    $(".wheel-spin-overlap").remove() // Удаляем перекрытие кнопки "Крутить"
    $("#wheel-spin").removeAttr("disabled") // Разблокируем кнопку вращения колеса
}


// Если в браузере сохранены поля после регистрации, то отображаем что пользователь зарегистрирован
if (localStorage.fortune_userEmail && localStorage.fortune_userPhone) {
    showRegistrationDone()
}



// Телефонная кнопка открытия регистрации
$("#open-phone-registration").on("click tap", () => {
    $(".registration__form-wrapper").show()
    $("body").addClass("phone-no-scroll")
})

// Телефонная кнопка отмены регистрации
$("#close-phone-registration").on("click tap", () => {
    $(".registration__form-wrapper").hide()
    $("body").removeClass("phone-no-scroll")
})