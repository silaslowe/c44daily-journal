import { getEntries, saveEntry, updateEntry, useJournalEntries } from "./JournalDataProvider.js"
import { getMoods, useMoods } from "./moodProvider.js"
import { swearCheck } from "./swearCheck.js"

const journalFormContainer = document.querySelector(".formContainer")

const eventHub = document.querySelector(".container")

let moodsArray = []
let entriesArray = []

export const JournalForm = () => {
  getMoods()
    .then(() => {
      moodsArray = useMoods()
    })
    .then(() => getEntries())
    .then(() => {
      entriesArray = useJournalEntries()
    })
    .then(() => {
      console.log("Entries Array", entriesArray)
      render(moodsArray, entriesArray)
    })
}

export const render = (moodArr, entryArr) => {
  return (journalFormContainer.innerHTML = `<label for="journalDate">Date of Entry</label>
   <input type="date" name="journalDate" id="journalDate" />
   <label for="journalConcept">Concept Covered</label>
   <input type="text" name="journalConcept" id="journalConcept" />
   <label for="journalEntry">Journal Entry</label>
   <textarea name="journalEntry" id="journalEntry" cols="30" rows="10"></textarea>
   <label for="journalMood">Mood for the Day</label>
   <select name="journalMood" id="journalMood">
   ${moodArr
     .map(
       (mood) => `
     <option value="${mood.id}">${mood.label}</option>`
     )
     .join("")}
   </select>
   <button id="saveEntry">Record Journal Entry</button>
   <input type="hidden" name="entryId" id="entryId" value="">

   `)
}

eventHub.addEventListener("keyup", (keyDownEvent) => {
  let conceptText = document.querySelector("#journalConcept")
  if (conceptText.value.length > 25) {
    alert("This is concpet too loooonng.")
    conceptText.value = ""
  }
})

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "saveEntry") {
    const id = document.querySelector("#entryId").value
    const date = document.querySelector("#journalDate").value
    const concept = document.querySelector("#journalConcept").value
    const entry = document.querySelector("#journalEntry").value
    const mood = document.querySelector("#journalMood").value

    const newEntry = {
      "date": date,
      "concept": concept,
      "entry": entry,
      "moodId": +mood,
    }
    if (!date || !concept || !entry || !mood) {
      return alert("please fill out form")
    }
    swearCheck()
    if (id === "") {
      saveEntry(newEntry)
    } else {
      console.log(id, newEntry)
      updateEntry(id, newEntry)
    }
    JournalForm()
  }
})

eventHub.addEventListener("editButtonClicked", (e) => {
  let entryId = document.querySelector("#entryId")
  let date = document.querySelector("#journalDate")
  let concept = document.querySelector("#journalConcept")
  let entry = document.querySelector("#journalEntry")
  let mood = document.querySelector("#journalMood")

  let entryToEdit = entriesArray.find(
    (entry) => entry.id === parseInt(e.detail.entryThatWasChoosen)
  )
  entry.value = entryToEdit.entry
  entryId.value = entryToEdit.id
  date.value = entryToEdit.date
  concept.value = entryToEdit.concept
  mood.value = entryToEdit.mood.id
})
