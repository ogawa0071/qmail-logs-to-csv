import * as csv from 'csv'
import * as util from 'util'

const csvStringify = util.promisify(csv.stringify)

export default class Convert {
  async time(tai64n: string) {
    const seconds = parseInt(tai64n.slice(2, 17), 16) - 10
    const milliseconds = (parseInt(tai64n.slice(17, 25), 16) * 0.000000001).toFixed(3).toString().split('.')[1]

    const timestamp = new Date(Number(`${seconds}${milliseconds}`)).toISOString()
    return timestamp
  }

  async getTimestamp(log: string) {
    const tai64n = log.match(/^(@.+?)(\s)/)

    if (!tai64n || !tai64n[1]) {
      return null
    }

    const timestamp = await this.time(tai64n[1]).catch(err => {
      throw err
    })
    return timestamp
  }

  getEmail(log: string) {
    const result = log.match(/(to\slocal)(\s)(.+)$/)

    if (!result || !result[3]) {
      return null
    }

    return result[3]
  }

  async logs(logsBuffer: Buffer) {
    const logs = logsBuffer.toString()
    const logsArray = logs.split(/\n/)

    const resultArray = await Promise.all(
      logsArray.map(async log => {
        const datetime = await this.getDatetime(log).catch(err => {
          throw err
        })
        const email = this.getEmail(log)

        if (datetime && email) {
          return [datetime, email]
        }

        return null
      })
    ).catch(err => {
      throw err
    })
    resultArray.unshift(['datetime', 'email'])

    return csvStringify(resultArray)
  }
}
