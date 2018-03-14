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
    CANCEL_EDIT_JOURNAL_ENTRY
} from "./actions";

const initialState = {
    email: "rdabler@gmail.com",
    garden: {
        id: "123",
        status: "viewing",
        crops: [
            {
                id: "124",
                name: "Tomato",
                variety: "Heirloom",
                plant_date: "3/1/2018",
                germination_days: "10",
                harvest_days: "50",
                planting_depth: "1",
                row_spacing: "1.5",
                seed_spacing: "1.6",
                status: "viewing"
            },
            {
                id: "128",
                name: "Cucumber",
                plant_date: "5/1/2018",
                germination_days: "20",
                harvest_days: "30",
                status: "viewing"
            }
        ],
        journal: [
            {
                id: "125",
                date: "2/1/2018",
                scope: "123",
                text: "Tilled garden",
                status: "viewing"
            },
            {
                id: "126",
                date: "3/1/2018",
                scope: "124",
                text: "Planted tomatoes",
                status: "viewing"
            },
            {
                id: "127",
                date: "3/11/2018",
                scope: "124",
                text: "Tomatoes germinated",
                status: "viewing"
            },
            {
                id: "145",
                date: "3/11/2017",
                scope: "124",
                text: "Tomatoes germinated",
                status: "viewing"
            }
        ]
    }
}

export const gardenReducer = (state=initialState, action) => {
    if (action.type === ADD_NEW_CROP) {
        const crop = Object.assign({}, action.values, { id: Math.floor(Math.random() * 1000) });
        
        return Object.assign({}, state, { 
            garden: { crops: [ ...state.garden.crops, crop ] } } );
    } else if (action.type === DELETE_CROP) {
        const crops = state.garden.crops.filter(item => item.id !== action.cropId);

        return Object.assign({}, state, { 
            garden: { 
                id: state.garden.id,
                status: state.garden.status,
                crops,
                journal: state.garden.journal
            } }
        );
    } else if (action.type === EDIT_CROP) {
        const crops = state.garden.crops.map(item => {
            item.status = item.id === action.cropId ? "editing" : "viewing"
            return item;
        });
        
        return Object.assign({}, state, {
            garden: {
                id: state.garden.id,
                status: state.garden.status,
                crops,
                journal: state.garden.journal
            } }
        );
    } else if (action.type === CANCEL_EDIT_CROP) {
        const crops = state.garden.crops.map(item => {
            item.status = "viewing";
            return item;
        });
        
        return Object.assign({}, state, { 
            garden: { 
                id: state.garden.id,
                status: state.garden.status,
                crops,
                journal: state.garden.journal
            } }
        );
    } else if (action.type === SAVE_CROP) {
        const crop = state.garden.crops.find(item => item.id === action.values.id);
        const newCrop = Object.assign({}, crop, action.values);
        const crops = state.garden.crops.filter(item => item.id !== action.values.id);

        return Object.assign({}, state, {
            garden: {
                id: state.garden.id,
                status: state.garden.status,
                crops: [...crops, newCrop],
                journal: state.garden.journal
            } }
        );
    } else if (action.type === CREATE_JOURNAL_ENTRY) {
        const newJournalEntry = Object.assign({}, action.values, { id: Math.floor(Math.random() * 1000).toString() })
        return Object.assign({}, state, { 
            garden: {
                id: state.garden.id,
                status: state.garden.status,
                crops: state.garden.crops,
                journal: [ ...state.garden.journal, newJournalEntry ]
            } }
        );
    } else if (action.type === DELETE_JOURNAL_ENTRY) {
        const journal = state.garden.journal.filter(item => item.id !== action.id);
        return Object.assign({}, state, {
            garden: {
                id: state.garden.id,
                status: state.garden.status,
                crops: state.garden.crops,
                journal
            } }
        );
    } else if (action.type === EDIT_JOURNAL_ENTRY) {
        const journal = state.garden.journal.map(item => 
            item.id === action.id ?
                { id: item.id, date: item.date, scope: item.scope, text: item.text, status: "editing" } :
                { id: item.id, date: item.date, scope: item.scope, text: item.text, status: "viewing" }
        );

        return Object.assign({}, state, {
            garden: {
                id: state.garden.id,
                status: state.garden.status,
                crops: state.garden.crops,
                journal
            } }
        );
    } else if (action.type === SAVE_JOURNAL_ENTRY) {
        const entry = state.garden.journal.find(item => item.id === action.values.id);
        const newEntry = Object.assign({}, entry, action.values);
        const journal = state.garden.journal.filter(item => item.id !== action.values.id);

        return Object.assign({}, state, {
            garden: {
                id: state.garden.id,
                status: state.garden.status,
                crops: state.garden.crops,
                journal: [...journal, newEntry]
            } }
        );
    } else if (action.type === CANCEL_EDIT_JOURNAL_ENTRY) {
        const journal = state.garden.journal.map(item => ({
            id: item.id,
            date: item.date,
            scope: item.scope,
            text: item.text,
            status: "viewing"})
        );
        
        return Object.assign({}, state, {
            garden: {
                id: state.garden.id,
                status: state.garden.status,
                crops: state.garden.crops,
                journal
            } }
        );
    }
    return state;
}