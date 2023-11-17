export function convertISODateToShortDate(date: Date | string) {
  const convertedDate = new Date(date)
  const year = convertedDate.getFullYear()
  let month = convertedDate.getMonth()+1
  let dt = convertedDate.getDate()

  return `${year}.${month < 10 ? `0${month}` : month}.${dt < 10 ? `0${dt}` : dt}`
}