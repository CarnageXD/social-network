import { authAPI } from "./../components/api/api"


const SET_USER_DATA = 'SET_USER_DATA'


let initState = {
    id: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false,
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state, isFetching: action.isFetching, ...action.data, isAuth: true,
            }
        }
        default: return state
    }
}



export const setAuthUserData = (id, login, email) => ({ type: SET_USER_DATA, data: { id, login, email } })

export const getAuthUserData = () => (dispatch) => {
    authAPI.authMe()
        .then(data => {
            let { id, login, email } = data.data
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(id, login, email))
            }
        })
}