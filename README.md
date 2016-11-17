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

##### options.environment
Type: `String`
Environment Variable: `OLOG_ENVIRONMENT`

##### options.level  (process.env.OLOG_LEVEL)
Type: `String`
Environment Variable: `OLOG_LEVEL`

##### options.stream
Type: `Stream`

##### options.messageTemplates
Type: `Object`

### log.debug (record)
Alias for [log.serverDebug (record)](#logserverDebug-record).

### log.info (record)
Alias for [log.serverInfo (record)](#logserverInfo-record).

### log.warn (record)
Alias for [log.serverWarn (record)](#logserverWarn-record).

### log.error (record)
Alias for [log.serverError (record)](#logserverError-record).

### log.serverDebug (record)

### log.serverInfo (record)

### log.serverWarn (record)

### log.serverError (record)

### log.clientDebug (record)

### log.clientInfo (record)

### log.clientWarn (record)

### log.clientError (record)

### log.httpApiStart (record)

### log.httpApiStop (record)

### log.httpUiStart (record)

### log.httpUiStop (record)

### log.httpApiSend (record)

### log.httpApiReceive (record)

### log.eventStart (record)

### log.eventStop (record)
