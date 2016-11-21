# Logging Schemas
The following provides definitions of the Logging Schemas with defaults fields for each.

## Core Fields
These fields are common to all Schemas.

|Field|Type|Description|
|-----|----|-----------|
|**time**|Date|Generated date/time at which the log event was generated. The Timestamp should is expressed in UTC ISO 8601 format.|
|**message**|String|A summary message that contains other elements of data in the log (i.e. `HTTP-API-Stop on CreateProduct (POST:/v2/products) [200] in 138ms`).  The purpose of this is to provide a condensed view of logs.  Tools like Kibana, let you select the fields to show in the log view.  Having a summary message allows a single line, condensed view rather than the whole record.  This message is generated based on the messageFormatter for each schema.|
|**level**|String|Log level string (i.e. debug, info, warn, error).  This is generated based on the schema function used.|
|**schema**|String|Case insensitive string identifier that identifies the schema of the log message.|
|**version**|Number|Integer-based version number that.  Current: `3`|
|**application**|String|Unique string identifying the application generating the log events.  This is set in the [log.config (options)](README.md#logconfig-options) or `OLOG_APPLICATION` environment variable.|
|**environment**|String|String field that is used as the name of the environment in which the application is currently executing.  This is set in [log.config (options)](README.md#logconfig-options) or `OLOG_ENVIRONMENT` environment variable.|
|**host**|String|Name or id of host / server instance.  This is automatically set by olog.|
|**pid**|String|ID of Process.  This is automatically set by olog.|
|**component**|String|String field to record the module or component in which logging occurs.  This is set based on the module param of [olog(module\[, defaults\])](README.md#olog-module-defaults).|
|**category**|String|String field that can be used to functionally categorize trace data (e.g. "Outfits-CacheMiss", "Outfits-CacheHit", ...).|
|**transaction**|String|Custom name for the type of transaction to which this log belongs. (e.g. CreateProduct, GetPrice, UpdateSkuDb, etc).  This is helpful for correlating logs across a given type of transaction.|
|**trace**|String|Enables correlation of log data across applications for a specific request or transaction.|
|**extensions**|Object|Custom metadata as an Object type (JSON, Graph, etc).|

## SERVER-Debug
**level:** `debug`

Debug level logs that occur on the server.  Core Fields only.

## SERVER-Info
**level:** `info`

Info level logs that occur on the server.  Core Fields only.

## SERVER-Warn
**level:** `warn`

Warning level logs that occur on the server.  Core Fields only.

## SERVER-Error
**level:** `error`

Error level logs that occur on the server.

|Field|Type|Description|
|-----|----|-----------|
|**exception**|String|Field to record the exception that happened, along with the relevant stack trace.|

## CLIENT-Debug
**level:** `debug`

Debug level logs that occur on the client.

|Field|Type|Description|
|-----|----|-----------|
|**uri**|String|Uri string.|
|**userAgent**|String|User agent string used to identify browser & device.|
|**userAuth**|String|Field to record the user auth state.|

## CLIENT-Info
**level:** `info`

Info level logs that occur on the client.

|Field|Type|Description|
|-----|----|-----------|
|**uri**|String|Uri string.|
|**userAgent**|String|User agent string used to identify browser & device.|
|**userAuth**|String|Field to record the user auth state.|

## CLIENT-Warn
**level:** `warn`

Warning level logs that occur on the client.

|Field|Type|Description|
|-----|----|-----------|
|**uri**|String|Uri string.|
|**userAgent**|String|User agent string used to identify browser & device.|
|**userAuth**|String|Field to record the user auth state.|

## CLIENT-Error
**level:** `error`

Error level logs that occur on the client.

|Field|Type|Description|
|-----|----|-----------|
|**exception**|String|Records the exception that happened, along with the relevant stack trace.|
|**uri**|String|Uri string.|
|**userAgent**|String|User agent string used to identify browser & device.|
|**userAuth**|String|Field to record the user auth state.|
