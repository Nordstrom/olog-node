# olog
Opinionated Logging for Node.js - forces prescriptive, disciplined, structured logging.

## Install
Install with:
```
npm install olog --save
```

## Usage
To get started require olog passing your module var.  This will automatically use your module to include the component name in your logs.

```js
const log = require('olog')(module)
```

To configure logging for your application, call the config function in the top-level module.

```js
log.config({
  application: 'product-service',
  environment: 'dev'
})
```

To log a server informational log, pass in a log record (javascript object) with fields.

```js
let productId = '123'

log.info({
  message: `Db Update on Product ${productId}`,
  category: 'Catalog'
  transaction: 'CreateProduct',
  trace: 'e45dc587-3516-489f-9487-391a119889c0'
  annotations: {
    productId: productId
  }
})
```

Outputs:
```json
{
  "time": "2016-11-01T23:00:35.181Z",
  "message": "[SERVER-Info] Db Update on Product 123",
  "level": "Info",
  "schema": "SERVER-Info",
  "version": 3,
  "host": "i-a38273",
  "pid": "28393",
  "component": "lib/mymodule",
  "category": "Catalog",
  "transaction": "CreateProduct",
  "trace": "e45dc587-3516-489f-9487-391a119889c0",
  "annotations": {
    "productId": "123"
  }
}
```

## API

