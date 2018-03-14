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