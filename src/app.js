const nameError = document.querySelector('#form__name__error')
const emailError = document.querySelector('#form__email__error')
const messageError = document.querySelector('#form__message__error')
const submitError = document.querySelector('#form__submit__error')

function validateName() {
    const name = document.querySelector('#form__name__input').value

    if (name.length === 0) {
        nameError.innerHTML = 'Podaj imię'
        return false
    }

    if (!name.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+\s[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)) {
        nameError.innerHTML = 'Podaj cała imię'
        return false
    }

    // if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    //     nameError.innerHTML = 'Podaj cała imię'
    //     return false
    // }

    nameError.innerHTML = `<i class="fa-solid fa-check"></i>`
    return true
}
