import {useMemo} from "react";

export const useSortedRecords = (records, sort) => {
    const sortedRecords = useMemo(() => {
        if(sort) {
            return [...records].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return records;
    }, [sort, records])

    return sortedRecords;
}

export const useRecords = (records, sort, query) => {
    const sortedRecords = useSortedRecords(records, sort);

    const sortedAndSearchedRecords = useMemo(() => {
        return sortedRecords.filter(record => record.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedRecords])

    return sortedAndSearchedRecords;
}