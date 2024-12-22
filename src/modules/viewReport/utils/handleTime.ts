const handleTime = (time: any) => {
  let formattedTime
  if (time) {
    formattedTime = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'IST',
    }).format(new Date(time))
  } else {
    formattedTime = 'Invalid'
  }
  return formattedTime
}

export default handleTime
