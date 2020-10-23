import { useJournalEntries } from "./JournalDataProvider.js";
import { Entry } from "./JournalEntry.js";

export const JournalList = () => {
  const entries = document.querySelector(".entry-container");
  const journalEntries = useJournalEntries();
  let entryContainerHTMLRep = "";

  for (const entry of journalEntries) {
    entryContainerHTMLRep += Entry(entry);
  }

  return (entries.innerHTML = `
    ${entryContainerHTMLRep}
  `);
};
