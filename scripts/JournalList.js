import { getEntries, useJournalEntries, deleteEntry } from "./JournalDataProvider.js"
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

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("deleteEntry--")) {
    const [prefix, id] = clickEvent.target.id.split("--")
    console.log(id, prefix)
    /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
    deleteEntry(id).then(() => {
      const updatedNotes = useJournalEntries()
      render(updatedNotes)
    })
  }
})
