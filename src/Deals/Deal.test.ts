import { Deal } from "./"
import { Purchase } from "../Purchase"

describe("Deal", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const applyDiscount = jest.fn(() => 1)
  const purchase = new Purchase().add("foo").add("bar")

  it("should pass purchase to shouldApplyDiscount", () => {
    const shouldApplyDiscount = jest.fn()
    const deal = new Deal({ shouldApplyDiscount, applyDiscount })

    deal.discount(purchase)

    expect(shouldApplyDiscount).toHaveBeenCalledTimes(1)
    expect(shouldApplyDiscount).toHaveBeenCalledWith(purchase)
  })

  it("should call applyDiscount if shouldApplyDiscount is true", () => {
    const shouldApplyDiscount = jest.fn(() => true)
    const deal = new Deal({ shouldApplyDiscount, applyDiscount })

    deal.discount(purchase)

    expect(applyDiscount).toHaveBeenCalledTimes(1)
    expect(applyDiscount).toHaveBeenCalledWith(purchase)
  })

  it("should not call applyDiscount if shouldApplyDiscount is false", () => {
    const shouldApplyDiscount = jest.fn(() => false)
    const deal = new Deal({ shouldApplyDiscount, applyDiscount })

    deal.discount(purchase)

    expect(applyDiscount).not.toHaveBeenCalled()
  })
})
