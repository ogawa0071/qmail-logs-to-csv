import * as assert from 'assert'
import * as buffer from 'buffer'

import Convert from '../src/Convert'

describe('Convert', () => {
  const convert = new Convert()

  describe('time', () => {
    it('should return datetime', async () => {
      assert.strictEqual(await convert.time('@400000005a497a0a00000000'), '2018-01-01 09:00:00.000000000')
    })
  })

  describe('getDatetime', () => {
    it('should return datetime', async () => {
      assert.strictEqual(await convert.getDatetime('@400000005a497a0a00000000 starting delivery 1: msg 1 to local ogawa-futa@dmm.com'), '2018-01-01 09:00:00.000000000')
    })
  })

  describe('getEmail', () => {
    it('should return email', async () => {
      assert.strictEqual(await convert.getEmail('@400000005a497a0a00000000 starting delivery 1: msg 1 to local ogawa-futa@dmm.com'), 'ogawa-futa@dmm.com')
    })
  })

  describe('logs', () => {
    it('should return csv', async () => {
      const logs = buffer.Buffer.from('@400000005a497a0a00000000 starting delivery 1: msg 1 to local ogawa-futa@dmm.com\n')
      assert.strictEqual(await convert.logs(logs), 'datetime,email\n2018-01-01 09:00:00.000000000,ogawa-futa@dmm.com\n')
    })
  })
})
