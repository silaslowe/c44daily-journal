import { isSwearWord } from "./swearCheck.js"

export const Entry = (entryObj) => {
  return `
    <div class="entry">
      <h2>${entryObj.concept}</h2>
      <p>${isSwearWord(entryObj.entry)}</p>
      <p>${entryObj.date}</p>
      </div>
    `
}
