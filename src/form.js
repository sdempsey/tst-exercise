import React, { useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import SuccessIcon from './success.svg';

const { persistAtom } = recoilPersist();

const valuesState = atom({
    key: 'values',
    default: {
        username: '',
        password: '',
        confirm: ''
    },
    effects_UNSTABLE: [persistAtom]
});

export const Form = () => {
    const [values, setValues] = useRecoilState(valuesState);
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        confirm: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        if (!errors.username && !errors.password && !errors.confirm) {
            setSubmitted(true);
        }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;

        setValues(previous => ({
            ...previous,
            [name]: value
        }));
        validate(event);
    };

    const validate = event => {
        const { name, value } = event.target;
        setErrors(previous => {
            const obj = { ...previous, [name]: '' };

            switch (name) {
                case 'username':
                    if (!value) {
                        obj[name] = 'Username must not be blank.';
                    }
                    break;
                case 'password':
                    if (!value) {
                        obj[name] = 'Password must not be blank.';
                    } else if (values.confirm && value !== values.confirm) {
                        obj.confirm = 'Password and Confirm password do not match.';
                    } else {
                        obj['confirm'] = values.confirm ? '' : errors.confirm;
                    }
                    break;
                case 'confirm':
                    if (!value) {
                        obj[name] = 'Confirm password must not be blank.';
                    } else if (values.password && value !== values.password) {
                        obj[name] = 'Password and Confirm password do not match.';
                    }
                    break;
                default:
                    break;
            }
            return obj;
        });
    };

    return (
        <>
            {submitted ? <h1 className="animate__animated animate__fadeInUp">Success</h1> : <h1>Create an account</h1>}
            <form className="form" onSubmit={handleSubmit}>
                {submitted ? (
                    <div className="success animate__animated animate__fadeInUp">
                        <div class="success__header">
                            <img src={SuccessIcon} className="success__icon" width="80" height="80" />
                        </div>
                        <div className="success__body">
                            <p>Welcome, {values.username}!</p>
                            <p>Your registration was a success.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="form__field">
                            <label htmlFor="username">Username</label>
                            <input
                                className={errors.username ? 'field-error' : null}
                                type="text"
                                id="username"
                                name="username"
                                value={values.username}
                                onChange={handleInputChange}
                                onBlur={validate}
                            />
                            {errors.username && <p className="error">{errors.username}</p>}
                        </div>
                        <div className="form__field">
                            <label htmlFor="password">Password</label>
                            <input
                                className={errors.password ? 'field-error' : null}
                                type="password"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                onBlur={validate}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </div>
                        <div className="form__field">
                            <label htmlFor="confirm">Confirm password</label>
                            <input
                                className={errors.confirm ? 'field-error' : null}
                                type="password"
                                id="confirm"
                                name="confirm"
                                value={values.confirm}
                                onChange={handleInputChange}
                                onBlur={validate}
                            />
                            {errors.confirm && <p className="error">{errors.confirm}</p>}
                        </div>
                        <div className="form__footer">
                            <input type="submit" value="Submit" className="form__submit" />
                        </div>
                    </>
                )}
            </form>
        </>
    );
};
