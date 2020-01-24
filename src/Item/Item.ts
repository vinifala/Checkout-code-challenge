export class Item {
  readonly sku: string
  readonly name: string
  readonly price: number

  constructor({ sku, name, price }) {
    this.sku = sku
    this.name = name
    this.price = price
  }
}
