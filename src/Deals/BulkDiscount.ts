import { Deal } from "./Deal"
import { Catalog } from "../Catalog"

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
      applyDiscount: ({ items }) => {
        const purchasedQuantity = items[sku]
        const priceDifference = discountedUnitPrice - catalog[sku].price

        return priceDifference * purchasedQuantity
      },
      shouldApplyDiscount: ({ items }) => {
        const { sku, requiredQuantity } = deal
        const purchasedQuantity = items[sku] || 0

        return purchasedQuantity >= requiredQuantity
      },
    })
  }
}
