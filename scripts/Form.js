import { saveEntry } from "./JournalDataProvider.js"
import { getMoods, useMoods } from "./moodProvider.js"
import { swearCheck } from "./swearCheck.js"

const journalFormContainer = document.querySelector(".formContainer")

const eventHub = document.querySelector(".container")

export const JournalForm = () => {
  return getMoods().then(() => {
    const moodsArray = useMoods()
    console.log(moodsArray)
    render(moodsArray)
  })
}

export const render = (moodArr) => {
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
   <button id="editEntry">Edit</button>
   <select class"updateSelect">
   <option value="0">Select a note</option>
   </select>
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
    saveEntry(newEntry)
    JournalForm()
  }
})
