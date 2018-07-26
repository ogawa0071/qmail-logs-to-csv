import * as assert from 'assert'

import Convert from '../src/Convert'

describe('Convert', () => {
  const convert = new Convert()

  describe('time', () => {
    it('should return timestamp', () => {
      assert.strictEqual(convert.time('@400000005a497a0a00000000'), '2018-01-01T00:00:00.000Z')
    })
  })

  describe('getTimestamp', () => {
    it('should return timestamp', () => {
      assert.strictEqual(convert.getTimestamp('@400000005a497a0a00000000 starting delivery 1: msg 1 to local ogawa-futa@dmm.com'), '2018-01-01T00:00:00.000Z')
    })
  })

  describe('getEmail', () => {
    it('should return email', () => {
      assert.strictEqual(convert.getEmail('@400000005a497a0a00000000 starting delivery 1: msg 1 to local ogawa-futa@dmm.com'), 'ogawa-futa@dmm.com')
    })
  })

  describe('logLine', () => {
    it('should return csv', () => {
      assert.strictEqual(convert.logLine('@400000005a497a0a00000000 starting delivery 1: msg 1 to local ogawa-futa@dmm.com'), '2018-01-01T00:00:00.000Z,ogawa-futa@dmm.com')
    })
  })
})
