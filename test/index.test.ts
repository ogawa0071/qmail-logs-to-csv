import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('qmail-logs-to-csv', () => {
  test
  .stdout()
  .do(() => cmd.run(['/Users/futa/GitHub/qmail-logs-to-csv/test/test.log']))
  .it('runs qmail-logs-to-csv ~/GitHub/qmail-logs-to-csv/test/test.log', ctx => {
    expect(ctx.stdout).to.contain('timestamp,email\n2018-01-01T00:00:00.000Z,ogawa-futa@dmm.com\n')
  })
})
