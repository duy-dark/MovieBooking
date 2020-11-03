export default class Customer {
  constructor(data = {}) {
    Object.keys(data).map(key => {
      this[key] = data[key]
    })

    this.id = data.id
    this.username = data.username,
    this.email = data.email
  }
} 