import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPassord } from '../services/actions/forgot-password'
import { useHistory, Redirect } from 'react-router-dom'
import { getCookie, emailRegExp } from '../utils'

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorEmailText, setErrorEmailText] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuth = getCookie('accessToken')

    const changeEmail = e => {
        setEmail(e.target.value)
    }

    const submit = e => {
        e.preventDefault()
        setErrorEmail(false)
        const isValid = validateEmail()
        if (isValid) {
            dispatch(resetPassord(email))
            .then(() => history.replace({ pathname: '/reset-password' }))
        }
    }

    const validateEmail = () => {
        const validEmail = emailRegExp.test(String(email).toLowerCase())
        const isValid = Boolean(email.length && validEmail)
        if (email.length && !validEmail) setErrorEmailText('Не валидный email')
        if (!email.length) setErrorEmailText('Это поле не должно быть пустым')
        isValid ? setErrorEmail(false) : setErrorEmail(true)
        return isValid
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
        <form className="form" onSubmit={submit}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <div className="mb-6">
                <Input 
                    onChange={changeEmail} 
                    value={email} 
                    name={'email'}
                    error={errorEmail}
                    errorText={errorEmailText}
                    placeholder={'Укажите email'}/>
            </div>           
            <p className="mb-20">
                <Button type='primary' size='medium' onClick={submit}>Восстановить</Button>
            </p>            
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
        </form>
    )
}