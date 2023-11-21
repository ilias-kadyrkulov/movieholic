import React, { useCallback, useEffect, useId, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import styles from './SignupForm.module.scss'
import logo from '../../../assets/logo-low-resolution.png'
import 'firebase/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCreateRequestTokenQuery, useCreateSessionMutation, useLazyGetAccountDetailsQuery, useValidateTokenWithLoginMutation } from '../../../api/tmdbV3/auth.api'
import { useActions } from '../../../hooks/useActions'
import { useAppSelector } from '../../../hooks/hooks'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'

type PropsType = {
    formClicked?: boolean
    closeForm?: () => void
    openLoginForm?: () => void
    requestTokenURI?: string | null
}
type FormType = {
    username: string
    password: string
}

type ErrorDataType = {
    status_message: string
}
type ErrorType = {
    data: ErrorDataType
}

const validateUsername = (value: string) => {
    if (!value) {
        return 'Required.'
    }
}
const validatePassword = (value: string) => {
    if (!value) {
        return 'Required.'
    }
}

const SignupForm = (props: PropsType) => {
    const [validateSessionWithLogin] = useValidateTokenWithLoginMutation()
    const [getAccountDetails] = useLazyGetAccountDetailsQuery()
    const [createSession] = useCreateSessionMutation()
    

    const urlParams = new URLSearchParams(window.location.search)
    const requestTokenURI = urlParams.get('request_token')

    const [isFormActive, setIsFormActive] = useState(false)
    const [authValidText, setAuthValidText] = useState('')
    const [user, setUser] = useState<FormType>({ username: '', password: '' })

    const location = useLocation()
    const navigate = useNavigate()

    const id = useId()

    const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)
    const shouldRunFunction = useAppSelector(
        (state) => state.functionOptimization.shouldRunFunction
    )
    const validatedRequestToken = useAppSelector(
        (state) => state.tmdbSession.validatedToken
    )

    const {
        requestTokenValidatedWithLogin,
        sessionBeenStored,
        userLoggedIn,
        functionShouldRun,
        functionShouldNotRun
    } = useActions()

    const sessionIdsCollectionRef = collection(db, 'sessionIds')

    const handleTokenValidation = async (
        username: string,
        password: string
    ) => {
        const result = await validateSessionWithLogin({
            username,
            password,
            request_token: requestTokenURI
        }).unwrap()

        return result
    }

    const handleSessionIdStoredInFirestore = useCallback(async () => {
        await addDoc(sessionIdsCollectionRef, {
            username: user.username,
            password: user.password,
            sessionId: sessionId
        })
    }, [user, sessionId])

    const handleSessionCreation = async () => {
        const result = await createSession(validatedRequestToken).unwrap()
        sessionBeenStored({ session_id: result.session_id })
        functionShouldRun()
    }

    const handleAccountDetails = async () => {
        const result = await getAccountDetails(sessionId).unwrap()
        userLoggedIn({
            username: result.username,
            avatar: result.avatar.tmdb.avatar_path
        })
    }

    useEffect(() => {
        sessionId && handleAccountDetails()
    }, [sessionId])

    useEffect(() => {
        validatedRequestToken && handleSessionCreation()
    }, [validatedRequestToken])

    useEffect(() => {
        if (shouldRunFunction && sessionId) {
            handleSessionIdStoredInFirestore()
            functionShouldNotRun()
            navigate('/movieholic/')
        }
    }, [sessionId, shouldRunFunction])

    const handleClearFormValues = (resetFunc: () => void) => {
        resetFunc()
        setAuthValidText('')
    }

    useEffect(() => {
        if (!props.formClicked) {
            setIsFormActive(false)
        }
        if (props.formClicked) {
            setIsFormActive(true)
        }
        props.requestTokenURI && setIsFormActive(true)
    }, [props.formClicked, props.requestTokenURI])

    const handleSubmit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const validationResult = handleTokenValidation(
            values.username,
            values.password
        )
        console.log(validationResult)

        validationResult
            .then(async (response) => {
                console.log(response)

                const usernameToCheck = values.username
                const userAlreadyExistsQuery = query(
                    sessionIdsCollectionRef,
                    where('username', '==', usernameToCheck)
                )

                const querySnapshot = await getDocs(userAlreadyExistsQuery)
                const userExists = querySnapshot.docs.length > 0

                if (userExists) {
                    setAuthValidText('Another user with such username already exists.')
                    setSubmitting(false)
                } else {
                    setUser({
                        username: values.username,
                        password: values.password
                    })

                    requestTokenValidatedWithLogin({
                        request_token: response.request_token
                    })

                    setSubmitting(false)
                    props.closeForm && props.closeForm()
                }
            })
            .catch((error: ErrorType) => {
                console.log(error)
                setAuthValidText(error.data.status_message)
                setSubmitting(false)
            })
    }

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                policy: false
            }}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ isSubmitting, errors, touched, handleReset }) => (
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
                                    Please, re-enter your credentials.
                                </p>
                            </div>
                            <div>
                                {requestTokenURI ? (
                                    <></>
                                ) : (
                                    <button
                                        type="button"
                                        className="text-gray-400 border-2 border-gray-300 rounded-xl px-5 py-3 transition-colors hover:bg-slate-50 hover:text-black"
                                        onClick={() => {
                                            handleClearFormValues(handleReset)
                                            props.closeForm && props.closeForm()
                                        }}
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className={styles.Details}>
                            <div>
                                <label htmlFor={`${id}-username`}>
                                    Username
                                </label>
                                <Field
                                    type="username"
                                    placeholder="Username..."
                                    name="username"
                                    id={`${id}-email`}
                                    validate={validateUsername}
                                />
                                {errors.username && touched.username && (
                                    <p className="text-red-600 font-bold mt-3">
                                        {errors.username}
                                    </p>
                                )}
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
                                    validate={validatePassword}
                                />
                                {errors.password && touched.password && (
                                    <p className="text-red-600 font-bold mt-3">
                                        {errors.password}
                                    </p>
                                )}
                                {authValidText && (
                                    <p className="text-red-600 font-bold mt-3">
                                        {authValidText}
                                    </p>
                                )}
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
                        <h3 className="text-center mt-4 text-gray-500 text-sm">
                            Already have an account?{' '}
                            <span
                                className="text-slate-200 font-bold hover:opacity-80 cursor-pointer"
                                onClick={() => {
                                    handleClearFormValues(handleReset)
                                    props.openLoginForm && props.openLoginForm()
                                }}
                            >
                                Login
                            </span>
                        </h3>
                    </Form>
                    <Form
                        className={
                            location.pathname !=
                            '/movieholic/mobile-menu/sign-up'
                                ? styles.hidden
                                : `${styles.MobileTablet}`
                        }
                    >
                        <div className={styles.Logo}>
                            <div>
                                <img className="w-44 h-11" src={logo} />
                                <p className="text-gray-400">
                                    Please, re-enter your credentials.
                                </p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-gray-400 border-2 border-gray-300 rounded-xl px-5 py-3 transition-colors hover:bg-slate-50 hover:text-black"
                                    onClick={() => {
                                        handleClearFormValues(handleReset)
                                        props.closeForm && props.closeForm()
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className={styles.Details}>
                            <div>
                                <label htmlFor={`${id}-username`}>
                                    Username
                                </label>
                                <Field
                                    type="username"
                                    placeholder="Username..."
                                    name="username"
                                    id={`${id}-username`}
                                    validate={validateUsername}
                                />
                                {errors.username && touched.username && (
                                    <p className="text-red-600 font-bold mt-3">
                                        {errors.username}
                                    </p>
                                )}
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
                                    validate={validatePassword}
                                />
                                {errors.password && touched.password && (
                                    <p className="text-red-600 font-bold mt-3">
                                        {errors.password}
                                    </p>
                                )}
                                {authValidText && (
                                    <p className="text-red-600 font-bold mt-3">
                                        {authValidText}
                                    </p>
                                )}
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
                                <Link to="/movieholic/mobile-menu/login">
                                    Login
                                </Link>
                            </span>
                        </h3>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default SignupForm
