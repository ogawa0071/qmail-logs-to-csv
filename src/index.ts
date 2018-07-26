import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import * as path from 'path'
import * as process from 'process'
import * as util from 'util'

import Convert from './Convert'

const fsReadFile = util.promisify(fs.readFile)
const fsReaddir = util.promisify(fs.readdir)

class QmailLogsToCsv extends Command {
  static description = 'qmail logs file convert to csv'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
    directory: flags.boolean({char: 'd'}),
  }

  static args = [{
    name: 'path',
    required: true,
    description: 'file or directory path'
  }]

  async run() {
    const {args, flags} = this.parse(QmailLogsToCsv)

    const convert = new Convert()

    // Read file or directory
    const logs = await this.getLogs(args, flags).catch(err => {
      throw err
    })

    // Convert logs to csv
    const result = await convert.logs(logs).catch(err => {
      throw err
    })

    // output console
    this.log(result)
  }

  async getLogs(args: any, flags: any) {
    if (flags.directory) {
      const files = await fsReaddir(args.path).catch(() => {
        throw new Error(`Can't read directory: ${args.path}`)
      })

      const filesBuffer = await Promise.all(files.map(async file => {
        const filePath = path.join(process.cwd(), args.path, file)
        const fileBuffer = await fsReadFile(filePath).catch(() => {
          throw new Error(`Can't read file: ${filePath}`)
        })
        return fileBuffer
      })).catch(err => {
        throw err
      })

      const concatBuffer = Buffer.concat(filesBuffer)
      return concatBuffer
    }

    const filePath = path.join(process.cwd(), args.path)
    const fileBuffer = await fsReadFile(filePath).catch(() => {
      throw new Error(`Can't read file: ${filePath}`)
    })
    return fileBuffer
  }
}

export = QmailLogsToCsv
