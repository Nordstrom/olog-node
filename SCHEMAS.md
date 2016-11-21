# Logging Schemas
The following provides definitions of the Logging Schemas with defaults fields for each.

## Core Fields
|Field|Type|Description|
|-----|----|-----------|
|**time**|Date|Generated date/time at which the log event was generated. The Timestamp should is expressed in UTC ISO 8601 format.|
|**message**|String|A summary message that contains other elements of data in the log (i.e. `HTTP-API-Stop on CreateProduct (POST:/v2/products) [200] in 138ms`).  The purpose of this is to provide a condensed view of logs.  Tools like Kibana, let you select the fields to show in the log view.  Having a summary message allows a single line, condensed view rather than the whole record.  This message is generated based on the messageFormatter for each schema.|
|**level**|String|Log level string (i.e. debug, info, warn, error).  This is generated based on the schema function used.|
|**schema**|String|Case insensitive string identifier that identifies the schema of the log message.|
|**version**|Number|Integer-based version number that.  Current: `3`|
|**application**|String|Unique string identifying the application generating the log events.  This is set in the log.config function or environment variable.|
|**environment**|String|String field that is used as the name of the environment in which the application is currently executing.  This is set in [log.config(options)](README.md#logconfigoptions) function or environment variable.|
|**host**|String|Name or id of host / server instance.  This is automatically set by olog.|
|**pid**|String|ID of Process.  This is automatically set by olog.|
|**component**|String|String field to record the module or component in which logging occurs.  This is set based on the module param of [olog(module\[, defaults\])](.#ologmodule-defaults).|
|**category**|String|Optional string field that can be used to functionally categorize trace data (e.g. "Outfits-CacheMiss", "Outfits-CacheHit", ...).|
|**transaction**|String|Custom name for the type of transaction to which this log belongs. (e.g. CreateProduct, GetPrice, UpdateSkuDb, etc).  This is helpful for correlating logs across a given type of transaction. For more details, see Transaction Naming above.|
|**trace**|String|Enables correlation of log data across applications. See [Trace Context Chaining](tracing/Trace-Context-Chaining.md) for more details.|
|**annotations**|Map|Custom metadata as a Map type (key/value pairs).  Using this does not require extending the schema for static typed data formats or languages.|
|**extensions**|Object|Custom metadata as an Object type (JSON, Graph, etc).  Using this may require extending the schema for static typed data formats or languages.  For example in Java, you may need to extend the HttpApiSend base class or a generic HttpApiSend<T> class could be used.|

## SERVER-Debug

## SERVER-Info

## SERVER-Warn

## SERVER-Error
