import { isSwearWord } from "./swearCheck.js"

export const Entry = (entryObj) => {
  return `
    <div class="entry--${entryObj.id} entry">
      <h2>${entryObj.concept}</h2>
      <p>${isSwearWord(entryObj.entry)}</p>
      <p>${entryObj.date}</p>
      <p>${entryObj.mood.label}
      <div class="btnContainer">
      <button id="deleteEntry--${entryObj.id}">Delete</button>
      <button id="editEntry--${entryObj.id}">Edit</button>

      </div>
      </div>
    `
}
