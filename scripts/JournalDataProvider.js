/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

import { swearCheck } from "./swearCheck.js"

// This is the original data.
// const journal = [
//   {
//     id: 1,
//     date: "07/24/2025",
//     concept: "Debugger",
//     entry: "We talked using the debugger and how to use it to find problems in js",
//     mood: "Sad",
//   },
//   {
//     id: 2,
//     date: "07/25/2025",
//     concept: "JS Modules",
//     entry: "We talked about using modules in js to mkae code easier to use and reuse.",
//     mood: "Morose",
//   },
//   {
//     id: 3,
//     date: "07/26/2025",
//     concept: "JS Arrays",
//     entry: "We talked about using methods to manipulate arrays to get the desired outputs.",
//     mood: "Despondent",
//   },
//   {
//     id: 4,
//     date: "07/27/2025",
//     concept: "JS Object",
//     entry:
//       "We talked about using objets to repreent complex concepts like seeds or journal entries.",
//     mood: "Despondent",
//   },
// ];

let journal = []

const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
  const journalStateChangeEvent = new CustomEvent("journalStateChanged")

  eventHub.dispatchEvent(journalStateChangeEvent)
}

export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
    (currentEntry, nextEntry) => Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  )
  return sortedByDate
}

export const getEntries = () => {
  return fetch("http://localhost:8088/entries")
    .then((response) => response.json())
    .then((entries) => {
      journal = entries
    })
}

export const saveEntry = (entry) => {
  return fetch("http://localhost:8088/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  })
    .then(swearCheck)
    .then(getEntries)
    .then(dispatchStateChangeEvent)
}
