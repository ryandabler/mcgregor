import { gardenReducer } from "./reducer";
import * as actions from "./actions";
import { loadTokenFromStorage } from "./utilities";

describe("Reducer", () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            authToken: loadTokenFromStorage(),
            loginRegType: "login",
            requestedUserFromServer: false,
            showInformation: false,
            garden: {
                crops: []
                },
            journal: [],
            errors: []
        }
    });

    it("Should handle ADD_NEW_CROP", () => {
        const crop = {
            name: "Tomato",
            status: "viewing"
        };

        const state = gardenReducer(initialState, actions.addNewCrop(crop));
        initialState.garden.crops.push(crop);

        expect(state).toEqual(initialState);
    });

    it("Should handle DELETE_CROP", () => {
        const crop = {
            id: "123",
            name: "Tomato",
            status: "viewing"
        };
        initialState.garden.crops.push(crop);

        const state = gardenReducer(initialState, actions.deleteCrop("123"));
        initialState.garden.crops = [];

        expect(state).toEqual(initialState);
    });

    it("Should handle EDIT_CROP", () => {
        const crop = {
            id: "123",
            name: "Tomato",
            status: "viewing"
        };
        initialState.garden.crops.push(crop);

        const state = gardenReducer(initialState, actions.editCrop("123"));
        initialState.garden.crops[0].status = "editing";
        
        expect(state).toEqual(initialState);
    });

    it("Should handle CANCEL_EDIT_CROP", () => {
        const crop = {
            id: "123",
            name: "Tomato",
            status: "editing"
        };
        initialState.garden.crops.push(crop);

        const state = gardenReducer(initialState, actions.editCrop("123"));
        initialState.garden.crops[0].status = "viewing";
        
        expect(state).toEqual(initialState);
    });

    it("Should handle SAVE_CROP", () => {
        const crops = [
            {
                id: "123",
                name: "Tomato",
                status: "viewing"
            },
            {
                id: "456",
                name: "Radish",
                status: "viewing"
            }
        ];
        const updatedCrop = {
            id: "123",
            name: "Cucumber",
            status: "viewing"
        };

        initialState.garden.crops = crops;

        const state = gardenReducer(initialState, actions.saveCrop(updatedCrop));
        initialState.garden.crops.shift()
        initialState.garden.crops.push(updatedCrop);
        
        expect(state).toEqual(initialState);
    });

    it("Should handle CREATE_JOURNAL_ENTRY", () => {
        const je = {
            text: "Tomato"
        };

        const state = gardenReducer(initialState, actions.createJournalEntry(je));
        initialState.journal.push(je);

        expect(state).toEqual(initialState);
    });

    it("Should handle DELETE_JOURNAL_ENTRY", () => {
        const je = {
            id: "123",
            text: "Tomato"
        };

        initialState.journal.push(je);
        const state = gardenReducer(initialState, actions.deleteJournalEntry("123"));
        initialState.journal.pop();

        expect(state).toEqual(initialState);
    });

    it("Should handle EDIT_JOURNAL_ENTRY", () => {
        const je = {
            id: "123",
            text: "Tomato",
            status: "viewing"
        };
        initialState.journal.push(je);

        const state = gardenReducer(initialState, actions.editJournalEntry("123"));
        initialState.journal[0].status = "editing";
        
        expect(state).toEqual(initialState);
    });

    it("Should handle SAVE_JOURNAL_ENTRY", () => {
        const je = [
            {
                id: "123",
                text: "Tomato",
                status: "viewing"
            },
            {
                id: "456",
                text: "Radish",
                status: "viewing"
            }
        ];
        const updatedJe = {
            id: "123",
            text: "Cucumber",
            status: "viewing"
        };

        initialState.journal = je;

        const state = gardenReducer(initialState, actions.saveJournalEntry(updatedJe));
        initialState.journal.shift()
        initialState.journal.push(updatedJe);
        
        expect(state).toEqual(initialState);
    });

    it("Should handle CANCEL_EDIT_JOURNAL_ENTRY", () => {
        const je = {
            id: "123",
            text: "Tomato",
            status: "editing"
        };
        initialState.journal.push(je);

        const state = gardenReducer(initialState, actions.cancelEditJournalEntry("123"));
        initialState.journal[0].status = "viewing";
        
        expect(state).toEqual(initialState);
    });

    it("Should handle SWITCH_TO_REGISTER_MODE", () => {
        const state = gardenReducer(initialState, actions.switchToRegisterMode());
        initialState.loginRegType = "register";
        
        expect(state).toEqual(initialState);
    });

    it("Should handle SWITCH_TO_LOGIN_MODE", () => {
        initialState.loginRegType = "register";
        const state = gardenReducer(initialState, actions.switchToLoginMode());
        initialState.loginRegType = "login";
        
        expect(state).toEqual(initialState);
    });

    it("Should handle SET_AUTH_TOKEN", () => {
        const state = gardenReducer(initialState, actions.setAuthToken("ABC"));
        initialState.authToken = "ABC";
        
        expect(state).toEqual(initialState);
    });

    it("Should handle LOGOUT", () => {
        initialState.authToken = "ABC";
        const state = gardenReducer(initialState, actions.logout());
        initialState.authToken = null;
        
        expect(state).toEqual(initialState);
    });

    it("Should handle LOAD_USER_DATA", () => {
        const data = {
            garden: {
                crops: [
                    {
                        id: "123",
                        name: "cucumber"
                    }
                ]
            }
        };
        
        const state = gardenReducer(initialState, actions.loadUserData(data));
        initialState.requestedUserFromServer = true;
        initialState.garden = data.garden;
        initialState.garden.crops[0].status = "viewing";

        expect(state).toEqual(initialState);
    });

    it("Should handle DELETE_ERROR", () => {
        const error = {
            id: "123",
            message: "ABC"
        };
        initialState.errors.push(error);

        const state = gardenReducer(initialState, actions.deleteError("123"));
        initialState.errors.pop();
        
        expect(state).toEqual(initialState);
    });

    it("Should handle ADD_ERROR", () => {
        const error = {
            message: "ABC",
            code: "404"
        };

        const state = gardenReducer(initialState, actions.addError(error.code, error.message));
        error.id = state.errors[0].id;
        initialState.errors.push(error);
        
        expect(state).toEqual(initialState);
    });

    it("Should handle SHOW_INFO", () => {
        const state = gardenReducer(initialState, actions.showInfo());
        initialState.showInformation = true;
        
        expect(state).toEqual(initialState);
    });

    it("Should handle HIDE_INFO", () => {
        initialState.showInformation = true;

        const state = gardenReducer(initialState, actions.hideInfo());
        initialState.showInformation = false;
        
        expect(state).toEqual(initialState);
    });
});