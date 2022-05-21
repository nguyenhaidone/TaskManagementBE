import dayjs from 'dayjs'

export const getDayInNextTime = (numberOfDay) => {
  console.log(
    dayjs()
      .add(numberOfDay || 31, 'day')
      .format()
  )
  return dayjs()
    .add(numberOfDay || 31, 'day')
    .format()
}
