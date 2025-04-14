export const formatDate = (dateStr: string | Date): string => {
  const date = new Date(dateStr)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}
