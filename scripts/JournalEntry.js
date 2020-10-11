export const Entry = (entryObj) => {
  return `
    <div>
      <h2>${entryObj.concept}</h2>
      <br>
      <p>${entryObj.entry}</p>
      <p>${entryObj.date}</p>
      </div>
    `;
};
