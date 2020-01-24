import { Item } from "./Item"

describe("Item passes on arguments to properties", () => {
  const item = new Item({ sku: "mbp", name: "MacBook Pro", price: 1399.99 })

  it("Should have the correct sku", () => {
    expect(item.sku).toBe("mbp")
  })

  it("Should have the correct name", () => {
    expect(item.name).toBe("MacBook Pro")
  })

  it("Should have the correct price", () => {
    expect(item.price).toBe(1399.99)
  })

  it("Should not have additional properties", () => {
    expect(Object.keys(item)).toEqual(["sku", "name", "price"])
  })
})
