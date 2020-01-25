import { Deal } from "./Deal"
import { Catalog } from "../Catalog"
import { Purchase } from "../Purchase"

interface BulkDiscountInterface {
  catalog: Catalog
  deal: {
    discountedUnitPrice
    requiredQuantity: number
    sku: keyof Catalog
  }
}

export class BulkDiscount extends Deal {
  constructor(bulkDeal: BulkDiscountInterface) {
    const shouldApplyDiscount = (bulkDeal: BulkDiscountInterface) => (
      purchase: Purchase
    ): boolean => {
      const { sku, requiredQuantity } = bulkDeal.deal

      return (purchase.items[sku] || 0) >= requiredQuantity
    }

    const applyDiscount = ({ catalog, deal }: BulkDiscountInterface) => (
      purchase: Purchase
    ): number => {
      const { sku, discountedUnitPrice } = deal
      const priceDifference = discountedUnitPrice - catalog[sku].price

      return priceDifference * purchase.items[sku]
    }

    super({
      applyDiscount: applyDiscount(bulkDeal),
      shouldApplyDiscount: shouldApplyDiscount(bulkDeal),
    })
  }
}
