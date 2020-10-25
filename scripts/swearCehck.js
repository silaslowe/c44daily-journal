import { render } from "./Form.js"

const eventHub = document.querySelector(".container")

export const swearCehck = () => {
  eventHub.addEventListener("click", (event) => {
    if (event.target.id === "saveEntry") {
      let concept = document.querySelector("#journalConcept").value
      let entry = document.querySelector("#journalEntry").value

      isSwearWord(concept)
      isSwearWord(entry)
    }
  })
}

const isSwearWord = (text) => {
  const swear = ["fuck", "shit"]
  const newWerd = "$%!@*"

  //   newText = text.replace(swear, replacer)

  //   const replacer = (match) => {
  //     console.log(match)
  //     return "fart"
  for (let word of swear) {
    const rgx = new RegExp(word, "gi")
    if (rgx.test(text)) {
      //   alert("no curse werds pleez")
      //   console.log(word)
      word = word.replace(word, newWerd)
      render()
    }
  }
}
