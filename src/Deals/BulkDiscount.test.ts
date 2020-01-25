import { BulkDiscount } from "./"
import { Purchase } from "../Purchase"
import { Item } from "../Item"
import { Catalog } from "../Catalog"

const ipd = new Item({
  sku: "ipd",
  name: "Super iPad",
  price: 549.99,
})
const atv = new Item({
  sku: "atv",
  name: "Apple TV",
  price: 109.5,
})
const mbp = new Item({
  sku: "mbp",
  name: "MacBook Pro",
  price: 1399.99,
})
const catalog = new Catalog([atv, mbp, ipd])

describe("Apply discounted unit price when quantity reaches threshold", () => {
  it("should apply the discount", () => {
    const bulk = new BulkDiscount({
      catalog,
      deal: { sku: "ipd", requiredQuantity: 3, discountedUnitPrice: 499.99 },
    })
    const purchase = new Purchase()
      .add("ipd")
      .add("ipd")
      .add("mbp")
      .add("ipd")
      .add("ipd")

    expect(bulk.discount(purchase)).toBeCloseTo(-200)
  })

  it("should not apply the discount", () => {
    const bulk = new BulkDiscount({
      catalog,
      deal: { sku: "ipd", requiredQuantity: 3, discountedUnitPrice: 499.99 },
    })
    const purchase = new Purchase()
      .add("ipd")
      .add("atv")
      .add("atv")
      .add("atv")
      .add("atv")
      .add("ipd")

    expect(bulk.discount(purchase)).toBe(0)
  })
})
