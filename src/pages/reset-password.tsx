import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { resetPassword } from '../services/actions/reset-password'
import { useDispatch } from 'react-redux'
import { minPasswordLength } from '../utils'

export function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState<'password' | 'email' | 'text' | undefined>('password')
    const [errorPassword, setPasswordError] = useState(false)
    const [errorPasswordText, setPasswordText] = useState('')
    const [token, setToken] = useState('')
    const [errorToken, setTokenError] = useState(false)
    const errorTokenText = 'Это поле не должно быть пустым'
    const dispatch = useDispatch()
    const history = useHistory()

    const changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const toggleText = () => {
        passwordType === 'password'
            ? setPasswordType('text')
            : setPasswordType('password')
    }    

    const submit = (e: any) => {
        e.preventDefault()
        clearErrors()
        const isValid = validate()
        if (isValid) {
            const data = {
                password: password,
                token: token
            }
            dispatch(resetPassword(data) as any)
            .then(() => history.replace({ pathname: '/login' }))
        }        
    }

    const clearErrors = () => {
        setPasswordError(false)
        setTokenError(false)
    }

    const validate = () => {
        const isPasswordValid = validatePassword()
        const isTokenValid = validateToken()
        return isPasswordValid && isTokenValid
    }

    const validatePassword = () => {
        const isValid = Boolean(password.length && password.length >= minPasswordLength)
        if (password.length && password.length < minPasswordLength) setPasswordText('Пароль должен быть не менее шести символов')
        if (!password.length) setPasswordText('Это поле не должно быть пустым')
        isValid ? setPasswordError(false) : setPasswordError(true)
        return isValid
    }

    const validateToken = () => {
        const isValid = Boolean(token.length)
        isValid ? setTokenError(false) : setTokenError(true)
        return isValid
    }

    return (
        <form className="form" onSubmit={submit}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
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
            <div className="mb-6">
                <Input
                    onChange={changeCode} 
                    type="text" 
                    value={token} 
                    name={'token'}
                    error={errorToken}
                    errorText={errorTokenText}
                    placeholder={'Ведите код из письма'}/>  
            </div>           
            <p className="mb-20">
                <Button type='primary' size='medium'>Сохранить</Button>
            </p>            
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
        </form>
    )
}