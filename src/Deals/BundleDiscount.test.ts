import { BundleDiscount } from "./"
import { Item } from "../Item"
import { Catalog } from "../Catalog"
import { Purchase } from "../Purchase"

const ipd = new Item({
  sku: "ipd",
  name: "Super iPad",
  price: 549.99,
})
const mbp = new Item({
  sku: "mbp",
  name: "MacBook Pro",
  price: 1399.99,
})
const atv = new Item({
  sku: "atv",
  name: "Apple TV",
  price: 109.5,
})
const vga = new Item({
  sku: "vga",
  name: "VGA adapter",
  price: 30.0,
})

const catalog = new Catalog([mbp, ipd, vga, atv])

describe("Gives an item for free when something else is purchased", () => {
  const deal = new BundleDiscount({
    catalog,
    deal: {
      requiredItems: {
        sku: "mbp",
        quantity: 1,
      },
      freeItem: {
        sku: "vga",
      },
    },
  })

  describe("Apply the discount", () => {
    it("should apply the discount when both are purchased once", () => {
      const purchase = new Purchase()
        .add("mbp")
        .add("atv")
        .add("vga")

      expect(deal.discount(purchase)).toBeCloseTo(-30)
    })
    it("should apply the discount once when mbp is purchased twice but there's only one vga", () => {
      const purchase = new Purchase()
        .add("mbp")
        .add("atv")
        .add("vga")
        .add("mbp")

      expect(deal.discount(purchase)).toBeCloseTo(-30)
    })
    it("should apply the discount twicw when mbp is purchased twice and there's 3 vga(s)", () => {
      const purchase = new Purchase()
        .add("vga")
        .add("mbp")
        .add("vga")
        .add("atv")
        .add("vga")
        .add("mbp")

      expect(deal.discount(purchase)).toBeCloseTo(-60)
    })
  })
  it("should not apply the discount", () => {
    const purchase = new Purchase()
      .add("mbp")
      .add("atv")
      .add("ipd")

    expect(deal.discount(purchase)).toBe(0)
  })
})
