var Catcher = function () {
  this.records = []
}
Catcher.prototype.write = function (record) {
  this.records.push(record)
}
Catcher.prototype.clear = function () {
  this.records = []
}
Catcher.prototype.getParsedRecord = function (index) {
  var record = this.records[index]
  if (!record) return {}
  var parsed
  try {
    parsed = JSON.parse(record)
  } catch (err) {
    parsed = record
  }
  return parsed
}

module.exports = new Catcher()
