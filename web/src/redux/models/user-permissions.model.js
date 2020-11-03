export default class UserPermission {
  constructor (data = {}) {
    Object.keys(data).map(key => {
      this[key] = data[key]
    })
    this.id = data.id
    this.code = data.code
  }
}
