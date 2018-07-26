export default class Convert {
  time(tai64n: string) {
    const seconds = parseInt(tai64n.slice(2, 17), 16) - 10
    const milliseconds = (parseInt(tai64n.slice(17, 25), 16) * 0.000000001).toFixed(3).toString().split('.')[1]

    const timestamp = new Date(Number(`${seconds}${milliseconds}`)).toISOString()
    return timestamp
  }

  getTimestamp(log: string) {
    const tai64n = log.match(/^(@.+?)(\s)/)

    if (!tai64n || !tai64n[1]) {
      return null
    }

    const timestamp = this.time(tai64n[1])
    return timestamp
  }

  getEmail(log: string) {
    const email = log.match(/(to\slocal)(\s)(.+)$/)

    if (!email || !email[3]) {
      return null
    }

    return email[3]
  }

  logLine(log: string) {
    const timestamp = this.getTimestamp(log)
    const email = this.getEmail(log)

    if (!timestamp || !email) {
      return null
    }

    return `${timestamp},${email}`
  }
}
