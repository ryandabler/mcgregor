import { API_BASE_URL } from "./config";
import { normalizeResponseErrors } from "./utilities";

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
export const cancelEditCrop = cropId => ({
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
        .then(authToken => {
            dispatch(setAuthToken(authToken.authToken));
        })
        .catch(err => {
            console.log(err);
        })
    );
}