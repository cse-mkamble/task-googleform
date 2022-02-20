import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import valid from '../../utils/valid'
import validator from 'validator';

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('login', data)
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

        localStorage.setItem("firstLogin", true)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}


export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        try {
            const res = await postDataAPI('refresh_token')
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })

            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const registerSendMail = (data) => async (dispatch) => {
    const check = valid(data);
    if (check.errLength > 0) {
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg })
    }
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('registersendmail', data)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
}

export const register = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI('register', data);
        dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } });
        localStorage.setItem("firstLogin", true);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const forgotPassOTPSendMail = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI('forgotsendmail', data);
        dispatch({ type: GLOBALTYPES.FSPASS, payload: { success: true } });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({ type: GLOBALTYPES.FSPASS, payload: { success: false } });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const forgotPassOTPVerify = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI('forgototpverify', data);
        dispatch({ type: GLOBALTYPES.FVPASS, payload: { otpVeriySuccess: true } });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({ type: GLOBALTYPES.FVPASS, payload: { otpVeriySuccess: false } });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const resetPassword = (data) => async (dispatch) => {
    const { newPassword, new_cf_password } = data;
    const errMsg = {};

    if (!newPassword) {
        errMsg.newPassword = "Please add your password."
    } else if (!validator.isStrongPassword(newPassword, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        errMsg.newPassword = "Please choose a stronger password. Try a mix of letters, numbers and symbols."
    }

    if (!new_cf_password) {
        errMsg.new_cf_password = "Please enter confirm password."
    }

    if (newPassword !== new_cf_password) {
        errMsg.new_cf_password = "Confirm password did not match."
    }

    const errLength = Object.keys(errMsg).length;

    if (errLength > 0) {
        return dispatch({ type: GLOBALTYPES.ALERT, payload: errMsg })
    }

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI('reset', data);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
        window.location.href = "/"
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
    }
}

export const activationEmail = (activation_token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('activation', { activation_token })
        dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } })
        localStorage.setItem("firstLogin", true)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}