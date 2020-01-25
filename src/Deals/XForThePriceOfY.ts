import { Catalog } from "../Catalog"
import { Deal } from "./"
import { Purchase } from "../Purchase"

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
      shouldApplyDiscount: (purchase: Purchase) => {
        const quantityPurchased = purchase.quantityOf(sku)

        return quantityPurchased >= x
      },
      applyDiscount: (purchase: Purchase) => {
        const quantityPurchased = purchase.quantityOf(sku)
        const labelPrice = catalog[sku].price
        const discountedUnits = y - x

        return Math.floor(quantityPurchased / x) * labelPrice * discountedUnits
      },
    })
  }
}
