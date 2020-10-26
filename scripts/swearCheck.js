import { render } from "./Form.js"

const eventHub = document.querySelector(".container")

export const swearCheck = () => {
  eventHub.addEventListener("click", (event) => {
    if (event.target.id === "saveEntry") {
      let entry = document.querySelector("#journalEntry").value
      isSwearWord(entry)
      console.log("ENTRY OUTSIDE SWEAR FUNC", entry)
    }
  })
}

export const isSwearWord = (text) => {
  const swear = /fuck|shit/gi
  const qbert = "$%!@*"
  console.log("ENTRY INSIDE SWEAR FUNC", text)
  console.log(("ENTRY INSIDE SWEAR FUNC AFTER CALL", (text = text.replace(swear, qbert))))
  return (text = text.replace(swear, qbert))
}
//

// for (let word of swear) {
//   console.log(word)
//   const rgx = new RegExp(word, "gi")
//   if (rgx.test(text)) {
//     word = word.replace(word, newWerd)
//     alert("no curse werds pleez")
//   }
// }

//   const replacer = (match) => {
//     console.log(match)
//     return "fart"
