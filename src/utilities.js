export function getJournalYears(journal) {
    const years = new Set(journal.map(entry => {
        const date = new Date(entry.date);
        return date.getFullYear();
    }));

    return Array.from(years).sort((a, b) => b - a);
}

export function getJournalEntriesByYear(journal, year) {
    return journal.filter(entry => {
        const date = new Date(entry.date);
        return date.getFullYear() === year;
    });
}

export function sortJournalByDate(journal) {
    return journal.sort((a, b) => {
        const aDate = new Date(a.date),
              bDate = new Date(b.date);
        return bDate - aDate;
    })
}

export function makeISODate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
}

export function normalizeResponseErrors(res) {
    if (!res.ok) {
        if (
            res.headers.has("content-type") &&
            res.headers.get("content-type").startsWith("application/json")
        ) {
            return res.json().then(err => Promise.reject(err));
        } else {
            return Promise.reject({ code: res.status, message: res.statusText });
        }
    } else {
        return res;
    }
}

export function addTokenToStorage(authToken) {
    localStorage.setItem("authToken", authToken);
}

export function loadTokenFromStorage() {
    return localStorage.getItem("authToken");
}

export function removeTokenFromStorage() {
    localStorage.removeItem("authToken");
}

export function extractFormValues(elements, initObj = {}) {
    const newValues = {}
    Object.keys(elements).forEach(key => {
        const name = elements[key].name;
        if (name) newValues[name] = elements[key].value;
    });
    return Object.assign(newValues, initObj);
}