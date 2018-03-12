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