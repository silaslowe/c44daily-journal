import { getEntries, useJournalEntries } from "../JournalDataProvider.js"
import { getMoods, useMoods } from "../moodProvider.js"
import { MoodFilter } from "./MoodFilter.js"

/*
 You need to make a new HTML element with a class of
 `filters` in index.html
*/
let moodsArray = []

const contentTarget = document.querySelector(".filters")
const eventHub = document.querySelector(".container")

export const FilterBar = () => {
  return getMoods().then(() => {
    moodsArray = useMoods()
    console.log(moodsArray)
    render(moodsArray)
  })
}

const render = (moodCollection) => {
  contentTarget.innerHTML = `
            ${MoodFilter(moodCollection)}
        `
}

eventHub.addEventListener("change", (event) => {
  if (event.target.name === "moodFilter") {
    const customEvent = new CustomEvent("moodChoosen", {
      detail: {
        moodThatWasChosen: event.target.value,
      },
    })
    eventHub.dispatchEvent(customEvent)
  }
})
