import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import * as readline from 'readline'

import Convert from './Convert'

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
  }

  static args = [{
    name: 'path',
    required: true,
    description: 'file path'
  }]

  async run() {
    const {args} = this.parse(QmailLogsToCsv)
    const convert = new Convert()

    this.log('timestamp,email')

    const fileStream = fs.createReadStream(args.path)
    const rl = readline.createInterface(fileStream)

    rl.on('line', log => {
      const csvLine = convert.logLine(log)
      if (csvLine) {
        this.log(csvLine)
      }
    })
    rl.on('close', () => {
      this.log('\n')
    })
  }
}

export = QmailLogsToCsv
