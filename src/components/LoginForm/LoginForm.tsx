import { useState, useEffect, useId } from 'react'
import { Field, Form, Formik } from 'formik'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import styles from '../SignupForm/SignupForm.module.scss'
import logo from '../../assets/logo-low-resolution.png'

type PropsType = {
    formClicked: boolean
    closeForm: () => void
}
type FormType = {
    email: string
    password: string
}

const LoginForm = (props: PropsType) => {
    const [isFormActive, setIsFormActive] = useState(false)

    useEffect(() => {
        if (!props.formClicked) {
            setIsFormActive(false)
        }
        if (props.formClicked) {
            setIsFormActive(true)
        }
    }, [props.formClicked])

    useEffect(() => {
      props.closeForm()
    }, [])

    const id = useId()

    const onsubmit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        signInWithEmailAndPassword(auth, values.email, values.password).then(
            (userCredential) => {
                console.log(userCredential)
            }
        )
        setSubmitting(false)
        props.closeForm()
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                policy: false
            }}
            onSubmit={onsubmit}
        >
            {({ isSubmitting }) => (
                <Form
                    className={`${styles.Form} ${
                        isFormActive ? styles.active : ''
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <img className="w-44 h-11" src={logo} />
                            <p className="text-gray-400">
                                Login to your account
                            </p>
                        </div>
                        <div>
                            <button className="text-gray-400 border-2 border-gray-300 rounded-xl px-5 py-3 transition-colors hover:bg-slate-50 hover:text-black" onClick={props.closeForm}>
                                Close
                            </button>
                        </div>
                    </div>
                    <div className={styles.details}>
                        <div>
                            <label htmlFor={`${id}-email`}>Email</label>
                            <Field
                                type="email"
                                placeholder="Email..."
                                name="email"
                                id={`${id}-email`}
                            />
                        </div>
                        <div>
                            <label htmlFor={`${id}-password`}>Password</label>
                            <Field
                                type="password"
                                placeholder="Password..."
                                name="password"
                                id={`${id}-password`}
                            />
                        </div>
                        {/* <div className={styles.policy}>
                      <Field
                          type="checkbox"
                          name="policy"
                          id={`${id}-policy`}
                      />
                      <label className="pl-2" htmlFor={`${id}-policy`}>
                          I agree to our <span>Privacy Policy</span> and{' '}
                          <span>Terms & Conditions</span>
                      </label>
                  </div> */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="text-gray-400 bg-white rounded-md w-full py-3 my-3 transition-colors hover:bg-slate-800 hover:text-white"
                        >
                            Login
                        </button>
                    </div>
                    <h3 className="text-center mt-4 text-gray-500">
                        Don't have an account?{' '}
                        <span className="text-white">Sign up</span>
                    </h3>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
