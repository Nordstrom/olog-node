var Catcher = function () {
  this.records = []
}
Catcher.prototype.write = function (record) {
  this.records.push(record)
}
Catcher.prototype.clear = function () {
  this.records = []
}

module.exports = new Catcher()
