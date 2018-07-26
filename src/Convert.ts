import * as child_process from 'child_process'
import * as csv from 'csv'
import * as util from 'util'

const child_processExec = util.promisify(child_process.exec)
const csvStringify = util.promisify(csv.stringify)

export default class Convert {
  async time(tai64n: string) {
    const result = await child_processExec(
      `echo "${tai64n}" | tai64nlocal`
    ).catch(err => {
      throw err
    })

    const datetime = result.stdout.replace(/\n/, '')
    return datetime
  }

  async getDatetime(log: string) {
    const tai64n = log.match(/^(@.+?)(\s)/)

    if (!tai64n || !tai64n[1]) {
      return null
    }

    const datetime = await this.time(tai64n[1]).catch(err => {
      throw err
    })
    return datetime
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
