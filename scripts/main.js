import { useJournalEntries } from "./JournalDataProvider.js";
import { JournalList } from "./JournalList.js";

JournalList();

const entries = useJournalEntries();

console.log(entries);
