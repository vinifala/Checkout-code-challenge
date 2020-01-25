import { Purchase } from "./Purchase"

describe("Shopping Cart", () => {
  it("Cart should be empty upon creation", () => {
    const purchase = new Purchase()

    expect(purchase.entries).toEqual([])
  })

  describe("Should add an Item to the cart", () => {
    const purchase = new Purchase()

    it("Should create key and set quantity to one", () => {
      purchase.add("ipd")

      expect(purchase.quantityOf("ipd")).toBe(1)
    })

    it("Should increase quantity by one when added again", () => {
      purchase.add("ipd")

      expect(purchase.quantityOf("ipd")).toBe(2)
    })

    it("Added item should be the only element in items", () => {
      expect(purchase.entries).toEqual([["ipd", 2]])
    })
  })

  describe("Retrieve quantity of purchased of an sku", () => {
    it("should retrieve the quantity", () => {
      const purchase = new Purchase()

      purchase
        .add("ipd")
        .add("ipd")
        .add("mbp")

      expect(purchase.quantityOf("ipd")).toBe(2)
      expect(purchase.quantityOf("mbp")).toBe(1)
    })

    it("should return zero when retrieving the quantity of an item not in the purchase", () => {
      const purchase = new Purchase()

      purchase
        .add("ipd")
        .add("ipd")
        .add("mbp")

      expect(purchase.quantityOf("atv")).toBe(0)
      expect(purchase.quantityOf("foo")).toBe(0)
    })
  })

  describe("Retrieve the purchased items as entities [key, val][]", () => {
    it("should retrieve correct entities", () => {
      const purchase = new Purchase()

      purchase
        .add("ipd")
        .add("ipd")
        .add("mbp")

      expect(purchase.entries).toEqual([
        ["ipd", 2],
        ["mbp", 1],
      ])
    })

    it("should retrieve an empty array when purchase is empty", () => {
      const purchase = new Purchase()

      expect(purchase.entries).toEqual([])
    })
  })

  describe("Adding a new item should not interfere with items already in the cart", () => {
    it("Should not have changed the quantity of Super iPads", () => {
      const purchase = new Purchase().add("ipd").add("ipd")

      expect(purchase.quantityOf("ipd")).toBe(2)
    })

    it("Should add one mbp to the cart", () => {
      const purchase = new Purchase()
        .add("ipd")
        .add("ipd")
        .add("mbp")

      expect(purchase.quantityOf("mbp")).toBe(1)
    })

    it("Should not have added any other item", () => {
      const purchase = new Purchase()
        .add("ipd")
        .add("ipd")
        .add("mbp")

      expect(purchase.entries).toEqual([
        ["ipd", 2],
        ["mbp", 1],
      ])
    })
  })
})
