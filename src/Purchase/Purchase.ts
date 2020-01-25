import { Catalog } from "../Catalog"
export class Purchase {
  private items: Record<keyof Catalog, number>

  constructor() {
    this.items = {}
  }

  add(sku: string): this {
    if (!this.items[sku]) {
      this.items[sku] = 1
    } else {
      this.items[sku]++
    }

    return this
  }

  quantityOf(sku: keyof Purchase["items"]): number {
    return this.items[sku] || 0
  }

  get entries(): [keyof Purchase["items"], number][] {
    return Object.keys(this.items).reduce((acc, sku) => {
      acc.push([sku, this.quantityOf(sku)])

      return acc
    }, [])
  }
}
