export const ADD_NEW_CROP = "ADD_NEW_CROP";
export const addNewCrop = values => ({
    type: ADD_NEW_CROP,
    values
});

export const DELETE_CROP = "DELETE_CROP";
export const deleteCrop = cropId => ({
    type: DELETE_CROP,
    cropId
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

export const CANCEL_EDIT_JOURNAL_ENTRY = "CANCEL_EDIT_JOURNAL_ENTRY";
export const cancelEditJournalEntry = () => ({
    type: CANCEL_EDIT_JOURNAL_ENTRY,
});