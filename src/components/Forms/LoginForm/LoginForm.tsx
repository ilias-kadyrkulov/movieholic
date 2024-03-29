import { useState, useEffect, useId } from 'react'
import { Field, Form, Formik } from 'formik'
import { db } from '@/firebase'
import styles from '../SignupForm/SignupForm.module.scss'
import logo from '@/assets/logo-low-resolution.png'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useActions } from '@/hooks/useActions'
import { useAppSelector } from '@/hooks/hooks'

type PropsType = {
  formClicked?: boolean
  closeForm?: () => void
  openSignupForm?: () => void
  requestTokenURI?: string | null
}
type FormType = {
  username: string
  password: string
}
type FirestoreSnapshot = {
  username?: string
  password?: string
  sessionId?: string
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

const LoginForm = (props: PropsType) => {
  const [isFormActive, setIsFormActive] = useState(false)
  const [authValidText, setAuthValidText] = useState('')

  const requestToken = useAppSelector((state) => state.tmdbSession.requestToken)

  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search)
  const requestTokenURI = urlParams.get('request_token')

  const { sessionBeenStored } = useActions()

  const sessionIdsCollection = collection(db, 'sessionIds')

  const id = useId()

  const handleUsernameWithSession = async (username: string, password: string) => {
    const q = query(
      sessionIdsCollection,
      where('username', '==', username),
      where('password', '==', password),
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return []
    } else {
      return querySnapshot.docs.map((doc) => doc.data())
    }
  }

  useEffect(() => {
    if (!props.formClicked) {
      setIsFormActive(false)
    }
    if (props.formClicked) {
      setIsFormActive(true)
    }
  }, [props.formClicked])

  const handleSubmit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const result = handleUsernameWithSession(values.username, values.password)
    console.log(result)
    result
      .then((response) => {
        if (response.length === 0) {
          setAuthValidText('Invalid username and/or password.')
          setSubmitting(false)
        } else {
          console.log(response)

          const userData: FirestoreSnapshot = response[0]
          const sessionId = userData.sessionId

          sessionBeenStored({ session_id: sessionId })

          setSubmitting(false)
          props.closeForm && props.closeForm()
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error)
        setSubmitting(false)
      })
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        policy: false,
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <>
          {isFormActive && <div className={styles.Overlay} onClick={props.closeForm}></div>}
          <Form className={`${styles.LaptopDesktop} ${isFormActive ? styles.active : ''}`}>
            <div className={styles.Logo}>
              <div>
                <img className="w-44 h-11" src={logo} />
                <p className="text-gray-400">Log into your account</p>
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
                <label htmlFor={`${id}-username`}>Username</label>
                <Field
                  type="username"
                  placeholder="Username..."
                  name="username"
                  id={`${id}-username`}
                  validate={validateUsername}
                />
                {errors.username && touched.username && (
                  <div className="text-red-600 font-semibold mt-3">{errors.username}</div>
                )}
              </div>
              <div>
                <label htmlFor={`${id}-password`}>Password</label>
                <Field
                  type="password"
                  placeholder="Password..."
                  name="password"
                  id={`${id}-password`}
                  validate={validatePassword}
                />
                {errors.password && touched.password && (
                  <div className="text-red-600 font-semibold mt-3">{errors.password}</div>
                )}
                {authValidText && <p className="text-red-600 font-semibold">{authValidText}</p>}
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
                className="text-gray-400 font-semibold bg-white rounded-md w-full py-3 my-3 transition-colors hover:bg-black hover:text-slate-200"
              >
                Login
              </button>
            </div>
            <h3 className="text-center mt-4 text-gray-500 text-sm">
              Don't have an account?{' '}
              {!requestTokenURI ? (
                <a
                  href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://movieholic-ik.netlify.app`}
                  className="font-semibold text-sm text-gray-200"
                >
                  Sign up
                </a>
              ) : (
                <span
                  className="text-slate-200 font-semibold hover:opacity-80 cursor-pointer"
                  onClick={() => {
                    props.openSignupForm && props.openSignupForm()
                  }}
                >
                  Sign up
                </span>
              )}
            </h3>
          </Form>
          <Form
            className={
              location.pathname != '/mobile-menu/login' ? styles.hidden : `${styles.MobileTablet}`
            }
          >
            <div className={styles.Details}>
              <div>
                <label htmlFor={`${id}-username`}>Username</label>
                <Field
                  type="username"
                  placeholder="Username..."
                  name="username"
                  id={`${id}-username`}
                  validate={validateUsername}
                />
                {errors.username && touched.username && (
                  <div className="text-red-600 font-semibold mt-3">{errors.username}</div>
                )}
              </div>
              <div>
                <label htmlFor={`${id}-password`}>Password</label>
                <Field
                  type="password"
                  placeholder="Password..."
                  name="password"
                  id={`${id}-password`}
                  validate={validatePassword}
                />
                {errors.password && touched.password && (
                  <div className="text-red-600 font-semibold mt-3">{errors.password}</div>
                )}
                {authValidText && (
                  <p className="text-red-600 font-semibold mt-3">{authValidText}</p>
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
                className="text-gray-400 font-semibold bg-slate-200 rounded-md w-full py-3 my-3 transition-colors hover:bg-black hover:text-slate-200"
              >
                Login
              </button>
            </div>
            <h3 className="text-center mt-4 text-gray-500 text-sm">
              Don't have an account?{' '}
              <span className="text-slate-200 font-semibold hover:opacity-80">
                {!requestTokenURI ? (
                  <a
                    href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://movieholic-ik.netlify.app/mobile-menu/sign-up`}
                    className="font-semibold text-sm"
                  >
                    Sign up
                  </a>
                ) : (
                  <Link
                    to={`/mobile-menu/sign-up?request_token=${requestToken}`}
                    className="font-semibold text-sm"
                  >
                    Sign up
                  </Link>
                )}
              </span>
            </h3>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default LoginForm
