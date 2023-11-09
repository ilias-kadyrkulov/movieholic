import { useState, useEffect } from 'react'
import { useId } from 'react'
import { Formik, Form, Field } from 'formik'
import styles from './SignupForm.module.scss'
import logo from '../../assets/logo-low-resolution.png'
import 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type PropsType = {
    formClicked?: boolean
    closeForm?: () => void
}
type FormType = {
    email: string
    password: string
}

const SignupForm = (props: PropsType) => {
    const [isFormActive, setIsFormActive] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!props.formClicked) {
            setIsFormActive(false)
        }
        if (props.formClicked) {
            setIsFormActive(true)
        }
    }, [props.formClicked])

    const id = useId()

    const handleSubmit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        ).then((userCredential) => {
            console.log(userCredential)
        })
        setSubmitting(false)
        props.closeForm && props.closeForm()
        navigate('/')
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                policy: false
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <>
                    <Form
                        className={`${styles.LaptopDesktop} ${
                            isFormActive ? styles.active : ''
                        }`}
                    >
                        <div className={styles.Logo}>
                            <div>
                                <img className="w-44 h-11" src={logo} />
                                <p className="text-gray-400">
                                    Register to enjoy the features
                                </p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-gray-400 border-2 border-gray-300 rounded-xl px-5 py-3 transition-colors hover:bg-slate-50 hover:text-black"
                                    onClick={props.closeForm}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className={styles.Details}>
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
                                <label htmlFor={`${id}-password`}>
                                    Password
                                </label>
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
                                className="text-gray-400 font-bold bg-white rounded-md w-full py-3 my-3 transition-colors hover:bg-black hover:text-white"
                            >
                                Create account
                            </button>
                        </div>
                        <h3 className="text-center mt-4 text-gray-500">
                            Already have an account?{' '}
                            <span className="text-white">Login</span>
                        </h3>
                    </Form>
                    <Form
                        className={
                            location.pathname != '/mobile-menu/sign-up'
                                ? styles.hidden
                                : `${styles.MobileTablet}`
                        }
                    >
                        <div className={styles.Logo}>
                            <div>
                                <img className="w-44 h-11" src={logo} />
                                <p className="text-gray-400">
                                    Register to enjoy the features
                                </p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-gray-400 border-2 border-gray-300 rounded-xl px-5 py-3 transition-colors hover:bg-slate-50 hover:text-black"
                                    onClick={props.closeForm}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className={styles.Details}>
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
                                <label htmlFor={`${id}-password`}>
                                    Password
                                </label>
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
                                className="text-gray-400 font-bold bg-slate-200 rounded-md w-full py-3 my-3 transition-colors hover:bg-black hover:text-slate-200"
                            >
                                Create account
                            </button>
                        </div>
                        <h3 className="text-center mt-4 text-gray-500 text-sm">
                            Already have an account?{' '}
                            <span className="text-slate-200 font-bold hover:opacity-80">
                                <Link to='/mobile-menu/login'>Login</Link>
                            </span>
                        </h3>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default SignupForm
