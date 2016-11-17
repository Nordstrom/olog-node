
const os = require('os')
const stringify = require('fast-safe-stringify')

const debug = 0
const info = 1
const warn = 2
const error = 3

const coreFields = [
  'time',
  'message',
  'level',
  'schema',
  'version',
  'application',
  'environment',
  'host',
  'pid',
  'component',
  'transaction',
  'trace',
  'annotations',
  'extensions'
]

const clientFields = [
  'uri',
  'userAgent',
  'userAuth'
]

const httpStartFields = [
  'route',
  'method',
  'uri',
  'requestHeaders',
  'requestCookies',
  'requestBodyString',
  'requestBodyMap',
  'requestBodyObject',
  'referer',
  'userAgent'
]

const httpStopFields = httpStartFields.concat([
  'duration',
  'responseCode',
  'responseHeaders',
  'responseCookies',
  'responseBodyString',
  'responseBodyMap',
  'responseBodyObject'
])

const httpSendFields = [
  'api',
  'method',
  'uri',
  'requestHeaders',
  'requestCookies',
  'requestBodyString',
  'requestBodyMap',
  'requestBodyObject'
]

const httpReceiveFields = httpSendFields.concat([
  'resonseCode',
  'responseHeaders',
  'responseCookies',
  'responseBodyString',
  'responseBodyMap',
  'responseBodyObject',
  'duration'
])

let appOpts = {
  level: process.env.OLOG_LEVEL || 'info',
  application: process.env.OLOG_APPLICATION,
  environment: process.env.OLOG_ENVIRONMENT,
  pid: process.pid,
  host: stringify(os.hostname()),
  stream: process.stdout,
  schemaNames: {
    serverDebug: 'SERVER-Debug',
    serverInfo: 'SERVER-Info',
    serverWarn: 'SERVER-Warn',
    serverError: 'SERVER-Error',
    clientDebug: 'CLIENT-Debug',
    clientInfo: 'CLIENT-Info',
    clientWarn: 'CLIENT-Warn',
    clientError: 'CLIENT-Error',
    httpApiStart: 'HTTP-API-Start',
    httpApiStop: 'HTTP-API-Stop',
    httpUiStart: 'HTTP-UI-Start',
    httpUiStop: 'HTTP-UI-Stop',
    httpApiSend: 'HTTP-API-Send',
    httpApiReceive: 'HTTP-API-Receive',
    eventStart: 'EVENT-Start',
    eventStop: 'EVENT-Stop'
  },
  messageFormatters: {
    serverDebug: (r) => { return `[${r.schema}] ${r.transaction}: ${r.message}` },
    serverInfo: (r) => { return `[${r.schema}] ${r.transaction}: ${r.message}` },
    serverWarn: (r) => { return `[${r.schema}] ${r.transaction}: ${r.message}` },
    serverError: (r) => { return `[${r.schema}] ${r.transaction}: ${r.message}: ${r.exception}` },
    clientDebug: (r) => { return `[${r.schema}] ${r.transaction}: ${r.message}` },
    clientInfo: (r) => { return `[${r.schema}] ${r.transaction}: ${r.message}` },
    clientWarn: (r) => { return `[${r.schema}] ${r.transaction}: ${r.message}` },
    clientError: (r) => { return `[${r.schema}] ${r.transaction}: ${r.message}: ${r.exception}` },
    httpApiStart: (r) => { return `[${r.schema}] ${r.transaction}: ${r.route} for ${r.trace}` },
    httpApiStop: (r) => { return `[${r.schema}] ${r.transaction}: ${r.route}[${r.responseCode}] in ${r.duraton}ms for ${r.trace}` },
    httpUiStart: (r) => { return `[${r.schema}] ${r.transaction}: ${r.route} for ${r.trace}` },
    httpUiStop: (r) => { return `[${r.schema}] ${r.transaction}: ${r.route}[${r.responseCode}] in ${r.duraton}ms for ${r.trace}` },
    httpApiSend: (r) => { return `[${r.schema}] ${r.transaction}: ${r.api} (${r.method}:${r.uri}) for ${r.trace}` },
    httpApiReceive: (r) => { return `[${r.schema}] ${r.transaction}: ${r.api} (${r.method}:${r.uri})[${r.responseCode}] in ${r.duraton}ms for ${r.trace}` }
  },
  fields: {
    serverDebug: coreFields.concat([]),
    serverInfo: coreFields.concat([]),
    serverWarn: coreFields.concat([]),
    serverError: coreFields.concat(['exception']),
    clientDebug: coreFields.concat(clientFields),
    clientInfo: coreFields.concat(clientFields),
    clientWarn: coreFields.concat(clientFields),
    clientError: coreFields.concat(clientFields.concat(['exception'])),
    httpApiStart: coreFields.concat(httpStartFields),
    httpApiStop: coreFields.concat(httpStopFields),
    httpUiStart: coreFields.concat(httpStartFields),
    httpUiStop: coreFields.concat(httpStopFields),
    httpApiSend: coreFields.concat(httpSendFields),
    httpApiReceive: coreFields.concat(httpReceiveFields)
  }
}

let compOpts = {}

class Log {
  constructor (component, defaults) {
    this.component = component
    this.defaults = defaults
  }

  config (options) {
    appOpts = Object.assign(appOpts, options)
  }

  _normalize (id, record) {
    const self = this
    const fields = (compOpts.fields && compOpts.fields[id]) || appOpts.fields[id]

    if (!fields || !(fields.length > 0)) return {}

    let normalized = {}

    for (let i = 0; i < fields.length; i++) {
      let field = fields[i]
      let value = record[field] || self.defaults[field] || compOpts[field] || appOpts[field]

      if (value !== undefined && value !== null) {
        normalized[field] = value
      }
    }

    return normalized
  }

  _levelNotEnabled (level) {
    // check that level num is less than the default level
    // return true if so; false otherwise
  }

  _formatMessage (id, record) {
    // use id to lookup message formatter, passing record in to the formatter fn
    // return formatted message
  }

  _write (id, level, record) {
    // 1. get schemaName by id
    // 2. format message
    // 3. normalize record
    // 4. write record to stream
  }

  serverDebug(record) {
    if (this._levelNotEnabled(debug)) return
    this._write('serverDebug', 'debug', record)
  }

  serverInfo(record) {
    if (this._levelNotEnabled(debug)) return
    this._write('serverDebug', 'debug', record)
  }
}

module.exports = (component, defaults) => {
  return new Log(component, defaults)
}