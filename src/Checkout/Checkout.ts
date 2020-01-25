import { Purchase } from "../Purchase"
import {
  BulkDiscount,
  BulkDiscountInterface,
  BundleDiscount,
  BundleDiscountInterface,
  Deal,
  XForThePriceOfY,
  XForThePriceOfYInterface,
} from "../Deals"
import { Catalog } from "../Catalog"

export interface PricingRules {
  items: {
    sku: string
    name: string
    price: number
  }[]
  deals?: {
    bulkDiscount?: BulkDiscountInterface["deal"][]
    bundleDiscount?: BundleDiscountInterface["deal"][]
    xForThePriceOfY?: XForThePriceOfYInterface["deal"][]
  }
}

export class Checkout {
  private purchase: Purchase
  private catalog: Catalog
  private deals: Deal[]

  constructor({ items, deals }: PricingRules) {
    this.catalog = new Catalog(items)
    this.deals = []
    this.purchase = new Purchase()

    if (deals) {
      if (deals.bulkDiscount && deals.bulkDiscount.length > 0) {
        deals.bulkDiscount.forEach(deal => {
          this.deals.push(new BulkDiscount({ catalog: this.catalog, deal }))
        })
      }
      if (deals.bundleDiscount && deals.bundleDiscount.length > 0) {
        deals.bundleDiscount.forEach(deal => {
          this.deals.push(new BundleDiscount({ catalog: this.catalog, deal }))
        })
      }
      if (deals.xForThePriceOfY && deals.xForThePriceOfY.length > 0) {
        deals.xForThePriceOfY.forEach(deal => {
          this.deals.push(new XForThePriceOfY({ catalog: this.catalog, deal }))
        })
      }
    }
  }

  scan(sku: string): void {
    if (!this.catalog[sku]) {
      throw "Invalid Item scanned"
    }
    this.purchase.add(sku)
  }

  total(): number {
    const { entries } = this.purchase

    const subtotal = entries.reduce(
      (acc, [sku, quantity]): number =>
        acc + quantity * this.catalog[sku].price,
      0
    )

    const discounts = this.deals.reduce(
      (acc, deal) => acc + deal.discount(this.purchase),
      0
    )

    return subtotal + discounts
  }
}
