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
var log = require('olog')(module)
```

To log a server informational log, pass in a log record (javascript object) with fields.  If you have a message field, it will use print-f like formatting (see [util.format](https://millermedeiros.github.io/mdoc/examples/node_api/doc/util.html#util.format)).  The 2nd, 3rd, etc arguments are passed in order to this message format string.

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

## Configuration

```

## API

* **[log.serverInfo(record\[, args...\])](#logserverInforecord-args)**
* **[log.serverDebug(record\[, args...\])](#logserverDebugrecord-args)**
* **[log.info(record[, args...])](#loginforecord-args)**

### log.serverInfo(record[, args...])

### log.serverDebug(record[, args...])

### log.info(record[, args...])
