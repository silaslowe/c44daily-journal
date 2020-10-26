import { getEntries, useJournalEntries } from "./JournalDataProvider.js"
import { Entry } from "./JournalEntry.js"

const contentTarget = document.querySelector(".entry-container")
const eventHub = document.querySelector(".container")

export const JournalList = () => {
  return getEntries().then(() => {
    const entryArray = useJournalEntries()
    render(entryArray)
  })
}

const render = (entryCollection) => {
  contentTarget.innerHTML = entryCollection.map((item) => Entry(item)).join(" ")
}

eventHub.addEventListener("journalStateChanged", (event) => {
  JournalList()
})
