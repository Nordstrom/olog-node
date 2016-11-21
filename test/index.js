'use strict'
var should = require('should')
var describe = require('mocha').describe
var it = require('mocha').it
var beforeEach = require('mocha').beforeEach
var olog = require('../olog')
var catcher = require('./util/logCatcher')

const ISO_REGEX = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
const HOSTNAME_REGEX = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/
const PID_REGEX = /[0-9]*/

describe('basic logging functionality', () => {
  beforeEach(() => {
    // setup the catcher as the stream for logs
    catcher.clear()
    olog.Log.config({stream: catcher})
  })

  it('should log basic message', () => {
    let log = olog('componentName')
    log.serverInfo({transaction: 'CreateComponent', message: 'Encountered issue creating component'})

    should(catcher.getParsedRecord(0)).have.property('transaction', 'CreateComponent')
    catcher.getParsedRecord(0).message.should.equal('[SERVER-Info] CreateComponent: Encountered issue creating component')
  })

  describe('using the readme example', () => {
    let productId = '123'
    var expectedLog, logInput, log
    beforeEach(() => {
      logInput = {
        message: `Db Update on Product ${productId}`,
        category: 'Catalog',
        transaction: 'CreateProduct',
        trace: 'e45dc587-3516-489f-9487-391a119889c0',
        annotations: {
          productId: productId
        }
      }
      expectedLog = {
        'time': ISO_REGEX,
        'message': '[SERVER-Info] CreateProduct: Db Update on Product 123',
        'level': 'info',
        'schema': 'SERVER-Info',
        'version': 3,
        'host': HOSTNAME_REGEX,
        'pid': PID_REGEX,
        'component': 'lib/mymodule',
        'category': 'Catalog',
        'transaction': 'CreateProduct',
        'trace': 'e45dc587-3516-489f-9487-391a119889c0',
        'annotations': {
          'productId': '123'
        }
      }
      log = olog('lib/mymodule')
      log.serverInfo(logInput)
    })
    it('should output the same log as stated in the readme', function () {
      catcher.getParsedRecord(0).should.match(expectedLog)
    })
    it('should have fields in the correct order', () => {
      Object.keys(catcher.getParsedRecord(0)).should.eql(Object.keys(expectedLog))
    })
  })

  describe('default options', () => {
    it('should use defaults in all generated logs', () => {
      let defaults = {
        category: 'Shopping Cart',
        transaction: 'UpdateCart'
      }
      olog('defaultTest', defaults)
        .serverInfo({message: 'Default options should be used'})

      catcher.getParsedRecord(0).should.have.property('component', 'defaultTest')
      catcher.getParsedRecord(0).should.match(defaults)
    })

    it('should override app options with default options', () => {
      olog('defaultOverrideTest', { version: 2 })
        .serverInfo({message: 'Should override version'})

      catcher.getParsedRecord(0).should.match({
        'version': 2,
        'component': 'defaultOverrideTest'
      })
    })

    it('should override defaults with log record properties', () => {
      const log = olog('recordDefaultTest', {
        category: 'Shopping Cart',
        transaction: 'UpdateCart'
      })
      log.serverInfo({message: 'Default options should be used', transaction: 'ClearCart'})

      catcher.getParsedRecord(0).should.have.property('category', 'Shopping Cart')
      catcher.getParsedRecord(0).should.have.property('transaction', 'ClearCart')
    })

    it('should not modify app options of other logs', () => {
      olog('defaultOverrideTest', { version: 2 })
        .serverInfo({message: 'Should override version'})

      catcher.getParsedRecord(0).should.match({
        'version': 2,
        'component': 'defaultOverrideTest'
      })

      olog('notModifiedTest', {transaction: 'UpdateCart'})
        .serverInfo({message: 'Should not override version'})

      catcher.getParsedRecord(1).should.match({
        'version': 3,
        'component': 'notModifiedTest'
      })
    })
  })

  describe('config function', () => {
    it('should change app options for current loggers', () => {
      const log = olog('componentName')
      log.serverInfo({message: 'Should not have an application field'})
      catcher.getParsedRecord(0).should.not.have.property('application')

      olog.Log.config({application: 'UnitTests'})

      log.serverInfo({message: 'Should have an application field'})
      catcher.getParsedRecord(1).should.have.property('application', 'UnitTests')
    })

    it('should change app options for all loggers', () => {
      olog.Log.config({application: 'UnitTests'})

      olog('component2Name')
        .serverInfo({message: 'Should have an application field'})
      catcher.getParsedRecord(0).should.have.property('application', 'UnitTests')
    })
  })

  describe('server logging functions should have shorter aliases', () => {
    it('info', () => {
      olog('infoAliasTest')
        .info({message: 'Should have info level'})
      catcher.getParsedRecord(0).should.have.property('level', 'info')
    })
    it('warn', () => {
      olog('warnAliasTest')
        .warn({message: 'Should have warn level'})
      catcher.getParsedRecord(0).should.have.property('level', 'warn')
    })
    // todo other levels - debug needs to set config level lower
  })
})
