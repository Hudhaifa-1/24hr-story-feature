export function timeAgo(timestamp) {
  const now = Date.now()
  const difference = now - timestamp
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  } else if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  } else {
    return 'just now'
  }
}

export function timeAgoOnly(timestamp) {
  const now = Date.now()
  const difference = now - timestamp
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return hours
  }
   else{
    return null
  }
}

