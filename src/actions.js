import { API_BASE_URL } from "./config";
import { normalizeResponseErrors, addTokenToStorage } from "./utilities";

export const ADD_NEW_CROP = "ADD_NEW_CROP";
export const addNewCrop = values => ({
    type: ADD_NEW_CROP,
    values
});

export const EDIT_CROP = "EDIT_CROP";
export const editCrop = cropId => ({
    type: EDIT_CROP,
    cropId
});

export const DELETE_CROP = "DELETE_CROP";
export const deleteCrop = cropId => ({
    type: DELETE_CROP,
    cropId
});

export const CANCEL_EDIT_CROP = "CANCEL_EDIT_CROP";
export const cancelEditCrop = () => ({
    type: CANCEL_EDIT_CROP
});

export const SAVE_CROP = "SAVE_CROP";
export const saveCrop = values => ({
    type: SAVE_CROP,
    values
});

export const CREATE_JOURNAL_ENTRY = "CREATE_JOURNAL_ENTRY";
export const createJournalEntry = values => ({
    type: CREATE_JOURNAL_ENTRY,
    values
});

export const DELETE_JOURNAL_ENTRY = "DELETE_JOURNAL_ENTRY";
export const deleteJournalEntry = id => ({
    type: DELETE_JOURNAL_ENTRY,
    id
});

export const EDIT_JOURNAL_ENTRY = "EDIT_JOURNAL_ENTRY";
export const editJournalEntry = id => ({
    type: EDIT_JOURNAL_ENTRY,
    id
});

export const SAVE_JOURNAL_ENTRY = "SAVE_JOURNAL_ENTRY";
export const saveJournalEntry = values => ({
    type: SAVE_JOURNAL_ENTRY,
    values
});

export const CANCEL_EDIT_JOURNAL_ENTRY = "CANCEL_EDIT_JOURNAL_ENTRY";
export const cancelEditJournalEntry = () => ({
    type: CANCEL_EDIT_JOURNAL_ENTRY,
});

export const SWITCH_TO_REGISTER_MODE = "SWITCH_TO_REGISTER_MODE";
export const switchToRegisterMode = () => ({
    type: SWITCH_TO_REGISTER_MODE,
});

export const SWITCH_TO_LOGIN_MODE = "SWITCH_TO_LOGIN_MODE";
export const switchToLoginMode = () => ({
    type: SWITCH_TO_LOGIN_MODE,
});

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const setAuthToken = (authToken) => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const login = (username, password) => dispatch => {
    return (
        fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then( ({authToken}) => {
            dispatch(setAuthToken(authToken));
            addTokenToStorage(authToken);
        })
    );
}

export const LOGOUT = "LOGOUT";
export const logout = () => ({
    type: LOGOUT
});

export const LOAD_USER_DATA = "LOAD_USER_DATA";
export const loadUserData = (data) => ({
    type: LOAD_USER_DATA,
    data
});

export const registerUser = (username, password, email) => () => {
    return (
        fetch(`${API_BASE_URL}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
    );
}

export const ADD_ERROR = "ADD_ERROR";
export const addError = (code, message) => ({
    type: ADD_ERROR,
    code,
    message
});

export const DELETE_ERROR = "DELETE_ERROR";
export const deleteError = (id) => ({
    type: DELETE_ERROR,
    id
});

export const SHOW_INFO = "SHOW_INFO";
export const showInfo = () => ({
    type: SHOW_INFO
});

export const HIDE_INFO = "HIDE_INFO";
export const hideInfo = () => ({
    type: HIDE_INFO
});