import { Catalog } from "../Catalog"
import { Purchase } from "../Purchase"
import { Item } from "../Item"
import { XForThePriceOfY } from "./"

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
const catalog = new Catalog([atv, mbp])

describe("X for the price of Y", () => {
  describe("3 for the price of 2", () => {
    const xForY = new XForThePriceOfY({
      catalog,
      deal: {
        sku: "atv",
        x: 3,
        y: 2,
      },
    })

    it("should apply the discount once", () => {
      const purchase = new Purchase()
      purchase
        .add("atv")
        .add("atv")
        .add("mbp")
        .add("atv")
        .add("atv")

      expect(xForY.discount(purchase)).toBeCloseTo(-109.5)
    })

    it("should apply the discount twice", () => {
      const purchase = new Purchase()
      purchase
        .add("atv")
        .add("atv")
        .add("atv")
        .add("atv")
        .add("atv")
        .add("atv")

      expect(xForY.discount(purchase)).toBeCloseTo(-219)
    })

    it("should not apply the discount", () => {
      const purchase = new Purchase()
      purchase
        .add("mbp")
        .add("atv")
        .add("mbp")
        .add("atv")
        .add("mbp")

      expect(xForY.discount(purchase)).toBe(0)
    })
  })
  it("should throw if Y is greater than X (not a discount)", () => {
    expect(() => {
      new XForThePriceOfY({
        catalog,
        deal: {
          sku: "atv",
          x: 3,
          y: 4,
        },
      })
    }).toThrow()
  })
  it("should throw if Y is equal to X (not a discount)", () => {
    expect(() => {
      new XForThePriceOfY({
        catalog,
        deal: {
          sku: "atv",
          x: 3,
          y: 3,
        },
      })
    }).toThrow()
  })
})
