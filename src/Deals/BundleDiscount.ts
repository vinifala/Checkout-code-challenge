import { Deal } from "./Deal"
import { Catalog } from "../Catalog"
import { Purchase } from "../Purchase"

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
      applyDiscount: (purchase: Purchase): number => {
        const requiredPurchased = purchase.quantityOf(requiredItems.sku)
        const freePurchased = purchase.quantityOf(freeItem.sku)
        const freeItemPrice = catalog[freeItem.sku].price

        return (
          -Math.min(
            Math.floor(requiredPurchased / requiredQuantity),
            freePurchased
          ) * freeItemPrice
        )
      },
      shouldApplyDiscount: (purchase: Purchase): boolean => {
        const requiredPurchased = purchase.quantityOf(requiredItems.sku)
        const freePurchased = purchase.quantityOf(freeItem.sku)

        return requiredPurchased >= requiredQuantity && freePurchased > 0
      },
    })
  }
}
