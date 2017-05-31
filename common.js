function formatNameKey (value) {
  value = value.trim().toLowerCase()
  value = value.replace(/[^a-zA-Z0-9\-]/g, '-')
  value = value.replace('-------', '-')
  value = value.replace('------', '-')
  value = value.replace('-----', '-')
  value = value.replace('----', '-')
  value = value.replace('---', '-')
  value = value.replace('--', '-')
  value = value.replace('--', '-')

  if (value.substring(value.length - 1) == '-') {
    value = value.substring(0, value.length - 1)
  }
  return value
}
