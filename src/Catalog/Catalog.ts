import { Item } from "../Item"

export class Catalog implements Record<string, Item> {
  [x: string]: Item

  constructor(items: Item[]) {
    items.forEach(item => {
      this[item.sku] = { ...item }
    })

    // This prevents items in the catalog to be changed, added or deleted
    Object.freeze(this)
  }
}
