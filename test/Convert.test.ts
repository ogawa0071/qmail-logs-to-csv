import * as assert from 'assert'
import * as buffer from 'buffer'

import Convert from '../src/Convert'

describe('Convert', () => {
  const convert = new Convert()

  describe('time', () => {
    it('should return timestamp', async () => {
      assert.strictEqual(await convert.time('@400000005a497a0a00000000'), '2018-01-01T00:00:00.000Z')
    })
  })

  describe('getTimestamp', () => {
    it('should return timestamp', async () => {
      assert.strictEqual(await convert.getTimestamp('@400000005a497a0a00000000 starting delivery 1: msg 1 to local ogawa-futa@dmm.com'), '2018-01-01T00:00:00.000Z')
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
      assert.strictEqual(await convert.logs(logs), 'timestamp,email\n2018-01-01T00:00:00.000Z,ogawa-futa@dmm.com\n')
    })
  })
})
