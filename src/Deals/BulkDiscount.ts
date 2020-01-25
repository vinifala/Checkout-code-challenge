import { Deal } from "./Deal"
import { Catalog } from "../Catalog"
import { Purchase } from "../Purchase"

export interface BulkDiscountInterface {
  catalog: Catalog
  deal: {
    discountedUnitPrice: number
    requiredQuantity: number
    sku: keyof Catalog
  }
}

export class BulkDiscount extends Deal {
  constructor({ catalog, deal }: BulkDiscountInterface) {
    const { sku, discountedUnitPrice } = deal
    super({
      applyDiscount: (purchase: Purchase) => {
        const purchasedQuantity = purchase.quantityOf(sku)
        const priceDifference = discountedUnitPrice - catalog[sku].price

        return priceDifference * purchasedQuantity
      },
      shouldApplyDiscount: (purchase: Purchase) => {
        const { sku, requiredQuantity } = deal
        const purchasedQuantity = purchase.quantityOf(sku)

        return purchasedQuantity >= requiredQuantity
      },
    })
  }
}
