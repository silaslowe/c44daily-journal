export const Entry = (entryObj) => {
  return `
    <div class="entry">
      <h2>${entryObj.concept}</h2>
      <p>${entryObj.entry}</p>
      <p>${entryObj.date}</p>
      </div>
    `
}
