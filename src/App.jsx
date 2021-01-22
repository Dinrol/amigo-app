import React, { useEffect, useState } from 'react'

const App = () => {

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [languageActive, setLanguageActive] = useState('Язык')
  const [loginIsCorrect, setLoginIsCorrect] = useState(false)
  const [emailIsCorrect, setEmailIsCorrect] = useState(false)
  const [phoneIsCorrect, setPhoneIsCorrect] = useState(false)
  const [languageDropdown, setLanguageDropdown] = useState(false)
  const [formIsCorrect, setFormIsCorrect] = useState(false)
  const [checkAcceptTerms, setCheckAcceptTerms] = useState(false)

  const languages = ['Русский', 'Английский', 'Испанский', 'Китайский']


  useEffect(() => {
    if (
      (login && email && phone) !== '' &&
      loginIsCorrect &&
      emailIsCorrect &&
      phoneIsCorrect &&
      checkAcceptTerms &&
      languageActive !== 'Язык'
    ) {
      setFormIsCorrect(true)
    } else {
      setFormIsCorrect(false)
    }
  }, [login, email, phone, loginIsCorrect, emailIsCorrect, phoneIsCorrect, checkAcceptTerms, languageActive])

  const handleLogin = (e) => {
    const inputValue = e.currentTarget.value
    let loginIsCorrect = /^[а-яА-Яa-zA-Z-]+(\s*[а-яА-Яa-zA-Z]\s+)*$/.test(inputValue);
    if (loginIsCorrect && inputValue !== '') {
      setLogin(inputValue)
      setLoginIsCorrect(true)
    } else {
      setLogin(inputValue)
      setLoginIsCorrect(false)
    }
  }

  const handleEmail = (e) => {
    let emailValue = e.currentTarget.value
    if (validateEmail(emailValue) && emailValue !== '') {
      setEmailIsCorrect(true)
      setEmail(emailValue)
    } else {
      setEmail(emailValue)
      setEmailIsCorrect(false)
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handlePhone = (e) => {
    let phoneValue = e.currentTarget.value
    let phoneIsCorrect = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(phoneValue);
    if (phoneIsCorrect && phoneValue !== '') {
      setPhone(phoneValue)
      setPhoneIsCorrect(true)
    } else {
      setPhone(phoneValue)
      setPhoneIsCorrect(false)
    }
  }

  const handleLanguage = (e) => {
    let langValue = e.currentTarget.innerHTML
    setLanguageActive(langValue)
    setLanguageDropdown(false)
  }

  const handleDropDownLanguage = () => {
    setLanguageDropdown(!languageDropdown)
  }

  const handleAcceptTerms = (e) => {
    setCheckAcceptTerms(e.currentTarget.checked)
  }

  return (
    <div className="wrapper">
      <form className='form'>
        <div className="sign-up">
          <div className="sign-up__title">Регистрация</div>
          <div className="sign-up__sign-in">
            Уже есть аккаунт?
            <a href="#"> Войти</a>
          </div>
          <div className="sign-up__login">
            <div className="sign-up__label">Имя</div>
            <div className="sign-up__input">
              <input
                type="text"
                placeholder="Введите Ваше имя"
                onChange={handleLogin}
              />
              <div
                style={!loginIsCorrect && login !== '' ? { display: 'block' } : null}
                className="error-login">Поле "Имя" не должно содержать цифры и символы
              </div>
            </div>
          </div>
          <div className="sign-up__email">
            <div className="sign-up__label">Email</div>
            <div className="sign-up__input">
              <input
                type="email"
                placeholder="Введите ваш email"
                onBlur={handleEmail}
              />
              <div
                style={!emailIsCorrect && email !== '' ? { display: 'block' } : null}
                className="error-email">Введено не корректное значение
              </div>
            </div>
          </div>
          <div className="sign-up__phone">
            <div className="sign-up__label">Номер телефона</div>
            <div className="sign-up__input">
              <input
                type="tel"
                placeholder="Введите номер телефона"
                required
                onChange={handlePhone}
                maxlength="16"
              />
              <div
                style={!phoneIsCorrect && phone !== '' ? { display: 'block' } : null}
                className="error-phone">Пример  ввода +7(912)123-45-67
              </div>
            </div>
          </div>
          <div className="sign-up__language">
            <div className="sign-up__label">Язык</div>
            <div
              style={languageActive !== 'Язык' ? { color: "#000" } : null}
              onClick={handleDropDownLanguage}
              className='sign-up__dropdown-language'>
              {languageActive}
              <div style={languageDropdown ? { display: 'block' } : null}
                className="sign-up__dropdown-language-content">
                {languages.map(lang => (
                  <span onClick={handleLanguage}>{lang}</span>
                ))
                }
              </div>
            </div>
          </div>
          <label
            className="sign-up__check-accept-terms">
            Принимаю <a href="#">условия</a> использования
            <input type="checkbox" onChange={handleAcceptTerms} />
            <span class="checkmark"></span>
          </label>
          <div
            className={`sign-up__btn-sign-up ${formIsCorrect ? '' : 'sign-up__btn-sign-up_disabled'}`}>
            Зарегистрироваться
          </div>
        </div>
      </form >
    </div >
  )
}

export default App
