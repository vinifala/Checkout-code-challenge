import { Item } from "../Item"

export class Catalog implements Record<Item["sku"], Item> {
  [x: string]: Item

  constructor(items: Item[]) {
    items.forEach(item => {
      this[item.sku] = { ...item }
    })

    // This prevents items in the catalog to be changed, added or deleted
    Object.freeze(this)
  }
}
