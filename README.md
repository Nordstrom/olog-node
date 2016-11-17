# olog
Opinionated Logging for Node.js - forces prescriptive, disciplined, structured logging.

## Install

```
npm install olog --save
```

## Usage

```js
var log = require('olog')(module)

log.info({
  message: 'Db Update on Product %s',
  category: 'Product Creation'
}, product.id)

```

## API

* **[log.serverInfo(record\[, params...\])](#logserverInforecord-params)**

### log.serverInfo(record[, params...])

### log.serverDebug(record[, params...])
