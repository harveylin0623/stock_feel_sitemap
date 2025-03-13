import dayjs from 'dayjs'
export const useDayjs = () => {
  const dateTimeFormat = (date, formatText) => {
    formatText = formatText !== undefined ? formatText : 'YYYY/MM/DD'
    return dayjs(date).format(formatText)
  }

  return { dateTimeFormat }
}
