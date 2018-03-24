import {
    ADD_NEW_CROP,
    DELETE_CROP,
    EDIT_CROP,
    CANCEL_EDIT_CROP,
    SAVE_CROP,
    CREATE_JOURNAL_ENTRY,
    DELETE_JOURNAL_ENTRY,
    EDIT_JOURNAL_ENTRY,
    SAVE_JOURNAL_ENTRY,
    CANCEL_EDIT_JOURNAL_ENTRY,
    SWITCH_TO_REGISTER_MODE,
    SWITCH_TO_LOGIN_MODE,
    SET_AUTH_TOKEN,
    LOGOUT,
    LOAD_USER_DATA
} from "./actions";

const initialState = {
    authToken: null,
    loginRegType: "login",
    requestedUserFromServer: false,
    garden: {
        crops: []
        },
    journal: []
}

export const gardenReducer = (state=initialState, action) => {
    if (action.type === ADD_NEW_CROP) {
        const crop = Object.assign({}, action.values, { id: Math.floor(Math.random() * 1000).toString(), status: "viewing" });
        
        return Object.assign({}, state, { 
            garden: {
                crops: [ ...state.garden.crops, crop ]
            }
        });
    } else if (action.type === DELETE_CROP) {
        const crops = state.garden.crops.filter(item => item.id !== action.cropId);

        return Object.assign({}, state, { 
            garden: { 
                crops
            }
        });
    } else if (action.type === EDIT_CROP) {
        const crops = state.garden.crops.map(item => {
            item.status = item.id === action.cropId ? "editing" : "viewing"
            return item;
        });
        
        return Object.assign({}, state, {
            garden: {
                crops
            }
        });
    } else if (action.type === CANCEL_EDIT_CROP) {
        const crops = state.garden.crops.map(item => {
            item.status = "viewing";
            return item;
        });
        
        return Object.assign({}, state, {
            garden: {
                crops
            }
        });
    } else if (action.type === SAVE_CROP) {
        const crop = state.garden.crops.find(item => item.id === action.values.id);
        const newCrop = Object.assign({}, crop, action.values);
        const crops = state.garden.crops.filter(item => item.id !== action.values.id);

        return Object.assign({}, state, {
            garden: {
                crops: [...crops, newCrop],
            }
        });
    } else if (action.type === CREATE_JOURNAL_ENTRY) {
        const newJournalEntry = Object.assign({}, action.values, { id: Math.floor(Math.random() * 1000).toString() })

        return Object.assign({}, state, { 
            journal: [ ...state.journal, newJournalEntry ]
        });
    } else if (action.type === DELETE_JOURNAL_ENTRY) {
        const journal = state.journal.filter(item => item.id !== action.id);

        return Object.assign({}, state, {
                journal
        });
    } else if (action.type === EDIT_JOURNAL_ENTRY) {
        const journal = state.journal.map(item => 
            item.id === action.id ?
                { id: item.id, date: item.date, scope: item.scope, text: item.text, status: "editing" } :
                { id: item.id, date: item.date, scope: item.scope, text: item.text, status: "viewing" }
        );

        return Object.assign({}, state, {
            journal
        });
    } else if (action.type === SAVE_JOURNAL_ENTRY) {
        const entry = state.journal.find(item => item.id === action.values.id);
        const newEntry = Object.assign({}, entry, action.values);
        const journal = state.journal.filter(item => item.id !== action.values.id);

        return Object.assign({}, state, {
                journal: [...journal, newEntry]
        });
    } else if (action.type === CANCEL_EDIT_JOURNAL_ENTRY) {
        const journal = state.journal.map(item => ({
            id: item.id,
            date: item.date,
            scope: item.scope,
            text: item.text,
            status: "viewing"})
        );
        
        return Object.assign({}, state, {
                journal
        });
    } else if (action.type === SWITCH_TO_REGISTER_MODE) {
        return Object.assign({}, state, { loginRegType: "register" });
    } else if (action.type === SWITCH_TO_LOGIN_MODE) {
        return Object.assign({}, state, { loginRegType: "login" });
    } else if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, { authToken: action.authToken });
    } else if (action.type === LOGOUT) {
        return Object.assign({}, state, { authToken: null });
    } else if (action.type === LOAD_USER_DATA) {
        return Object.assign({}, state, action.data, { requestedUserFromServer: true });
    }
    return state;
}