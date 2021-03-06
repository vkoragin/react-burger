import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react'
import styles from './profile.module.css'
import { getUser, updateUser } from '../../services/actions/profile'
import { useDispatch, useSelector } from '../../services/hooks'
import { minPasswordLength, emailRegExp } from '../../utils'
import type { ReduxStore } from '../../services/store.types'
import type { TUser } from '../../types'

export function Profile() {
    const { user } = useSelector((store: ReduxStore) => store.user)
    const [defEmail, setDefEmail] = useState('')
    const [defName, setDefName] = useState('')
    const defPassword = ''
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorEmailText, setErrorEmailText] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setPasswordError] = useState(false)
    const [errorPasswordText, setPasswordText] = useState('')
    const [name, setName] = useState('')
    const [errorName, setNameError] = useState(false)
    const errorNameText = 'Это поле не должно быть пустым'
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setUserData(user)
        }
      }, [user])

    const setUserData = (user: TUser) => {       
        setDefEmail(user.email)
        setDefName(user.name)
        setEmail(user.email)
        setName(user.name)
        setPassword(defPassword)
    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const save = (e: any) => {
        e.preventDefault()
        clearErrors()
        const isValid = validate()
        if (isValid) {
            const data = {
                email: email,
                name: name,
                password: password
            }
            dispatch(updateUser(data))
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

    const cancel = (e: any) => {
        e.preventDefault()
        clearErrors()
        setPassword(defPassword)
        setEmail(defEmail)
        setName(defName)
    }

    const resetPassword = () => {
        if (password !== defPassword)
            setPassword(defPassword)
    }

    const resetEmail = () => {
        if (email !== defEmail)
            setEmail(defEmail)
    }

    const resetName = () => {
        if (name !== defName)
            setName(defName)
    }

    const isDef = () => {
        return password === defPassword && email === defEmail && name === defName
    }

    return (
        user &&
            <section>
                <form className={styles.profileForm + ' form'} onSubmit={save}>
                    <div className="mb-6">
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={changeName}
                            value={name}
                            name={'name'}
                            icon={name !== defName ? 'CloseIcon' : 'EditIcon'}
                            error={errorName}
                            onIconClick={resetName}
                            errorText={errorNameText}/>
                    </div>
                    <div className="mb-6">
                        <Input 
                            onChange={changeEmail} 
                            value={email} 
                            name={'email'}
                            icon={email !== defEmail ? 'CloseIcon' : 'EditIcon'}
                            error={errorEmail}
                            errorText={errorEmailText}
                            onIconClick={resetEmail}
                            placeholder={'Логин'}/>
                    </div>
                    <div className="mb-6">
                        <Input 
                            onChange={changePassword}
                            type={'password'} 
                            value={password} 
                            name={'password'}
                            icon={password !== defPassword ? 'CloseIcon' : 'EditIcon'}
                            error={errorPassword}
                            errorText={errorPasswordText}
                            onIconClick={resetPassword}
                            placeholder={'Пароль'}/>
                    </div>
                    {
                        !isDef() && 
                        <p className="mb-20">
                        <a href="/#" className="text text_type_main-default mr-7" onClick={cancel}>Отмена</a>
                        <Button type='primary' size='medium'>Сохранить</Button>
                    </p> 
                    }        
                </form>
            </section>
    )
}