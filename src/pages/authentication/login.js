import styles from './login.module.scss';
import { CustomCard } from '../../components/card/card';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export function Login({ }) {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const { login, loading } = useAuth();
    const showPassword = () => {
        setPasswordVisible()
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email Address').required("Required"),
            password: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            await login(values)
        },
    })

    return (

        <div className={styles.body}>
            <div>
                <CustomCard>
                    <p className={styles.header}>Login</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.inputContainer}>
                            <label htmlFor='email'>Email</label>
                            <input
                                className={styles.customInput}
                                id="email"
                                type="text"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className={styles.errors}>{formik.errors.email}</div>) : null}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor='password'>Password</label>
                            <input
                                className={styles.customInput}
                                id="password"
                                type={isPasswordVisible ? "text" : "password"}
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className={styles.errors}>{formik.errors.password}</div>) : null}
                            <p className={styles.showPassword} onClick={() => setPasswordVisible(!isPasswordVisible)}>Show Password</p>
                        </div>
                        <div className={styles.inputContainer}>
                            <button className={styles.loginButton} type="submit">
                            Submit
                            {loading && <FontAwesomeIcon className={styles.spinIcon} icon={faSpinner} spin />}
                            </button>
                        </div>
                    </form>
                </CustomCard>
            </div>
        </div>
    )
}