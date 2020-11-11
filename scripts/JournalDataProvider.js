import { swearCheck } from "./swearCheck.js"

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
  return fetch("http://localhost:8088/entries?_expand=mood")
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

export const deleteEntry = (entryId) => {
  return fetch(`http://localhost:8088/entries/${entryId}`, {
    method: "DELETE",
  }).then(getEntries)
}

export const updateEntry = (entryId) => {
  return fetch(`http://localhost:8088/entries/${entryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  }).then(getEntries)
}
