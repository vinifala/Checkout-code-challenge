export class Purchase {
  private _items: Record<string, number>

  constructor() {
    this._items = {}
  }

  add(sku: string): this {
    if (!this._items[sku]) {
      this._items[sku] = 1
    } else {
      this._items[sku]++
    }

    return this
  }

  get items(): Purchase["_items"] | null {
    // ShoppingCart.items returns a copy of this._items to prevent the private
    // _items object to be changed outside the class
    return { ...this._items }
  }
}
