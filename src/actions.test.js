import * as actions from "./actions";
import { API_BASE_URL } from "./config";

describe("Actions", () => {
    it("Should return addNewCrop()", () => {
        const values = {
            name: "Tomato"
        };
        const action = actions.addNewCrop(values);

        expect(action.type).toEqual(actions.ADD_NEW_CROP);
        expect(action.values).toEqual(values);
    });

    it("Should return editCrop()", () => {
        const cropId = "Abc";
        const action = actions.editCrop(cropId);

        expect(action.type).toEqual(actions.EDIT_CROP);
        expect(action.cropId).toEqual(cropId);
    });

    it("Should return deleteCrop()", () => {
        const cropId = "Abc";
        const action = actions.deleteCrop(cropId);

        expect(action.type).toEqual(actions.DELETE_CROP);
        expect(action.cropId).toEqual(cropId);
    });

    it("Should return cancelEditCrop()", () => {
        const action = actions.cancelEditCrop();

        expect(action.type).toEqual(actions.CANCEL_EDIT_CROP);
    });

    it("Should return saveCrop()", () => {
        const values = {
            name: "Tomato"
        };
        const action = actions.saveCrop(values);

        expect(action.type).toEqual(actions.SAVE_CROP);
        expect(action.values).toEqual(values);
    });

    it("Should return createJournalEntry()", () => {
        const values = {
            text: "This is a test"
        };
        const action = actions.createJournalEntry(values);

        expect(action.type).toEqual(actions.CREATE_JOURNAL_ENTRY);
        expect(action.values).toEqual(values);
    });

    it("Should return deleteJournalEntry()", () => {
        const id = "Abc";
        const action = actions.deleteJournalEntry(id);

        expect(action.type).toEqual(actions.DELETE_JOURNAL_ENTRY);
        expect(action.id).toEqual(id);
    });

    it("Should return editJournalEntry()", () => {
        const id = "Abc";
        const action = actions.editJournalEntry(id);

        expect(action.type).toEqual(actions.EDIT_JOURNAL_ENTRY);
        expect(action.id).toEqual(id);
    });

    it("Should return saveJournalEntry()", () => {
        const values = {
            text: "This is a test"
        };
        const action = actions.saveJournalEntry(values);

        expect(action.type).toEqual(actions.SAVE_JOURNAL_ENTRY);
        expect(action.values).toEqual(values);
    });
    
    it("Should return cancelEditJournalEntry()", () => {
        const action = actions.cancelEditJournalEntry();

        expect(action.type).toEqual(actions.CANCEL_EDIT_JOURNAL_ENTRY);
    });

    it("Should return switchToRegisterMode()", () => {
        const action = actions.switchToRegisterMode();

        expect(action.type).toEqual(actions.SWITCH_TO_REGISTER_MODE);
    });

    it("Should return switchToLoginMode()", () => {
        const action = actions.switchToLoginMode();

        expect(action.type).toEqual(actions.SWITCH_TO_LOGIN_MODE);
    });

    it("Should return setAuthToken()", () => {
        const authToken = "ABCD";
        const action = actions.setAuthToken(authToken);

        expect(action.type).toEqual(actions.SET_AUTH_TOKEN);
        expect(action.authToken).toEqual(authToken);
    });

    it("Should return login()", () => {
        const user = {
            name: "test"
        };

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return user;
                }
            })
        );
        const dispatch = jest.fn();

        return actions.login("username", "password")(dispatch)
            .then(() => {
                expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: "username",
                        password: "password"
                    })
                });
            });
    });

    it("Should return logout()", () => {
        const action = actions.logout();

        expect(action.type).toEqual(actions.LOGOUT);
    });

    it("Should return loadUserData()", () => {
        const data = {
            data: "Test"
        }
        const action = actions.loadUserData(data);

        expect(action.type).toEqual(actions.LOAD_USER_DATA);
        expect(action.data).toEqual(data);
    });

    it("Should return registerUser()", () => {
        const user = {
            name: "test"
        };

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return user;
                }
            })
        );
        const dispatch = jest.fn();

        return actions.registerUser("username", "password", "email@email.com")(dispatch)
            .then(() => {
                expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: "username",
                        password: "password",
                        email: "email@email.com"
                    })
                });
            });
    });

    it("Should return addError()", () => {
        const code = "401";
        const message = "Unauthorized";
        const action = actions.addError(code, message);

        expect(action.type).toEqual(actions.ADD_ERROR);
        expect(action.code).toEqual(code);
        expect(action.message).toEqual(message);
    });

    it("Should return deleteError()", () => {
        const id = "123";
        const action = actions.deleteError(id);

        expect(action.type).toEqual(actions.DELETE_ERROR);
        expect(action.id).toEqual(id);
    });

    it("Should return showInfo()", () => {
        const action = actions.showInfo();

        expect(action.type).toEqual(actions.SHOW_INFO);
    });

    it("Should return hideInfo()", () => {
        const action = actions.hideInfo();

        expect(action.type).toEqual(actions.HIDE_INFO);
    });
});