import { ADD_NEW_CROP, DELETE_CROP, CREATE_JOURNAL_ENTRY } from "./actions";

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
                seed_spacing: "1.6"
            },
            {
                id: "128",
                name: "Cucumber",
                plant_date: "5/1/2018",
                germination_days: "20",
                harvest_days: "30"
            }
        ],
        journal: [
            {
                id: "125",
                date: "2/1/2018",
                scope: "123",
                text: "Tilled garden"
            },
            {
                id: "126",
                date: "3/1/2018",
                scope: "124",
                text: "Planted tomatoes"
            },
            {
                id: "127",
                date: "3/11/2018",
                scope: "124",
                text: "Tomatoes germinated"
            },
            {
                id: "145",
                date: "3/11/2017",
                scope: "124",
                text: "Tomatoes germinated"
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
    }
    return state;
}