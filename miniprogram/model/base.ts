export default class Base {
  $collection: string
  db = null
  _model = null

  constructor($collection) {
    this.$collection = $collection
  }
  
  get model() {
    if (this._model) {
      return this._model
    }
    if (!this.db) {
      this.db = wx.cloud.database()
    }
    this._model = this.db.collection(this.$collection)
    return this._model
  }

  isOk(response) {
    const { errMsg } = response
    if (errMsg.indexOf('ok') > -1) {
      return true
    }
    return false
  }
}