import { saveEntry } from "./JournalDataProvider.js"

const journalFormContainer = document.querySelector(".formContainer")

const eventHub = document.querySelector(".container")

export const journalForm = () => {
  render()
}

const render = () => {
  return (journalFormContainer.innerHTML = `<label for="journalDate">Date of Entry</label>
   <input type="date" name="journalDate" id="journalDate" />
   <label for="journalConcept">Concept Covered</label>
   <input type="text" name="journalConcept" id="journalConcept" />
   <label for="journalEntry">Journal Entry</label>
   <textarea name="journalEntry" id="journalEntry" cols="30" rows="1"></textarea>
   <label for="journalMood">Mood for the Day</label>
   <select name="journalMood" id="journalMood">
     <option value="sad">Sad</option>
     <option value="morose">Morose</option>
     <option value="despondent">Despondent</option>
     <option value="lackluster">Lackluster</option>
     <option value="poorly">Poorly</option>
   </select>
   <button id="saveEntry">Record Journal Entry</button>
   `)
}

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
      "mood": mood,
    }
    if (!date || !concept || !entry || !mood) {
      return alert("please fill out form")
    }
    saveEntry(newEntry)
    render()
  }
})
