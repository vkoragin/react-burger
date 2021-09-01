import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { registerUser } from '../services/actions/auth'
import { useDispatch } from 'react-redux'
import { getCookie, minPasswordLength, emailRegExp } from '../utils'

export function RegisterPage() {
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorEmailText, setErrorEmailText] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [errorPassword, setPasswordError] = useState(false)
    const [errorPasswordText, setPasswordText] = useState('')
    const [name, setName] = useState('')
    const [errorName, setNameError] = useState(false)
    const errorNameText = 'Это поле не должно быть пустым'
    const history = useHistory()
    const dispatch = useDispatch()
    const isAuth = getCookie('accessToken')

    const changeEmail = e => {
        setEmail(e.target.value)
    }

    const changePassword = e => {
        setPassword(e.target.value)
    }

    const changeName = e => {
        setName(e.target.value)
    }

    const toggleText = () => {
        passwordType === 'password'
            ? setPasswordType('text')
            : setPasswordType('password')
    }

    const register = e => {
        e.preventDefault()
        clearErrors()
        const isValid = validate()
        if (isValid) {
            const data = {
                email: email,
                password: password,
                name: name
            }
            dispatch(registerUser(data))
            .then(() => history.replace({ pathname: '/' }))
        }
    }

    const validate = () => {
        const isPasswordValid = validatePassword()
        const isEmailValid = validateEmail()
        const isNameValid = validateName()
        return isPasswordValid && isEmailValid && isNameValid
    }

    const validatePassword = () => {
        const isValid = Boolean(password.length && password.length >= minPasswordLength)
        if (password.length && password.length < minPasswordLength) setPasswordText('Пароль должен быть не менее ' + minPasswordLength + ' символов')
        if (!password.length) setPasswordText('Это поле не должно быть пустым')
        isValid ? setPasswordError(false) : setPasswordError(true)
        return isValid
    }

    const validateEmail = () => {
        const validEmail = emailRegExp.test(String(email).toLowerCase())
        const isValid = Boolean(email.length && validEmail)
        if (email.length && !validEmail) setErrorEmailText('Не валидный email')
        if (!email.length) setErrorEmailText('Это поле не должно быть пустым')
        isValid ? setErrorEmail(false) : setErrorEmail(true)
        return isValid
    }

    const validateName = () => {
        const isValid = Boolean(name.length)
        isValid ? setNameError(false) : setNameError(true)
        return isValid
    }

    const clearErrors = () => {
        setPasswordError(false)
        setErrorEmail(false)
        setNameError(false)
    }

    if (isAuth) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        )
    }

    return (
        <form className="form" onSubmit={register}>
            <p className="text text_type_main-medium mb-6">Регистрация</p>
            <div className="mb-6">
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={changeName}
                    value={name}
                    name={'name'}
                    error={errorName}
                    errorText={errorNameText}/>
            </div>
            <div className="mb-6">
                <Input 
                    onChange={changeEmail} 
                    value={email} 
                    name={'email'}
                    error={errorEmail}
                    errorText={errorEmailText}
                    placeholder={'Укажите email'}/>
            </div>
            <div className="mb-6">
                <Input 
                    onChange={changePassword}
                    type={passwordType} 
                    value={password} 
                    name={'password'}
                    icon={passwordType === 'password' ? 'ShowIcon' : 'HideIcon'}
                    error={errorPassword}
                    errorText={errorPasswordText}
                    onIconClick={toggleText}
                    placeholder={'Введите новый пароль'}/>
            </div>            
            <p className="mb-20">
                <Button type='primary' size='medium' onClick={register}>Зарегистрироваться</Button>
            </p>            
            <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
        </form>
    )
}