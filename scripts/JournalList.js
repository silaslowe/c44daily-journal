import { getEntries, useJournalEntries, deleteEntry } from "./JournalDataProvider.js"
import { Entry } from "./JournalEntry.js"

const contentTarget = document.querySelector(".entry-container")
const eventHub = document.querySelector(".container")

let entriesArray = []

export const JournalList = () => {
  return getEntries().then(() => {
    entriesArray = useJournalEntries()
    render(entriesArray)
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
    /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
    deleteEntry(id).then(() => {
      const updatedEntries = useJournalEntries()
      render(updatedEntries)
    })
  }
})

eventHub.addEventListener("change", (clickEvent) => {
  if (clickEvent.target.id.startsWith("udpdateEntry--")) {
    const [prefix, id] = clickEvent.target.id.split("--")
    console.log(id, prefix)

    /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
    updateEntry(id).then(() => {
      const updatedEntries = useJournalEntries()
      render(updatedEntries)
    })
  }
})

eventHub.addEventListener("moodChoosen", (e) => {
  console.log(e.detail.moodThatWasChosen)
  console.log("in event", entriesArray)
  const filteredEntries = entriesArray.filter(
    (entry) => entry.moodId === parseInt(e.detail.moodThatWasChosen)
  )
  render(filteredEntries)
})

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("editEntry--")) {
    const [notUsed, entryId] = clickEvent.target.id.split("--")
    /*
            Let all other components know that the user chose
            to edit an entry, and attach data to the message
            so that any listeners know which entry should be
            edited.
        */
    const customEvent = new CustomEvent("editButtonClicked", {
      detail: {
        entryThatWasChoosen: entryId,
      },
    })
    eventHub.dispatchEvent(customEvent)
  }
})
