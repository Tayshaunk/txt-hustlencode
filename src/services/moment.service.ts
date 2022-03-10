import moment from 'moment'
import 'moment-timezone'


/**
 * Returns formatted date in fromNow format if less than 1hr
 * Otherwise it returns the formatted date  in 'MM/DD/YY, h:mm a'
 */
export const momentFromNow = (date: Date) => {
  return moment(date).fromNow()
}

/**
 * Returns the provided date in detailed format
 * Sunday, Jan 1, 2021 at 7:30 PM
 * @param date 
 * @returns 
 */
export const momentDateDetailed = (date: Date) => {
  const part1 = moment(date)
    .tz('America/Los_Angeles')
    .format('MMMM D, YYYY')
  const part2 = moment(date).tz('America/Los_Angeles').format('LT')
  return `${part1} at ${part2}`
}
