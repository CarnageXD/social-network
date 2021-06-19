import s from './Login.module.css'
import { validateForm } from './validateForm'
import { useForm } from 'react-hook-form'
import { login } from '../../redux/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const LoginForm = () => {
    const { register, handleSubmit, errors, reset } = useForm()
    const dispatch = useDispatch()
    const captchaUrl = useSelector(state => state.auth.captchaUrl)
    const isAuth = useSelector(state => state.auth.isAuth)
    const authorizationError = useSelector(state => state.auth.authorizationError)

    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    const onSubmit = (data) => {
        reset()
        dispatch(login(data.email, data.password, data.rememberMe, data.captcha))
    }
    return (
        <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.itemForm}>
                <label htmlFor="email">Email: </label>
                <input type="text" className={s.itemField} placeholder="Email" id="email"
                    ref={register(validateForm.email)} name='email' />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className={s.itemForm}>
                <label htmlFor="password">Password: </label>
                <input type="password" className={s.itemField} placeholder="Password" id="password" name='password'
                    ref={register(validateForm.password)} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className={s.itemForm}>
                <label htmlFor="rememberMe">Remember me </label>
                <input type="checkbox" id="rememberMe" ref={register} name='rememberMe' />
            </div>
            {captchaUrl ?
                <div className={s.itemForm}>
                    <img src={captchaUrl} alt='captcha'></img>
                    <input ref={register} id="captcha" name="captcha" className={s.captchaInput}></input>
                </div>
                : null}
            <div className={s.itemForm}>
                <input type="submit" value='Submit' />
            </div>
            {authorizationError === null ? null : <p>Invalid email or password</p>}
        </form>
    )
}

const Login = (props) => {

    return (
        <div className={s.loginWrapper}>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login