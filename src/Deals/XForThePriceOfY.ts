import { Catalog } from "../Catalog"
import { Deal } from "./"

export interface XForThePriceOfYInterface {
  catalog: Catalog
  deal: {
    sku: keyof Catalog
    x: number
    y: number
  }
}

export class XForThePriceOfY extends Deal {
  constructor({ catalog, deal }: XForThePriceOfYInterface) {
    const { sku, x, y } = deal
    if (y >= x) {
      throw `${
        deal.x
      } for the price of ${y} is not a discount. X should be greater than Y. Given:
      ${JSON.stringify(deal)}`
    }

    super({
      shouldApplyDiscount: ({ items }) => {
        const quantityPurchased = items[sku] || 0

        return quantityPurchased >= x
      },
      applyDiscount: ({ items }) => {
        const quantityPurchased = items[sku] || 0
        const labelPrice = catalog[sku].price
        const discountedUnits = y - x

        return Math.floor(quantityPurchased / x) * labelPrice * discountedUnits
      },
    })
  }
}
