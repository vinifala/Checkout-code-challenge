import { Deal } from "./Deal"
import { Catalog } from "../Catalog"

export interface BundleDiscountInterface {
  catalog: Catalog
  deal: {
    requiredItems: {
      sku: keyof Catalog
      quantity: number
    }
    freeItem: {
      sku: keyof Catalog
    }
  }
}

export class BundleDiscount extends Deal {
  constructor({ catalog, deal }: BundleDiscountInterface) {
    const { requiredItems, freeItem } = deal
    const requiredQuantity = requiredItems.quantity

    super({
      applyDiscount: ({ items }) => {
        const requiredPurchased = items[requiredItems.sku]
        const freePurchased = items[freeItem.sku] || 0
        const freeItemPrice = catalog[freeItem.sku].price

        return (
          -Math.min(
            Math.floor(requiredPurchased / requiredQuantity),
            freePurchased
          ) * freeItemPrice
        )
      },
      shouldApplyDiscount: ({ items }) => {
        const requiredPurchased = items[requiredItems.sku] || 0
        const freePurchased = items[freeItem.sku] || 0

        return requiredPurchased >= requiredQuantity && freePurchased > 0
      },
    })
  }
}
