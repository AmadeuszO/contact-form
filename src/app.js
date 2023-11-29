const nameError = document.querySelector('#form__name__error')
const emailError = document.querySelector('#form__email__error')
const messageError = document.querySelector('#form__message__error')
const submitError = document.querySelector('#form__submit__error')

// Name Validation
function validateName() {
    const name = document.querySelector('#form__name__input').value

    if (name.length === 0) {
        nameError.innerHTML = 'Give me your first and last name'
        return false
    }

    if (!name.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+\s[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)) {
        nameError.innerHTML = 'Enter your full name'
        return false
    }

    // if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    //     nameError.innerHTML = 'Podaj cała imię'
    //     return false
    // }

    nameError.innerHTML = `<i class="fa-solid fa-check"></i>`
    return true
}

// Email Validation
function validateEmail() {
    const email = document.querySelector('#form__email__input').value;

    if (email.length === 0) {
        emailError.innerHTML = '<i class="bi bi-check-lg"></i>'
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = 'Zły email'
        return false
    }
    emailError.innerHTML = `<i class="fa-solid fa-check"></i>`
    return true
}
