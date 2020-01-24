import { Purchase } from "./Purchase"

describe("Shopping Cart", () => {
  it("Cart should be empty upon creation", () => {
    const purchase = new Purchase()

    expect(purchase.items).toMatchObject({})
  })

  describe("Should add an Item to the cart", () => {
    const purchase = new Purchase()

    it("Should create key and set quantity to one", () => {
      purchase.add("ipd")

      expect(purchase.items["ipd"]).toBe(1)
    })

    it("Should increase quantity by one when added again", () => {
      purchase.add("ipd")

      expect(purchase.items["ipd"]).toBe(2)
    })

    it("Added item should be the only element in items", () => {
      expect(Object.keys(purchase.items)).toEqual(["ipd"])
    })
  })

  describe("Adding a new item should not interfere with items already in the cart", () => {
    const purchase = new Purchase()

    purchase.add("ipd").add("ipd")

    it("Should not have changed the quantity of Super iPads", () => {
      expect(purchase.items["ipd"]).toBe(2)
    })

    purchase.add("mbp")

    it("Should add one mbp to the cart", () => {
      expect(purchase.items["mbp"]).toBe(1)
    })

    it("Should not have added any other item", () => {
      expect(Object.keys(purchase.items)).toEqual(["ipd", "mbp"])
    })
  })
})