* **[record](#record)**
* **[olog (options)](#olog-options)**
* **[log.config (options)](#logconfig-options)**
* **[log.debug (record)](#logdebug-record)**
* **[log.info (record)](#loginfo-record)**
* **[log.warn (record)](#logwarn-record)**
* **[log.error (record)](*logerror-record)**
* **[log.serverDebug (record)](#logserverDebug-record)**
* **[log.serverInfo (record)](#logserverInfo-record)**
* **[log.serverWarn (record)](#logserverWarn-record)**
* **[log.serverError (record)](#logserverError-record)**
* **[log.clientDebug (record)](#logclientDebug-record)**
* **[log.clientInfo (record)](#logclientInfo-record)**
* **[log.clientWarn (record)](#logclientWarn-record)**
* **[log.clientError (record)](#logclientError-record)**
* **[log.httpApiStart (record)](#loghttpApiStart-record)**
* **[log.httpApiStop (record)](#loghttpApiStop-record)**
* **[log.httpUiStart (record)](#loghttpUiStart-record)**
* **[log.httpUiStop (record)](#loghttpUiStop-record)**
* **[log.httpApiSend (record)](#loghttpApiSend-record)**
* **[log.httpApiReceive (record)](#loghttpApiReceive-record)**
* **[log.eventStart (record)](#logeventStart-record)**
* **[log.eventStop (record)](#logeventStop-record)**

### record
Type: `Object`

Log record used for all logging functions.  This undergoes the following transformations during logging:
* Generates message field based on the messageFormatter for the given schema.
* Filters and orders fields based on configured fields for the schema (see [log.config (options)](#logconfig-options)).  Only configured fields are output, and fields are output in the order they are configured.


### olog (module[, defaults])
Factor function that creates a new logger.  It makes it easy to require and create a logger for a module.

#### module
Type: `String` or `Object`

If module is a String, it will be `component` in log records.  If module is an Object, it should be [Node's module Object](https://nodejs.org/api/modules.html#modules_the_module_object).  The the `component` will be generated based on its properties.

#### defaults
Type: `Object`

Allows you to provide module-level defaults for any of the log record properties (i.e. category, transaction, etc).

##### Examples

```js
// component name
const log = require('olog')('my-module')  

or

// generates component name
const log = require('olog')(module)

or

// applies record defaults
const log = require('olog')(module, {
  category: 'Shopping Cart',
  transaction: 'UpdateCart'
})
```

### log.config (options)
Configure application-wide settings for logging.

#### options
Type: `Object`

##### options.application
Type: `String`
Environment Variable: `OLOG_APPLICATION`

Name or ID of the application.  Set here or with Environment Variable `OLOG_APPLICATION`.

##### options.environment
Type: `String`
Environment Variable: `OLOG_ENVIRONMENT`

Name or ID of the deployed environment.  Set here or with Environment Variable `OLOG_ENVIRONMENT`.

##### options.level
Type: `String` one of `debug`, `info`, `warn`, `error`
Default: `info`
Environment Variable: `OLOG_LEVEL`

Name of log level enabled for this application.  Set here or with Environment Variable `OLOG_LEVEL`.

##### options.stream
Type: `Stream`
Default: process.stdout

Writable stream to which log records are written.  Records are output in UTF8 stringified JSON format.

##### options.fields
Type: `Object`
Default:
```js
{
  serverDebug: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component',    'transaction', 'trace', 'annotations', 'extensions']
  serverInfo: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions']
  serverWarn: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions']
  serverError: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'exception']
  clientDebug: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'uri', 'userAgent', 'userAuth']
  clientInfo: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'uri', 'userAgent', 'userAuth']
  clientWarn: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'uri', 'userAgent', 'userAuth']
  clientError: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'uri', 'userAgent', 'userAuth', 'exception']
  httpApiStart: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'route', 'method', 'uri', 'requestHeaders', 'requestCookies', 'requestBodyString', 'requestBodyMap', 'requestBodyObject', 'referer', 'userAgent']
  httpApiStop: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'route', 'method', 'uri', 'requestHeaders', 'requestCookies', 'requestBodyString', 'requestBodyMap', 'requestBodyObject', 'referer', 'userAgent', 'duration', 'responseCode', 'responseHeaders', 'responseCookies', 'responseBodyString', 'responseBodyMap', 'responseBodyObject']
  httpUiStart: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'route', 'method', 'uri', 'requestHeaders', 'requestCookies', 'requestBodyString', 'requestBodyMap', 'requestBodyObject', 'referer', 'userAgent']
  httpUiStop: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'route', 'method', 'uri', 'requestHeaders', 'requestCookies', 'requestBodyString', 'requestBodyMap', 'requestBodyObject', 'referer', 'userAgent', 'duration', 'responseCode', 'responseHeaders', 'responseCookies', 'responseBodyString', 'responseBodyMap', 'responseBodyObject']
  httpApiSend: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'api', 'method', 'uri', 'requestHeaders', 'requestCookies', 'requestBodyString', 'requestBodyMap', 'requestBodyObject']
  httpApiReceive: ['time', 'message', 'level', 'schema', 'version', 'application', 'environment', 'host', 'pid', 'component', 'transaction', 'trace', 'annotations', 'extensions', 'api', 'method', 'uri', 'requestHeaders', 'requestCookies', 'requestBodyString', 'requestBodyMap', 'requestBodyObject', 'resonseCode', 'responseHeaders', 'responseCookies', 'responseBodyString', 'responseBodyMap', 'responseBodyObject', 'duration']
}
```
This determines allowed output fields for each schema along with the order of output for each field.

##### options.schemaNames
Type: `Object`
Default:
```js
{
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
}
```

Logged name of each schema based on function name.

##### options.messageFormatters
Type: `Object`
Default:
```js
{
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

```

Configure message formatters for each schema.  This Object contains properties following this syntax:
`<schemaFunctionName>: (record) => { return <formatted message> }`.  
For example:

```js
{
  serverInfo: (record) => { return `${record.transaction} - DETAILS: ${record.message}` },
  httpApiStop: (record) => { return `${record.route}[${record.responseCode}]` }
}
```

### log.debug (record)
Alias for [log.serverDebug (record)](#logserverDebug-record).

### log.info (record)
Alias for [log.serverInfo (record)](#logserverInfo-record).

### log.warn (record)
Alias for [log.serverWarn (record)](#logserverWarn-record).

### log.error (record)
Alias for [log.serverError (record)](#logserverError-record).

### log.serverDebug (record)
Logs [record](#record) using serverDebug (SERVER-Debug) schema.

### log.serverInfo (record)
Logs [record](#record) using serverInfo (SERVER-Info) schema.

### log.serverWarn (record)
Logs [record](#record) using serverWarn (SERVER-Warn) schema.

### log.serverError (record)
Logs [record](#record) using serverError (SERVER-Error) schema.

### log.clientDebug (record)
Logs [record](#record) using clientDebug (CLIENT-Debug) schema.

### log.clientInfo (record)
Logs [record](#record) using clientInfo (CLIENT-Info) schema.

### log.clientWarn (record)
Logs [record](#record) using clientWarn (CLIENT-Warn) schema.

### log.clientError (record)
Logs [record](#record) using clientError (CLIENT-Error) schema.

### log.httpApiStart (record)
Logs [record](#record) using httpApiStart (HTTP-API-Start) schema.

### log.httpApiStop (record)
Logs [record](#record) using httpApiStop (HTTP-API-Stop) schema.

### log.httpUiStart (record)
Logs [record](#record) using httpUiStart (HTTP-UI-Start) schema.

### log.httpUiStop (record)
Logs [record](#record) using httpUiStop (HTTP-UI-Stop) schema.

### log.httpApiSend (record)
Logs [record](#record) using httpApiSend (HTTP-API-Send) schema.

### log.httpApiReceive (record)
Logs [record](#record) using httpApiReceive (HTTP-API-Receive) schema.

### log.eventStart (record)
Logs [record](#record) using eventStart (EVENT-Start) schema.

### log.eventStop (record)
Logs [record](#record) using eventStop (EVENT-Stop) schema.
