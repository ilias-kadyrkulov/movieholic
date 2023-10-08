import { Formik } from 'formik'

const LoginForm = () => {
    const onsubmit = () => {}

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={onsubmit}
        >
          {() => (
            <form>
              <input type="email" placeholder='Email...' name='email' />
              <input type="password" placeholder='Password...' name='password' />
              <button type="submit">Login</button>
            </form>
          )}
        </Formik>
    )
}

export default LoginForm
