export function getJournalYears(journal) {
    const years = new Set(journal.map(item => {
        const date = new Date(item.date);
        return date.getFullYear();
    }));
    
    return Array.from(years);
}