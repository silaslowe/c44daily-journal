let moods = []

export const useMoods = () => {
  console.log("USEMOODS", useMoods)
  return moods.slice()
}

export const getMoods = () => {
  return fetch("http://localhost:8088/moods")
    .then((res) => res.json())
    .then((parsedMoods) => {
      moods = parsedMoods
      console.log(moods)
      useMoods()
    })
}
