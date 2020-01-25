import { Checkout } from "./Checkout"

const ipd = {
  sku: "ipd",
  name: "Super iPad",
  price: 549.99,
}
const mbp = {
  sku: "mbp",
  name: "MacBook Pro",
  price: 1399.99,
}
const atv = {
  sku: "atv",
  name: "Apple TV",
  price: 109.5,
}
const vga = {
  sku: "vga",
  name: "VGA adapter",
  price: 30.0,
}

describe("Le Checkout", () => {
  describe("Checkout Scan", () => {
    it("should scan valid item", () => {
      const co = new Checkout({
        items: [ipd],
      })

      expect(() => {
        co.scan("ipd")
      }).not.toThrow()
    })

    it("should throw when invalid item is scanned", () => {
      const co = new Checkout({
        items: [ipd],
      })

      expect(() => {
        co.scan("foo")
      }).toThrow()
    })
  })

  describe("Checkout total", () => {
    describe("With no Deals", () => {
      it("should be zero when cart is empty", () => {
        const co = new Checkout({
          items: [ipd, atv, mbp, vga],
        })

        expect(co.total()).toBe(0)
      })

      it("should calculate the total cost of scanned items", () => {
        const co = new Checkout({
          items: [ipd, atv, mbp, vga],
        })

        co.scan("ipd")
        co.scan("mbp")
        co.scan("vga")
        co.scan("atv")
        co.scan("mbp")

        expect(co.total()).toBeCloseTo(3489.47)
      })
    })

    describe("With deals", () => {
      const checkoutConfig = {
        items: [ipd, atv, mbp, vga],
        deals: {
          xForThePriceOfY: [
            {
              sku: "atv",
              x: 3,
              y: 2,
            },
          ],
          bundleDiscount: [
            {
              requiredItems: {
                sku: "mbp",
                quantity: 1,
              },
              freeItem: {
                sku: "vga",
              },
            },
          ],
          bulkDiscount: [
            {
              discountedUnitPrice: 499.99,
              requiredQuantity: 5,
              sku: "ipd",
            },
          ],
        },
      }

      it("should calculate the total cost of scanned items, plus atv X for Y discount", () => {
        const co = new Checkout(checkoutConfig)

        co.scan("atv")
        co.scan("atv")
        co.scan("atv")
        co.scan("vga")

        expect(co.total()).toBeCloseTo(249.0)
      })

      it("should calculate the total cost of scanned items, plus bulk ipd discount", () => {
        const co = new Checkout(checkoutConfig)

        co.scan("atv")
        co.scan("ipd")
        co.scan("ipd")
        co.scan("atv")
        co.scan("ipd")
        co.scan("ipd")
        co.scan("ipd")

        expect(co.total()).toBeCloseTo(2718.95)
      })

      it("should calculate the total cost of scanned items, plus bundle mbp discount", () => {
        const co = new Checkout(checkoutConfig)

        co.scan("mbp")
        co.scan("vga")
        co.scan("ipd")

        expect(co.total()).toBeCloseTo(1949.98)
      })

      it("should have all discounts", () => {
        const co = new Checkout(checkoutConfig)

        co.scan("mbp")
        co.scan("vga")
        co.scan("ipd")
        co.scan("vga")
        co.scan("atv")
        co.scan("ipd")
        co.scan("ipd")
        co.scan("atv")
        co.scan("ipd")
        co.scan("atv")
        co.scan("ipd")
        co.scan("ipd")

        expect(co.total()).toBeCloseTo(4648.93)
      })
    })
  })
})
