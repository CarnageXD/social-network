import s from './Login.module.css'
import { validateForm } from './validateForm'
import { useForm } from 'react-hook-form'
import { login } from '../../redux/auth-reducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

const mapStateToProps = (state) => {
    return ({
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
        authorizationError: state.auth.authorizationError,
    })
}

const LoginForm = connect(mapStateToProps, { login })((props) => {
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    const { register, handleSubmit, errors, reset } = useForm()

    const onSubmit = (data) => {
        reset()
        props.login(data.email, data.password, data.rememberMe, data.captcha)
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
            {props.captchaUrl ?
                <div className={s.itemForm}>
                    <img src={props.captchaUrl}></img>
                    <input ref={register} id="captcha" name="captcha" className={s.captchaInput}></input>
                </div>
                : null}
            <div className={s.itemForm}>
                <input type="submit" value='Submit' />
            </div>
            {props.authorizationError === null ? null : <p>Invalid email or password</p>}
        </form>
    )
}
)

const Login = (props) => {
    return (
        <div className={s.loginWrapper}>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login