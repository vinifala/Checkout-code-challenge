import { Purchase } from "../Purchase"

export class Deal {
  private shouldApplyDiscount: (p: Purchase) => boolean
  private applyDiscount: (p: Purchase) => number

  constructor({ applyDiscount, shouldApplyDiscount }) {
    this.applyDiscount = applyDiscount
    this.shouldApplyDiscount = shouldApplyDiscount
  }

  discount(p: Purchase): number {
    if (this.shouldApplyDiscount(p)) {
      return this.applyDiscount(p)
    }

    return 0
  }
}
