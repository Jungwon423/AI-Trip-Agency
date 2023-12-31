export function getDayString(day: number): string {
  const days: string[] = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ]
  return days[day]
}

export function stringToTime(timeString: string): Date {
  const [half, time] = timeString.split(' ')
  const [hour, minute] = time.split(':')
  let hours = 0
  if (hour === '12') {
    hours = 0 + (half === '오후' ? 12 : 0)
  } else {
    hours = parseInt(hour, 10) + (half === '오후' ? 12 : 0)
  }
  const date = new Date()
  date.setHours(hours, parseInt(minute, 10), 0, 0)
  return date
}

export function isOpenNow(operatingHours: string[] | undefined): boolean {
  if (operatingHours == undefined) return false
  const now = new Date()
  const today = now.getDay()
  const currentDay = getDayString(today)
  const hoursEntry = operatingHours.find((entry) =>
    entry.startsWith(currentDay),
  )
  if (!hoursEntry || hoursEntry.includes('휴무')) {
    return false
  }
  const [start, end] = hoursEntry.slice(currentDay.length).split(' ~ ')
  let tempStart = start.substring(2)
  const startTime = stringToTime(tempStart.trim())
  const endTime = stringToTime(end.trim())
  return now >= startTime && now <= endTime
}
