import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { loginUser } from '../services/actions/auth'
import { useDispatch } from 'react-redux'
import { minPasswordLength, emailRegExp } from '../utils'

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorEmailText, setErrorEmailText] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState<'password' | 'email' | 'text' | undefined>('password')
    const [errorPassword, setPasswordError] = useState(false)
    const [errorPasswordText, setPasswordText] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation<any>()

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const login = (e: any) => {
        e.preventDefault()
        clearErrors()
        const isValid = validate()
        if (isValid) {
            const data = {
                email: email,
                password: password,
            }
            dispatch(loginUser(data) as any)
            .then(() => {    
                const pathName = location?.state?.from?.pathname
                history.replace({ pathname: pathName })
            })
        }
    }

    const clearErrors = () => {
        setPasswordError(false)
        setErrorEmail(false)
    }

    const toggleText = () => {
        passwordType === 'password'
            ? setPasswordType('text')
            : setPasswordType('password')
    }

    const validate = () => {
        const isPasswordValid = validatePassword()
        const isEmailValid = validateEmail()
        return isPasswordValid && isEmailValid
    }

    const validatePassword = () => {
        const isValid = Boolean(password.length && password.length >= minPasswordLength)
        if (password.length && password.length < minPasswordLength) setPasswordText('???????????? ???????????? ???????? ???? ?????????? ' + minPasswordLength + ' ????????????????')
        if (!password.length) setPasswordText('?????? ???????? ???? ???????????? ???????? ????????????')
        isValid ? setPasswordError(false) : setPasswordError(true)
        return isValid
    }

    const validateEmail = () => {
        const validEmail = emailRegExp.test(String(email).toLowerCase())
        const isValid = Boolean(email.length && validEmail)
        if (email.length && !validEmail) setErrorEmailText('???? ???????????????? email')
        if (!email.length) setErrorEmailText('?????? ???????? ???? ???????????? ???????? ????????????')
        isValid ? setErrorEmail(false) : setErrorEmail(true)
        return isValid
    }

    return (
        <form className="form" onSubmit={login}>
            <p className="text text_type_main-medium mb-6">????????</p>
            <div className="mb-6">
            <Input 
                onChange={changeEmail} 
                value={email} 
                name={'email'}
                error={errorEmail}
                errorText={errorEmailText}
                placeholder={'Email'}/>
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
                placeholder={'????????????'}/>
            </div>            
            <p className="mb-20">
                <Button type='primary' size='medium'>??????????</Button>
            </p>            
            <p className="text text_type_main-default text_color_inactive">???? - ?????????? ????????????????????????? <Link to='/register'>????????????????????????????????????</Link></p>
            <p className="text text_type_main-default text_color_inactive">???????????? ????????????? <Link to='/forgot-password'>???????????????????????? ????????????</Link></p>
        </form>
    )
}