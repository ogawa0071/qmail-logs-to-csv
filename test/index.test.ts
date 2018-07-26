import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('qmail-logs-to-csv', () => {
  test
  .stdout()
  .do(() => cmd.run(['./test/test.log']))
  .it('runs qmail-logs-to-csv ./test/test.log', ctx => {
    expect(ctx.stdout).to.contain('datetime,email\n2018-01-01 09:00:00.000000000,ogawa-futa@dmm.com\n')
  })

  test
  .stdout()
  .do(() => cmd.run(['-d', './test/directory/']))
  .it('runs qmail-logs-to-csv -d ./test/directory', ctx => {
    expect(ctx.stdout).to.contain('datetime,email\n2018-01-01 09:00:00.000000000,ogawa-futa@dmm.com\n')
  })
})
